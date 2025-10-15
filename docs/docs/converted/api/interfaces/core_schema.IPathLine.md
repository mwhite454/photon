---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- ipathline
- paths
- photon
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/docs/api/interfaces/core_schema.IPathLine.html
tags:
- paths
- api-reference
- intermediate
title: IPathLine | Photon
---
IPathLine | Photon

[Photon](../index.md)




Preparing search index...

* [core/schema](../modules/core_schema.md)
* IPathLine

# Interface IPathLine

A line path.

interface IPathLine {
    [end](#end): [IPoint](core_schema.IPoint.md);
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.md);
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/schema.IPathLine))

* [IPath](core_schema.IPath.md)
  + IPathLine
    - [IPathBezierSeed](core_schema.IPathBezierSeed.md)

#### Implemented by

* [Chord](../classes/core_paths.Chord.md)
* [Line](../classes/core_paths.Line.md)
* [Parallel](../classes/core_paths.Parallel.md)

* Defined in [core/schema.ts:28](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L28)

##### Index

### Properties

[end](#end)
[layer?](#layer)
[origin](#origin)
[type](#type)

## Properties

### end

end: [IPoint](core_schema.IPoint.md)

The end point defining the line. The start point is the origin.

* Defined in [core/schema.ts:30](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L30)

### `Optional`layer

layer?: string

Optional layer of this path.

Inherited from [IPath](core_schema.IPath.md).[layer](core_schema.IPath.md#layer)

* Defined in [core/schema.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L24)

### origin

origin: [IPoint](core_schema.IPoint.md)

The main point of reference for this path.

Inherited from [IPath](core_schema.IPath.md).[origin](core_schema.IPath.md#origin)

* Defined in [core/schema.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L22)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Inherited from [IPath](core_schema.IPath.md).[type](core_schema.IPath.md#type)

* Defined in [core/schema.ts:20](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L20)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[end](#end)[layer](#layer)[origin](#origin)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
