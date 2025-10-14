---
title: Rotating
source: docs/_snippets/rotating.html
---

To rotate a single point, see [point.fromPolar](../api/modules/point.md#frompolar)
and [point.rotate](../api/modules/point.md#rotate) depending on what you are trying to achieve.

You can rotate paths and models with these functions:

* [path.rotate](../api/modules/path.md#rotate)(path: object, angleInDegrees: number, rotationOrigin: point)
* [model.rotate](../api/modules/model.md#rotate)(model: object, angleInDegrees: number, rotationOrigin: point)

Each of these functions return the original object, so that we can "chain" on the same line of code.

Rotate path example:

```javascript
//render a rotated line
import { exporter, model, models, path, paths, point } from 'photon/core';
const line1 = new paths.Line([0, 0], [100, 0]);
const line2 = new paths.Line([0, 0], [100, 0]);
const paths = [line1, path.rotate(line2, -30, [100, 0])];
const svg = exporter.toSVG(paths);
document.write(svg);
```

Rotate model example:

```javascript
//render a rotated rectangle
import { exporter, model, models, path, paths, point } from 'photon/core';
const rect1 = new models.Rectangle(40, 80);
model.rotate(rect1, 45, [0, 0]);
const svg = exporter.toSVG(rect1);
document.write(svg);
```
