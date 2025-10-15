---
ai_summary: Similar to layout on a path, you can use a chain as a layout guide for
  a row of child models within a model.
category: Layout
description: Similar to layout on a path, you can use a chain as a layout guide for
  a row of child models within a model.
difficulty: advanced
keywords:
- chain
- drawing
- export
- javascript
- layout
- models
- photon
- photon/core
- svg
prerequisites:
- Intermediate Drawing
primary_topic: chains
related:
- Chain Theory
- Routes
- Breaking
- Intermediate Drawing
source: docs/_snippets/layout-on-chain.html
tags:
- advanced
- layout
- chains
title: Layout On Chain
---
Similar to [layout on a path](/docs/advanced-drawing/index.md#Layout on a path), you can use a chain as a layout guide for a row of child models within a model.
Call [layout.childrenOnChain(parentModel: Model, onChain: chain)](../api/modules/core_layout.html#childrenonchain),
the x-axis will be projected onto your onChain:
```javascript
//render a row of squares on a chain
import { exporter, layout, model, models } from '@7syllable/photon-core';
const square = new models.Square(5);
const row = layout.cloneToRow(square, 10, 10);
const curve = new models.BezierCurve([0, 0], [33, 25], [66, -25], [100, 0]);
const chain = model.findSingleChain(curve);
layout.childrenOnChain(row, chain, 0.5, false, true);
const model = {
models: {
curve: curve,
row: row
}
};
curve.layer = "red";
const svg = exporter.toSVG(model);
document.write(svg);
```
There are additional optional parameters to this layout.childrenOnChain:

* **baseline**: number *[default: 0]*
* **reversed**: boolean *[default: false]*
* **contain**: boolean *[default: false]*
* **rotate**: boolean *[default: true]*

These behave the same as when laying out on a path.
See [layout on a path](/docs/advanced-drawing/index.md#Layout on a path) for explanation.

---

#### Laying out text

Layout on a chain works well with fonts and text. [See an example here](/playground/index.md?script=text-on-chain).

## Related Topics

- [Chain Theory](../index.md)
- [Routes](../index.md)
- [Breaking](../index.md)
- [Intermediate Drawing](../index.md)
