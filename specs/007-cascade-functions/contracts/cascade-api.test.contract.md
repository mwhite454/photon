# Test Contract: Cascade API ($ function)

**Feature**: 007 - Legacy Cascade Support  
**Test Suite**: `cascade.spec.ts`  
**Status**: Contract Defined - Tests Pending Implementation

## Test Organization

```typescript
describe('Cascade API', () => {
  describe('Model Cascade', () => {
    // Model-specific cascade tests
  });
  
  describe('Path Cascade', () => {
    // Path-specific cascade tests
  });
  
  describe('Point Cascade', () => {
    // Point-specific cascade tests
  });
  
  describe('Type Detection', () => {
    // Type guard tests
  });
});
```

## Model Cascade Tests

### TC-CASCADE-M-001: Basic Model Chaining
**Given** a model and cascade container  
**When** chaining multiple operations  
**Then** operations execute sequentially on $result

```typescript
test('should chain model operations', () => {
  const square = new models.Square(100);
  const result = $(square)
    .center()
    .rotate(45)
    .$result;
  
  expect(result.origin).toEqual([-50, -50]);
  // Verify rotation applied
});
```

### TC-CASCADE-M-002: $initial Preservation
**Given** a cascade container with operations  
**When** accessing $initial  
**Then** original value is unchanged

```typescript
test('should preserve $initial', () => {
  const square = new models.Square(100);
  const container = $(square);
  
  container.center().rotate(45);
  
  expect(container.$initial).toEqual(square);
  expect(container.$initial).not.toBe(container.$result);
});
```

### TC-CASCADE-M-003: $reset Functionality
**Given** a cascade container after operations  
**When** $reset is called  
**Then** $result returns to $initial

```typescript
test('should reset to initial state', () => {
  const square = new models.Square(100);
  const container = $(square);
  
  container.center().rotate(45);
  const transformed = container.$result;
  
  container.$reset();
  
  expect(container.$result).toEqual(container.$initial);
  expect(container.$result).not.toEqual(transformed);
});
```

### TC-CASCADE-M-004: Multiple Operations
**Given** a model cascade  
**When** performing 5+ sequential operations  
**Then** all operations apply correctly

```typescript
test('should handle multiple operations', () => {
  const result = $(new models.Square(100))
    .center()
    .rotate(45)
    .scale(2)
    .moveRelative([10, 20])
    .mirror(true, false)
    .$result;
  
  // Verify all transformations applied
  expect(result).toBeDefined();
});
```

### TC-CASCADE-M-005: Method with Multiple Arguments
**Given** a cascade operation requiring multiple arguments  
**When** calling the operation with arguments  
**Then** arguments are correctly passed

```typescript
test('should pass multiple arguments', () => {
  const result = $(new models.Rectangle(100, 50))
    .moveRelative([25, 10])
    .$result;
  
  expect(result.origin).toEqual([25, 10]);
});
```

## Path Cascade Tests

### TC-CASCADE-P-001: Path Operations
**Given** a path and cascade container  
**When** chaining path operations  
**Then** path is correctly transformed

```typescript
test('should chain path operations', () => {
  const arc = new paths.Arc([0, 0], 50, 0, 90);
  const result = $(arc)
    .move([10, 10])
    .rotate(45)
    .$result;
  
  expect(result.origin).toEqual([10, 10]);
});
```

### TC-CASCADE-P-002: addTo Integration
**Given** a path cascade with addTo  
**When** using addTo during chain  
**Then** path is added to parent model

```typescript
test('should support addTo chaining', () => {
  const parent = {};
  
  $(new paths.Arc([5, 5], 5, 180, 270))
    .addTo(parent, 'arc1')
    .mirror(true, false)
    .addTo(parent, 'arc2');
  
  expect(parent).toHaveProperty('paths.arc1');
  expect(parent).toHaveProperty('paths.arc2');
});
```

### TC-CASCADE-P-003: Path Reset
**Given** a path cascade after transformations  
**When** reset is called  
**Then** path returns to original state

```typescript
test('should reset path to initial', () => {
  const line = new paths.Line([0, 0], [100, 0]);
  const container = $(line);
  
  container.move([50, 50]);
  expect(container.$result.origin).toEqual([50, 50]);
  
  container.$reset();
  expect(container.$result.origin).toEqual([0, 0]);
});
```

## Point Cascade Tests

### TC-CASCADE-PT-001: Point Operations
**Given** a point and cascade container  
**When** chaining point operations  
**Then** point is correctly transformed

```typescript
test('should chain point operations', () => {
  const point: IPoint = [10, 20];
  const result = $(point)
    .add([5, 5])
    .rotate(90, [0, 0])
    .$result;
  
  expect(result).toBeDefined();
  expect(Array.isArray(result)).toBe(true);
});
```

### TC-CASCADE-PT-002: Point Immutability Check
**Given** a point cascade  
**When** operations are performed  
**Then** original point is not mutated

```typescript
test('should not mutate original point', () => {
  const original: IPoint = [10, 20];
  const container = $(original);
  
  container.add([5, 5]);
  
  expect(original).toEqual([10, 20]);
  expect(container.$result).not.toEqual(original);
});
```

## Type Detection Tests

### TC-CASCADE-T-001: Model Type Detection
**Given** a model object  
**When** $ is called  
**Then** ICascadeModel container is returned

```typescript
test('should detect model type', () => {
  const model = new models.Square(100);
  const container = $(model);
  
  expect(container).toHaveProperty('$initial');
  expect(container).toHaveProperty('$result');
  expect(container).toHaveProperty('$reset');
  // Model-specific methods available
});
```

### TC-CASCADE-T-002: Path Type Detection
**Given** a path object  
**When** $ is called  
**Then** ICascadePath container is returned

```typescript
test('should detect path type', () => {
  const path = new paths.Line([0, 0], [100, 0]);
  const container = $(path);
  
  expect(container).toHaveProperty('$initial');
  expect(container).toHaveProperty('$result');
  // Path-specific methods available
});
```

### TC-CASCADE-T-003: Point Type Detection
**Given** a point array  
**When** $ is called  
**Then** ICascadePoint container is returned

```typescript
test('should detect point type', () => {
  const point: IPoint = [10, 20];
  const container = $(point);
  
  expect(container).toHaveProperty('$initial');
  expect(container).toHaveProperty('$result');
  // Point-specific methods available
});
```

### TC-CASCADE-T-004: Invalid Type Error
**Given** an invalid object (not model/path/point)  
**When** $ is called  
**Then** meaningful error is thrown

```typescript
test('should throw error for invalid type', () => {
  const invalidObject = { foo: 'bar' };
  
  expect(() => $(invalidObject as any)).toThrow();
  expect(() => $(null as any)).toThrow();
  expect(() => $(undefined as any)).toThrow();
});
```

## ES6+ Modernization Verification

### TC-MOD-001: No var Declarations
**Given** the Cascade class implementation  
**When** code is inspected  
**Then** no var keywords exist

```typescript
test('implementation uses const/let, not var', () => {
  const cascadeSource = fs.readFileSync('maker.ts', 'utf8');
  const cascadeClassCode = cascadeSource.match(/class Cascade.*?\n}/s);
  
  expect(cascadeClassCode[0]).not.toMatch(/\bvar\b/);
});
```

### TC-MOD-002: Arrow Functions Used
**Given** the Cascade class implementation  
**When** checking method implementations  
**Then** arrow functions are used appropriately

```typescript
test('implementation uses arrow functions', () => {
  const cascadeSource = fs.readFileSync('maker.ts', 'utf8');
  const shadowMethod = cascadeSource.match(/_shadow.*?\n\s+}/s);
  
  expect(shadowMethod[0]).toMatch(/=>/);
  expect(shadowMethod[0]).not.toMatch(/function\s*\(/);
});
```

### TC-MOD-003: Rest Parameters
**Given** the _apply method  
**When** checking parameter handling  
**Then** rest parameters are used instead of arguments

```typescript
test('implementation uses rest parameters', () => {
  const cascadeSource = fs.readFileSync('maker.ts', 'utf8');
  const applyMethod = cascadeSource.match(/_apply.*?\n\s+}/s);
  
  expect(applyMethod[0]).toMatch(/\.\.\.[\w]+/);
  expect(applyMethod[0]).not.toMatch(/\barguments\b/);
});
```

## Integration Tests

### TC-INT-001: Pipe vs Cascade Equivalence
**Given** same operations in pipe and cascade  
**When** both execute  
**Then** results are equivalent

```typescript
test('should produce same result as pipe', () => {
  const square = new models.Square(100);
  
  const cascadeResult = $(square)
    .center()
    .rotate(45)
    .$result;
  
  const pipeResult = pipe(
    square,
    model.center,
    model.rotate(45)
  );
  
  expect(cascadeResult).toEqual(pipeResult);
});
```

### TC-INT-002: Documentation Examples Execute
**Given** code examples from $-function.md  
**When** examples are executed  
**Then** all examples run without errors

```typescript
test('documentation examples execute correctly', () => {
  // Example 1: Basic usage
  const square = $(new models.Square(10))
    .center()
    .rotate(45)
    .moveRelative([0, 15])
    .$result;
  
  expect(square).toBeDefined();
  
  // Example 2: addTo pattern
  const starburst = {};
  $(new paths.Arc([5, 5], 5, 180, 270))
    .addTo(starburst, 'arc1')
    .mirror(true, false)
    .addTo(starburst, 'arc2');
  
  expect(starburst).toHaveProperty('paths.arc1');
});
```

## Performance Tests

### TC-PERF-CASCADE-001: Container Creation Overhead
**Given** cascade container creation  
**When** creating 1000 containers  
**Then** overhead is acceptable (<10% vs direct calls)

```typescript
test('should have acceptable container overhead', () => {
  const square = new models.Square(100);
  
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    $(square).center().$result;
  }
  const cascadeTime = performance.now() - start;
  
  const directStart = performance.now();
  for (let i = 0; i < 1000; i++) {
    model.center(square);
  }
  const directTime = performance.now() - directStart;
  
  expect(cascadeTime / directTime).toBeLessThan(1.10); // <10% overhead
});
```

## Test Coverage Requirements

- **Target**: 100% line and branch coverage for Cascade class
- **Minimum**: 95% coverage for $ function and type detection
- **Integration**: All three types (Model, Path, Point) fully tested

## Success Criteria

- ✅ All cascade operations work correctly
- ✅ $initial, $result, $reset function as specified
- ✅ Type detection accurate for all three types
- ✅ ES6+ modernization verified (no var/function/arguments)
- ✅ Performance overhead < 10%
- ✅ Documentation examples execute without errors
- ✅ Equivalence with pipe demonstrated
