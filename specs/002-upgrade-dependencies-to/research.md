# Phase 0: Research & Migration Patterns

**Feature**: Critical Dependency Modernization  
**Date**: 2025-10-11  
**Status**: Complete

## Overview

This document consolidates research findings and defines migration patterns for upgrading three critical dependencies: graham_scan, bezier-js, and kdbush.

## Research Findings Summary

### 1. graham_scan Migration Pattern

**Decision**: Direct version upgrade with minimal changes

**Current State**:
- Version: 1.0.4
- Usage: `packages/photon/src/core/measure.ts`
- Pattern: Constructor with `addPoint()` and `getHull()` methods

**Target State**:
- Version: 1.0.5
- API: Unchanged (stable API since 2015)
- Migration: Update package.json only

**Rationale**: 
- Patch version update indicates bug fixes only
- No documented breaking changes
- API has remained stable for 8+ years
- Lowest risk upgrade

**Migration Steps**:
1. Update `packages/photon/package.json`: `"graham_scan": "^1.0.5"`
2. Run `npm install` in packages/photon
3. Run existing test suite
4. Verify convex hull calculations produce identical results

**Alternatives Considered**:
- Vendor the library: Rejected - unnecessary for stable, maintained package
- Rewrite convex hull algorithm: Rejected - no benefit, high risk

---

### 2. bezier-js Migration Pattern

**Decision**: Upgrade to v6.x with compatibility verification

**Current State**:
- Version: 2.1.0
- Usage: `packages/photon/src/models/BezierCurve-esm.ts`
- Pattern: Already uses compatibility shim (`const Bezier: any = BezierJsDefault`)
- Import: `import BezierJsDefault, * as BezierJs from 'bezier-js'`

**Target State**:
- Version: 6.1.4
- API: ESM-first with dual CJS/ESM exports
- Core methods stable: `get()`, `extrema()`, `split()`, `points`

**Rationale**:
- Major version jump (2.x → 6.x) but core API stable
- Existing compatibility shim already handles module format differences
- ESM-first approach aligns with Photon's ESM-only direction
- Performance and maintenance benefits from modern version

**Migration Steps**:
1. Update `packages/photon/package.json`: `"bezier-js": "^6.1.4"`
2. Update `packages/docs/package.json`: `"@types/bezier-js": "^0.0.7"`
3. Run `npm install` in both packages
4. Verify existing import pattern still works
5. Test all Bezier curve operations:
   - Curve construction from points
   - `extrema()` calculations
   - `get(t)` point evaluation
   - `split()` operations
   - Arc approximation
6. Run full test suite

**Known Compatibility Considerations**:
- Constructor accepts both point arrays and coordinate arrays
- Type definitions may need adjustment if using strict TypeScript
- Existing `any` type on Bezier variable provides flexibility

**Alternatives Considered**:
- Stay on v2.x: Rejected - missing 4 years of improvements and bug fixes
- Upgrade to v5.x: Rejected - v6.x is current stable with no additional risk
- Rewrite Bezier operations: Rejected - unnecessary complexity

---

### 3. kdbush Migration Pattern

**Decision**: Upgrade to v4.x with API refactoring

**Current State**:
- Version: 2.0.1
- Usage: `packages/photon/src/core/collect.ts`
- Pattern: v2.x constructor `new KDBush(points, p => p.x, p => p.y, nodeSize, ArrayType)`

**Target State**:
- Version: 4.0.2
- API: Complete rewrite (breaking changes)
- Pattern: Pre-allocate, add points, finish indexing

**Rationale**:
- v4.x provides significant memory improvements (~2x reduction)
- Serializable index (transferable between threads)
- ESM-only aligns with Photon's direction
- Performance benefits justify refactoring effort

**API Changes**:

**Old Pattern (v2.x)**:
```typescript
const index = new KDBush(points, p => p.x, p => p.y, 64, Uint32Array);
const results = index.range(minX, minY, maxX, maxY);
```

**New Pattern (v4.x)**:
```typescript
const index = new KDBush(points.length, 64, Uint32Array);
for (const {x, y} of points) {
    index.add(x, y);
}
index.finish();
const results = index.range(minX, minY, maxX, maxY);
```

**Migration Steps**:
1. Identify all kdbush usage locations in `collect.ts`
2. Refactor initialization pattern:
   - Replace constructor with pre-allocation
   - Add loop to populate index with `add(x, y)`
   - Call `finish()` before first query
3. Update `packages/photon/package.json`: `"kdbush": "^4.0.2"`
4. Remove `@types/kdbush` if present (v4.x includes types)
5. Run `npm install`
6. Test spatial indexing operations:
   - Point insertion
   - Range queries
   - Radius queries
   - Performance benchmarks
7. Verify memory usage improvements

**Code Transformation Example**:

**Before**:
```typescript
import KDBush from 'kdbush';

function createIndex(points: IPoint[]) {
    return new KDBush(
        points,
        p => p[0],  // x accessor
        p => p[1],  // y accessor
        64,         // node size
        Uint32Array
    );
}
```

**After**:
```typescript
import KDBush from 'kdbush';

function createIndex(points: IPoint[]) {
    const index = new KDBush(points.length, 64, Uint32Array);
    for (const point of points) {
        index.add(point[0], point[1]);
    }
    index.finish();
    return index;
}
```

**Alternatives Considered**:
- Stay on v2.x: Rejected - missing critical memory improvements
- Upgrade to v3.x: Rejected - v4.x is current stable, no reason to stop at v3
- Use different spatial index library: Rejected - kdbush is optimal for point-only indexing

---

## Testing Strategy

### Test Execution Order

1. **Baseline Tests**: Run existing test suite before any changes
2. **graham_scan**: Upgrade and test (lowest risk)
3. **bezier-js**: Upgrade and test (medium risk)
4. **kdbush**: Refactor, upgrade, and test (highest risk)
5. **Integration Tests**: Full test suite with all upgrades
6. **Performance Benchmarks**: Compare before/after metrics

### Success Criteria Validation

Each upgrade must satisfy:
- ✅ All existing tests pass without modification
- ✅ Build completes with zero errors/warnings
- ✅ Bundle size within 5% of baseline
- ✅ No breaking changes to public Photon API
- ✅ TypeScript compilation succeeds

### Performance Benchmarks

**Baseline Measurements** (before upgrades):
- Convex hull calculation time (1000 points)
- Bezier curve operations (100 curves)
- Spatial index creation + query (10,000 points)
- Memory usage for spatial indexing
- Total bundle size

**Target Improvements**:
- kdbush memory usage: -10% or better
- Bundle size: maintained or reduced
- Operation times: maintained or improved

---

## Risk Mitigation

### High-Risk Areas

1. **kdbush API Changes**: Complete refactoring required
   - Mitigation: Comprehensive testing of all spatial operations
   - Fallback: Can revert to v2.x if issues arise

2. **bezier-js Major Version Jump**: 4 major versions
   - Mitigation: Existing compatibility shim provides buffer
   - Fallback: Pin to v5.x if v6.x has issues

3. **Type Definition Mismatches**: @types packages may lag
   - Mitigation: Test TypeScript compilation early
   - Fallback: Use `any` types temporarily if needed

### Rollback Plan

If any upgrade causes issues:
1. Revert package.json changes
2. Run `npm install` to restore previous versions
3. Document the issue
4. Investigate root cause before retry

---

## Dependencies Between Upgrades

**No dependencies** - Each upgrade is independent:
- graham_scan, bezier-js, and kdbush have no interdependencies
- Can be upgraded in any order
- Recommended order: lowest risk → highest risk

---

## Documentation Updates Required

1. **package.json**: Version updates with commit message explaining changes
2. **Inline Comments**: Document any compatibility shims or workarounds
3. **CHANGELOG.md**: Document dependency upgrades in next release
4. **Migration Guide**: Not required (internal changes only, no public API impact)

---

## Conclusion

All research is complete. Migration patterns are defined for each dependency with clear steps, rationale, and risk mitigation strategies. Ready to proceed to Phase 1 (design artifacts).
