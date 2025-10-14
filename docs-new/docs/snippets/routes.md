---
title: Routes
source: docs/_snippets/routes.html
---

We know that we are able to refer to deep objects by using the dot notation:

```javascript
const bottomRight\_bolt = plate.models.bolts.paths.BottomRight\_bolt;
```

The reference from `plate` to `BottomRight_bolt` is hard-coded. Suppose that we had a
model `plate2` which was a duplicate of `plate` - we would need to have to hard-code
the reference to its `BottomRight_bolt`:

```javascript
const bottomRight\_bolt2 = plate2.models.bolts.paths.BottomRight\_bolt;
```

Instead of hard-coded dot notation, we can have an abstract way of referencing deep objects by using a **route**.
It is simply an array of strings that represent the segments names between the dots. We do not put the root object in a route.
A route that we can apply to both `plate` and `plate2` would be:

```javascript
const route = ["models", "bolts", "paths", "BottomRight\_bolt"];
```

#### Travel a route

Use [travel(rootModel, route)](/docs/api/index.md#travel) to get to a child object in rootModel via a route.
This function will return an object with these 2 properties:

* **result**: model or path - the object referenced by the route
* **offset**: point - the offset of the result object's origin from the rootModel's origin

```javascript
//mounting plate
import { cloneObject, createRouteKey, exporter, model, models, paths, travel } from 'photon/core';
const plate = {
models: {
outer: model.center(new models.RoundRectangle(120, 100, 10)),
bolts: model.center(new models.BoltRectangle(100, 80, 5))
},
paths: {
hole: new paths.Circle(25)
}
};
const plate2 = cloneObject(plate);
plate2.origin = [130, 0];
//route to the BottomRight\_bolt circle
const route = ["models", "bolts", "paths", "BottomRight\_bolt"];
//create a local variables for BottomRight\_bolt holes
const bottomRight\_bolt = travel(plate, route).result;
bottomRight\_bolt.radius = 2;
const bottomRight\_bolt2 = travel(plate2, route).result;
bottomRight\_bolt2.radius = 3;
const plates = {
models: {
plate: plate,
plate2: plate2
}
};
const svg = exporter.toSVG(plates);
document.write(svg);
```

#### Patterns in Routes

Notice that the schema for Maker.js models has a pattern of `models.modelName` and `paths.pathName`.
There are always 2 segments between model and/or path objects. So, in any given route to an object, you can always get to its parent
by subtracting the last 2 array elements of the route. We will use [Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)(0, -2)
to make a copy of the route array without the last 2 elements:

```javascript
//mounting plate
import { cloneObject, createRouteKey, exporter, model, models, paths, travel } from 'photon/core';
const plate = {
models: {
outer: model.center(new models.RoundRectangle(120, 100, 10)),
bolts: model.center(new models.BoltRectangle(100, 80, 5))
},
paths: {
hole: new paths.Circle(25)
}
};
const plate2 = cloneObject(plate);
plate2.origin = [130, 0];
//route to the BottomRight\_bolt circle
const route = ["models", "bolts", "paths", "BottomRight\_bolt"];
//create a local variables for BottomRight\_bolt holes
const bottomRight\_bolt = travel(plate, route).result;
bottomRight\_bolt.radius = 2;
//subtract 2 elements to get the parent
const parentRoute = route.slice(0, -2);
const bolts = travel(plate2, parentRoute).result;
//modify children
delete bolts.paths.TopLeft\_bolt;
delete bolts.paths.BottomRight\_bolt;
const plates = {
models: {
plate: plate,
plate2: plate2
}
};
const svg = exporter.toSVG(plates);
document.write(svg);
```

#### Route Keys

Additionally, we can "flatten" a route array into a string, known as a **route key**, by calling
[createRouteKey(route)](/docs/api/index.md#createroutekey) and passing a route.
Every route key is of course unique in the scope of the root object.
It may used as a unique id of a child path or model.
