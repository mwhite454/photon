---
title: Basic Rendering In Svg
source: docs/_snippets/basic-rendering-in-svg.html
---

---
title: Basic rendering in SVG
---

Call the **makerjs.exporter.toSVG** function and pass your path as a parameter:

```javascript
//renders a line
var makerjs = require('makerjs');
var line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
var svg = makerjs.exporter.toSVG(line);
document.write(svg);
```

You may also call **makerjs.exporter.toSVG** with an array of paths as a parameter:

```javascript
//renders a line and a circle
var makerjs = require('makerjs');
var line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
var circle = {
type: 'circle',
origin: [0, 0],
radius: 50
};
var pathArray = [ line, circle ];
var svg = makerjs.exporter.toSVG(pathArray);
document.write(svg);
```
