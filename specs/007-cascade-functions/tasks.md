# Implementation Tasks: Functional Composition + Cascade APIs

**Feature**: 007 - Modern Functional Composition + Legacy Cascade Support  
**Status**: Ready for Implementation  
**Branch**: `007-functional-composition` (from `006-migration-from-jekyll`)  
**Estimated Time**: 2-3 days (16-24 hours)  
**Priority**: High

## Overview

This feature implements two complementary APIs for function composition:
1. **Primary (US1, US2)**: Modern functional composition (`pipe`, `compose`)
2. **Legacy (US3)**: Modernized cascade (`$`) with **Photon branding** (no makerjs references)

**Branch Strategy**: Branch from `006-migration-from-jekyll` (not main) since cascade functionality depends on the documentation migration being in place.

**Branding Requirements**: 
- ❌ Remove all "makerjs" references from cascade implementation
- ✅ Use "photon" or "photon/core" in all code/comments
- ✅ Update namespace references to use Photon branding

## Task Summary

- **Total Tasks**: 24
- **Completed**: 2/24
- **Setup**: 2 tasks (T001-T002)
- **Foundational**: 1 task (T003)
- **User Story 1 (pipe)**: 6 tasks (T004-T009)
- **User Story 2 (compose)**: 5 tasks (T010-T014)
- **User Story 3 (cascade)**: 8 tasks (T015-T022)
- **Polish & Integration**: 2 tasks (T023-T024)

**Parallel Opportunities**: 15+ tasks can run in parallel

**TDD Approach**: Tests written before implementation per Constitution Principle I

---

## Task Checklist

### Phase 1: Setup & Infrastructure

- [X] T001: Create Feature Branch from 006-migration-from-jekyll
- [X] T002: Verify Test Environment Setup

### Phase 2: Foundational Tasks

- [ ] T003: Create Functional Module File

### Phase 3: User Story 1 - Pipe Function

- [ ] T004: [US1] Write Pipe Function Tests [P]
- [ ] T005: [US1] Implement Pipe TypeScript Overloads
- [ ] T006: [US1] Implement Pipe Function Body
- [ ] T007: [US1] Export Pipe from Core Index [P]
- [ ] T008: [US1] Verify Pipe Integration Tests Pass [P]
- [ ] T009: [US1] Refactor Pipe Implementation (if needed)

### Phase 4: User Story 2 - Compose Function

- [ ] T010: [US2] Write Compose Function Tests [P]
- [ ] T011: [US2] Implement Compose TypeScript Overloads
- [ ] T012: [US2] Implement Compose Function Body
- [ ] T013: [US2] Export Compose from Core Index [P]
- [ ] T014: [US2] Verify Compose Tests Pass [P]

### Phase 5: User Story 3 - Cascade Modernization

- [ ] T015: [US3] Write Cascade Tests (Model/Path/Point) [P]
- [ ] T016: [US3] Modernize Cascade Class - Replace var with const/let
- [ ] T017: [US3] Modernize Cascade Class - Replace function with Arrow Functions
- [ ] T018: [US3] Modernize Cascade Class - Replace arguments with Rest Parameters
- [ ] T019: [US3] Remove makerjs Branding from Cascade Comments
- [ ] T020: [US3] Uncomment and Update Cascade Export Function
- [ ] T021: [US3] Export $ from Core Index [P]
- [ ] T022: [US3] Verify Cascade Tests Pass [P]

### Phase 6: Polish & Integration

- [ ] T023: [Polish] Update Documentation with Functional Composition Examples [P]
- [ ] T024: [Polish] Run Full Test Suite and Performance Benchmarks [P]

---

## Phase 1: Setup & Infrastructure

### T001: Create Feature Branch from 006-migration-from-jekyll [Setup] ✅

**Priority**: P0 (Must complete first)  
**Estimated Time**: 5 minutes  
**Dependencies**: None  
**Parallelizable**: No

**Description**: Create new feature branch from the documentation migration branch

**Actions**:
```bash
cd /Users/mykawhite/Documents/GitHub/photon
git checkout 006-migration-from-jekyll
git pull origin 006-migration-from-jekyll
git checkout -b 007-functional-composition
git push -u origin 007-functional-composition
```

**Acceptance Criteria**:
- ✅ Branch `007-functional-composition` created
- ✅ Based on latest `006-migration-from-jekyll`
- ✅ Branch pushed to remote

**Files**: None (git operation)

---

### T002: Verify Test Environment Setup [Setup] ✅

**Priority**: P0 (Blocking)  
**Estimated Time**: 15 minutes  
**Dependencies**: T001  
**Parallelizable**: No

**Description**: Ensure Mocha/testing environment is configured and working

**Actions**:
```bash
cd packages/photon
npm install
npm test
```

**Actual Setup** (differs from initial spec):
- **Test Framework**: Mocha (not Jest)
- **Test Directory**: `test/` (not `src/core/__tests__/`)
- **Test Pattern**: `*.spec.ts`, `*.spec.js`, `*.js` in test/
- **TypeScript Support**: ✅ Enabled via ts-node
- **Current Status**: 99 passing, 3 failing (naming issues from maker→photon rebrand)

**Acceptance Criteria**:
- ✅ `npm test` runs successfully
- ✅ TypeScript tests compile
- ✅ Can run tests: 99/102 tests passing
- ✅ Test environment ready for new tests

**Files Verified**: 
- `packages/photon/package.json`
- `packages/photon/test/` directory

**Note**: New tests will be created in `test/` directory using Mocha syntax (describe/it), not Jest syntax.

---

## Phase 2: Foundational Tasks

### T003: Create Functional Module File [Foundational]

**Priority**: P0 (Blocking for US1, US2)  
**Estimated Time**: 5 minutes  
**Dependencies**: T002  
**Parallelizable**: No

**Description**: Create the functional.ts module for pipe and compose

**File**: `packages/photon/src/core/functional.ts`

**Content**:
```typescript
/**
 * Functional composition utilities for photon/core
 * Provides pure, immutable function composition patterns
 * @module functional
 */

// Implementations will be added in subsequent tasks
// This file will export: pipe, compose
```

**Acceptance Criteria**:
- ✅ File created at correct location
- ✅ File compiles with TypeScript
- ✅ Module header with Photon branding

**Files Created**: `packages/photon/src/core/functional.ts`

**Checkpoint**: ✅ Infrastructure ready for US1 and US2 implementation

---

## Phase 3: User Story 1 - Pipe Function (PRIMARY API)

**Goal**: Implement left-to-right function composition utility

**Independent Test Criteria**:
- ✅ Can chain 2-10 functions left-to-right
- ✅ TypeScript type inference works through chain
- ✅ Works with model/path/point operations
- ✅ No mutation of original values

---

### T004: [US1] Write Pipe Function Tests [P]

**Priority**: P1 (TDD - Tests First)  
**Estimated Time**: 1.5 hours  
**Dependencies**: T003  
**Parallelizable**: Yes [P] (independent of implementation)

**Description**: Write comprehensive test suite for pipe function following TDD

**File**: `packages/photon/src/core/__tests__/functional.spec.ts`

**Test Cases** (from contract):
- TC-PIPE-001: Single function application
- TC-PIPE-002: Multiple functions left-to-right (2-10 functions)
- TC-PIPE-003: TypeScript type inference validation
- TC-PIPE-004: Immutability preservation
- TC-PIPE-005: Model operations integration
- TC-PIPE-006: Empty function list (identity)

**Content Template**:
```typescript
import { pipe } from '../functional';
import { model, models, paths } from '../index';

describe('pipe', () => {
  describe('Basic Functionality', () => {
    test('TC-PIPE-001: should apply single function', () => {
      const add5 = (x: number) => x + 5;
      expect(pipe(10, add5)).toBe(15);
    });
    
    test('TC-PIPE-002: should apply functions left-to-right', () => {
      const add5 = (x: number) => x + 5;
      const multiply2 = (x: number) => x * 2;
      const subtract3 = (x: number) => x - 3;
      
      // (10 + 5) * 2 - 3 = 27
      expect(pipe(10, add5, multiply2, subtract3)).toBe(27);
    });
    
    // ... additional test cases
  });
  
  describe('Integration with Photon', () => {
    test('TC-PIPE-005: should work with model operations', () => {
      const square = new models.Square(100);
      const result = pipe(
        square,
        model.center,
        model.rotate(45)
      );
      
      expect(result.origin).toEqual([-50, -50]);
    });
  });
});
```

**Acceptance Criteria**:
- ✅ All 6+ test cases written
- ✅ Tests fail (RED phase - pipe not yet implemented)
- ✅ TypeScript compiles with expected types
- ✅ Test file follows Jest conventions

**Files Created**: `packages/photon/src/core/__tests__/functional.spec.ts`

---

### T005: [US1] Implement Pipe TypeScript Overloads

**Priority**: P1  
**Estimated Time**: 1 hour  
**Dependencies**: T004 (tests written)  
**Parallelizable**: No (sequential with T006)

**Description**: Add TypeScript overload signatures for pipe (1-10 arguments)

**File**: `packages/photon/src/core/functional.ts`

**Implementation**:
```typescript
/**
 * Pipe value through functions left-to-right
 * @param value - Initial value
 * @param fns - Functions to apply in sequence
 * @returns Final result after all transformations
 */
export function pipe<T>(value: T): T;
export function pipe<T, A>(value: T, fn1: (x: T) => A): A;
export function pipe<T, A, B>(value: T, fn1: (x: T) => A, fn2: (x: A) => B): B;
export function pipe<T, A, B, C>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C
): C;
export function pipe<T, A, B, C, D>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C,
  fn4: (x: C) => D
): D;
export function pipe<T, A, B, C, D, E>(
  value: T,
  fn1: (x: T) => A,
  fn2: (x: A) => B,
  fn3: (x: B) => C,
  fn4: (x: C) => D,
  fn5: (x: D) => E
): E;
// Add overloads up to 10 functions
```

**Acceptance Criteria**:
- ✅ Overloads defined for 1-10 functions
- ✅ TypeScript compilation succeeds
- ✅ Type inference works in IDE

**Files Modified**: `packages/photon/src/core/functional.ts`

---

### T006: [US1] Implement Pipe Function Body

**Priority**: P1  
**Estimated Time**: 30 minutes  
**Dependencies**: T005  
**Parallelizable**: No

**Description**: Implement the pipe function body (GREEN phase)

**File**: `packages/photon/src/core/functional.ts`

**Implementation**:
```typescript
export function pipe(value: any, ...fns: Function[]): any {
  return fns.reduce((acc, fn) => fn(acc), value);
}
```

**Acceptance Criteria**:
- ✅ Implementation matches overload signatures
- ✅ Tests pass (GREEN phase)
- ✅ No mutations - pure function
- ✅ Works with 0-10 functions

**Files Modified**: `packages/photon/src/core/functional.ts`

---

### T007: [US1] Export Pipe from Core Index [P]

**Priority**: P1  
**Estimated Time**: 10 minutes  
**Dependencies**: T006  
**Parallelizable**: Yes [P] (different file than T006)

**Description**: Add pipe to photon/core public exports

**Find and modify**: Main export file (likely `packages/photon/src/core/index.ts` or similar)

**Add export**:
```typescript
export { pipe } from './functional.js';
```

**Acceptance Criteria**:
- ✅ Can import: `import { pipe } from 'photon/core'`
- ✅ TypeScript definitions exported
- ✅ Build succeeds

**Files Modified**: `packages/photon/src/core/index.ts` (or equivalent)

---

### T008: [US1] Verify Pipe Integration Tests Pass [P]

**Priority**: P1  
**Estimated Time**: 30 minutes  
**Dependencies**: T007  
**Parallelizable**: Yes [P] (verification task)

**Description**: Run integration tests with model/path/point modules

**Actions**:
```bash
cd packages/photon
npm test -- functional.spec.ts
npm test -- --coverage --collectCoverageFrom='src/core/functional.ts'
```

**Verify**:
- All TC-PIPE-* tests pass
- Integration with models.Square works
- Type inference working in tests
- Coverage >95% on pipe function

**Acceptance Criteria**:
- ✅ All pipe tests pass (GREEN)
- ✅ Coverage target met
- ✅ No TypeScript errors

**Files Verified**: Test suite execution

---

### T009: [US1] Refactor Pipe Implementation (if needed)

**Priority**: P1  
**Estimated Time**: 30 minutes  
**Dependencies**: T008  
**Parallelizable**: No

**Description**: Refactor for performance/readability (REFACTOR phase)

**Review**:
- Code clarity
- Performance (should be zero overhead)
- TypeScript types
- Documentation comments

**Potential Optimizations**:
```typescript
// Option: Early return for no functions
export function pipe(value: any, ...fns: Function[]): any {
  if (fns.length === 0) return value;
  return fns.reduce((acc, fn) => fn(acc), value);
}
```

**Acceptance Criteria**:
- ✅ All tests still pass after refactor
- ✅ Code is clean and well-documented
- ✅ Performance benchmarks met

**Files Modified**: `packages/photon/src/core/functional.ts`

**Checkpoint**: ✅ US1 Complete - Pipe function fully implemented and tested

---

## Phase 4: User Story 2 - Compose Function (PRIMARY API)

**Goal**: Implement right-to-left function composition utility

**Independent Test Criteria**:
- ✅ Creates reusable composed functions
- ✅ Executes right-to-left when called
- ✅ TypeScript type inference works
- ✅ Can be used with pipe

---

### T010: [US2] Write Compose Function Tests [P]

**Priority**: P1 (TDD - Tests First)  
**Estimated Time**: 1.5 hours  
**Dependencies**: T003  
**Parallelizable**: Yes [P] (independent of pipe, can run parallel with T004-T009)

**Description**: Write comprehensive test suite for compose function

**File**: `packages/photon/src/core/__tests__/functional.spec.ts` (append to existing)

**Test Cases** (from contract):
- TC-COMP-001: Single function composition
- TC-COMP-002: Multiple functions right-to-left
- TC-COMP-003: Function reusability
- TC-COMP-004: TypeScript type inference
- TC-COMP-005: Model operations integration
- TC-COMP-006: Composition with pipe

**Content**:
```typescript
describe('compose', () => {
  describe('Basic Functionality', () => {
    test('TC-COMP-001: should return equivalent function for single input', () => {
      const add5 = (x: number) => x + 5;
      const composed = compose(add5);
      
      expect(composed(10)).toBe(15);
    });
    
    test('TC-COMP-002: should compose functions right-to-left', () => {
      const add5 = (x: number) => x + 5;
      const multiply2 = (x: number) => x * 2;
      const subtract3 = (x: number) => x - 3;
      
      const composed = compose(subtract3, multiply2, add5);
      
      // Executes: add5(10) => multiply2(15) => subtract3(30) = 27
      expect(composed(10)).toBe(27);
    });
    
    test('TC-COMP-003: should be reusable', () => {
      const double = (x: number) => x * 2;
      const add10 = (x: number) => x + 10;
      const transform = compose(add10, double);
      
      expect(transform(5)).toBe(20);   // (5 * 2) + 10
      expect(transform(10)).toBe(30);  // (10 * 2) + 10
    });
  });
  
  describe('Integration with Photon', () => {
    test('TC-COMP-005: should work with model operations', () => {
      const centerAndRotate = compose(
        model.rotate(45),
        model.center
      );
      
      const square1 = centerAndRotate(new models.Square(100));
      const square2 = centerAndRotate(new models.Rectangle(200, 100));
      
      expect(square1.origin).toEqual([-50, -50]);
      expect(square2.origin).toEqual([-100, -50]);
    });
  });
});
```

**Acceptance Criteria**:
- ✅ All 6+ test cases written
- ✅ Tests fail (RED phase)
- ✅ TypeScript compiles
- ✅ Test file follows Jest conventions

**Files Modified**: `packages/photon/src/core/__tests__/functional.spec.ts`

---

### T011: [US2] Implement Compose TypeScript Overloads

**Priority**: P1  
**Estimated Time**: 1 hour  
**Dependencies**: T010 (tests written)  
**Parallelizable**: No (sequential with T012)

**Description**: Add TypeScript overload signatures for compose

**File**: `packages/photon/src/core/functional.ts`

**Implementation**:
```typescript
/**
 * Compose functions right-to-left
 * @param fns - Functions to compose (applied right-to-left)
 * @returns Composed function
 */
export function compose<A>(fn1: (x: A) => A): (x: A) => A;
export function compose<A, B>(fn2: (x: A) => B, fn1: (x: A) => A): (x: A) => B;
export function compose<A, B, C>(
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => C;
export function compose<A, B, C, D>(
  fn4: (x: C) => D,
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => D;
// Add overloads up to 10 functions
```

**Acceptance Criteria**:
- ✅ Overloads defined for 1-10 functions
- ✅ TypeScript compilation succeeds
- ✅ Type inference works for reusable functions

**Files Modified**: `packages/photon/src/core/functional.ts`

---

### T012: [US2] Implement Compose Function Body

**Priority**: P1  
**Estimated Time**: 30 minutes  
**Dependencies**: T011  
**Parallelizable**: No

**Description**: Implement compose function body (GREEN phase)

**File**: `packages/photon/src/core/functional.ts`

**Implementation**:
```typescript
export function compose<A>(...fns: Function[]): (x: A) => any {
  return (x: A) => fns.reduceRight((acc, fn) => fn(acc), x);
}
```

**Acceptance Criteria**:
- ✅ Implementation matches overload signatures
- ✅ Tests pass (GREEN phase)
- ✅ Returns reusable function
- ✅ Executes right-to-left

**Files Modified**: `packages/photon/src/core/functional.ts`

---

### T013: [US2] Export Compose from Core Index [P]

**Priority**: P1  
**Estimated Time**: 5 minutes  
**Dependencies**: T012  
**Parallelizable**: Yes [P] (different file)

**Description**: Add compose to photon/core public exports

**File**: `packages/photon/src/core/index.ts`

**Add export**:
```typescript
export { pipe, compose } from './functional.js';
```

**Acceptance Criteria**:
- ✅ Can import: `import { compose } from 'photon/core'`
- ✅ TypeScript definitions exported
- ✅ Build succeeds

**Files Modified**: `packages/photon/src/core/index.ts`

---

### T014: [US2] Verify Compose Tests Pass [P]

**Priority**: P1  
**Estimated Time**: 30 minutes  
**Dependencies**: T013  
**Parallelizable**: Yes [P] (verification)

**Description**: Run compose tests and verify integration

**Actions**:
```bash
cd packages/photon
npm test -- functional.spec.ts --testNamePattern="compose"
npm test -- --coverage
```

**Verify**:
- All TC-COMP-* tests pass
- Reusability demonstrated
- Works with pipe
- Coverage >95%

**Acceptance Criteria**:
- ✅ All compose tests pass
- ✅ Coverage target met
- ✅ Integration with pipe verified

**Files Verified**: Test execution

**Checkpoint**: US2 Complete - Compose function fully implemented and tested

---

## Phase 5: User Story 3 - Cascade Modernization (LEGACY API)

**Goal**: Modernize cascade implementation with ES6+ and **Photon branding**

**CRITICAL BRANDING REQUIREMENT**: Remove ALL "makerjs" references, use "photon" or "photon/core"

**Independent Test Criteria**:
- Cascade works with Model/Path/Point
- $initial, $result, $reset function correctly
- ES6+ only (no var/function/arguments)
- NO "makerjs" branding anywhere in code/comments

---

### T015: [US3] Write Cascade Tests (Model/Path/Point) [P]

**Priority**: P2 (TDD - Tests First)  
**Estimated Time**: 2 hours  
**Dependencies**: T003  
**Parallelizable**: Yes [P] (independent task)

**Description**: Write comprehensive test suite for cascade functionality

**File**: `packages/photon/src/core/__tests__/cascade.spec.ts` (NEW FILE)

**Test Cases** (from contract):
- Model cascade: TC-CASCADE-M-001 to M-005 (5 tests)
- Path cascade: TC-CASCADE-P-001 to P-003 (3 tests)
- Point cascade: TC-CASCADE-PT-001 to PT-002 (2 tests)
- Type detection: TC-CASCADE-T-001 to T-004 (4 tests)
- ES6+ verification: TC-MOD-001 to MOD-003 (3 tests)

**Content Template**:
```typescript
import { $, model, models, paths, point } from '../index';
import type { IModel, IPath, IPoint } from '../schema';

describe('Cascade API', () => {
  describe('Model Cascade', () => {
    test('TC-CASCADE-M-001: should chain model operations', () => {
      const square = new models.Square(100);
      const result = $(square)
        .center()
        .rotate(45)
        .$result;
      
      expect(result.origin).toEqual([-50, -50]);
    });
    
    test('TC-CASCADE-M-002: should preserve $initial', () => {
      const square = new models.Square(100);
      const container = $(square);
      
      container.center().rotate(45);
      
      expect(container.$initial).toEqual(square);
      expect(container.$initial).not.toBe(container.$result);
    });
    
    test('TC-CASCADE-M-003: should reset to initial state', () => {
      const square = new models.Square(100);
      const container = $(square);
      
      container.center().rotate(45);
      const transformed = container.$result;
      
      container.$reset();
      
      expect(container.$result).toEqual(container.$initial);
      expect(container.$result).not.toEqual(transformed);
    });
    
    // ... additional model tests
  });
  
  describe('Type Detection', () => {
    test('TC-CASCADE-T-001: should detect model type', () => {
      const model = new models.Square(100);
      const container = $(model);
      
      expect(container).toHaveProperty('$initial');
      expect(container).toHaveProperty('$result');
      expect(container).toHaveProperty('$reset');
    });
    
    test('TC-CASCADE-T-004: should throw error for invalid type', () => {
      const invalidObject = { foo: 'bar' };
      
      expect(() => $(invalidObject as any)).toThrow();
    });
  });
});
```

**Acceptance Criteria**:
- All 17+ test cases written
- Tests fail (RED phase)
- TypeScript compiles
- Tests use Photon imports (not makerjs)

**Files Created**: `packages/photon/src/core/__tests__/cascade.spec.ts`

---

### T016: [US3] Modernize Cascade Class - Replace var with const/let

**Priority**: P2  
**Estimated Time**: 30 minutes  
**Dependencies**: T015 (tests written)  
**Parallelizable**: No (sequential with T017-T018)

**Description**: Update Cascade class to use ES6+ const/let instead of var

**File**: `packages/photon/src/core/maker.ts` (lines 682-708)

**Changes**:
```typescript
// BEFORE (line 686)
for (var methodName in this._module) this._shadow(methodName);

// AFTER
for (const methodName in this._module) this._shadow(methodName);
```

**Acceptance Criteria**:
- No `var` declarations remain in Cascade class
- All replaced with `const` (or `let` if reassigned)
- TypeScript compiles
- Existing functionality preserved

**Files Modified**: `packages/photon/src/core/maker.ts`

---

### T017: [US3] Modernize Cascade Class - Replace function with Arrow Functions

**Priority**: P2  
**Estimated Time**: 30 minutes  
**Dependencies**: T016  
**Parallelizable**: No

**Description**: Update Cascade class to use arrow functions instead of function expressions

**File**: `packages/photon/src/core/maker.ts`

**Changes**:
```typescript
// BEFORE (lines 690-695)
private _shadow(methodName: string) {
    var _this = this;
    this[methodName] = function () {
        return _this._apply(_this._module[methodName], arguments);
    }
}

// AFTER
private _shadow(methodName: string) {
    this[methodName] = (...args: any[]) => {
        return this._apply(this._module[methodName], args);
    };
}
```

**Acceptance Criteria**:
- No `function` expressions remain in Cascade class
- Arrow functions used
- No need for `var _this` pattern
- TypeScript compiles

**Files Modified**: `packages/photon/src/core/maker.ts`

---

### T018: [US3] Modernize Cascade Class - Replace arguments with Rest Parameters

**Priority**: P2  
**Estimated Time**: 20 minutes  
**Dependencies**: T017  
**Parallelizable**: No

**Description**: Update _apply method to use rest parameters instead of arguments object

**File**: `packages/photon/src/core/maker.ts`

**Changes**:
```typescript
// BEFORE (lines 697-702)
private _apply(fn: Function, carriedArguments: IArguments) {
    var args = [].slice.call(carriedArguments);
    args.unshift(this.$result);
    this.$result = fn.apply(undefined, args);
    return this;
}

// AFTER
private _apply(fn: Function, carriedArgs: any[]) {
    const args = [this.$result, ...carriedArgs];
    this.$result = fn(...args);
    return this;
}
```

**Acceptance Criteria**:
- No `arguments` object used
- Rest parameters with spread operator
- Modern array handling
- TypeScript compiles

**Files Modified**: `packages/photon/src/core/maker.ts`

---

### T019: [US3] Remove makerjs Branding from Cascade Comments

**Priority**: P2 (CRITICAL for branding)  
**Estimated Time**: 15 minutes  
**Dependencies**: T018  
**Parallelizable**: No

**Description**: Replace all "makerjs" references with "photon" in Cascade class comments

**File**: `packages/photon/src/core/maker.ts`

**Search and Replace**:
- Find: "Maker.js", "maker.js", "makerjs"
- Replace with: "Photon", "photon", "photon/core"

**Example Changes**:
```typescript
// BEFORE
/**
 * Cascade container for Maker.js operations
 * Inspired by jQuery
 */

// AFTER
/**
 * Cascade container for Photon operations
 * Inspired by jQuery
 * @deprecated Use pipe/compose for new code
 */
```

**Acceptance Criteria**:
- NO "makerjs" text in Cascade class
- All comments use "Photon" branding
- Add deprecation note recommending pipe/compose
- TypeScript compiles

**Files Modified**: `packages/photon/src/core/maker.ts`

---

### T020: [US3] Uncomment and Update Cascade Export Function

**Priority**: P2  
**Estimated Time**: 30 minutes  
**Dependencies**: T019  
**Parallelizable**: No

**Description**: Uncomment $ export (lines 711-722) and update with Photon branding

**File**: `packages/photon/src/core/maker.ts`

**Changes**:
```typescript
// UNCOMMENT AND UPDATE (lines 711-722)
/**
 * Create cascade container for fluent API (LEGACY)
 * @deprecated Use pipe() or compose() for new code
 * @param context - Model, Path, or Point to wrap
 * @returns Cascade container with chainable operations
 */
export function $(modelContext: IModel): ICascadeModel;
export function $(pathContext: IPath): ICascadePath;
export function $(pointContext: IPoint): ICascadePoint;
export function $(context: any): ICascade {
    if (isModel(context)) {
        return new Cascade<IModel>(model, context);
    } else if (isPath(context)) {
        return new Cascade<IPath>(path, context);
    } else if (isPoint(context)) {
        return new Cascade<IPoint>(point, context);
    }
    throw new Error('Invalid context for Photon cascade function. Expected Model, Path, or Point.');
}
```

**Acceptance Criteria**:
- Function uncommented
- Deprecation notice added
- Error message uses "Photon" branding
- Type guards work correctly
- TypeScript compiles

**Files Modified**: `packages/photon/src/core/maker.ts`

---

### T021: [US3] Export $ from Core Index [P]

**Priority**: P2  
**Estimated Time**: 10 minutes  
**Dependencies**: T020  
**Parallelizable**: Yes [P] (different file)

**Description**: Add $ to photon/core public exports

**File**: `packages/photon/src/core/index.ts`

**Add export**:
```typescript
export { pipe, compose } from './functional.js';
export { $ } from './maker.js';
```

**Acceptance Criteria**:
- Can import: `import { $ } from 'photon/core'`
- TypeScript definitions exported
- Build succeeds
- No makerjs references in export

**Files Modified**: `packages/photon/src/core/index.ts`

---

### T022: [US3] Verify Cascade Tests Pass [P]

**Priority**: P2  
**Estimated Time**: 45 minutes  
**Dependencies**: T021  
**Parallelizable**: Yes [P] (verification)

**Description**: Run all cascade tests and verify modernization

**Actions**:
```bash
cd packages/photon
npm test -- cascade.spec.ts
npm test -- --coverage --collectCoverageFrom='src/core/maker.ts'
```

**Verify**:
- All TC-CASCADE-* tests pass
- All TC-MOD-* tests pass (ES6+ verification)
- Type detection working
- Coverage >95% on Cascade class
- NO makerjs references in code

**Manual Verification**:
```bash
# Search for any remaining makerjs references
grep -r "makerjs\|Maker\.js" packages/photon/src/core/maker.ts
# Should return: (no matches)
```

**Acceptance Criteria**:
- All cascade tests pass (GREEN)
- ES6+ verification tests pass
- No makerjs branding found
- Coverage target met

**Files Verified**: Test suite + manual brand check

**Checkpoint**: US3 Complete - Cascade modernized with Photon branding

---

## Phase 6: Polish & Integration

**Goal**: Documentation, performance verification, and final integration

---

### T023: [Polish] Update Documentation with Functional Composition Examples [P]

**Priority**: P3  
**Estimated Time**: 1.5 hours  
**Dependencies**: T009, T014 (pipe/compose complete)  
**Parallelizable**: Yes [P] (documentation task)

**Description**: Create new documentation page for pipe/compose and update cascade docs

**Files to Create/Modify**:

**1. Create**: `docs-new/docs/snippets/functional-composition.md`
```markdown
---
title: Functional Composition
---

# Functional Composition in Photon

Modern way to chain operations using pure functions.

## Pipe (Left-to-Right)

\`\`\`javascript
import { pipe, model, models } from 'photon/core';

const square = pipe(
  new models.Square(10),
  model.center,
  model.rotate(45),
  model.moveRelative([0, 15])
);
\`\`\`

## Compose (Reusable Transformations)

\`\`\`javascript
import { compose, model, models } from 'photon/core';

const centerAndRotate = compose(
  model.rotate(45),
  model.center
);

const square1 = centerAndRotate(new models.Square(10));
const square2 = centerAndRotate(new models.Rectangle(20, 10));
\`\`\`

## Why Use Pipe/Compose?

- **Pure Functions**: No side effects, predictable behavior
- **Immutable**: Original objects unchanged
- **Reusable**: Create transformation pipelines
- **Type-Safe**: Full TypeScript inference
- **Performance**: Zero overhead

## Migration from Cascade

\`\`\`javascript
// Old (cascade)
const result = $(model).center().rotate(45).$result;

// New (pipe - recommended)
const result = pipe(model, model.center, model.rotate(45));
\`\`\`
```

**2. Update**: `docs-new/docs/snippets/$-function.md`

Add at top:
```markdown
!!! note "Legacy API"
    The cascade (`$`) function is a legacy API provided for backward compatibility with maker.js.
    
    **For new code, use [functional composition](functional-composition.md) instead:**
    - `pipe()` for left-to-right operations
    - `compose()` for reusable transformations
    
    Cascade will continue to work but is no longer the recommended approach.
```

**Acceptance Criteria**:
- New functional-composition.md page created
- Cascade docs updated with legacy notice
- All code examples use Photon imports (no makerjs)
- Migration examples provided

**Files Created**: `docs-new/docs/snippets/functional-composition.md`  
**Files Modified**: `docs-new/docs/snippets/$-function.md`

---

### T024: [Polish] Run Full Test Suite and Performance Benchmarks [P]

**Priority**: P3  
**Estimated Time**: 1 hour  
**Dependencies**: T022 (all features complete)  
**Parallelizable**: Yes [P] (verification task)

**Description**: Run complete test suite, verify coverage, and check performance

**Actions**:
```bash
cd packages/photon

# Run all tests
npm test

# Check coverage
npm test -- --coverage

# Verify specific coverage targets
npm test -- --coverage --collectCoverageFrom='src/core/functional.ts'
npm test -- --coverage --collectCoverageFrom='src/core/maker.ts'

# Build package
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

**Performance Benchmarks**:
```bash
# Create benchmark script if needed
# Verify pipe/compose have <5% overhead vs manual calls
# Verify cascade has <10% overhead vs direct calls
```

**Acceptance Criteria**:
- All 50+ tests pass
- Coverage >95% on functional.ts
- Coverage >95% on Cascade class in maker.ts
- TypeScript compilation successful
- No linting errors
- Build succeeds
- Performance benchmarks met

**Final Verification Checklist**:
- Can import: `import { pipe, compose, $ } from 'photon/core'`
- NO makerjs references in cascade code
- All cascade comments use "Photon" branding
- Deprecation notices in place
- Documentation updated

**Files Verified**: Complete test suite + build artifacts

**Final Checkpoint**: US3 Complete - Cascade modernized with Photon branding

---

## Dependencies & Execution Order

### Critical Path (Sequential)

```
T001 (Branch) → T002 (Verify Tests) → T003 (Create functional.ts)
                                           ↓
                     ┌─────────────────────┴────────────────────┐
                     ↓                                          ↓
              US1: Pipe Tasks                            US2: Compose Tasks
              T004 → T005 → T006 → T007 → T008 → T009    T010 → T011 → T012 → T013 → T014
                     ↓                                          ↓
                     └─────────────────────┬────────────────────┘
                                           ↓
                                    US3: Cascade Tasks
                          T015 → T016 → T017 → T018 → T019 → T020 → T021 → T022
                                           ↓
                                    Polish & Integration
                                      T023 [P]  T024 [P]
```

### User Story Completion Order

1. **Phase 1-2**: Setup & Foundational (T001-T003) - ~25 minutes
2. **Phase 3**: US1 - Pipe (T004-T009) - ~4.5 hours
3. **Phase 4**: US2 - Compose (T010-T014) - ~3.5 hours
4. **Phase 5**: US3 - Cascade (T015-T022) - ~5 hours
5. **Phase 6**: Polish (T023-T024) - ~2.5 hours

**Total Sequential Time**: ~16 hours (2 days)

### Parallel Execution Opportunities

**Batch 1** (After T003):
- T004 [US1 Tests] - 1.5h
- T010 [US2 Tests] - 1.5h (can run parallel)
- T015 [US3 Tests] - 2h (can run parallel)

**Batch 2** (After T006):
- T007 [US1 Export] - 10min
- T008 [US1 Verify] - 30min

**Batch 3** (After T012):
- T013 [US2 Export] - 5min
- T014 [US2 Verify] - 30min

**Batch 4** (After T020):
- T021 [US3 Export] - 10min
- T022 [US3 Verify] - 45min

**Batch 5** (After T022):
- T023 [Documentation] - 1.5h
- T024 [Final Tests] - 1h

**Optimized Parallel Time**: ~12 hours (1.5 days)

---

## Parallel Execution Examples

### Example 1: Test Writing Phase (After T003)

```bash
# Terminal 1: Write pipe tests
cd packages/photon
# Work on src/core/__tests__/functional.spec.ts (pipe tests)

# Terminal 2: Write compose tests (parallel)
cd packages/photon
# Work on src/core/__tests__/functional.spec.ts (compose tests)

# Terminal 3: Write cascade tests (parallel)
cd packages/photon
# Work on src/core/__tests__/cascade.spec.ts
```

**Time Saved**: 2 hours (5 hours total vs 3 hours parallel)

### Example 2: Verification Phase (After implementations)

```bash
# Terminal 1: Verify pipe
npm test -- functional.spec.ts --testNamePattern="pipe"

# Terminal 2: Verify compose
npm test -- functional.spec.ts --testNamePattern="compose"

# Terminal 3: Verify cascade
npm test -- cascade.spec.ts
```

**Time Saved**: 1 hour

---

## Implementation Strategy

### MVP Approach (Minimum Viable Product)

**MVP = User Story 1 Only** (Pipe function)
- Tasks: T001-T009
- Time: ~5 hours
- Deliverable: Basic functional composition working

**Why This Works**:
- Pipe is the most essential feature
- Demonstrates the pattern for compose
- Can ship value early
- Reduces risk

### Incremental Delivery Plan

**Sprint 1** (Day 1 Morning): US1 - Pipe
- T001-T009
- Demo: Basic pipe working with models

**Sprint 2** (Day 1 Afternoon): US2 - Compose
- T010-T014
- Demo: Reusable transformations

**Sprint 3** (Day 2 Morning): US3 - Cascade
- T015-T022
- Demo: Legacy compatibility + Photon branding

**Sprint 4** (Day 2 Afternoon): Polish
- T023-T024
- Demo: Complete feature ready for PR

### Testing Strategy

**TDD Workflow** (Per User Story):
1. Write tests first (RED phase)
2. Run tests - verify they fail
3. Implement feature (GREEN phase)
4. Run tests - verify they pass
5. Refactor (REFACTOR phase)
6. Run tests - verify still passing

**Coverage Targets**:
- functional.ts: 100% coverage
- Cascade class: >95% coverage
- Integration tests: All user scenarios

---

## File Modification Summary

### New Files Created (3)
- `packages/photon/src/core/functional.ts` - Pipe & compose implementation
- `packages/photon/src/core/__tests__/functional.spec.ts` - Pipe & compose tests
- `packages/photon/src/core/__tests__/cascade.spec.ts` - Cascade tests
- `docs-new/docs/snippets/functional-composition.md` - New documentation

### Files Modified (3)
- `packages/photon/src/core/maker.ts` - Modernize Cascade class, uncomment $
- `packages/photon/src/core/index.ts` - Add exports for pipe, compose, $
- `docs-new/docs/snippets/$-function.md` - Add legacy notice

### Critical Branding Changes
- ALL "makerjs" references removed from Cascade code
- Error messages use "Photon" branding
- Comments updated to "Photon" terminology
- Deprecation notices added recommending pipe/compose

---

## Success Criteria Checklist

### Functionality
- Pipe chains 2-10 functions left-to-right
- Compose creates reusable transformations
- Cascade works with Model/Path/Point
- All container operators ($initial, $result, $reset) work
- Type detection accurate

### Code Quality
- ES6+ only (no var/function/arguments)
- TypeScript compiles with --strict
- All tests pass (50+ tests)
- Coverage >95%
- No ESLint warnings

### Branding
- NO "makerjs" references in cascade code
- All comments use "Photon" branding
- Error messages say "Photon"
- Deprecation notices in place

### Documentation
- functional-composition.md created
- $-function.md updated with legacy notice
- All code examples use Photon imports (no makerjs)
- Migration examples provided

### Integration
- Works with existing model/path/point modules
- Pipe equivalent to cascade for same operations
- No breaking changes
- Backward compatible

---

## Notes

**Branch Strategy**: Branch from `006-migration-from-jekyll` to ensure cascade has access to migrated documentation.

**Estimated Completion**: 2-3 days (16-24 hours)
- Best case: 12 hours (optimized parallel execution)
- Expected: 16 hours (some sequential dependencies)
- Worst case: 24 hours (issues discovered)

**Risk Mitigation**:
- TDD approach catches issues early
- Incremental delivery allows early demos
- Parallel tasks reduce timeline
- Good test coverage ensures quality

**Next Steps After Completion**:
1. Create PR to merge `007-functional-composition` into `006-migration-from-jekyll`
2. Request code review
3. Address feedback
4. Merge to base branch
5. Update CHANGELOG.md
6. Prepare for eventual merge to main

---

**End of Tasks Document**
