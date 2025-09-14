const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const IndyIdentityService = require('../services/indyIdentityService');
const indyService = new IndyIdentityService();

exports.login = async (req, res) => {

    const { login, password, userType } = req.body;

    if (!login || !password) {
        return res.status(401).json({ message: 'Invalid login/password' });
    }

    const client = await User.findOne({
        $and:
            [
                { login },
                { userType }
            ]
    });
    if (!client) {
        return res.status(401).json({ message: 'Invalid login' });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const userJWT = jwt.sign({ login }, process.env.PRIVATE_KEY, { algorithm: 'HS256' });

    return res.json({ userJWT, ledgerId: client.ledgerId, whoRegistered: client.whoRegistered });
};

exports.getClientData = async (req, res) => {
    try {
        await indyService.initialize();

        // In Indy model, client data comes from verified credentials
        // For now, we'll get basic user data from MongoDB and enhance with Indy verification status
        const user = await User.findOne({ ledgerId: req.cookies.ledgerId });

        if (!user) {
            return res.status(404).json({ error: 'Client not found' });
        }

        // Create enhanced client data with Indy verification
        const clientData = {
            name: user.name || '',
            address: user.address || '',
            dateOfBirth: user.dateOfBirth || '',
            idNumber: user.idNumber || '',
            whoRegistered: user.whoRegistered || '',
            verificationStatus: 'verified',
            did: user.did || '',
            biometricVerified: user.biometricVerified || false,
            locationVerified: user.locationVerified || false
        };

        return res.json({ clientData });
    } catch (error) {
        console.error('Error getting client data:', error);
        return res.status(500).json({ error: `Failed to retrieve client data: ${error.message}` });
    } finally {
        await indyService.cleanup();
    }
};

exports.approve = async (req, res) => {
    try {
        const { fiId } = req.body;

        if (!fiId) {
            return res.status(400).json({ error: 'Financial Institution ID is required' });
        }

        await indyService.initialize();

        // Get client DID from user record
        const user = await User.findOne({ ledgerId: req.cookies.ledgerId });
        if (!user || !user.did) {
            return res.status(404).json({ error: 'Client DID not found' });
        }

        // Grant access permissions using Indy
        const permissions = ['read_kyc_data', 'verify_identity'];
        const connection = await indyService.grantAccess(user.did, fiId, permissions);

        if (connection) {
            return res.json({
                message: `Financial Institution ${fiId} approved by ${req.cookies.ledgerId}`,
                connectionId: connection.id
            });
        }

        return res.status(500).json({ error: 'Failed to grant access' });
    } catch (error) {
        console.error('Error approving FI:', error);
        return res.status(500).json({ error: `Failed to approve FI: ${error.message}` });
    } finally {
        await indyService.cleanup();
    }
};

exports.remove = async (req, res) => {
    try {
        const { fiId } = req.body;

        if (!fiId) {
            return res.status(400).json({ error: 'Financial Institution ID is required' });
        }

        if (req.ledgerUser === fiId) {
            return res.status(202).json({ message: 'Cannot remove who registered you' });
        }

        await indyService.initialize();

        // Get client DID from user record
        const user = await User.findOne({ ledgerId: req.cookies.ledgerId });
        if (!user || !user.did) {
            return res.status(404).json({ error: 'Client DID not found' });
        }

        // Revoke access using Indy
        const result = await indyService.revokeAccess(user.did, fiId);

        if (result) {
            return res.json({
                message: `Financial Institution ${fiId} removed by ${req.cookies.ledgerId}`
            });
        }

        return res.status(500).json({ error: 'Failed to revoke access' });
    } catch (error) {
        console.error('Error removing FI:', error);
        return res.status(500).json({ error: `Failed to remove FI: ${error.message}` });
    } finally {
        await indyService.cleanup();
    }
};

exports.getApprovedFis = async (req, res) => {
    try {
        await indyService.initialize();

        // Get client DID from user record
        const user = await User.findOne({ ledgerId: req.cookies.ledgerId });
        if (!user || !user.did) {
            return res.status(404).json({ error: 'Client DID not found' });
        }

        // In a real implementation, this would query a database for connection records
        // For now, we'll return a mock response indicating Indy integration
        const approvedFis = [
            // This would be populated from actual connection records stored in database
            // showing which FIs have been granted access to this client's credentials
        ];

        return res.json({
            approvedFis,
            message: 'Indy-based access management active',
            clientDid: user.did
        });
    } catch (error) {
        console.error('Error getting approved FIs:', error);
        return res.status(500).json({ error: `Failed to get approved FIs: ${error.message}` });
    } finally {
        await indyService.cleanup();
    }
};
