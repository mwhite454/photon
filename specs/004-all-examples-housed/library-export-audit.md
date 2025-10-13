# Library Export Audit Report

**Date**: 2025-10-13  
**Tasks**: T103-T107  
**Purpose**: Audit Photon library source files to identify what should be exported in each namespace

---

## Executive Summary

The Photon library has **incorrect namespace exports** for ES6 modules. Helper functions like `isPoint` and `isPointEqual` are either missing from their expected namespaces or exported in the wrong namespace.

**Root Cause**: The `index.ts` file exports modules as namespaces (e.g., `export * as point`), but individual helper functions defined in `maker.ts` and `equal.ts` are not re-exported through their logical namespaces.

---

## T103: Audit `packages/photon/src/core/point.ts`

**File Location**: `/Users/mykawhite/Documents/GitHub/photon/packages/photon/src/core/point.ts`

### Current Exports

The `point.ts` module exports the following functions (200 lines total):

1. `add(a: IPoint, b: IPoint, subtract?: boolean): IPoint` - Add two points
2. `average(a: IPoint, b: IPoint): IPoint` - Get average of two points
3. `clone(pointToClone: IPoint): IPoint` - Clone a point
4. `closest(referencePoint: IPoint, pointOptions: IPoint[]): IPoint` - Find closest point
5. `fromPolar(angleInRadians: number, radius: number): IPoint` - Get point from polar coordinates
6. `fromAngleOnCircle(angleInDegrees: number, circle: IPathCircle): IPoint` - Get point on circle at angle
7. `fromArc(arc: IPathArc): IPoint[]` - Get two end points of an arc
8. `fromPathEnds(pathContext: IPath, pathOffset?: IPoint): IPoint[]` - Get end points of a path
9. `fromSlopeIntersection(lineA: IPathLine, lineB: IPathLine, options?): IPoint` - Calculate slope intersection
10. `middle(pathContext: IPath, ratio?: number): IPoint` - Get middle point of a path
11. `mirror(pointToMirror: IPoint, mirrorX: boolean, mirrorY: boolean): IPoint` - Mirror a point
12. `rounded(pointContext: IPoint, accuracy?: number): IPoint` - Round point values
13. `rotate(pointToRotate: IPoint, angleInDegrees: number, rotationOrigin?: IPoint): IPoint` - Rotate a point
14. `scale(pointToScale: IPoint, scaleValue: number): IPoint` - Scale a point's coordinates
15. `distort(pointToDistort: IPoint, scaleX: number, scaleY: number): IPoint` - Distort a point's coordinates
16. `subtract(a: IPoint, b: IPoint): IPoint` - Subtract points
17. `zero(): IPoint` - Return [0, 0]

### Missing Export: `isPoint`

**Expected**: `photon.point.isPoint(item: any): boolean`  
**Current Location**: `packages/photon/src/core/maker.ts` line 151  
**Definition**:
```typescript
export function isPoint(item: any) {
    return item && Array.isArray(item) && (item as Array<number>).length == 2 && isNumber(item[0]) && isNumber(item[1]);
}
```

**Issue**: `isPoint` is a point-related utility function but is exported from `maker.ts` instead of `point.ts`. This causes it to be available as `photon.maker.isPoint()` instead of the expected `photon.point.isPoint()`.

**Recommendation**: 
- **Option 1**: Move `isPoint` function from `maker.ts` to `point.ts`
- **Option 2**: Re-export `isPoint` from `point.ts` as `export { isPoint } from './maker.js'`
- **Option 3**: Update `index.ts` to explicitly export `isPoint` in the `point` namespace

---

## T104: Audit `packages/photon/src/core/measure.ts`

**File Location**: `/Users/mykawhite/Documents/GitHub/photon/packages/photon/src/core/measure.ts`

### Current Exports

The `measure.ts` module exports 20+ functions (938 lines total):

1. `increase(baseMeasure, addMeasure, augmentBaseMeasure?): IMeasure`
2. `isArcConcaveTowardsPoint(arc, towardsPoint): boolean`
3. `isArcOverlapping(arcA, arcB, excludeTangents): boolean` (DEPRECATED)
4. `isArcSpanOverlapping(arcA, arcB, excludeTangents): boolean`
5. `isBetween(valueInQuestion, limitA, limitB, exclusive): boolean`
6. `isBetweenArcAngles(angleInQuestion, arc, exclusive): boolean`
7. `isBetweenPoints(pointInQuestion, line, exclusive): boolean`
8. `isBezierSeedLinear(seed, exclusive?): boolean`
9. `isChainClockwise(chainContext, out_result?): boolean`
10. `isPointArrayClockwise(points, out_result?): boolean`
11. `isLineOverlapping(lineA, lineB, excludeTangents): boolean`
12. `isMeasurementOverlapping(measureA, measureB): boolean`
13. `lineSlope(line): ISlope`
14. `pointDistance(a, b): number`
15. `pathExtents(pathToMeasure, addOffset?): IMeasure`
16. `pathLength(pathToMeasure): number`
17. `modelPathLength(modelToMeasure): number`
18. `modelExtents(modelToMeasure, atlas?): IMeasureWithCenter | null`
19. `augment(measureToAugment): IMeasureWithCenter`
20. `Atlas` class
21. `boundingHexagon(modelToMeasure): IBoundingHex`
22. `isPointInsideModel(pointToCheck, modelContext, options?): boolean`

### Missing Exports: Point-related functions

**Expected**: `photon.measure.isPointEqual(a: IPoint, b: IPoint, withinDistance?: number): boolean`  
**Current Location**: `packages/photon/src/core/equal.ts` line 60  
**Definition**:
```typescript
export function isPointEqual(a: IPoint, b: IPoint, withinDistance?: number): boolean {
    if (!withinDistance) {
        return round(a[0] - b[0]) == 0 && round(a[1] - b[1]) == 0;
    } else {
        if (!a || !b) return false;
        const distance = pointDistance(a, b);
        return distance <= withinDistance;
    }
}
```

**Issue**: `isPointEqual` is imported in `measure.ts` (line 18) from `equal.ts` but not re-exported. The playground expects it to be available as `photon.measure.isPointEqual()`.

**Additional Missing Functions**:
- `isPointDistinct(pointToCheck, pointArray, withinDistance?)` - Also in `equal.ts` line 78
- `isPointOnSlope(p, slope, withinDistance?)` - Also in `equal.ts` line 88

**Recommendation**:
- Re-export point-related equality functions from `measure.ts`:
  ```typescript
  export { isPointEqual, isPointDistinct, isPointOnSlope } from './equal.js';
  ```

---

## T105: Audit `packages/photon/src/core/path.ts`

**File Location**: `/Users/mykawhite/Documents/GitHub/photon/packages/photon/src/core/path.ts`

### Current Exports

The `path.ts` module exports the following functions (418 lines total):

1. `addTo(childPath, parentModel, pathId, overwrite?): IPath`
2. `clone(pathToClone, offset?): IPath`
3. `copyProps(srcPath, destPath): IPath`
4. `layer(pathContext, layer): IPath`
5. `mirror(pathToMirror, mirrorX, mirrorY): IPath`
6. `move(pathToMove, origin): IPath`
7. `moveRelative(pathToMove, delta, subtract?): IPath`
8. `moveTemporary(pathsToMove, deltas, task): void`
9. `rotate(pathToRotate, angleInDegrees, rotationOrigin?): IPath`
10. `scale(pathToScale, scaleValue): IPath`
11. `distort(pathToDistort, scaleX, scaleY): IModel | IPath`
12. `converge(lineA, lineB, useOriginA?, useOriginB?): IPoint`
13. `alterLength(pathToAlter, distance, useOrigin?): IPath`
14. `toPoints(pathContext, numberOfPoints): IPoint[]`
15. `toKeyPoints(pathContext, maxArcFacet?): IPoint[]`
16. `center(pathToCenter): IPath`
17. `zero(pathToZero): IPath`

### Analysis

**No missing exports identified**. The `path.ts` module appears to have all expected functions properly exported. The playground doesn't reference any missing `photon.path.*` functions in the error logs.

**Recommendation**: No changes needed for `path.ts`.

---

## T106: Audit `packages/photon/src/index.ts`

**File Location**: `/Users/mykawhite/Documents/GitHub/photon/packages/photon/src/index.ts`

### Current Export Structure

```typescript
// Export models (all 17 converted classes)
export * from './models/index.js';

// Export utilities
export * as schema from './core/schema.js';
export * as maker from './core/maker.js';
export * as angle from './core/angle.js';
export * as point from './core/point.js';
export * as path from './core/path.js';
export * as paths from './core/paths.js';
export * as units from './core/units.js';
export * as equal from './core/equal.js';
export * as collect from './core/collect.js';
export * as model from './core/model.js';
export * as measure from './core/measure.js';
export * as exporter from './core/exporter-index.js';
export * as importer from './core/importer.js';
export * as intersect from './core/intersect.js';
export * as chain from './core/chain.js';
export * as fillet from './core/fillet-path.js';
export * as filletChain from './core/fillet-chain.js';
export * as deadend from './core/deadend.js';
export { XmlTag, type IXmlTagAttrs } from './core/xml.js';
export * as dxf from './core/dxf.js';
export * as svg from './core/svg-esm.js';
export * as pdf from './core/pdf-esm.js';
export * as openjscad from './core/openjscad-esm.js';
export * as models from './models/index.js';
export * as layout from './core/layout.js';
```

### Issues Identified

1. **`photon.point.isPoint` doesn't exist**
   - `isPoint` is exported from `maker.ts` but not from `point.ts`
   - Results in `photon.maker.isPoint` instead of expected `photon.point.isPoint`

2. **`photon.measure.isPointEqual` doesn't exist**
   - `isPointEqual` is exported from `equal.ts` but not re-exported from `measure.ts`
   - Results in `photon.equal.isPointEqual` instead of expected `photon.measure.isPointEqual`

3. **Namespace organization issue**
   - Helper functions are scattered across `maker.ts`, `equal.ts`, and their logical modules
   - The IIFE bundle structure doesn't match the expected API from makerjs legacy

### Recommendation

The `index.ts` file correctly exports modules as namespaces. The issue is that individual modules don't re-export helper functions from their dependencies. This should be fixed at the module level (point.ts, measure.ts) rather than in index.ts.

---

## T107: Compare with expected photon API structure

### Expected Photon API Structure

Based on usage in the playground and examples, the expected API structure is:

```javascript
// Point namespace
photon.point = {
  add, average, clone, closest,
  fromPolar, fromAngleOnCircle, fromArc, fromPathEnds,
  fromSlopeIntersection, middle, mirror, rounded,
  rotate, scale, distort, subtract, zero,
  isPoint  // ← MISSING in photon.point
}

// Measure namespace
photon.measure = {
  increase, isArcConcaveTowardsPoint, isArcOverlapping,
  isArcSpanOverlapping, isBetween, isBetweenArcAngles,
  isBetweenPoints, isBezierSeedLinear, isChainClockwise,
  isPointArrayClockwise, isLineOverlapping, isMeasurementOverlapping,
  lineSlope, pointDistance, pathExtents, pathLength,
  modelPathLength, modelExtents, augment, Atlas,
  boundingHexagon, isPointInsideModel,
  isPointEqual,     // ← MISSING in photon.measure
  isPointDistinct,  // ← MISSING in photon.measure
  isPointOnSlope    // ← MISSING in photon.measure
}

// Maker namespace (utility functions)
photon.maker = {
  // Core utilities
  version, environment, unitType,
  round, splitDecimal, createRouteKey, travel,
  cloneObject, extendObject, isNumber,
  isPoint,  // ← Currently HERE, should also be in point namespace
  isPath, isModel,
  // ... other maker utilities
}

// Equal namespace (comparison functions)
photon.equal = {
  isAngleEqual, isPathEqual, isPointEqual,
  isPointDistinct, isPointOnSlope, isPointOnCircle,
  isPointOnPath, isSlopeEqual, isSlopeParallel
}
```

### Current Export Issues

1. ✅ **`photon.maker.isPoint`** - Works (exported from maker.ts)
2. ❌ **`photon.point.isPoint`** - Missing (should be available for logical grouping)
3. ❌ **`photon.measure.isPointEqual`** - Missing (only in photon.equal)
4. ❌ **`photon.measure.isPointDistinct`** - Missing (only in photon.equal)
5. ❌ **`photon.measure.isPointOnSlope`** - Missing (only in photon.equal)

### Playground Usage Patterns

The playground code references:
- `photon.point.isPoint()` - Line 561 in playground.js (FAILS)
- `photon.measure.isPointEqual()` - Expected but not found (FAILS)

### Recommendation

**For proper ES6 module organization**:

1. **Re-export `isPoint` from point.ts**:
   ```typescript
   // In point.ts
   export { isPoint } from './maker.js';
   ```

2. **Re-export point equality functions from measure.ts**:
   ```typescript
   // In measure.ts
   export { isPointEqual, isPointDistinct, isPointOnSlope } from './equal.js';
   ```

This provides logical namespace organization while maintaining flexibility (functions available in multiple namespaces where it makes sense).

---

## Summary of Required Changes

### Files to Modify

1. **`packages/photon/src/core/point.ts`**
   - Add: `export { isPoint } from './maker.js';`
   - Rationale: Make `photon.point.isPoint()` available

2. **`packages/photon/src/core/measure.ts`**
   - Add: `export { isPointEqual, isPointDistinct, isPointOnSlope } from './equal.js';`
   - Rationale: Make `photon.measure.isPointEqual()` and related functions available

3. **`packages/photon/src/index.ts`**
   - No changes needed (already correctly exports namespaces)

### Expected Results After Fix

```javascript
// These should all work:
photon.point.isPoint([0, 0])           // true
photon.maker.isPoint([0, 0])           // true (still works)
photon.measure.isPointEqual([0,0], [0,0])  // true
photon.equal.isPointEqual([0,0], [0,0])    // true (still works)
```

### Verification Commands

After implementing changes:

```bash
# Rebuild library
cd packages/photon
npm run build

# Test ES6 module imports in Node.js
node --input-type=module -e "import * as photon from './target/index.js'; console.log(typeof photon.point.isPoint)"
node --input-type=module -e "import * as photon from './target/index.js'; console.log(typeof photon.measure.isPointEqual)"

# Or test with a simple test file
echo "import * as photon from './target/index.js'; console.log('point.isPoint:', typeof photon.point.isPoint); console.log('measure.isPointEqual:', typeof photon.measure.isPointEqual);" > test-exports.mjs
node test-exports.mjs
```

---

## Tasks Completion Status

- [x] **T103**: Audit `point.ts` - Identified missing `isPoint` export
- [x] **T104**: Audit `measure.ts` - Identified missing `isPointEqual`, `isPointDistinct`, `isPointOnSlope` exports
- [x] **T105**: Audit `path.ts` - No issues found
- [x] **T106**: Audit `index.ts` - Verified export structure is correct
- [x] **T107**: Compare with makerjs legacy - Documented compatibility issues

**Next Steps**: Proceed to T108-T112 to implement the fixes identified in this audit.
