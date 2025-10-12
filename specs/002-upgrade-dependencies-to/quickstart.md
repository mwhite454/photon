# Dependency Upgrade Guide

**Feature**: Critical Dependency Modernization  
**Target**: Photon Core Library Maintainers  
**Date**: 2025-10-11

## Overview

This guide provides step-by-step instructions for upgrading three critical geometric computation dependencies in the Photon library.

## Prerequisites

- Node.js 18.x, 20.x, or 22.x LTS
- npm or compatible package manager
- Git repository access
- Existing test suite passing

## Quick Start

### 1. Verify Baseline

Before making any changes, establish a baseline:

```bash
# Navigate to photon package
cd packages/photon

# Run existing tests
npm test

# Note test results and any failures
# All tests should pass before proceeding
```

### 2. Upgrade graham_scan (Low Risk)

```bash
# Update package.json
npm install graham_scan@^1.0.5

# Run tests
npm test

# Verify convex hull operations
npm test -- --grep "convex|hull"
```

**Expected Outcome**: All tests pass, no code changes required.

### 3. Upgrade bezier-js (Medium Risk)

```bash
# Update package.json
npm install bezier-js@^6.1.4

# Update type definitions (in packages/docs)
cd ../docs
npm install @types/bezier-js@^0.0.7
cd ../photon

# Run tests
npm test

# Verify Bezier operations
npm test -- --grep "bezier|curve"
```

**Expected Outcome**: All tests pass, existing compatibility shim handles version differences.

### 4. Upgrade kdbush (High Risk - Requires Code Changes)

**Step 4a: Update Code**

Edit `packages/photon/src/core/collect.ts`:

Find existing kdbush initialization patterns and refactor:

```typescript
// OLD PATTERN (v2.x) - REMOVE
const index = new KDBush(points, p => p.x, p => p.y, 64, Uint32Array);

// NEW PATTERN (v4.x) - ADD
const index = new KDBush(points.length, 64, Uint32Array);
for (const point of points) {
    index.add(point[0], point[1]);
}
index.finish();
```

**Step 4b: Update Package**

```bash
# Update package.json
npm install kdbush@^4.0.2

# Run tests
npm test

# Verify spatial indexing
npm test -- --grep "spatial|index|collect"
```

**Expected Outcome**: All tests pass after code refactoring.

### 5. Integration Testing

```bash
# Run full test suite
npm test

# Build the library
npm run build

# Check bundle size
ls -lh dist/

# Verify TypeScript compilation
npm run build:types
```

### 6. Performance Validation

```bash
# Run performance benchmarks (if available)
npm run bench

# Compare memory usage for spatial operations
# Expected: ~10% reduction in memory usage
```

## Verification Checklist

- [ ] All existing tests pass without modification
- [ ] Build completes with zero errors
- [ ] Build completes with zero new warnings
- [ ] Bundle size within 5% of baseline (or smaller)
- [ ] TypeScript compilation succeeds
- [ ] No changes to public Photon API
- [ ] Memory usage for spatial indexing improved

## Troubleshooting

### Issue: Tests fail after graham_scan upgrade

**Cause**: Unexpected API change or behavior difference  
**Solution**: 
1. Check test output for specific failures
2. Compare convex hull results with baseline
3. If results differ, investigate graham_scan changelog
4. Consider reverting to v1.0.4 and filing issue

### Issue: TypeScript errors after bezier-js upgrade

**Cause**: Type definition mismatch  
**Solution**:
1. Verify @types/bezier-js version is 0.0.7 or higher
2. Check BezierCurve-esm.ts import pattern
3. Ensure compatibility shim is in place: `const Bezier: any = BezierJsDefault`
4. If needed, temporarily use `any` type until types are updated

### Issue: kdbush initialization fails

**Cause**: Incomplete API refactoring  
**Solution**:
1. Search for all `new KDBush(` occurrences in collect.ts
2. Verify each follows new pattern: pre-allocate → add → finish
3. Check that `finish()` is called before any queries
4. Ensure point count is accurate in constructor

### Issue: Memory usage not improved

**Cause**: kdbush not using new API correctly  
**Solution**:
1. Verify using v4.x pattern (not v2.x pattern)
2. Check that `finish()` is called
3. Profile memory usage with actual workload
4. Compare with baseline measurements

## Rollback Procedure

If any upgrade causes critical issues:

```bash
# Revert package.json changes
git checkout packages/photon/package.json
git checkout packages/docs/package.json

# Revert code changes (if any)
git checkout packages/photon/src/core/collect.ts

# Reinstall dependencies
cd packages/photon && npm install
cd ../docs && npm install

# Verify baseline restored
cd ../photon && npm test
```

## Performance Benchmarking

### Baseline Measurements

Before upgrades, capture:

```bash
# Time convex hull calculation
node -e "
const { performance } = require('perf_hooks');
// Test with 1000 points
// Record time
"

# Memory usage for spatial indexing
node --expose-gc -e "
// Test with 10,000 points
// Record memory before/after
"

# Bundle size
ls -lh dist/photon.es.js dist/photon.umd.js
```

### Post-Upgrade Validation

After upgrades, repeat measurements and compare:
- Convex hull time: should be equal or better
- Spatial index memory: should be ~10% lower
- Bundle size: should be within 5% (or smaller)

## Next Steps

After successful upgrade:

1. **Update Documentation**:
   - Add entry to CHANGELOG.md
   - Update package.json with new versions
   - Commit changes with descriptive message

2. **Code Review**:
   - Submit PR with upgrade changes
   - Include test results and performance metrics
   - Document any issues encountered

3. **Release Planning**:
   - Determine version bump (PATCH recommended)
   - Plan release timeline
   - Prepare release notes

## Support

For issues or questions:
- Check existing GitHub issues
- Review dependency documentation:
  - graham_scan: https://github.com/brian3kb/graham_scan_js
  - bezier-js: https://github.com/Pomax/bezierjs
  - kdbush: https://github.com/mourner/kdbush
- File new issue with reproduction steps

## Summary

This upgrade modernizes three critical dependencies while maintaining complete backward compatibility for Photon's public API. The changes are internal only and transparent to library consumers.

**Estimated Time**: 2-4 hours including testing and validation  
**Risk Level**: Low-Medium (with proper testing)  
**Impact**: Improved performance, better memory usage, enhanced maintainability
