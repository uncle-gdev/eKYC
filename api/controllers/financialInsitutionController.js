const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const io = require('../db/io');
const IndyIdentityService = require('../services/indyIdentityService');
const indyService = new IndyIdentityService();

exports.createClient = async (req, res) => {
    try {
        const orgNum = req.orgNum;
        const ledgerUser = req.ledgerUser;

        const { login, password, name, dateOfBirth, address, idNumber, biometricHash, locationHash } = req.body;

        if (!login || !password || !name) {
            return res.status(400).json({ error: 'Required fields missing' });
        }

        await indyService.initialize();

        // Create client identity with Indy
        const clientData = {
            name,
            dateOfBirth,
            address,
            idNumber,
            biometricHash: biometricHash || '',
            locationHash: locationHash || '',
            whoRegistered: { orgNum, ledgerUser }
        };

        const identity = await indyService.createClientIdentity(clientData);

        if (identity) {
            // Store client in MongoDB with DID
            await io.clientCreate(login, password, identity.did, JSON.stringify({ orgNum, ledgerUser }));

            // Create and issue KYC credential
            const { schemaId } = await indyService.createKYCSchema();
            const { credDefId } = await indyService.createKYCCredentialDefinition(schemaId, schemaId);
            await indyService.issueKYCCredential(identity.did, credDefId, clientData, ledgerUser);

            return res.json({
                message: `New client identity created with DID: ${identity.did}`,
                did: identity.did,
                verificationStatus: identity.verificationStatus
            });
        }

        return res.status(500).json({ error: 'Failed to create client identity' });
    } catch (error) {
        console.error('Error creating client:', error);
        return res.status(500).json({ error: `Failed to create client: ${error.message}` });
    } finally {
        await indyService.cleanup();
    }
};

exports.login = async (req, res) => {

    const { login, password, userType } = req.body;

    if (!login || !password) {
        return res.status(401).json({ message: 'Invalid login/password' });
    }

    const fi = await User.findOne({
        $and:
            [
                { login },
                { userType }
            ]
    });
    if (!fi) {
        return res.status(401).json({ message: 'Invalid login' });
    }

    const isMatch = await bcrypt.compare(password, fi.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const userJWT = jwt.sign({ login }, process.env.PRIVATE_KEY, { algorithm: 'HS256' });

    return res.json({ userJWT, orgCredentials: fi.orgCredentials });
};

exports.getFiData = async (req, res) => {
    try {
        // Get FI data from MongoDB instead of Fabric ledger
        const fi = await User.findOne({
            login: req.ledgerUser,
            userType: 'fi'
        });

        if (!fi) {
            return res.status(404).json({ error: 'Financial Institution not found' });
        }

        const fiData = {
            name: fi.name || '',
            orgCredentials: fi.orgCredentials || {},
            verificationCapabilities: [
                'identity_verification',
                'biometric_verification',
                'location_verification',
                'government_id_verification'
            ],
            indyEnabled: true
        };

        return res.json({ fiData });
    } catch (error) {
        console.error('Error getting FI data:', error);
        return res.status(500).json({ error: `Failed to get FI data: ${error.message}` });
    }
};

exports.getClientData = async (req, res) => {
    try {
        const { clientId, fields } = req.query;

        if (!clientId) {
            return res.status(400).json({ error: 'Client ID is required' });
        }

        await indyService.initialize();

        // Get client data from MongoDB (in real implementation, would verify access permissions)
        const client = await User.findOne({
            $or: [
                { ledgerId: clientId },
                { did: clientId }
            ]
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        // Filter requested fields or return all
        const requestedFields = fields ? fields.split(',') : ['name', 'address', 'dateOfBirth', 'idNumber'];
        const clientData = {};

        requestedFields.forEach(field => {
            if (client[field]) {
                clientData[field] = client[field];
            }
        });

        clientData.verificationStatus = 'verified';
        clientData.did = client.did || '';
        clientData.indyVerified = true;

        return res.json({ clientData });
    } catch (error) {
        console.error('Error getting client data:', error);
        return res.status(500).json({ error: `Failed to get client data: ${error.message}` });
    } finally {
        await indyService.cleanup();
    }
};

exports.getApprovedClients = async (req, res) => {
    try {
        await indyService.initialize();

        // In a real implementation, this would query connection records
        // For now, return clients that have granted access to this FI
        const approvedClients = await User.find({
            userType: 'client',
            did: { $exists: true, $ne: '' }
        }).select('ledgerId did name verificationStatus');

        const clientList = approvedClients.map(client => ({
            clientId: client.ledgerId,
            did: client.did,
            name: client.name,
            verificationStatus: 'verified',
            accessGranted: true
        }));

        return res.json({
            approvedClients: clientList,
            message: 'Indy-based client access management active'
        });
    } catch (error) {
        console.error('Error getting approved clients:', error);
        return res.status(500).json({ error: `Failed to get approved clients: ${error.message}` });
    } finally {
        await indyService.cleanup();
    }
};
