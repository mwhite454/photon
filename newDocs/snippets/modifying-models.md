---
title: "Modifying models"
source: "docs/_snippets/modifying-models.html"
id: "makerjs.snippets.modifying-models"
summary: "Models are simple objects with a recursive structure. You can modify them for different purposes. This snippet demonstrates modifying and combining models."
tags: []
---
Models are simple objects with a recursive structure. You can modify them for different purposes. This snippet demonstrates modifying and combining models.

```javascript
//render two ovals which overlap

var makerjs = require('makerjs');

function ovalL(width, height, thickness) {
    var ovalH = new makerjs.models.Oval(width, thickness);
    var ovalV = new makerjs.models.Oval(thickness, height);

    this.models = {
        h: ovalH, v: ovalV
    };
}

var svg = makerjs.exporter.toSVG(new ovalL(100, 100, 37));

document.write(svg);
```

You can inspect and modify models using the browser console, DOM inspector, outputting JSON/SVG, or using the Playground app.

Examples in the original snippet show deleting paths via `delete`, adjusting point coordinates, sharing points between paths, and creating derived models (e.g., turning an L into a C) while originating models so paths share the same coordinate space.
