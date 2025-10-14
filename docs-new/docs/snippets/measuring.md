---
title: Measuring
source: docs/_snippets/measuring.html
---

Browse to the [makerjs.measure](../api/modules/measure.md) module documentation to see all functions related to measuring.

To get the bounding rectangle of a path or a model, use:

* measure.pathExtents(path: object)
* model.modelExtents(model: object)

These functions return a measurement object with **high** and **low** points.

Measure path example:

```javascript
//render an arc, and a measurement reactangle around it
import { exporter, measure, model, models, paths } from 'photon/core';
const arc = new paths.Arc([0, 0], 100, 45, 135);
const m = measure.pathExtents(arc);
console.log('measurement:');
console.log(m);
const totalWidth = m.high[0] - m.low[0];
const totalHeight = m.high[1] - m.low[1];
const measureRect = new models.Rectangle(totalWidth, totalHeight);
measureRect.origin = m.low;
const model = {
paths: {
arc: arc
},
models: {
measureRect: measureRect
}
};
const svg = exporter.toSVG(model, {useSvgPathOnly: false});
document.write(svg);
```

Measure model example:

```javascript
//render an oval, and a measurement reactangle around it
import { exporter, measure, model, models, paths } from 'photon/core';
const oval = new models.Oval(100, 20);
model.rotate(oval, 30);
const m = measure.modelExtents(oval);
console.log('measurement:');
console.log(m);
const totalWidth = m.high[0] - m.low[0];
const totalHeight = m.high[1] - m.low[1];
const measureRect = new models.Rectangle(totalWidth, totalHeight);
measureRect.origin = m.low;
const model = {
models: {
measureRect: measureRect,
oval: oval
}
};
const svg = exporter.toSVG(model, {useSvgPathOnly: false});
document.write(svg);
```
