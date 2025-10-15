---
ai_summary: A path within a model is referenced relatively to its parent model. There
  may be times when you want all objects to be within the same coordinate s...
category: General
description: A path within a model is referenced relatively to its parent model. There
  may be times when you want all objects to be within the same coordinate s...
difficulty: intermediate
keywords:
- export
- general
- javascript
- models
- originating
- paths
- photon
- photon/core
- svg
primary_topic: originating
source: docs/_snippets/originating.html
tags:
- intermediate
- originating
- general
title: Originating
---
A path within a model is referenced relatively to its parent model. There may be times when you want all objects to be within the same coordinate space.
Let's create a simple demonstration model:


## Examples

```javascript
//render a couple boxes in their own coordinate space
import { exporter, model, models, paths } from 'photon/core';
function box(origin) {
this.models = {
outer: new models.RoundRectangle(100, 100, 1)
};
this.paths = {
inner: new paths.Circle([50, 50], 25)
};
this.origin = origin;
}
const box1 = new box([0, 0]);
const box2 = new box([150, 0]);
const model = {
models: {
box1: box1,
box2: box2
}
};
const svg = exporter.toSVG(model);
document.write(svg);
console.log(box1.paths.inner.origin);
console.log(box2.paths.inner.origin);
```

In this example, both `box1.paths.inner.origin` and `box2.paths.inner.origin` have an origin of `[50, 50]`
even though they are not in the same place, because they are located relative to the model that contains them. To make all models and paths occupy a singular coordinate space,
we can use [model.originate](../api/modules/model.md#originate):

```javascript
//render a couple boxes in the same coordinate space
import { exporter, model, models, paths } from 'photon/core';
function box(origin) {
this.models = {
outer: new models.RoundRectangle(100, 100, 1)
};
this.paths = {
inner: new paths.Circle([50, 50], 25)
};
this.origin = origin;
}
const box1 = new box([0, 0]);
const box2 = new box([150, 0]);
const model = {
models: {
box1: box1,
box2: box2
}
};
//move all path origins into the same space
model.originate(model);
const svg = exporter.toSVG(model);
document.write(svg);
console.log(box1.paths.inner.origin);
console.log(box2.paths.inner.origin);
```

Now `box1.paths.inner.origin` and `box2.paths.inner.origin` have the origins `[50, 50]` and `[200, 50]`.
