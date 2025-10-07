# Maker.js ES6 Module Modernization Plan

## Phase 1: Build Infrastructure ✅

- [x] Add Vite for modern bundling
- [x] Configure TypeScript for ES modules (ES2020, outDir: dist/esm)
- [x] Set up build scripts (build:lib in maker.js package)
- [x] Vite entry points to src/index.ts
- [x] Modern bundles building: maker.es.js, maker.umd.js, maker.iife.js

## Phase 2: Core Module Conversion (IN PROGRESS)

### ✅ Completed (Session Summary)
- [x] **schema.ts** → ES module exports with temp global type aliases
- [x] **maker.ts** → Partially converted (interfaces, utilities, type guards exported as ES modules)
- [x] **point.ts** → ✅ FULLY converted to ES module with modern syntax (199 lines)
- [x] **angle.ts** → ✅ FULLY converted to ES module with modern syntax (143 lines)
- [x] **path.ts** → ✅ FULLY converted to ES module with modern syntax (415 lines)
- [x] **paths.ts** → ✅ FULLY converted to ES module (393 lines) - Arc, Circle, Line, Chord, Parallel classes
- [x] **units.ts** → ✅ FULLY converted to ES module (65 lines) - Unit conversion utilities
- [x] **equal.ts** → ✅ FULLY converted to ES module (243 lines) - Comparison utilities
- [x] **collect.ts** → ✅ FULLY converted to ES module - Collection utilities
- [x] **models/** → ✅ 17/20 model classes converted to ES modules (~450 lines)
  - ConnectTheDots, Holes, Rectangle, Square, Polygon, Ring, Star, Dome
  - BoltCircle, BoltRectangle, RoundRectangle, Oval, Slot, SCurve, Dogbone, Belt, OvalArc
- [x] **model.ts** → ✅ FULLY converted to ES module (643 lines) - Model manipulation and traversal
- [x] **src/index.ts** → Exports schema, maker, angle, point, path, paths, units, models, equal, collect, model
- [x] **Vite builds** → ✅ Successfully generating ES/UMD/IIFE bundles (75.56 kB ES)
- [x] **Git commits** → Progress tracked in git history

### 📊 Current Build Status (Updated 2025-10-06)
- **ESM pipeline**: ✅ Working (incremental scope)
- **Bundles**: ✅ Building successfully in prior scope (**107.41 kB ES**, 115.29 kB UMD, 115.02 kB IIFE)
- **Converted modules**:
  - Core: schema, maker, point (199), angle (143), path (415), paths (393), units (65), equal (243), collect, **model (643)** ✅, solvers (96), **measure (928)** ✅, kit (40), xml (122), **exporter (94)** ✅, **importer (28)** ✅
  - Serialization helpers: **svg-helpers.ts** ✅ (ES module with `pathToSVGPathData`, `chainToSVGPathData`)
  - Serialization ES shim: **svg-esm.ts** ✅ (ES module with `toSVGPathData` built on helpers)
  - Boolean ops: **break** ✅, **combine** ✅, **simplify** ✅, **expand** ✅
  - Models: 17/20 classes (85%)
- **Total converted**: ~5,000+ lines of core functionality (85%)
- **TypeScript errors**: ~20+ (expected - remaining files still reference old namespaces or path.intersection)
- **Build warnings**: 7 warnings about path.intersection not exported (expected - intersect.ts not yet converted)
- **Type guards**: ✅ isPath, isModel, isPoint, etc. already exported from maker.ts

### ✅ paths.ts Conversion Complete

- **Result**: Successfully converted all path constructor classes
- **Classes**: Arc, Circle, Line, Chord, Parallel
- **Size**: 393 lines → clean ES module
- **Dependencies**: Uses point, angle, path modules (all converted ✅)
- **Build**: Successful with expected warning about missing path.intersection

### ✅ models/ Directory: 17/20 Classes Converted (85%)

- **Converted Classes** (17):
  - ✅ ConnectTheDots (139 lines) - Polyline/polygon from points
  - ✅ Holes (41 lines) - Array of circles
  - ✅ Rectangle (97 lines) - Basic rectangle with measurement support
  - ✅ Square (15 lines) - Square using Rectangle
  - ✅ Polygon (39 lines) - Regular polygon
  - ✅ Ring (27 lines) - Concentric circles
  - ✅ Star (50 lines) - Star polygon
  - ✅ Dome (46 lines) - Rounded top rectangle
  - ✅ BoltCircle (24 lines) - Holes on a circle
  - ✅ BoltRectangle (22 lines) - Holes at rectangle corners
  - ✅ RoundRectangle (95 lines) - Rectangle with rounded corners
  - ✅ Oval (18 lines) - Oval using RoundRectangle
  - ✅ Slot (64 lines) - Rounded slot between two points
  - ✅ SCurve (44 lines) - S-shaped curve
  - ✅ Dogbone (96 lines) - Dogbone corners for CNC
  - ✅ Belt (38 lines) - Belt between two circles
  - ✅ OvalArc (94 lines) - Oval-shaped arc

- **Remaining Classes** (3) - Blocked by dependencies:
  - ⏸️ BezierCurve (587 lines) - Needs chain module, Bezier.js library, model.walk
  - ⏸️ Ellipse (268 lines) - Needs BezierCurve
  - ⏸️ EllipticArc (in Ellipse.ts) - Needs BezierCurve
  - ⏸️ Text (144 lines) - Needs opentype, model, combine modules

### ✅ Phase 3: model.ts Conversion - COMPLETED

- **Status**: ✅ model.ts (643 lines, 17 exported functions) fully converted
- **Interfaces**: ✅ IPathLine, IPathBezierSeed, IWalkModel all working
- **Dependencies Resolved**:
  - models.BezierCurve class - handled with conditional checks
  - measure.modelExtents() - imported and working
  - Circular reference: model.walk() recursive calls working correctly
- **Progress**: ~3,500+ / ~5,000 lines converted (70% of core functionality)

### 🔄 Remaining Core Files

- [x] model.ts ✅ (model manipulation and traversal)
- [x] paths.ts ✅ (path constructors - Line, Circle, Arc classes)
- [x] units.ts ✅ (unit conversion)
- [x] equal.ts ✅ (comparison utilities)
- [x] collect.ts ✅ (collection utilities)
- [x] chain.ts ✅ (path chaining and connectivity)
- [x] break.ts ✅ (path breaking helpers modernized)
- [x] combine.ts ✅ (boolean ops core, intersections, dead-end cleanup)
- [x] simplify.ts ✅ (duplicate geometry reduction)
- [x] expand.ts ✅ (path/model expansion + outline helpers)
- [x] **measure.ts ✅ (928 lines - full version with all measurement functions, Atlas class)**
- [x] **exporter.ts ✅ (94 lines - JSON export, color mappings)**
- [x] **importer.ts ✅ (28 lines - parseNumericList utility)**
- [x] solvers.ts ✅ (updated to use full measure module)
- [x] intersect.ts ✅ (path intersection algorithms - fixes 7 build warnings)
- [ ] fillet.ts (filleting operations)
- [ ] dxf.ts, svg.ts, pdf.ts, openjscad.ts (format-specific exporters)
  - svg.ts: legacy namespace kept stable during incremental migration; ES module `svg-esm.ts` created to expose `toSVGPathData`
- [ ] layout.ts, deadend.ts, cascades.ts (layout and path utilities)

### 🚧 Conversion Notes for Remaining Core Files

- **chain.ts** *(completed)*: ES module conversion landed with stronger null-guards and deterministic iteration. Follow-up: add unit specs for `findChains()` edge cases (short segments, endless loops) and wire containment checks after `measure.ts` migration.
- **break.ts / combine.ts / simplify.ts** *(completed)*: Migrated to ES modules using shared predicates in `core/boolean-utils.ts`, replaced legacy namespace access, and tightened null/length guards. Follow-up: add targeted unit coverage for path sharding and overlap detection once `measure.ts` is unified.
- **expand.ts**: Pending conversion. Will adopt `core/boolean-utils.ts` helpers and updated `combine()` API after expand refactor. Audit chained calls to `simplify()` and `combine()` post-migration.
- **measure.ts**: Merge `measure-minimal.ts` into the full module, keeping narrowly scoped exports to avoid bundling unused math routines. Introduce tree-shaken named exports for `modelExtents`, `area`, `isPolar`. Ensure compatibility with existing playground calls in `measure-model.ts`.
- **exporter.ts / importer.ts**: Deprecate CommonJS `module.exports` usage; adopt named exports and supply per-format factory functions. Ensure Vite rollup externalization covers optional dependencies like `bezier-js`.
- **dxf.ts / svg.ts / pdf.ts / openjscad.ts**: Each file currently uses lazily-evaluated namespace assignments. Convert to pure functions returning serialized content and provide adapters for async loaders in the playground.
- **solvers.ts / intersect.ts / fillet.ts**: Audit reliance on `MakerJs.reserveIds` globals. Replace with dependency-injected configuration objects and add targeted tests in `packages/maker.js/__tests__/solvers.spec.ts`.
- **kit.ts / layout.ts / deadend.ts / cascades.ts**: These depend on `models/` directory exports. Prepare to update imports after finalizing remaining model conversions to avoid cyclical references.

### 🔄 Remaining Model Classes (3/20):

- [ ] BezierCurve (587 lines) - Needs chain module, Bezier.js library, model.walk
- [ ] Ellipse (268 lines) - Needs BezierCurve
- [ ] EllipticArc (in Ellipse.ts) - Needs BezierCurve
- [ ] Text (144 lines) - Needs opentype, model, combine modules

### 🧹 Cleanup Tasks Discovered During Review

- [ ] Replace `require('kdbush')` in `core/collect.ts` with an ES module import and add an ambient type for `KDBush` sourced from the library types.
- [ ] Remove temporary `declare class KDBush` shim once proper typings are in place.
- [ ] Audit remaining `require()` usage under `src/` to confirm no lingering CommonJS references remain after conversion.
- [ ] Document any third-party dependency default export expectations (e.g., `kdbush`, `graham_scan`) in `docs/modernization-notes.md` so bundlers remain aligned.

### 🗓️ Next Working Session Objectives

1. Kick off refactor of boolean operation modules (`break.ts`, `combine.ts`, `simplify.ts`, `expand.ts`) with shared helper extraction.
2. Prepare a migration checklist for `measure.ts`, including integration points in `core/model.ts` and `measure-minimal.ts` cleanup.
3. Draft testing strategy covering complex model imports/exports ahead of updating serialization modules.
4. Capture QA plan for chain-focused unit tests once containment utilities land.
5. Refactor `core/expand.ts` to consume helpers from `core/boolean-utils.ts` and updated `combine()` APIs; replace namespace accessors with direct ES module imports and ensure cap-straightening logic reuses shared predicates.
6. Merge `core/measure-minimal.ts` into `core/measure.ts`, update all imports to the unified module, and remove temporary `declare` shims for `model`, `paths`, and `models` once migration compiles cleanly.
7. Backfill Jest coverage for boolean operations (`break`, `combine`, `simplify`, `expand`) and chain helpers, validating overlap detection, cap straightening, and containment checks after the measure refactor lands.

### 🧭 Boolean Operation Module Refactor Plan

- **Break down responsibilities**: Document current responsibilities for `break.ts`, `combine.ts`, `simplify.ts`, and `expand.ts` to surface shared math helpers and avoid circular imports.
- **Shared helper extraction**: Introduce `core/boolean-utils.ts` exporting reusable predicates (`areOpposingArcs`, `collectOverlappingSegments`) consumed across the boolean modules.
- **State isolation**: Replace implicit namespace globals with injected dependencies (`measure`, `chain`, `point`) to make functions pure and testable.
- **Incremental conversion order**: Convert `break.ts` first to validate helper layer, then `combine.ts`, `simplify.ts`, and `expand.ts`, running targeted regression checks after each migration.
- **Testing strategy**: Add focused Jest suites per module covering nested models, multi-layer inputs, and degenerate cases (zero-length segments, overlapping arcs).
- **Expand follow-up**: When tackling `expand.ts`, adopt the refactored `combine()` signature (options object), reuse `boolean-utils` predicates for tolerance handling, and audit cap routing so deleted segments are tracked via `trackDeletedPath()`.
- **Measure consolidation**: Plan for a single `measure.ts` export; once merged, drop the interim re-export in `index.ts`, regenerate type definitions, and confirm no remaining references to `measure-minimal.ts` remain in `models/`.
- **Test coverage rollout**: Target new specs under `packages/maker.js/test/boolean/` and `packages/maker.js/test/chain/`, exercising regressions discovered during modernization (e.g., overlapping arcs, endless chain outlines) and wiring them into the CI workflow.

### 🧾 Measure Module Migration Checklist

- **Merge minimal + full APIs**: Consolidate `measure-minimal.ts` into `measure.ts`, ensuring tree-shakable named exports for `modelExtents`, `isPointInsideModel`, and `isChainClockwise`.
- **Refactor dependencies**: Update all imports (e.g., `chain.ts`, `model.ts`, `measure-model.ts`) to consume the new unified module without circular references.
- **Typings audit**: Validate exported interfaces (`IPathExtreme`, `IChainMeasurements`) align with consumer expectations in `models/` and serialization modules.
- **Performance validation**: Benchmark `measure.modelExtents()` and `measure.chainLength()` before/after migration to confirm no regression.
- **Testing coverage**: Expand unit tests to cover polar measurements, containment checks, and chain orientation utilities used by `getContainment()`.

### 1.1 Update Main Library TypeScript Config
**File**: `packages/maker.js/target/tsconfig.json`

**Changes**:
- Remove `outFile` (no longer concatenating into single file)
- Set `module: "ES2020"` (modern ES modules)
- Set `target: "ES2020"` (modern JavaScript)
- Add `moduleResolution: "bundler"`
- Keep `declaration: true` for type definitions
- Add `outDir: "../dist/esm"` for ES module output

### 1.2 Update Package.json
**File**: `packages/maker.js/package.json`

**Changes**:
- Add `"type": "module"` for ES modules
- Update `"main"` to point to bundled output
- Add `"module"` field for ES module entry
- Add `"exports"` field for modern Node.js resolution

## Phase 2: Source Code Refactoring

### 2.1 Convert Namespace to ES6 Modules
**Pattern**:
```typescript
// OLD (namespace):
namespace MakerJs {
  export var version = 'debug';
  export function something() {}
}

// NEW (ES6 module):
export const version = 'debug';
export function something() {}
```

### 2.2 File Structure
Each namespace section becomes its own module:
- `src/core/maker.ts` → exports core utilities
- `src/core/point.ts` → exports point functions
- `src/core/path.ts` → exports path functions
- etc.

### 2.3 Create Main Entry Point
**File**: `src/index.ts`
```typescript
// Re-export everything from modules
export * from './core/maker.js';
export * from './core/point.js';
export * from './core/path.js';
// ... etc
```

## Phase 3: Build System Modernization

### 3.1 Replace Browserify with Vite
**Why Vite**:
- Modern, fast bundler
- Built-in TypeScript support
- Great dev experience
- Tree-shaking out of the box
- Multiple output formats (ESM, UMD, IIFE)

### 3.2 New Build Scripts
```json
{
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "preview": "vite preview"
  }
}
```

### 3.3 Vite Configuration
**File**: `packages/maker.js/vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MakerJs',
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => `maker.${format}.js`
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: ['bezier-js', 'graham_scan', 'kdbush'],
      output: {
        globals: {
          'bezier-js': 'Bezier',
          'graham_scan': 'GrahamScan',
          'kdbush': 'KDBush'
        }
      }
    }
  }
});
```

## Phase 4: Playground Updates ✅ (Monaco Editor Migration Complete)

### ✅ Monaco Editor Migration - COMPLETED

- [x] **Monaco Editor v0.44.0** installed and integrated
- [x] **monaco-editor-adapter.ts** created with CodeMirror-compatible API
- [x] **playground.ts** updated to use Monaco Editor
- [x] **Modern JavaScript Support**: const, let, arrow functions, template literals, async/await, ES6+ classes
- [x] **VS Code Experience**: IntelliSense, autocomplete, modern themes
- [x] **Build Success**: TypeScript compilation passes
- [x] **Server Running**: Playground accessible at localhost:8020
- [x] **Test File Created**: `/test-modern-js.js` demonstrates all modern features

### 🎯 Next Playground Steps

- [ ] Update playground to use ES6 module imports (when core library conversion is complete)
- [ ] Update HTML loading to use ES modules
- [ ] Test with new ES module bundles

## Phase 5: Playground ES6 Module Integration (PENDING)

### 4.1 Update Playground to Use ES6 Imports
**File**: `packages/playground/src/playground.ts`

**Changes**:
```typescript
// OLD:
var makerjs = require('makerjs');

// NEW:
import * as makerjs from 'makerjs';
```

### 4.2 Update Monaco Editor Integration
Already done! Monaco Editor supports ES6 modules natively.

### 4.3 Update HTML Loading
**File**: `docs/playground/index.html`

**Changes**:
```html
<!-- OLD: -->
<script src="../dist/browser.maker.js"></script>

<!-- NEW: -->
<script type="module">
  import * as makerjs from '../dist/maker.es.js';
  window.makerjs = makerjs; // For playground compatibility
</script>
```

## Phase 6: Dependencies Update

### 5.1 Remove Old Build Tools
```bash
npm uninstall browserify licensify
```

### 5.2 Add Modern Build Tools
```bash
npm install -D vite @vitejs/plugin-typescript
npm install -D typescript@latest
```

### 5.3 Update TypeScript
```bash
npm install -D typescript@^5.3.0
```

## Phase 7: Testing & Validation

### 6.1 Unit Tests
- Update test imports to use ES6 modules
- Ensure all tests pass

### 6.2 Playground Testing
- Test code execution with ES6 imports
- Verify Monaco Editor integration
- Test all example models

### 6.3 Build Validation
- Verify ESM output works in modern browsers
- Verify UMD output works for legacy compatibility
- Check bundle sizes

## Migration Steps (Recommended Order)

### Step 1: Backup & Branch ✅
```bash
git checkout -b modernize-es6-modules
```

### Step 2: Update TypeScript Configs
- Update `packages/maker.js/target/tsconfig.json`
- Update `packages/maker.js/tsconfig.json`
- Update `packages/playground/tsconfig.json`

### Step 3: Install Modern Tools
```bash
cd packages/maker.js
npm install -D vite @vitejs/plugin-typescript typescript@^5.3.0
npm uninstall browserify licensify
```

### Step 4: Create Vite Config
- Create `packages/maker.js/vite.config.ts`

### Step 5: Refactor Core Module (Incremental)
Start with one file to test the pattern:
1. Convert `src/core/maker.ts` from namespace to exports
2. Update imports in dependent files
3. Test build
4. Repeat for other files

### Step 6: Create Main Entry Point
- Create `src/index.ts` that re-exports all modules

### Step 7: Update Playground
- Update imports in playground files
- Update HTML script loading

### Step 8: Test Everything
- Run builds
- Test playground
- Verify functionality

## Benefits of This Approach

### ✅ Modern JavaScript
- ES6+ syntax support
- Tree-shaking for smaller bundles
- Better IDE support

### ✅ Better Developer Experience
- Faster builds with Vite
- Hot module replacement
- Better error messages

### ✅ Future-Proof
- Standard ES modules
- Compatible with modern tooling
- Easy to maintain

### ✅ Cleaner Codebase
- No namespace pollution
- Explicit imports/exports
- Better code organization

## Estimated Timeline

- **Phase 1-2**: 2-3 hours (Config + Core refactoring)
- **Phase 3**: 1-2 hours (Build system)
- **Phase 4**: 1-2 hours (Playground updates)
- **Phase 5**: 30 minutes (Dependencies)
- **Phase 6**: 1-2 hours (Testing)

**Total**: ~6-10 hours of focused work

## Current Status Summary

### ✅ Completed

1. ✅ Monaco Editor migration (Phase 4)
2. ✅ Build infrastructure with Vite (Phase 1)
3. ✅ Core module conversion - 70% complete (Phase 2)
   - 17/20 model classes converted
   - Core utilities: point, angle, path, paths, units, equal, collect, model
   - ES/UMD/IIFE bundles building successfully

### 🔄 In Progress

1. ⏳ Complete remaining core modules (Phase 2)
   - Remaining 3 model classes (BezierCurve, Ellipse, Text)
   - Serialization modules: migrate `svg.ts` (phase 2/3), then `pdf.ts`, `openjscad.ts`
   - Export/import modules
   - Solver and intersection modules

### 📋 Next Steps

1. ⏳ Convert `core/svg.ts` `toSVGPathData` to ES export reusing `svg-helpers.ts` and keep `toSVG` under namespace temporarily
2. ⏳ Export new `svg` API from `src/index.ts` (done) and verify simple consumers
3. ⏳ Convert `core/pdf.ts` to ES module that consumes `svg-helpers.ts` for stroking
4. ⏳ Convert `core/openjscad.ts` to ES module
5. ⏳ Update playground to use ES6 imports (Phase 5)
6. ⏳ Testing & validation (Phase 7)

### 📊 Overall Progress
- **Monaco Editor**: ✅ 100% Complete
- **Build System**: ✅ 100% Complete  
- **Core Modules**: 🔄 70% Complete
- **Playground Integration**: ⏳ 0% (waiting for core completion)
- **Testing**: ⏳ 0%

**Estimated Remaining Time**: 2-3 hours to complete core module conversion

## 🎯 Recent Session Progress (2025-10-06)

### ✅ Completed in This Session
1. **measure.ts (928 lines)** - Full measurement module with Atlas class, all geometric calculations
   - Exported all measurement functions: pathExtents, modelExtents, pathLength, etc.
   - Atlas class for cached measurements
   - Point containment checks (isPointInsideModel)
   - Bounding hexagon calculations
   - Clockwise/counterclockwise detection
   - Fixed circular dependencies with maker.ts interfaces
2. **exporter.ts (94 lines)** - JSON export and color utilities
3. **importer.ts (28 lines)** - Numeric list parsing
4. **svg-helpers.ts** - New ES module with `pathToSVGPathData` and `chainToSVGPathData`
5. **svg-esm.ts** - New ES module exposing `toSVGPathData` built on helpers and `chain.findChains`
6. **src/index.ts** - Re-exports `export * as svg from './core/svg-esm.js'`
7. **svg.ts bridge** - Added delegation helpers (`tryDelegateToEsmToSVGPathData`, `tryDelegateToEsmToSVG`) so legacy namespace uses ESM when available; maintains backwards compatibility.
7. **tsconfig updates** - Included `src/core/svg-helpers.ts` and `src/core/svg-esm.ts` in both debug and ESM builds

### 📈 Build Progress

### 🔍 Remaining High-Priority Modules
  1. ~~**fillet.ts** - Filleting operations~~
     - ✅ Migrated via new ES modules: `fillet-core.ts`, `fillet-path.ts`, `fillet-chain.ts`
     - ✅ Exported from `src/index.ts` as `fillet` and `filletChain`
     - ✅ Added UMD smoke test `packages/maker.js/test/fillet.spec.js`
     - ✅ Updated `packages/maker.js/tsconfig.json` to include new files and exclude legacy `core/fillet.ts`
  2. **Serialization modules**: dxf.ts, svg.ts (Phase 2 delegation added), pdf.ts, openjscad.ts
     - Added UMD exposure bridge: `exporter-index.ts` re-exports `toSVG` and `toSVGPathData` from `core/svg-esm.ts` so UMD global exposes `maker.exporter.toSVG` alongside `maker.svg.toSVG`.
  3. **Layout modules**: layout.ts, deadend.ts, cascades.ts


### 🧭 Proposed Plan: Serialization & Layout Migration

- **[goals]** Complete ES module conversion for serialization (DXF, SVG, PDF, OpenJsCad) and layout utilities; remove remaining `path.intersection` references.
- **[current status]** `intersect.ts` in place and used across `paths.ts`, `measure.ts`, `solvers.ts`, and `models/OvalArc.ts`. `deadend.ts` migrated to ES modules and exported via `src/index.ts`.

- **[serialization plan]**
  - **Imports**: from `core/maker.ts` (helpers + types), `core/exporter.ts` (`IExportOptions`, `tryGetModelUnits`, `colors`), `core/point.ts`, `core/angle.ts`, `core/paths.ts`, `core/model.ts`, `core/measure.ts`, and `core/xml.ts` (for SVG `XmlTag`, `IXmlTagAttrs`).
  - **DXF (`core/dxf.ts`)**: Export `toDXF(...)`. Use `unitType`, `colors`, `round`, `point`, `angle`. Keep `outputDocument(...)` internal. Options via `IExportOptions` + `IPointMatchOptions`.
  - **SVG (`core/svg.ts`)**:
    - Phase 1 (done): Extract path/chain generation into `core/svg-helpers.ts` (ES module) and implement `core/svg-esm.ts` with `toSVGPathData(...)` that consumes helpers and `chain.findChains`.
    - Phase 2 (in progress): Added safe delegation in legacy `core/svg.ts` so `toSVGPathData(...)` and `toSVG(...)` (path-only) forward to ESM `svg-esm.ts` when available. Fallback remains legacy implementation. Next, add parity tests for sample models to validate outputs.
    - Phase 3 (next): Convert remaining legacy-only SVG rendering (non-path elements, annotations) and importer `fromSVGPathData(...)` into ES modules; remove namespace wrapper once parity is confirmed.
  - **PDF (`core/pdf.ts`)**: Export `toPDF(doc, model, options)`. Use `measure.modelExtents`, `chainToSVGPathData`/`pathToSVGPathData` for stroking, and caption rendering. Types via `@types/pdfkit`.
  - **OpenJsCad (`core/openjscad.ts`)**: Export `toJscadCAG`, `toJscadCSG`, `toJscadScript`, `toJscadSTL`. Preserve options (`byLayers`, `pointMatchingDistance`, `maxArcFacet`, `layerOptions`, `statusCallback`). Keep conversion helpers internal.
  - **API stability**: Preserve function names and parameter shapes; re-export via `src/index.ts` under `exporter`.

- **[layout plan]**
  - **Layout (`core/layout.ts`)**: Convert to ES module exporting `childrenOnPath`, `childrenOnChain`, `cloneToRow`, `cloneToColumn`, `cloneToGrid`, `cloneToRadial`, `cloneToBrick`, `cloneToHoneycomb`.
  - **Dependencies**: `measure.Atlas`, `measure.modelExtents`, `model.walk`, `paths.*`, `point`, `angle`, `solvers.equilateralAltitude`.
  - **Cascades (`core/cascades.ts`)**: Keep as generated by `target/cascadable.js` for now; revisit post-stabilization.

- **[refactor cleanup]**
  - Replace all `path.intersection` with `intersection` from `core/intersect.ts` (done for `paths.ts`, `measure.ts`, `solvers.ts`, `models/OvalArc.ts`).
  - Ensure `src/index.ts` exports `intersect`, `deadend`, and existing `exporter`/`importer` utilities.

- **[acceptance criteria]**
  - `vite build` completes with no warnings about `path.intersection` or missing exports.
  - All four serializers compile and match baseline outputs.
  - Layout utilities function against examples (clone/grid/brick/honeycomb) and pass smoke tests.

- **[risks & mitigations]**
  - Circular imports (`model` ↔ `measure` ↔ serializers): keep helpers internal and prefer type-only imports from `maker.ts`.
  - External typings (PDFKit, JSCAD): rely on existing devDependencies; import types only.
  - Cascades generation remains unchanged until all core modules are stabilized.

-- **[execution checklist]**
  1) Finish `core/dxf.ts` ES conversion and verify with a DXF sample.
  2) `core/svg.ts`:
     - [x] Phase 2 delegation: bridge legacy `toSVGPathData`/`toSVG` to ESM versions when present.
     - [ ] Add parity unit tests for `toSVGPathData()` against `svg-esm.ts` over lines, arcs, circles, beziers, nested layers.
     - [ ] Phase 3: convert non-path rendering and importer; remove namespace wrapper.
  2a) UMD bundle smoke check:
     - [x] Expose `toSVG`/`toSVGPathData` via `maker.exporter` in UMD by adding `src/core/exporter-index.ts` and updating `src/index.ts` to export from it.
     - [x] Add `packages/maker.js/test/umd-svg.spec.js` to validate `MakerJs.svg.toSVG` and `MakerJs.exporter.toSVG` both render SVG from `dist/maker.umd.js`.
     - [x] Run `npm run build:lib` then `npx mocha packages/maker.js/test/umd-svg.spec.js` and record results.
       - Result: PASS. Initial runtime error (`paths is not defined`) traced to `core/path.ts` using legacy global; fixed by importing `paths` as ES module. Also injected `require` into VM sandbox for UMD externals.
       - Vite warnings observed: `BezierCurve` not exported by `src/models/index.ts` (used by `core/measure.ts`); `findChains` not exported by `src/core/model.ts` (used by `core/dxf.ts`).

  2b) Parity and round-trip tests:
     - [x] Added `packages/maker.js/test/svg-pathdata.spec.js` covering `svg.toSVGPathData()` basics (byLayers, primitives) and `svg.fromSVGPathData()` -> `toSVGPathData()` round-trips for simple commands.
     - [ ] Expand parity to cover arcs, circles, beziers, nested layers, nonzero fill rule, scalingStroke, and caption layers.
     - [ ] Add round-trips for Q, C, S, T with Bezier approximations and elliptic arc decomposition.

  Notes / Findings:
  - Fixed UMD runtime by ES-importing `paths` in `core/path.ts`; defer importing `model/measure/chain/models` until types are aligned to avoid TS errors.
  - Ensure tests that require `../dist/index.js` run by executing package `npm run build` (legacy CJS) in addition to `vite build`.
  - Track Vite warnings and expose missing exports:
    - TODO: export `BezierCurve` from `src/models/index.ts`.
    - TODO: export `findChains` from `src/core/model.ts` or refactor `core/dxf.ts` to import from `core/chain.ts`.
  3) Convert `core/pdf.ts` and sanity-check a simple page render (circle, line, caption).
  4) Convert `core/openjscad.ts` and validate CAG/CSG/Script/STL flows.
  5) Convert `core/layout.ts` and test all clone helpers; keep `cascades.ts` generated.
  6) Re-run `npm run build:lib` and `mocha` smoke tests; update plan status.


### 🛠️ Fillet ES6 Migration: Test-First Modular Plan (Updated 2025-10-06)
To avoid repeated breakage from direct conversion, we will migrate `fillet` via small ES modules with smoke tests, while leaving legacy `core/fillet.ts` untouched until the new code is proven.

#### Goals
- **Stability-first**: Keep legacy API working during migration.
- **Small, pure helpers**: Minimal deps, easy to test.
- **UMD smoke test**: Validate public surface via `maker.umd.js`.

#### Steps
- **Revert legacy file**: Reset `packages/maker.js/src/core/fillet.ts` to the last committed state to remove duplicate/strict-mode issues.
- **Create helpers**: `packages/maker.js/src/core/fillet-core.ts`
  - Small, pure utilities only; no namespaces.
  - Example helpers: `getPointProperties`, `getMatchingPointProperties`, `cloneAndBreakPath`, `getGuidePath`, `getFilletResult`, `getDogboneResult`.
  - Only import from existing ES modules: `./schema`, `./maker`, `./point`, `./angle`, `./measure`, `./paths`, `./path`, `./intersect`, `./break`.
- **Path APIs**: `packages/maker.js/src/core/fillet-path.ts`
  - `export function pathFillet(pathA, pathB, filletRadius, options?)`
  - `export function pathDogbone(lineA, lineB, filletRadius, options?)`
  - Implement using `fillet-core` helpers and existing modules.
- **Chain APIs**: `packages/maker.js/src/core/fillet-chain.ts`
  - `export function chainFillet(chain: any, spec: any)`
  - `export function chainDogbone(chain: any, spec: number | { left?: number; right?: number })`
  - Type `chain` as `any` to avoid circular imports while migrating.
- **Exports**: Update `packages/maker.js/src/index.ts`
  - `export * as fillet from './core/fillet-path.js'`
  - `export * as filletChain from './core/fillet-chain.js'`
- **Smoke test**: `packages/maker.js/test/fillet.spec.js`
  - Build with `vite build`.
  - Load `../dist/maker.umd.js` and exercise `maker.fillet.pathFillet()` and `maker.filletChain.chainFillet()` on simple inputs.
  - Assert arc created with positive radius and inputs clipped appropriately.
- **Build & test**: Run `npm run build:lib` then `npm test` in `packages/maker.js`.

#### Rationale
- **No risky edits** to the legacy file until new code passes smoke tests.
- **Smaller modules** reduce surface area for strict mode and duplicate identifier issues.
- **UMD validation** ensures backwards-compatible distribution works.

#### Acceptance Criteria
- New modules compile and export from `src/index.ts`.
- `vite build` succeeds and produces `maker.umd.js` including `fillet` and `filletChain` namespaces.
- `mocha` smoke test loads `maker.umd.js` and passes basic fillet/dogbone scenarios.

#### Risks & Mitigations
- **Circular deps (chain ↔ fillet)**: Use `any` for chain in the interim; tighten types once migration is stable.
- **Model references (BezierCurve)**: Avoid adding model deps in fillet modules until model conversions are complete.
- **Legacy API drift**: Keep signatures aligned and verify via UMD smoke tests.

#### Execution Checklist
- [x] Revert `core/fillet.ts` to last committed state (left untouched; excluded from tsconfig)
- [x] Create `core/fillet-core.ts` (helpers only)
- [x] Create `core/fillet-path.ts` (pathFillet, pathDogbone)
- [x] Create `core/fillet-chain.ts` (chainFillet, chainDogbone)
- [x] Export from `src/index.ts` (`fillet`, `filletChain`)
- [x] Add `test/fillet.spec.js` (UMD smoke test)
- [ ] Build and run tests (`npm run build:lib`, then `mocha packages/maker.js/test/fillet.spec.js`)
