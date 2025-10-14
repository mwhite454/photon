---
title: Tree
source: docs/_snippets/tree.html
---

---
title: Model tree structures
---

A model is a tree structure which may contain paths, and it may also contain other models in a heirachy.
Let's look at an example:

```javascript
//mounting plate
var makerjs = require('makerjs');
var plate = {
models: {
outer: makerjs.model.center(new makerjs.models.RoundRectangle(120, 100, 10)),
bolts: makerjs.model.center(new makerjs.models.BoltRectangle(100, 80, 5))
},
paths: {
hole: new makerjs.paths.Circle(25)
}
};
var svg = makerjs.exporter.toSVG(plate);
document.write(svg);
```

If we represent this drawing as a conceptual tree structure, it would look like this:

```
plate
+-models
| +-outer
| | +-paths
| |   +-TopLeft
| |   +-Top
| |   +-TopRight
| |   +-Left
| |   +-Right
| |   +-BottomLeft
| |   +-Bottom
| |   +-BottomRight
| +-bolts
|   +-paths
|     +-TopLeft_bolt
|     +-TopRight_bolt
|     +-BottomLeft_bolt
|     +-BottomRight_bolt
+paths
 +-hole
```

(You may notice that this structure is reminiscent of a folder system on your computer.)
We can easily traverse the tree when starting at the root. For example, let's change the radius of the BottomRight\_bolt hole:

```javascript
//mounting plate
var makerjs = require('makerjs');
var plate = {
models: {
outer: makerjs.model.center(new makerjs.models.RoundRectangle(120, 100, 10)),
bolts: makerjs.model.center(new makerjs.models.BoltRectangle(100, 80, 5))
},
paths: {
hole: new makerjs.paths.Circle(25)
}
};
//change radius of BottomRight bolt hole
plate.models.bolts.paths.BottomRight\_bolt.radius = 2;
var svg = makerjs.exporter.toSVG(plate);
document.write(svg);
```

We can access the BottomRight\_bolt circle from the `plate` object downward. Notice that in this tree structure, you cannot access upwardly.
The `plate` object contains the `bolt` model which contains the `BottomRight_bolt` path, but `BottomRight_bolt`
does not have a reference to its container. There are no properties of the `bottomRight_bolt` circle object which access anything up the tree.
It also does not have any references to its sibling circles within `bolt.paths`.

Downward-only access is the nature of a simple object tree structure. We can overcome this using **routes**.
