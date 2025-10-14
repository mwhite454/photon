---
title: Paths
source: docs/_snippets/paths.html
---

---
title: Paths
---

A path is represented by an object with these mandatory properties:

* type: string - "line", "circle", or "arc"
* origin: point

#### Line

A line is a path with the type **"line"** and this additional property:

* end: point

```javascript
var line = {
type: 'line',
origin: [0, 0],
end: [1, 1]
};
```

#### Circle

A circle is a path with the type **"circle"** and this additional property:

* radius: number

```javascript
var circle = {
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
var arc = {
type: 'arc',
origin: [0, 0],
radius: 1,
startAngle: 0,
endAngle: 45
};
```
*(additional optional properties covered in advanced lessons)*
