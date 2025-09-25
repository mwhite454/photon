---
title: "Chain to points"
source: "docs/_snippets/chain-to-points.html"
id: "makerjs.snippets.chain-to-points"
summary: "Get points evenly spaced along a chain with `makerjs.chain.toPoints(chain, distance)`. Example:"
tags: []
---
Get points evenly spaced along a chain with `makerjs.chain.toPoints(chain, distance)`. Example:

```javascript
var makerjs = require('makerjs');
var rect = new makerjs.models.RoundRectangle(100, 50, 10);
var chain = makerjs.model.findSingleChain(rect);
var spacing = 10;
var keyPoints = makerjs.chain.toPoints(chain, spacing);
```

Hint: use `chain.pathLength` to compute spacing that divides the chain evenly.