# Maker.js Modernization Inventory

**Last Updated:** 2025-10-08

This document tracks the progress of converting Maker.js from TypeScript namespaces to modern ES6 modules with import/export statements.

---

## Summary

| Package | Total Files | ✅ Converted | ⏳ Remaining | Progress |
|---------|-------------|-------------|--------------|----------|
| **maker.js** | 51 | 44 | 7 | 86% |
| **playground** | 11 | 11 | 0 | 100% |
| **docs** | 1 | 0 | 1 | 0% |
| **fonts** | 1 | 1 | 0 | 100% |
| **TOTAL** | 64 | 56 | 8 | **88%** |

---

## 📦 Package: maker.js

### ✅ Converted to ES6 Modules (44 files)

#### Core Modules (33 files)
- ✅ `src/index.ts` - Main entry point with ES6 exports
- ✅ `src/core/maker.ts` - Root module with ES6 exports
- ✅ `src/core/schema.ts` - Type definitions with ES6 exports
- ✅ `src/core/angle.ts` - Angle utilities
- ✅ `src/core/base.ts` - Base utilities
- ✅ `src/core/boolean-utils.ts` - Boolean operation utilities
- ✅ `src/core/break.ts` - Path breaking utilities
- ✅ `src/core/chain.ts` - Chain finding and manipulation
- ✅ `src/core/collect.ts` - Collection utilities
- ✅ `src/core/combine.ts` - Boolean operations (union, intersection, subtraction)
- ✅ `src/core/deadend.ts` - Dead-end removal utilities
- ✅ `src/core/dxf.ts` - DXF export
- ✅ `src/core/equal.ts` - Equality comparison utilities
- ✅ `src/core/expand.ts` - Path expansion utilities
- ✅ `src/core/exporter.ts` - Base exporter utilities
- ✅ `src/core/exporter-index.ts` - Exporter index
- ✅ `src/core/fillet.ts` - Fillet utilities
- ✅ `src/core/fillet-core.ts` - Core fillet operations
- ✅ `src/core/fillet-path.ts` - Path fillet operations
- ✅ `src/core/fillet-chain.ts` - Chain fillet operations
- ✅ `src/core/importer.ts` - Import utilities
- ✅ `src/core/intersect.ts` - Intersection utilities
- ✅ `src/core/kit.ts` - Kit construction utilities
- ✅ `src/core/measure.ts` - Measurement utilities
- ✅ `src/core/measure-minimal.ts` - Minimal measurement utilities
- ✅ `src/core/model.ts` - Model manipulation utilities
- ✅ `src/core/path.ts` - Path utilities
- ✅ `src/core/paths.ts` - Path classes (Arc, Circle, Line)
- ✅ `src/core/point.ts` - Point utilities
- ✅ `src/core/simplify.ts` - Model simplification
- ✅ `src/core/solvers.ts` - Mathematical solvers
- ✅ `src/core/openjscad.ts` - OpenJSCAD export (delegated to openjscad-esm.ts)
- ✅ `src/core/openjscad-esm.ts` - OpenJSCAD export (ES module version)
- ✅ `src/core/pdf.ts` - PDF export (delegated to pdf-esm.ts)
- ✅ `src/core/pdf-esm.ts` - PDF export (ES module version)
- ✅ `src/core/svg.ts` - SVG export/import (delegated to svg-esm.ts)
- ✅ `src/core/svg-esm.ts` - SVG export/import (ES module version)
- ✅ `src/core/svg-helpers.ts` - SVG helper functions
- ✅ `src/core/units.ts` - Unit conversion utilities
- ✅ `src/core/xml.ts` - XML utilities
- ✅ `src/core/layout.ts` - Layout utilities

#### Model Classes (20 files)
- ✅ `src/models/index.ts` - Models entry point
- ✅ `src/models/Belt.ts` - Belt model
- ✅ `src/models/BoltCircle.ts` - Bolt circle model
- ✅ `src/models/BoltRectangle.ts` - Bolt rectangle model
- ✅ `src/models/ConnectTheDots.ts` - Connect the dots model
- ✅ `src/models/Dogbone.ts` - Dogbone model
- ✅ `src/models/Dome.ts` - Dome model
- ✅ `src/models/Holes.ts` - Holes model
- ✅ `src/models/Oval.ts` - Oval model
- ✅ `src/models/OvalArc.ts` - Oval arc model
- ✅ `src/models/Polygon.ts` - Polygon model
- ✅ `src/models/Rectangle.ts` - Rectangle model
- ✅ `src/models/Ring.ts` - Ring model
- ✅ `src/models/RoundRectangle.ts` - Round rectangle model
- ✅ `src/models/SCurve.ts` - S-curve model
- ✅ `src/models/Slot.ts` - Slot model
- ✅ `src/models/Square.ts` - Square model
- ✅ `src/models/Star.ts` - Star model
- ✅ `src/models/BezierCurve-esm.ts` - Bezier curve model (ES module version)
- ✅ `src/models/Ellipse.ts` - Ellipse and EllipticArc models
- ✅ `src/models/Text.ts` - Text rendering model

### ⏳ Remaining Namespace Files (7 files)

#### Core Modules (1 file)
- ⏳ `src/core/cascades.ts` - Uses `namespace MakerJs` (generated). Generator now runs under ESM (`target/cascadable.js`) during `npm run build` and updates this file.

---

## 📦 Package: playground

### ✅ Converted to ES6 Modules (11 files)

- ✅ `src/monaco-editor-adapter.ts` - Monaco Editor compatibility layer
- ✅ `src/pointer.ts` - Pointer utilities for touch/mouse interactions
- ✅ `src/iexport.ts` - Export interfaces and enums
- ✅ `src/irender.ts` - Render interfaces
- ✅ `src/fontloader.ts` - Font loading utilities
- ✅ `src/format-options.ts` - Export format options
- ✅ `src/require-iframe.ts` - Iframe require implementation
- ✅ `src/playground.ts` - Main playground file (converted from namespace)
- ✅ `src/worker/export-worker.ts` - Export worker
- ✅ `src/worker/render-worker.ts` - Render worker
- ✅ `src/worker/string-reader.ts` - String reader utility

### ⏳ Remaining Namespace Files (0 files)

**All playground files have been converted to ES6 modules!**

**Note:** The playground now uses ES6 modules with a global export for browser compatibility. Functions are exported to `window.MakerJsPlayground` for iframe communication.

---

## 📦 Package: docs

### ⏳ Remaining Namespace Files (1 file)

- ⏳ `livedoc.ts` - Live documentation utilities (uses `namespace LiveDoc`)

**Note:** This is a documentation utility that runs in the browser and may need to remain as a namespace.

---

## 📦 Package: fonts

### ✅ Converted to ES6 Modules (1 file)

- ✅ `gen.ts` - Font generation script (uses ES6 imports)

---

## 🎯 Priority Conversion Targets

### High Priority (Core Library)
1. ✅ **`src/core/svg.ts`** - Major exporter, widely used (COMPLETED - delegated to svg-esm.ts)
2. ✅ **`src/core/pdf.ts`** - PDF export functionality (COMPLETED - delegated to pdf-esm.ts)
3. ✅ **`src/core/openjscad.ts`** - OpenJSCAD export (COMPLETED - delegated to openjscad-esm.ts)
4. ✅ **`src/models/BezierCurve.ts`** - Complex path model (COMPLETED - BezierCurve-esm.ts)
5. **`src/models/Ellipse.ts`** - Ellipse and elliptic arc models
6. **`src/models/Text.ts`** - Text rendering model

### Medium Priority (Layout & Cascades)
7. **`src/core/layout.ts`** - Layout utilities
8. **`src/core/cascades.ts`** - Generated cascade interfaces (may need build script update)

### Low Priority (Playground - Browser Specific)
9. **Playground files** - May require different modernization strategy due to browser global scope requirements

---

## 📋 Conversion Checklist

When converting a file from namespace to ES6 modules:

- [ ] Replace `namespace MakerJs` with ES6 exports
- [ ] Add proper import statements for dependencies
- [ ] Update internal references to use imported names
- [ ] Add `.js` extensions to import paths (TypeScript ES module requirement)
- [ ] Update the main `index.ts` to export the new module
- [ ] Test the conversion with build and runtime tests
- [ ] Update any dependent files that import the converted module
- [ ] Update this inventory document

---

## 🔧 Build System Status

### Current Build Configuration
- **TypeScript Version:** 5.7.2 (upgraded from 4.1.3)
- **Module System:** ES2022
- **Target:** ES2022
- **Module Resolution:** Bundler
- **Build Tool:** Native TypeScript compiler (tsc)

### Distribution Formats
- **Node.js:** ES modules with `.js` extension
- **Browser:** UMD bundle (via build process)
- **TypeScript:** Type definitions in `dist/types/`

---

## 📊 Migration Strategy

### Phase 1: Core Utilities ✅ COMPLETE
- All core utility modules converted to ES6
- Path and point utilities modernized
- Measurement and intersection utilities updated

### Phase 2: Model Classes ✅ COMPLETE
- All 20 model classes converted to ES6 modules
- Ellipse, EllipticArc, and Text successfully migrated

### Phase 3: Exporters & Layout ✅ COMPLETE
- ✅ SVG exporter/importer converted (svg-esm.ts)
- ✅ PDF exporter converted (pdf-esm.ts)
- ✅ OpenJSCAD exporter converted (openjscad-esm.ts)
- ✅ Layout utilities converted (layout.ts)

### Phase 4: Playground Modernization ✅ COMPLETE
- ✅ Monaco Editor integration complete
- ✅ All 11 playground files converted to ES6 modules
- ✅ Global exports maintained for browser compatibility via `window.MakerJsPlayground`
- ✅ TypeScript configuration updated for ES2020 modules
- ✅ Type declarations created for global libraries (makerjs, opentype, marked)

---

## 🎉 Recent Achievements

- ✅ **Playground 100% ES6 Modules** - All 11 playground files converted to modern ES6 modules (Phase 4 complete!)
- ✅ **Monaco Editor Migration Complete** - Replaced CodeMirror 5.10.0 with Monaco Editor v0.44.0
- ✅ **Modern JavaScript Support** - const, let, arrow functions, template literals, async/await
- ✅ **TypeScript 5.7.2 Upgrade** - Latest TypeScript with modern features
- ✅ **ES2022 Module System** - Modern ES modules throughout core library
- ✅ **88% Overall Conversion** - 56 out of 64 files now use ES6 modules
- ✅ **86% Core Library Conversion** - Vast majority of core functionality modernized
- ✅ **All Model Classes Converted** - 20/20 model classes now use ES6 modules
- ✅ **Layout Module Modernized** - All layout functions (radial, grid, brick, honeycomb) in ES6
- ✅ **All Major Exporters Modernized** - SVG, PDF, and OpenJSCAD in ES6 modules
- ✅ **BezierCurve Model Modernized** - Complex Bezier curve support in ES6 modules
 - ✅ **Test Harness Stabilized** - Converted offending CommonJS tests to ESM; added `createRequire` for UMD checks
 - ✅ **Types Emission Fixed** - `dist/types/index.d.ts` now generated; Vite no longer clears it (`emptyOutDir: false`)
 - ✅ **Browser Bundle Clean** - Removed `clone` dependency to avoid Buffer usage in browser bundle

---

## 📝 Notes

1. **Cascades File:** `src/core/cascades.ts` is generated by `./target/cascadable.js` and will need the generator script updated to output ES6 modules. This is a low-priority item as it's primarily for the cascade API pattern.

2. **Playground Strategy:** The playground uses namespaces for browser global scope access. Consider:
   - Keep namespaces but modernize internal code
   - Use a bundler to create browser globals from ES modules
   - Hybrid approach: ES modules internally, namespace wrapper for browser

3. **SVG Module:** ✅ COMPLETED - SVG module successfully converted to ES6 (svg-esm.ts).

4. **Backward Compatibility:** The UMD build process maintains compatibility with existing users while the source code modernizes.

---

## 🔗 Related Documents

- [MODERNIZATION_PLAN.md](./MODERNIZATION_PLAN.md) - Overall modernization strategy
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [README.md](./README.md) - Project overview
