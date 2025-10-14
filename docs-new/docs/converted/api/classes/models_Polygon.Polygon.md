---
title: Polygon | Photon
source: docs/docs/api/classes/models_Polygon.Polygon.html
---

Polygon | Photon

[Photon](../index.html)




Preparing search index...

* [models/Polygon](../modules/models_Polygon.html)
* Polygon

# Class Polygon

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.html)

* Defined in [models/Polygon.ts:7](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Polygon.ts#L7)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[paths](#paths)

### Methods

[circumscribedRadius](#circumscribedradius)
[getPoints](#getpoints)

## Constructors

### constructor

* new Polygon(
      numberOfSides: number,
      radius: number,
      firstCornerAngleInDegrees?: number,
      circumscribed?: boolean,
  ): Polygon

  #### Parameters

  + numberOfSides: number
  + radius: number
  + `Optional`firstCornerAngleInDegrees: number
  + `Optional`circumscribed: boolean

  #### Returns Polygon

  + Defined in [models/Polygon.ts:10](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Polygon.ts#L10)

## Properties

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.html) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[paths](../interfaces/core_schema.IModel.html#paths)

* Defined in [models/Polygon.ts:8](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Polygon.ts#L8)

## Methods

### `Static`circumscribedRadius

* circumscribedRadius(radius: number, angleInRadians: number): number

  #### Parameters

  + radius: number
  + angleInRadians: number

  #### Returns number

  + Defined in [models/Polygon.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Polygon.ts#L14)

### `Static`getPoints

* getPoints(
      numberOfSides: number,
      radius: number,
      firstCornerAngleInDegrees?: number,
      circumscribed?: boolean,
  ): [IPoint](../interfaces/core_schema.IPoint.html)[]

  #### Parameters

  + numberOfSides: number
  + radius: number
  + firstCornerAngleInDegrees: number = 0
  + circumscribed: boolean = false

  #### Returns [IPoint](../interfaces/core_schema.IPoint.html)[]

  + Defined in [models/Polygon.ts:18](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Polygon.ts#L18)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[paths](#paths)

Methods

[circumscribedRadius](#circumscribedradius)[getPoints](#getpoints)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
