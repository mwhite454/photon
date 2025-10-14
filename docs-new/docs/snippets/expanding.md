---
title: Expanding
source: docs/_snippets/expanding.html
---

Paths can be expanded to produce a closed geometry model which surrounds them perfectly.

```javascript
//show each path type
import { exporter, model, path, paths } from 'photon/core';
const model = {
paths: {
p1: new paths.Line([0, 2], [10, 2]),
p2: new paths.Arc([20, 0], 5, 0, 180),
p3: new paths.Circle([35, 2], 5)
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```

Pass a path and a distance to [path.expand](/docs/api/modules/path.md#expand), this will return a new model:

```javascript
//expand around each path type
import { exporter, model, path, paths } from 'photon/core';
const model = {
paths: {
p1: new paths.Line([0, 2], [10, 2]),
p2: new paths.Arc([20, 0], 5, 0, 180),
p3: new paths.Circle([35, 2], 5)
}
};
model.models = {
x1: path.expand(model.paths.p1, 2),
x2: path.expand(model.paths.p2, 2),
x3: path.expand(model.paths.p3, 2)
};
const svg = exporter.toSVG(model);
document.write(svg);
```
```javascript
//show only expansions
import { exporter, model, path, paths } from 'photon/core';
const temp = {
paths: {
p1: new paths.Line([0, 2], [10, 2]),
p2: new paths.Arc([20, 0], 5, 0, 180),
p3: new paths.Circle([35, 2], 5)
}
};
const model = {
models: {
x1: path.expand(temp.paths.p1, 2),
x2: path.expand(temp.paths.p2, 2),
x3: path.expand(temp.paths.p3, 2)
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```


---

You can also expand all the paths in a model by calling [model.expandPaths](/docs/api/modules/model.md#expandpaths):

```javascript
//expand a star model
const m = require('makerjs');
const star = m.model.rotate(new m.models.Star(5, 100), 18);
const expanded = m.model.expandPaths(star, 10);
const model = {
models: {
star: star,
outline: expanded
}
};
const svg = m.exporter.toSVG(model);
document.write(svg);
```


---

#### Beveling joints

A third parameter can be passed to [model.expandPaths](/docs/api/modules/model.md#expandpaths) to specify the number of corners to apply to each joint and end cap:

* 0 (default) - no corners (rounded)
* 1 - one corner (pointed)
* 2 - two corners (beveled)

```javascript
//expand and bevel
const m = require('makerjs');
const star = m.model.rotate(new m.models.Star(5, 100), 18);
const rounded = m.model.expandPaths(star, 10, 0);
const pointed = m.model.expandPaths(star, 10, 1);
const beveled = m.model.expandPaths(star, 10, 2);
const model = {
models: {
star: star,
rounded: m.model.move(rounded, [240, 0]),
pointed: m.model.move(pointed, [480, 0]),
beveled: m.model.move(beveled, [720, 0])
}
};
const svg = m.exporter.toSVG(model);
document.write(svg);
```
