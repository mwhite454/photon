---
ai_summary: When 2 or more paths connect end to end, we call this a chain.
category: General
description: When 2 or more paths connect end to end, we call this a chain.
difficulty: intermediate
keywords:
- chain
- drawing
- general
- geometry
- paths
- theory
primary_topic: chains
related:
- Chain Theory
- Breaking
- Routes
source: docs/_snippets/chain-theory.html
tags:
- intermediate
- general
- chains
title: Chain Theory
---
When 2 or more paths connect end to end, we call this a **chain**.
Here are 3 lines that connect end to end, forming a chain with 3 links;
each line path is considered a link in the chain:

When the links do not have any loose ends and connect to each other, we call this an **endless** chain.
Frequently, endless chains are used to represent a *closed geometry*.
Here is an endless chain made up of 2 lines and an arc:

A circle is a closed geometry by nature. In Maker.js, a single circle comprises an endless chain with only one link.

A chain may contain other chains, recursively. A chain may only contain others if it is an endless chain itself.
Here are some examples of one chain containing another:

Here is a model which does **not** have any chains. Although the lines overlap, they do not connect end to end.

#### Chains are implicit

You do not explicitly define chains in your drawing, chains are something that Maker.js *finds* in your model(s).

#### Finding

Call one of these two functions to find chains, which will return one or more **Chain** objects:

* [makerjs.model.findSingleChain(model)](../api/modules/core_model.html#findsinglechain)
* [makerjs.model.findChains(model)](../api/modules/core_model.html#findchains)

#### Chain object type

* [makerjs.model.findSingleChain(model)](../api/modules/core_model.html#findsinglechain)
* [makerjs.model.findChains(model)](../api/modules/core_model.html#findchains)

## Related Topics

- [Chain Theory](../index.md)
- [Breaking](../index.md)
- [Routes](../index.md)
