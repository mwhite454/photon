---
title: "Cloning"
source: "docs/_snippets/cloning.html"
id: "makerjs.snippets.cloning"
summary: "Models and paths are plain JS objects and can be cloned. Maker.js provides helpers:"
tags: []
---
Models and paths are plain JS objects and can be cloned. Maker.js provides helpers:

- `makerjs.cloneObject` - clones a model or other object
- `makerjs.path.clone` - clones a path (faster)
- `makerjs.point.clone` - clones a point (faster)

Example: clone and rotate many copies of a toothed element:

```javascript
var makerjs = require('makerjs');
function sawtooth(numTeeth, r1, rd, offset) { /* ... */ }
var tooth = new sawtooth(30, 100, 20, 10);
for (var i = 0; i < 30; i++) {
  var clone = makerjs.cloneObject(tooth);
  makerjs.model.rotate(clone, (360/30) * i, [0,0]);
  wheel.models[i] = clone;
}
```