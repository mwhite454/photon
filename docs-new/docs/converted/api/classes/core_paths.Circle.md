---
title: Circle | Photon
source: docs/docs/api/classes/core_paths.Circle.html
---

Circle | Photon

[Photon](../index.html)




Preparing search index...

* [core/paths](../modules/core_paths.html)
* Circle

# Class Circle

Class for circle path.

#### Implements

* [IPathCircle](../interfaces/core_schema.IPathCircle.html)

* Defined in [core/paths.ts:191](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L191)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[origin](#origin)
[radius](#radius)
[type](#type)

## Constructors

### constructor

* new Circle(radius: number): Circle

  Class for circle path, created from radius. Origin will be [0, 0].

  Example:

  ```
  var c = new makerjs.paths.Circle(7);
  Copy
  ```

  #### Parameters

  + radius: number

    The radius of the circle.

  #### Returns Circle

  + Defined in [core/paths.ts:206](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L206)
* new Circle(origin: [IPoint](../interfaces/core_schema.IPoint.html), radius: number): Circle

  Class for circle path, created from origin point and radius.

  Example:

  ```
  var c = new makerjs.paths.Circle([10, 10], 7);
  Copy
  ```

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.html)

    The center point of the circle.
  + radius: number

    The radius of the circle.

  #### Returns Circle

  + Defined in [core/paths.ts:219](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L219)
* new Circle(pointA: [IPoint](../interfaces/core_schema.IPoint.html), pointB: [IPoint](../interfaces/core_schema.IPoint.html)): Circle

  Class for circle path, created from 2 points.

  Example:

  ```
  var c = new makerjs.paths.Circle([5, 15], [25, 15]);
  Copy
  ```

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.html)

    First point on the circle.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.html)

    Second point on the circle.

  #### Returns Circle

  + Defined in [core/paths.ts:232](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L232)
* new Circle(pointA: [IPoint](../interfaces/core_schema.IPoint.html), pointB: [IPoint](../interfaces/core_schema.IPoint.html), pointC: [IPoint](../interfaces/core_schema.IPoint.html)): Circle

  Class for circle path, created from 3 points.

  Example:

  ```
  var c = new makerjs.paths.Circle([0, 0], [0, 10], [20, 0]);
  Copy
  ```

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.html)

    First point on the circle.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.html)

    Second point on the circle.
  + pointC: [IPoint](../interfaces/core_schema.IPoint.html)

    Third point on the circle.

  #### Returns Circle

  + Defined in [core/paths.ts:246](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L246)

## Properties

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.html)

The main point of reference for this path.

Implementation of [IPathCircle](../interfaces/core_schema.IPathCircle.html).[origin](../interfaces/core_schema.IPathCircle.html#origin)

* Defined in [core/paths.ts:193](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L193)

### radius

radius: number

The radius of the circle.

Implementation of [IPathCircle](../interfaces/core_schema.IPathCircle.html).[radius](../interfaces/core_schema.IPathCircle.html#radius)

* Defined in [core/paths.ts:194](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L194)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Implementation of [IPathCircle](../interfaces/core_schema.IPathCircle.html).[type](../interfaces/core_schema.IPathCircle.html#type)

* Defined in [core/paths.ts:192](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L192)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[origin](#origin)[radius](#radius)[type](#type)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
