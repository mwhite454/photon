---
title: Mirroring
source: docs/_snippets/mirroring.html
---

Use [angle.mirror](../api/modules/angle.md#mirror) to get a mirror of an angle, and
[point.mirror](../api/modules/point.md#mirror) to get a mirror of a simple point.

You can create a mirrored copy of paths and models with the following functions.
The mirroring can occur on the x axis, the y axis, or both.

* [path.mirror](../api/modules/path.md#mirror)(path: object, mirrorX: boolean, mirrorY: boolean)
* [model.mirror](../api/modules/model.md#mirror)(model: object, mirrorX: boolean, mirrorY: boolean)

Each of these functions returns a new object and does not modify the original.

Mirror path example:

```javascript
//render a line mirrored in the x dimension
import { angle, exporter, model, models, path, paths, point } from 'photon/core';
const line1 = new paths.Line([0, 0], [100, 100]);
const line2 = path.mirror(line1, true, false);
const paths = [line1, line2];
const svg = exporter.toSVG(paths);
document.write(svg);
```

Mirror model example:

```javascript
//render a model mirrored in the y dimension
import { angle, exporter, model, models, path, paths, point } from 'photon/core';
const ovalArc1 = new models.OvalArc(45, 135, 50, 10);
const model = {
models: {
ovalArc1: ovalArc1,
ovalArc2: model.mirror(ovalArc1, false, true)
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```

Hint: When creating symmetrical models, it may be easier to create one half, and then use mirror to generate the other half.
