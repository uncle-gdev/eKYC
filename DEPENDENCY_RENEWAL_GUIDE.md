# eKYC Project Dependency Renewal Guide

## Overview
This guide provides a comprehensive process for updating the outdated dependencies across the eKYC project components. The project currently has severe security vulnerabilities and outdated packages that need immediate attention.

## Current State Analysis (September 2025)

### Critical Issues Identified:
- **Frontend**: 153 vulnerabilities (16 critical, 64 high-severity)
- **API**: Outdated packages from 2020 with known security issues, now updated with Hyperledger Indy dependencies
- **Node.js**: All components require Node >=18 (current LTS is 20+)

### Components Requiring Updates:

#### 1. Frontend (/frontend/)
**Critical outdated packages:**
- React: 16.13.1 → Latest (18.x)
- react-scripts: 3.4.1 → Latest (5.x)
- axios: 0.21.1 → Latest (1.x) - **CRITICAL SECURITY**
- @testing-library packages: Major version behind

#### 2. API (/api/)
**Critical outdated packages:**
- Express: 4.17.1 → Latest (4.x)
- Mongoose: Updated to 8.x for Indy integration
- jsonwebtoken: Updated to 9.x - **SECURITY CRITICAL**
- Node.js engine: >=18 (LTS)
- **New Indy Dependencies:**
  - @hyperledger/indy-vdr: ^0.2.0
  - @hyperledger/aries-framework-core: ^0.5.0
  - indy-sdk: ^1.16.0

## Dependency Renewal Process

### Phase 1: Preparation and Backup
```bash
# 1. Create backup branch
git checkout -b dependency-update-backup
git add -A && git commit -m "Backup before dependency updates"

# 2. Create working branch
git checkout -b dependency-renewal

# 3. Document current versions
cd frontend && npm list --depth=0 > current-versions-frontend.txt 2>&1
cd ../api && npm list --depth=0 > current-versions-api.txt 2>&1
```

### Phase 2: Node.js Version Update
```bash
# Update Node.js engine requirements in all package.json files
# Recommended: Node.js 18.x LTS or 20.x LTS
```

### Phase 3: Security-Critical Updates (Priority 1)
```bash
# Frontend security fixes
cd frontend
npm update axios
npm update @testing-library/jest-dom @testing-library/react @testing-library/user-event

# API security fixes  
cd ../api
npm update jsonwebtoken
npm update express
npm update bcryptjs

# Test after each critical update
npm test
```

### Phase 4: Major Framework Updates (Priority 2)
```bash
# Frontend React update (potential breaking changes)
cd frontend
npm update react react-dom
npm update react-scripts
# May require code changes for deprecated APIs

# API Mongoose update (breaking changes expected)
cd ../api
npm update mongoose
# Review Mongoose 7.x migration guide
# Update database connection and schema code
```

### Phase 5: Development Dependencies
```bash
# Update testing and linting tools
npm update --dev
```

### Phase 6: Chaincode Updates
```bash
cd chaincode/javascript
# Check Hyperledger Fabric compatibility first
npm update fabric-contract-api fabric-shim
npm update --dev
```

## Automated Renewal Scripts

### Script 1: Security Update Script
```bash
#!/bin/bash
# security-updates.sh - Apply critical security updates

echo "=== eKYC Security Updates ==="
echo "Starting security-critical dependency updates..."

# Frontend security updates
echo "Updating frontend security packages..."
cd frontend
npm audit fix
npm update axios jsonwebtoken

# API security updates  
echo "Updating API security packages..."
cd ../api  
npm audit fix
npm update jsonwebtoken bcryptjs express

# Chaincode updates
echo "Updating chaincode packages..."
cd ../chaincode/javascript
npm audit fix

echo "Security updates completed. Run tests to verify functionality."
```

### Script 2: Full Update Script  
```bash
#!/bin/bash
# full-update.sh - Complete dependency renewal

echo "=== eKYC Full Dependency Renewal ==="

# Update Node.js engine requirements
echo "Updating Node.js engine requirements..."
sed -i 's/"node": ">=8"/"node": ">=18"/' */package.json
sed -i 's/"npm": ">=5"/"npm": ">=8"/' */package.json

# Update all components
for dir in frontend api chaincode/javascript; do
  echo "Updating $dir..."
  cd $dir
  npm update
  npm audit fix
  cd - > /dev/null
done

echo "Full update completed. Comprehensive testing required."
```

### Script 3: Test and Validation Script
```bash
#!/bin/bash
# validate-updates.sh - Test updated dependencies

echo "=== Validating Updated Dependencies ==="

# Test each component
for dir in frontend api chaincode/javascript; do
  echo "Testing $dir..."
  cd $dir
  npm test
  if [ $? -eq 0 ]; then
    echo "✅ $dir tests passed"
  else  
    echo "❌ $dir tests failed"
  fi
  cd - > /dev/null
done

# Check for remaining vulnerabilities
echo "Checking for remaining vulnerabilities..."
cd frontend && npm audit --audit-level=high
cd ../api && npm audit --audit-level=high  
cd ../chaincode/javascript && npm audit --audit-level=high
```

## Breaking Changes to Watch For

### React 16 → 18 Migration
- ReactDOM.render deprecated → createRoot
- Some lifecycle methods deprecated
- Concurrent features may affect timing

### Mongoose 5 → 7 Migration  
- Connection syntax changes
- Schema validation updates
- Query behavior modifications

### Express 4.17 → Latest
- Generally backward compatible
- Security middleware updates recommended

## Testing Strategy

### 1. Unit Tests
```bash
# Run existing tests after each phase
npm test
```

### 2. Integration Tests  
```bash
# Test API endpoints
npm run test:integration
```

### 3. Frontend Testing
```bash
# Test React components and user flows
npm run test:e2e
```

### 4. Blockchain Integration
```bash
# Test chaincode functionality
npm run test:chaincode
```

## Rollback Plan

If critical issues arise:
```bash
# Quick rollback to backup
git checkout dependency-update-backup
npm install  # Restore original package-lock.json
```

## Future Maintenance

### 1. Regular Update Schedule
- Monthly security updates
- Quarterly dependency reviews  
- Annual major version updates

### 2. Automated Monitoring
```bash
# Add to CI/CD pipeline
npm audit --audit-level=high
# Fail builds on high/critical vulnerabilities
```

### 3. Dependency Management Tools
- Consider using Renovate Bot or Dependabot
- Implement security scanning in CI/CD
- Regular vulnerability database updates

## Implementation Timeline

1. **Week 1**: Security-critical updates (Phase 1-3)
2. **Week 2**: Major framework updates with testing (Phase 4)
3. **Week 3**: Complete remaining updates and validation (Phase 5-6)
4. **Week 4**: Documentation and process refinement

## Contact and Support

For issues during the renewal process:
- Check migration guides for major packages
- Review breaking change logs
- Test incrementally after each major update
- Document any code changes required for compatibility

---

**Last Updated**: September 14, 2025
**Next Scheduled Review**: December 2025