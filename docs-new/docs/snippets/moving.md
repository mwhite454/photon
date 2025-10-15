---
ai_summary: Models and paths can be moved to an absolute location, or moved by an
  [x, y] amount relative to their current location.
category: General
description: Models and paths can be moved to an absolute location, or moved by an
  [x, y] amount relative to their current location.
difficulty: intermediate
keywords:
- export
- general
- javascript
- models
- moving
- paths
- photon
- photon/core
- svg
primary_topic: moving
related:
- Originating
- Scaling
- Rotating
source: docs/_snippets/moving.html
tags:
- intermediate
- moving
- general
title: Moving
---
Models and paths can be moved to an absolute location, or moved by an [x, y] amount relative to their current location.
Keep in mind that since paths are contained within models, and models may be contained within models, that their coordinates will be relative to the containing model.

To illustrate this, let's create a model that has a few squares:


## Examples

```javascript
//create some squares side by side
function Squares() {
this.models = {
s1: new models.Square(100),
//calling model.move and creating a model all on one line of code.
s2: model.move(new models.Square(100), [120, 0]),
s3: new models.Square(100)
};
//move the third square by setting its origin property.
this.models.s3.origin = [240, 0];
}
import { exporter, model, models, path } from 'photon/core';
const squares = new Squares();
const svg = exporter.toSVG(squares);
document.write(svg);
```

The way to move a model to an absolute position is to set its **origin** property.
The [model.move](/docs/api/modules/model.md#move) function does just that, but it also lets you do more operations on one line of code.

To move a model by a relative amount, use [model.moveRelative](/docs/api/modules/model.md#moverelative):

```javascript
//move some squares by a relative distance
function Squares() {
this.models = {
s1: new models.Square(100),
s2: model.move(new models.Square(100), [120, 0]),
s3: new models.Square(100)
};
this.models.s3.origin = [240, 0];
}
import { exporter, model, models, path } from 'photon/core';
const squares = new Squares();
//move some squares by a relative distance
model.moveRelative(squares.models.s2, [-10, 10]);
model.moveRelative(squares.models.s3, [-20, 20]);
const svg = exporter.toSVG(squares);
document.write(svg);
```

Likewise, paths can be moved absolutely with [path.move](/docs/api/modules/path.md#move)
or relatively with [path.moveRelative](/docs/api/modules/path.md#moverelative):

```javascript
//move some paths within the squares
function Squares() {
this.models = {
s1: new models.Square(100),
s2: model.move(new models.Square(100), [120, 0]),
s3: new models.Square(100)
};
this.models.s3.origin = [240, 0];
}
import { exporter, model, models, path } from 'photon/core';
const squares = new Squares();
//move a path by a relative distance
path.moveRelative(squares.models.s3.paths.ShapeLine3, [0, 20]);
//move a path to an absolute point
path.move(squares.models.s2.paths.ShapeLine1, [30, 20]);
const svg = exporter.toSVG(squares);
document.write(svg);
```

Notice that the 2nd square had an origin of [120, 0] but we moved a line within the square to an absolute point [30, 20]. Since the line is contained within the square model, its
coordinates are in terms of the square, which is why it appears to be at [150, 20].

## Related Topics

- [Originating](../index.md)
- [Scaling](../index.md)
- [Rotating](../index.md)
