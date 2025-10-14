---
title: Wireframe
source: docs/_snippets/wireframe.html
---

Creating a wireframe and using expansion may save you a lot of work. We will demonstrate by creating a wireframe of a truss:

```javascript
//create a simple truss
const m = require('makerjs');
function trussWireframe(w, h) {
this.models = {
frame: new m.models.ConnectTheDots(true, [ [0, h], [w, 0], [0, 0] ])
};
const angled = this.models.frame.paths.ShapeLine1;
const bracepoints = [
[0, 0],
m.point.middle(angled, 1/3),
[w/2 , 0],
m.point.middle(angled, 2/3)
];
this.models.brace = new m.models.ConnectTheDots(false, bracepoints);
}
const truss = new trussWireframe(200, 50);
const svg = m.exporter.toSVG(truss);
document.write(svg);
```

Next we will expand the paths:

```javascript
//expand a truss wireframe
const m = require('makerjs');
function trussWireframe(w, h) {
this.models = {
frame: new m.models.ConnectTheDots(true, [ [0, h], [w, 0], [0, 0] ])
};
const angled = this.models.frame.paths.ShapeLine1;
const bracepoints = [
[0, 0],
m.point.middle(angled, 1/3),
[w/2 , 0],
m.point.middle(angled, 2/3)
];
this.models.brace = new m.models.ConnectTheDots(false, bracepoints);
}
const truss = new trussWireframe(200, 50);
const expansion = m.model.expandPaths(truss, 3, 1);
const svg = m.exporter.toSVG(expansion);
document.write(svg);
```
