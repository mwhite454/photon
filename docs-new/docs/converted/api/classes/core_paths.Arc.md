---
title: Arc | Photon
source: docs/docs/api/classes/core_paths.Arc.html
---

Arc | Photon

[Photon](../index.html)




Preparing search index...

* [core/paths](../modules/core_paths.html)
* Arc

# Class Arc

Class for arc path.

#### Implements

* [IPathArc](../interfaces/core_schema.IPathArc.html)

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
      origin: [IPoint](../interfaces/core_schema.IPoint.html),
      radius: number,
      startAngle: number,
      endAngle: number,
  ): Arc

  Class for arc path, created from origin point, radius, start angle, and end angle.

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.html)

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
      pointA: [IPoint](../interfaces/core_schema.IPoint.html),
      pointB: [IPoint](../interfaces/core_schema.IPoint.html),
      radius: number,
      largeArc: boolean,
      clockwise: boolean,
  ): Arc

  Class for arc path, created from 2 points, radius, large Arc flag, and clockwise flag.

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.html)

    First end point of the arc.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.html)

    Second end point of the arc.
  + radius: number

    The radius of the arc.
  + largeArc: boolean

    Boolean flag to indicate clockwise direction.
  + clockwise: boolean

    Boolean flag to indicate clockwise direction.

  #### Returns Arc

  + Defined in [core/paths.ts:49](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L49)
* new Arc(pointA: [IPoint](../interfaces/core_schema.IPoint.html), pointB: [IPoint](../interfaces/core_schema.IPoint.html), clockwise?: boolean): Arc

  Class for arc path, created from 2 points and optional boolean flag indicating clockwise.

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.html)

    First end point of the arc.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.html)

    Second end point of the arc.
  + `Optional`clockwise: boolean

    Boolean flag to indicate clockwise direction.

  #### Returns Arc

  + Defined in [core/paths.ts:58](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L58)
* new Arc(pointA: [IPoint](../interfaces/core_schema.IPoint.html), pointB: [IPoint](../interfaces/core_schema.IPoint.html), pointC: [IPoint](../interfaces/core_schema.IPoint.html)): Arc

  Class for arc path, created from 3 points.

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.html)

    First end point of the arc.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.html)

    Middle point on the arc.
  + pointC: [IPoint](../interfaces/core_schema.IPoint.html)

    Second end point of the arc.

  #### Returns Arc

  + Defined in [core/paths.ts:67](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L67)

## Properties

### endAngle

endAngle: number

The angle (in degrees) to end drawing the arc, in polar (counter-clockwise) direction.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.html).[endAngle](../interfaces/core_schema.IPathArc.html#endangle)

* Defined in [core/paths.ts:27](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L27)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.html)

The main point of reference for this path.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.html).[origin](../interfaces/core_schema.IPathArc.html#origin)

* Defined in [core/paths.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L24)

### radius

radius: number

The radius of the circle.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.html).[radius](../interfaces/core_schema.IPathArc.html#radius)

* Defined in [core/paths.ts:25](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L25)

### startAngle

startAngle: number

The angle (in degrees) to begin drawing the arc, in polar (counter-clockwise) direction.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.html).[startAngle](../interfaces/core_schema.IPathArc.html#startangle)

* Defined in [core/paths.ts:26](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L26)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Implementation of [IPathArc](../interfaces/core_schema.IPathArc.html).[type](../interfaces/core_schema.IPathArc.html#type)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
