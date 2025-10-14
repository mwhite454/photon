---
title: Intersection
source: docs/_snippets/intersection.html
---

You can find the point(s) of intersection between two paths using [path.intersection](/docs/api/modules/path.md#intersection).
If the paths do not intersect, this function will return null. Otherwise, it will return an [object with a property named intersectionPoints](/docs/api/interfaces/makerjs.ipathintersection.md#content) which is an array of points.
Additionally, if either path was an arc or circle, this object will contain the angles at which an intersection occurred.

Intersection examples:

```javascript
//line-line intersection
import { exporter, path, paths, point } from 'photon/core';
const model = {
paths: {
line1: new paths.Line([0, 0], [20, 10]),
line2: new paths.Line([2, 10], [50, 2])
}
};
const int = path.intersection(model.paths.line1, model.paths.line2);
if (int) {
const p = int.intersectionPoints[0];
const id = JSON.stringify(point.rounded(p, 0.01));
model.paths[id] = new paths.Circle(p, 1);
}
const svg = exporter.toSVG(model);
document.write(svg);
```
```javascript
//circle-circle intersection
import { exporter, path, paths, point } from 'photon/core';
const model = {
paths: {
circle1: new paths.Circle([0, 10], 20),
circle2: new paths.Circle([20, 0], 20)
}
};
const int = path.intersection(model.paths.circle1, model.paths.circle2);
if (int) {
int.intersectionPoints.forEach(
(p, i) => {
const id = JSON.stringify(point.rounded(p, 0.01)) + ` intersects circle1 at ${makerjs}`.round(int.path1Angles[i], .01) + ` circle2 at ${makerjs}`.round(int.path2Angles[i], .01);
model.paths[id] = new paths.Circle(p, 1);
}
);
}
const svg = exporter.toSVG(model);
document.write(svg);
```
```javascript
//line-arc intersection
import { exporter, path, paths, point } from 'photon/core';
const model = {
paths: {
line1: new paths.Line([0, 0], [20, 10]),
arc1: new paths.Arc([12, 0], 10, 45,215)
}
};
const int = path.intersection(model.paths.line1, model.paths.arc1);
if (int) {
int.intersectionPoints.forEach(
(p, i) => {
const id = JSON.stringify(point.rounded(p, 0.01)) + ` arc1 at ${makerjs}`.round(int.path2Angles[i], .01);
model.paths[id] = new paths.Circle(p, 1);
}
);
}
const svg = exporter.toSVG(model);
document.write(svg);
```
