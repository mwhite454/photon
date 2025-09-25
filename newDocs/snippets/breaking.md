---
title: "Breaking paths"
source: "docs/_snippets/breaking.html"
id: "makerjs.snippets.breaking"
summary: "You can break paths into two pieces at a point on the path using `makerjs.path.breakAtPoint(path, point)`."
tags: []
---
You can break paths into two pieces at a point on the path using `makerjs.path.breakAtPoint(path, point)`.

This modifies the original path in place and returns a new path object representing the other piece. For circles, the original may be converted to an arc and `null` is returned.

Example:

```javascript
var makerjs = require('makerjs');

var model = { paths: { arc: new makerjs.paths.Arc([0,0], 50, 0, 180) } };
var arc2 = makerjs.path.breakAtPoint(model.paths.arc, [0,50]);
makerjs.model.moveRelative(arc2, [-10, 0]);
model.paths.arc2 = arc2;
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
