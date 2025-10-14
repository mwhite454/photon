---
title: Chain Links
source: docs/_snippets/chain-links.html
---

---
title: Chain links
---
Each path in the chain is represented by a ChainLink wrapper object in the links array.
This ChainLink wrapper tells us how the path relates to the rest of the chain.
Each ChainLink array element is connected to the next and previous element.
If the chain is endless, then the last array element is connected to the first, and vice-versa.

#### ChainLink object

 
The path itself can be found in the **walkedPath** property which is a *WalkPath* object,
the same type of object used in [walking a model tree](/docs/model-trees/#Walking a model tree).

#### Natural path flow

The three types of paths in Maker.js are line, arc and circle. A circle has no end points, and therefore cannot
connect to other paths to form a chain. Lines and arcs however, may connect to other lines or arcs at their end
points to form chains. In context of a chain, lines and arcs each have a concept of a directional flow:

* line - a line flows from its origin to its end.
* arc - an arc flows from its startAngle to its endAngle, in the polar (counter-clockwise) direction.

The **reversed** property of a ChainLink denotes that the link's path flows in the opposite direction of its natural flow
to connect to its neighboring links.
