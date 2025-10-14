---
title: IPathCircle | Photon
source: docs/docs/api/interfaces/core_schema.IPathCircle.html
---

IPathCircle | Photon

[Photon](../index.html)




Preparing search index...

* [core/schema](../modules/core_schema.html)
* IPathCircle

# Interface IPathCircle

A circle path.

interface IPathCircle {
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.html);
    [radius](#radius): number;
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/schema.IPathCircle))

* [IPath](core_schema.IPath.html)
  + IPathCircle
    - [IPathArc](core_schema.IPathArc.html)

#### Implemented by

* [Circle](../classes/core_paths.Circle.html)

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

Inherited from [IPath](core_schema.IPath.html).[layer](core_schema.IPath.html#layer)

* Defined in [core/schema.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L24)

### origin

origin: [IPoint](core_schema.IPoint.html)

The main point of reference for this path.

Inherited from [IPath](core_schema.IPath.html).[origin](core_schema.IPath.html#origin)

* Defined in [core/schema.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L22)

### radius

radius: number

The radius of the circle.

* Defined in [core/schema.ts:36](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L36)

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

[layer](#layer)[origin](#origin)[radius](#radius)[type](#type)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
