---
title: Zeroing And Centering
source: docs/_snippets/zeroing-and-centering.html
---

To move a model so that its bottom and/or left edges are on the x & y axes, use [model.zero](/docs/api/modules/model.md#zero).
This function accepts 2 boolean parameters: zeroOnXAxis, zeroOnYAxis. If you do not pass any parameters, it will zero on both axes.

```javascript
//zero a model
import { exporter, model, models, paths } from 'photon/core';
const model = {
models: {
crosshairs: {
paths: {
h: new paths.Line([-5, 0], [5, 0]),
v: new paths.Line([0, -5], [0, 5])
}
},
nut: {
models: {
polygon: new models.Polygon(6, 40)
},
paths: {
inner: new paths.Circle(20)
}
}
}
};
model.zero(model.models.nut);
const svg = exporter.toSVG(model);
document.write(svg);
```

To move a model so that it is centered on on the x & y axes, use [model.center](/docs/api/modules/model.md#center).
This function accepts 2 boolean parameters: centerOnXAxis, centerOnYAxis. If you do not pass any parameters, it will center on both axes.

```javascript
//center a couple of models
import { exporter, model, models, paths } from 'photon/core';
const model = {
models: {
crosshairs: {
paths: {
h: new paths.Line([-5, 0], [5, 0]),
v: new paths.Line([0, -5], [0, 5])
}
},
box: {
models: {
outer: new models.Rectangle(60, 30),
inner: new models.Oval(45, 15)
}
}
}
};
const shortcut = model.models.box.models;
model.center(shortcut.outer);
model.center(shortcut.inner);
const svg = exporter.toSVG(model);
document.write(svg);
```
