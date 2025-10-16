---
ai_summary: A fillet can be added between all paths in a chain by calling
category: General
description: A fillet can be added between all paths in a chain by calling
difficulty: advanced
keywords:
- chain
- drawing
- export
- fillet
- general
- javascript
- models
- paths
- photon
- photon/core
primary_topic: chains
related:
- Chain Theory
- Breaking
- Routes
source: docs/_snippets/chain-fillet.html
tags:
- advanced
- general
- chains
title: Chain Fillet
---
A [fillet](/docs/intermediate-drawing/index.md#fillets) can be added between all paths in a chain by calling
[chain.fillet](../api/modules/core_chain.html#fillet) with these parameters:

* chainToFillet: the chain containing paths which will be modified to have fillets at their joints.
* filletRadius: radius of the fillets.

This will modify all of the chain's paths to accomodate an arc between each other, and it will return a new model containing all of the fillets which fit.
This new model should be added into your tree.

##### Basic example

Let's draw a few lines that we know will form a chain:

## Examples

```javascript
//render a model with paths that form a chain
import { chain, exporter, model, paths } from '@7syllable/photon-core';
const model = {
paths: {
"0": new paths.Line([0, 0], [100, 0]),
"1": new paths.Line([100, 0], [100, 100]),
"2": new paths.Line([100, 100], [200, 100])
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```
Next we will find all of the chains in our model. We are expecting that there will only be one chain, so we will just take `chains[0]`.
Then we will add fillets to that chain:
```javascript
//render a model with paths that form a chain
import { chain, exporter, model, paths } from '@7syllable/photon-core';
const model = {
paths: {
"0": new paths.Line([0, 0], [100, 0]),
"1": new paths.Line([100, 0], [100, 100]),
"2": new paths.Line([100, 100], [200, 100])
},
//create a placeholder in the tree for more models
models: {}
};
//find the chain
const chain = model.findSingleChain(model);
//add fillets to the chain
const filletsModel = chain.fillet(chain, 10);
//put the fillets in the tree
model.models.fillets = filletsModel;
const svg = exporter.toSVG(model);
document.write(svg);
```

##### Advanced example

We can improve upon the design of the truss example by adding fillets to the interior shapes. Let's review the truss design:
```javascript
import { chain, exporter, model, models, point } from '@7syllable/photon-core';
//expand a truss wireframe
function trussWireframe(w, h) {
this.models = {
frame: new models.ConnectTheDots(true, [ [0, h], [w, 0], [0, 0] ])
};
const angled = this.models.frame.paths.ShapeLine1;
const bracepoints = [
[0, 0],
point.middle(angled, 1/3),
[w/2 , 0],
point.middle(angled, 2/3)
];
this.models.brace = new models.ConnectTheDots(false, bracepoints);
}
const truss = new trussWireframe(200, 50);
const expansion = model.expandPaths(truss, 3, 1);
//call originate before calling simplify:
model.originate(expansion);
model.simplify(expansion);
const svg = exporter.toSVG(expansion);
document.write(svg);
```
We know that there are 5 chains in this drawing. When we find chains, the array of found chains will be sorted by pathLength (the total length of all paths in each chain),
so we know that the first chain represents the outermost perimeter of the drawing. Therefore we will ignore `chains[0]` and create a for...loop beginning at `chains[1]`:
```javascript
import { chain, exporter, model, models, point } from '@7syllable/photon-core';
//fillet all interior chains in the truss
function trussWireframe(w, h) {
this.models = {
frame: new models.ConnectTheDots(true, [ [0, h], [w, 0], [0, 0] ])
};
const angled = this.models.frame.paths.ShapeLine1;
const bracepoints = [
[0, 0],
point.middle(angled, 1/3),
[w/2 , 0],
point.middle(angled, 2/3)
];
this.models.brace = new models.ConnectTheDots(false, bracepoints);
}
const truss = new trussWireframe(200, 50);
const expansion = model.expandPaths(truss, 3, 1);
model.originate(expansion);
model.simplify(expansion);
//find chains
const chains = model.findChains(expansion);
//start at 1 - ignore the longest chain which is the perimeter
for (const i = 1; i < chains.length; i++) {
//save the fillets in the model tree
expansion.models[`fillets${i}`] = chain.fillet(chains[i], 2);
}
const svg = exporter.toSVG(expansion);
document.write(svg);
```

## Related Topics

- [Chain Theory](../index.md)
- [Breaking](../index.md)
- [Routes](../index.md)
