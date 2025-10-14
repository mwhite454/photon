---
title: Path Independence
source: docs/_snippets/path-independence.html
---

---
title: Path independence and Chains
---

All paths in a drawing are atomic elements of either line, arc, or circle. Paths may happen to touch each other or they may not.
When any two paths have the same endpoint, this is called a **chain**. A chain can continue with any number of paths that meet end to end.
If the chain begins and ends at the same point, this is called an **endless chain**.

Chains are an important concept that we will build upon, yet they are not a thing that you specify in your code.
Rather, chains are "found" by Maker.js when it processes your drawing model.
Paths in your drawing model are independent elements which may be added, modified or deleted by you or another developer.
As you work with paths, bear in mind that you are also implicitly working with chains.

```javascript
//render a model that nas no chains
var makerjs = require('makerjs');
var model = {
paths: {
"h1": new makerjs.paths.Line([0, 10], [30, 10]),
"h2": new makerjs.paths.Line([0, 20], [30, 20]),
"v1": new makerjs.paths.Line([10, 0], [10, 30]),
"v2": new makerjs.paths.Line([20, 0], [20, 30])
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
```javascript
//render a model with paths that form a chain
var makerjs = require('makerjs');
var model = {
paths: {
"0": new makerjs.paths.Line([0, 0], [100, 0]),
"1": new makerjs.paths.Line([100, 0], [100, 100]),
"2": new makerjs.paths.Line([100, 100], [200, 100])
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
```javascript
//render a model with paths that form an endless chain
var makerjs = require('makerjs');
var model = {
paths: {
"v": new makerjs.paths.Line([0, 0], [0, 100]),
"h": new makerjs.paths.Line([0, 0], [100, 0]),
"arc":new makerjs.paths.Arc([0, 0], 100, 0, 90)
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
