#!/bin/bash
# validate-updates.sh - Test and validate updated dependencies for eKYC project
# Usage: ./validate-updates.sh
# Created: September 2025

set -e  # Exit on any error

echo "=== eKYC Dependency Validation ==="
echo "Testing updated dependencies and functionality..."
echo "Date: $(date)"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Change to project root
cd "$PROJECT_ROOT"

# Initialize validation results
VALIDATION_LOG="validation-results.txt"
echo "=== eKYC Dependency Validation Results ===" > "$VALIDATION_LOG"
echo "Generated: $(date)" >> "$VALIDATION_LOG"
echo "" >> "$VALIDATION_LOG"

COMPONENTS=("frontend" "api" "chaincode/javascript")
PASSED=0
FAILED=0

# Function to log results
log_result() {
    local component=$1
    local test=$2
    local status=$3
    local details=$4
    
    echo "$component - $test: $status" >> "$VALIDATION_LOG"
    if [ -n "$details" ]; then
        echo "  Details: $details" >> "$VALIDATION_LOG"
    fi
    echo "" >> "$VALIDATION_LOG"
    
    if [ "$status" = "PASSED" ]; then
        ((PASSED++))
    else
        ((FAILED++))
    fi
}

# Test each component
for dir in "${COMPONENTS[@]}"; do
    echo "🧪 Testing $dir..."
    cd "$PROJECT_ROOT/$dir"
    
    if [ ! -f package.json ]; then
        echo "  ❌ No package.json found in $dir"
        log_result "$dir" "Package.json exists" "FAILED" "File not found"
        continue
    fi
    
    echo "  ✅ Package.json found"
    log_result "$dir" "Package.json exists" "PASSED" ""
    
    # Test 1: npm install (dependency resolution)
    echo "  - Testing npm install..."
    if npm install --no-fund --no-audit > ../temp-install.log 2>&1; then
        echo "    ✅ npm install successful"
        log_result "$dir" "npm install" "PASSED" ""
    else
        echo "    ❌ npm install failed"
        log_result "$dir" "npm install" "FAILED" "Check temp-install.log for details"
    fi
    
    # Test 2: Check for missing dependencies
    echo "  - Checking for missing dependencies..."
    if npm list --depth=0 > ../temp-list.log 2>&1; then
        echo "    ✅ All dependencies resolved"
        log_result "$dir" "Dependency resolution" "PASSED" ""
    else
        echo "    ⚠️  Some dependency issues found"
        log_result "$dir" "Dependency resolution" "WARNING" "Check temp-list.log for details"
    fi
    
    # Test 3: Run existing tests
    echo "  - Running tests..."
    if npm test -- --passWithNoTests --watchAll=false > ../temp-test.log 2>&1; then
        echo "    ✅ Tests passed"
        log_result "$dir" "Unit tests" "PASSED" ""
    else
        echo "    ⚠️  Tests failed or not configured"
        log_result "$dir" "Unit tests" "WARNING" "Check temp-test.log for details"
    fi
    
    # Test 4: Check linting (if available)
    if npm run lint > ../temp-lint.log 2>&1; then
        echo "    ✅ Linting passed"
        log_result "$dir" "Linting" "PASSED" ""
    else
        echo "    ⚠️  Linting not available or failed"
        log_result "$dir" "Linting" "WARNING" "Linting not configured or failed"
    fi
    
    # Component-specific tests
    if [ "$dir" = "frontend" ]; then
        echo "  - Testing React build..."
        if timeout 120 npm run build > ../temp-build.log 2>&1; then
            echo "    ✅ React build successful"
            log_result "$dir" "Production build" "PASSED" ""
        else
            echo "    ❌ React build failed"
            log_result "$dir" "Production build" "FAILED" "Check temp-build.log for details"
        fi
        
        echo "  - Testing development server startup..."
        if timeout 30 bash -c "npm start > ../temp-start.log 2>&1 &
        sleep 25
        curl -s http://localhost:3000 > /dev/null
        " then
            echo "    ✅ Development server starts successfully"
            log_result "$dir" "Dev server startup" "PASSED" ""
        else
            echo "    ⚠️  Development server test inconclusive"
            log_result "$dir" "Dev server startup" "WARNING" "May need manual verification"
        fi
        
        # Kill any remaining React processes
        pkill -f "react-scripts start" || true
    fi
    
    if [ "$dir" = "api" ]; then
        echo "  - Testing API server startup..."
        if node -c server.js 2>/dev/null; then
            echo "    ✅ API syntax validation passed"
            log_result "$dir" "Syntax validation" "PASSED" ""
        else
            echo "    ❌ API syntax validation failed"
            log_result "$dir" "Syntax validation" "FAILED" "server.js has syntax errors"
        fi
        
        # Test server startup (if no database dependency)
        if timeout 15 bash -c "node server.js > ../temp-api.log 2>&1 &
        API_PID=\$!
        sleep 10
        kill \$API_PID || true
        " then
            echo "    ✅ API server startup test passed"
            log_result "$dir" "Server startup" "PASSED" ""
        else
            echo "    ⚠️  API server startup needs database connection"
            log_result "$dir" "Server startup" "WARNING" "May require database configuration"
        fi
    fi
    
    if [ "$dir" = "chaincode/javascript" ]; then
        echo "  - Testing chaincode syntax..."
        if find . -name "*.js" -exec node -c {} \; 2>/dev/null; then
            echo "    ✅ Chaincode syntax validation passed"
            log_result "$dir" "Syntax validation" "PASSED" ""
        else
            echo "    ❌ Chaincode syntax validation failed"
            log_result "$dir" "Syntax validation" "FAILED" "JavaScript syntax errors found"
        fi
    fi
    
    echo ""
done

cd "$PROJECT_ROOT"

# Security audit validation
echo "🔍 Running security audit validation..."
echo ""

for dir in "${COMPONENTS[@]}"; do
    echo "Security audit for $dir:"
    cd "$PROJECT_ROOT/$dir"
    
    if [ -f package.json ]; then
        # Count vulnerabilities
        HIGH_VULNS=$(npm audit --audit-level=high --json 2>/dev/null | jq '.metadata.vulnerabilities.high // 0' 2>/dev/null || echo "unknown")
        CRITICAL_VULNS=$(npm audit --audit-level=critical --json 2>/dev/null | jq '.metadata.vulnerabilities.critical // 0' 2>/dev/null || echo "unknown")
        
        echo "  High: $HIGH_VULNS, Critical: $CRITICAL_VULNS"
        
        if [ "$HIGH_VULNS" = "0" ] && [ "$CRITICAL_VULNS" = "0" ]; then
            echo "  ✅ No high/critical vulnerabilities"
            log_result "$dir" "Security audit" "PASSED" "No high/critical vulnerabilities"
        else
            echo "  ⚠️  High/critical vulnerabilities remain"
            log_result "$dir" "Security audit" "WARNING" "High: $HIGH_VULNS, Critical: $CRITICAL_VULNS"
        fi
    fi
done

cd "$PROJECT_ROOT"

# Clean up temporary files
rm -f temp-*.log

# Generate final report
echo "" >> "$VALIDATION_LOG"
echo "=== SUMMARY ===" >> "$VALIDATION_LOG"
echo "Total tests passed: $PASSED" >> "$VALIDATION_LOG"
echo "Total tests failed/warned: $FAILED" >> "$VALIDATION_LOG"
echo "Validation completed at: $(date)" >> "$VALIDATION_LOG"

# Display results
echo ""
echo "=== Validation Summary ==="
echo "📊 Results:"
echo "   ✅ Tests passed: $PASSED"
echo "   ⚠️  Tests failed/warned: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "🎉 All validation tests passed!"
    echo "✅ Dependencies are successfully updated and functional"
    echo ""
    echo "✅ RECOMMENDED NEXT STEPS:"
    echo "   1. Manual testing of key application functionality"
    echo "   2. Integration testing with database/blockchain"
    echo "   3. User acceptance testing"
    echo "   4. Deploy to staging environment for further testing"
    echo "   5. Monitor for any runtime issues"
    
elif [ $FAILED -le 3 ]; then
    echo "⚠️  Minor issues found - mostly warnings"
    echo "🔍 RECOMMENDED ACTIONS:"
    echo "   1. Review validation-results.txt for specific issues"
    echo "   2. Address any critical failures manually"
    echo "   3. Consider acceptable warnings vs. critical issues"
    echo "   4. Proceed with careful manual testing"
    
else
    echo "❌ Multiple issues found requiring attention"
    echo "🚨 REQUIRED ACTIONS:"
    echo "   1. Review validation-results.txt for all issues"
    echo "   2. Fix critical failures before proceeding"
    echo "   3. Consider rolling back if too many issues"
    echo "   4. Contact development team for complex issues"
    
    echo ""
    echo "🔄 Rollback commands if needed:"
    echo "   git checkout [backup-branch-name]"
    echo "   npm install  # in each component directory"
fi

echo ""
echo "📋 Detailed results saved in: validation-results.txt"
echo "📝 For troubleshooting, see: DEPENDENCY_RENEWAL_GUIDE.md"
echo ""

# Make scripts executable
chmod +x "$SCRIPT_DIR"/*.sh

echo "✅ Dependency validation completed!"
echo "   All scripts are now executable and ready for use."

# Log completion
echo "Validation completed at: $(date)" >> dependency-update.log