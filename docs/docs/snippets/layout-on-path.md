---
ai_summary: You can use a path as a layout guide for a row of child models within
  a model.
category: Layout
description: You can use a path as a layout guide for a row of child models within
  a model.
difficulty: intermediate
keywords:
- export
- javascript
- layout
- models
- path
- paths
- photon
- photon/core
- svg
prerequisites:
- Intermediate Drawing
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
- Intermediate Drawing
source: docs/_snippets/layout-on-path.html
tags:
- paths
- layout
- intermediate
title: Layout On Path
---
You can use a path as a layout guide for a row of child models within a model.
Call [layout.childrenOnPath(parentModel: Model, onPath: Path)](../api/modules/core_layout.html#childrenonpath),
the x-axis will be projected onto your onPath:

## Examples

```javascript
//render a row of squares on a path
import { exporter, layout, models, paths } from '@7syllable/photon-core';
const square = new models.Square(10);
const row = layout.cloneToRow(square, 10, 10);
const arc = new paths.Arc([0, 0], 150, 45, 135);
layout.childrenOnPath(row, arc);
const svg = exporter.toSVG(row);
document.write(svg);
```
To better see how layout is performed, let's show the arc in red and add a triangle to the first square:
```javascript
//render a row of squares on a path
import { exporter, layout, models, paths } from '@7syllable/photon-core';
const square = new models.Square(10);
const row = layout.cloneToRow(square, 10, 10);
//add a triangle to the first model
row.models[0].models = { triangle: new models.ConnectTheDots(true, [ [5, 8], [2, 2], [8, 2] ]) };
const arc = new paths.Arc([0, 0], 150, 45, 135);
layout.childrenOnPath(row, arc);
//show the arc in red
arc.layer = "red";
row.paths = { arc: arc };
const svg = exporter.toSVG(row);
document.write(svg);
```
You may be surprised to see that the first model is upside down and on the right!
This is because the x-axis of the row has been projected onto the arc. The arc starts at 45 degrees and ends at 135 degrees - increasing to the left. The x-axis increases to the right, therefore it appears upside down.
Fortunately, there are additional optional parameters to this layout.childrenOnPath which let you control this behavior:

* **baseline**: number *[default: 0]*
* **reversed**: boolean *[default: false]*
* **contain**: boolean *[default: false]*
* **rotate**: boolean *[default: true]*

#### baseline

This is a number, ususally between 0 and 1, to determine where to place each model "vertically" on the layout path. This is a ratio of the parentModel's total height above the x-axis.
You may also use a negative number or greater than 1 for interesting effects. Use 0.5 to place a model at the y-center:
```javascript
//render a row of squares on a path
import { exporter, layout, models, paths } from '@7syllable/photon-core';
const square = new models.Square(10);
const row = layout.cloneToRow(square, 10, 10);
row.models[0].models = { triangle: new models.ConnectTheDots(true, [ [5, 8], [2, 2], [8, 2] ]) };
const arc = new paths.Arc([0, 0], 150, 45, 135);
//layout on the y-center
layout.childrenOnPath(row, arc, 0.5);
arc.layer = "red";
row.paths = { arc: arc };
const svg = exporter.toSVG(row);
document.write(svg);
```

#### reversed

This option will not work for a circle. Lines and arcs each have a concept of a directional flow:

* line - a line flows from its origin to its end.
* arc - an arc flows from its startAngle to its endAngle, in the polar (counter-clockwise) direction.

If you want to plot the opposite direction, set **reversed** to true:
```javascript
//render a row of squares on a path
import { exporter, layout, models, paths } from '@7syllable/photon-core';
const square = new models.Square(10);
const row = layout.cloneToRow(square, 10, 10);
row.models[0].models = { triangle: new models.ConnectTheDots(true, [ [5, 8], [2, 2], [8, 2] ]) };
const arc = new paths.Arc([0, 0], 150, 45, 135);
//layout on the y-center, reversed
layout.childrenOnPath(row, arc, 0.5, true);
arc.layer = "red";
row.paths = { arc: arc };
const svg = exporter.toSVG(row);
document.write(svg);
```

#### contain

You may notice that the red arc's endpoints are in the x-center of the first and last children.
To contain the children within the span, set **contain** to true:
```javascript
//render a row of squares on a path
import { exporter, layout, models, paths } from '@7syllable/photon-core';
const square = new models.Square(10);
const row = layout.cloneToRow(square, 10, 10);
row.models[0].models = { triangle: new models.ConnectTheDots(true, [ [5, 8], [2, 2], [8, 2] ]) };
const arc = new paths.Arc([0, 0], 150, 45, 135);
//layout on the y-center, reversed, contained
layout.childrenOnPath(row, arc, 0.5, true, true);
arc.layer = "red";
row.paths = { arc: arc };
const svg = exporter.toSVG(row);
document.write(svg);
```

#### rotate

If you wish each child to be placed on the path but **not** rotated, set **rotate** to false:
```javascript
//render a row of squares on a path
import { exporter, layout, models, paths } from '@7syllable/photon-core';
const square = new models.Square(10);
const row = layout.cloneToRow(square, 10, 10);
row.models[0].models = { triangle: new models.ConnectTheDots(true, [ [5, 8], [2, 2], [8, 2] ]) };
const arc = new paths.Arc([0, 0], 150, 45, 135);
//layout on the y-center, reversed, not contained, not rotated
layout.childrenOnPath(row, arc, 0.5, true, false, false);
arc.layer = "red";
row.paths = { arc: arc };
const svg = exporter.toSVG(row);
document.write(svg);
```


---

#### Laying out text

Layout on a path works well with fonts and text. [See an example here](/docs../../playground/index.html?script=text-on-path).

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
- [Intermediate Drawing](../index.md)
