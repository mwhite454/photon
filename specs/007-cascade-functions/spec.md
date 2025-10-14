# Feature Specification: Modern Functional Composition + Legacy Cascade Support

**Feature ID**: 007  
**Status**: Planning  
**Priority**: High  
**Target Release**: v1.1.0  
**Created**: 2025-10-14  
**Updated**: 2025-10-14 (Dual approach: pipe/compose + cascade)

## Overview

Implement modern functional composition utilities (`pipe`, `compose`) as the **primary** API for chaining operations in photon/core, while also modernizing and re-enabling the legacy `$()` cascade function for backward compatibility with maker.js. This dual approach provides:

1. **Primary**: Pure functional composition (pipe/compose) for modern codebases
2. **Legacy**: Modernized cascade ($) for maker.js migration compatibility

## Background

The cascade function `$()` was disabled in `packages/photon/src/core/maker.ts` with the comment:
```typescript
// TEMP: Cascade functions will be re-enabled after model/path/point modules are converted
```

This function provides a fluent, chainable API that improves code readability and reduces verbosity when performing multiple operations on the same object.

## Architectural Decision

**Primary API**: Functional composition (`pipe`, `compose`)  
**Legacy Support**: Modernized cascade (`$`)  

**Rationale**:
- **Pipe/Compose**: Pure functions, immutable, composable, tree-shakeable, modern FP approach
- **Cascade**: Backward compatibility for maker.js users during migration
- **Documentation**: Promote pipe/compose, show cascade as alternative

## User Stories

### PRIMARY API: Functional Composition

### US1: Pipe Left-to-Right Operations
**As a** library user  
**I want to** compose operations using `pipe()` that reads left-to-right  
**So that** I can write pure, functional transformation chains

**Acceptance Criteria**:
- Can import: `import { pipe } from 'photon/core'`
- Transforms execute in order: `pipe(value, fn1, fn2, fn3)`
- Works with model, path, and point operations
- Full TypeScript type inference through the chain
- No mutation of original objects

**Example**:
```typescript
import { pipe, model, models } from 'photon/core';

const square = pipe(
  new models.Square(10),
  model.center,
  model.rotate(45),
  model.moveRelative([0, 15])
);
```

### US2: Compose Right-to-Left Operations
**As a** library user  
**I want to** compose operations using `compose()` that reads right-to-left  
**So that** I can create reusable transformation functions

**Acceptance Criteria**:
- Can import: `import { compose } from 'photon/core'`
- Creates composable function: `const fn = compose(fn3, fn2, fn1)`
- Executes right-to-left: `fn(value)` === `fn1(fn2(fn3(value)))`
- Can be partially applied and reused
- Full TypeScript type inference

**Example**:
```typescript
import { compose, model } from 'photon/core';

const centerAndRotate = compose(
  model.rotate(45),
  model.center
);

const square1 = centerAndRotate(new models.Square(10));
const square2 = centerAndRotate(new models.Rectangle(20, 10));
```

### LEGACY API: Cascade Support

### US3: Model Cascade Operations (Legacy)
**As a** maker.js user migrating to photon/core  
**I want to** chain multiple model operations using `$(model)`  
**So that** I can migrate existing code with minimal changes

**Acceptance Criteria**:
- Can create a cascade container with `$(model)`
- Can chain model operations like `.center()`, `.rotate()`, `.moveRelative()`
- Can access the final result with `.$result`
- Can reset to initial state with `.$reset()`
- Can access initial value with `.$initial`
- Modernized with const/let/arrow functions
- Documentation shows it as legacy/alternative pattern

### US2: Path Cascade Operations  
**As a** library user  
**I want to** chain multiple path operations using `$(path)`  
**So that** I can manipulate paths fluently

**Acceptance Criteria**:
- Can create a cascade container with `$(path)`
- Can chain path operations like `.move()`, `.mirror()`, `.rotate()`
- Can use `.addTo(parent, id)` to add to a model during chaining
- Chained operations work correctly with path cloning (e.g., mirror)

### US3: Point Cascade Operations
**As a** library user  
**I want to** chain multiple point operations using `$(point)`  
**So that** I can transform points fluently

**Acceptance Criteria**:
- Can create a cascade container with `$(point)`
- Can chain point operations
- Container correctly handles point transformations

### US4: Modern ES6+ Export
**As a** library user  
**I want to** import the cascade function using modern syntax  
**So that** my code follows current JavaScript best practices

**Acceptance Criteria**:
- Can import as: `import { $ } from 'photon/core'`
- Function works with TypeScript type checking
- Proper type inference for cascaded operations
- Documentation updated to show modern import syntax

## Current State Analysis

### Source Code Status
**File**: `packages/photon/src/core/maker.ts`  
**Lines**: 710-717 (commented out)

```typescript
// TEMP: Cascade functions will be re-enabled after model/path/point modules are converted
// export function $(modelContext: IModel): ICascadeModel;
// export function $(pathContext: IModel): ICascadePath;
// export function $(pointContext: IPoint): ICascadePoint;
// export function $(context: any): ICascade {
//     if (isModel(context)) {
//         return new Cascade<IModel>(model, context);
//     } else if (isPath(context)) {
```

### Dependencies
- `ICascadeModel`, `ICascadePath`, `ICascadePoint` interfaces  
- `Cascade<T>` class implementation
- Type guards: `isModel()`, `isPath()`, `isPoint()`
- Module references: `model`, `path`, `point`

### Documentation Status
**File**: `docs-new/docs/snippets/$-function.md`  
**Status**: Already modernized with correct import syntax  
**Code Examples**: Ready and waiting for implementation

## Technical Requirements

### PRIMARY API: Pipe/Compose

### TR1: Pipe Implementation
- Generic pipe function with overloads for 1-10 arguments
- Full TypeScript type inference through the chain
- No mutations - each function returns new value
- Works with any function signature: `(input: A) => B`

### TR2: Compose Implementation  
- Generic compose function with overloads for 1-10 arguments
- Right-to-left execution order
- Reusable function composition
- Full TypeScript type inference

### TR3: Performance (Pipe/Compose)
- Zero runtime overhead vs manual function calls
- Tree-shakeable - unused functions don't increase bundle size
- No object allocation overhead
- Compatible with V8 optimizations

### LEGACY API: Cascade

### TR4: Modernized Cascade Implementation
- Refactor to use const/let instead of var
- Use arrow functions instead of function expressions
- Maintain ICascade interface compatibility
- Container operators (`$initial`, `$result`, `$reset`) work correctly

### TR5: TypeScript Type Safety (Cascade)
- Maintain full type safety for cascaded operations
- Proper type inference at each step of the chain
- Compile-time checking of valid operations

### TR6: Module Integration (Both APIs)
- Integrate with existing model, path, and point modules
- Ensure all operations work with both pipe and cascade
- No breaking changes to existing non-cascade APIs

### TR7: Export and Import (Both APIs)
- Export `pipe`, `compose` from `photon/core` (primary)
- Export `$` from `photon/core` (legacy)
- Proper TypeScript declaration files (`.d.ts`)
- Named exports work with ES6 imports

## Non-Goals

- **Not** changing the cascade API design (maintaining maker.js compatibility)
- **Not** adding new cascade operations beyond what existed in maker.js
- **Not** supporting cascade operations on arrays or collections (only single objects)

## Success Criteria

### Primary API (Pipe/Compose)

### SC1: Pipe Functionality
- `pipe()` correctly chains functions left-to-right
- Full TypeScript type inference works
- No runtime errors with model/path/point operations
- Zero mutations - original objects unchanged

### SC2: Compose Functionality
- `compose()` correctly chains functions right-to-left
- Creates reusable transformation functions
- Full TypeScript type inference works
- Composability with pipe

### SC3: Documentation (Pipe/Compose)
- New docs page: `docs-new/docs/snippets/functional-composition.md`
- Examples in getting-started guides
- Promoted as primary API pattern

### Legacy API (Cascade)

### SC4: Cascade Code Examples Execute
All code examples in `docs-new/docs/snippets/$-function.md` execute without errors

### SC5: Modernized Cascade
- Uses const/let instead of var
- Uses arrow functions
- No pre-ES6 patterns
- Maintains backward compatibility

### Both APIs

### SC6: Type Safety Verified
TypeScript compilation passes with no errors and proper type inference for both APIs

### SC7: Test Coverage
- Unit tests for pipe (15+ test cases)
- Unit tests for compose (15+ test cases)
- Unit tests for cascade (Model, Path, Point - 20+ test cases)
- Target: 100% coverage

### SC8: Performance Verified
- Pipe/compose: Same performance as manual calls
- Cascade: < 10% overhead vs direct calls
- No memory leaks in any API

## Implementation Notes

### Phase 1: Implement Pipe/Compose (Primary API)
1. Create `packages/photon/src/core/functional.ts`
2. Implement generic `pipe()` with TypeScript overloads (1-10 args)
3. Implement generic `compose()` with TypeScript overloads (1-10 args)
4. Add comprehensive unit tests
5. Create documentation: `docs-new/docs/snippets/functional-composition.md`

### Phase 2: Modernize Cascade (Legacy API)
1. Update `Cascade<T>` class in `maker.ts`:
   - Replace `var` with `const`/`let`
   - Replace `function` with arrow functions
   - Replace `arguments` with rest parameters
2. Uncomment and update the `$` function export
3. Verify TypeScript types and interfaces
4. Add "legacy" notes to documentation

### Phase 3: Module Integration & Testing
1. Test pipe/compose with model, path, point operations
2. Test cascade with model, path, point operations
3. Verify type inference works for both APIs
4. Add performance benchmarks
5. Update getting-started guides

### Phase 4: Documentation
1. Promote pipe/compose as primary pattern
2. Show cascade as legacy/alternative
3. Add migration examples (cascade → pipe)
4. Update API reference

### Known Issues to Address
- Original code references need verification (`new Cascade<IModel>(model, context)`)
- Type guards (`isModel`, `isPath`, `isPoint`) must be working
- Cascade-safe function lists must be up-to-date

## Open Questions - ANSWERED

1. **Q**: Are the `Cascade<T>` class and related interfaces already implemented in the codebase?  
   **A**: ✅ YES - Found in `packages/photon/src/core/maker.ts` (lines 682-708)
   - `Cascade<T>` class fully implemented
   - `ICascade`, `ICascadeModel`, `ICascadePath`, `ICascadePoint` interfaces in `cascades.ts`
   - Just needs modernization (var→const, function→arrow)

2. **Q**: Do we need to update the cascade-safe function lists for each module?  
   **A**: ⚠️  NEEDS REVIEW - Interfaces exist but are empty placeholders
   - May need to populate with actual cascade-safe operations
   - Or dynamic detection is used (current implementation)

3. **Q**: Are there any breaking changes in how model/path/point modules work that affect cascading?  
   **A**: ✅ NO BLOCKERS - All prerequisites met
   - `model.ts`, `path.ts`, `point.ts` modules exist and are converted
   - Type guards (`isModel`, `isPath`, `isPoint`) exist and work
   - Modules are ready for both pipe/compose and cascade

## Related Documentation

- **User Docs**: `docs-new/docs/snippets/$-function.md` (already modernized)
- **API Docs**: `/docs/api/index.md#_` (needs verification)
- **Interfaces**:
  - `docs/api/interfaces/makerjs.icascademodel.md`
  - `docs/api/interfaces/makerjs.icascadepath.md`
  - `docs/api/interfaces/makerjs.icascadepoint.md`

## Timeline

**Estimated Effort**: 1-2 days  
**Dependencies**: None (all prerequisite modules converted)  
**Risks**: Low (straightforward re-enable of existing code)

## Stakeholders

- **Documentation Team**: Docs already prepared
- **Library Users**: Feature parity with maker.js
- **TypeScript Users**: Type safety must be maintained
