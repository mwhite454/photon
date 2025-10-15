---
ai_summary: When calling a function, you can pass its output directly into another
  function. This is called cascading.
category: General
description: When calling a function, you can pass its output directly into another
  function. This is called cascading.
difficulty: intermediate
keywords:
- cad
- cascading
- drawing
- export
- functions
- general
- javascript
- models
- photon
- photon/core
primary_topic: cascading-functions
source: docs/_snippets/cascading-functions.html
tags:
- cascading-functions
- general
- intermediate
title: Cascading Functions
---
When calling a function, you can pass its output directly into another function. This is called cascading.
This lets you do multiple operations in one statement. Here we will center, rotate and move a square:
```javascript
//cascade functions
import { exporter, model, models } from '@7syllable/photon-core';
//many operations in this one statement
const square =
model.moveRelative(
model.rotate(
model.center(
new models.Square(10)
),
45),
[0, 15])
;
const drawing = {
models: {
dome: new models.Dome(30, 30),
square: square
}
};
const svg = exporter.toSVG(drawing);
document.write(svg);
```
This is convenient, but it also has the drawback of making the code less readable. As more function calls are added,
the parameters associated with the call are separated outward. Also notice that the final operation (moveRelative) appears at the beginning of the statement.
