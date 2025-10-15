---
ai_summary: IPathArcInBezierCurve | Photon
category: API Reference
description: IPathArcInBezierCurve | Photon
difficulty: intermediate
keywords:
- api-reference
- ipatharcinbeziercurve
- photon
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/docs/api/interfaces/core_schema.IPathArcInBezierCurve.html
tags:
- paths
- api-reference
- intermediate
title: IPathArcInBezierCurve | Photon
---
IPathArcInBezierCurve | Photon

[Photon](../index.md)




Preparing search index...

* [core/schema](../modules/core_schema.md)
* IPathArcInBezierCurve

# Interface IPathArcInBezierCurve

An arc path segment in a bezier curve.

interface IPathArcInBezierCurve {
    [bezierData](#bezierdata): [IBezierRange](core_schema.IBezierRange.md);
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.md);
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/schema.IPathArcInBezierCurve))

* [IPath](core_schema.IPath.md)
  + IPathArcInBezierCurve

* Defined in [core/schema.ts:64](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L64)

##### Index

### Properties

[bezierData](#bezierdata)
[layer?](#layer)
[origin](#origin)
[type](#type)

## Properties

### bezierData

bezierData: [IBezierRange](core_schema.IBezierRange.md)

* Defined in [core/schema.ts:65](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L65)

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

[bezierData](#bezierdata)[layer](#layer)[origin](#origin)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
