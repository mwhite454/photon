---
title: "Fonts and text"
source: "docs/_snippets/fonts-and-text.html"
id: "makerjs.snippets.fonts-and-text"
summary: "Use `new makerjs.models.Text(font, text, size)` to create text models; Maker.js uses `opentype.js` to read font files. In the browser use `opentype.load(url, cb)` (async); in Node use `opentype.loadSync(file)`."
tags: []
---
Use `new makerjs.models.Text(font, text, size)` to create text models; Maker.js uses `opentype.js` to read font files. In the browser use `opentype.load(url, cb)` (async); in Node use `opentype.loadSync(file)`.

Be aware: some fonts contain imperfect outlines which may produce self-intersecting paths.