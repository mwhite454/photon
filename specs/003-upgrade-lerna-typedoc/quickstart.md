# Quickstart: Upgrading Lerna & TypeDoc

**Phase**: 1 (Design & Contracts)  
**Date**: 2025-10-12  
**Audience**: Developers performing the upgrade

## Overview

This guide provides step-by-step instructions for upgrading Lerna from v6.0.3 to v8.2.4 and TypeDoc from v0.26.0 to v0.28.14. The process is designed to be safe, testable, and reversible.

## Prerequisites

- Node.js 18+ installed (required by Lerna v8.x)
- Git branch `003-upgrade-lerna-typedoc` checked out
- Clean working directory (no uncommitted changes)
- Access to npm registry

## Estimated Time

**Total**: 30-45 minutes

- Research & backup: 5 minutes
- Upgrade execution: 10 minutes
- Testing & validation: 20-30 minutes

## Step-by-Step Instructions

### Step 1: Baseline Measurements (5 minutes)

Before making any changes, establish baseline metrics:

```bash
# 1. Check current versions
npm list lerna typedoc --depth=0

# 2. Measure current docs build time
time npm run docs

# 3. Run security audit
npm audit --audit-level=high

# 4. Save baseline (optional)
echo "Baseline metrics saved $(date)" > upgrade-baseline.txt
npm list lerna typedoc >> upgrade-baseline.txt
```

**Expected Output**:

- Lerna v6.0.3
- TypeDoc v0.26.0 (specified in package.json)
- Docs build time: ~XX seconds (record this)

### Step 2: Update package.json (2 minutes)

Edit `/Users/mykawhite/Documents/GitHub/photon/package.json`:

```json
{
  "devDependencies": {
    "lerna": "^8.2.4", // Changed from ^6.0.3
    "typedoc": "^0.28.14" // Update from ^0.26.0
    // ... other deps unchanged
  },
  "workspaces": [
    "docs/demos",
    "packages/*"
  ],
  "scripts": {
    "bootstrap": "npm install", // Changed from "lerna bootstrap"
    "build-tools": "lerna run build-tools",
    "build": "lerna run build",
    "demo": "lerna run demo",
    "docs": "lerna run docs --parallel",
    "start": "node playground-server.js",
    "start-simple": "npx http-server -p 8020 -o /docs/playground/",
    "test": "npm install && npm run build && npm run build-tools && lerna run test --parallel && npm run docs",
    "postinstall": "" // Removed npm run bootstrap
  }
}
```

**Key Changes**:

1. ✅ Lerna version: `^6.0.3` → `^8.2.4`
2. ✅ TypeDoc version: `^0.26.0` → `^0.28.14`
3. ✅ Added `workspaces` field (required for Lerna v7+)
4. ✅ Bootstrap script: `lerna bootstrap` → `npm install` (deprecated in v7)
5. ✅ Test script: Updated to use `npm install` instead of `npm run bootstrap`
6. ✅ Postinstall script: Removed `npm run bootstrap` call

### Step 3: Install Updated Dependencies (5 minutes)

```bash
# 1. Remove old node_modules and lock file
rm -rf node_modules package-lock.json

# 2. Install fresh with new versions
npm install

# 3. Verify installed versions
npm list lerna typedoc --depth=0
```

**Expected Output**:

```
photon-dev@1.0.0
├── lerna@8.2.4
└── typedoc@0.28.14
```

**Troubleshooting**:

- If peer dependency warnings appear, review and document them
- If install fails, check Node.js version: `node --version` (must be 18+)

### Step 4: Run Lerna Repair (2 minutes)

Migrate lerna.json to v8 format:

```bash
# Run lerna repair to update configuration
npx lerna repair
```

**Expected Output**:

- Command exits with code 0
- May update lerna.json if deprecated options found
- No errors or warnings

### Step 5: Validate Configuration (3 minutes)

Check that configuration files are compatible:

```bash
# 1. Validate lerna.json
cat lerna.json
# Should see: minimal config with packages and version

# 2. Validate typedoc.json
cat packages/photon/typedoc.json
# Should see: standard options, no deprecation warnings expected

# 3. Check for Lerna v8 compatibility
npx lerna ls
# Should list all packages without errors
```

**Expected Output**:

- `lerna ls` shows all 4 packages (photon, playground, docs, fonts)
- No deprecation warnings
- No errors about invalid configuration

### Step 6: Run Test Suite (10-15 minutes)

Validate that all functionality works:

```bash
# 1. Bootstrap packages (now uses npm install)
npm run bootstrap

# 2. Build all packages
npm run build

# 3. Generate documentation
npm run docs

# 4. Run full test suite
npm test
```

**Success Criteria** (from spec.md):

- ✅ All commands exit with code 0 (SC-003)
- ✅ All existing tests pass (SC-006, FR-012)
- ✅ Documentation generates without errors (FR-004, FR-011)
- ✅ No deprecation warnings (User Story 3, Acceptance Scenario 3)

**If Tests Fail**:

- Review error messages for breaking changes
- Check if configuration updates are needed
- Consult Lerna v8 or TypeDoc migration guides
- Consider rollback (see Step 8)

### Step 7: Performance Validation (3 minutes)

Verify no significant performance regression:

```bash
# 1. Measure new docs build time
time npm run docs

# 2. Compare to baseline from Step 1
# Calculate percentage difference
```

**Success Criterion** (SC-004):

- New build time must be within 10% of baseline
- Example: If baseline was 30s, new time must be ≤33s

### Step 8: Security Audit (2 minutes)

Verify no new vulnerabilities introduced:

```bash
# 1. Run security audit
npm audit --audit-level=high

# 2. Filter for Lerna and TypeDoc specifically
npm audit | grep -E "(lerna|typedoc)"
```

**Success Criterion** (SC-005, FR-010):

- ✅ Zero high or critical vulnerabilities for Lerna and TypeDoc
- ✅ No new vulnerabilities introduced by upgrade

### Step 9: Rollback Procedure (if needed)

If validation fails, rollback safely:

```bash
# 1. Restore original package.json
git checkout package.json

# 2. Restore original package-lock.json
git checkout package-lock.json

# 3. Reinstall original dependencies
rm -rf node_modules
npm install

# 4. Verify rollback
npm list lerna typedoc --depth=0
# Should show v6.0.3 and v0.26.0
```

## Post-Upgrade Checklist

After successful upgrade, complete these tasks:

- [ ] All tests pass (`npm test` exits with code 0)
- [ ] Documentation builds successfully (`npm run docs`)
- [ ] Performance within 10% of baseline (docs build time)
- [ ] Security audit shows zero high/critical vulnerabilities
- [ ] No deprecation warnings in output
- [ ] Update CHANGELOG.md with upgrade details
- [ ] Commit changes with descriptive message
- [ ] Optional: Open PR for review before merging to main

## Expected Changes Summary

### Files Modified

1. **package.json**: Dependency versions and bootstrap script
2. **package-lock.json**: Regenerated with new dependency tree
3. **CHANGELOG.md**: Document the upgrade (best practice)

### Files Reviewed (Minimal Changes Expected)

1. **lerna.json**: May be updated by `lerna repair` command
2. **packages/photon/typedoc.json**: Current config is v0.28-compatible (no changes needed)
3. **packages/docs/package.json**: TypeDoc CLI flags are compatible (no changes needed)

## Troubleshooting

### Issue: "lerna: command not found"

**Solution**: Lerna should be installed as devDependency. Try:

```bash
npx lerna ls
```

### Issue: Peer dependency warnings for TypeScript

**Solution**: TypeDoc v0.28.x requires TypeScript 4.6+. Project uses 5.6.3, which is compatible. Warning can be ignored or resolved by updating TypeScript peer dependency.

### Issue: "bootstrap" script not working

**Solution**: In Lerna v7+, `lerna bootstrap` is deprecated. The script has been updated to use `npm install` instead, which handles workspace linking automatically.

### Issue: Documentation output looks different

**Solution**: TypeDoc v0.28.x includes improvements to link resolution, anchor generation, and rendering. Review release notes and compare output. If output is functionally equivalent (no missing content or broken links per SC-007), this is acceptable. New features include better handling of type-only exports and improved CommonMark link parsing.

## Next Steps

After successful upgrade:

1. **Review**: Check git diff to see all changes
2. **Document**: Update CHANGELOG.md with version changes and any notable migration steps
3. **Commit**: Create a descriptive commit message
4. **Test in CI**: If CI pipeline exists, verify it passes with new versions
5. **Merge**: Create PR and merge to main branch after review

## Success Criteria Reference

From spec.md, this upgrade is successful when:

- **SC-001**: ✅ Lerna upgraded to v8.2.4 (latest stable v8.x)
- **SC-002**: ✅ TypeDoc upgraded to v0.28.14 (latest stable)
- **SC-003**: ✅ All npm scripts exit with code 0
- **SC-004**: ✅ Docs build time within 10% of baseline
- **SC-005**: ✅ Zero high/critical vulnerabilities
- **SC-006**: ✅ All tests pass without modification
- **SC-007**: ✅ Generated docs functionally equivalent
- **SC-008**: ✅ `npm install && npm test` works on clean checkout

## Support

If you encounter issues not covered in this guide:

1. Check Lerna v8 migration guide: https://lerna.js.org/docs/legacy-package-management
2. Check Lerna v9 release notes (for future reference): https://github.com/lerna/lerna/releases/tag/v9.0.0
3. Check TypeDoc v0.28 changelog: https://github.com/TypeStrong/typedoc/releases
4. Review git commit history for similar upgrades
5. Consult team lead or create issue in project repository
