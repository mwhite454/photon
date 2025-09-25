---
title: "Captions"
source: "docs/_snippets/captions.html"
id: "makerjs.snippets.captions"
summary: "Captions are fragments of text positioned by an anchor line. Captions are a single line of text (no wrapping) centered on the anchor and can be rotated by the anchor slope. They differ from the Text model (glyph outlines)."
tags: []
---
Captions are fragments of text positioned by an anchor line. Captions are a single line of text (no wrapping) centered on the anchor and can be rotated by the anchor slope. They differ from the Text model (glyph outlines).

Caption object fields:

- `text` — String
- `anchor` — Line object

Add a caption to a model via the `caption` property, or use the helper `makerjs.model.addCaption(model, text, leftAnchorPoint?, rightAnchorPoint?)`.

Example:

```javascript
var makerjs = require('makerjs');
var square = new makerjs.models.Square(100);

square.caption = {
  text: 'a square',
  anchor: new makerjs.paths.Line([0,50],[100,50])
};
var svg = makerjs.exporter.toSVG(square);
document.write(svg);
```

If the anchor is degenerate (origin == end), the caption remains horizontally aligned even if the model rotates.

```javascript
var square = makerjs.$(new makerjs.models.Square(100))
  .addCaption('always aligned', [50,50], [50,50])
  .rotate(22)
  .$result;
var svg = makerjs.exporter.toSVG(square);
document.write(svg);
```
