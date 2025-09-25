---
title: "Points"
source: "docs/_snippets/points.html"
id: "makerjs.snippets.points"
summary: "A point is an array with two elements: [x, y]. Maker.js uses a Cartesian coordinate system where x increases left→right and y increases bottom→top. Negative values are allowed."
tags: []
---
A point is an array with two elements: [x, y]. Maker.js uses a Cartesian coordinate system where x increases left→right and y increases bottom→top. Negative values are allowed.

Example:

```javascript
var p = [0, 0];
```

Note: SVG's coordinate system differs (y increases top→bottom), but Maker.js handles conversion for rendering.