---
title: "Chain to key points"
source: "docs/_snippets/chain-to-key-points.html"
id: "makerjs.snippets.chain-to-key-points"
summary: "Convert a chain to a low-poly representation by using `makerjs.chain.toKeyPoints(chain, maxArcFacet)` where `maxArcFacet` is the maximum facet length used to approximate arcs/circles."
tags: []
---
Convert a chain to a low-poly representation by using `makerjs.chain.toKeyPoints(chain, maxArcFacet)` where `maxArcFacet` is the maximum facet length used to approximate arcs/circles.

```javascript
var makerjs = require('makerjs');
var rect = new makerjs.models.RoundRectangle(100, 50, 10);
var chain = makerjs.model.findSingleChain(rect);
var keyPoints = makerjs.chain.toKeyPoints(chain, 5);
// use keyPoints to create holes or markers
```

The result is an array of points useful for creating cheatsheet-style hole patterns or simplified outlines.