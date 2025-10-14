---
title: Functional Composition
---

# Functional Composition in Photon

Modern way to chain operations using pure functions.

## Pipe (Left-to-Right)

Use `pipe` to apply transformations in a left-to-right sequence:

```javascript
import { pipe, model, models } from 'photon/core';

const square = pipe(
  new models.Square(100),
  model.center,
  model.rotate(45),
  model.moveRelative([0, 15])
);
```

**How it works:**
1. Start with a value (the Square)
2. Apply each function in order, left to right
3. Each function receives the result of the previous one
4. The final result is returned

### Pipe with Multiple Transformations

```javascript
import { pipe, model, models, path } from 'photon/core';

// Complex transformation pipeline
const transformedModel = pipe(
  new models.Rectangle(200, 100),
  model.center,
  model.rotate(30),
  model.scale(1.5),
  model.moveRelative([50, 25])
);

// Works with paths too
const transformedPath = pipe(
  new paths.Line([0, 0], [100, 0]),
  path.moveRelative([10, 10]),
  path.rotate(45, [0, 0])
);
```

## Compose (Reusable Transformations)

Use `compose` to create reusable transformation functions:

```javascript
import { compose, model, models } from 'photon/core';

// Create a reusable transformation
const centerAndRotate = compose(
  model.rotate(45),
  model.center
);

// Apply to multiple models
const square1 = centerAndRotate(new models.Square(100));
const square2 = centerAndRotate(new models.Rectangle(200, 100));
const circle = centerAndRotate(new models.Ellipse(50, 50));
```

**How it works:**
1. Define transformations in **right-to-left** order
2. `compose` returns a new function
3. Call that function with any compatible value
4. Transformations are applied right-to-left

### Creating Transformation Libraries

```javascript
import { compose, model, models } from 'photon/core';

// Build a library of common transformations
const transformations = {
  centerAndRotate45: compose(
    model.rotate(45),
    model.center
  ),
  
  scaleAndMove: compose(
    model.moveRelative([100, 100]),
    model.scale(2)
  ),
  
  prepareForExport: compose(
    model.moveRelative([10, 10]),
    model.rotate(0),
    model.center
  )
};

// Use them throughout your code
const gear = transformations.centerAndRotate45(new models.BoltRectangle(10, 20, 2));
const bracket = transformations.prepareForExport(new models.RoundRectangle(50, 30, 5));
```

## Combining Pipe and Compose

You can combine both approaches for maximum flexibility:

```javascript
import { pipe, compose, model, models } from 'photon/core';

// Create reusable transformations
const standardPrep = compose(model.center, model.rotate(0));
const scaleUp = compose(model.scale(1.5));

// Use them in a pipe
const result = pipe(
  new models.Oval(100, 50),
  standardPrep,
  scaleUp,
  model.moveRelative([25, 50])
);
```

## Why Use Pipe/Compose?

### Pure Functions
No side effects, predictable behavior:
```javascript
const original = new models.Square(100);
const transformed = pipe(original, model.center, model.rotate(45));

// Original is unchanged
console.log(original.origin); // [0, 0]
console.log(transformed.origin); // [-50, -50]
```

### Immutable
Original objects are never modified:
```javascript
const square = new models.Square(100);

// Each transformation creates a new object
const centered = pipe(square, model.center);
const rotated = pipe(centered, model.rotate(45));

// All three objects exist independently
console.log(square !== centered); // true
console.log(centered !== rotated); // true
```

### Type-Safe
Full TypeScript inference:
```typescript
import { pipe, model, models } from 'photon/core';
import type { IModel } from 'photon/core';

// TypeScript knows the types at each step
const result: IModel = pipe(
  new models.Square(100),  // IModel
  model.center,            // IModel → IModel
  model.rotate(45)         // IModel → IModel
);
```

### Performance
Zero overhead - compiles to direct function calls:
```javascript
// This pipe call:
pipe(value, fn1, fn2, fn3)

// Compiles to:
fn3(fn2(fn1(value)))
```

## Migration from Cascade

If you're using the legacy cascade (`$`) API, here's how to migrate:

### Basic Chain
```javascript
// Old (cascade)
const result = $(model)
  .center()
  .rotate(45)
  .$result;

// New (pipe - recommended)
const result = pipe(model, model.center, model.rotate(45));
```

### Reusable Transformations
```javascript
// Old (cascade with wrapper function)
function centerAndRotate(m) {
  return $(m).center().rotate(45).$result;
}

// New (compose - recommended)
const centerAndRotate = compose(
  model.rotate(45),
  model.center
);
```

### Complex Chains
```javascript
import { pipe, $, model, models } from 'photon/core';

const myModel = new models.Square(100);

// Old (cascade)
const result1 = $(myModel)
  .center()
  .rotate(45)
  .scale(1.5)
  .moveRelative([10, 20])
  .$result;

// New (pipe)
const result2 = pipe(
  myModel,
  model.center,
  model.rotate(45),
  model.scale(1.5),
  model.moveRelative([10, 20])
);
```

### Benefits of Migration

| Feature | Cascade (`$`) | Pipe/Compose |
|---------|---------------|--------------|
| **Performance** | Good | Excellent (zero overhead) |
| **Type Safety** | Limited | Full TypeScript inference |
| **Reusability** | Via wrapper functions | Built-in with `compose` |
| **Readability** | OOP-style chaining | Functional style |
| **Immutability** | Yes | Yes |
| **Bundle Size** | Larger (container overhead) | Smaller (pure functions) |

## API Reference

### pipe

```typescript
function pipe<T>(value: T): T;
function pipe<T, A>(value: T, fn1: (x: T) => A): A;
function pipe<T, A, B>(value: T, fn1: (x: T) => A, fn2: (x: A) => B): B;
// ... up to 10 functions
```

**Parameters:**
- `value` - Initial value to transform
- `...fns` - Functions to apply in left-to-right order

**Returns:** Final transformed value

### compose

```typescript
function compose<A>(fn1: (x: A) => A): (x: A) => A;
function compose<A, B>(fn2: (x: A) => B, fn1: (x: A) => A): (x: A) => B;
function compose<A, B, C>(
  fn3: (x: B) => C,
  fn2: (x: A) => B,
  fn1: (x: A) => A
): (x: A) => C;
// ... up to 10 functions
```

**Parameters:**
- `...fns` - Functions to compose in right-to-left order

**Returns:** Composed function that applies all transformations

## Examples

### Creating a Drawing
```javascript
import { pipe, compose, model, models, exporter } from 'photon/core';

// Define reusable transformations
const prepareShape = compose(
  model.center,
  model.rotate(0)
);

// Create and transform shapes
const shapes = {
  square: pipe(
    new models.Square(100),
    prepareShape,
    model.moveRelative([0, 0])
  ),
  circle: pipe(
    new models.Ellipse(50, 50),
    prepareShape,
    model.moveRelative([120, 0])
  ),
  rectangle: pipe(
    new models.Rectangle(80, 40),
    prepareShape,
    model.moveRelative([0, 120])
  )
};

// Export
const svg = exporter.toSVG({ models: shapes });
```

### Path Manipulation
```javascript
import { pipe, path, paths } from 'photon/core';

const transformedPath = pipe(
  new paths.Line([0, 0], [100, 0]),
  path.moveRelative([50, 50]),
  path.rotate(45, [50, 50]),
  path.scale(1.5, [50, 50])
);
```

### Point Transformations
```javascript
import { pipe, point } from 'photon/core';

const transformedPoint = pipe(
  [100, 100],
  point.rotate(45, [0, 0]),
  point.scale(1.5, [0, 0]),
  point.add([10, 20])
);
```
