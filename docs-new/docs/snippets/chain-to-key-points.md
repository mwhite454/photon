---
title: Chain To Key Points
source: docs/_snippets/chain-to-key-points.html
---

---
title: Chain to key points
---
If you want a "low poly" representation of a chain, call
[makerjs.model.toKeyPoints(chain, [optional] maxArcFacet)](/docs/api/modules/makerjs.chain.html#tokeypoints)
passing your chain, and the maximum length of facets on arcs & circles:
```javascript
//convert a round rectangle to key points
var makerjs = require('makerjs');
var rect = new makerjs.models.RoundRectangle(100, 50, 10);
var chain = makerjs.model.findSingleChain(rect);
var keyPoints = makerjs.chain.toKeyPoints(chain, 5);
var model = {
models: {
rect: rect,
dots: new makerjs.models.Holes(1, keyPoints)
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
