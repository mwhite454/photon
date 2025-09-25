---
title: "Moving"
source: "docs/_snippets/moving.html"
id: "makerjs.snippets.moving"
summary: "Models and paths can be moved absolutely (set `origin`) or relatively. Use `makerjs.model.move` to set an absolute origin or `makerjs.model.moveRelative` to move by an offset. For paths use `makerjs.path.move` and `makerjs.path.moveRelat..."
tags: []
---
Models and paths can be moved absolutely (set `origin`) or relatively. Use `makerjs.model.move` to set an absolute origin or `makerjs.model.moveRelative` to move by an offset. For paths use `makerjs.path.move` and `makerjs.path.moveRelative`.

Example:

```javascript
makerjs.model.moveRelative(squares.models.s2, [-10, 10]);
makerjs.path.move(squares.models.s2.paths.ShapeLine1, [30, 20]);
```