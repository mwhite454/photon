---
title: "Mirroring"
source: "docs/_snippets/mirroring.html"
id: "makerjs.snippets.mirroring"
summary: "Use `makerjs.angle.mirror` to get a mirror of an angle, and `makerjs.point.mirror` to get a mirror of a simple point."
tags: []
---
Use `makerjs.angle.mirror` to get a mirror of an angle, and `makerjs.point.mirror` to get a mirror of a simple point.

You can create a mirrored copy of paths and models with the following functions. The mirroring can occur on the x axis, the y axis, or both.

- `makerjs.path.mirror(path: object, mirrorX: boolean, mirrorY: boolean)`
- `makerjs.model.mirror(model: object, mirrorX: boolean, mirrorY: boolean)`

Each of these functions returns a new object and does not modify the original.

```javascript
//render a line mirrored in the x dimension

var makerjs = require('makerjs');

var line1 = new makerjs.paths.Line([0, 0], [100, 100]);
var line2 = makerjs.path.mirror(line1, true, false);

var paths = [line1, line2];

var svg = makerjs.exporter.toSVG(paths);

document.write(svg);
```

```javascript
//render a model mirrored in the y dimension

var makerjs = require('makerjs');

var ovalArc1 = new makerjs.models.OvalArc(45, 135, 50, 10);

var model = {
    models: {
        ovalArc1: ovalArc1,
        ovalArc2: makerjs.model.mirror(ovalArc1, false, true)
    }
};

var svg = makerjs.exporter.toSVG(model);

document.write(svg);
```

Hint: When creating symmetrical models, it may be easier to create one half, and then use mirror to generate the other half.
