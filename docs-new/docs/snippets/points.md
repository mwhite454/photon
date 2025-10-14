---
title: Points
source: docs/_snippets/points.html
---

A point is represented by an array with 2 elements. The first element is x, the second element is y.

```javascript
const p = [0, 0];
```

#### Coordinates

Maker.js uses the same coordinate system from basic mathematics and traditional drafting,
where x values increase from left to right, and y values increase from bottom to top. Negative values are allowed.

Note that the SVG coordinate system is slightly different (Y values increase from top to bottom, and negative values do not appear),
but Maker.js will handle that for us automatically.
