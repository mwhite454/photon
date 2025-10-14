---
title: Simplifying
source: docs/_snippets/simplifying.html
---

---
title: Simplifying paths
---

If you Play the wireframe example above, and click on 'show path names' you will see that many lines have been created as a result of the expansion.
This is an artefact of all of the boolean operations with **combine**. The outmost chain for example, should be able to represented with only four lines.
To remedy this, there is [makerjs.model.simplify](/docs/api/modules/makerjs.model.html#simplify) - however there is an important caveat:
**your model must be originated before you can call the simplify function.**
This is to make sure that all of the segmented paths share the same coordinate space.

```javascript
//expand a truss wireframe
var m = require('makerjs');
function trussWireframe(w, h) {
this.models = {
frame: new m.models.ConnectTheDots(true, [ [0, h], [w, 0], [0, 0] ])
};
var angled = this.models.frame.paths.ShapeLine1;
var bracepoints = [
[0, 0],
m.point.middle(angled, 1/3),
[w/2 , 0],
m.point.middle(angled, 2/3)
];
this.models.brace = new m.models.ConnectTheDots(false, bracepoints);
}
var truss = new trussWireframe(200, 50);
var expansion = m.model.expandPaths(truss, 3, 1);
//call originate before calling simplify:
m.model.originate(expansion);
m.model.simplify(expansion);
var svg = m.exporter.toSVG(expansion);
document.write(svg);
```

Be sure to play this example, and click 'show path names' for comparison.
