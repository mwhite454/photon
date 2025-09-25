---
title: "Basic rendering in SVG"
source: "docs/_snippets/basic-rendering-in-svg.html"
id: "makerjs.snippets.basic-rendering-in-svg"
summary: "Call `makerjs.exporter.toSVG` and pass your path or an array of paths."
tags: []
---
Call `makerjs.exporter.toSVG` and pass your path or an array of paths.

Example — render a line:

```javascript
var makerjs = require('makerjs');

var line = {
  type: 'line',
  origin: [0, 0],
  end: [50, 50]
};

var svg = makerjs.exporter.toSVG(line);
document.write(svg);
```

Example — render a line and a circle:

```javascript
var circle = {
  type: 'circle',
  origin: [0,0],
  radius: 50
};

var pathArray = [ line, circle ];
var svg = makerjs.exporter.toSVG(pathArray);
document.write(svg);
```
