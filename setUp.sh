#!/bin/bash
#
# eKYC Hyperledger Indy Setup Script
#
# Exit on first error
set -e

echo "=========================================="
echo "Setting up eKYC with Hyperledger Indy"
echo "=========================================="

# Create necessary directories
mkdir -p api/wallet
mkdir -p tmp

echo "Installing dependencies..."
pushd api
npm install
popd

pushd frontend
npm install
popd

echo "Setting up Indy pool genesis file..."
# Create a simple genesis file for local development
cat > /tmp/docker_pool_transactions_genesis << EOF
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWdCXAAkiA6aPzKF6EG5GXkSq","client_ip":"127.0.0.1","client_port":9702,"node_ip":"127.0.0.1","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9BZnJjNEKHSCMkQoLd7FKMEswF7m1f3b9NWKP2CvjJP6m1pG","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"127.0.0.1","client_port":9704,"node_ip":"127.0.0.1","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"}
EOF

echo "=========================================="
echo "eKYC Indy Setup Complete!"
echo "=========================================="
echo "The application now uses Hyperledger Indy for identity verification"
echo ""
echo "Features available:"
echo "- DID-based identity management"
echo "- Verifiable credentials for KYC"
echo "- Support for biometric verification"
echo "- Location-based address validation"
echo "- Government entity verification ready"
echo ""
echo "To start the application:"
echo "1. Start API: cd api && npm start"
echo "2. Start Frontend: cd frontend && npm start"
echo "=========================================="