---
ai_summary: 'Models are the heart of Maker.js. A model is represented by an object
  with these optional properties:'
category: General
description: 'Models are the heart of Maker.js. A model is represented by an object
  with these optional properties:'
difficulty: advanced
keywords:
- export
- general
- javascript
- models
- paths
- photon
- photon/core
- svg
primary_topic: models
related:
- Modeling
- Paths
- Built-in Models
source: docs/_snippets/models.html
tags:
- advanced
- general
- models
title: Models
---
Models are the heart of Maker.js. A model is represented by an object with these optional properties:

* **origin**: point
* **paths**: object map of paths
* **models**: object map of models

Let's look at **paths** first, using the example above.


## Examples

```javascript
//render a line and circle in a model
import { exporter } from '@7syllable/photon-core';
const line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
const circle = {
type: 'circle',
origin: [0, 0],
radius: 50
};
const pathObject = { myLine: line, myCircle: circle };
const model = { paths: pathObject };
const svg = exporter.toSVG(model);
document.write(svg);
```

Note that we can also pass a model to **exporter.toSVG**.

If we wrap our model code in a function we can call it multiple times. There are several ways to do this.
First we will leave the code as is, and return the **model** variable.

```javascript
//render a model created by a function
import { exporter } from '@7syllable/photon-core';
function myModel() {
  const line = {
  type: 'line',
  origin: [0, 0],
  end: [50, 50]
  };
  const circle = {
  type: 'circle',
  origin: [0, 0],
  radius: 50
  };
  const pathObject = { myLine: line, myCircle: circle };
  const model = { paths: pathObject };
  return model;
  }
  const svg = exporter.toSVG(myModel());
  document.write(svg);
```

Alternatively, we can change our function to be usable with the **new** operator,
and our model properties are set using the **this** keyword:

```javascript
//render a model created by a function, using the 'this' keyword
import { exporter } from '@7syllable/photon-core';
function myModel() {
const line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
const circle = {
type: 'circle',
origin: [0, 0],
radius: 50
};
const pathObject = { myLine: line, myCircle: circle };
//set properties using the "this" keyword
this.paths = pathObject;
}
//note we are using the "new" operator
const svg = exporter.toSVG(new myModel());
document.write(svg);
```

The example output should be the same as above. While we changed the way we defined our model,
we haven't yet changed the functionality:

Now we are better set up to look at **models** and **origin**.
We will create a new model which has 2 instances of myModel:

```javascript
//render 2 instances of the same model
import { exporter } from '@7syllable/photon-core';
function myModel() {
const line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
const circle = {
type: 'circle',
origin: [0, 0],
radius: 50
};
const pathObject = { myLine: line, myCircle: circle };
//set properties using the "this" keyword
this.paths = pathObject;
}
const model1 = new myModel();
const model2 = new myModel();
//they will be on top of each other, so let's move the origin
model2.origin = [100, 0];
const model = {
models: { "myModel1": model1, "myModel2": model2 }
};
const svg = exporter.toSVG(model);
document.write(svg);
```
*(additional optional properties covered in advanced lessons)*

## Related Topics

- [Modeling](../index.md)
- [Paths](../index.md)
- [Built-in Models](../index.md)
