# Inventory: Model Imports and Dependencies

This inventory covers all imports used by `packages/maker.js/src/models/` and identifies external dependencies, internal module usage, and any implicit globals that may affect moving forward with an ES module architecture.

## Scope
- Directory: `packages/maker.js/src/models/`
- Files scanned: `Belt.ts`, `BezierCurve-esm.ts`, `BoltCircle.ts`, `BoltRectangle.ts`, `ConnectTheDots.ts`, `Dogbone.ts`, `Dome.ts`, `Ellipse.ts`, `Holes.ts`, `Oval.ts`, `OvalArc.ts`, `Polygon.ts`, `Rectangle.ts`, `Ring.ts`, `RoundRectangle.ts`, `SCurve.ts`, `Slot.ts`, `Square.ts`, `Star.ts`, `Text.ts`, `index.ts`

## External Runtime Dependencies (non-relative imports)
- **bezier-js**
  - Used in: `packages/maker.js/src/models/BezierCurve-esm.ts`
  - Import: `import BezierJsDefault, * as BezierJs from 'bezier-js'`
  - Declared in `packages/maker.js/package.json` dependencies as `"bezier-js": "^2.1.0"`

- **opentype.js** (implicit global at runtime)
  - Used in: `packages/maker.js/src/models/Text.ts` via `opentype.Font`, `opentype.Glyph`
  - There is no explicit import in `Text.ts`; it relies on a global `opentype` symbol.
  - Declared in root `package.json` as devDependency: `"opentype.js": "^1.1.0"`
  - Types provided by `@types/opentype.js` (see below)

## External Type-Only Dependencies
- **@types/bezier-js**
  - Declared in `packages/maker.js/package.json` dependencies: `"@types/bezier-js": "^0.0.6"`
  - Provides types used by `BezierCurve-esm.ts`.

- **@types/opentype.js**
  - Declared in `packages/maker.js/package.json` dependencies: `"@types/opentype.js": "^0.7.0"`
  - Provides types for `Text.ts` usage of `opentype` global.

## Implicit Globals (to replace or provide)
- **opentype** in `Text.ts`
  - Runtime global required unless migrated to explicit `import opentype from 'opentype.js'` (or equivalent ESM/CJS interop).

- **importer** in `ConnectTheDots.ts`
  - Line: `declare const importer: any;` then `importer.parseNumericList(...)`
  - Indicates a pending conversion; should be replaced with a proper import once an ESM module exists (e.g., `../core/importer.js`).

- **model** in `Slot.ts`
  - Line: `declare const model: any;` then `model.rotate(this, a, [0, 0])`
  - Replaceable with explicit `import { rotate } from '../core/model.js'` or `import * as model from '../core/model.js'` once confirmed API shape.

## Internal Module Dependencies
Models import from the following internal modules under `packages/maker.js/src/core/`:
- **`../core/schema.js`**: interfaces like `IModel`, `IPathMap`, `IPoint`, etc.
- **`../core/maker.js`**: utilities and enums like `pathType`, `isPoint`, `isModel`, `isPathArc`, `round`.
- **`../core/angle.js`**: angle math utilities.
- **`../core/point.js`**: point math utilities.
- **`../core/path.js`**: path-level transformations (`scale`, `distort`, `clone`, etc.).
- **`../core/paths.js`**: constructors for `Line`, `Arc`, `Circle`.
- **`../core/measure.js`** and **`../core/measure-minimal.js`**: measuring distances, extents, lengths.
- **`../core/equal.js`**: equality checks like `isPointEqual`.
- **`../core/chain.js`**: chain finding and operations.
- **`../core/model.js`**: `originate` and other model transforms (also intended for `rotate`).
- **`../core/combine.js`**: boolean combine operations between models.
- **`../core/intersect.js`**: intersections between paths.
- **`../core/solvers.js`**: geometry solvers like `circleTangentAngles`.

## Intra-Models Dependencies
- `Rectangle.ts` → `ConnectTheDots.ts`
- `Oval.ts` → `RoundRectangle.ts`
- `BoltCircle.ts` → `Polygon.ts`, `Holes.ts`
- `Star.ts` → `Polygon.ts`, `ConnectTheDots.ts`
- `Text.ts` → `BezierCurve-esm.ts`
- `Ellipse.ts` → `BezierCurve-esm.ts`

## Index Re-exports
- `packages/maker.js/src/models/index.ts` re-exports all models as ESM using `export { ... } from './X.js'` including complex ones: `BezierCurve-esm.js`, `Ellipse.js`, `Text.js`.

## Decision Points / Alternatives
- **opentype.js handling**
  - Option A: Continue using a global `opentype` (ensure it’s bundled/loaded wherever `Text` is used).
  - Option B: Switch to explicit ESM import: `import opentype from 'opentype.js'` in `Text.ts` (may require adjusting bundling and interop).

- **Replace implicit globals**
  - `ConnectTheDots.ts`: Replace `importer.parseNumericList` with a proper import once `../core/importer.js` (or equivalent) is available.
  - `Slot.ts`: Replace `model.rotate` with `import * as model from '../core/model.js'` and call `model.rotate(...)`.

- **Proceed vs. Refactor**
  - Proceed: If the build/bundle provides `opentype`, `importer`, and `model` as globals, the current architecture works.
  - Refactor: Prefer ESM imports for all three to remove reliance on globals and improve tree-shaking, type safety, and testability.

## Summary
- All model files already use ES module syntax and modern classes.
- The only external runtime import in models is `bezier-js`.
- `Text.ts` requires `opentype` at runtime (currently global). Types are covered by `@types/opentype.js`.
- Two temporary implicit globals remain (`importer`, `model`) that should be replaced with explicit imports when the corresponding core modules are finalized.
