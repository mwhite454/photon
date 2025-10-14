# Data Model: Functional Composition + Cascade APIs

**Feature**: 007 - Modern Functional Composition + Legacy Cascade Support  
**Created**: 2025-10-14  
**Status**: Design Complete

## Overview

This feature introduces two complementary APIs for function composition in photon/core:
1. **Primary API**: Pure functional composition utilities (pipe, compose)
2. **Legacy API**: Modernized cascade wrapper ($ function)

## Entities

### Entity 1: PipeFunction

**Purpose**: Generic pipe utility for left-to-right function composition

**Type Signature**:
```typescript
function pipe<T>(value: T): T;
function pipe<T, A>(value: T, fn1: (x: T) => A): A;
function pipe<T, A, B>(value: T, fn1: (x: T) => A, fn2: (x: A) => B): B;
// ... overloads for 3-10 functions
function pipe(value: any, ...fns: Function[]): any;
```

**Properties**:
- **value**: Initial value to transform
- **...fns**: Array of transformation functions

**Behavior**:
- Executes functions left-to-right
- Passes result of each function to the next
- Returns final result
- Pure function - no side effects
- No mutation of original value

**Validation Rules**:
- At least 1 argument required (the value)
- All functions must be callable
- TypeScript ensures type compatibility between functions

**Example**:
```typescript
const result = pipe(
  new models.Square(10),
  model.center,
  model.rotate(45)
);
```

### Entity 2: ComposeFunction

**Purpose**: Generic compose utility for right-to-left function composition

**Type Signature**:
```typescript
function compose<A>(...fns: Function[]): (x: A) => any;
function compose<A, B>(fn1: (x: A) => B): (x: A) => B;
function compose<A, B, C>(fn2: (x: B) => C, fn1: (x: A) => B): (x: A) => C;
// ... overloads for 2-10 functions
```

**Properties**:
- **...fns**: Array of transformation functions (right-to-left order)

**Returns**:
- Composed function that accepts initial value

**Behavior**:
- Creates a new function by composing input functions
- Executes right-to-left when resulting function is called
- Reusable transformation pipeline
- Pure function - no side effects

**Validation Rules**:
- At least 1 function required
- All arguments must be functions
- TypeScript ensures type compatibility

**Example**:
```typescript
const centerAndRotate = compose(
  model.rotate(45),
  model.center
);

const square1 = centerAndRotate(new models.Square(10));
const square2 = centerAndRotate(new models.Rectangle(20, 10));
```

### Entity 3: Cascade Container

**Purpose**: jQuery-style chainable wrapper for model/path/point operations (Legacy)

**Type Signature**:
```typescript
class Cascade<T> implements ICascade {
  public $result: T;
  public $initial: T;
  
  constructor(module: any, initial: T);
  public $reset(): Cascade<T>;
  // + all methods from the wrapped module
}
```

**Properties**:
- **$initial**: Original value passed to $()
- **$result**: Current state after transformations
- **$reset()**: Method to reset to $initial
- **[methodName]**: Dynamically shadowed methods from module

**Behavior**:
- **Stateful** - maintains internal $result
- **Mutable** - each operation modifies $result
- **Chainable** - all methods return this
- **Dynamic** - automatically provides all module methods

**State Transitions**:
```
Initial State: $result = $initial
  ↓
Operation 1: $result = fn1($initial, ...args)
  ↓
Operation 2: $result = fn2($result, ...args)
  ↓
...
  ↓
Access: return $result
OR
Reset: $result = $initial (back to Initial State)
```

**Validation Rules**:
- Context must be Model, Path, or Point
- Type guards ensure correct container type
- Operations must exist on the module

**Example**:
```typescript
const square = $(new models.Square(10))
  .center()
  .rotate(45)
  .$result;

// Can reset and reuse
const container = $(new models.Square(10));
container.center().rotate(45);
const result1 = container.$result;

container.$reset();
container.scale(2);
const result2 = container.$result;
```

### Entity 4: Cascade Function ($)

**Purpose**: Factory function for creating cascade containers

**Type Signature**:
```typescript
export function $(modelContext: IModel): ICascadeModel;
export function $(pathContext: IPath): ICascadePath;
export function $(pointContext: IPoint): ICascadePoint;
```

**Properties**:
- **context**: The object to wrap (Model, Path, or Point)

**Returns**:
- Typed cascade container (ICascadeModel, ICascadePath, or ICascadePoint)

**Behavior**:
- Detects type using type guards
- Instantiates appropriate Cascade container
- Throws error for invalid types

**Validation Rules**:
- Context must pass isModel, isPath, or isPoint check
- Non-matching types result in error

## Relationships

### Pipe and Compose
```
pipe: value → [fn1 → fn2 → fn3] → result
compose: [fn3 ← fn2 ← fn1] → composedFn
```

**Relationship**: Compose creates reusable functions, pipe executes immediately

### Cascade and Modules
```
$(model) → Cascade<IModel>
         ↓
      contains reference to model module
         ↓
      shadows all model methods
         ↓
      each call updates $result
```

**Relationship**: Cascade wraps a module and provides stateful chaining

### Type System
```
IModel    → ICascadeModel    → Cascade<IModel>
IPath     → ICascadePath     → Cascade<IPath>
IPoint    → ICascadePoint    → Cascade<IPoint>
```

**Relationship**: Each type has corresponding cascade interface and implementation

## API Contract

### Functional API (pipe/compose)

**Guarantees**:
- ✅ **Immutability**: Original values never modified
- ✅ **Purity**: No side effects
- ✅ **Type Safety**: Full TypeScript inference
- ✅ **Composability**: Functions can be combined freely
- ✅ **Performance**: Zero overhead vs manual calls

**Constraints**:
- Functions must have compatible signatures
- At least one function required for compose
- At least one value required for pipe

### Cascade API ($)

**Guarantees**:
- ✅ **Chainability**: All methods return container
- ✅ **State Access**: $initial and $result always available
- ✅ **Reset Capability**: Can return to initial state
- ✅ **Type Safety**: Correct container type returned
- ✅ **Method Availability**: All module methods accessible

**Constraints**:
- ⚠️ **Stateful**: Maintains mutable state
- ⚠️ **Not Thread-Safe**: Should not be shared
- ⚠️ **Type Detection**: Runtime overhead for type guards

## Migration Patterns

### From Cascade to Pipe
```typescript
// Before (Cascade)
const result = $(model)
  .center()
  .rotate(45)
  .moveRelative([0, 15])
  .$result;

// After (Pipe - Recommended)
const result = pipe(
  model,
  model.center,
  model.rotate(45),
  model.moveRelative([0, 15])
);
```

### Reusable Transformations
```typescript
// Cascade (not reusable)
const sq1 = $(new models.Square(10)).center().rotate(45).$result;
const sq2 = $(new models.Square(20)).center().rotate(45).$result;

// Compose (reusable)
const transform = compose(model.rotate(45), model.center);
const sq1 = transform(new models.Square(10));
const sq2 = transform(new models.Square(20));
```

## Performance Characteristics

### Pipe/Compose
- **Time Complexity**: O(n) where n = number of functions
- **Space Complexity**: O(1) - no additional allocations
- **Overhead**: None - equivalent to manual chaining

### Cascade
- **Time Complexity**: O(n + m) where n = operations, m = module methods (for shadowing)
- **Space Complexity**: O(m) - stores shadowed methods
- **Overhead**: Container allocation + method lookup

**Recommendation**: Use pipe/compose for performance-critical code

## Testing Strategy

### Pipe Tests
- Single function
- Multiple functions (2-10)
- Type inference validation
- Error handling (invalid functions)

### Compose Tests
- Single function
- Multiple functions (2-10)
- Reusability validation
- Type inference validation

### Cascade Tests
- Model operations
- Path operations
- Point operations
- $reset functionality
- $initial preservation
- Type detection
- Error cases (invalid types)

## Summary

This data model defines two complementary approaches to function composition:

1. **Pipe/Compose** (Primary): Modern, functional, immutable, zero-overhead
2. **Cascade** (Legacy): Familiar, stateful, chainable, backward-compatible

Both serve the same purpose (chaining operations) but with different trade-offs. The data model ensures type safety, clear semantics, and predictable behavior for both approaches.
