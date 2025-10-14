---
title: Moving
source: docs/_snippets/moving.html
---

---
title: Moving
---

Models and paths can be moved to an absolute location, or moved by an [x, y] amount relative to their current location.
Keep in mind that since paths are contained within models, and models may be contained within models, that their coordinates will be relative to the containing model.

To illustrate this, let's create a model that has a few squares:

```javascript
//create some squares side by side
function Squares() {
this.models = {
s1: new makerjs.models.Square(100),
//calling makerjs.model.move and creating a model all on one line of code.
s2: makerjs.model.move(new makerjs.models.Square(100), [120, 0]),
s3: new makerjs.models.Square(100)
};
//move the third square by setting its origin property.
this.models.s3.origin = [240, 0];
}
var makerjs = require('makerjs');
var squares = new Squares();
var svg = makerjs.exporter.toSVG(squares);
document.write(svg);
```

The way to move a model to an absolute position is to set its **origin** property.
The [makerjs.model.move](/docs/api/modules/makerjs.model.html#move) function does just that, but it also lets you do more operations on one line of code.

To move a model by a relative amount, use [makerjs.model.moveRelative](/docs/api/modules/makerjs.model.html#moverelative):

```javascript
//move some squares by a relative distance
function Squares() {
this.models = {
s1: new makerjs.models.Square(100),
s2: makerjs.model.move(new makerjs.models.Square(100), [120, 0]),
s3: new makerjs.models.Square(100)
};
this.models.s3.origin = [240, 0];
}
var makerjs = require('makerjs');
var squares = new Squares();
//move some squares by a relative distance
makerjs.model.moveRelative(squares.models.s2, [-10, 10]);
makerjs.model.moveRelative(squares.models.s3, [-20, 20]);
var svg = makerjs.exporter.toSVG(squares);
document.write(svg);
```

Likewise, paths can be moved absolutely with [makerjs.path.move](/docs/api/modules/makerjs.path.html#move)
or relatively with [makerjs.path.moveRelative](/docs/api/modules/makerjs.path.html#moverelative):

```javascript
//move some paths within the squares
function Squares() {
this.models = {
s1: new makerjs.models.Square(100),
s2: makerjs.model.move(new makerjs.models.Square(100), [120, 0]),
s3: new makerjs.models.Square(100)
};
this.models.s3.origin = [240, 0];
}
var makerjs = require('makerjs');
var squares = new Squares();
//move a path by a relative distance
makerjs.path.moveRelative(squares.models.s3.paths.ShapeLine3, [0, 20]);
//move a path to an absolute point
makerjs.path.move(squares.models.s2.paths.ShapeLine1, [30, 20]);
var svg = makerjs.exporter.toSVG(squares);
document.write(svg);
```

Notice that the 2nd square had an origin of [120, 0] but we moved a line within the square to an absolute point [30, 20]. Since the line is contained within the square model, its
coordinates are in terms of the square, which is why it appears to be at [150, 20].
