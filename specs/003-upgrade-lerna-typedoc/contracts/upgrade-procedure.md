# Upgrade Procedure Contract

**Version**: 1.0  
**Date**: 2025-10-12  
**Status**: Specification

## Purpose

Define the step-by-step upgrade procedure for Lerna and TypeDoc with validation checkpoints at each stage.

## Pre-Upgrade Checklist

Before starting the upgrade, verify:

- [ ] Current branch is `003-upgrade-lerna-typedoc`
- [ ] Working directory is clean (no uncommitted changes)
- [ ] Node.js version is 18.x or higher (`node --version`)
- [ ] npm version is 7.x or higher (`npm --version`)
- [ ] Baseline metrics captured (see below)

### Baseline Metrics

Capture current performance and state:

```bash
# 1. Capture current docs build time
time npm run docs 2>&1 | tee baseline-docs-build.log

# 2. Capture current test execution time
time npm test 2>&1 | tee baseline-test.log

# 3. Run security audit
npm audit --json > baseline-audit.json

# 4. Verify current versions
npm list lerna typedoc --depth=0 > baseline-versions.txt
```

## Upgrade Procedure

### Step 1: Update Package Dependencies

**Action**: Update Lerna and TypeDoc versions in package.json

**Input**:
- Current `package.json` with Lerna v6.0.3, TypeDoc v0.26.0

**Output**:
- Updated `package.json` with Lerna v8.2.4, TypeDoc v0.28.14

**Validation**:
- [ ] `package.json` contains `"lerna": "^8.2.4"`
- [ ] `package.json` contains `"typedoc": "^0.28.14"`

**Rollback**: `git checkout package.json`

---

### Step 2: Configure npm Workspaces

**Action**: Add `workspaces` field to root package.json

**Input**:
- Updated `package.json` without workspaces field
- Existing `lerna.json` with packages array

**Output**:
- `package.json` with `workspaces` field matching `lerna.json` packages

**Changes**:
```json
{
  "workspaces": [
    "docs/demos",
    "packages/*"
  ]
}
```

**Validation**:
- [ ] `workspaces` array matches `lerna.json` packages array
- [ ] All workspace directories exist

**Rollback**: `git checkout package.json`

---

### Step 3: Remove Deprecated Bootstrap Script

**Action**: Update npm scripts to remove `lerna bootstrap` usage

**Input**:
- `package.json` with `bootstrap` script using `lerna bootstrap`
- `package.json` with `postinstall` script calling `npm run bootstrap`
- `package.json` with `test` script calling `npm run bootstrap`

**Output**:
- `package.json` with updated scripts using npm workspaces

**Changes**:
```json
{
  "scripts": {
    "bootstrap": "npm install",
    "build-tools": "lerna run build-tools",
    "build": "lerna run build",
    "demo": "lerna run demo",
    "docs": "lerna run docs --parallel",
    "start": "node playground-server.js",
    "start-simple": "npx http-server -p 8020 -o /docs/playground/",
    "test": "npm install && npm run build && npm run build-tools && lerna run test --parallel && npm run docs",
    "postinstall": ""
  }
}
```

**Validation**:
- [ ] No script contains `lerna bootstrap`
- [ ] No script contains `lerna add`
- [ ] No script contains `lerna link`
- [ ] `bootstrap` script uses `npm install` or is removed
- [ ] `test` script does not depend on `npm run bootstrap`
- [ ] `postinstall` script is empty or removed

**Rollback**: `git checkout package.json`

---

### Step 4: Install Updated Dependencies

**Action**: Run npm install to update dependencies and regenerate lock file

**Input**:
- Updated `package.json` with new versions and workspaces
- Old `package-lock.json`

**Output**:
- Updated `package-lock.json` with Lerna v8.2.4, TypeDoc v0.28.14
- All packages installed and linked via workspaces

**Command**:
```bash
npm install
```

**Validation**:
- [ ] Command exits with code 0
- [ ] No peer dependency errors
- [ ] `package-lock.json` is updated
- [ ] `node_modules` contains Lerna v8.2.4
- [ ] `node_modules` contains TypeDoc v0.28.14
- [ ] All workspace packages are symlinked in `node_modules`

**Rollback**: `git checkout package.json package-lock.json && npm install`

---

### Step 5: Run Lerna Repair

**Action**: Migrate lerna.json to v8 format and remove deprecated options

**Input**:
- Existing `lerna.json`

**Output**:
- Updated `lerna.json` with v8-compatible configuration

**Command**:
```bash
npx lerna repair
```

**Validation**:
- [ ] Command exits with code 0
- [ ] No deprecation warnings
- [ ] `lerna.json` is updated (if changes were needed)

**Rollback**: `git checkout lerna.json`

---

### Step 6: Verify Build Process

**Action**: Run all build scripts to ensure compatibility

**Input**:
- Updated dependencies and configuration

**Output**:
- All packages built successfully

**Commands**:
```bash
npm run build-tools
npm run build
```

**Validation**:
- [ ] `npm run build-tools` exits with code 0
- [ ] `npm run build` exits with code 0
- [ ] No compilation errors
- [ ] All packages have `dist/` directories
- [ ] Build time within 10% of baseline

**Rollback**: Full rollback (revert all changes)

---

### Step 7: Verify Documentation Generation

**Action**: Generate API documentation with TypeDoc

**Input**:
- Updated TypeDoc v0.28.14
- Existing `typedoc.json` configuration

**Output**:
- Generated documentation in `packages/photon/dist/docs/`

**Command**:
```bash
npm run docs
```

**Validation**:
- [ ] Command exits with code 0
- [ ] No deprecation warnings
- [ ] Documentation generated in expected location
- [ ] No broken links in generated docs
- [ ] Documentation content matches baseline (no missing pages)
- [ ] Build time within 10% of baseline

**Rollback**: Full rollback (revert all changes)

---

### Step 8: Run Test Suite

**Action**: Execute all tests to verify no regressions

**Input**:
- Updated dependencies
- Existing test suite

**Output**:
- All tests passing

**Command**:
```bash
npm test
```

**Validation**:
- [ ] Command exits with code 0
- [ ] All tests pass (no failures)
- [ ] No new test errors or warnings
- [ ] Test execution time within 10% of baseline

**Rollback**: Full rollback (revert all changes)

---

### Step 9: Security Audit

**Action**: Verify no new vulnerabilities introduced

**Input**:
- Updated `package-lock.json`

**Output**:
- Security audit report

**Command**:
```bash
npm audit
```

**Validation**:
- [ ] Zero high or critical vulnerabilities for Lerna
- [ ] Zero high or critical vulnerabilities for TypeDoc
- [ ] Overall vulnerability count not increased from baseline

**Rollback**: Full rollback (revert all changes)

---

### Step 10: Final Validation

**Action**: Run complete workflow end-to-end

**Input**:
- All previous steps completed successfully

**Output**:
- Clean checkout can build and test successfully

**Commands**:
```bash
# Simulate clean checkout
rm -rf node_modules package-lock.json
npm install
npm test
```

**Validation**:
- [ ] `npm install` completes without errors
- [ ] All packages linked correctly
- [ ] `npm test` passes completely
- [ ] Documentation generated successfully
- [ ] No manual intervention required

**Rollback**: Full rollback (revert all changes)

---

## Post-Upgrade Checklist

After successful upgrade:

- [ ] All validation checkpoints passed
- [ ] Performance metrics within acceptable range
- [ ] No new security vulnerabilities
- [ ] Documentation updated (CHANGELOG.md)
- [ ] Commit changes with descriptive message
- [ ] Push branch for review

## Success Criteria

The upgrade is considered successful when:

1. ✅ All build scripts execute without errors
2. ✅ All tests pass without modification
3. ✅ Documentation generates correctly
4. ✅ No high/critical security vulnerabilities
5. ✅ Performance within 10% of baseline
6. ✅ Clean install works without manual steps

## Rollback Procedure

If any validation fails:

```bash
# Full rollback
git checkout package.json package-lock.json lerna.json
npm install

# Verify rollback
npm test
```

## Acceptance Test

Final acceptance test to run before merge:

```bash
#!/bin/bash
set -e

echo "=== Acceptance Test for Lerna & TypeDoc Upgrade ==="

# Clean environment
rm -rf node_modules package-lock.json
echo "✓ Cleaned environment"

# Install dependencies
npm install
echo "✓ Dependencies installed"

# Verify versions
LERNA_VERSION=$(npm list lerna --depth=0 | grep lerna@ | sed 's/.*lerna@//')
TYPEDOC_VERSION=$(npm list typedoc --depth=0 | grep typedoc@ | sed 's/.*typedoc@//')

echo "Lerna version: $LERNA_VERSION"
echo "TypeDoc version: $TYPEDOC_VERSION"

[[ "$LERNA_VERSION" =~ ^8\.2\. ]] || { echo "✗ Lerna version incorrect"; exit 1; }
[[ "$TYPEDOC_VERSION" =~ ^0\.28\. ]] || { echo "✗ TypeDoc version incorrect"; exit 1; }
echo "✓ Versions correct"

# Build
npm run build
echo "✓ Build successful"

# Generate docs
npm run docs
echo "✓ Documentation generated"

# Run tests
npm test
echo "✓ Tests passed"

# Security audit
npm audit --audit-level=high
echo "✓ No high/critical vulnerabilities"

echo "=== All Acceptance Tests Passed ==="
```

## Notes

- Each step should be committed separately for granular rollback capability
- Capture logs at each step for debugging if needed
- Performance benchmarks should be compared against baseline
- Any deviations from expected behavior should be investigated before proceeding
