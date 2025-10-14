---
title: Order Of Operations
source: docs/_snippets/order-of-operations.html
---

---
title: Order of Boolean operations
---

Combining models with boolean operations is a powerful feature but it can be challenging in some scenarios. Re-modeling your drawing may be necessary to acheive certain results.
We will explore the order of operations concept with a sample project. Let's first take a look at our desired end goal:



---

We can start with all of the building blocks of our design: a star, a plus, and a frame:

```javascript
//the basic skeleton of our project
var makerjs = require('makerjs');
var star = new makerjs.models.Star(28, 25, 20);
var plus = makerjs.model.rotate({
models: {
v: makerjs.model.center(new makerjs.models.Rectangle(3, 90)),
h: makerjs.model.center(new makerjs.models.Rectangle(110, 3))
}
}, -12.5);
var frame = {
models: {
outer: makerjs.model.center(new makerjs.models.RoundRectangle(100, 80, 4)),
inner: makerjs.model.center(new makerjs.models.Rectangle(90, 70))
}
};
var model = {
models: {
star: star,
plus: plus,
frame: frame
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```


---

The first step is to combine the vertical and horizontal bars of the plus:

```javascript
//combine the plus
var makerjs = require('makerjs');
var star = new makerjs.models.Star(28, 25, 20);
var plus = makerjs.model.rotate({
models: {
v: makerjs.model.center(new makerjs.models.Rectangle(3, 90)),
h: makerjs.model.center(new makerjs.models.Rectangle(110, 3))
}
}, -12.5);
//make a union from the vertical and horizontal
makerjs.model.combineUnion(plus.models.v, plus.models.h);
var frame = {
models: {
outer: makerjs.model.center(new makerjs.models.RoundRectangle(100, 80, 4)),
inner: makerjs.model.center(new makerjs.models.Rectangle(90, 70))
}
};
var model = {
models: {
star: star,
plus: plus,
frame: frame
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```


---

Next we will combine the star and the plus:

```javascript
//combine the star and plus
var makerjs = require('makerjs');
var star = new makerjs.models.Star(28, 25, 20);
var plus = makerjs.model.rotate({
models: {
v: makerjs.model.center(new makerjs.models.Rectangle(3, 90)),
h: makerjs.model.center(new makerjs.models.Rectangle(110, 3))
}
}, -12.5);
makerjs.model.combineUnion(plus.models.v, plus.models.h);
//make a union from the star and the plus:
makerjs.model.combineUnion(star, plus);
var frame = {
models: {
outer: makerjs.model.center(new makerjs.models.RoundRectangle(100, 80, 4)),
inner: makerjs.model.center(new makerjs.models.Rectangle(90, 70))
}
};
var model = {
models: {
star: star,
plus: plus,
frame: frame
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```


---

Let's pause and consider what the plus looks like by itself, after our union operation with the star:

And the star by itself:

They have become open geometries. We cannot call the combine function with an open geometry. But since we combined them, they are a closed geometry when they are together.
So, we should create a new model for them together:

```javascript
//remodel the star and plus
var makerjs = require('makerjs');
var star = new makerjs.models.Star(28, 25, 20);
var plus = makerjs.model.rotate({
models: {
v: makerjs.model.center(new makerjs.models.Rectangle(3, 90)),
h: makerjs.model.center(new makerjs.models.Rectangle(110, 3))
}
}, -12.5);
makerjs.model.combineUnion(plus.models.v, plus.models.h);
makerjs.model.combineUnion(star, plus);
//make a new model with the star and plus together
var starplus = {
models: {
star: star,
plus: plus
}
};
var frame = {
models: {
outer: makerjs.model.center(new makerjs.models.RoundRectangle(100, 80, 4)),
inner: makerjs.model.center(new makerjs.models.Rectangle(90, 70))
}
};
var model = {
models: {
//re-modeling: reference the starplus instead of star and plus separately
starplus: starplus,
frame: frame
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```


---

Now we can continue, with a subtraction operation. Notice that we should not subtract the starplus from the frame (try that on your own to see what happens) but only from the inner frame:

```javascript
//subtract the starplus
var makerjs = require('makerjs');
var star = new makerjs.models.Star(28, 25, 20);
var plus = makerjs.model.rotate({
models: {
v: makerjs.model.center(new makerjs.models.Rectangle(3, 90)),
h: makerjs.model.center(new makerjs.models.Rectangle(110, 3))
}
}, -12.5);
makerjs.model.combineUnion(plus.models.v, plus.models.h);
makerjs.model.combineUnion(star, plus);
var starplus = {
models: {
star: star,
plus: plus
}
};
var frame = {
models: {
outer: makerjs.model.center(new makerjs.models.RoundRectangle(100, 80, 4)),
inner: makerjs.model.center(new makerjs.models.Rectangle(90, 70))
}
};
//subtract from the inner frame only
makerjs.model.combineSubtraction(frame.models.inner, starplus);
var model = {
models: {
starplus: starplus,
frame: frame
}
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
