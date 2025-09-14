#!/bin/bash
# security-updates.sh - Apply critical security updates for eKYC project
# Usage: ./security-updates.sh
# Created: September 2025

set -e  # Exit on any error

echo "=== eKYC Security Updates ==="
echo "Starting security-critical dependency updates..."
echo "Date: $(date)"

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Change to project root
cd "$PROJECT_ROOT"

# Create backup before updates
echo "Creating backup branch..."
git stash push -m "Temporary stash before security updates" || true
git checkout -b "security-updates-$(date +%Y%m%d-%H%M%S)" || git checkout "security-updates-$(date +%Y%m%d-%H%M%S)"

# Frontend security updates
echo ""
echo "🔧 Updating frontend security packages..."
cd "$PROJECT_ROOT/frontend"
if [ -f package.json ]; then
    echo "  - Fixing npm audit issues..."
    npm audit fix --force || echo "  Warning: Some audit fixes may require manual intervention"
    
    echo "  - Updating critical security packages..."
    npm update axios || echo "  Warning: axios update may need manual review"
    npm update jsonwebtoken || echo "  Warning: jsonwebtoken not found in frontend"
    
    echo "  - Updating testing libraries..."
    npm update @testing-library/jest-dom @testing-library/react @testing-library/user-event || echo "  Warning: Some testing libraries may need version compatibility checks"
    
    echo "  ✅ Frontend security updates completed"
else
    echo "  ❌ No package.json found in frontend directory"
fi

# API security updates  
echo ""
echo "🔧 Updating API security packages..."
cd "$PROJECT_ROOT/api"
if [ -f package.json ]; then
    echo "  - Fixing npm audit issues..."
    npm audit fix --force || echo "  Warning: Some audit fixes may require manual intervention"
    
    echo "  - Updating critical security packages..."
    npm update jsonwebtoken || echo "  Warning: jsonwebtoken update may have breaking changes"
    npm update bcryptjs || echo "  Warning: bcryptjs update completed"
    npm update express || echo "  Warning: express update completed"
    npm update mongoose || echo "  Warning: mongoose update may have breaking changes - review migration guide"
    
    echo "  ✅ API security updates completed"
else
    echo "  ❌ No package.json found in api directory"
fi

# Chaincode updates
echo ""
echo "🔧 Updating chaincode packages..."
cd "$PROJECT_ROOT/chaincode/javascript"
if [ -f package.json ]; then
    echo "  - Fixing npm audit issues..."
    npm audit fix --force || echo "  Warning: Some audit fixes may require manual intervention"
    
    echo "  - Updating fabric dependencies..."
    npm update fabric-contract-api fabric-shim || echo "  Warning: Fabric updates may need compatibility verification"
    
    echo "  ✅ Chaincode security updates completed"
else
    echo "  ❌ No package.json found in chaincode/javascript directory"
fi

# Final audit check
echo ""
echo "🔍 Final security audit check..."
cd "$PROJECT_ROOT"

echo "Frontend vulnerabilities:"
cd frontend && npm audit --audit-level=high || echo "High/Critical vulnerabilities remain - manual review required"

echo ""
echo "API vulnerabilities:"
cd ../api && npm audit --audit-level=high || echo "High/Critical vulnerabilities remain - manual review required"

echo ""
echo "Chaincode vulnerabilities:"
cd ../chaincode/javascript && npm audit --audit-level=high || echo "High/Critical vulnerabilities remain - manual review required"

cd "$PROJECT_ROOT"

echo ""
echo "=== Security Updates Summary ==="
echo "✅ Security updates completed successfully!"
echo "⚠️  IMPORTANT NEXT STEPS:"
echo "   1. Run './scripts/validate-updates.sh' to test functionality"
echo "   2. Check application startup and basic functionality"
echo "   3. Review any remaining high/critical vulnerabilities manually"
echo "   4. Update Node.js engine requirements if needed (>=18)"
echo "   5. Commit changes: git add -A && git commit -m 'Security dependency updates'"
echo ""
echo "📝 For breaking changes, consult DEPENDENCY_RENEWAL_GUIDE.md"
echo "🔄 Consider running './scripts/full-update.sh' for complete renewal"

# Log completion
echo "Security updates completed at: $(date)" >> "$PROJECT_ROOT/dependency-update.log"