---
ai_summary: In the example code above we used plain old JavaScript objects to create
  paths and models.
category: General
description: In the example code above we used plain old JavaScript objects to create
  paths and models.
difficulty: intermediate
keywords:
- constructors
- export
- general
- javascript
- models
- path
- paths
- photon
- photon/core
- svg
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/_snippets/path-constructors.html
tags:
- paths
- general
- intermediate
title: Path Constructors
---
In the example code above we used plain old JavaScript objects to create paths and models.
Notice that we didn't need to use a special constructor provided by Maker.js to create either a path or a model.
This is an intentional aspect of Maker.js, that you can decide how to create your objects.
To make these plain objects work with Maker.js, they needed to use the property names specified above.

We also illustrated 3 ways of defining an object: using a var, using a function that returns a var,
and using a constructor function (for use by the **new** keyword). Let's revisit our simple line path example,
and convert it to a constructor function.


## Examples

```javascript
//render a line
import { exporter, paths } from 'photon/core';
const line = {
type: 'line',
origin: [0, 0],
end: [50, 50]
};
const svg = exporter.toSVG(line);
document.write(svg);
```
```javascript
//render a line created by a function
import { exporter, paths } from 'photon/core';
function line() {
this.type = 'line',
this.origin = [0, 0],
this.end = [50, 50]
};
const svg = exporter.toSVG(new line());
document.write(svg);
```

Of course this example is not very useful because it only produces a line with the same origin and end every time.
Instead, these should be passed as parameters.

Since this is a common scenario, Maker.js provides constructors for all primitive paths: line, circle and arc:

* [paths.Line](/docs/api/classes/paths.line.md#constructor)
* [paths.Circle](/docs/api/classes/paths.circle.md#constructor)
* [paths.Arc](/docs/api/classes/paths.arc.md#constructor)

```javascript
//render the basic paths
import { exporter, paths } from 'photon/core';
const line = new paths.Line([0, 0], [50, 50]);
const circle = new paths.Circle([0, 0], 50);
const arc = new paths.Arc([0, 0], 25, 0, 90);
const svg = exporter.toSVG([line, circle, arc]);
document.write(svg);
```

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
