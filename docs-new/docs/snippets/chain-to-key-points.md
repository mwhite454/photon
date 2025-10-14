---
title: Chain To Key Points
source: docs/_snippets/chain-to-key-points.html
---

If you want a "low poly" representation of a chain, call
[model.toKeyPoints(chain, [optional] maxArcFacet)](/docs/api/modules/chain.html#tokeypoints)
passing your chain, and the maximum length of facets on arcs & circles:
```javascript
//convert a round rectangle to key points
import { chain, exporter, model, models } from 'photon/core';
const rect = new models.RoundRectangle(100, 50, 10);
const chain = model.findSingleChain(rect);
const keyPoints = chain.toKeyPoints(chain, 5);
const model = {
models: {
rect: rect,
dots: new models.Holes(1, keyPoints)
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```
