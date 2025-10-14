---
title: Importing Svg Path Data
source: docs/_snippets/importing-svg-path-data.html
---

---
title: SVG path data
---

SVG Path data is the value of the **d** attribute of a **path** element. For example, given this SVG:

```html

```

The path data is:

```html
M 0 100 L 100 100 L 100 0 L 0 0 L 0 100 Z
```

Call [makerjs.importer.fromSVGPathData](/docs/api/modules/makerjs.importer.html#fromsvgpathdata)(pathData) passing your path data string.
This will return a new model.

If your SVG path data contains [Curve commands](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Curve_commands),
these will become [Bezier curves](/docs/advanced-drawing/#Bezier curves) in your model.

#### Advanced options

You may override the default import behavior by calling `makerjs.importer.fromSVGPathData(pathData, options)` and passing an options object.
The options object has these properties:

| property | type | values / effects |
| --- | --- | --- |
| bezierAccuracy | number | The maximum distance between the true curve and the arc approximations. A lower number is more accurate but requires more computation. Using zero is not recommended as it may never finish computing. This number is relative to the unit system of your SVG; so if you are rendering pixels, then 0.5 is accurate to half a pixel. |

Example:

```javascript
var makerjs = require('makerjs');
var pathData = "M 95 35 L 59 35 L 48 0 L 36 35 L 0 35 L 29 56 L 18 90 L 48 69 L 77 90 L 66 56 Z";
var model = makerjs.importer.fromSVGPathData(pathData);
```
