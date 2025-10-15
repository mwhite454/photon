---
ai_summary: You can find multiple chains by calling model.findChains(model),
category: General
description: You can find multiple chains by calling model.findChains(model),
difficulty: intermediate
keywords:
- chain
- drawing
- export
- general
- javascript
- models
- multiple
- paths
- photon
- photon/core
primary_topic: chains
related:
- Chain Theory
- Breaking
- Routes
source: docs/_snippets/chain-multiple.html
tags:
- intermediate
- general
- chains
title: Chain Multiple
---
You can find multiple chains by calling [model.findChains(model)](../api/modules/core_model.html#findchains),
which will return an array of chains, sorted by largest to smallest on the **pathLength** property.
We can find 2 chains in this drawing with 2 rectangles:

## Examples

```javascript
//2 concentric rectangles
import { exporter, model, models, paths } from '@7syllable/photon-core';
const model = {
models: {
outer: model.center(new models.Rectangle(60, 30)),
inner: model.center(new models.Rectangle(45, 15))
}
};
const svg = exporter.toSVG(model);
document.write(svg);
//now find the chains
const chains = model.findChains(model);
document.write(`found ${chains}`.length + ' chains');
```

#### Containment

Instead of a "flat" array, we can see the containment of chains by also passing an `{ contain: true }` object to
[model.findChains(model, options)](../api/modules/core_model.html#findchains):
```javascript
//2 concentric rectangles
import { exporter, model, models, paths } from '@7syllable/photon-core';
const model = {
models: {
outer: model.center(new models.Rectangle(60, 30)),
inner: model.center(new models.Rectangle(45, 15))
}
};
const svg = exporter.toSVG(model);
document.write(svg);
//now find the contained chains
const chains = model.findChains(model, { contain: true });
document.write(`found ${chains}`.length + ' chain(s) ');
document.write(`which contains ${chains}`[0].contains.length + ' chain(s)');
```

#### Alternating flow directions

There are scenarios where you may need contained chains to flow in the opposite direction of their containing chain.
*This will require extra computation on each chain to test its direction.*
If you need this, use `{ contain: { alternateDirection: true } }` in your options. In the returned chains array,
the outmost chains will flow clockwise:
```javascript
//2 concentric rectangles
import { exporter, model, models, paths } from '@7syllable/photon-core';
const model = {
models: {
outer: model.center(new models.Rectangle(60, 30)),
inner: model.center(new models.Rectangle(45, 15))
}
};
const svg = exporter.toSVG(model);
document.write(svg);
//now find the contained chains with alternating direction
const chains = model.findChains(model, { contain: { alternateDirection: true } });
document.write(`found ${chains}`.length + ' chain(s)
');
document.write(`which contains ${chains}`[0].contains.length + ' chain(s)
');
document.write(`outer is clockwise:${makerjs}`.measure.isChainClockwise(chains[0]) + '
');
document.write(`inner is clockwise:${makerjs}`.measure.isChainClockwise(chains[0].contains[0]));
```

#### Isolating within layers

You can find chains within layers by passing `{ byLayers: true }` in your options.
This will not return an array, but it will return an object map with keys being the layer names, and values being the
array of chains for that layer:
```javascript
//find chains on layers
import { exporter, model, models, paths } from '@7syllable/photon-core';
const c1 = new paths.Circle(1);
const c2 = new paths.Circle(1);
c2.origin = [3, 0];
c1.layer = 'red';
c2.layer = 'blue';
const model = { paths: { c1: c1, c2: c2 } };
const svg = exporter.toSVG(model);
document.write(svg);
//now find the chains by layer
const chains = model.findChains(model, { byLayers: true });
document.write(`found ${chains}`['red'].length + ' chain(s) on red layer
');
document.write(`found ${chains}`['blue'].length + ' chain(s) on blue layer');
```

## Related Topics

- [Chain Theory](../index.md)
- [Breaking](../index.md)
- [Routes](../index.md)
