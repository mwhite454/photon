---
title: Breaking
source: docs/_snippets/breaking.html
---

---
title: Breaking paths
---
You can break paths into two pieces if you have a point that lies on the path (from an intersection, for example) by using [makerjs.path.breakAtPoint](/docs/api/modules/makerjs.path.html#breakatpoint).
This function will change the path that you pass it, so that it is broken at that point, and it will return a new path object which is the other broken piece:
```javascript
//break a path in two
var makerjs = require('makerjs');
var model = {
paths: {
arc: new makerjs.paths.Arc([0, 0], 50, 0, 180)
}
};
var arc2 = makerjs.path.breakAtPoint(model.paths.arc, [0, 50]);
makerjs.model.moveRelative(arc2, [-10, 0]);
model.paths.arc2 = arc2;
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
For Circle, the original path will be converted in place to an Arc, and null is returned.
