---
title: "Find multiple chains"
source: "docs/_snippets/chain-multiple.html"
id: "makerjs.snippets.chain-multiple"
summary: "You can find multiple chains with `makerjs.model.findChains(model)`. It returns an array of chains sorted by `pathLength` (largest to smallest). Example: two concentric rectangles."
tags: []
---
You can find multiple chains with `makerjs.model.findChains(model)`. It returns an array of chains sorted by `pathLength` (largest to smallest). Example: two concentric rectangles.

```javascript
// 2 concentric rectangles
var makerjs = require('makerjs');

var model = {
  models: {
    outer: makerjs.model.center(new makerjs.models.Rectangle(60, 30)),
    inner: makerjs.model.center(new makerjs.models.Rectangle(45, 15))
  }
};

var svg = makerjs.exporter.toSVG(model);

// find chains
var chains = makerjs.model.findChains(model);
console.log('found ' + chains.length + ' chains');
```

You can also pass options: `{ contain: true }` to get containment relationships, `{ contain: { alternateDirection: true } }` to alternate directions of contained chains, and `{ byLayers: true }` to get chains grouped by layer.