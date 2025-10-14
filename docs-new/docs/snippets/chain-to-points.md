---
title: Chain To Points
source: docs/_snippets/chain-to-points.html
---

To get points consistently spaced along a chains, call
[model.toPoints(chain, distance)](/docs/api/modules/chain.md#topoints)
passing your chain, and the distance between points:
```javascript
//convert a round rectangle to points
import { chain, exporter, model, models } from 'photon/core';
const rect = new models.RoundRectangle(100, 50, 10);
const chain = model.findSingleChain(rect);
const spacing = 10;
const keyPoints = chain.toPoints(chain, spacing);
const model = {
models: {
rect: rect,
dots: new models.Holes(1, keyPoints)
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```
Hint: you can use the **pathLength** property of the chain to make sure your distance divides equally on the entire chain:
```javascript
//convert a round rectangle to points
import { chain, exporter, model, models } from 'photon/core';
const rect = new models.RoundRectangle(100, 50, 10);
const chain = model.findSingleChain(rect);
const minimumSpacing = 10;
const divisions = Math.floor(chain.pathLength / minimumSpacing);
const spacing = chain.pathLength / divisions;
console.log(spacing);
const keyPoints = chain.toPoints(chain, spacing);
const model = {
models: {
rect: rect,
dots: new models.Holes(1, keyPoints)
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```
