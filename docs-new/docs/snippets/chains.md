---
title: Chains
source: docs/_snippets/chains.html
---

You may also wish to find paths that are **not** part of a chain. This will require you to pass a callback function
which will be passed these three parameters:

* chains: an array of chains that were found. (both endless and non-endless)
* loose: an array of paths that did not connect in a chain.
* layer: the layer name containing the above.

This function will get called once for each logical layer. Since our example has no layers (logically it's all one "null" layer), our function will only get called once.
```javascript
//combine a rectangle and an oval, add some other paths
const m = require('makerjs');
function example(origin) {
this.models = {
rect: new m.models.Rectangle(100, 50),
oval: m.model.move(new m.models.Oval(100, 50), [50, 25])
};
this.origin = origin;
}
const x = new example();
m.model.combineUnion(x.models.rect, x.models.oval);
x.paths = {
line1: new m.paths.Line([150, 10], [220, 10]),
line2: new m.paths.Line([220, 50], [220, 10]),
line3: new m.paths.Line([220, 75], [260, 35]),
circle: new m.paths.Circle([185, 50], 15)
};
const svg = m.exporter.toSVG(x);
document.write(svg);
//find chains and output the results
m.model.findChains(x, (chains, loose, layer) => {
document.write(`found ${chains}`.length + ` chain(s) and ${loose}`.length + ` loose path(s) on layer ${layer}`);
});
```
