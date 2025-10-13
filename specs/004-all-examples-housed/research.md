# Research: Modernize Examples and Playground Models

**Feature**: 004-all-examples-housed  
**Date**: 2025-10-12  
**Purpose**: Document technical decisions and best practices for migrating legacy JavaScript syntax to ES6+

## Overview

This document captures research findings for migrating 28 example and playground model files from CommonJS/var syntax to ES6+ imports and const/let declarations. The migration is purely syntactic - no functional changes are required.

## Key Decisions

### Decision 1: Import Syntax Pattern

**Decision**: Use `import * as photon from 'photon'` for all example files

**Rationale**:
- Maintains namespace consistency with original `makerjs` usage pattern
- All examples currently use `makerjs.paths.Circle`, `makerjs.models.Oval`, etc.
- Namespace import allows minimal code changes beyond the import statement
- Aligns with TypeScript best practices for library consumption

**Alternatives Considered**:
- Named imports (`import { paths, models } from 'photon'`) - Rejected because it would require rewriting all references throughout examples
- Default import (`import photon from 'photon'`) - Rejected because photon doesn't export a default, it exports a namespace
- Destructured imports (`import { Circle, Line } from 'photon/paths'`) - Rejected due to extensive code changes required

**Implementation**:
```javascript
// Before
var makerjs = require('./../target/js/node.maker.js');

// After
import * as photon from 'photon';
```

### Decision 2: Export Syntax Pattern

**Decision**: Use `export default` for function-based examples

**Rationale**:
- Examples currently use `module.exports = functionName`
- ES6 default export is the direct equivalent
- Maintains single export per file pattern
- Compatible with both Node.js and browser bundlers

**Alternatives Considered**:
- Named exports (`export { functionName }`) - Rejected because it changes how examples are imported by consumers
- Export declaration (`export default function name() {}`) - Rejected because examples define functions then export them separately

**Implementation**:
```javascript
// Before
function smile(span, teeth, droop, dainty, gaze, heady) {
  // ... implementation
}
module.exports = smile;

// After
function smile(span, teeth, droop, dainty, gaze, heady) {
  // ... implementation
}
export default smile;
```

### Decision 3: Variable Declaration Strategy

**Decision**: Use `const` by default, `let` only when reassignment is required

**Rationale**:
- Follows Airbnb Style Guide and modern JavaScript best practices
- `const` prevents accidental reassignment and makes code intent clearer
- Most variables in examples are not reassigned
- Improves code quality and catches potential bugs

**Alternatives Considered**:
- Replace all `var` with `let` - Rejected because it doesn't enforce immutability where possible
- Keep `var` for backward compatibility - Rejected because it defeats the purpose of modernization

**Implementation Guidelines**:
```javascript
// Before
var circle = new makerjs.paths.Circle([0, 0], 10);
var counter = 0;
for (var i = 0; i < 10; i++) {
  counter += i;
}

// After
const circle = new photon.paths.Circle([0, 0], 10);
let counter = 0;
for (let i = 0; i < 10; i++) {
  counter += i;
}
```

### Decision 4: TypeScript File Handling

**Decision**: Update TypeScript files using the same import pattern with proper type annotations

**Rationale**:
- TypeScript files (ventgrid.ts, ventgridcircle.ts) follow same patterns as JavaScript
- TypeScript compiler will validate the changes
- Type definitions already exist in @photon/core package

**Implementation**:
```typescript
// Before
var makerjs = require('./../target/js/node.maker.js');

// After
import * as photon from 'photon';
```

### Decision 5: HTML File Handling

**Decision**: Update script references and inline code in dependExample.html

**Rationale**:
- HTML file contains references to makerjs in comments and documentation
- May contain inline JavaScript that needs updating
- Ensures consistency across all file types

**Implementation**: Review and update any references to "makerjs" in comments, documentation, or inline scripts

### Decision 6: Internal Path References

**Decision**: Replace `./../target/js/node.maker.js` with `photon` package import

**Rationale**:
- Internal build artifacts should not be referenced directly
- Package import uses the proper entry point from package.json
- Aligns with how external consumers would use the library

**Alternatives Considered**:
- Update to new internal path - Rejected because examples should demonstrate public API usage
- Keep internal paths for examples - Rejected because it's not how users would consume the library

## Best Practices Research

### ES6 Module Best Practices

**Source**: MDN Web Docs, Airbnb JavaScript Style Guide

1. **Import Placement**: All imports at the top of the file, before any code
2. **Import Grouping**: External dependencies first, then internal modules
3. **No Mixed Module Systems**: Don't mix `require()` and `import` in the same file
4. **Named vs Default**: Use default exports for single-export modules

### Variable Declaration Best Practices

**Source**: Airbnb JavaScript Style Guide, ESLint recommendations

1. **Prefer const**: Use `const` for all references that won't be reassigned
2. **Use let**: Use `let` only when you need to reassign the variable
3. **Never var**: Avoid `var` entirely in modern JavaScript
4. **Block Scoping**: Declare variables in the narrowest scope possible
5. **One Declaration Per Line**: Each variable gets its own `const` or `let` statement

### Migration Safety Checks

**Verification Steps**:
1. ✅ Syntax validation: Run through Babel/TypeScript compiler
2. ✅ Functional testing: Execute each example and verify output matches original
3. ✅ Namespace verification: Ensure all `makerjs` references replaced with `photon`
4. ✅ Import verification: Confirm zero `require()` statements remain
5. ✅ Variable verification: Confirm zero `var` declarations remain
6. ✅ Export verification: Confirm all `module.exports` replaced with ES6 exports

## Technology Considerations

### Node.js Module Support

**Finding**: Node.js 18+ fully supports ES6 modules

- Package.json has `"type": "module"` set for @photon/core
- Examples can use ES6 imports natively
- No transpilation required for Node.js execution

### Browser Compatibility

**Finding**: Modern browsers support ES6 modules natively

- Playground uses bundler (likely Vite based on package.json)
- Bundler handles module transformation for older browsers
- No special configuration needed

### TypeScript Compilation

**Finding**: TypeScript 5.6.3 fully supports ES6 module syntax

- tsconfig.json should have `"module": "ES6"` or `"ESNext"`
- Type definitions already available in @photon/core
- No changes to TypeScript configuration required

## Risks and Mitigations

### Risk 1: Breaking Example Functionality

**Likelihood**: Low  
**Impact**: High  
**Mitigation**: 
- Create verification tests that execute each example before and after migration
- Compare output/behavior to ensure functional equivalence
- Manual testing of playground models in the playground interface

### Risk 2: Incorrect const/let Usage

**Likelihood**: Medium  
**Impact**: Low  
**Mitigation**:
- Follow clear guidelines: const by default, let only when reassignment needed
- Use ESLint to catch incorrect usage
- Code review to verify best practices

### Risk 3: Missing makerjs References

**Likelihood**: Low  
**Impact**: Medium  
**Mitigation**:
- Use grep/search to find all occurrences of "makerjs"
- Automated verification script to check for remaining references
- Include in verification checklist

### Risk 4: Import Path Issues

**Likelihood**: Low  
**Impact**: Medium  
**Mitigation**:
- Test that `import * as photon from 'photon'` resolves correctly
- Verify package.json exports configuration
- Test in both Node.js and browser environments

## Implementation Approach

### Recommended Order

1. **Setup Phase**: Create verification scripts and baseline tests
2. **Pilot Migration**: Migrate 2-3 simple examples first (smile.js, spiral.js)
3. **Validation**: Run verification suite on pilot files
4. **Bulk Migration**: Migrate remaining JavaScript examples
5. **TypeScript Migration**: Update TypeScript files
6. **Playground Models**: Update playground model files
7. **HTML/Special Cases**: Handle dependExample.html and any edge cases
8. **Final Verification**: Run complete verification suite
9. **Documentation**: Update any README or documentation referencing examples

### Automation Opportunities

**Potential for Automated Migration**:
- Find/replace for import statements (with manual review)
- Find/replace for namespace changes (makerjs → photon)
- Find/replace for export statements (with manual review)
- Automated var → const/let conversion (using ESLint --fix or similar)

**Manual Review Required**:
- Determining const vs let for each variable
- Verifying functional equivalence
- Handling edge cases (HTML, complex examples)

## Success Metrics

- ✅ All 28 files migrated successfully
- ✅ Zero `require()` statements remain
- ✅ Zero `var` declarations remain
- ✅ Zero `makerjs` references remain (except in comments explaining migration)
- ✅ All examples execute without errors
- ✅ All playground models render correctly
- ✅ Verification scripts pass 100%

## References

- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Node.js ES Modules Documentation](https://nodejs.org/api/esm.html)
- [TypeScript Module Documentation](https://www.typescriptlang.org/docs/handbook/modules.html)
- Photon package.json configuration
- Existing codebase patterns in packages/photon/src
