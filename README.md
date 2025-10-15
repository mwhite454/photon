# Photon

Your compass and straightedge, in JavaScript.

Create line drawings using familiar constructs from geometry and drafting. Initially designated for CNC and laser cutters, Photon can also help you programmatically draw shapes for any purpose. It runs in both Node.js and web browsers.

2D Export formats: 
[DXF](https://mwhite454.github.io/photon/docs/snippets/exporting-dxf/), 
[SVG](https://mwhite454.github.io/photon/docs/snippets/exporting-svg/),
[PDF](https://mwhite454.github.io/photon/docs/snippets/exporting-pdf/),
[OpenJSCAD](https://mwhite454.github.io/photon/docs/snippets/exporting-openjscad/)

3D Export formats:
[OpenJSCAD Script](https://mwhite454.github.io/photon/docs/snippets/exporting-openjscad/),
[OpenJSCAD CSG](https://mwhite454.github.io/photon/docs/snippets/exporting-openjscad/),
[STL](https://mwhite454.github.io/photon/docs/snippets/exporting-stl/)

[Documentation](https://mwhite454.github.io/photon/docs/) · Playground (coming soon)


## Origins

Photon is a modern continuation of Microsoft's Maker.js project. When Microsoft archived the original Maker.js repository, we forked it to ensure this valuable tool continues to evolve and serve the maker community.

**Original Project**: [Microsoft Maker.js](https://github.com/Microsoft/maker.js) 
**License**: Apache 2.0  
**Original Author**: Dan Marshall / Microsoft Corporation

We're grateful to Microsoft and the original contributors for creating and open-sourcing this excellent library. Photon maintains full backward compatibility while adding modern features and active maintenance.

## Core concepts

* [paths](https://mwhite454.github.io/photon/docs/snippets/paths/) - The primitive elements of a drawing are lines, arcs, and circles.
* [models](https://mwhite454.github.io/photon/docs/snippets/models/) - Groups of paths to compose a shape.
* [layers](https://mwhite454.github.io/photon/docs/snippets/layers/) - Organization of models, such as by color or tool type.
* [chains](https://mwhite454.github.io/photon/docs/snippets/chains/) - A series of lines and arcs that connect end-to-end continuously.

Learn more in [Getting Started](https://mwhite454.github.io/photon/docs/getting-started/) or the [API reference](https://mwhite454.github.io/photon/docs/api/).

## Features

* Drawings are a [simple JavaScript object](https://mwhite454.github.io/photon/docs/snippets/just-json/) which can be serialized / deserialized conventionally with JSON. This also makes a drawing easy to [clone](https://mwhite454.github.io/photon/docs/snippets/cloning/).

* Other people's Models can be required the Node.js way, [modified](https://mwhite454.github.io/photon/docs/snippets/modifying-models/), and re-exported.

* Models can be [scaled](https://mwhite454.github.io/photon/docs/snippets/scaling/), [distorted](https://mwhite454.github.io/photon/docs/snippets/distorting/), [measured](https://mwhite454.github.io/photon/docs/snippets/measuring/), and [converted to different unit systems](https://mwhite454.github.io/photon/docs/snippets/units/).

* Paths can be [distorted](https://mwhite454.github.io/photon/docs/snippets/distorting/).

* Models can be [rotated](https://mwhite454.github.io/photon/docs/snippets/rotating/) or [mirrored](https://mwhite454.github.io/photon/docs/snippets/mirroring/).

* Find [intersection points or intersection angles](https://mwhite454.github.io/photon/docs/snippets/intersection/) of paths.

* [Traverse a model tree](https://mwhite454.github.io/photon/docs/snippets/tree/) to reason over its children.

* Detect [chains](https://mwhite454.github.io/photon/docs/snippets/chains/) formed by paths connecting end to end.

* Get the [points along a path](https://mwhite454.github.io/photon/docs/snippets/points/) or along a [chain of paths](https://mwhite454.github.io/photon/docs/snippets/chain-to-points/).

* Easily add a curvature at the joint between any 2 paths, using a [traditional or a dogbone fillet](https://mwhite454.github.io/photon/docs/snippets/fillets/).

* [Combine models](https://mwhite454.github.io/photon/docs/snippets/combining/) with boolean operations to get unions, intersections, or punches.

* [Expand paths](https://mwhite454.github.io/photon/docs/snippets/expanding/) to simulate a stroke thickness, with the option to bevel joints.

* [Outline model](https://mwhite454.github.io/photon/docs/snippets/outlining/) to create a surrounding outline, with the option to bevel joints.

* Layout clones into [repeating layouts](https://mwhite454.github.io/photon/docs/snippets/layout-repeating/), on a [path](https://mwhite454.github.io/photon/docs/snippets/layout-on-path/), or on a [chain](https://mwhite454.github.io/photon/docs/snippets/layout-on-chain/)

#### Playground

Playground (coming soon) — browse examples in the docs under [Snippets](https://mwhite454.github.io/photon/docs/)

#### Import formats

* [Fonts and Text](https://mwhite454.github.io/photon/docs/snippets/fonts-and-text/) (Requires [opentype.js](https://opentype.js.org/))
* [SVG Path Data](https://mwhite454.github.io/photon/docs/snippets/importing-svg-path-data/)
* [SVG Points](https://mwhite454.github.io/photon/docs/snippets/importing-svg-points/)

## Getting Started

### Installation

Install Photon via npm:

```bash
npm install @7syllable/photon-core
```

### Usage in Node.js

In ESM code (recommended):

```js
import * as photon from '@7syllable/photon-core';

// Create a simple rectangle
const rect = new photon.models.Rectangle(100, 50);

// Export to SVG
const svg = photon.exporter.toSVG(rect);
```

In CommonJS code:

```js
const photon = require('@7syllable/photon-core');

// Create a simple rectangle
const rect = new photon.models.Rectangle(100, 50);
```

### Usage in Web Browser

Photon does not provide a public CDN build yet. Use a bundler (Vite, Webpack, Parcel) to import from npm:

```js
// main.ts / main.js (bundled by Vite/Webpack)
import * as photon from '@7syllable/photon-core';

const star = new photon.models.Star(5, 50, 25);
document.body.innerHTML = photon.exporter.toSVG(star);
```

Alternatively, you can build a local UMD/ESM bundle and serve it from your app's public folder.

### Optional dependencies

Some models rely on optional libraries:

- Bezier support for `BezierCurve` model: `bezier-js`
- Font support for `Text` model: `opentype.js`

Install via npm and let your bundler include them as needed:

```bash
npm install bezier-js opentype.js
```

### Try it now

Playground (coming soon). In the meantime, try code from the docs:

* [Try It Now](https://mwhite454.github.io/photon/docs/snippets/try-it-now/)
* [Getting started for the browser](https://mwhite454.github.io/photon/docs/snippets/getting-started-browser/)
* [Getting started for Node.js](https://mwhite454.github.io/photon/docs/snippets/getting-started-node/)

## Migrating from Maker.js

Photon maintains API compatibility with Maker.js. To migrate:

1. **Update package name**:
   ```bash
   npm uninstall makerjs
   npm install @7syllable/photon-core
   ```

2. **Update imports**:
   ```js
   // Old (Maker.js)
   import * as makerjs from 'makerjs';
   
   // New (Photon)
   import * as photon from '@7syllable/photon-core';
   ```

3. **Update variable names** (optional but recommended):
   ```js
   // Old
   const rect = new makerjs.models.Rectangle(100, 50);
   const svg = makerjs.exporter.toSVG(rect);
   
   // New
   const rect = new photon.models.Rectangle(100, 50);
   const svg = photon.exporter.toSVG(rect);
   ```

4. **Update global namespace** (if using UMD/browser builds):
   - Old: `window.MakerJs` or `window.makerjs`
   - New: `window.Photon`

All APIs, models, and functionality remain the same. The core library is fully compatible.

## Contributing

There are many ways to contribute to Photon:
* [★ Star Photon on GitHub](https://github.com/mwhite454/photon)
* Submit bugs and feature requests [on GitHub](https://github.com/mwhite454/photon/issues)
* Improve the [documentation](https://mwhite454.github.io/photon/docs/)
* Enhance the [website](https://github.com/mwhite454/photon/tree/gh-pages)
* Add features to the Playground app (coming soon)
* Create a new Photon app, and we will link to it here
* Find TODOs in the [core source code](https://github.com/mwhite454/photon/tree/main/packages/photon/src)
* Create unit tests for the core

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Documentation

The Photon documentation is built with [MkDocs](https://www.mkdocs.org/) using the [shadcn theme](https://mkdocs-shadcn.namuan.tech/).

### Building the documentation

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Build the documentation**:
   ```bash
   cd docs
   mkdocs build
   ```
   
   The built site will be in `docs/site/`.

3. **Serve the documentation locally**:
   ```bash
   cd docs
   mkdocs serve
   ```
   
   Visit [http://localhost:8000](http://localhost:8000) to view the docs. The site will auto-reload when you make changes.

### Deploy to GitHub Pages

```bash
cd docs
mkdocs gh-deploy
```

This builds the documentation and pushes it to the `gh-pages` branch.

### Credits

Photon depends on:
* [bezier-js](https://github.com/Pomax/bezierjs) by Pomax
* [graham_scan](https://github.com/brian3kb/graham_scan_js) by Brian Barnett
* [kdbush](https://github.com/mourner/kdbush) by Vladimir Agafonkin

---

**Original Project**: Maker.js was a Microsoft Garage project. We're grateful to Microsoft and Dan Marshall for creating and open-sourcing this excellent library under the Apache 2.0 license.
