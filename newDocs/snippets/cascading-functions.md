---
title: "Cascading functions"
source: "docs/_snippets/cascading-functions.html"
id: "makerjs.snippets.cascading-functions"
summary: "Cascading calls pass the output of one function into another allowing multiple operations in one statement. Example:"
tags: []
---
Cascading calls pass the output of one function into another allowing multiple operations in one statement. Example:

```javascript
var makerjs = require('makerjs');

var square = makerjs.model.moveRelative(
  makerjs.model.rotate(
    makerjs.model.center(
      new makerjs.models.Square(10)
    ),
  45),
[0,15]);

var drawing = { models: { dome: new makerjs.models.Dome(30,30), square: square } };
var svg = makerjs.exporter.toSVG(drawing);
document.write(svg);
```

Cascading is concise but can be harder to read than using a cascade container (`makerjs.$(...)`).
