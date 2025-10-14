---
title: IPathBezierSeed | Photon
source: docs/docs/api/interfaces/core_schema.IPathBezierSeed.html
---

IPathBezierSeed | Photon

[Photon](../index.md)




Preparing search index...

* [core/schema](../modules/core_schema.md)
* IPathBezierSeed

# Interface IPathBezierSeed

A bezier seed defines the endpoints and control points of a bezier curve.

interface IPathBezierSeed {
    [controls](#controls): [IPoint](core_schema.IPoint.md)[];
    [end](#end): [IPoint](core_schema.IPoint.md);
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.md);
    [parentRange](#parentrange)?: [IBezierRange](core_schema.IBezierRange.md);
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/schema.IPathBezierSeed))

* [IPathLine](core_schema.IPathLine.md)
  + IPathBezierSeed

#### Implemented by

* [BezierSeed](../classes/models_BezierCurve-esm.BezierSeed.md)

* Defined in [core/schema.ts:48](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L48)

##### Index

### Properties

[controls](#controls)
[end](#end)
[layer?](#layer)
[origin](#origin)
[parentRange?](#parentrange)
[type](#type)

## Properties

### controls

controls: [IPoint](core_schema.IPoint.md)[]

The bezier control points. One point for quadratic, 2 points for cubic.

* Defined in [core/schema.ts:50](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L50)

### end

end: [IPoint](core_schema.IPoint.md)

The end point defining the line. The start point is the origin.

Inherited from [IPathLine](core_schema.IPathLine.md).[end](core_schema.IPathLine.md#end)

* Defined in [core/schema.ts:30](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L30)

### `Optional`layer

layer?: string

Optional layer of this path.

Inherited from [IPathLine](core_schema.IPathLine.md).[layer](core_schema.IPathLine.md#layer)

* Defined in [core/schema.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L24)

### origin

origin: [IPoint](core_schema.IPoint.md)

The main point of reference for this path.

Inherited from [IPathLine](core_schema.IPathLine.md).[origin](core_schema.IPathLine.md#origin)

* Defined in [core/schema.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L22)

### `Optional`parentRange

parentRange?: [IBezierRange](core_schema.IBezierRange.md)

T values of the parent if this is a child that represents a split.

* Defined in [core/schema.ts:52](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L52)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Inherited from [IPathLine](core_schema.IPathLine.md).[type](core_schema.IPathLine.md#type)

* Defined in [core/schema.ts:20](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L20)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[controls](#controls)[end](#end)[layer](#layer)[origin](#origin)[parentRange](#parentrange)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
