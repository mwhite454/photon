---
title: Modeling
source: docs/_snippets/modeling.html
---

Given the fundamental models and ability to move instances of them, we can now start modeling.
Here are a few examples to illustrate how you might use these:

House:

```javascript
//render a simple house using ConnectTheDots and Square
import { exporter, models, paths } from 'photon/core';
const points = [
[100, 0], [100, 100], [0, 175], [-100, 100], [-100, 0],
[-20, 0], [-20, 80], [20, 80], [20, 0]
];
const house = new models.ConnectTheDots(true, points);
const window1 = new models.Square(40);
window1.origin = [40, 40];
const window2 = new models.Square(40);
window2.origin = [-80, 40];
const houseWithWindows = {
models: { "myHouse": house, "window1": window1, "window2": window2 }
};
const svg = exporter.toSVG(houseWithWindows);
document.write(svg);
```

Tablet mount:

```javascript
//render a tablet frame using BoltRectangle and RoundRectangle
import { exporter, models, paths } from 'photon/core';
const outer = new models.RoundRectangle(200, 280, 8);
const inner = new models.RoundRectangle(160, 230, 8);
inner.origin = [20, 30];
const buttonhole = new paths.Circle([100, 15], 8);
const bolts = new models.BoltRectangle(180, 260, 2);
bolts.origin = [10, 10];
const tabletFaceMount = {
paths: { buttonhole: buttonhole },
models: { inner: inner, outer: outer, bolts: bolts }
};
const svg = exporter.toSVG(tabletFaceMount);
document.write(svg);
```

Circular adapter plate:

```javascript
//render an adapter using Ring and BoltCircle
import { exporter, models, paths } from 'photon/core';
const model = {
models: {
ring1: new models.Ring(40, 100),
bc1: new models.BoltCircle(90, 4, 10),
bc2: new models.BoltCircle(55, 7, 6, 30)
}
};
const svg = exporter.toSVG(model);
document.write(svg);
```

Skateboard deck:

```javascript
//render a skateboard deck using BoltRectangle and Oval
import { exporter, models, paths } from 'photon/core';
function truckBolts() {
const tx = 1 + 5/8;
const ty = 1 + 1/8;
const bolts = new models.BoltRectangle(tx, ty, 7/32 / 2);
bolts.origin = [tx / -2, ty / -2];
this.models = [bolts];
}
function deck(width, length, truckOffset) {
const board = new models.Oval(length, width);
board.origin = [0, width / -2];
const truck1 = new truckBolts();
truck1.origin = [truckOffset, 0];
const truck2 = new truckBolts();
truck2.origin = [length - truckOffset, 0];
this.models = { board: board, truck1: truck1, truck2: truck2 };
}
const svg = exporter.toSVG(new deck(8, 32, 7));
document.write(svg);
```
