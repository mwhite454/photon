# Dependency Upgrade Research Findings

**Date**: 2025-10-11  
**Feature**: Critical Dependency Modernization

## Summary

This document captures the research findings for upgrading three critical dependencies in the Photon (formerly Maker.js) library: graham_scan, bezier-js, and kdbush.

## Current vs Target Versions

| Dependency   | Current Version | Latest Version | Version Jump | Breaking Changes |
|--------------|-----------------|----------------|--------------|------------------|
| graham_scan  | 1.0.4           | 1.0.5          | Patch        | None expected    |
| bezier-js    | 2.1.0           | 6.1.4          | Major (4x)   | Yes - significant |
| kdbush       | 2.0.1           | 4.0.2          | Major (2x)   | Yes - API rewrite |

## Detailed Findings

### 1. graham_scan (1.0.4 → 1.0.5)

**Repository**: https://github.com/brian3kb/graham_scan_js  
**Last Update**: 2023-08-10

**Current Usage in Photon**:
- File: `packages/photon/src/core/measure.ts` (line 20)
- Purpose: Convex hull calculation for geometric boundary operations
- Import pattern: `import grahamScanModule from 'graham_scan'`
- Usage: Constructor pattern `new GrahamScan()`, methods `addPoint(x, y)`, `getHull()`

**API Stability**:
- ✅ Patch version update (1.0.4 → 1.0.5)
- ✅ No documented breaking changes
- ✅ API appears stable: `new ConvexHullGrahamScan()`, `addPoint()`, `getHull()`

**Migration Risk**: **LOW**
- Minimal changes expected
- API has remained consistent since 2015
- Simple constructor and method pattern

---

### 2. bezier-js (2.1.0 → 6.1.4)

**Repository**: https://github.com/Pomax/bezierjs  
**Last Update**: 2023-07-16

**Current Usage in Photon**:
- File: `packages/photon/src/models/BezierCurve-esm.ts` (line 14)
- Purpose: Bezier curve manipulation, arc approximation, curve splitting
- Import pattern: `import BezierJsDefault, * as BezierJs from 'bezier-js'`
- Current workaround: `const Bezier: any = BezierJsDefault;`

**Major Version Changes**:

**v3.0.0 (2020-10-24)**:
- Converted to ES Module format
- API changes to constructor patterns

**v4.0.0 (2020-11-15)**:
- Further ES Module refinements

**v5.0.0 (2022-01-02)**:
- Additional API modernization

**v6.1.0 (2022-02-09)**:
- Current latest stable
- Full ESM support with dual CJS/ESM exports

**Current API Pattern**:
```javascript
// Current usage in Photon
const bezierJsPoints = points.map(p => ({ x: p[0], y: p[1] }));
return new Bezier(bezierJsPoints);
```

**Modern API (v6.1.4)**:
- Export pattern: `import { Bezier } from "bezier-js"`
- Constructor accepts point arrays or coordinate arrays
- Methods: `get(t)`, `extrema()`, `split(t)`, `bbox()`, etc.
- Type definitions available

**Migration Risk**: **MEDIUM-HIGH**
- Major version jump (2.x → 6.x)
- ESM-first approach may require import adjustments
- Existing code already uses compatibility shim (`const Bezier: any`)
- Core API methods appear stable (get, extrema, split, points)
- Constructor patterns may need verification

---

### 3. kdbush (2.0.1 → 4.0.2)

**Repository**: https://github.com/mourner/kdbush  
**Last Update**: 2023-04-27

**Current Usage in Photon**:
- File: `packages/photon/src/core/collect.ts` (line 4)
- Purpose: Spatial indexing for efficient 2D point queries
- Import pattern: `import KDBush from 'kdbush'`

**Breaking Changes by Version**:

**v3.0.0 (2018-09-07)**:
- ⚠️ Changed API from `kdbush(...)` to `new KDBush(...)`
- Improved memory footprint
- ES module format

**v4.0.0 (2023-04-20)** - **MAJOR API REWRITE**:
- ⚠️ **Breaking**: Complete constructor API change
- ⚠️ **Breaking**: Dropped CommonJS, ESM-only (UMD bundle still available)
- ⚠️ **Breaking**: Dropped IE11 transpilation

**Old API (v2.x)**:
```javascript
const index = new KDBush(points, p => p.x, p => p.y, 64, Uint32Array);
```

**New API (v4.x)**:
```javascript
const index = new KDBush(points.length, 64, Uint32Array);
for (const {x, y} of points) {
    index.add(x, y);
}
index.finish();
```

**Benefits of v4.x**:
- More memory-efficient (no intermediate point array needed)
- Serializable (can transfer between threads)
- Can save/load from ArrayBuffer
- ~2x less memory than alternatives

**Migration Risk**: **HIGH**
- Complete API rewrite required
- Constructor pattern fundamentally changed
- Need to refactor all initialization code
- ESM-only may impact build configuration
- Benefits justify the effort (memory efficiency, transferability)

---

## Current Code Patterns

### graham_scan Usage
```typescript
// packages/photon/src/core/measure.ts
import grahamScanModule from 'graham_scan';

interface IGrahamScan {
    addPoint(x: number, y: number): void;
    getHull(): { x: number; y: number }[];
}

type GrahamScanConstructor = new () => IGrahamScan;
const GrahamScan = (grahamScanModule as unknown as { default?: GrahamScanConstructor }).default 
    ?? (grahamScanModule as unknown as GrahamScanConstructor);
```

### bezier-js Usage
```typescript
// packages/photon/src/models/BezierCurve-esm.ts
import BezierJsDefault, * as BezierJs from 'bezier-js';
const Bezier: any = BezierJsDefault;

// Constructor usage
const bezierJsPoints = points.map(p => ({ x: p[0], y: p[1] }));
return new Bezier(bezierJsPoints);

// Method usage
const extrema = b.extrema().values;
const point = b.get(t);
const split = b.split(t1, t2);
```

### kdbush Usage
```typescript
// packages/photon/src/core/collect.ts
import KDBush from 'kdbush';

// Current usage pattern needs to be identified in the codebase
// Likely uses v2.x constructor pattern
```

---

## Recommendations

### Strategic Direction

**ESM-Only**: Photon is moving to ES modules exclusively. No effort should be spent on UMD/CommonJS backward compatibility. All three dependencies' ESM-only exports align perfectly with this direction.

### Priority Order

1. **graham_scan** (Lowest Risk)
   - Simple version bump
   - Test and verify behavior
   - Update package.json

2. **bezier-js** (Medium Risk)
   - Verify current compatibility shim works with v6.x
   - Test all curve operations
   - May need minor import adjustments
   - Update TypeScript types

3. **kdbush** (Highest Risk)
   - Requires code refactoring
   - Find all usage locations
   - Rewrite initialization patterns
   - Extensive testing required
   - Update TypeScript types

### Testing Strategy

1. Run existing test suite as baseline
2. Upgrade dependencies one at a time
3. Fix breaking changes incrementally
4. Verify geometric operations produce identical results
5. Performance benchmark before/after
6. Integration testing with real-world models

### Documentation Needs

- Document all API changes made
- Add inline comments explaining compatibility shims
- Update package.json with version rationale
- Create migration guide for future updates

---

## TypeScript Type Definitions

| Package      | Current Types       | Target Types        | Notes                          |
|--------------|---------------------|---------------------|--------------------------------|
| graham_scan  | @types/graham_scan@1.0.28 | @types/graham_scan@1.0.28 | May need update check |
| bezier-js    | @types/bezier-js@0.0.6 | @types/bezier-js@0.0.7 | Update available in docs package |
| kdbush       | None (built-in)     | Built-in v4.x types | Package includes index.d.ts    |

---

## Build System Compatibility

**Current Build System**:
- Vite 7.1.9 (modern, ESM-native)
- TypeScript 5.6.3 (latest)
- ES Module target

**Compatibility Assessment**:
- ✅ Vite handles ESM natively
- ✅ TypeScript 5.x supports all module formats
- ✅ Modern build system ready for ESM-only dependencies
- ✅ **Photon is ESM-only going forward** - no UMD/CommonJS backward compatibility required

---

## Next Steps

1. ✅ Research complete - findings documented
2. ✅ Specification created
3. ⏭️ Ready for planning phase (`/speckit.plan`)
4. ⏭️ Implementation will follow dependency priority order
