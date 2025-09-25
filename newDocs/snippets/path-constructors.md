---
title: "Path constructors"
source: "docs/_snippets/path-constructors.html"
id: "makerjs.snippets.path-constructors"
summary: "You can construct paths as plain JS objects or use Maker.js constructors. Maker.js provides constructors for primitive paths:"
tags: []
---
You can construct paths as plain JS objects or use Maker.js constructors. Maker.js provides constructors for primitive paths:

- `makerjs.paths.Line(from, to)`
- `makerjs.paths.Circle(origin, radius)`
- `makerjs.paths.Arc(origin, radius, startAngle, endAngle)`

Example:

```javascript
var line = new makerjs.paths.Line([0,0], [50,50]);
var circle = new makerjs.paths.Circle([0,0], 50);
var arc = new makerjs.paths.Arc([0,0], 25, 0, 90);
```