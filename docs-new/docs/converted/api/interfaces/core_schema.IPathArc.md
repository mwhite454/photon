---
title: IPathArc | Photon
source: docs/docs/api/interfaces/core_schema.IPathArc.html
---

IPathArc | Photon

[Photon](../index.md)




Preparing search index...

* [core/schema](../modules/core_schema.md)
* IPathArc

# Interface IPathArc

An arc path.

interface IPathArc {
    [endAngle](#endangle): number;
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.md);
    [radius](#radius): number;
    [startAngle](#startangle): number;
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/schema.IPathArc))

* [IPathCircle](core_schema.IPathCircle.md)
  + IPathArc

#### Implemented by

* [Arc](../classes/core_paths.Arc.md)

* Defined in [core/schema.ts:40](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L40)

##### Index

### Properties

[endAngle](#endangle)
[layer?](#layer)
[origin](#origin)
[radius](#radius)
[startAngle](#startangle)
[type](#type)

## Properties

### endAngle

endAngle: number

The angle (in degrees) to end drawing the arc, in polar (counter-clockwise) direction.

* Defined in [core/schema.ts:44](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L44)

### `Optional`layer

layer?: string

Optional layer of this path.

Inherited from [IPathCircle](core_schema.IPathCircle.md).[layer](core_schema.IPathCircle.md#layer)

* Defined in [core/schema.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L24)

### origin

origin: [IPoint](core_schema.IPoint.md)

The main point of reference for this path.

Inherited from [IPathCircle](core_schema.IPathCircle.md).[origin](core_schema.IPathCircle.md#origin)

* Defined in [core/schema.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L22)

### radius

radius: number

The radius of the circle.

Inherited from [IPathCircle](core_schema.IPathCircle.md).[radius](core_schema.IPathCircle.md#radius)

* Defined in [core/schema.ts:36](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L36)

### startAngle

startAngle: number

The angle (in degrees) to begin drawing the arc, in polar (counter-clockwise) direction.

* Defined in [core/schema.ts:42](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L42)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Inherited from [IPathCircle](core_schema.IPathCircle.md).[type](core_schema.IPathCircle.md#type)

* Defined in [core/schema.ts:20](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L20)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[endAngle](#endangle)[layer](#layer)[origin](#origin)[radius](#radius)[startAngle](#startangle)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
