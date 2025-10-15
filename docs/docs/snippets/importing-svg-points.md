---
ai_summary: You may wish to import the points from an SVG Polyline or Polygon element.
category: Importing
description: You may wish to import the points from an SVG Polyline or Polygon element.
difficulty: intermediate
keywords:
- drawing
- importing
- javascript
- models
- photon
- photon/core
- points
- svg
prerequisites:
- Basic Drawing
primary_topic: importing
related:
- Basic Drawing
source: docs/_snippets/importing-svg-points.html
tags:
- intermediate
- importing
title: Importing Svg Points
---
You may wish to import the points from an SVG [Polyline](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes#Polyline) or [Polygon](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes#Polygon) element.
It is important to note the difference of coordinates between SVG and [Maker.js points](/docs/basic-drawing/index.md#Points): The Y component is opposite.
The remedy for this is simple - use the Y-axis **mirror** functions of [point.mirror](../api/modules/core_point.html#mirror) on every point,
or call [model.mirror](../api/modules/core_model.html#mirror) on your entire model.

SVG points can be extracted from the value of the **points** attribute of either **polyline** or **polygon** elements:


## Examples

```html

```
```html

```

Either of these SVG elements map nicely to the [models.ConnectTheDots](/docs/api/classes/models.connectthedots.md#constructor) model.
ConnectTheDots accepts an **isClosed** parameter - set this to **false** for SVG polylines and **true** for SVG polygons.

Example:

```javascript
import { model, models, point } from '@7syllable/photon-core';
const points = "50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180";
const closed = true; //true for SVG polygon, false for SVG polyline
const model = model.mirror(new models.ConnectTheDots(closed, points), false, true);
```

## Related Topics

- [Basic Drawing](../index.md)
