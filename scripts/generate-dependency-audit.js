const fs = require('fs');
const path = require('path');

const inputs = [
  { name: 'frontend', file: 'audits/frontend.audit.json' },
  { name: 'api', file: 'audits/api.audit.json' },
  { name: 'chaincode', file: 'audits/chaincode.audit.json' }
];

const fixInputs = [
  { name: 'frontend', file: 'audits/frontend.fix.json' },
  { name: 'api', file: 'audits/api.fix.json' },
  { name: 'chaincode', file: 'audits/chaincode.fix.json' }
];

function extractFindings(project, obj) {
  const vulns = obj.vulnerabilities || {};
  const out = [];
  
  for (const [pkg, v] of Object.entries(vulns)) {
    const viaList = (v.via || []).map(x => typeof x === 'string' ? { name: x } : x);
    
    // If no via entries with details, create a basic entry
    if (viaList.length === 0 || viaList.every(x => typeof x === 'string')) {
      const id = 'N/A';
      const fix = v.fixAvailable?.version
               || (typeof v.fixAvailable === 'string' ? v.fixAvailable : null)
               || 'None';
      out.push({
        project,
        package: v.name || pkg,
        severity: v.severity,
        id,
        title: 'Multiple vulnerabilities',
        fix,
        nodes: v.nodes || []
      });
    } else {
      for (const via of viaList) {
        if (typeof via === 'string') continue;
        
        // Extract GHSA/CVE from URL or use source
        const id = via.url?.match(/GHSA-[\w-]+/)?.[0]
                || via.url?.match(/CVE-\d{4}-\d+/)?.[0]
                || (via.source ? String(via.source) : null) || 'N/A';
        const fix = v.fixAvailable?.version
                 || (typeof v.fixAvailable === 'string' ? v.fixAvailable : null)
                 || 'None';
        out.push({
          project,
          package: v.name || pkg,
          severity: v.severity,
          id,
          title: via.title || 'N/A',
          fix,
          nodes: v.nodes || []
        });
      }
    }
  }
  return out;
}

function extractSafeFixes(project, obj) {
  const actions = obj.actions || [];
  return actions
    .filter(action => action.isMajor === false)
    .map(action => ({
      project,
      module: action.module,
      target: action.target,
      action: action.action
    }));
}

// Process audit files
const allFindings = inputs.flatMap(({ name, file }) => {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) {
    console.error(`Warning: ${file} not found`);
    return [];
  }
  try {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    return extractFindings(name, data);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
    return [];
  }
});

// Process fix files
const allSafeFixes = fixInputs.flatMap(({ name, file }) => {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) {
    console.error(`Warning: ${file} not found`);
    return [];
  }
  try {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    return extractSafeFixes(name, data);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
    return [];
  }
});

// Group by severity
const bySeverity = {
  critical: allFindings.filter(f => f.severity === 'critical'),
  high: allFindings.filter(f => f.severity === 'high'),
  moderate: allFindings.filter(f => f.severity === 'moderate'),
  low: allFindings.filter(f => f.severity === 'low'),
  info: allFindings.filter(f => f.severity === 'info')
};

// Generate markdown
const currentDate = new Date().toISOString().split('T')[0];
let markdown = `# Dependency Audit Report - ${currentDate}

## Executive Summary

This audit covers the eKYC repository containing three Node.js projects:
- **Frontend**: React application
- **API**: Express.js backend  
- **Chaincode**: Hyperledger Fabric smart contract

**Total Vulnerabilities Found:** ${allFindings.length}
- Critical: ${bySeverity.critical.length}
- High: ${bySeverity.high.length}
- Moderate: ${bySeverity.moderate.length}
- Low: ${bySeverity.low.length}
- Info: ${bySeverity.info.length}

**Safe Fixes Available:** ${allSafeFixes.length}

---

## Security Vulnerabilities

`;

// Generate vulnerability tables by severity
for (const [severity, findings] of Object.entries(bySeverity)) {
  if (findings.length === 0) continue;
  
  markdown += `### ${severity.charAt(0).toUpperCase() + severity.slice(1)} Severity
| Component | Package | Vulnerability ID | Description | Fixed Version | Affected Paths |
|-----------|---------|------------------|-------------|---------------|----------------|
`;

  for (const finding of findings) {
    const paths = finding.nodes.length > 0 
      ? finding.nodes.slice(0, 2).map(n => n.split('/').pop()).join(', ') + (finding.nodes.length > 2 ? '...' : '')
      : 'Direct';
    markdown += `| ${finding.project} | ${finding.package} | ${finding.id} | ${finding.title} | ${finding.fix} | ${paths} |\n`;
  }
  markdown += '\n';
}

// Safe fixes section
if (allSafeFixes.length > 0) {
  markdown += `## Safe Fixes Available (Non-Breaking)

The following fixes can be applied safely without breaking changes:

| Component | Package | Action | Target Version |
|-----------|---------|--------|----------------|
`;

  for (const fix of allSafeFixes) {
    markdown += `| ${fix.project} | ${fix.module} | ${fix.action} | ${fix.target} |\n`;
  }
  
  markdown += `\n**Recommendation:** Apply these fixes with \`npm audit fix\` and run tests to verify.\n\n`;
} else {
  markdown += `## Safe Fixes Available

**No patch/minor updates available** - all fixes require major version changes that introduce breaking changes.

`;
}

markdown += `---

## Recommendations

### Immediate Actions Required

`;

if (bySeverity.critical.length > 0) {
  markdown += `1. **🔴 CRITICAL**: Address ${bySeverity.critical.length} critical vulnerabilities immediately\n`;
}

if (bySeverity.high.length > 0) {
  markdown += `2. **🔴 HIGH**: Address ${bySeverity.high.length} high-severity vulnerabilities\n`;
}

if (allSafeFixes.length > 0) {
  markdown += `3. **🟡 APPLY SAFE FIXES**: ${allSafeFixes.length} safe fixes available - apply and test\n`;
}

markdown += `
### Testing Strategy

Before applying any updates:

1. **Run existing test suites** to establish baseline
2. **Apply safe fixes first** using \`npm audit fix\`
3. **Run tests** after safe fixes to verify no regressions
4. **Plan major updates** for packages requiring breaking changes

## Risk Assessment

- **Security Risk**: ${bySeverity.critical.length + bySeverity.high.length} critical/high vulnerabilities pose active threats
- **Safe Fixes**: ${allSafeFixes.length} non-breaking fixes can be applied immediately
- **Breaking Changes**: Major version updates will require extensive testing and code modifications

---

*Report generated: ${new Date().toISOString()}*
`;

// Write the report
const outputFile = `dependency-audit-${currentDate}.md`;
fs.writeFileSync(outputFile, markdown);
console.log(`Dependency audit report generated: ${outputFile}`);
console.log(`Total vulnerabilities: ${allFindings.length}`);
console.log(`Safe fixes available: ${allSafeFixes.length}`);