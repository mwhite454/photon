---
title: "The $ function"
source: "docs/_snippets/$-function.html"
id: "makerjs.snippets.$-function"
summary: "As an alternative to cascading functions, Maker.js offers a handy way to modify your drawing in an object-oriented style, inspired by jQuery."
tags: []
---
As an alternative to cascading functions, Maker.js offers a handy way to modify your drawing in an object-oriented style, inspired by jQuery.

Call `makerjs.$(x)` to get a cascade container object. You can then invoke a series of cascading functions on the container; the output of each function becomes the input to the next.

A cascade container will only work with functions that output the same type of object that they input as their first parameter: Model, Path, or Point.

Container operators (prefixed with `$`):

- `$initial` — the original object passed in
- `$result` — final cascaded result
- `$reset()` — resets the container to `$initial`

Cascadable functions are available from the corresponding modules (model, path, or point) and you don't need to provide the first parameter since the container supplies it.

Example (converted):

```javascript
var makerjs = require('makerjs');

var square = makerjs.$(new makerjs.models.Square(10))
  .center()
  .rotate(45)
  .moveRelative([0, 15])
  .$result;

var drawing = {
  models: {
    dome: new makerjs.models.Dome(30, 30),
    square: square
  }
};

var svg = makerjs.exporter.toSVG(drawing);
document.write(svg);
```

Note: you can also use `addTo(model, id)` on the cascade to insert the result into a parent model directly.
