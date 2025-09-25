---
title: "Open vs Closed Geometry"
source: "docs/_snippets/open-vs-closed-geometry.html"
id: "makerjs.snippets.open-vs-closed-geometry"
summary: "An open geometry is when any path in a drawing is a dead end. A closed geometry is when all path ends meet and there are no dead end paths. A closed geometry forms an enclosed shape."
tags: []
---
An open geometry is when any path in a drawing is a dead end. A closed geometry is when all path ends meet and there are no dead end paths. A closed geometry forms an enclosed shape.

Examples of open and closed geometries are shown in the original snippet. Closed geometries are typically used when creating 3D objects.

```javascript
//open geometries example (asterisk and a ConnectTheDots open model)
var makerjs = require('makerjs');
function asterisk() {
    function plus() {
        this.paths = {
            h: new makerjs.paths.Line([-5, 0], [5, 0]),
            v: new makerjs.paths.Line([0, -5], [0, 5])
        }
    }

    this.models = {
        plus: new plus(),
        plus1: makerjs.model.rotate(new plus(), 45)
    };
}

var model = {
    models: {
        a: new asterisk(),
        b: new makerjs.models.ConnectTheDots(false, [[10, -5], [20, -5], [20, 5], [10, 5], [10, 0]])
    }
};

var svg = makerjs.exporter.toSVG(model);
document.write(svg);
```

Examples of Closed Geometry:

```javascript
//closed geometries example

var makerjs = require('makerjs');

var model = {
    models: {

        nut: {
            models: {
                polygon: new makerjs.models.Polygon(6, 20)
            },
            paths: {
                inner: new makerjs.paths.Circle(10)
            }
        },

        plate: makerjs.model.moveRelative({
            models: {
                outer: makerjs.model.center(new makerjs.models.Rectangle(60, 30)),
                inner: makerjs.model.center(new makerjs.models.Oval(45, 15)),
                bolts: makerjs.model.center(new makerjs.models.BoltRectangle(50, 20, 2)),
            },
        }, [60, 0]),

        triangle: makerjs.model.moveRelative(
          new makerjs.models.ConnectTheDots(true, [[-20, -17], [20, -17], [0, 17]])
        , [120, 0])

    }
};

var svg = makerjs.exporter.toSVG(model);

document.write(svg);
```

Maker.js works with both open and closed geometries. When your desire is to create a three dimensional object, you will probably be using a closed geometry.
