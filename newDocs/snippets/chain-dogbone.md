---
title: "Chain dogbone"
source: "docs/_snippets/chain-dogbone.html"
id: "makerjs.snippets.chain-dogbone"
summary: "Add a dogbone fillet between all line paths in a chain with `makerjs.chain.dogbone(chain, filletRadiusOrRadii)`."
tags: []
---
Add a dogbone fillet between all line paths in a chain with `makerjs.chain.dogbone(chain, filletRadiusOrRadii)`.

Parameters:
- `chainToFillet` — the chain to modify
- `filletRadiusOrFilletRadii` — either a number (radius for all joints) or an object `{ left, right }` for separate radii

The function returns a new model containing the dogbone fillets which should be added to your model tree.

Example overview: find chains, ensure direction, then call `makerjs.chain.dogbone` and add the returned model to your tree.
