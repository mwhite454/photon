---
title: Models
source: docs/_snippets/models.html
---

---
title: Models
---

Models are the heart of Maker.js. A model is represented by an object with these optional properties:

* **origin**: point
* **paths**: object map of paths
* **models**: object map of models

Let's look at **paths** first, using the example above.

```javascript
//render a line and circle in a model
var makerjs = require('makerjs');
var line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
var circle = {
type: 'circle',
origin: [0, 0],
radius: 50
};
var pathObject = { myLine: line, myCircle: circle };
var model = { paths: pathObject };
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```

Note that we can also pass a model to **makerjs.exporter.toSVG**.

If we wrap our model code in a function we can call it multiple times. There are several ways to do this.
First we will leave the code as is, and return the **model** variable.

```javascript
//render a model created by a function
var makerjs = require('makerjs');
function myModel() {
var line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
var circle = {
type: 'circle',
origin: [0, 0],
radius: 50
};
var pathObject = { myLine: line, myCircle: circle };
var model = { paths: pathObject };
return model;
}
var svg = makerjs.exporter.toSVG(myModel());
document.write(svg);
```

Alternatively, we can change our function to be usable with the **new** operator,
and our model properties are set using the **this** keyword:

```javascript
//render a model created by a function, using the 'this' keyword
var makerjs = require('makerjs');
function myModel() {
var line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
var circle = {
type: 'circle',
origin: [0, 0],
radius: 50
};
var pathObject = { myLine: line, myCircle: circle };
//set properties using the "this" keyword
this.paths = pathObject;
}
//note we are using the "new" operator
var svg = makerjs.exporter.toSVG(new myModel());
document.write(svg);
```

The example output should be the same as above. While we changed the way we defined our model,
we haven't yet changed the functionality:

Now we are better set up to look at **models** and **origin**.
We will create a new model which has 2 instances of myModel:

```javascript
//render 2 instances of the same model
var makerjs = require('makerjs');
function myModel() {
var line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
var circle = {
type: 'circle',
origin: [0, 0],
radius: 50
};
var pathObject = { myLine: line, myCircle: circle };
//set properties using the "this" keyword
this.paths = pathObject;
}
var model1 = new myModel();
var model2 = new myModel();
//they will be on top of each other, so let's move the origin
model2.origin = [100, 0];
var model = {
models: { "myModel1": model1, "myModel2": model2 }
};
var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```
*(additional optional properties covered in advanced lessons)*
