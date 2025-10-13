# Playground Source Code Audit: MakerJS → Photon Migration

**Date**: 2025-10-13  
**Purpose**: Document all TypeScript source files requiring namespace migration  
**Scope**: `packages/playground/src/` directory

## Summary

**Total Files Found**: 7 files with `makerjs` references  
**Total Occurrences**: 99 references to `makerjs`

## Files Requiring Updates

### 1. playground.ts (54 occurrences) 🔴 HIGH PRIORITY

**Path**: `packages/playground/src/playground.ts`  
**Lines**: 1909 total  
**Type**: Main playground application logic

**Changes Required**:
- Replace `makerjs.cloneObject()` → `photon.cloneObject()`
- Replace `makerjs.round()` → `photon.round()`
- Replace `makerjs.exporter.XmlTag` → `photon.exporter.XmlTag`
- Replace `makerjs.paths.Circle` → `photon.paths.Circle`
- Replace `makerjs.paths.Arc` → `photon.paths.Arc`
- Replace `makerjs.paths.Line` → `photon.paths.Line`
- Replace `makerjs.models.ConnectTheDots` → `photon.models.ConnectTheDots`
- Replace `makerjs.travel()` → `photon.travel()`
- Replace `makerjs.point.*` → `photon.point.*`
- Replace `makerjs.measure.*` → `photon.measure.*`
- Update code generation: `var makerjs = require('makerjs')` → `import * as photon from 'photon'`

**Example Code Generation (Line 319)**:
```typescript
// BEFORE
code.push("var makerjs = require('makerjs');");
code.push("    example: new makerjs.models." + id + "(" + safeParamNames + ")");

// AFTER
code.push("import * as photon from 'photon';");
code.push("    example: new photon.models." + id + "(" + safeParamNames + ")");
```

### 2. require-iframe.ts (17 occurrences) 🟡 MEDIUM PRIORITY

**Path**: `packages/playground/src/require-iframe.ts`  
**Lines**: ~400 total  
**Type**: Iframe code execution environment

**Changes Required**:
- Replace all `makerjs` namespace references with `photon`
- Update global variable injection logic
- Ensure `photon` is available in iframe context

### 3. worker/export-worker.ts (12 occurrences) 🟡 MEDIUM PRIORITY

**Path**: `packages/playground/src/worker/export-worker.ts`  
**Type**: Export functionality worker

**Changes Required**:
- Replace `makerjs.exporter.*` → `photon.exporter.*`
- Update all namespace references

### 4. pointer.ts (7 occurrences) 🟢 LOW PRIORITY

**Path**: `packages/playground/src/pointer.ts`  
**Type**: Pointer/mouse interaction handling

**Changes Required**:
- Replace `makerjs.point.*` → `photon.point.*`
- Replace `makerjs.measure.*` → `photon.measure.*`

### 5. worker/render-worker.ts (6 occurrences) 🟢 LOW PRIORITY

**Path**: `packages/playground/src/worker/render-worker.ts`  
**Type**: Rendering worker (already has some photon aliases)

**Changes Required**:
- Replace remaining `makerjs` references with `photon`
- Verify photon alias is used consistently

### 6. globals.d.ts (2 occurrences) 🔴 HIGH PRIORITY

**Path**: `packages/playground/src/globals.d.ts`  
**Type**: TypeScript type definitions

**Changes Required**:
```typescript
// BEFORE (Line 5)
declare var makerjs: any;

// AFTER
declare var photon: any;
```

**Note**: Comment on line 4 acknowledges this needs rebrand cleanup

### 7. format-options.ts (1 occurrence) 🟢 LOW PRIORITY

**Path**: `packages/playground/src/format-options.ts`  
**Type**: Export format options

**Changes Required**:
- Replace single `makerjs` reference with `photon`

## Type Definitions

### Files to Check for Type References

- ✅ `globals.d.ts` - Contains `declare var makerjs: any` (needs update)
- ✅ No separate `@types/makerjs` package found
- ✅ All types use `Photon` namespace (already correct)

## Priority Order for Updates

### Phase 1: Critical Files (Blocking Rendering)
1. **globals.d.ts** - Type declaration must be updated first
2. **playground.ts** - Main application logic (54 occurrences)
3. **require-iframe.ts** - Code execution environment (17 occurrences)

### Phase 2: Worker Files
4. **worker/export-worker.ts** - Export functionality (12 occurrences)
5. **worker/render-worker.ts** - Rendering (6 occurrences)

### Phase 3: Supporting Files
6. **pointer.ts** - UI interactions (7 occurrences)
7. **format-options.ts** - Configuration (1 occurrence)

## Migration Pattern

For each file, apply these transformations:

1. **Global Variable Declaration**:
   ```typescript
   // BEFORE
   declare var makerjs: any;
   
   // AFTER
   declare var photon: any;
   ```

2. **Namespace References**:
   ```typescript
   // BEFORE
   makerjs.paths.Circle
   makerjs.point.add
   makerjs.exporter.XmlTag
   
   // AFTER
   photon.paths.Circle
   photon.point.add
   photon.exporter.XmlTag
   ```

3. **Code Generation**:
   ```typescript
   // BEFORE
   code.push("var makerjs = require('makerjs');");
   
   // AFTER
   code.push("import * as photon from 'photon';");
   ```

## Verification Steps

After updates:

1. **TypeScript Compilation**:
   ```bash
   cd packages/playground
   npm run build
   ```

2. **Check Compiled Output**:
   ```bash
   grep -r "makerjs\." docs/playground/js/
   # Should return minimal or no results (only in comments/strings)
   ```

3. **Runtime Testing**:
   - Load playground in browser
   - Select "Simple Square" model
   - Click "Run"
   - Verify SVG renders without errors

## Estimated Effort

- **globals.d.ts**: 2 minutes (simple find/replace)
- **playground.ts**: 20 minutes (54 occurrences, careful review needed)
- **require-iframe.ts**: 10 minutes (17 occurrences)
- **worker/export-worker.ts**: 8 minutes (12 occurrences)
- **pointer.ts**: 5 minutes (7 occurrences)
- **worker/render-worker.ts**: 5 minutes (6 occurrences)
- **format-options.ts**: 2 minutes (1 occurrence)

**Total Estimated Time**: ~50 minutes for updates + 10 minutes for rebuild/test = **1 hour**

## Notes

- All files use TypeScript, so compiler will catch type errors
- The `Photon` namespace in type definitions is already correct
- Only the global `makerjs` variable and namespace references need updating
- No import statements need changing (files use global variables)
- Code generation strings need special attention to update correctly

## Next Steps

1. ✅ Audit complete
2. ⏳ Update files in priority order
3. ⏳ Rebuild playground
4. ⏳ Test rendering
5. ⏳ Verify all models work
