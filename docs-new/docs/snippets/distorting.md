---
title: Distorting
source: docs/_snippets/distorting.html
---

---
title: Distorting
---

To disproportionately scale a simple point, use [makerjs.point.distort](../api/modules/makerjs.point.html#distort).

To disproportionately scale a path, use
[makerjs.path.distort](../api/modules/makerjs.path.html#distort)(path: object, scaleX: number, scaleY: number)
which returns a new object and does not modify the original.
The type of returned object is dependent on the type of path being distorted:

* A line will return a line *IPath* object, since the distortion can be represented with another line.
* An arc will return a BezierCurve *IModel* object, since the distortion is not circular.
* A circle will return an Ellipse *IModel* object, since the distortion is not circular.

Distort path example:

```javascript
//render distorted paths
var makerjs = require('makerjs');
var circle = new makerjs.paths.Circle(50);
var line = new makerjs.paths.Line([-50,-50], [50, 50]);
//a distorted line is a path, so it should be added to paths
var distortedLine = makerjs.path.distort(line, 4, 1.5);
//a distorted circle is a model, so it should be added to models
var ellipse = makerjs.path.distort(circle, 4, 1.5);
var model = {
paths: {
circle: circle,
line: line,
distortedLine: distortedLine
},
models: {
ellipse: ellipse
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```


---

To disproportionately scale a model, use
[makerjs.model.distort](../api/modules/makerjs.model.html#distort)(model: object, scaleX: number, scaleY: number)
which returns a new *IModel* object and does not modify the original.

Distort model example:

```javascript
//render a distorted star
var makerjs = require('makerjs');
var star = new makerjs.models.Star(5, 100);
makerjs.model.rotate(star, 18);
//make the star 4 times wider, and 2 times taller
var wideStar = makerjs.model.distort(star, 4, 2);
var model = {
models: {
star: star,
wideStar: wideStar
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
