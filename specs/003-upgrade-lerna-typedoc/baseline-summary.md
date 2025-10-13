# Baseline Metrics Summary

**Date**: 2025-10-12  
**Branch**: 003-upgrade-lerna-typedoc  
**Node.js Version**: v20.13.1 ✅ (meets requirement: 18+)

## Current Versions

- **Lerna**: v6.6.2 (target: v8.2.4)
- **TypeDoc**: v0.26.11 (target: v0.28.14)

## Baseline Performance

### Documentation Build
- **Command**: `npm run docs`
- **Time**: ~2.3 seconds
- **Status**: ❌ FAILED - TypeDoc configuration issues (entry points not in tsconfig)
- **Log**: baseline-docs-build.log

### Test Execution
- **Command**: `npm test`
- **Time**: ~6.5 seconds
- **Status**: ❌ FAILED - TypeScript compilation errors in @photon/playground
- **Log**: baseline-test.log

### Security Audit
- **Command**: `npm audit`
- **Status**: ⚠️ 13 vulnerabilities (3 low, 7 moderate, 3 high)
- **High vulnerabilities**: Related to @lerna/legacy-package-management
- **Log**: baseline-audit.json

## Pre-Existing Issues

The following issues exist in the current codebase BEFORE the upgrade:

1. **TypeDoc Configuration**: Entry points not referenced in tsconfig
   - 60 warnings about entry points not in 'files' or 'include' option
   - Documentation generation fails with error

2. **TypeScript Compilation Errors** in @photon/playground:
   - Property 'paramValues' does not exist on type 'FontLoader'
   - Property 'fontsLoaded' does not exist on type 'FontLoader'
   - Property 'down' does not exist on type 'Manager'
   - Total: 16 TypeScript errors

3. **Security Vulnerabilities**:
   - @lerna/legacy-package-management (high severity)
   - Related to deprecated Lerna bootstrap functionality

## Notes

- These baseline issues are NOT caused by the upgrade
- The upgrade may help resolve some security vulnerabilities
- TypeDoc and TypeScript errors need to be addressed separately
- Build failures are expected in baseline state

## Success Criteria for Upgrade

After upgrade, we should see:
- ✅ Lerna v8.2.4 installed
- ✅ TypeDoc v0.28.14 installed
- ✅ Reduced security vulnerabilities (especially @lerna/legacy-package-management)
- ✅ Same or better build status (not worse than baseline)
- ✅ npm workspaces configured
- ✅ lerna bootstrap removed from scripts
