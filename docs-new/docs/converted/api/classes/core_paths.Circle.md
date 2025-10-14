---
title: Circle | Photon
source: docs/docs/api/classes/core_paths.Circle.html
---

Circle | Photon

[Photon](../index.md)




Preparing search index...

* [core/paths](../modules/core_paths.md)
* Circle

# Class Circle

Class for circle path.

#### Implements

* [IPathCircle](../interfaces/core_schema.IPathCircle.md)

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
  const c = new makerjs.paths.Circle(7);
  Copy
  ```

  #### Parameters

  + radius: number

    The radius of the circle.

  #### Returns Circle

  + Defined in [core/paths.ts:206](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L206)
* new Circle(origin: [IPoint](../interfaces/core_schema.IPoint.md), radius: number): Circle

  Class for circle path, created from origin point and radius.

  Example:

  ```
  const c = new makerjs.paths.Circle([10, 10], 7);
  Copy
  ```

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.md)

    The center point of the circle.
  + radius: number

    The radius of the circle.

  #### Returns Circle

  + Defined in [core/paths.ts:219](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L219)
* new Circle(pointA: [IPoint](../interfaces/core_schema.IPoint.md), pointB: [IPoint](../interfaces/core_schema.IPoint.md)): Circle

  Class for circle path, created from 2 points.

  Example:

  ```
  const c = new makerjs.paths.Circle([5, 15], [25, 15]);
  Copy
  ```

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.md)

    First point on the circle.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.md)

    Second point on the circle.

  #### Returns Circle

  + Defined in [core/paths.ts:232](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L232)
* new Circle(pointA: [IPoint](../interfaces/core_schema.IPoint.md), pointB: [IPoint](../interfaces/core_schema.IPoint.md), pointC: [IPoint](../interfaces/core_schema.IPoint.md)): Circle

  Class for circle path, created from 3 points.

  Example:

  ```
  const c = new makerjs.paths.Circle([0, 0], [0, 10], [20, 0]);
  Copy
  ```

  #### Parameters

  + pointA: [IPoint](../interfaces/core_schema.IPoint.md)

    First point on the circle.
  + pointB: [IPoint](../interfaces/core_schema.IPoint.md)

    Second point on the circle.
  + pointC: [IPoint](../interfaces/core_schema.IPoint.md)

    Third point on the circle.

  #### Returns Circle

  + Defined in [core/paths.ts:246](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L246)

## Properties

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.md)

The main point of reference for this path.

Implementation of [IPathCircle](../interfaces/core_schema.IPathCircle.md).[origin](../interfaces/core_schema.IPathCircle.md#origin)

* Defined in [core/paths.ts:193](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L193)

### radius

radius: number

The radius of the circle.

Implementation of [IPathCircle](../interfaces/core_schema.IPathCircle.md).[radius](../interfaces/core_schema.IPathCircle.md#radius)

* Defined in [core/paths.ts:194](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L194)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Implementation of [IPathCircle](../interfaces/core_schema.IPathCircle.md).[type](../interfaces/core_schema.IPathCircle.md#type)

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
