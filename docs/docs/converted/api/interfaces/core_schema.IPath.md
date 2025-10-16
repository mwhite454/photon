---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- ipath
- photon
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/docs/api/interfaces/core_schema.IPath.html
tags:
- paths
- api-reference
- intermediate
title: IPath | Photon
---
IPath | Photon

[Photon](../index.md)




Preparing search index...

* [core/schema](../modules/core_schema.md)
* IPath

# Interface IPath

A line, curved line or other simple two dimensional shape.

interface IPath {
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.md);
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/schema.IPath))

* IPath
  + [DeletedPathInfo](core_boolean-utils.DeletedPathInfo.md)
  + [IPathRemoved](core_maker.IPathRemoved.md)
  + [IPathDirectional](core_maker.IPathDirectional.md)
  + [IPathLine](core_schema.IPathLine.md)
  + [IPathCircle](core_schema.IPathCircle.md)
  + [IPathArcInBezierCurve](core_schema.IPathArcInBezierCurve.md)

* Defined in [core/schema.ts:18](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L18)

##### Index

### Properties

[layer?](#layer)
[origin](#origin)
[type](#type)

## Properties

### `Optional`layer

layer?: string

Optional layer of this path.

* Defined in [core/schema.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L24)

### origin

origin: [IPoint](core_schema.IPoint.md)

The main point of reference for this path.

* Defined in [core/schema.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L22)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

* Defined in [core/schema.ts:20](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L20)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[layer](#layer)[origin](#origin)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
