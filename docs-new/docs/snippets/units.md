---
title: Units
source: docs/_snippets/units.html
---

---
title: Units
---

Paths and points are unitless. Models may also be unitless, or they may specify a unit system. When it comes time to make your model
on a laser cutter or waterjet etc., you will probably want to specify units. You can do this two different ways:

1. Specify units during export. [[See exporting for details per format.](/docs/exporting/#content)]
2. Specify units on your model.

To specify units on your model, add a `units` property to it with a value from the **makerjs.unitType** object:

* Centimeter
* Foot
* Inch
* Meter
* Millimeter

These properties are case sensitive. They contain the values "cm", "foot", "inch", "m" and "mm" respectively.
It is your choice whether to use the named property or the string value directly.

If a model that you wish to use has a different unit system than your own model, you can call
**makerjs.model.convertUnits(modeltoScale: model, units: string)**. to convert it.

Let's use our skateboard example above and mix Inch and Centimeter units:

```javascript
//render a model using mixed units
var makerjs = require('makerjs');
function truckBolts() {
var tx = 1 + 5/8;
var ty = 1 + 1/8;
var bolts = new makerjs.models.BoltRectangle(tx, ty, 7/32 / 2);
bolts.origin = [tx / -2, ty / -2];
this.units = makerjs.unitType.Inch;
this.models = [bolts];
}
function deck(width, length, truckOffset) {
this.units = makerjs.unitType.Centimeter;
var board = new makerjs.models.Oval(length, width);
board.origin = [0, width / -2];
var truck1 = makerjs.model.convertUnits(new truckBolts(), this.units);
truck1.origin = [truckOffset, 0];
var truck2 = makerjs.model.convertUnits(new truckBolts(), this.units);
truck2.origin = [length - truckOffset, 0];
this.models = { board: board, truck1: truck1, truck2: truck2 };
}
var svg = makerjs.exporter.toSVG(new deck(20, 80, 18));
document.write(svg);
```
