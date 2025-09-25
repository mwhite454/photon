---
title: "Layout on a chain"
source: "docs/_snippets/layout-on-chain.html"
id: "makerjs.snippets.layout-on-chain"
summary: "Similar to [layout on a path](/docs/advanced-drawing/#Layout on a path), you can use a chain as a layout guide for a row of child models within a model. Call `makerjs.layout.childrenOnChain(parentModel: Model, onChain: chain)`, the x-axi..."
tags: []
---
Similar to [layout on a path](/docs/advanced-drawing/#Layout on a path), you can use a chain as a layout guide for a row of child models within a model.
Call `makerjs.layout.childrenOnChain(parentModel: Model, onChain: chain)`, the x-axis will be projected onto your onChain:

```javascript
//render a row of squares on a chain

var makerjs = require('makerjs');

var square = new makerjs.models.Square(5);

var row = makerjs.layout.cloneToRow(square, 10, 10);

var curve = new makerjs.models.BezierCurve([0, 0], [33, 25], [66, -25], [100, 0]);

var chain = makerjs.model.findSingleChain(curve);

makerjs.layout.childrenOnChain(row, chain, 0.5, false, true);

var model = {
    models: {
        curve: curve,
        row: row
    }
};

curve.layer = "red";

var svg = makerjs.exporter.toSVG(model);

document.write(svg);
```

There are additional optional parameters to this `makerjs.layout.childrenOnChain`:

- `baseline`: number (default: 0)
- `reversed`: boolean (default: false)
- `contain`: boolean (default: false)
- `rotate`: boolean (default: true)

These behave the same as when laying out on a path. See [layout on a path](/docs/advanced-drawing/#Layout on a path) for explanation.

---

#### Laying out text

Layout on a chain works well with fonts and text. See the playground example `text-on-chain`.
