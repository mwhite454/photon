---
title: Scaling
source: docs/_snippets/scaling.html
---

To proportionately scale a simple point, use [point.scale](../api/modules/point.md#scale).
To proportionately scale paths and models, use these functions:

* [path.scale](../api/modules/path.md#scale)(path: object, scaleValue: number)
* [model.scale](../api/modules/model.md#scale)(model: object, scaleValue: number)

Each of these functions return the original object, so that we can "chain" on the same line of code.

Scale path example:

```javascript
//render a scaled arc
import { exporter, model, models, path, paths, point } from 'photon/core';
const arc1 = new paths.Arc([0, 0], 25, 0, 90);
const arc2 = new paths.Arc([0, 0], 25, 0, 90);
arc2 = path.scale(arc2, 2);
const svg = exporter.toSVG({ paths: { arc1: arc1, arc2: arc2 }});
document.write(svg);
```

Scale model example:

```javascript
//render a scaled polygon
import { exporter, model, models, path, paths, point } from 'photon/core';
const model = {
models: {
inner: new models.Polygon(6, 40),
outer: model.scale(new models.Polygon(6, 40), 1.7)
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```
