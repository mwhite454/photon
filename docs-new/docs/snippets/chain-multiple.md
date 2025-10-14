---
title: Chain Multiple
source: docs/_snippets/chain-multiple.html
---

---
title: Find multiple chains
---
You can find multiple chains by calling [makerjs.model.findChains(model)](/docs/api/modules/makerjs.model.html#findchains),
which will return an array of chains, sorted by largest to smallest on the **pathLength** property.
We can find 2 chains in this drawing with 2 rectangles:
```javascript
//2 concentric rectangles
var makerjs = require('makerjs');
var model = {
models: {
outer: makerjs.model.center(new makerjs.models.Rectangle(60, 30)),
inner: makerjs.model.center(new makerjs.models.Rectangle(45, 15))
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
//now find the chains
var chains = makerjs.model.findChains(model);
document.write('found ' + chains.length + ' chains');
```

#### Containment

Instead of a "flat" array, we can see the containment of chains by also passing an `{ contain: true }` object to
[makerjs.model.findChains(model, options)](/docs/api/modules/makerjs.model.html#findchains):
```javascript
//2 concentric rectangles
var makerjs = require('makerjs');
var model = {
models: {
outer: makerjs.model.center(new makerjs.models.Rectangle(60, 30)),
inner: makerjs.model.center(new makerjs.models.Rectangle(45, 15))
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
//now find the contained chains
var chains = makerjs.model.findChains(model, { contain: true });
document.write('found ' + chains.length + ' chain(s) ');
document.write('which contains ' + chains[0].contains.length + ' chain(s)');
```

#### Alternating flow directions

There are scenarios where you may need contained chains to flow in the opposite direction of their containing chain.
*This will require extra computation on each chain to test its direction.*
If you need this, use `{ contain: { alternateDirection: true } }` in your options. In the returned chains array,
the outmost chains will flow clockwise:
```javascript
//2 concentric rectangles
var makerjs = require('makerjs');
var model = {
models: {
outer: makerjs.model.center(new makerjs.models.Rectangle(60, 30)),
inner: makerjs.model.center(new makerjs.models.Rectangle(45, 15))
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
//now find the contained chains with alternating direction
var chains = makerjs.model.findChains(model, { contain: { alternateDirection: true } });
document.write('found ' + chains.length + ' chain(s)
');
document.write('which contains ' + chains[0].contains.length + ' chain(s)
');
document.write('outer is clockwise:' + makerjs.measure.isChainClockwise(chains[0]) + '
');
document.write('inner is clockwise:' + makerjs.measure.isChainClockwise(chains[0].contains[0]));
```

#### Isolating within layers

You can find chains within layers by passing `{ byLayers: true }` in your options.
This will not return an array, but it will return an object map with keys being the layer names, and values being the
array of chains for that layer:
```javascript
//find chains on layers
var makerjs = require('makerjs');
var c1 = new makerjs.paths.Circle(1);
var c2 = new makerjs.paths.Circle(1);
c2.origin = [3, 0];
c1.layer = 'red';
c2.layer = 'blue';
var model = { paths: { c1: c1, c2: c2 } };
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
//now find the chains by layer
var chains = makerjs.model.findChains(model, { byLayers: true });
document.write('found ' + chains['red'].length + ' chain(s) on red layer
');
document.write('found ' + chains['blue'].length + ' chain(s) on blue layer');
```
