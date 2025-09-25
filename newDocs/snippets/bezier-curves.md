---
title: "Bezier curves"
source: "docs/_snippets/bezier-curves.html"
id: "makerjs.snippets.bezier-curves"
summary: "Bezier curves are a complex topic; see A Primer on Bezier Curves by Pomax for background. Maker.js uses Pomax's Bezier.js and approximates Bezier curves as a series of circular arc paths."
tags: []
---
Bezier curves are a complex topic; see A Primer on Bezier Curves by Pomax for background. Maker.js uses Pomax's Bezier.js and approximates Bezier curves as a series of circular arc paths.

Maker.js breaks curves into sub-curves (no 'S' shapes) and approximates each with arcs — more arcs gives closer approximation at a cost of calculation time.

Examples (quadratic and cubic):

Quadratic (3 points):

```javascript
var m = require('makerjs');
var points = [[0, 100], [0, 0], [100, 0]];
var curve1 = new m.models.BezierCurve(points);
curve1.origin = [20, 20];

var model = { models: { c1: curve1 } };
var svg = m.exporter.toSVG(model);
document.write(svg);
```

Cubic (4 points):

```javascript
var m = require('makerjs');
var points = [[0,0],[50,50],[50,-50],[100,0]];
var curve1 = new m.models.BezierCurve(points);
curve1.origin = [0,20];
var model = { models: { c1: curve1 } };
var svg = m.exporter.toSVG(model);
document.write(svg);
```

Play the examples and use "show path names" in the Playground to see arc approximations.
