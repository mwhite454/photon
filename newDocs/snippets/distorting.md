---
title: "Distorting"
source: "docs/_snippets/distorting.html"
id: "makerjs.snippets.distorting"
summary: "Distort points with `makerjs.point.distort`. Distort a path with `makerjs.path.distort(path, scaleX, scaleY)` — returns a new object (type depends on path type). Distort a model with `makerjs.model.distort(model, scaleX, scaleY)`."
tags: []
---
Distort points with `makerjs.point.distort`. Distort a path with `makerjs.path.distort(path, scaleX, scaleY)` — returns a new object (type depends on path type). Distort a model with `makerjs.model.distort(model, scaleX, scaleY)`.

```javascript
var circle = new makerjs.paths.Circle(50);
var distortedLine = makerjs.path.distort(new makerjs.paths.Line([-50,-50],[50,50]), 4, 1.5);
var ellipse = makerjs.path.distort(circle, 4, 1.5);
```