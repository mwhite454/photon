---
ai_summary: Common questions and issues when migrating from maker.js to photon/core.
category: Migration Guide
created: '2025-10-14'
description: Frequently asked questions about migrating from maker.js to photon/core
difficulty: advanced
keywords:
- core
- export
- javascript
- maker
- migration
- migration-guide
- models
- paths
- photon
- photon/core
last_updated: '2025-10-14'
primary_topic: migration-faq---maker.js-to-photon/core
tags:
- advanced
- migration-guide
- migration-faq---maker.js-to-photon/core
title: Migration FAQ - maker.js to photon/core
---
# Migration FAQ: maker.js → photon/core

Common questions and issues when migrating from maker.js to photon/core.

## General Questions

### Q: What is the main difference between maker.js and photon/core?

**A:** photon/core is the modernized version of maker.js with:

- **ES6+ modules** instead of CommonJS (`import` vs `require`)
- **Modern JavaScript syntax** (const/let, arrow functions, template literals)
- **Better tree-shaking** for smaller bundle sizes
- **Improved TypeScript support** with better type definitions
- **Active maintenance** and modern tooling

The core API remains largely the same - most breaking changes are in how you import and use the library, not in the functionality itself.

### Q: Are there any functions missing in photon/core?

**A:** Yes. A few functions from maker.js have not yet been ported to photon/core:

**Missing Functions** (as of v0.18.1):
- `model.expandPaths()` - Expand paths with stroke thickness
- `model.outline()` - Create outline around model

**Partially Working**:
- `model.simplify()` - Function exists but some examples fail due to missing dependencies

**Status**: See [GitHub Issue #3](https://github.com/mwhite454/photon/issues/3) for updates and workarounds.

**Affected Documentation**: Pages documenting these functions include warning banners. Examples will not execute until these functions are restored.

**Workarounds**: 
- For `expandPaths()`: Use path-level expansion where possible
- For `outline()`: Manually create outline paths
- Watch GitHub issue for restoration timeline

### Q: Will my existing maker.js code stop working?

**A:** Your code will need updates to work with photon/core:

1. **Import statements** must change from `require()` to `import`
2. **Package name** changes from `makerjs` to `photon/core`
3. **Browser usage** requires ES6 modules instead of global namespace

The actual API methods (creating shapes, exporting, transformations) work the same way.

### Q: Can I use both maker.js and photon/core in the same project?

**A:** Yes, but it's not recommended. They are essentially the same library with different packaging. Using both would:

- Increase bundle size unnecessarily
- Create confusion about which version to use
- Potentially cause naming conflicts

Choose one and stick with it. For new projects, use photon/core.

## Installation & Setup

### Q: How do I install photon/core?

**A:** Using npm or yarn:


## Examples

```bash
npm install photon/core
# or
yarn add photon/core
```

### Q: Do I need to uninstall maker.js first?

**A:** Not required, but recommended for clean projects:

```bash
npm uninstall makerjs
npm install photon/core
```

### Q: How do I use photon/core in the browser?

**A:** Use ES6 modules with a `<script type="module">` tag:

```html
<script type="module">
  import { models, exporter } from 'https://unpkg.com/photon/core';
  
  const rect = new models.Rectangle(100, 50);
  const svg = exporter.toSVG(rect);
  document.body.innerHTML = svg;
</script>
```

Or use a bundler (Vite, Webpack, Rollup) for production builds.

## Migration Issues

### Q: My imports aren't working - "Cannot find module 'makerjs'"

**A:** Update your import statements:

```javascript
// Before (maker.js)
const makerjs = require('makerjs');

// After (photon/core)
import { exporter } from '@7syllable/photon-core';
```

### Q: I'm getting "var is not defined" in browser

**A:** Browser scripts need `type="module"`:

```html
<!-- Before -->
<script src="browser.maker.js"></script>

<!-- After -->
<script type="module">
  import { models } from '@7syllable/photon-core';
</script>
```

### Q: My build is failing with "require is not defined"

**A:** You're mixing CommonJS and ES6 modules. Use consistent ES6 imports:

```javascript
// Convert all requires to imports
import { models, paths, exporter } from '@7syllable/photon-core';
```

### Q: Export to JSON isn't working

**A:** Use native `JSON.stringify()` instead:

```javascript
// Before
const json = exporter.toJSON(model);

// After
const json = JSON.stringify(model);
```

## Performance & Optimization

### Q: Will photon/core be faster than maker.js?

**A:** Performance is similar for core operations. Benefits include:

- **Smaller bundles** with tree-shaking (only import what you use)
- **Faster load times** in modern browsers with native ES6 modules
- **Better caching** with module-based architecture

### Q: How do I reduce bundle size?

**A:** Use named imports to enable tree-shaking:

```javascript
// Good - tree-shaking friendly
import { models, exporter } from '@7syllable/photon-core';

// Less optimal - imports everything
import { exporter } from '@7syllable/photon-core';
```

## TypeScript Support

### Q: Does photon/core have TypeScript definitions?

**A:** Yes, photon/core includes TypeScript definitions. They should work automatically:

```typescript
import { models, exporter } from '@7syllable/photon-core';

const rect = new models.Rectangle(100, 50); // Type-safe!
```

### Q: My TypeScript types aren't working

**A:** Ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "module": "ES6",
    "moduleResolution": "node"
  }
}
```

## Browser Compatibility

### Q: What browsers support photon/core?

**A:** Modern browsers with ES6 module support:

- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 79+

For older browsers, use a bundler (Webpack, Rollup, Vite) with transpilation.

### Q: How do I support IE11?

**A:** Use a bundler with Babel to transpile ES6 to ES5:

1. Install Babel and necessary presets
2. Configure Babel to transpile photon/core
3. Bundle your application

## Common Patterns

### Q: How do I create a simple shape?

**A:**

```javascript
import { models, exporter } from '@7syllable/photon-core';

const rect = new models.Rectangle(100, 50);
const svg = exporter.toSVG(rect);
```

### Q: How do I combine multiple shapes?

**A:**

```javascript
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

### Q: How do I add fillets to a chain?

**A:**

```javascript
import { model as modelOps, chain as chainOps } from '@7syllable/photon-core';

const myModel = { /* paths */ };
const chain = modelOps.findSingleChain(myModel);
const fillets = chainOps.fillet(chain, 10);
```

## Getting Help

### Q: Where can I find more examples?

**A:** Check these resources:

- [Getting Started Guide](../getting-started/index.md)
- [API Reference](../api/index.md)
- [Code Examples](../examples/index.md)
- [API Migration Guide](./api-mapping.md)

### Q: I found a bug, where do I report it?

**A:** Open an issue on the [photon GitHub repository](https://github.com/phenomnomnominal/photon/issues) with:

- Description of the issue
- Code example that reproduces the problem
- Expected vs actual behavior
- Your environment (browser, Node.js version, etc.)

### Q: How can I contribute?

**A:** Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

See [Contributing Guide](../../CONTRIBUTING.md) for details.

## Related Resources

- [API Migration Guide](./api-mapping.md) - Complete API mapping reference
- [Getting Started](../getting-started/index.md) - Quick start guide
- [API Documentation](../api/index.md) - Full API reference
- [Examples](../examples/index.md) - Code examples and tutorials
