---
title: "Layout on a path"
source: "docs/_snippets/layout-on-path.html"
id: "makerjs.snippets.layout-on-path"
summary: "You can use a path as a layout guide for a row of child models within a model. Call `makerjs.layout.childrenOnPath(parentModel: Model, onPath: Path)`, the x-axis will be projected onto your onPath:"
tags: []
---
You can use a path as a layout guide for a row of child models within a model.
Call `makerjs.layout.childrenOnPath(parentModel: Model, onPath: Path)`, the x-axis will be projected onto your onPath:

```javascript
//render a row of squares on a path

var makerjs = require('makerjs');

var square = new makerjs.models.Square(10);

var row = makerjs.layout.cloneToRow(square, 10, 10);

var arc = new makerjs.paths.Arc([0, 0], 150, 45, 135);

makerjs.layout.childrenOnPath(row, arc);

var svg = makerjs.exporter.toSVG(row);

document.write(svg);
```

To better see how layout is performed, let's show the arc in red and add a triangle to the first square:

```javascript
//render a row of squares on a path

var makerjs = require('makerjs');

var square = new makerjs.models.Square(10);

var row = makerjs.layout.cloneToRow(square, 10, 10);

//add a triangle to the first model
row.models[0].models = { triangle: new makerjs.models.ConnectTheDots(true, [ [5, 8], [2, 2], [8, 2] ]) };

var arc = new makerjs.paths.Arc([0, 0], 150, 45, 135);

makerjs.layout.childrenOnPath(row, arc);

//show the arc in red
arc.layer = "red";
row.paths = { arc: arc };

var svg = makerjs.exporter.toSVG(row);

document.write(svg);
```

You may be surprised to see that the first model is upside down and on the right! This is because the x-axis of the row has been projected onto the arc.
Fortunately, there are additional optional parameters to this `makerjs.layout.childrenOnPath` which let you control this behavior:

- `baseline`: number (default: 0)
- `reversed`: boolean (default: false)
- `contain`: boolean (default: false)
- `rotate`: boolean (default: true)

Further details on `baseline`, `reversed`, `contain`, and `rotate` are available in the original snippet.
