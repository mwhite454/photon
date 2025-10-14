---
title: Intersection
source: docs/_snippets/intersection.html
---

---
title: Intersection
---

You can find the point(s) of intersection between two paths using [makerjs.path.intersection](/docs/api/modules/makerjs.path.html#intersection).
If the paths do not intersect, this function will return null. Otherwise, it will return an [object with a property named intersectionPoints](/docs/api/interfaces/makerjs.ipathintersection.html#content) which is an array of points.
Additionally, if either path was an arc or circle, this object will contain the angles at which an intersection occurred.

Intersection examples:

```javascript
//line-line intersection
var makerjs = require('makerjs');
var model = {
paths: {
line1: new makerjs.paths.Line([0, 0], [20, 10]),
line2: new makerjs.paths.Line([2, 10], [50, 2])
}
};
var int = makerjs.path.intersection(model.paths.line1, model.paths.line2);
if (int) {
var p = int.intersectionPoints[0];
var id = JSON.stringify(makerjs.point.rounded(p, 0.01));
model.paths[id] = new makerjs.paths.Circle(p, 1);
}
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
```javascript
//circle-circle intersection
var makerjs = require('makerjs');
var model = {
paths: {
circle1: new makerjs.paths.Circle([0, 10], 20),
circle2: new makerjs.paths.Circle([20, 0], 20)
}
};
var int = makerjs.path.intersection(model.paths.circle1, model.paths.circle2);
if (int) {
int.intersectionPoints.forEach(
function(p, i) {
var id = JSON.stringify(makerjs.point.rounded(p, 0.01)) + ' intersects circle1 at ' + makerjs.round(int.path1Angles[i], .01) + ' circle2 at ' + makerjs.round(int.path2Angles[i], .01);
model.paths[id] = new makerjs.paths.Circle(p, 1);
}
);
}
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
```javascript
//line-arc intersection
var makerjs = require('makerjs');
var model = {
paths: {
line1: new makerjs.paths.Line([0, 0], [20, 10]),
arc1: new makerjs.paths.Arc([12, 0], 10, 45,215)
}
};
var int = makerjs.path.intersection(model.paths.line1, model.paths.arc1);
if (int) {
int.intersectionPoints.forEach(
function(p, i) {
var id = JSON.stringify(makerjs.point.rounded(p, 0.01)) + ' arc1 at ' + makerjs.round(int.path2Angles[i], .01);
model.paths[id] = new makerjs.paths.Circle(p, 1);
}
);
}
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
