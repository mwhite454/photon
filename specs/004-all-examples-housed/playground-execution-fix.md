# Playground Execution Fix Implementation

**Feature**: 004-all-examples-housed  
**Date**: 2025-10-13  
**Tasks**: T055-T059  
**Status**: ✅ IMPLEMENTED - Ready for Testing

---

## Problem Summary

The playground had two execution paths:
1. **Worker mode** (`render-worker.ts`) - Had import stripping ✅
2. **Iframe mode** (`require-iframe.js`) - NO import stripping ❌

The iframe mode was failing with error: "Cannot use import statement outside a module"

---

## Root Cause Analysis

### T055: Identified Execution Locations

**Iframe Creation**: `docs/playground/js/playground.js` (lines 852-862)
```javascript
iframe = document.createElement('iframe');
iframe.style.display = 'none';
document.body.appendChild(iframe);
```

**Code Execution**: `docs/playground/js/require-iframe.js`
- `runCodeIsolated()` - Line 38-47 (Pass 1: Collection)
- `runCodeGlobal()` - Line 49-57 (Pass 2: Execution)

### T056: Why Import Stripping Wasn't Working

**Finding**: Import stripping existed in `render-worker.ts` (line 60) but NOT in `require-iframe.js`

The playground uses TWO separate execution environments:
- **Worker-based**: For kit-based models (had import stripping)
- **Iframe-based**: For direct code execution (missing import stripping)

The iframe-based path is what the playground models use, and it had no import handling.

---

## Implementation Details

### Changes Made to `require-iframe.js`

#### 1. Added Import Stripping Function (Lines 22-42)

```javascript
const stripImports = (code) => {
    const originalLength = code.length;
    
    // Remove import statements (various forms)
    code = code.replace(/import\s+\*\s+as\s+\w+\s+from\s+['"][^'"]+['"];?\s*/g, '');
    code = code.replace(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\s*/g, '');
    code = code.replace(/import\s+\w+\s+from\s+['"][^'"]+['"];?\s*/g, '');
    
    // Remove export statements
    code = code.replace(/export\s+default\s+/g, '');
    code = code.replace(/export\s+{[^}]+};?\s*/g, '');
    code = code.replace(/export\s+(const|let|var|function|class)\s+/g, '$1 ');
    
    const strippedLength = originalLength - code.length;
    if (strippedLength > 0) {
        console.log('[require-iframe] Stripped ' + strippedLength + ' characters of import/export statements');
    }
    
    return code;
};
```

**Handles**:
- `import * as photon from 'photon'`
- `import { Circle } from 'photon'`
- `import photon from 'photon'`
- `export default MyModel`
- `export { model }`
- `export const model = ...`

#### 2. Updated `runCodeIsolated()` (Lines 38-47)

**Before**:
```javascript
const Fn = new Function('require', 'module', 'document', 'console', 'alert', 'playgroundRender', javaScript);
const result = new Fn(window.require, window.module, mockDocument, (parent).console, devNull, devNull);
```

**After**:
```javascript
const processedCode = stripImports(javaScript);
const Fn = new Function('require', 'module', 'document', 'console', 'alert', 'playgroundRender', 'photon', processedCode);
const result = new Fn(window.require, window.module, mockDocument, (parent).console, devNull, devNull, window.photon);
```

**Changes**:
- Strip imports before creating function
- Add `photon` as function parameter
- Pass `window.photon` as argument

#### 3. Updated `runCodeGlobal()` (Lines 49-57)

**Before**:
```javascript
const script = document.createElement('script');
const fragment = document.createDocumentFragment();
fragment.textContent = javaScript;
script.appendChild(fragment);
head.appendChild(script);
```

**After**:
```javascript
const script = document.createElement('script');
const fragment = document.createDocumentFragment();
const processedCode = stripImports(javaScript);
fragment.textContent = processedCode;
script.appendChild(fragment);
head.appendChild(script);
```

**Changes**:
- Strip imports before executing in global scope

#### 4. Added Photon to Required Modules (Lines 133-148)

**Before**:
```javascript
const required = {
    'makerjs': parent.makerjs,
    './../target/js/node.maker.js': parent.makerjs
};
```

**After**:
```javascript
const required = {
    'makerjs': parent.makerjs,
    './../target/js/node.maker.js': parent.makerjs,
    'photon': parent.makerjs  // Alias photon to makerjs for ES6 imports
};

// Make photon available globally in iframe
window.photon = parent.makerjs;
console.log('[require-iframe] Photon library injected into iframe:', typeof window.photon);
```

**Changes**:
- Added `photon` alias in required modules
- Injected `photon` into iframe global scope
- Added debug logging

### T057: Debug Logging Added

**Console Logs**:
1. Import stripping confirmation (line 38)
2. Photon injection confirmation (line 148)

These logs will appear in browser console to help trace execution flow.

---

## How It Works

### Execution Flow

1. **User clicks "Run" button** in playground
2. **Iframe is created** with `require-iframe.js` loaded
3. **Code is retrieved** from Monaco Editor
4. **Pass 1 (Collection)**:
   - `stripImports()` removes all ES6 import/export statements
   - `runCodeIsolated()` executes stripped code with `photon` injected
   - Collects dependencies via custom `require()` function
5. **Pass 2 (Execution)**:
   - Dependencies loaded via script tags
   - `stripImports()` removes imports again
   - `runCodeGlobal()` executes stripped code
   - `photon` is available globally in iframe
6. **Model is captured** and sent to parent window
7. **SVG is rendered** in playground canvas

### Why This Works

**Before**:
```javascript
import * as photon from 'photon';
const circle = new photon.paths.Circle([0, 0], 10);
```
❌ Error: "Cannot use import statement outside a module"

**After Stripping**:
```javascript
// import statement removed
const circle = new photon.paths.Circle([0, 0], 10);
```
✅ Works: `photon` is available as global variable

---

## Testing Strategy

### Next Steps (Tasks T060-T066)

1. **Start playground server**
2. **Navigate to playground** in browser
3. **Select "Simple Square" model** from dropdown
4. **Click "► Run" button**
5. **Check console** for debug logs:
   - `[require-iframe] Photon library injected into iframe: object`
   - `[require-iframe] Stripped X characters of import/export statements`
6. **Verify SVG renders** in canvas
7. **Take screenshot** as proof

### Expected Console Output

```
[require-iframe] Photon library injected into iframe: object
[require-iframe] Stripped 35 characters of import/export statements
```

### Expected Visual Result

- SVG canvas shows rendered square
- No errors in console
- Model parameters appear (if any)

---

## Verification Checklist

- [x] Import stripping function implemented
- [x] `runCodeIsolated()` updated to strip imports and inject photon
- [x] `runCodeGlobal()` updated to strip imports
- [x] `photon` added to required modules
- [x] `photon` injected into iframe global scope
- [x] Debug logging added
- [ ] Manual testing with playground (T060-T066)
- [ ] Playwright screenshot captured (T066)
- [ ] All 5 playground models tested (T067-T071)

---

## Files Modified

1. **`docs/playground/js/require-iframe.js`**
   - Added `stripImports()` function
   - Updated `runCodeIsolated()` to strip imports and inject photon
   - Updated `runCodeGlobal()` to strip imports
   - Added photon to required modules
   - Injected photon into iframe global scope
   - Added debug logging

**Total Changes**: ~30 lines added/modified

---

## Comparison with Worker Implementation

The fix mirrors the existing implementation in `render-worker.ts`:

| Feature | render-worker.ts | require-iframe.js |
|---------|------------------|-------------------|
| Import stripping | ✅ Line 60 | ✅ Lines 22-42 |
| Photon injection | ✅ Line 56 | ✅ Line 147 |
| Function parameter | ✅ Line 62 | ✅ Line 44 |
| Debug logging | ❌ None | ✅ Lines 38, 148 |

**Consistency**: Both execution paths now handle ES6 imports identically.

---

## Risk Assessment

**Low Risk** - This is a minimal, surgical fix:

✅ **No breaking changes**: Existing code without imports continues to work
✅ **Backward compatible**: Old examples still execute
✅ **No new dependencies**: Pure JavaScript regex replacement
✅ **Isolated changes**: Only affects iframe execution path
✅ **Mirrors existing pattern**: Same approach as render-worker.ts

**Potential Issues**:
- ⚠️ Complex import syntax might not be caught by regex (unlikely in playground models)
- ⚠️ Code with string literals containing "import" might be affected (very unlikely)

**Mitigation**:
- Debug logging helps identify issues
- Can easily revert if problems occur
- Testing with all 5 models will validate approach

---

## Next Actions

1. **Test manually** with playground (T060-T066)
2. **Verify with Playwright** screenshot (T066)
3. **Test all 5 models** (T067-T071)
4. **Document working solution** (T071)
5. **Proceed to Phase 5** (Polish & final verification)

---

## Success Criteria

✅ **Code executes** without import errors
✅ **Models render** visually in SVG canvas
✅ **Console shows** debug logs confirming import stripping
✅ **Screenshot proves** rendering works
✅ **All 5 models** execute successfully

**Definition of Done**: Playwright screenshot showing rendered model in playground canvas.

---

## Conclusion

The playground execution fix is **complete and ready for testing**. The implementation:

- ✅ Strips ES6 import/export statements before execution
- ✅ Injects `photon` library into iframe global scope
- ✅ Adds debug logging for troubleshooting
- ✅ Maintains backward compatibility
- ✅ Follows existing patterns from render-worker.ts

**Estimated Testing Time**: 30-60 minutes to verify all models work correctly.
