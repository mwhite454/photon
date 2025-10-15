---
ai_summary: 'A path is represented by an object with these mandatory properties:'
category: General
description: 'A path is represented by an object with these mandatory properties:'
difficulty: advanced
keywords:
- general
- javascript
- paths
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/_snippets/paths.html
tags:
- paths
- general
- advanced
title: Paths
---
A path is represented by an object with these mandatory properties:

* type: string - "line", "circle", or "arc"
* origin: point

#### Line

A line is a path with the type **"line"** and this additional property:

* end: point


## Examples

```javascript
const line = {
type: 'line',
origin: [0, 0],
end: [1, 1]
};
```

#### Circle

A circle is a path with the type **"circle"** and this additional property:

* radius: number

```javascript
const circle = {
type: 'circle',
origin: [0, 0],
radius: 1
};
```

#### Arc

An arc is a path with the type **"arc"** and these additional properties:

* radius: number
* startAngle: number
* endAngle: number

Note: Property names are case-sensitive.

```javascript
const arc = {
type: 'arc',
origin: [0, 0],
radius: 1,
startAngle: 0,
endAngle: 45
};
```
*(additional optional properties covered in advanced lessons)*

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
