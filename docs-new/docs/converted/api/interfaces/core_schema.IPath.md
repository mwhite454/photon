---
title: IPath | Photon
source: docs/docs/api/interfaces/core_schema.IPath.html
---

IPath | Photon

[Photon](../index.html)




Preparing search index...

* [core/schema](../modules/core_schema.html)
* IPath

# Interface IPath

A line, curved line or other simple two dimensional shape.

interface IPath {
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.html);
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/schema.IPath))

* IPath
  + [DeletedPathInfo](core_boolean-utils.DeletedPathInfo.html)
  + [IPathRemoved](core_maker.IPathRemoved.html)
  + [IPathDirectional](core_maker.IPathDirectional.html)
  + [IPathLine](core_schema.IPathLine.html)
  + [IPathCircle](core_schema.IPathCircle.html)
  + [IPathArcInBezierCurve](core_schema.IPathArcInBezierCurve.html)

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

origin: [IPoint](core_schema.IPoint.html)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
