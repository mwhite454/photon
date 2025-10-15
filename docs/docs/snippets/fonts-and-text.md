---
ai_summary: To create models based on fonts, use models.Text with the new operator.
category: General
description: To create models based on fonts, use models.Text with the new operator.
difficulty: intermediate
keywords:
- export
- fonts
- general
- javascript
- models
- paths
- photon
- photon/core
- svg
- text
primary_topic: fonts
source: docs/_snippets/fonts-and-text.html
tags:
- fonts
- general
- intermediate
title: Fonts And Text
---
To create models based on fonts, use [models.Text](/docs/api/classes/models.text.md#constructor) with the **new** operator.
Pass a font object, your text, and a font size. Each character of your text string will become a child model containing the paths for that character.

Maker.js uses [Opentype.js](http://opentype.js.org/) by Frederik De Bleser to read TrueType and OpenType fonts.
Please visit the [Opentype.js GitHub](https://github.com/nodebox/opentype.js) website for details on its API.
You will need to know how to load font files before you can use them in Maker.js.

---

#### Loading fonts in the browser

Use `opentype.load(url, callback)` to load a font from a URL. Since this method goes out the network, it is asynchronous.
The callback gets `(err, font)` where `font` is a `Font` object. Check if the `err` is null before using the font.

Previously, all of our examples ran synchronously and we could use `document.write` to output a result.
But now we will need to wait for a font file to download. You will have to take this in consideration in your application.
[In the Maker.js Playground we can call playgroundRender()](/playground/index.md?script=Text).
Here on this page we will insert our SVG into a `div` in this document:


## Examples

```javascript
import { exporter, models } from '@7syllable/photon-core';
//load a font asynchronously
opentype.load('/fonts/stardosstencil/StardosStencil-Bold.ttf', (err, font) => {
if (err) {
document.getElementById('render-text').innerText = 'the font could not be loaded :(';
} else {
const textModel = new models.Text(font, 'Hello', 100);
const svg = exporter.toSVG(textModel);
document.getElementById('render-text').innerHTML = svg;
}
});
```

*...waiting for font to download...*



---

#### Loading fonts in Node.js

Use opentype.loadSync(url) to load a font from a file and return a Font object. Throws an error if the font could not be parsed. This only works in Node.js.

```javascript
import { exporter, models } from '@7syllable/photon-core';
const opentype = require('opentype.js');
const font = opentype.loadSync('./fonts/stardosstencil/StardosStencil-Regular.ttf');
const textModel = new models.Text(font, 'Hello', 100);
console.log(exporter.toSVG(textModel));
```

Finally, a phenomenon to be aware of is that fonts aren't always perfect. You may encounter cases where paths within a character are self-intersecting or otherwise not forming closed geometries.
This is not common, but it is something to be aware of, especially during combine operations.
