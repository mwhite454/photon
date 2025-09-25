---
title: "Models"
source: "docs/_snippets/models.html"
id: "makerjs.snippets.models"
summary: "Models are objects that can contain `origin`, `paths` (map), and `models` (map). Models are the primary composition unit in Maker.js. You can pass models to `makerjs.exporter.toSVG`."
tags: []
---
Models are objects that can contain `origin`, `paths` (map), and `models` (map). Models are the primary composition unit in Maker.js. You can pass models to `makerjs.exporter.toSVG`.

Example: creating a model with a line and circle:

```javascript
var pathObject = { myLine: line, myCircle: circle };
var model = { paths: pathObject };
var svg = makerjs.exporter.toSVG(model);
```

Models can also be defined as constructor functions (usable with `new`) that set properties on `this`.