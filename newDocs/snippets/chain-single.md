---
title: "Find a single chain"
source: "docs/_snippets/chain-single.html"
id: "makerjs.snippets.chain-single"
summary: "Use `makerjs.model.findSingleChain(model)` to return one chain from a model. For example, a rectangle comprises a chain of 4 paths:"
tags: []
---
Use `makerjs.model.findSingleChain(model)` to return one chain from a model. For example, a rectangle comprises a chain of 4 paths:

```javascript
var makerjs = require('makerjs');
var model = new makerjs.models.Rectangle(100, 50);
var chain = makerjs.model.findSingleChain(model);
console.log('found a chain with ' + chain.links.length + ' links and endless=' + chain.endless);
```

`findSingleChain` will also work on combined models (e.g., after `makerjs.model.combineUnion`).