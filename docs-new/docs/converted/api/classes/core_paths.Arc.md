---
title: Arc | Photon
source: docs/docs/api/classes/core_paths.Arc.html
---

Arc | Photon

[Photon](../index.md)




Preparing search index...

* [core/paths](../modules/core_paths.md)
* Arc

# Class Arc

Class for arc path.

#### Implements

* [IPathArc](../interfaces/core_schema.IPathArc.md)

* Defined in [core/paths.ts:23](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L23)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[endAngle](#endangle)
[origin](#origin)
[radius](#radius)
[startAngle](#startangle)
[type](#type)

## Constructors

### constructor

* new Arc(
      origin: [IPoint](../interfaces/core_schema.IPoint.md),
      radius: number,
      startAngle: number,
      endAngle: number,
  ): Arc

  Class for arc path, created from origin point, radius, start angle, and end angle.

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.md)

    The center point of the arc.
  + radius: number

    The radius of the arc.
  + startAngle: number

    The start angle of the arc.
  + endAngle: number

    The end angle of the arc.

  #### Returns Arc

  + Defined in [core/paths.ts:38](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L38)
* new Arc(
      pointA: [IPoint](../interfaces/core_schema.IPoint.md),
      pointB: [IPoint](../interfaces/core_schema.IPoint.md),
      radius: number,
      largeArc: boolean,
      clockwise: boolean,
  ): Arc

  Class for arc path, created from 2 points, radius, large Arc flag, and clockwise flag.

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.md)

    First end point of the arc.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.md)

    Second end point of the arc.
  + radius: number

    The radius of the arc.
  + largeArc: boolean

    Boolean flag to indicate clockwise direction.
  + clockwise: boolean

    Boolean flag to indicate clockwise direction.

  #### Returns Arc

  + Defined in [core/paths.ts:49](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L49)
* new Arc(pointA: [IPoint](../interfaces/core_schema.IPoint.md), pointB: [IPoint](../interfaces/core_schema.IPoint.md), clockwise?: boolean): Arc

  Class for arc path, created from 2 points and optional boolean flag indicating clockwise.

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.md)

    First end point of the arc.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.md)

    Second end point of the arc.
  + `Optional`clockwise: boolean

    Boolean flag to indicate clockwise direction.

  #### Returns Arc

  + Defined in [core/paths.ts:58](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L58)
* new Arc(pointA: [IPoint](../interfaces/core_schema.IPoint.md), pointB: [IPoint](../interfaces/core_schema.IPoint.md), pointC: [IPoint](../interfaces/core_schema.IPoint.md)): Arc

  Class for arc path, created from 3 points.

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.md)

    First end point of the arc.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.md)

    Middle point on the arc.
  + pointC: [IPoint](../interfaces/core_schema.IPoint.md)

    Second end point of the arc.

  #### Returns Arc

  + Defined in [core/paths.ts:67](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L67)

## Properties

### endAngle

endAngle: number

The angle (in degrees) to end drawing the arc, in polar (counter-clockwise) direction.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.md).[endAngle](../interfaces/core_schema.IPathArc.md#endangle)

* Defined in [core/paths.ts:27](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L27)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.md)

The main point of reference for this path.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.md).[origin](../interfaces/core_schema.IPathArc.md#origin)

* Defined in [core/paths.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L24)

### radius

radius: number

The radius of the circle.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.md).[radius](../interfaces/core_schema.IPathArc.md#radius)

* Defined in [core/paths.ts:25](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L25)

### startAngle

startAngle: number

The angle (in degrees) to begin drawing the arc, in polar (counter-clockwise) direction.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.md).[startAngle](../interfaces/core_schema.IPathArc.md#startangle)

* Defined in [core/paths.ts:26](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L26)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.md).[type](../interfaces/core_schema.IPathArc.md#type)

* Defined in [core/paths.ts:28](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L28)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[endAngle](#endangle)[origin](#origin)[radius](#radius)[startAngle](#startangle)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
