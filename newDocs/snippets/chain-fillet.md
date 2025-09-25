---
title: "Chain fillet"
source: "docs/_snippets/chain-fillet.html"
id: "makerjs.snippets.chain-fillet"
summary: "Add fillets to all joints in a chain with `makerjs.chain.fillet(chain, filletRadius)`. The function modifies the chain paths to accommodate arcs and returns a model of the fillets which you should add to your tree."
tags: []
---
Add fillets to all joints in a chain with `makerjs.chain.fillet(chain, filletRadius)`. The function modifies the chain paths to accommodate arcs and returns a model of the fillets which you should add to your tree.

Basic example:

```javascript
var makerjs = require('makerjs');
var model = {
  paths: {
    "0": new makerjs.paths.Line([0,0],[100,0]),
    "1": new makerjs.paths.Line([100,0],[100,100]),
    "2": new makerjs.paths.Line([100,100],[200,100])
  },
  models: {}
};
var chain = makerjs.model.findSingleChain(model);
var filletsModel = makerjs.chain.fillet(chain, 10);
model.models.fillets = filletsModel;
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```

Advanced examples show how to fillet interior chains of a truss by skipping the longest perimeter chain and filleting the rest.
