---
ai_summary: Combining models with boolean operations is a powerful feature but it
  can be challenging in some scenarios. Re-modeling your drawing may be necessa...
category: General
description: Combining models with boolean operations is a powerful feature but it
  can be challenging in some scenarios. Re-modeling your drawing may be necessa...
difficulty: intermediate
keywords:
- drawing
- export
- general
- geometry
- javascript
- models
- operations
- order
- photon
- photon/core
primary_topic: order-of-operations
source: docs/_snippets/order-of-operations.html
tags:
- intermediate
- order-of-operations
- general
title: Order Of Operations
---
Combining models with boolean operations is a powerful feature but it can be challenging in some scenarios. Re-modeling your drawing may be necessary to acheive certain results.
We will explore the order of operations concept with a sample project. Let's first take a look at our desired end goal:



---

We can start with all of the building blocks of our design: a star, a plus, and a frame:


## Examples

```javascript
//the basic skeleton of our project
import { exporter, model, models } from 'photon/core';
const star = new models.Star(28, 25, 20);
const plus = model.rotate({
models: {
v: model.center(new models.Rectangle(3, 90)),
h: model.center(new models.Rectangle(110, 3))
}
}, -12.5);
const frame = {
models: {
outer: model.center(new models.RoundRectangle(100, 80, 4)),
inner: model.center(new models.Rectangle(90, 70))
}
};
const model = {
models: {
star: star,
plus: plus,
frame: frame
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```


---

The first step is to combine the vertical and horizontal bars of the plus:

```javascript
//combine the plus
import { exporter, model, models } from 'photon/core';
const star = new models.Star(28, 25, 20);
const plus = model.rotate({
models: {
v: model.center(new models.Rectangle(3, 90)),
h: model.center(new models.Rectangle(110, 3))
}
}, -12.5);
//make a union from the vertical and horizontal
model.combineUnion(plus.models.v, plus.models.h);
const frame = {
models: {
outer: model.center(new models.RoundRectangle(100, 80, 4)),
inner: model.center(new models.Rectangle(90, 70))
}
};
const model = {
models: {
star: star,
plus: plus,
frame: frame
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```


---

Next we will combine the star and the plus:

```javascript
//combine the star and plus
import { exporter, model, models } from 'photon/core';
const star = new models.Star(28, 25, 20);
const plus = model.rotate({
models: {
v: model.center(new models.Rectangle(3, 90)),
h: model.center(new models.Rectangle(110, 3))
}
}, -12.5);
model.combineUnion(plus.models.v, plus.models.h);
//make a union from the star and the plus:
model.combineUnion(star, plus);
const frame = {
models: {
outer: model.center(new models.RoundRectangle(100, 80, 4)),
inner: model.center(new models.Rectangle(90, 70))
}
};
const model = {
models: {
star: star,
plus: plus,
frame: frame
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```


---

Let's pause and consider what the plus looks like by itself, after our union operation with the star:

And the star by itself:

They have become open geometries. We cannot call the combine function with an open geometry. But since we combined them, they are a closed geometry when they are together.
So, we should create a new model for them together:

```javascript
//remodel the star and plus
import { exporter, model, models } from 'photon/core';
const star = new models.Star(28, 25, 20);
const plus = model.rotate({
models: {
v: model.center(new models.Rectangle(3, 90)),
h: model.center(new models.Rectangle(110, 3))
}
}, -12.5);
model.combineUnion(plus.models.v, plus.models.h);
model.combineUnion(star, plus);
//make a new model with the star and plus together
const starplus = {
models: {
star: star,
plus: plus
}
};
const frame = {
models: {
outer: model.center(new models.RoundRectangle(100, 80, 4)),
inner: model.center(new models.Rectangle(90, 70))
}
};
const model = {
models: {
//re-modeling: reference the starplus instead of star and plus separately
starplus: starplus,
frame: frame
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```


---

Now we can continue, with a subtraction operation. Notice that we should not subtract the starplus from the frame (try that on your own to see what happens) but only from the inner frame:

```javascript
//subtract the starplus
import { exporter, model, models } from 'photon/core';
const star = new models.Star(28, 25, 20);
const plus = model.rotate({
models: {
v: model.center(new models.Rectangle(3, 90)),
h: model.center(new models.Rectangle(110, 3))
}
}, -12.5);
model.combineUnion(plus.models.v, plus.models.h);
model.combineUnion(star, plus);
const starplus = {
models: {
star: star,
plus: plus
}
};
const frame = {
models: {
outer: model.center(new models.RoundRectangle(100, 80, 4)),
inner: model.center(new models.Rectangle(90, 70))
}
};
//subtract from the inner frame only
model.combineSubtraction(frame.models.inner, starplus);
const model = {
models: {
starplus: starplus,
frame: frame
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```
