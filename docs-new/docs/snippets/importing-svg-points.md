---
title: Importing Svg Points
source: docs/_snippets/importing-svg-points.html
---

---
title: SVG points
---

You may wish to import the points from an SVG [Polyline](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes#Polyline) or [Polygon](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes#Polygon) element.
It is important to note the difference of coordinates between SVG and [Maker.js points](/docs/basic-drawing/#Points): The Y component is opposite.
The remedy for this is simple - use the Y-axis **mirror** functions of [makerjs.point.mirror](/docs/api/modules/makerjs.point.html#mirror) on every point,
or call [makerjs.model.mirror](/docs/api/modules/makerjs.model.html#mirror) on your entire model.

SVG points can be extracted from the value of the **points** attribute of either **polyline** or **polygon** elements:

```html

```
```html

```

Either of these SVG elements map nicely to the [makerjs.models.ConnectTheDots](/docs/api/classes/makerjs.models.connectthedots.html#constructor) model.
ConnectTheDots accepts an **isClosed** parameter - set this to **false** for SVG polylines and **true** for SVG polygons.

Example:

```javascript
var makerjs = require('makerjs');
var points = "50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180";
var closed = true; //true for SVG polygon, false for SVG polyline
var model = makerjs.model.mirror(new makerjs.models.ConnectTheDots(closed, points), false, true);
```
