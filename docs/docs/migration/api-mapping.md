---
ai_summary: This guide provides a comprehensive mapping of photon/core APIs to their
  photon/core equivalents. Use this reference when migrating existing code o...
category: Migration Guide
created: '2025-10-14'
description: Complete mapping of photon/core APIs to photon/core equivalents with
  migration examples
difficulty: advanced
keywords:
- core
- export
- guide
- javascript
- migration
- migration-guide
- models
- paths
- photon
- photon/core
last_updated: '2025-10-14'
primary_topic: api-migration-guide---photon/core-to-photon/core
tags:
- advanced
- migration-guide
- api-migration-guide---photon/core-to-photon/core
title: API Migration Guide - photon/core to photon/core
---
# API Migration Guide: photon/core → photon/core

This guide provides a comprehensive mapping of photon/core APIs to their photon/core equivalents. Use this reference when migrating existing code or updating documentation examples.

## Quick Summary

**photon/core** is the modernized version of photon/core with:

- ES6+ module syntax (import/export instead of require)
- Consistent naming conventions
- Improved TypeScript support
- Enhanced tree-shaking capabilities
- Modern build tooling

## Namespace Mapping

### Core Namespace

| photon/core | photon/core | Notes |
|----------|-------------|-------|
| `var makerjs = require('@7syllable/photon-core');` | `import { models, paths, exporter } from '@7syllable/photon-core'` | Named imports (preferred) |
| `makerjs` (global) | `import { models, paths, exporter } from '@7syllable/photon-core'` | Use named imports in modules |

### Models

| photon/core | photon/core | Breaking Changes |
|----------|-------------|------------------|
| `new makerjs.models.Rectangle(width, height)` | `new models.Rectangle(width, height)` | Import from `photon/core` |
| `new makerjs.models.Circle(radius)` | `new models.Circle(radius)` | None |
| `new makerjs.models.Polygon(numberOfSides, radius)` | `new models.Polygon(numberOfSides, radius)` | None |
| `new makerjs.models.BoltCircle(holeRadius, holeCount, boltRadius)` | `new models.BoltCircle(holeRadius, holeCount, boltRadius)` | None |
| `new makerjs.models.Ellipse(radiusX, radiusY)` | `new models.Ellipse(radiusX, radiusY)` | None |
| `new makerjs.models.RoundRectangle(width, height, radius)` | `new models.RoundRectangle(width, height, radius)` | None |

### Paths

| photon/core | photon/core | Breaking Changes |
|----------|-------------|------------------|
| `new makerjs.paths.Line(origin, end)` | `new paths.Line(origin, end)` | Import from `photon/core` |
| `new makerjs.paths.Arc(origin, radius, startAngle, endAngle)` | `new paths.Arc(origin, radius, startAngle, endAngle)` | None |
| `new makerjs.paths.Circle(origin, radius)` | `new paths.Circle(origin, radius)` | None |
| `new makerjs.paths.BezierSeed(origin, controls, end)` | `new paths.BezierSeed(origin, controls, end)` | None |

### Path Operations

| photon/core | photon/core | Breaking Changes |
|----------|-------------|------------------|
| `makerjs.path.mirror(path, ...)` | `path.mirror(path, ...)` | Import from `photon/core` |
| `makerjs.path.rotate(path, ...)` | `path.rotate(path, ...)` | None |
| `makerjs.path.scale(path, ...)` | `path.scale(path, ...)` | None |
| `makerjs.path.moveRelative(path, ...)` | `path.moveRelative(path, ...)` | None |
| `makerjs.path.distort(path, ...)` | `path.distort(path, ...)` | None |

### Model Operations

| photon/core | photon/core | Breaking Changes |
|----------|-------------|------------------|
| `makerjs.model.move(model, point)` | `model.move(model, point)` | Import from `photon/core` |
| `makerjs.model.rotate(model, angle, origin)` | `model.rotate(model, angle, origin)` | None |
| `makerjs.model.scale(model, scale)` | `model.scale(model, scale)` | None |
| `makerjs.model.combine(...)` | `model.combine(...)` | None |
| `makerjs.model.findChains(model)` | `model.findChains(model)` | None |
| `makerjs.model.findSingleChain(model)` | `model.findSingleChain(model)` | None |

### Chain Operations

| photon/core | photon/core | Breaking Changes |
|----------|-------------|------------------|
| `makerjs.chain.fillet(chain, radius)` | `chain.fillet(chain, radius)` | Import from `photon/core` |
| `makerjs.chain.dogbone(chain, ...)` | `chain.dogbone(chain, ...)` | None |

### Exporters

| photon/core | photon/core | Breaking Changes |
|----------|-------------|------------------|
| `makerjs.exporter.toSVG(model)` | `exporter.toSVG(model)` | Import from `photon/core` |
| `makerjs.exporter.toDXF(model)` | `exporter.toDXF(model)` | None |
| `makerjs.exporter.toJSON(model)` | `JSON.stringify(model)` | Use native JSON |

### Layout

| photon/core | photon/core | Breaking Changes |
|----------|-------------|------------------|
| `makerjs.layout.cloneToRow(...)` | `layout.cloneToRow(...)` | Import from `photon/core` |
| `makerjs.layout.cloneToColumn(...)` | `layout.cloneToColumn(...)` | None |
| `makerjs.layout.cloneToGrid(...)` | `layout.cloneToGrid(...)` | None |
| `makerjs.layout.cloneToHoneycomb(...)` | `layout.cloneToHoneycomb(...)` | None |

## Import Patterns

### Before (photon/core - CommonJS)


## Examples

```javascript
// Node.js / CommonJS
const makerjs = require('@7syllable/photon-core');

// Create a rectangle
const rect = new makerjs.models.Rectangle(100, 50);

// Export to SVG
const svg = makerjs.exporter.toSVG(rect);
console.log(svg);
```

### After (photon/core - ES6 Modules)

```javascript
// ES6 module import - Named imports (preferred)
import { models, exporter } from '@7syllable/photon-core';

const rect = new models.Rectangle(100, 50);
const svg = exporter.toSVG(rect);
console.log(svg);
```

## Browser Usage

### Before (photon/core)

```html
<!-- Global namespace via script tag -->
<script src="http:// photon/core.org/target/js/browser.maker.js"></script>
<script>
  const rect = new makerjs.models.Rectangle(100, 50);
  const svg = makerjs.exporter.toSVG(rect);
  document.write(svg);
</script>
```

### After (photon/core)

```html
<!-- ES6 module via script tag -->
<script type="module">
  import { models, exporter } from 'https://unpkg.com/photon/core';
  
  const rect = new models.Rectangle(100, 50);
  const svg = exporter.toSVG(rect);
  document.body.innerHTML = svg;
</script>
```

**OR with bundler (Vite, Webpack, etc.):**

```javascript
import { models, exporter } from '@7syllable/photon-core';

const rect = new models.Rectangle(100, 50);
const svg = exporter.toSVG(rect);
document.body.innerHTML = svg;
```

## Breaking Changes

### 1. Module System

**Change**: CommonJS (`require`) → ES6 Modules (`import`)

**Impact**: All imports must be updated

**Migration**:
```javascript
// Before
const makerjs = require('@7syllable/photon-core');

// After
import { models, paths, exporter } from '@7syllable/photon-core';
```

### 2. Global Namespace (Browser)

**Change**: Global `makerjs` variable → ES6 module imports

**Impact**: Browser scripts must use `<script type="module">`

**Migration**:
```html
<!-- Before -->
<script src="browser.maker.js"></script>
<script>
  const rect = new makerjs.models.Rectangle(100, 50);
</script>

<!-- After -->
<script type="module">
  import { models } from '@7syllable/photon-core';
  const rect = new models.Rectangle(100, 50);
</script>
```

### 3. JSON Export

**Change**: `makerjs.exporter.toJSON()` → Native `JSON.stringify()`

**Impact**: Use native JSON methods instead

**Migration**:
```javascript
// Before
const json = makerjs.exporter.toJSON(model);

// After
const json = JSON.stringify(model);
```

## Common Migration Patterns

### Pattern 1: Simple Shapes

```javascript
// Before (photon/core)
const makerjs = require('@7syllable/photon-core');
const rect = new makerjs.models.Rectangle(100, 50);
const svg = makerjs.exporter.toSVG(rect);

// After (photon/core)
import { models, exporter } from '@7syllable/photon-core';
const rect = new models.Rectangle(100, 50);
const svg = exporter.toSVG(rect);
```

### Pattern 2: Complex Models

```javascript
// Before (photon/core)
const makerjs = require('@7syllable/photon-core');
const model = {
  models: {
    rect: new makerjs.models.Rectangle(100, 50),
    circle: new makerjs.models.Circle(25)
  }
};
makerjs.model.move(model.models.circle, [50, 25]);
const svg = makerjs.exporter.toSVG(model);

// After (photon/core)
import { models, model as modelOps, exporter } from '@7syllable/photon-core';
const myModel = {
  models: {
    rect: new models.Rectangle(100, 50),
    circle: new models.Circle(25)
  }
};
modelOps.move(myModel.models.circle, [50, 25]);
const svg = exporter.toSVG(myModel);
```

### Pattern 3: Chains and Fillets

```javascript
// Before (photon/core)
const makerjs = require('@7syllable/photon-core');
const model = { /* paths */ };
const chain = makerjs.model.findSingleChain(model);
const fillets = makerjs.chain.fillet(chain, 10);

// After (photon/core)
import { model as modelOps, chain as chainOps } from '@7syllable/photon-core';
const myModel = { /* paths */ };
const chain = modelOps.findSingleChain(myModel);
const fillets = chainOps.fillet(chain, 10);
```

## ES6+ Modernization

In addition to namespace changes, all examples should use modern JavaScript:

### Variable Declarations

```javascript
// Before
const rect = new makerjs.models.Rectangle(100, 50);
const svg = makerjs.exporter.toSVG(rect);

// After
const rect = new models.Rectangle(100, 50);
const svg = exporter.toSVG(rect);
```

### Arrow Functions

```javascript
// Before
function createRect(width, height) {
  return new makerjs.models.Rectangle(width, height);
}

// After
const createRect = (width, height) => new models.Rectangle(width, height);
```

### Template Literals

```javascript
// Before
const message = 'Rectangle size: ' + width + ' x ' + height;

// After
const message = `Rectangle size: ${width} x ${height}`;
```

### Destructuring

```javascript
// Before
const models = makerjs.models;
const exporter = makerjs.exporter;

// After
import { models, exporter } from '@7syllable/photon-core';
```

## Migration Checklist

Use this checklist when migrating code:

- [ ] Replace `require('@7syllable/photon-core')` or `var makerjs = require('@7syllable/photon-core')` with named imports: `import { models, paths, exporter } from '@7syllable/photon-core'`
- [ ] Update all `var` to `const` or `let`
- [ ] Convert functions to arrow functions where appropriate
- [ ] Replace string concatenation with template literals
- [ ] Update browser scripts to use `<script type="module">`
- [ ] Replace `makerjs.exporter.toJSON()` with `JSON.stringify()`
- [ ] Test all examples to ensure they execute correctly
- [ ] Update documentation links to point to photon/core API reference

## Related Topics

- [Getting Started with photon/core](../getting-started/index.md)
- [API Reference](../api/index.md)
- [Migration FAQs](./migration-faq.md)

## Support

If you encounter issues during migration:

1. Check this mapping document for API equivalents
2. Review the [photon/core API reference](../api/index.md)
3. Open an issue on [GitHub](https://github.com/phenomnomnominal/photon) with migration questions
