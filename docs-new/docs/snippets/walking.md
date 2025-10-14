---
title: Walking
source: docs/_snippets/walking.html
---

---
title: Walking a model tree
---

You can traverse a model tree by calling [makerjs.model.walk](/docs/api/modules/makerjs.model.html#walk) with your model and an object with these optional properties:

| property name | property type | description |
| --- | --- | --- |
| onPath | function([walkPath](/docs/api/interfaces/makerjs.iwalkpath.html#content) object) | called for every path (in every model) in your tree. |
| beforeChildWalk | function([walkModel](/docs/api/interfaces/makerjs.iwalkmodel.html#content)) | called for every model in your tree, prior to diving deeper down the tree. **Return false if you wish to not dive deeper.** |
| afterChildWalk | function([walkModel](/docs/api/interfaces/makerjs.iwalkmodel.html#content)) | called for every model in your tree, after returning from a deep dive down the tree. |

#### walkPath object

A walkPath object has these properties:

* **layer**: the layer name (if any) containing this path.
* **modelContext**: the model containing this path.
* **offset**: the absolute coordinates from [0, 0] where this path is located.
* **pathContext**: the path itself.
* **pathId**: the id of this path in its parent model.paths container.
* **route**: array of property names to locate this path from the root of the tree.
* **routeKey**: a string representation of the route which may safely be used as a unique key identifier for this path.

#### walkModel object

A walkModel object has these properties:

* **childId**: the id of this model in its parent model.models container.
* **childModel**: the model itself
* **layer**: the layer name (if any) containing this path.
* **offset**: the absolute coordinates from [0, 0] where this model is located.
* **parentModel**: the model containing this model.
* **route**: array of property names to locate this model from the root of the tree.
* **routeKey**: a string representation of the route which may safely be used as a unique key identifier for this model.

#### Example

In this example we will create a RoundRectangle and walk its tree. We have an `onPath` function that will get called for every path in the model. If the path is an arc, we will invert it:

```javascript
//render a model using mixed units
var makerjs = require('makerjs');
function invertArc(arc) {
var chord = new makerjs.paths.Chord(arc);
var midPoint = makerjs.point.middle(chord);
makerjs.path.rotate(arc, 180, midPoint);
}
var shape = new makerjs.models.RoundRectangle(100, 50, 10);
var walkOptions = {
onPath: function (wp) {
if (wp.pathContext.type === 'arc') {
invertArc(wp.pathContext);
}
}
};
makerjs.model.walk(shape, walkOptions);
var svg = makerjs.exporter.toSVG(shape);
document.write(svg);
```
