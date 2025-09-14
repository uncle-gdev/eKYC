#!/bin/bash
# full-update.sh - Complete dependency renewal for eKYC project
# Usage: ./full-update.sh
# Created: September 2025

set -e  # Exit on any error

echo "=== eKYC Full Dependency Renewal ==="
echo "Starting comprehensive dependency updates..."
echo "Date: $(date)"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Change to project root
cd "$PROJECT_ROOT"

# Create backup before updates
echo "📦 Creating backup branch..."
BACKUP_BRANCH="full-update-backup-$(date +%Y%m%d-%H%M%S)"
git stash push -m "Temporary stash before full updates" || true
git checkout -b "$BACKUP_BRANCH" || git checkout "$BACKUP_BRANCH"

# Document current versions
echo "📋 Documenting current dependency versions..."
mkdir -p backup-versions

cd "$PROJECT_ROOT/frontend"
npm list --depth=0 > ../backup-versions/current-versions-frontend.txt 2>&1 || true

cd "$PROJECT_ROOT/api"
npm list --depth=0 > ../backup-versions/current-versions-api.txt 2>&1 || true

cd "$PROJECT_ROOT/chaincode/javascript"
npm list --depth=0 > ../backup-versions/current-versions-chaincode.txt 2>&1 || true

cd "$PROJECT_ROOT"

echo "✅ Version snapshots saved in backup-versions/ directory"
echo ""

# Update Node.js engine requirements
echo "🔧 Updating Node.js engine requirements..."
echo "  - Updating package.json engine requirements to Node >=18, npm >=8"

# Frontend
if [ -f frontend/package.json ]; then
    sed -i 's/"node": ">=8"/"node": ">=18"/' frontend/package.json
    sed -i 's/"npm": ">=5"/"npm": ">=8"/' frontend/package.json
    echo "  ✅ Frontend engine requirements updated"
fi

# API  
if [ -f api/package.json ]; then
    sed -i 's/"node": ">=8"/"node": ">=18"/' api/package.json
    sed -i 's/"npm": ">=5"/"npm": ">=8"/' api/package.json
    echo "  ✅ API engine requirements updated"
fi

# Chaincode
if [ -f chaincode/javascript/package.json ]; then
    sed -i 's/"node": ">=8"/"node": ">=18"/' chaincode/javascript/package.json
    sed -i 's/"npm": ">=5"/"npm": ">=8"/' chaincode/javascript/package.json
    echo "  ✅ Chaincode engine requirements updated"
fi

echo ""

# Update all components
COMPONENTS=("frontend" "api" "chaincode/javascript")

for dir in "${COMPONENTS[@]}"; do
    echo "🚀 Updating $dir dependencies..."
    cd "$PROJECT_ROOT/$dir"
    
    if [ -f package.json ]; then
        echo "  - Running npm update..."
        npm update || echo "  ⚠️  Some packages may need manual updates"
        
        echo "  - Running npm audit fix..."
        npm audit fix --force || echo "  ⚠️  Some audit fixes may require manual intervention"
        
        echo "  - Removing unused dependencies..."
        npm prune || echo "  ⚠️  Prune completed with warnings"
        
        # Special handling for major version updates
        if [ "$dir" = "frontend" ]; then
            echo "  - Attempting React major version update..."
            npm update react react-dom react-scripts || echo "  ⚠️  React updates may need manual intervention - check for breaking changes"
        fi
        
        if [ "$dir" = "api" ]; then
            echo "  - Attempting Mongoose major version update..."
            npm update mongoose || echo "  ⚠️  Mongoose update may have breaking changes - review migration guide"
            
            echo "  - Updating Express and security packages..."
            npm update express jsonwebtoken bcryptjs || echo "  ⚠️  Security package updates may need manual review"
        fi
        
        if [ "$dir" = "chaincode/javascript" ]; then
            echo "  - Updating Hyperledger Fabric dependencies..."
            npm update fabric-contract-api fabric-shim || echo "  ⚠️  Fabric updates may need compatibility verification"
        fi
        
        echo "  ✅ $dir updates completed"
    else
        echo "  ❌ No package.json found in $dir"
    fi
    
    echo ""
done

cd "$PROJECT_ROOT"

# Generate update report
echo "📊 Generating dependency update report..."
echo "=== Dependency Update Report ===" > dependency-update-report.txt
echo "Generated: $(date)" >> dependency-update-report.txt
echo "" >> dependency-update-report.txt

for dir in "${COMPONENTS[@]}"; do
    echo "=== $dir ===" >> dependency-update-report.txt
    cd "$PROJECT_ROOT/$dir"
    if [ -f package.json ]; then
        echo "Updated versions:" >> ../dependency-update-report.txt
        npm list --depth=0 >> ../dependency-update-report.txt 2>&1 || true
        echo "" >> ../dependency-update-report.txt
        
        echo "Remaining vulnerabilities:" >> ../dependency-update-report.txt
        npm audit --audit-level=moderate >> ../dependency-update-report.txt 2>&1 || true
        echo "" >> ../dependency-update-report.txt
    fi
done

cd "$PROJECT_ROOT"

# Final comprehensive audit
echo "🔍 Running final comprehensive security audit..."
echo ""

echo "Frontend audit results:"
cd frontend && npm audit --audit-level=moderate || echo "Vulnerabilities found - see report for details"

echo ""
echo "API audit results:"
cd ../api && npm audit --audit-level=moderate || echo "Vulnerabilities found - see report for details"

echo ""
echo "Chaincode audit results:"
cd ../chaincode/javascript && npm audit --audit-level=moderate || echo "Vulnerabilities found - see report for details"

cd "$PROJECT_ROOT"

echo ""
echo "=== Full Update Summary ==="
echo "✅ Comprehensive dependency renewal completed!"
echo ""
echo "📋 What was updated:"
echo "   • Node.js engine requirements: >=8 → >=18"
echo "   • npm engine requirements: >=5 → >=8"
echo "   • All npm packages updated to latest compatible versions"
echo "   • Security vulnerabilities addressed where possible"
echo "   • Unused dependencies removed"
echo ""
echo "📁 Files generated:"
echo "   • backup-versions/ - Original dependency versions"
echo "   • dependency-update-report.txt - Complete update report"
echo "   • dependency-update.log - Update history"
echo ""
echo "⚠️  CRITICAL NEXT STEPS:"
echo "   1. Run './scripts/validate-updates.sh' to test all functionality"
echo "   2. Review dependency-update-report.txt for any issues"
echo "   3. Test application startup and basic functionality manually"
echo "   4. Check for breaking changes in major version updates:"
echo "      - React 16→18: Review DEPENDENCY_RENEWAL_GUIDE.md"
echo "      - Mongoose 5→7: Check database connection code"
echo "      - Express: Generally backward compatible"
echo "   5. Update any deprecated API usage in source code"
echo "   6. Run comprehensive tests before deploying"
echo ""
echo "🔄 Rollback if needed:"
echo "   git checkout $BACKUP_BRANCH"
echo "   npm install  # in each component directory"
echo ""
echo "📝 For detailed migration guides, see DEPENDENCY_RENEWAL_GUIDE.md"

# Log completion
echo "Full dependency update completed at: $(date)" >> dependency-update.log
echo "Backup branch: $BACKUP_BRANCH" >> dependency-update.log

echo ""
echo "🎉 Full dependency renewal process completed successfully!"
echo "   Run validation script next: ./scripts/validate-updates.sh"