# Maker.js ES6 Module Modernization Plan

## Phase 1: Build Infrastructure ✅
- [x] Add Vite for modern bundling
- [x] Configure TypeScript for ES modules (ES2020, outDir: dist/esm)
- [x] Set up build scripts (build:lib in maker.js package)
- [x] Vite entry points to src/index.ts
- [x] Modern bundles building: maker.es.js, maker.umd.js, maker.iife.js

## Phase 2: Core Module Conversion (IN PROGRESS)

### ✅ Completed (Session Summary):
- [x] **schema.ts** → ES module exports with temp global type aliases
- [x] **maker.ts** → Partially converted (interfaces, utilities, type guards exported as ES modules)
- [x] **point.ts** → ✅ FULLY converted to ES module with modern syntax (199 lines)
- [x] **angle.ts** → ✅ FULLY converted to ES module with modern syntax (143 lines)
- [x] **path.ts** → ✅ FULLY converted to ES module with modern syntax (415 lines)
- [x] **paths.ts** → ✅ FULLY converted to ES module (393 lines) - Arc, Circle, Line, Chord, Parallel classes
- [x] **units.ts** → ✅ FULLY converted to ES module (65 lines) - Unit conversion utilities
- [x] **models/** → ✅ 15/20 model classes converted to ES modules (~450 lines)
  - ConnectTheDots, Holes, Rectangle, Square, Polygon, Ring, Star, Dome
  - BoltCircle, BoltRectangle, RoundRectangle, Oval, Slot, SCurve, Dogbone
- [x] **src/index.ts** → Exports schema, maker, angle, point, path, paths, units, models
- [x] **Vite builds** → ✅ Successfully generating ES/UMD/IIFE bundles (45.28 kB ES)
- [x] **23 commits** → Progress tracked in git history

### 📊 Current Build Status:
- **ESM pipeline**: ✅ Working perfectly
- **Bundles**: ✅ Building successfully (75.56 kB ES, 81.29 kB UMD, 81.03 kB IIFE)
- **Converted modules**: 
  - Core: schema, maker (partial), point (199), angle (143), path (415), paths (393), units (65), solvers (96), equal (243), measure-minimal (260), kit (40), xml (122), **model (643)** ✅
  - Models: 17/20 classes (85%)
- **Total converted**: ~3,019 lines of core functionality (60%)
- **TypeScript errors**: ~200+ (expected - remaining files still reference old namespaces)
- **Build warnings**: 3 warnings about path.intersection not exported (expected)
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

### 🔄 Phase 3: model.ts Conversion Strategy
- **Analysis Complete**: model.ts (643 lines, 17 exported functions)
- **Interfaces Verified**: ✅ IPathLine, IPathBezierSeed, IWalkModel all exist
- **Critical Blockers**: 
  - models.BezierCurve class - referenced in 5 locations
  - measure.modelExtents() - used in 3 functions (center, zero)
  - Circular reference: model.walk() calls itself recursively
- **Progress**: ~2,214 / ~5,000 lines converted (44% of core functionality)

### 🔄 Remaining Core Files After measure.ts:
- [ ] model.ts (model manipulation and traversal)
- [ ] chain.ts (path chaining and connectivity)
- [ ] paths.ts (path constructors - Line, Circle, Arc classes)
- [ ] break.ts, combine.ts, collect.ts, simplify.ts, expand.ts
- [ ] units.ts, equal.ts

### Remaining Core Files:
- [ ] model.ts
- [ ] chain.ts
- [ ] paths.ts (path constructors)
- [ ] break.ts, combine.ts, collect.ts, simplify.ts, expand.ts
- [ ] units.ts, equal.ts
- [ ] exporter.ts, importer.ts
- [ ] dxf.ts, xml.ts, svg.ts, pdf.ts, openjscad.ts
- [ ] solvers.ts, intersect.ts, fillet.ts
- [ ] kit.ts, layout.ts, deadend.ts, cascades.ts
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

## Phase 4: Playground Updates

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

## Phase 5: Dependencies Update

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

## Phase 6: Testing & Validation

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

## Next Steps

1. ✅ Create git branch for migration
2. ⏳ Update TypeScript configurations
3. ⏳ Install Vite and modern tools
4. ⏳ Create Vite config
5. ⏳ Start refactoring core modules
