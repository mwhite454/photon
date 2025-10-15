# Test Contract: Functional API (pipe & compose)

**Feature**: 007 - Functional Composition  
**Test Suite**: `functional.spec.ts`  
**Status**: Contract Defined - Tests Pending Implementation

## Test Organization

```
describe('Functional API', () => {
  describe('pipe', () => {
    // Pipe tests
  });
  
  describe('compose', () => {
    // Compose tests
  });
  
  describe('Integration', () => {
    // Integration with model/path/point
  });
});
```

## Pipe Function Tests

### TC-PIPE-001: Single Function Application
**Given** a value and a single transformation function  
**When** pipe is called with the value and function  
**Then** the function is applied to the value and result is returned

```typescript
test('should apply single function', () => {
  const add5 = (x: number) => x + 5;
  expect(pipe(10, add5)).toBe(15);
});
```

### TC-PIPE-002: Multiple Functions Left-to-Right
**Given** a value and three transformation functions  
**When** pipe is called with value and functions in order  
**Then** functions execute left-to-right and final result is returned

```typescript
test('should apply functions left-to-right', () => {
  const add5 = (x: number) => x + 5;
  const multiply2 = (x: number) => x * 2;
  const subtract3 = (x: number) => x - 3;
  
  // (10 + 5) * 2 - 3 = 27
  expect(pipe(10, add5, multiply2, subtract3)).toBe(27);
});
```

### TC-PIPE-003: TypeScript Type Inference
**Given** functions with different input/output types  
**When** pipe is used in TypeScript  
**Then** types are correctly inferred through the chain

```typescript
test('should infer types correctly', () => {
  const numToString = (x: number) => x.toString();
  const stringLength = (s: string) => s.length;
  
  const result: number = pipe(42, numToString, stringLength);
  expect(result).toBe(2);
});
```

### TC-PIPE-004: Immutability Preservation
**Given** an object and mutation-free transformations  
**When** pipe is used to transform the object  
**Then** original object is not modified

```typescript
test('should not mutate original value', () => {
  const original = { x: 10, y: 20 };
  const addZ = (obj: any) => ({ ...obj, z: 30 });
  
  const result = pipe(original, addZ);
  
  expect(original).toEqual({ x: 10, y: 20 });
  expect(result).toEqual({ x: 10, y: 20, z: 30 });
});
```

### TC-PIPE-005: Model Operations Integration
**Given** a photon model and model operations  
**When** pipe chains multiple model transformations  
**Then** model is correctly transformed

```typescript
test('should work with model operations', () => {
  const square = new models.Square(100);
  const result = pipe(
    square,
    model.center,
    model.rotate(45)
  );
  
  expect(result.origin).toEqual([-50, -50]);
  // Verify rotation applied
});
```

### TC-PIPE-006: Empty Function List
**Given** only a value with no functions  
**When** pipe is called  
**Then** the value is returned unchanged

```typescript
test('should return value when no functions provided', () => {
  expect(pipe(42)).toBe(42);
});
```

## Compose Function Tests

### TC-COMP-001: Single Function Composition
**Given** a single function  
**When** compose is called  
**Then** returns function equivalent to input function

```typescript
test('should return equivalent function for single input', () => {
  const add5 = (x: number) => x + 5;
  const composed = compose(add5);
  
  expect(composed(10)).toBe(15);
});
```

### TC-COMP-002: Multiple Functions Right-to-Left
**Given** three functions  
**When** compose is called with functions in order  
**Then** returns function that executes right-to-left

```typescript
test('should compose functions right-to-left', () => {
  const add5 = (x: number) => x + 5;
  const multiply2 = (x: number) => x * 2;
  const subtract3 = (x: number) => x - 3;
  
  const composed = compose(subtract3, multiply2, add5);
  
  // Executes: add5(10) => multiply2(15) => subtract3(30) = 27
  expect(composed(10)).toBe(27);
});
```

### TC-COMP-003: Function Reusability
**Given** a composed function  
**When** the function is called multiple times with different inputs  
**Then** each call produces correct independent result

```typescript
test('should be reusable', () => {
  const double = (x: number) => x * 2;
  const add10 = (x: number) => x + 10;
  const transform = compose(add10, double);
  
  expect(transform(5)).toBe(20);   // (5 * 2) + 10
  expect(transform(10)).toBe(30);  // (10 * 2) + 10
  expect(transform(0)).toBe(10);   // (0 * 2) + 10
});
```

### TC-COMP-004: TypeScript Type Inference
**Given** functions with different input/output types  
**When** compose is used in TypeScript  
**Then** types are correctly inferred

```typescript
test('should infer types correctly', () => {
  const stringLength = (s: string) => s.length;
  const numToString = (x: number) => x.toString();
  
  const transform = compose(stringLength, numToString);
  
  const result: number = transform(42);
  expect(result).toBe(2);
});
```

### TC-COMP-005: Model Operations Integration
**Given** model transformation functions  
**When** compose creates reusable transformation  
**Then** transformation works with multiple models

```typescript
test('should work with model operations', () => {
  const centerAndRotate = compose(
    model.rotate(45),
    model.center
  );
  
  const square1 = centerAndRotate(new models.Square(100));
  const square2 = centerAndRotate(new models.Rectangle(200, 100));
  
  // Both should be centered and rotated
  expect(square1.origin).toEqual([-50, -50]);
  expect(square2.origin).toEqual([-100, -50]);
});
```

### TC-COMP-006: Composition with Pipe
**Given** both compose and pipe  
**When** using them together  
**Then** they work compatibly

```typescript
test('should work with pipe', () => {
  const double = (x: number) => x * 2;
  const add10 = (x: number) => x + 10;
  const square = (x: number) => x * x;
  
  const transform = compose(square, add10);
  
  const result = pipe(5, double, transform);
  // 5 * 2 = 10, then (10 + 10)^2 = 400
  expect(result).toBe(400);
});
```

## Performance Tests

### TC-PERF-001: Pipe Performance
**Given** pipe with 10 simple functions  
**When** executed 1000 times  
**Then** performance is comparable to manual chaining (< 5% overhead)

```typescript
test('should have minimal overhead', () => {
  const fns = Array(10).fill(null).map((_, i) => (x: number) => x + i);
  
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    pipe(0, ...fns);
  }
  const pipeTime = performance.now() - start;
  
  const manualStart = performance.now();
  for (let i = 0; i < 1000; i++) {
    let result = 0;
    for (let j = 0; j < 10; j++) result = result + j;
  }
  const manualTime = performance.now() - manualStart;
  
  expect(pipeTime / manualTime).toBeLessThan(1.05); // <5% overhead
});
```

### TC-PERF-002: Compose Performance
**Given** composed function with 10 operations  
**When** executed 1000 times  
**Then** performance is identical to manually composed function

```typescript
test('should have zero overhead after composition', () => {
  const fns = Array(10).fill(null).map((_, i) => (x: number) => x + i);
  const composed = compose(...fns.reverse());
  
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    composed(0);
  }
  const composedTime = performance.now() - start;
  
  expect(composedTime).toBeLessThan(10); // Should be fast
});
```

## Edge Cases

### TC-EDGE-001: No Arguments to Compose
**Given** compose called with no arguments  
**When** trying to create composition  
**Then** returns identity function or throws meaningful error

```typescript
test('should handle no arguments gracefully', () => {
  const identity = compose();
  expect(identity(42)).toBe(42);
});
```

### TC-EDGE-002: Undefined/Null Handling
**Given** pipe with undefined or null value  
**When** piping through functions  
**Then** functions receive the actual value

```typescript
test('should handle undefined and null', () => {
  const isNull = (x: any) => x === null;
  const isUndefined = (x: any) => x === undefined;
  
  expect(pipe(null, isNull)).toBe(true);
  expect(pipe(undefined, isUndefined)).toBe(true);
});
```

## Test Coverage Requirements

- **Target**: 100% line and branch coverage
- **Minimum**: 95% coverage for pipe and compose functions
- **Integration**: All model/path/point modules tested with both APIs

## Test Execution Order

1. **Unit Tests**: Test pipe and compose in isolation
2. **Type Tests**: Verify TypeScript inference
3. **Integration Tests**: Test with model/path/point modules
4. **Performance Tests**: Verify zero-overhead design
5. **Edge Cases**: Handle unusual inputs gracefully

## Success Criteria

- ✅ All tests pass
- ✅ 100% code coverage
- ✅ TypeScript compilation with no errors
- ✅ Performance benchmarks met (<5% overhead for pipe)
- ✅ Integration with existing modules verified
