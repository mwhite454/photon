---
ai_summary: You may also wish to find paths that are not part of a chain. This will
  require you to pass a callback function
category: Working with Chains
description: You may also wish to find paths that are not part of a chain. This will
  require you to pass a callback function
difficulty: intermediate
keywords:
- chains
- export
- javascript
- models
- paths
- svg
- working-with-chains
prerequisites:
- Basic Drawing
- Intermediate Drawing
primary_topic: chains
related:
- Breaking
- Routes
- Basic Drawing
- Intermediate Drawing
- Chain Theory
source: docs/_snippets/chains.html
tags:
- intermediate
- working-with-chains
- chains
title: Chains
---
You may also wish to find paths that are **not** part of a chain. This will require you to pass a callback function
which will be passed these three parameters:

* chains: an array of chains that were found. (both endless and non-endless)
* loose: an array of paths that did not connect in a chain.
* layer: the layer name containing the above.

This function will get called once for each logical layer. Since our example has no layers (logically it's all one "null" layer), our function will only get called once.
```javascript
import { exporter, model, models, paths } from '@7syllable/photon-core';
//combine a rectangle and an oval, add some other paths
function example(origin) {
this.models = {
rect: new models.Rectangle(100, 50),
oval: model.move(new models.Oval(100, 50), [50, 25])
};
this.origin = origin;
}
const x = new example();
model.combineUnion(x.models.rect, x.models.oval);
x.paths = {
line1: new paths.Line([150, 10], [220, 10]),
line2: new paths.Line([220, 50], [220, 10]),
line3: new paths.Line([220, 75], [260, 35]),
circle: new paths.Circle([185, 50], 15)
};
const svg = exporter.toSVG(x);
document.write(svg);
//find chains and output the results
model.findChains(x, (chains, loose, layer) => {
document.write(`found ${chains}`.length + ` chain(s) and ${loose}`.length + ` loose path(s) on layer ${layer}`);
});
```

## Related Topics

- [Breaking](../index.md)
- [Routes](../index.md)
- [Basic Drawing](../index.md)
- [Intermediate Drawing](../index.md)
- [Chain Theory](../index.md)
