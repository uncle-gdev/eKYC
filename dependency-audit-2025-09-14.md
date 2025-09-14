# Dependency Audit Report - 2025-09-14

## Executive Summary

This audit covers the eKYC repository containing three Node.js projects:
- **Frontend**: React application
- **API**: Express.js backend  
- **Chaincode**: Hyperledger Fabric smart contract

**Total Vulnerabilities Found:** 410
- Critical: 21
- High: 110
- Moderate: 268
- Low: 11
- Info: 0

**Safe Fixes Available:** 0

---

## Security Vulnerabilities

### Critical Severity
| Component | Package | Vulnerability ID | Description | Fixed Version | Affected Paths |
|-----------|---------|------------------|-------------|---------------|----------------|
| frontend | form-data | GHSA-fjxv-7rqg-78g4 | form-data uses unsafe random function in form-data for choosing boundary | None | form-data |
| frontend | loader-utils | GHSA-76p3-8jx3-jpfq | Prototype pollution in webpack loader-utils | 5.0.1 | loader-utils, loader-utils... |
| frontend | loader-utils | GHSA-3rfm-jhwj-7488 | loader-utils is vulnerable to Regular Expression Denial of Service (ReDoS) via url variable | 5.0.1 | loader-utils, loader-utils... |
| frontend | loader-utils | GHSA-hhq3-ff78-jv3g | loader-utils is vulnerable to Regular Expression Denial of Service (ReDoS) | 5.0.1 | loader-utils, loader-utils... |
| frontend | react-dev-utils | GHSA-5q6m-3h65-w53x | react-dev-utils OS Command Injection in function `getProcessForPort` | 5.0.1 | react-dev-utils |
| frontend | react-dev-utils | N/A | N/A | 5.0.1 | react-dev-utils |
| frontend | react-dev-utils | N/A | N/A | 5.0.1 | react-dev-utils |
| frontend | react-dev-utils | N/A | N/A | 5.0.1 | react-dev-utils |
| frontend | react-dev-utils | N/A | N/A | 5.0.1 | react-dev-utils |
| frontend | react-dev-utils | N/A | N/A | 5.0.1 | react-dev-utils |
| frontend | react-dev-utils | N/A | N/A | 5.0.1 | react-dev-utils |
| frontend | react-dev-utils | N/A | N/A | 5.0.1 | react-dev-utils |
| frontend | react-dev-utils | N/A | N/A | 5.0.1 | react-dev-utils |
| frontend | request | GHSA-p8p7-x288-28g6 | Server-Side Request Forgery in Request | None | request |
| frontend | request | N/A | N/A | None | request |
| frontend | request | N/A | N/A | None | request |
| frontend | shell-quote | GHSA-g4rg-993r-mgx7 | Improper Neutralization of Special Elements used in a Command in Shell-quote | 5.0.1 | shell-quote |
| api | form-data | GHSA-fjxv-7rqg-78g4 | form-data uses unsafe random function in form-data for choosing boundary | 2.2.20 | form-data |
| api | request | GHSA-p8p7-x288-28g6 | Server-Side Request Forgery in Request | 2.2.20 | request |
| api | request | N/A | N/A | 2.2.20 | request |
| api | request | N/A | N/A | 2.2.20 | request |

### High Severity
| Component | Package | Vulnerability ID | Description | Fixed Version | Affected Paths |
|-----------|---------|------------------|-------------|---------------|----------------|
| frontend | @d8660091/react-popper | N/A | N/A | None | react-popper |
| frontend | @svgr/plugin-svgo | N/A | N/A | None | plugin-svgo |
| frontend | @svgr/rollup | N/A | N/A | None | rollup |
| frontend | @svgr/webpack | N/A | N/A | 5.0.1 | webpack |
| frontend | adjust-sourcemap-loader | N/A | N/A | 5.0.1 | adjust-sourcemap-loader |
| frontend | adjust-sourcemap-loader | N/A | N/A | 5.0.1 | adjust-sourcemap-loader |
| frontend | ansi-html | GHSA-whgm-jr23-g3j9 | Uncontrolled Resource Consumption in ansi-html | 5.0.1 | ansi-html |
| frontend | axios | GHSA-wf5p-g6vw-rhxx | Axios Cross-Site Request Forgery Vulnerability | 1.12.1 | axios |
| frontend | axios | GHSA-jr5f-v2jv-69x6 | axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute URL | 1.12.1 | axios |
| frontend | axios | GHSA-4hjh-wcwx-xvwj | Axios is vulnerable to DoS attack through lack of data size check | 1.12.1 | axios |
| frontend | bonjour | N/A | N/A | 5.0.1 | bonjour |
| frontend | braces | GHSA-grv7-fg5c-xmjg | Uncontrolled resource consumption in braces | 5.0.1 | braces |
| frontend | chokidar | N/A | N/A | 5.0.1 | chokidar, chokidar |
| frontend | chokidar | N/A | N/A | 5.0.1 | chokidar, chokidar |
| frontend | chokidar | N/A | N/A | 5.0.1 | chokidar, chokidar |
| frontend | cross-spawn | GHSA-3xgq-45jj-v275 | Regular Expression Denial of Service (ReDoS) in cross-spawn | 5.0.1 | cross-spawn |
| frontend | css-select | N/A | N/A | None | css-select |
| frontend | dns-packet | N/A | N/A | 5.0.1 | dns-packet |
| frontend | fbjs | N/A | N/A | None | fbjs |
| frontend | http-proxy-middleware | GHSA-c7qv-q95q-8v27 | Denial of service in http-proxy-middleware | 5.0.1 | http-proxy-middleware |
| frontend | http-proxy-middleware | N/A | N/A | 5.0.1 | http-proxy-middleware |
| frontend | ip | GHSA-2p57-rm9w-gvfp | ip SSRF improper categorization in isPublic | 5.0.1 | ip |
| frontend | isomorphic-fetch | N/A | N/A | None | isomorphic-fetch |
| frontend | lodash.template | GHSA-35jh-r3h4-6jhm | Command Injection in lodash | 5.0.1 | lodash.template |
| frontend | micromatch | GHSA-952p-6rrq-rcjv | Regular Expression Denial of Service (ReDoS) in micromatch | 5.0.1 | micromatch |
| frontend | micromatch | N/A | N/A | 5.0.1 | micromatch |
| frontend | minimatch | GHSA-f8q6-p94x-37v3 | minimatch ReDoS vulnerability | 5.0.1 | minimatch |
| frontend | multicast-dns | N/A | N/A | 5.0.1 | multicast-dns |
| frontend | node-fetch | GHSA-r683-j2x4-v87g | node-fetch forwards secure headers to untrusted sites | None | node-fetch |
| frontend | node-forge | GHSA-5rrq-pxf6-6jx5 | Prototype Pollution in node-forge debug API. | 5.0.1 | node-forge |
| frontend | node-forge | GHSA-gf8q-jrpm-jvxq | URL parsing in node-forge could lead to undesired behavior. | 5.0.1 | node-forge |
| frontend | node-forge | GHSA-2r2c-g63r-vccr | Improper Verification of Cryptographic Signature in `node-forge` | 5.0.1 | node-forge |
| frontend | node-forge | GHSA-8fr3-hfg3-gpgp | Open Redirect in node-forge | 5.0.1 | node-forge |
| frontend | node-forge | GHSA-x4jg-mjrx-434g | Improper Verification of Cryptographic Signature in node-forge | 5.0.1 | node-forge |
| frontend | node-forge | GHSA-cfm4-qjh2-4765 | Improper Verification of Cryptographic Signature in node-forge | 5.0.1 | node-forge |
| frontend | nth-check | GHSA-rp65-9cf3-cjxr | Inefficient Regular Expression Complexity in nth-check | None | nth-check |
| frontend | object-path | GHSA-v39p-96qg-c8rf | Prototype Pollution in object-path | 5.0.1 | object-path |
| frontend | object-path | GHSA-cwx2-736x-mf6w | Prototype pollution in object-path | 5.0.1 | object-path |
| frontend | object-path | GHSA-8v63-cqqc-6r2c | Prototype Pollution in object-path | 5.0.1 | object-path |
| frontend | postcss-svgo | N/A | N/A | None | postcss-svgo |
| frontend | postcss-svgo | N/A | N/A | None | postcss-svgo |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | react-scripts | N/A | N/A | 5.0.1 | react-scripts |
| frontend | recompose | N/A | N/A | None | recompose |
| frontend | recursive-readdir | N/A | N/A | 5.0.1 | recursive-readdir |
| frontend | resolve-url-loader | N/A | N/A | 5.0.1 | resolve-url-loader |
| frontend | resolve-url-loader | N/A | N/A | 5.0.1 | resolve-url-loader |
| frontend | resolve-url-loader | N/A | N/A | 5.0.1 | resolve-url-loader |
| frontend | rimble-ui | N/A | N/A | None | rimble-ui |
| frontend | rimble-ui | N/A | N/A | None | rimble-ui |
| frontend | selfsigned | N/A | N/A | 5.0.1 | selfsigned |
| frontend | semver | GHSA-c2qf-rxjj-qqgw | semver vulnerable to Regular Expression Denial of Service | 5.0.1 | semver |
| frontend | serialize-javascript | GHSA-hxcc-f52p-wc94 | Insecure serialization leading to RCE in serialize-javascript | 5.0.1 | serialize-javascript |
| frontend | svgo | N/A | N/A | None | svgo |
| frontend | terser-webpack-plugin | N/A | N/A | 5.0.1 | terser-webpack-plugin, terser-webpack-plugin |
| frontend | terser-webpack-plugin | N/A | N/A | 5.0.1 | terser-webpack-plugin, terser-webpack-plugin |
| frontend | watchpack | N/A | N/A | None | watchpack |
| frontend | watchpack-chokidar2 | N/A | N/A | None | watchpack-chokidar2 |
| frontend | webpack-dev-middleware | GHSA-wr3j-pwj9-hqq6 | Path traversal in webpack-dev-middleware | 5.0.1 | webpack-dev-middleware |
| frontend | webpack-dev-server | GHSA-9jgg-88mc-972h | webpack-dev-server users' source code may be stolen when they access a malicious web site with non-Chromium based browser | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | GHSA-4v9v-hfq4-rm2v | webpack-dev-server users' source code may be stolen when they access a malicious web site | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | N/A | N/A | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | N/A | N/A | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | N/A | N/A | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | N/A | N/A | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | N/A | N/A | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | N/A | N/A | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | N/A | N/A | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | N/A | N/A | 5.0.1 | webpack-dev-server |
| frontend | webpack-dev-server | N/A | N/A | 5.0.1 | webpack-dev-server |
| frontend | workbox-build | N/A | N/A | 5.0.1 | workbox-build |
| frontend | workbox-webpack-plugin | N/A | N/A | 5.0.1 | workbox-webpack-plugin |
| api | fabric-ca-client | N/A | N/A | 2.2.20 | fabric-ca-client, fabric-ca-client... |
| api | fabric-ca-client | N/A | N/A | 2.2.20 | fabric-ca-client, fabric-ca-client... |
| api | fabric-client | N/A | N/A | 2.2.20 | fabric-client |
| api | fabric-client | N/A | N/A | 2.2.20 | fabric-client |
| api | fabric-client | N/A | N/A | 2.2.20 | fabric-client |
| api | fabric-common | N/A | N/A | 2.2.20 | fabric-common |
| api | fabric-network | N/A | N/A | 2.2.20 | fabric-network |
| api | fabric-network | N/A | N/A | 2.2.20 | fabric-network |
| api | fabric-network | N/A | N/A | 2.2.20 | fabric-network |
| api | jsrsasign | GHSA-rh63-9qcf-83gf | Marvin Attack of RSA and RSAOAEP decryption in jsrsasign | 2.2.20 | jsrsasign |
| api | nodemon | N/A | N/A | None | nodemon |
| api | semver | GHSA-c2qf-rxjj-qqgw | semver vulnerable to Regular Expression Denial of Service | None | semver |
| api | simple-update-notifier | N/A | N/A | None | simple-update-notifier |

### Moderate Severity
| Component | Package | Vulnerability ID | Description | Fixed Version | Affected Paths |
|-----------|---------|------------------|-------------|---------------|----------------|
| frontend | @babel/runtime | GHSA-968p-4wvh-cqc8 | Babel has inefficient RegExp complexity in generated code with .replace when transpiling named capturing groups | 5.0.1 | runtime |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/core | N/A | N/A | None | core |
| frontend | @jest/environment | N/A | N/A | None | environment |
| frontend | @jest/environment | N/A | N/A | None | environment |
| frontend | @jest/fake-timers | N/A | N/A | None | fake-timers |
| frontend | @jest/reporters | N/A | N/A | None | reporters |
| frontend | @jest/reporters | N/A | N/A | None | reporters |
| frontend | @jest/reporters | N/A | N/A | None | reporters |
| frontend | @jest/reporters | N/A | N/A | None | reporters |
| frontend | @jest/reporters | N/A | N/A | None | reporters |
| frontend | @jest/reporters | N/A | N/A | None | reporters |
| frontend | @jest/test-sequencer | N/A | N/A | None | test-sequencer |
| frontend | @jest/test-sequencer | N/A | N/A | None | test-sequencer |
| frontend | @jest/test-sequencer | N/A | N/A | None | test-sequencer |
| frontend | @jest/transform | N/A | N/A | None | transform |
| frontend | @jest/transform | N/A | N/A | None | transform |
| frontend | @jest/transform | N/A | N/A | None | transform |
| frontend | anymatch | N/A | N/A | 5.0.1 | anymatch |
| frontend | autoprefixer | N/A | N/A | 5.0.1 | autoprefixer |
| frontend | babel-jest | N/A | N/A | None | babel-jest |
| frontend | babel-preset-react-app | N/A | N/A | 5.0.1 | babel-preset-react-app |
| frontend | browserslist | GHSA-w8qv-6jwh-64r5 | Regular Expression Denial of Service in browserslist | 5.0.1 | browserslist |
| frontend | css-blank-pseudo | N/A | N/A | 5.0.1 | css-blank-pseudo |
| frontend | css-declaration-sorter | N/A | N/A | None | css-declaration-sorter |
| frontend | css-has-pseudo | N/A | N/A | None | css-has-pseudo |
| frontend | css-loader | N/A | N/A | 5.0.1 | css-loader |
| frontend | css-loader | N/A | N/A | 5.0.1 | css-loader |
| frontend | css-loader | N/A | N/A | 5.0.1 | css-loader |
| frontend | css-loader | N/A | N/A | 5.0.1 | css-loader |
| frontend | css-loader | N/A | N/A | 5.0.1 | css-loader |
| frontend | css-loader | N/A | N/A | 5.0.1 | css-loader |
| frontend | css-prefers-color-scheme | N/A | N/A | 5.0.1 | css-prefers-color-scheme |
| frontend | cssnano | N/A | N/A | None | cssnano |
| frontend | cssnano | N/A | N/A | None | cssnano |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-preset-default | N/A | N/A | None | cssnano-preset-default |
| frontend | cssnano-util-raw-cache | N/A | N/A | None | cssnano-util-raw-cache |
| frontend | expect | N/A | N/A | None | expect |
| frontend | fast-glob | N/A | N/A | 5.0.1 | fast-glob |
| frontend | file-loader | N/A | N/A | None | file-loader |
| frontend | fork-ts-checker-webpack-plugin | N/A | N/A | 5.0.1 | fork-ts-checker-webpack-plugin |
| frontend | globby | N/A | N/A | 5.0.1 | globby |
| frontend | html-webpack-plugin | N/A | N/A | 5.0.1 | html-webpack-plugin |
| frontend | icss-utils | N/A | N/A | 5.0.1 | icss-utils |
| frontend | jest | N/A | N/A | None | jest |
| frontend | jest-cli | N/A | N/A | None | jest-cli |
| frontend | jest-cli | N/A | N/A | None | jest-cli |
| frontend | jest-cli | N/A | N/A | None | jest-cli |
| frontend | jest-config | N/A | N/A | None | jest-config |
| frontend | jest-config | N/A | N/A | None | jest-config |
| frontend | jest-config | N/A | N/A | None | jest-config |
| frontend | jest-config | N/A | N/A | None | jest-config |
| frontend | jest-config | N/A | N/A | None | jest-config |
| frontend | jest-config | N/A | N/A | None | jest-config |
| frontend | jest-config | N/A | N/A | None | jest-config |
| frontend | jest-each | N/A | N/A | None | jest-each |
| frontend | jest-environment-jsdom | N/A | N/A | None | jest-environment-jsdom |
| frontend | jest-environment-jsdom | N/A | N/A | None | jest-environment-jsdom |
| frontend | jest-environment-jsdom | N/A | N/A | None | jest-environment-jsdom |
| frontend | jest-environment-jsdom | N/A | N/A | None | jest-environment-jsdom |
| frontend | jest-environment-jsdom-fourteen | N/A | N/A | None | jest-environment-jsdom-fourteen |
| frontend | jest-environment-jsdom-fourteen | N/A | N/A | None | jest-environment-jsdom-fourteen |
| frontend | jest-environment-jsdom-fourteen | N/A | N/A | None | jest-environment-jsdom-fourteen |
| frontend | jest-environment-node | N/A | N/A | None | jest-environment-node |
| frontend | jest-environment-node | N/A | N/A | None | jest-environment-node |
| frontend | jest-environment-node | N/A | N/A | None | jest-environment-node |
| frontend | jest-haste-map | N/A | N/A | None | jest-haste-map |
| frontend | jest-haste-map | N/A | N/A | None | jest-haste-map |
| frontend | jest-haste-map | N/A | N/A | None | jest-haste-map |
| frontend | jest-haste-map | N/A | N/A | None | jest-haste-map |
| frontend | jest-jasmine2 | N/A | N/A | None | jest-jasmine2 |
| frontend | jest-jasmine2 | N/A | N/A | None | jest-jasmine2 |
| frontend | jest-jasmine2 | N/A | N/A | None | jest-jasmine2 |
| frontend | jest-jasmine2 | N/A | N/A | None | jest-jasmine2 |
| frontend | jest-jasmine2 | N/A | N/A | None | jest-jasmine2 |
| frontend | jest-jasmine2 | N/A | N/A | None | jest-jasmine2 |
| frontend | jest-jasmine2 | N/A | N/A | None | jest-jasmine2 |
| frontend | jest-message-util | N/A | N/A | None | jest-message-util |
| frontend | jest-resolve-dependencies | N/A | N/A | None | jest-resolve-dependencies |
| frontend | jest-runner | N/A | N/A | None | jest-runner |
| frontend | jest-runner | N/A | N/A | None | jest-runner |
| frontend | jest-runner | N/A | N/A | None | jest-runner |
| frontend | jest-runner | N/A | N/A | None | jest-runner |
| frontend | jest-runner | N/A | N/A | None | jest-runner |
| frontend | jest-runner | N/A | N/A | None | jest-runner |
| frontend | jest-runner | N/A | N/A | None | jest-runner |
| frontend | jest-runtime | N/A | N/A | None | jest-runtime |
| frontend | jest-runtime | N/A | N/A | None | jest-runtime |
| frontend | jest-runtime | N/A | N/A | None | jest-runtime |
| frontend | jest-runtime | N/A | N/A | None | jest-runtime |
| frontend | jest-runtime | N/A | N/A | None | jest-runtime |
| frontend | jest-runtime | N/A | N/A | None | jest-runtime |
| frontend | jest-runtime | N/A | N/A | None | jest-runtime |
| frontend | jest-snapshot | N/A | N/A | None | jest-snapshot |
| frontend | jest-snapshot | N/A | N/A | None | jest-snapshot |
| frontend | jest-util | N/A | N/A | None | jest-util |
| frontend | jest-watch-typeahead | N/A | N/A | None | jest-watch-typeahead |
| frontend | jest-watcher | N/A | N/A | None | jest-watcher |
| frontend | jsdom | N/A | N/A | None | jsdom, jsdom |
| frontend | jsdom | N/A | N/A | None | jsdom, jsdom |
| frontend | jsdom | N/A | N/A | None | jsdom, jsdom |
| frontend | mini-css-extract-plugin | N/A | N/A | None | mini-css-extract-plugin |
| frontend | node-notifier | GHSA-5fw9-fq32-wv5p | OS Command Injection in node-notifier | None | node-notifier |
| frontend | optimize-css-assets-webpack-plugin | N/A | N/A | None | optimize-css-assets-webpack-plugin |
| frontend | optimize-css-assets-webpack-plugin | N/A | N/A | None | optimize-css-assets-webpack-plugin |
| frontend | postcss | GHSA-hwj9-h5mp-3pm3 | Regular Expression Denial of Service in postcss | 5.0.1 | postcss, postcss |
| frontend | postcss | GHSA-566m-qj78-rww5 | Regular Expression Denial of Service in postcss | 5.0.1 | postcss, postcss |
| frontend | postcss | GHSA-7fh5-64p2-3v2j | PostCSS line return parsing error | 5.0.1 | postcss, postcss |
| frontend | postcss-attribute-case-insensitive | N/A | N/A | None | postcss-attribute-case-insensitive |
| frontend | postcss-browser-comments | N/A | N/A | 5.0.1 | postcss-browser-comments |
| frontend | postcss-calc | N/A | N/A | None | postcss-calc |
| frontend | postcss-color-functional-notation | N/A | N/A | None | postcss-color-functional-notation |
| frontend | postcss-color-gray | N/A | N/A | 5.0.1 | postcss-color-gray |
| frontend | postcss-color-hex-alpha | N/A | N/A | None | postcss-color-hex-alpha |
| frontend | postcss-color-mod-function | N/A | N/A | 5.0.1 | postcss-color-mod-function |
| frontend | postcss-color-rebeccapurple | N/A | N/A | None | postcss-color-rebeccapurple |
| frontend | postcss-colormin | N/A | N/A | None | postcss-colormin |
| frontend | postcss-convert-values | N/A | N/A | None | postcss-convert-values |
| frontend | postcss-custom-media | N/A | N/A | None | postcss-custom-media |
| frontend | postcss-custom-properties | N/A | N/A | None | postcss-custom-properties |
| frontend | postcss-custom-selectors | N/A | N/A | None | postcss-custom-selectors |
| frontend | postcss-dir-pseudo-class | N/A | N/A | None | postcss-dir-pseudo-class |
| frontend | postcss-discard-comments | N/A | N/A | None | postcss-discard-comments |
| frontend | postcss-discard-duplicates | N/A | N/A | None | postcss-discard-duplicates |
| frontend | postcss-discard-empty | N/A | N/A | None | postcss-discard-empty |
| frontend | postcss-discard-overridden | N/A | N/A | None | postcss-discard-overridden |
| frontend | postcss-double-position-gradients | N/A | N/A | 5.0.1 | postcss-double-position-gradients |
| frontend | postcss-env-function | N/A | N/A | None | postcss-env-function |
| frontend | postcss-flexbugs-fixes | N/A | N/A | 5.0.1 | postcss-flexbugs-fixes |
| frontend | postcss-focus-visible | N/A | N/A | 5.0.1 | postcss-focus-visible |
| frontend | postcss-focus-within | N/A | N/A | 5.0.1 | postcss-focus-within |
| frontend | postcss-font-variant | N/A | N/A | None | postcss-font-variant |
| frontend | postcss-gap-properties | N/A | N/A | None | postcss-gap-properties |
| frontend | postcss-image-set-function | N/A | N/A | None | postcss-image-set-function |
| frontend | postcss-initial | N/A | N/A | 5.0.1 | postcss-initial |
| frontend | postcss-lab-function | N/A | N/A | None | postcss-lab-function |
| frontend | postcss-loader | N/A | N/A | None | postcss-loader |
| frontend | postcss-logical | N/A | N/A | None | postcss-logical |
| frontend | postcss-media-minmax | N/A | N/A | None | postcss-media-minmax |
| frontend | postcss-merge-longhand | N/A | N/A | None | postcss-merge-longhand |
| frontend | postcss-merge-longhand | N/A | N/A | None | postcss-merge-longhand |
| frontend | postcss-merge-rules | N/A | N/A | None | postcss-merge-rules |
| frontend | postcss-minify-font-values | N/A | N/A | None | postcss-minify-font-values |
| frontend | postcss-minify-gradients | N/A | N/A | None | postcss-minify-gradients |
| frontend | postcss-minify-params | N/A | N/A | None | postcss-minify-params |
| frontend | postcss-minify-selectors | N/A | N/A | None | postcss-minify-selectors |
| frontend | postcss-modules-extract-imports | N/A | N/A | None | postcss-modules-extract-imports |
| frontend | postcss-modules-local-by-default | N/A | N/A | None | postcss-modules-local-by-default |
| frontend | postcss-modules-local-by-default | N/A | N/A | None | postcss-modules-local-by-default |
| frontend | postcss-modules-scope | N/A | N/A | None | postcss-modules-scope |
| frontend | postcss-modules-values | N/A | N/A | 5.0.1 | postcss-modules-values |
| frontend | postcss-modules-values | N/A | N/A | 5.0.1 | postcss-modules-values |
| frontend | postcss-nesting | N/A | N/A | None | postcss-nesting |
| frontend | postcss-normalize | N/A | N/A | 5.0.1 | postcss-normalize |
| frontend | postcss-normalize | N/A | N/A | 5.0.1 | postcss-normalize |
| frontend | postcss-normalize-charset | N/A | N/A | None | postcss-normalize-charset |
| frontend | postcss-normalize-display-values | N/A | N/A | None | postcss-normalize-display-values |
| frontend | postcss-normalize-positions | N/A | N/A | None | postcss-normalize-positions |
| frontend | postcss-normalize-repeat-style | N/A | N/A | None | postcss-normalize-repeat-style |
| frontend | postcss-normalize-string | N/A | N/A | None | postcss-normalize-string |
| frontend | postcss-normalize-timing-functions | N/A | N/A | None | postcss-normalize-timing-functions |
| frontend | postcss-normalize-unicode | N/A | N/A | None | postcss-normalize-unicode |
| frontend | postcss-normalize-url | N/A | N/A | None | postcss-normalize-url |
| frontend | postcss-normalize-whitespace | N/A | N/A | None | postcss-normalize-whitespace |
| frontend | postcss-ordered-values | N/A | N/A | None | postcss-ordered-values |
| frontend | postcss-overflow-shorthand | N/A | N/A | None | postcss-overflow-shorthand |
| frontend | postcss-page-break | N/A | N/A | 5.0.1 | postcss-page-break |
| frontend | postcss-place | N/A | N/A | None | postcss-place |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-preset-env | N/A | N/A | 5.0.1 | postcss-preset-env |
| frontend | postcss-pseudo-class-any-link | N/A | N/A | None | postcss-pseudo-class-any-link |
| frontend | postcss-reduce-initial | N/A | N/A | None | postcss-reduce-initial |
| frontend | postcss-reduce-transforms | N/A | N/A | None | postcss-reduce-transforms |
| frontend | postcss-replace-overflow-wrap | N/A | N/A | None | postcss-replace-overflow-wrap |
| frontend | postcss-safe-parser | N/A | N/A | 5.0.1 | postcss-safe-parser |
| frontend | postcss-selector-matches | N/A | N/A | None | postcss-selector-matches |
| frontend | postcss-selector-not | N/A | N/A | None | postcss-selector-not |
| frontend | postcss-unique-selectors | N/A | N/A | None | postcss-unique-selectors |
| frontend | readdirp | N/A | N/A | 5.0.1 | readdirp, readdirp |
| frontend | request-promise-core | N/A | N/A | None | request-promise-core |
| frontend | request-promise-native | N/A | N/A | None | request-promise-native |
| frontend | request-promise-native | N/A | N/A | None | request-promise-native |
| frontend | request-promise-native | N/A | N/A | None | request-promise-native |
| frontend | sane | N/A | N/A | None | sane |
| frontend | sane | N/A | N/A | None | sane |
| frontend | sockjs | GHSA-c9g6-9335-x697 | Improper Input Validation in SocksJS-Node | 5.0.1 | sockjs |
| frontend | stylehacks | N/A | N/A | None | stylehacks |
| frontend | tough-cookie | GHSA-72xf-g2v4-qvf3 | tough-cookie Prototype Pollution vulnerability | None | tough-cookie |
| frontend | url-loader | N/A | N/A | 5.0.1 | url-loader |
| frontend | webpack | N/A | N/A | 5.0.1 | webpack |
| frontend | webpack | N/A | N/A | 5.0.1 | webpack |
| frontend | yargs | N/A | N/A | 5.0.1 | yargs |
| frontend | yargs-parser | GHSA-p9pc-299p-vxgp | yargs-parser Vulnerable to Prototype Pollution | 5.0.1 | yargs-parser |
| api | cloudant-follow | N/A | N/A | 2.2.20 | cloudant-follow |
| api | nano | N/A | N/A | 2.2.20 | nano |
| api | nano | N/A | N/A | 2.2.20 | nano |
| api | tough-cookie | GHSA-72xf-g2v4-qvf3 | tough-cookie Prototype Pollution vulnerability | 2.2.20 | tough-cookie |

### Low Severity
| Component | Package | Vulnerability ID | Description | Fixed Version | Affected Paths |
|-----------|---------|------------------|-------------|---------------|----------------|
| frontend | @typescript-eslint/eslint-plugin | N/A | N/A | None | eslint-plugin |
| frontend | @typescript-eslint/parser | N/A | N/A | None | parser |
| frontend | cookie | GHSA-pxg6-pf52-xh8x | cookie accepts cookie name, path, and domain with out of bounds characters | 8.0.1 | cookie |
| frontend | eslint | N/A | N/A | 5.0.1 | eslint |
| frontend | eslint-config-react-app | N/A | N/A | None | eslint-config-react-app |
| frontend | eslint-loader | N/A | N/A | 5.0.1 | eslint-loader |
| frontend | external-editor | N/A | N/A | 5.0.1 | external-editor |
| frontend | inquirer | N/A | N/A | 5.0.1 | inquirer, inquirer |
| frontend | react-cookie | N/A | N/A | 8.0.1 | react-cookie |
| frontend | tmp | GHSA-52f5-9888-hmc6 | tmp allows arbitrary temporary file / directory write via symbolic link `dir` parameter | 5.0.1 | tmp |
| frontend | universal-cookie | N/A | N/A | 8.0.1 | universal-cookie |

## Safe Fixes Available

**No patch/minor updates available** - all fixes require major version changes that introduce breaking changes.

---

## Recommendations

### Immediate Actions Required

1. **🔴 CRITICAL**: Address 21 critical vulnerabilities immediately
2. **🔴 HIGH**: Address 110 high-severity vulnerabilities

### Testing Strategy

Before applying any updates:

1. **Run existing test suites** to establish baseline
2. **Apply safe fixes first** using `npm audit fix`
3. **Run tests** after safe fixes to verify no regressions
4. **Plan major updates** for packages requiring breaking changes

## Risk Assessment

- **Security Risk**: 131 critical/high vulnerabilities pose active threats
- **Safe Fixes**: 0 non-breaking fixes can be applied immediately
- **Breaking Changes**: Major version updates will require extensive testing and code modifications

---

*Report generated: 2025-09-14T07:56:24.115Z*
