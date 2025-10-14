---
title: Svg Styling
source: docs/_snippets/svg-styling.html
---

It may be helpful to add visual styles to your drawing when debugging.
You can do this using CSS and referencing elements in your SVG.
Of course this will only add style in the browser,
it will not affect SVG exported to a file for the laser cutter.

The keys you use within your **paths** and **models** collections become an **id** attribute
in the generated SVG. For Example:

```javascript
import { exporter, models, paths } from 'photon/core';
const model = {
paths: {
circle1: new paths.Circle([0, 0], 30)
},
models: {
bigOvalArc: new models.OvalArc(120, 60, 50, 10)
}
};
const svg = exporter.toSVG(model, {useSvgPathOnly: false});
document.write(svg);
document.write('

---

`');
document.write(svg.replace(/

---

');
```
try it in JsFiddle ⇗


We see that circle1 was a key within our paths collection and was translated into an id
in an SVG element. We also see that the model bigOvalArc has geen translated to an SVG group with that id.

We can use a CSS id selector and the stroke property to give them individual color:

```html

````
