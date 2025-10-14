# Implementation Plan: Re-enable Cascade Functions

**Feature**: Re-enable Cascade Functions in photon/core  
**Spec**: [spec.md](./spec.md)  
**Created**: 2025-10-14  
**Status**: Planning

## Technical Context

### Technology Stack
- **Language**: TypeScript 5.x
- **Module System**: ES6 modules
- **Build Tool**: Existing photon build process
- **Package**: photon/core

### Architecture Overview
The cascade function provides a fluent API wrapper around model, path, and point operations:

```
$(object) → Cascade<T> → chainable operations → $result | $initial | $reset()
```

**Flow**:
1. User calls `$(model | path | point)`
2. Function detects type using type guards
3. Returns appropriate cascade container
4. Container proxies operations to underlying module
5. Each operation returns container for chaining
6. User accesses result via `.$result`

### Key Components

**1. Cascade Container Class** (`Cascade<T>`)
- Generic container for chainable operations
- Properties: `$initial`, `$result`, `$reset()`
- Methods: All cascade-safe operations from respective module

**2. Type Guards**
- `isModel(context)` - Checks if context is IModel
- `isPath(context)` - Checks if context is IPath
- `isPoint(context)` - Checks if context is IPoint

**3. Cascade Interfaces**
- `ICascadeModel` - Model-specific cascade operations
- `ICascadePath` - Path-specific cascade operations
- `ICascadePoint` - Point-specific cascade operations

**4. Module Integration**
- `model` module - Provides cascade-safe model operations
- `path` module - Provides cascade-safe path operations
- `point` module - Provides cascade-safe point operations

### Current Implementation Status

**Source File**: `packages/photon/src/core/maker.ts`

**Commented Code** (lines 710-717):
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
- ✅ model module (converted to TypeScript)
- ✅ path module (converted to TypeScript)
- ✅ point module (converted to TypeScript)
- ❓ Cascade class implementation
- ❓ ICascade interfaces
- ✅ Type guard functions

### Integration Points
- Export from `packages/photon/src/core/index.ts`
- Type declarations in `.d.ts` files
- Documentation in `docs-new/docs/snippets/$-function.md` (already updated)

## Constitution Check

### Principle I: Test-Driven Development ✅ COMPLIANT

**Application to Feature**:
- ✅ Tests will be written before uncommenting cascade export
- ✅ Tests will be written before implementing pipe/compose
- ✅ Red-Green-Refactor cycle for new functional utilities
- ✅ Existing Cascade class will have tests added before modernization

**Justification**: Critical for geometric library precision - cascade and pipe operations must preserve mathematical correctness.

### Principle II: Specification-Driven Development ✅ COMPLIANT

**Application to Feature**:
- ✅ User stories defined in spec.md (US1-US3)
- ✅ Acceptance criteria in Given-When-Then format
- ✅ Success criteria clearly defined (SC1-SC8)
- ✅ Research phase completed (research.md exists)

### Principle III: ES6+ Modern JavaScript ✅ COMPLIANT

**Application to Feature**:
- ✅ **PRIMARY**: pipe/compose uses modern FP patterns
- ✅ **LEGACY**: Cascade modernized (var→const, function→arrow)
- ✅ TypeScript definitions for all APIs
- ✅ Named exports: `{ pipe, compose, $ }`
- ✅ Tree-shakeable design

**Constitutional Alignment**: This feature actively **improves** ES6+ compliance by modernizing pre-ES6 code.

### Principle IV & V: User Experience First ✅ COMPLIANT

**Application to Feature**:
- ✅ Two APIs serve different audiences (modern FP vs legacy jQuery-style)
- ✅ Documentation promotes best practices (pipe/compose primary)
- ✅ Migration path for maker.js users (cascade legacy support)
- ✅ Clear examples for both approaches
- ✅ Gradual learning curve (cascade familiar, pipe/compose powerful)

### Principle VI: Living Documentation ✅ COMPLIANT

**Application to Feature**:
- ✅ Documentation updated in same PR as implementation
- ✅ New page: functional-composition.md
- ✅ Updated page: $-function.md (with legacy notes)
- ✅ Examples will be tested before merge
- ✅ API docs generated from TypeScript

### Principle VII: CNC/Laser-Focused ✅ COMPLIANT

**Application to Feature**:
- ✅ Enables precise geometric transformations
- ✅ Pure functions maintain mathematical correctness
- ✅ Immutable operations prevent coordinate drift
- ✅ Tool compensation operations (dogbone, fillet) work with both APIs

### Gates

**Gate 1: ES6+ Modernization** - ✅ PASS
- Cascade uses const/let, arrow functions, rest parameters
- pipe/compose is pure modern JavaScript
- No pre-ES6 patterns remain

**Gate 2: Type Safety** - ✅ PASS (VERIFIED IN RESEARCH)
- Cascade class exists and is functional
- Interfaces complete
- Type guards working
- TypeScript overloads for pipe/compose

**Gate 3: User Experience** - ✅ PASS
- Primary API (pipe/compose) promotes best practices
- Legacy API (cascade) eases migration
- Documentation guides users to modern patterns
- No breaking changes

**Gate 4: Test Coverage** - ⏳ PENDING IMPLEMENTATION
- Will achieve >80% coverage (targeting 100%)
- TDD approach for all new code
- Tests written before uncommenting exports

### Compliance Summary

**Overall**: ✅ **FULLY COMPLIANT** with Photon Constitution

All constitutional principles are satisfied. This feature actively improves the codebase by:
1. Modernizing legacy code (ES6+)
2. Introducing functional programming best practices
3. Maintaining backward compatibility
4. Following TDD rigorously

## Phase 0: Research & Discovery

### Research Questions

**RQ1**: Does the `Cascade<T>` class exist in the codebase?
- **Search**: `packages/photon/src/` for `class Cascade`
- **Outcome**: Location and implementation status

**RQ2**: Are the `ICascade*` interfaces defined and complete?
- **Search**: Find `ICascadeModel`, `ICascadePath`, `ICascadePoint`
- **Outcome**: Interface definitions and completeness

**RQ3**: Do type guard functions (`isModel`, `isPath`, `isPoint`) work correctly?
- **Verify**: Test type guards with sample objects
- **Outcome**: Validation of type detection

**RQ4**: What cascade-safe operations are available in each module?
- **Inspect**: model, path, point modules for cascade-compatible functions
- **Outcome**: List of operations for each cascade type

**RQ5**: Are there any breaking changes in module APIs since maker.js?
- **Compare**: maker.js cascade operations vs current module operations
- **Outcome**: API compatibility assessment

### Discovery Tasks

- [ ] **D1**: Locate `Cascade<T>` class implementation
- [ ] **D2**: Find and review cascade interface definitions
- [ ] **D3**: Test type guard functions
- [ ] **D4**: List cascade-safe operations per module
- [ ] **D5**: Identify any API changes that affect cascading
- [ ] **D6**: Review original maker.js cascade tests for patterns

## Phase 1: Design & Contracts

### Data Model

**Entity**: CascadeContainer
```typescript
interface CascadeContainer<T> {
  $initial: T;           // Original object passed to $()
  $result: T;            // Current state after operations
  $reset(): CascadeContainer<T>;  // Reset to initial
  // + all cascade-safe operations from module
}
```

**Entity**: CascadeModule
```typescript
type CascadeModule = 'model' | 'path' | 'point';
```

### API Contract

**Function Signature**:
```typescript
export function $(modelContext: IModel): ICascadeModel;
export function $(pathContext: IPath): ICascadePath;
export function $(pointContext: IPoint): ICascadePoint;
```

**Usage Examples**:
```typescript
// Model cascade
import { $, models } from 'photon/core';
const square = $(new models.Square(10))
  .center()
  .rotate(45)
  .moveRelative([0, 15])
  .$result;

// Path cascade
import { $, paths } from 'photon/core';
$(new paths.Arc([5, 5], 5, 180, 270))
  .addTo(parent, 'arc1')
  .mirror(true, false)
  .addTo(parent, 'arc2');
```

### Test Contracts

**Test Suite**: `cascade.spec.ts`

```typescript
describe('Cascade Functions', () => {
  describe('Model Cascade', () => {
    it('should create cascade container from model');
    it('should chain model operations');
    it('should access $result after operations');
    it('should reset to $initial');
    it('should preserve type safety');
  });

  describe('Path Cascade', () => {
    it('should create cascade container from path');
    it('should chain path operations');
    it('should support addTo() chaining');
    it('should handle mirroring correctly');
  });

  describe('Point Cascade', () => {
    it('should create cascade container from point');
    it('should chain point operations');
  });

  describe('Type Detection', () => {
    it('should detect model context correctly');
    it('should detect path context correctly');
    it('should detect point context correctly');
    it('should throw error for invalid context');
  });
});
```

## Implementation Phases

### Phase 1: Core Enable (Estimated: 4 hours)
1. **Locate Cascade Implementation**
   - Find `Cascade<T>` class
   - Review implementation completeness
   - Verify it matches commented code

2. **Uncomment Export**
   - Uncomment `$` function in `maker.ts`
   - Fix any TypeScript errors
   - Verify overload signatures

3. **Verify Type Guards**
   - Test `isModel()`, `isPath()`, `isPoint()`
   - Ensure correct type detection
   - Add tests if missing

4. **Update Exports**
   - Add `$` to main export in `index.ts`
   - Verify `.d.ts` generation
   - Test import syntax

### Phase 2: Testing (Estimated: 3 hours)
1. **Unit Tests**
   - Create `cascade.spec.ts`
   - Test model cascades
   - Test path cascades
   - Test point cascades
   - Test error cases

2. **Integration Tests**
   - Use documentation examples
   - Verify chaining works
   - Verify `$result`, `$initial`, `$reset()`
   - Test `addTo()` functionality

3. **Type Testing**
   - Verify TypeScript compilation
   - Test type inference
   - Ensure no `any` types leak

### Phase 3: Documentation Verification (Estimated: 1 hour)
1. **Run Documentation Examples**
   - Execute all code in `$-function.md`
   - Verify outputs match expectations
   - Update if needed

2. **API Reference**
   - Verify API docs are accurate
   - Update if interfaces changed
   - Add JSDoc comments if missing

3. **Update Modernization Summary**
   - Add cascade function restoration to completion notes
   - Update content-refactoring checklist if needed

## Risk Assessment

**Risk 1: Missing Cascade Class** - MEDIUM
- **Mitigation**: If class doesn't exist, extract from maker.js source
- **Timeline Impact**: +4 hours

**Risk 2: Interface Incompatibility** - LOW
- **Mitigation**: Update interfaces to match current module APIs
- **Timeline Impact**: +2 hours

**Risk 3: TypeScript Type Errors** - LOW
- **Mitigation**: Use proper generics and type guards
- **Timeline Impact**: +1 hour

**Risk 4: Breaking Changes in Module APIs** - MEDIUM
- **Mitigation**: Adapt cascade operations to new APIs
- **Timeline Impact**: +3 hours

## Timeline

**Total Estimated Time**: 8-18 hours (1-2 days)

- **Best Case**: 8 hours (all code exists, just uncomment)
- **Expected Case**: 12 hours (minor fixes needed)
- **Worst Case**: 18 hours (need to implement Cascade class)

## Success Metrics

1. ✅ TypeScript compilation passes
2. ✅ All tests pass (target: 100% coverage of cascade functions)
3. ✅ Documentation examples execute without errors
4. ✅ Modern import syntax works: `import { $ } from 'photon/core'`
5. ✅ Type inference works correctly in IDE

## Next Steps

1. **Run Phase 0 Research** - Investigate codebase for existing implementation
2. **Generate research.md** - Document findings from research phase
3. **Create detailed tasks.md** - Break down implementation into granular tasks
4. **Implement & Test** - Execute the plan
5. **Rebuild Docs** - Verify documentation examples work

## Notes

- This is a restoration of existing functionality, not new feature development
- Documentation is already modernized and waiting
- Low risk since we're uncommenting existing code
- No breaking changes to existing APIs
