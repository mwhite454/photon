---
title: "It's Just JSON"
source: "docs/_snippets/just-json.html"
id: "makerjs.snippets.just-json"
summary: "Maker.js models are plain JSON-compatible objects. You can `JSON.stringify` a model and later reuse that blob as a model. This is useful for serialization or transporting models between tools."
tags: []
---
Maker.js models are plain JSON-compatible objects. You can `JSON.stringify` a model and later reuse that blob as a model. This is useful for serialization or transporting models between tools.

Example: `var json = JSON.stringify(tabletFaceMount);` then reuse the JSON as a model.