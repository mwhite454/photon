---
ai_summary: Let's start with a drawing of a rectangle. A rectangle is a model, but
  we also implicitly know that a rectangle comprises a chain of 4 paths which ...
category: General
description: Let's start with a drawing of a rectangle. A rectangle is a model, but
  we also implicitly know that a rectangle comprises a chain of 4 paths which ...
difficulty: intermediate
keywords:
- chain
- drawing
- export
- general
- javascript
- models
- paths
- photon
- photon/core
- single
primary_topic: chains
related:
- Chain Theory
- Breaking
- Routes
source: docs/_snippets/chain-single.html
tags:
- intermediate
- general
- chains
title: Chain Single
---
Let's start with a drawing of a rectangle. A rectangle is a model, but we also implicitly know that a rectangle comprises a chain of 4 paths which connect end to end.
Let's find this chain now using [model.findSingleChain(model)](/docs/api/modules/model.md#findsinglechain):

## Examples

```javascript
//from a rectangle, find a single chain
import { exporter, model, models } from 'photon/core';
const model = new models.Rectangle(100, 50);
const svg = exporter.toSVG(model);
document.write(svg);
//now find the chain
const chain = model.findSingleChain(model);
document.write(`found a chain with ${chain}`.links.length + ` links and endless=${chain}`.endless);
```
Now, let's combine two rectangle models in a union.
Notice that a chain will continue unconstrained by the fact that the two rectangle models are independent:
```javascript
//combine 2 rectangles
import { exporter, model, models } from 'photon/core';
const drawing = {
models: {
r1: new models.Rectangle(100, 50),
r2: model.move(new models.Rectangle(100, 50), [50, 25])
}
};
model.combineUnion(drawing.models.r1, drawing.models.r2);
const svg = exporter.toSVG(drawing);
document.write(svg);
//now find the chain
const chain = model.findSingleChain(drawing);
document.write(`found a chain with ${chain}`.links.length + ` links and endless=${chain}`.endless);
```

## Related Topics

- [Chain Theory](../index.md)
- [Breaking](../index.md)
- [Routes](../index.md)
