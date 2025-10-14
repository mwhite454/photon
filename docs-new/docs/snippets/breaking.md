---
title: Breaking
source: docs/_snippets/breaking.html
---

You can break paths into two pieces if you have a point that lies on the path (from an intersection, for example) by using [path.breakAtPoint](/docs/api/modules/path.md#breakatpoint).
This function will change the path that you pass it, so that it is broken at that point, and it will return a new path object which is the other broken piece:
```javascript
//break a path in two
import { exporter, model, path, paths } from 'photon/core';
const model = {
paths: {
arc: new paths.Arc([0, 0], 50, 0, 180)
}
};
const arc2 = path.breakAtPoint(model.paths.arc, [0, 50]);
model.moveRelative(arc2, [-10, 0]);
model.paths.arc2 = arc2;
const svg = exporter.toSVG(model);
document.write(svg);
```
For Circle, the original path will be converted in place to an Arc, and null is returned.
