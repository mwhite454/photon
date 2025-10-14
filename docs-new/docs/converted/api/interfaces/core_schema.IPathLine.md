---
title: IPathLine | Photon
source: docs/docs/api/interfaces/core_schema.IPathLine.html
---

IPathLine | Photon

[Photon](../index.html)




Preparing search index...

* [core/schema](../modules/core_schema.html)
* IPathLine

# Interface IPathLine

A line path.

interface IPathLine {
    [end](#end): [IPoint](core_schema.IPoint.html);
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.html);
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/schema.IPathLine))

* [IPath](core_schema.IPath.html)
  + IPathLine
    - [IPathBezierSeed](core_schema.IPathBezierSeed.html)

#### Implemented by

* [Chord](../classes/core_paths.Chord.html)
* [Line](../classes/core_paths.Line.html)
* [Parallel](../classes/core_paths.Parallel.html)

* Defined in [core/schema.ts:28](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L28)

##### Index

### Properties

[end](#end)
[layer?](#layer)
[origin](#origin)
[type](#type)

## Properties

### end

end: [IPoint](core_schema.IPoint.html)

The end point defining the line. The start point is the origin.

* Defined in [core/schema.ts:30](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L30)

### `Optional`layer

layer?: string

Optional layer of this path.

Inherited from [IPath](core_schema.IPath.html).[layer](core_schema.IPath.html#layer)

* Defined in [core/schema.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L24)

### origin

origin: [IPoint](core_schema.IPoint.html)

The main point of reference for this path.

Inherited from [IPath](core_schema.IPath.html).[origin](core_schema.IPath.html#origin)

* Defined in [core/schema.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L22)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Inherited from [IPath](core_schema.IPath.html).[type](core_schema.IPath.html#type)

* Defined in [core/schema.ts:20](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L20)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[end](#end)[layer](#layer)[origin](#origin)[type](#type)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
