---
title: IPathArcInBezierCurve | Photon
source: docs/docs/api/interfaces/core_schema.IPathArcInBezierCurve.html
---

IPathArcInBezierCurve | Photon

[Photon](../index.html)




Preparing search index...

* [core/schema](../modules/core_schema.html)
* IPathArcInBezierCurve

# Interface IPathArcInBezierCurve

An arc path segment in a bezier curve.

interface IPathArcInBezierCurve {
    [bezierData](#bezierdata): [IBezierRange](core_schema.IBezierRange.html);
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.html);
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/schema.IPathArcInBezierCurve))

* [IPath](core_schema.IPath.html)
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

bezierData: [IBezierRange](core_schema.IBezierRange.html)

* Defined in [core/schema.ts:65](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L65)

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

[bezierData](#bezierdata)[layer](#layer)[origin](#origin)[type](#type)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
