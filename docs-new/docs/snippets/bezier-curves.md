---
title: Bezier Curves
source: docs/_snippets/bezier-curves.html
---

---
title: Bezier curves
---

Bezier curves are a fascinating and complex topic too large to cover here, it is recommended that you visit [A Primer on Bezier Curves by Mike Kamermans (aka Pomax)](//pomax.github.io/bezierinfo/).
Maker.js depends on Pomax's [Bezier.js](//pomax.github.io/bezierjs/) which is a vital site to visit for understanding Bezier curve functionality in depth.

It is important to understand how Maker.js manages the complexity of these mathematical wonders. For this explanation, we will start at the end and work our way backwards to the beginning of the process.

The final representation of a Bezier curve in Maker.js is a model containing a series of circular arc paths which closely approximate the curve.
Closer approximation means more calculation time and more arcs.

Prior to generating the arcs, the curve is broken down into a series of sub-curves. It is from the sub-curves that the arcs are generated. Each sub-curve is guaranteed to not have an "S" shape so that it more closely resembles a circular arc.
The sub-curves are also broken at their rectangular "boundary box" points so that we are guaranteed that the boundary box tangent points are truly points on the curve and not approximations.
In the Bezier.js terminology, these breaking points are known as [extrema](//pomax.github.io/bezierjs/#extrema).

Now we are at the beginning of the process, where you call [makerjs.models.BezierCurve](/docs/api/classes/makerjs.models.beziercurve.html#content) with the **new** operator.
You can create both quadratic and cubic Bezier curves. For either type, you may optionally pass the accuracy - the maximum distance between the true curve and the arc approximations.
The default accuracy coefficient in Maker.js will produce an accurate and visually smooth curve in a reasonable calculation timeframe.

---

Create a quadratic Bezier curve in by passing an array of three points - an origin point, a control point, and an end point:

```javascript
//create a quadratic Bezier curve
var m = require('makerjs');
var points = [[0, 100], [0, 0], [100, 0]];
var curve1 = new m.models.BezierCurve(points);
curve1.origin = [20, 20];
//more accurate
var curve2 = new m.models.BezierCurve(points, 0.01);
var model = {
models: {
c1: curve1, c2: curve2
}
};
var svg = m.exporter.toSVG(model);
document.write(svg);
```


---

Create a cubic Bezier curve in by passing an array of four points - an origin point, a first control point (relating to the origin point), a second control point (relating to the end point), and an end point:

```javascript
//create a cubic Bezier curve
var m = require('makerjs');
var points = [[0, 0], [50, 50], [50, -50], [100, 0]];
var curve1 = new m.models.BezierCurve(points);
curve1.origin = [0, 20];
//more accurate
var curve2 = new m.models.BezierCurve(points, 0.1);
var model = {
models: {
c1: curve1, c2: curve2
}
};
var svg = m.exporter.toSVG(model);
document.write(svg);
```


---

Be sure to Play these examples, then click "show path names" to see the arcs representing the curve.
