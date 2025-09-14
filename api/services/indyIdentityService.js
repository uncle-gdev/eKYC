const indy = require('indy-sdk');
const { v4: uuidv4 } = require('uuid');

class IndyIdentityService {
    constructor() {
        this.poolHandle = null;
        this.walletHandle = null;
        this.walletConfig = {
            "id": "ekyc_wallet",
            "storage_type": "default"
        };
        this.walletCredentials = {
            "key": "ekyc_wallet_key"
        };
        this.poolName = "ekyc_pool";
        this.issuerDid = null;
        this.issuerVerkey = null;
    }

    /**
     * Initialize Indy pool and wallet
     */
    async initialize() {
        try {
            // Create pool configuration for local Indy network
            const poolConfig = {
                "genesis_txn": "/tmp/docker_pool_transactions_genesis"
            };

            // Create and open pool ledger
            try {
                await indy.createPoolLedgerConfig(this.poolName, poolConfig);
            } catch (error) {
                if (error.message.includes('PoolLedgerConfigAlreadyExistsError')) {
                    console.log('Pool config already exists, continuing...');
                } else {
                    throw error;
                }
            }

            this.poolHandle = await indy.openPoolLedger(this.poolName, undefined);

            // Create and open wallet
            try {
                await indy.createWallet(this.walletConfig, this.walletCredentials);
            } catch (error) {
                if (error.message.includes('WalletAlreadyExistsError')) {
                    console.log('Wallet already exists, continuing...');
                } else {
                    throw error;
                }
            }

            this.walletHandle = await indy.openWallet(this.walletConfig, this.walletCredentials);

            // Create issuer DID if not exists
            await this.createIssuerDid();

            console.log('Indy Identity Service initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Indy Identity Service:', error);
            throw error;
        }
    }

    /**
     * Create issuer DID for the eKYC service
     */
    async createIssuerDid() {
        try {
            const issuerDidInfo = {
                "seed": "000000000000000000000000eKYCIssuer"
            };

            const [issuerDid, issuerVerkey] = await indy.createAndStoreMyDid(this.walletHandle, issuerDidInfo);
            this.issuerDid = issuerDid;
            this.issuerVerkey = issuerVerkey;

            console.log(`Issuer DID created: ${issuerDid}`);
            console.log(`Issuer Verkey: ${issuerVerkey}`);
        } catch (error) {
            console.error('Failed to create issuer DID:', error);
            throw error;
        }
    }

    /**
     * Create identity credential schema for KYC verification
     */
    async createKYCSchema() {
        const schemaName = 'eKYC-Identity';
        const schemaVersion = '1.0';
        const schemaAttributes = [
            'name',
            'address',
            'dateOfBirth',
            'idNumber',
            'verificationStatus',
            'registeredBy',
            'verificationDate',
            'biometricHash',
            'locationHash'
        ];

        try {
            const [schemaId, schemaJson] = await indy.issuerCreateSchema(
                this.issuerDid,
                schemaName,
                schemaVersion,
                schemaAttributes
            );

            // Store schema on ledger
            const schemaRequest = await indy.buildSchemaRequest(this.issuerDid, schemaJson);
            const schemaResponse = await indy.signAndSubmitRequest(this.poolHandle, this.walletHandle, this.issuerDid, schemaRequest);

            console.log(`KYC Schema created with ID: ${schemaId}`);
            return { schemaId, schemaJson };
        } catch (error) {
            console.error('Failed to create KYC schema:', error);
            throw error;
        }
    }

    /**
     * Create credential definition for KYC schema
     */
    async createKYCCredentialDefinition(schemaId, schemaJson) {
        const credDefTag = 'eKYC-Cred-Def';
        const credDefType = 'CL';
        const credDefConfig = {
            "support_revocation": true
        };

        try {
            const [credDefId, credDefJson] = await indy.issuerCreateAndStoreCredentialDef(
                this.walletHandle,
                this.issuerDid,
                schemaJson,
                credDefTag,
                credDefType,
                credDefConfig
            );

            // Store credential definition on ledger
            const credDefRequest = await indy.buildCredDefRequest(this.issuerDid, credDefJson);
            const credDefResponse = await indy.signAndSubmitRequest(this.poolHandle, this.walletHandle, this.issuerDid, credDefRequest);

            console.log(`KYC Credential Definition created with ID: ${credDefId}`);
            return { credDefId, credDefJson };
        } catch (error) {
            console.error('Failed to create KYC credential definition:', error);
            throw error;
        }
    }

    /**
     * Create DID for a new client
     */
    async createClientIdentity(clientData) {
        try {
            const clientDidInfo = {};
            const [clientDid, clientVerkey] = await indy.createAndStoreMyDid(this.walletHandle, clientDidInfo);

            const identity = {
                did: clientDid,
                verkey: clientVerkey,
                clientData: clientData,
                createdAt: new Date().toISOString(),
                verificationStatus: 'pending'
            };

            console.log(`Client identity created with DID: ${clientDid}`);
            return identity;
        } catch (error) {
            console.error('Failed to create client identity:', error);
            throw error;
        }
    }

    /**
     * Issue KYC credential to a client
     */
    async issueKYCCredential(clientDid, credDefId, clientData, registeredBy) {
        try {
            const credentialOffer = await indy.issuerCreateCredentialOffer(this.walletHandle, credDefId);

            const credentialRequest = await indy.proverCreateCredentialReq(
                this.walletHandle,
                clientDid,
                credentialOffer,
                credDefId,
                clientDid // Using clientDid as master secret id
            );

            // Prepare credential values
            const credentialValues = {
                name: { raw: clientData.name || '', encoded: this.encodeCredentialValue(clientData.name || '') },
                address: { raw: clientData.address || '', encoded: this.encodeCredentialValue(clientData.address || '') },
                dateOfBirth: { raw: clientData.dateOfBirth || '', encoded: this.encodeCredentialValue(clientData.dateOfBirth || '') },
                idNumber: { raw: clientData.idNumber || '', encoded: this.encodeCredentialValue(clientData.idNumber || '') },
                verificationStatus: { raw: 'verified', encoded: this.encodeCredentialValue('verified') },
                registeredBy: { raw: registeredBy || '', encoded: this.encodeCredentialValue(registeredBy || '') },
                verificationDate: { raw: new Date().toISOString(), encoded: this.encodeCredentialValue(new Date().toISOString()) },
                biometricHash: { raw: clientData.biometricHash || '', encoded: this.encodeCredentialValue(clientData.biometricHash || '') },
                locationHash: { raw: clientData.locationHash || '', encoded: this.encodeCredentialValue(clientData.locationHash || '') }
            };

            const [credential, credRevocId, revocRegDelta] = await indy.issuerCreateCredential(
                this.walletHandle,
                credentialOffer,
                credentialRequest[0],
                credentialValues,
                null, // No revocation registry for now
                null
            );

            // Store credential in client's wallet (in a real scenario, this would be sent to the client)
            const credId = await indy.proverStoreCredential(
                this.walletHandle,
                null,
                credentialRequest[1],
                credentialRequest[2],
                credDefId,
                credential
            );

            console.log(`KYC credential issued to client ${clientDid} with credential ID: ${credId}`);
            return { credId, credential };
        } catch (error) {
            console.error('Failed to issue KYC credential:', error);
            throw error;
        }
    }

    /**
     * Verify KYC credential presentation
     */
    async verifyKYCPresentation(presentationRequest, presentation) {
        try {
            // Get schemas and credential definitions for verification
            const schemasJson = {};
            const credDefsJson = {};

            // In a real implementation, you would fetch these from the ledger
            // For now, we'll simulate this

            const verified = await indy.verifierVerifyProof(
                presentationRequest,
                presentation,
                schemasJson,
                credDefsJson,
                {},
                {}
            );

            console.log(`KYC presentation verification result: ${verified}`);
            return verified;
        } catch (error) {
            console.error('Failed to verify KYC presentation:', error);
            throw error;
        }
    }

    /**
     * Grant access permission between client and FI
     */
    async grantAccess(clientDid, fiDid, permissions) {
        try {
            // Create a connection record
            const connectionId = uuidv4();
            const connection = {
                id: connectionId,
                clientDid: clientDid,
                fiDid: fiDid,
                permissions: permissions,
                grantedAt: new Date().toISOString(),
                status: 'active'
            };

            // In a real implementation, this would be stored in a secure database
            // For now, we'll return the connection object
            console.log(`Access granted between client ${clientDid} and FI ${fiDid}`);
            return connection;
        } catch (error) {
            console.error('Failed to grant access:', error);
            throw error;
        }
    }

    /**
     * Revoke access permission between client and FI
     */
    async revokeAccess(clientDid, fiDid) {
        try {
            // In a real implementation, you would find and update the connection record
            console.log(`Access revoked between client ${clientDid} and FI ${fiDid}`);
            return true;
        } catch (error) {
            console.error('Failed to revoke access:', error);
            throw error;
        }
    }

    /**
     * Utility function to encode credential values
     */
    encodeCredentialValue(value) {
        // Simple encoding - in production, use proper encoding
        return Buffer.from(value).toString('base64');
    }

    /**
     * Close connections and cleanup
     */
    async cleanup() {
        try {
            if (this.walletHandle) {
                await indy.closeWallet(this.walletHandle);
            }
            if (this.poolHandle) {
                await indy.closePoolLedger(this.poolHandle);
            }
            console.log('Indy Identity Service cleaned up successfully');
        } catch (error) {
            console.error('Failed to cleanup Indy Identity Service:', error);
        }
    }
}

module.exports = IndyIdentityService;
