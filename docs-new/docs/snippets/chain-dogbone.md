---
title: Chain Dogbone
source: docs/_snippets/chain-dogbone.html
---

---
title: Chain dogbone
---
A [dogbone fillet](/docs/intermediate-drawing/#Dogbone%20Fillet) can be added between all line paths in a chain by calling
[makerjs.chain.dogbone](/docs/api/modules/makerjs.chain.html#dogbone) with these parameters:

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
```javascript
//make a plus that is cut out from a square
var makerjs = require('makerjs');
var plus = makerjs.model.combineUnion(
makerjs.model.center(new makerjs.models.Rectangle(50, 100)),
makerjs.model.center(new makerjs.models.Rectangle(100, 50))
);
var plus2 = makerjs.cloneObject(plus);
plus2.origin = [150, 0];
var outer = makerjs.model.center(new makerjs.models.Rectangle(150, 150));
var model = {
models: { plus, plus2, outer } //using Shorthand property names :)
}
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
Next, lets find the chains for each plus, and ensure they are clockwise. Then we can add dogbones to the "outside" corners of the plus that is contained within the square,
and to the "inside" corners of the plus that is apart:
```javascript
//make a plus that is cut out from a square
var makerjs = require('makerjs');
var plus1 = makerjs.model.combineUnion(
makerjs.model.center(new makerjs.models.Rectangle(50, 100)),
makerjs.model.center(new makerjs.models.Rectangle(100, 50))
);
var plus2 = makerjs.cloneObject(plus1);
plus2.origin = [150, 0];
var square = makerjs.model.center(new makerjs.models.Square(150));
//find chains for each plus
var chain1 = makerjs.model.findSingleChain(plus1);
var chain2 = makerjs.model.findSingleChain(plus2);
//make sure our chains are clockwise
[chain1, chain2].forEach(chain => {
if (makerjs.measure.isChainClockwise(chain)) makerjs.chain.reverse(chain);
});
//add dogbones for left and right turns
var dogbones1 = makerjs.chain.dogbone(chain1, { left: 5});
var dogbones2 = makerjs.chain.dogbone(chain2, { right: 5});
var model = {
models: { plus1, plus2, square, dogbones1, dogbones2 }
}
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
