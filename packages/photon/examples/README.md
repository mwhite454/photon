# Photon Examples

This directory contains example files demonstrating various features and capabilities of the Photon library for 2D CAD design.

## Modern ES6+ Syntax

All examples in this directory use modern JavaScript (ES6+) syntax:

- **ES6 imports** instead of `require()`
- **const/let** instead of `var`
- **photon** namespace instead of `makerjs`

This ensures examples are ready to copy-paste into modern JavaScript projects without modification.

## Example Format

Each example follows this pattern:

```javascript
import * as photon from 'photon';

// Create your model
const model = {
    paths: {
        // your paths here
    }
};

export default model;
```

## Running Examples

### Node.js

```bash
node examples/smile.js
```

### Browser

Examples can be imported as ES6 modules in modern browsers:

```html
<script type="module">
  import model from './examples/smile.js';
  // Use the model
</script>
```

## Available Examples

### Basic Shapes

- **smile.js** - Simple smiley face demonstrating basic paths
- **spiral.js** - Spiral pattern using mathematical functions
- **combine.js** - Combining multiple shapes with boolean operations

### Text and Typography

- **Text.js** - Text rendering with custom fonts
- **textOnChain.js** - Text following a curved path (chain)
- **textOnPath.js** - Text following any arbitrary path

### Advanced Geometry

- **fillets.js** - Rounded corners and edge filleting
- **filletstar.js** - Star shape with filleted points
- **logo.js** - Complex logo design with multiple features
- **ventgrid.js** - Ventilation grid pattern (JavaScript)
- **ventgrid.ts** - Ventilation grid pattern (TypeScript)
- **ventgridcircle.js** - Circular ventilation grid

### Mechanical Parts

- **tubeclamp.js** - Tube clamp design
- **skatedeck.js** - Skateboard deck outline
- **Rimbox.js** - Box with decorative rim
- **starbox.js** - Star-shaped box
- **polygonstackbox.js** - Stacked polygon box design

### Utility Examples

- **testpanel.js** - Test panel for various features
- **m.js** - Letter 'M' shape demonstration
- **dependExample_forNode.js** - Dependency example for Node.js
- **dependExample_forBrowser.js** - Dependency example for browsers
- **dependExample.html** - HTML page demonstrating browser usage

## TypeScript Support

TypeScript examples are also included:

- **ventgrid.ts** - TypeScript version with type safety
- **ventgridcircle.ts** - TypeScript version with type safety
- **ventgrid.d.ts** - Type definitions

## Contributing

When adding new examples:

1. Use modern ES6+ syntax (imports, const/let, arrow functions)
2. Include comments explaining key concepts
3. Export the model as default export
4. Keep examples focused on demonstrating specific features
5. Test in both Node.js and browser environments

## Learn More

- [Photon Documentation](../../docs/)
- [Playground](../../playground/) - Interactive model editor
- [API Reference](../../dist/docs/)
