---
ai_summary: A dogbone fillet can be added between all line paths in a chain by calling
category: General
description: A dogbone fillet can be added between all line paths in a chain by calling
difficulty: intermediate
keywords:
- chain
- dogbone
- drawing
- export
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
source: docs/_snippets/chain-dogbone.html
tags:
- intermediate
- general
- chains
title: Chain Dogbone
---
A [dogbone fillet](/docs/intermediate-drawing/index.md#dogbone%20fillet) can be added between all line paths in a chain by calling
[chain.dogbone](../api/modules/core_chain.html#dogbone) with these parameters:

* chainToFillet: the chain containing paths which will be modified to have dogbone fillets at their joints.
* filletRadiusOrFilletRadii: Either of:
  + a number, specifying the radius of the dogbone fillets at every link junction.
  + an object, with these optional properties:
    - left: radius of the dogbone fillets at every left-turning link junction.
    - right: radius of the dogbone fillets at every right-turning link junction.

This will modify all of the chain's line paths to accomodate an arc between each other, and it will return a new model containing all of the dogbone fillets which fit.
This new model should be added into your tree.

##### Left turn and right turn example

The direction of turns are in context of which direction the chain is "flowing". An endless chain might flow either clockwise or counter-clockwise.
Let's decide to make our chain clockwise. Now when we follow the chain's links in a clockwise direction, right turns will be on the "outside" corners of the shape,
and left turns will be on the "inside" corners of the shape. Let's make a shape that is a cutout to represent both the inside and outside of a cut:

## Examples

```javascript
//make a plus that is cut out from a square
import { chain, cloneObject, exporter, measure, model, models } from '@7syllable/photon-core';
const plus = model.combineUnion(
model.center(new models.Rectangle(50, 100)),
model.center(new models.Rectangle(100, 50))
);
const plus2 = cloneObject(plus);
plus2.origin = [150, 0];
const outer = model.center(new models.Rectangle(150, 150));
const model = {
models: { plus, plus2, outer } //using Shorthand property names :)
}
const svg = exporter.toSVG(model);
document.write(svg);
```
Next, lets find the chains for each plus, and ensure they are clockwise. Then we can add dogbones to the "outside" corners of the plus that is contained within the square,
and to the "inside" corners of the plus that is apart:
```javascript
//make a plus that is cut out from a square
import { chain, cloneObject, exporter, measure, model, models } from '@7syllable/photon-core';
const plus1 = model.combineUnion(
model.center(new models.Rectangle(50, 100)),
model.center(new models.Rectangle(100, 50))
);
const plus2 = cloneObject(plus1);
plus2.origin = [150, 0];
const square = model.center(new models.Square(150));
//find chains for each plus
const chain1 = model.findSingleChain(plus1);
const chain2 = model.findSingleChain(plus2);
//make sure our chains are clockwise
[chain1, chain2].forEach(chain => {
if (measure.isChainClockwise(chain)) chain.reverse(chain);
});
//add dogbones for left and right turns
const dogbones1 = chain.dogbone(chain1, { left: 5});
const dogbones2 = chain.dogbone(chain2, { right: 5});
const model = {
models: { plus1, plus2, square, dogbones1, dogbones2 }
}
const svg = exporter.toSVG(model);
document.write(svg);
```

## Related Topics

- [Chain Theory](../index.md)
- [Breaking](../index.md)
- [Routes](../index.md)
