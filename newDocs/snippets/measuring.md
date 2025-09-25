---
title: "Measuring"
source: "docs/_snippets/measuring.html"
id: "makerjs.snippets.measuring"
summary: "Use the `makerjs.measure` module to measure paths and models. Useful functions:"
tags: []
---
Use the `makerjs.measure` module to measure paths and models. Useful functions:

- `makerjs.measure.pathExtents(path)`
- `makerjs.measure.modelExtents(model)`

They return measurement objects with `high` and `low` points. Use these to compute bounding boxes and create measurement guides.