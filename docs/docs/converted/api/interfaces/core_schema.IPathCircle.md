---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- ipathcircle
- paths
- photon
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/docs/api/interfaces/core_schema.IPathCircle.html
tags:
- paths
- api-reference
- intermediate
title: IPathCircle | Photon
---
IPathCircle | Photon

[Photon](../index.md)




Preparing search index...

* [core/schema](../modules/core_schema.md)
* IPathCircle

# Interface IPathCircle

A circle path.

interface IPathCircle {
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.md);
    [radius](#radius): number;
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/schema.IPathCircle))

* [IPath](core_schema.IPath.md)
  + IPathCircle
    - [IPathArc](core_schema.IPathArc.md)

#### Implemented by

* [Circle](../classes/core_paths.Circle.md)

* Defined in [core/schema.ts:34](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L34)

##### Index

### Properties

[layer?](#layer)
[origin](#origin)
[radius](#radius)
[type](#type)

## Properties

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

### radius

radius: number

The radius of the circle.

* Defined in [core/schema.ts:36](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L36)

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

[layer](#layer)[origin](#origin)[radius](#radius)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
