# Research: ES6 Module Execution in Iframe Context

**Feature**: 004-all-examples-housed  
**Date**: 2025-10-13  
**Tasks**: T052-T054  
**Purpose**: Research approaches to execute ES6 import statements in playground iframe environment

---

## Problem Statement

The playground currently uses an iframe-based code execution environment that:
1. Creates an iframe with custom `require()` function
2. Executes user code via `new Function()` constructor and dynamic `<script>` tags
3. **Cannot execute ES6 `import` statements** because:
   - `import` statements are only valid in module context
   - `new Function()` creates non-module context
   - Dynamic script tags without `type="module"` are non-module context

**Current Error**: "Cannot use import statement outside a module"

---

## Current Implementation Analysis

### File: `docs/playground/js/require-iframe.js`

**Code Execution Flow**:
1. **Pass 1 (Collection)**: Runs code via `runCodeIsolated()` using `new Function()`
   - Collects dependencies via custom `require()` function
   - Mocks `makerjs` object to prevent errors
   
2. **Pass 2 (Execution)**: Runs code via `runCodeGlobal()` using dynamic `<script>` tag
   - Executes actual code with real dependencies loaded
   - Captures model output via `module.exports` or global properties

**Key Code Snippets**:
```javascript
// Line 23-29: Isolated execution (Pass 1)
const runCodeIsolated = (javaScript) => {
    const Fn = new Function('require', 'module', 'document', 'console', 'alert', 'playgroundRender', javaScript);
    const result = new Fn(window.require, window.module, mockDocument, (parent).console, devNull, devNull);
    return window.module.exports || result;
};

// Line 32-38: Global execution (Pass 2)
const runCodeGlobal = (javaScript) => {
    const script = document.createElement('script');
    const fragment = document.createDocumentFragment();
    fragment.textContent = javaScript;
    script.appendChild(fragment);
    head.appendChild(script);
};
```

**Problem**: Neither approach supports ES6 `import` statements.

---

## Research Findings

### Approach 1: Script Type="module" in Iframe ✅ RECOMMENDED

**How It Works**:
- Browsers natively support ES6 modules via `<script type="module">`
- Modules can be executed in iframe context
- Dynamic imports work: `import("./module.js")`

**Implementation**:
```javascript
// Option A: Inline module with data URL
const moduleCode = `
  import * as photon from 'photon';
  // user code here
`;
const blob = new Blob([moduleCode], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);
const script = document.createElement('script');
script.type = 'module';
script.src = url;
iframe.contentDocument.head.appendChild(script);

// Option B: Inline module with srcdoc
iframe.srcdoc = `
  <!DOCTYPE html>
  <html>
    <head>
      <script type="module">
        import * as photon from '/path/to/photon.js';
        // user code here
      </script>
    </head>
  </html>
`;

// Option C: Dynamic import() in iframe
iframe.contentWindow.eval(`
  import('/path/to/photon.js').then(photon => {
    window.photon = photon;
    // execute user code here
  });
`);
```

**Pros**:
- Native browser support (all modern browsers)
- No transpilation needed
- Proper module semantics
- Works with `import` and `export` statements

**Cons**:
- Requires photon library to be available as ES6 module
- Need to handle async module loading
- CORS restrictions apply to module imports

**Browser Support**: Chrome 61+, Firefox 60+, Safari 11+, Edge 16+ (all modern browsers)

**References**:
- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN: Dynamic import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- [GitHub Gist: ES modules in iframe](https://gist.github.com/bellbind/b7e924c7c8c7477b021c110545cc602a)

---

### Approach 2: Strip Imports and Inject Library ✅ SIMPLE

**How It Works**:
- Parse user code to remove `import` statements
- Inject library into iframe global scope
- Execute code in non-module context

**Implementation**:
```javascript
// Strip import statements
let code = userCode;
code = code.replace(/import\s+\*\s+as\s+\w+\s+from\s+['"][^'"]+['"];?\s*/g, '');
code = code.replace(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\s*/g, '');
code = code.replace(/import\s+\w+\s+from\s+['"][^'"]+['"];?\s*/g, '');

// Inject photon into iframe
iframe.contentWindow.photon = parent.photon;

// Execute stripped code
const script = document.createElement('script');
script.textContent = code;
iframe.contentDocument.head.appendChild(script);
```

**Pros**:
- Simple to implement
- No async complexity
- Works with existing execution model
- No CORS issues

**Cons**:
- Regex-based parsing is fragile
- Doesn't support all import syntax variations
- Loses module semantics
- Doesn't support `export` statements

**Status**: **PARTIALLY IMPLEMENTED** in `packages/playground/src/render-worker.ts` (lines 15-17) but not working correctly

---

### Approach 3: Babel Standalone Transpilation ⚠️ HEAVY

**How It Works**:
- Use Babel Standalone to transpile ES6 modules to CommonJS/IIFE
- Execute transpiled code in non-module context

**Implementation**:
```javascript
// Include Babel Standalone
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

// Transpile code
const transpiled = Babel.transform(userCode, {
  presets: ['es2015'],
  plugins: ['transform-modules-commonjs']
}).code;

// Execute transpiled code
iframe.contentWindow.eval(transpiled);
```

**Pros**:
- Handles all ES6 syntax correctly
- Robust parsing
- Supports complex import/export patterns

**Cons**:
- Large dependency (~2MB for Babel Standalone)
- Slower execution (transpilation overhead)
- Overkill for simple import stripping
- Adds build complexity

**References**:
- [Babel Standalone](https://babeljs.io/docs/en/babel-standalone)
- [In-browser ES6 transpilation](https://k33g.github.io/2015/05/02/ES6.html)

---

### Approach 4: ES Module Shims 🔧 POLYFILL

**How It Works**:
- Use `es-module-shims` polyfill for older browsers
- Enables `<script type="module">` and `import()` everywhere

**Implementation**:
```javascript
// Include ES Module Shims
<script async src="https://ga.jspm.io/npm:es-module-shims@1.8.0/dist/es-module-shims.js"></script>

// Then use normal module syntax
<script type="module">
  import * as photon from '/path/to/photon.js';
  // user code
</script>
```

**Pros**:
- Enables modules in older browsers
- Small polyfill (~10KB)
- Standards-compliant

**Cons**:
- Not needed for modern browsers
- Adds dependency
- Still requires photon as ES6 module

**References**:
- [ES Module Shims](https://github.com/guybedford/es-module-shims)

---

## Recommended Solution

### **Hybrid Approach: Import Stripping + Global Injection**

**Why This Approach**:
1. ✅ **Minimal changes** to existing codebase
2. ✅ **No new dependencies** (no Babel, no polyfills)
3. ✅ **Works with current architecture** (iframe + require system)
4. ✅ **Fast execution** (no transpilation overhead)
5. ✅ **Backward compatible** (doesn't break existing examples)

**Implementation Plan**:

1. **Fix import stripping in `render-worker.ts`**:
   - Current regex is too simple
   - Need to handle all import variations
   - Strip both `import` and `export` statements

2. **Ensure `photon` is available in iframe**:
   - Already done: `required['makerjs'] = parent.makerjs` (line 115)
   - Add: `iframe.contentWindow.photon = parent.photon`

3. **Update code execution**:
   - Strip imports before passing to `runCodeIsolated()` and `runCodeGlobal()`
   - Inject `photon` into iframe global scope
   - Execute stripped code as before

**Code Changes Required**:

```javascript
// In require-iframe.js, add after line 117:
required['photon'] = parent.photon;

// Add import stripping function:
const stripImports = (code) => {
  // Remove import statements
  code = code.replace(/import\s+\*\s+as\s+\w+\s+from\s+['"][^'"]+['"];?\s*/g, '');
  code = code.replace(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\s*/g, '');
  code = code.replace(/import\s+\w+\s+from\s+['"][^'"]+['"];?\s*/g, '');
  
  // Remove export statements
  code = code.replace(/export\s+default\s+/g, '');
  code = code.replace(/export\s+{[^}]+};?\s*/g, '');
  code = code.replace(/export\s+(const|let|var|function|class)\s+/g, '$1 ');
  
  return code;
};

// In window.onload (line 173), before executing code:
const javaScript = stripImports(parent.PhotonPlayground.codeMirrorEditor.getDoc().getValue());

// Ensure photon is available globally in iframe:
window.photon = parent.photon;
```

**Testing Strategy**:
1. Test with simple model: `simple-square.js`
2. Verify no import errors in console
3. Verify model renders in SVG canvas
4. Take Playwright screenshot as proof
5. Test all 5 playground models

---

## Alternative: Full Module Support (Future Enhancement)

For a more robust long-term solution, consider migrating to native ES6 modules:

**Phase 1** (Current): Import stripping (quick fix)
**Phase 2** (Future): Native module support with `<script type="module">`

**Benefits of Phase 2**:
- Proper module semantics
- Better error messages
- Support for dynamic imports
- Standards-compliant

**Challenges**:
- Requires photon library as ES6 module
- Need to handle async module loading
- More complex iframe setup
- CORS configuration

---

## Decision Matrix

| Approach | Complexity | Performance | Compatibility | Recommended |
|----------|-----------|-------------|---------------|-------------|
| Script type="module" | Medium | Fast | Modern browsers | Future |
| Strip imports | Low | Fast | All browsers | **YES** ✅ |
| Babel transpilation | High | Slow | All browsers | No |
| ES Module Shims | Medium | Medium | All browsers | No |

---

## Next Steps (Tasks T055-T059)

1. **T055**: Identify exact location in `playground.js` where iframe is created (✅ Found: line 855)
2. **T056**: Debug why current import stripping in `render-worker.ts` isn't working
3. **T057**: Add console logging to trace execution flow
4. **T058**: Implement improved import stripping in `require-iframe.js`
5. **T059**: Ensure `photon` is injected into iframe global scope

---

## References

- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN: Dynamic import()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- [GitHub Gist: ES modules in iframe](https://gist.github.com/bellbind/b7e924c7c8c7477b021c110545cc602a)
- [Stack Overflow: ES6 imports in iframe](https://stackoverflow.com/questions/50637845/how-can-i-add-javascript-code-from-import-into-iframe)
- [Babel Standalone](https://babeljs.io/docs/en/babel-standalone)
- [ES Module Shims](https://github.com/guybedford/es-module-shims)

---

## Conclusion

**Recommended Approach**: Import stripping with global injection

**Rationale**:
- Minimal code changes
- No new dependencies
- Fast execution
- Works with existing architecture
- Can be implemented and tested quickly

**Expected Outcome**:
- Playground models execute without import errors
- Models render visually in SVG canvas
- All 5 playground models work correctly
- Playwright screenshot proves success

**Estimated Implementation Time**: 2-3 hours
