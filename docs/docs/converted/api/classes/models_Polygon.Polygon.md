---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- models
- paths
- photon
- polygon
primary_topic: polygon-|-photon
source: docs/docs/api/classes/models_Polygon.Polygon.html
tags:
- intermediate
- api-reference
- polygon-|-photon
title: Polygon | Photon
---
Polygon | Photon

[Photon](../index.md)




Preparing search index...

* [models/Polygon](../modules/models_Polygon.md)
* Polygon

# Class Polygon

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

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

paths: [IPathMap](../interfaces/core_schema.IPathMap.md) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[paths](../interfaces/core_schema.IModel.md#paths)

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
  ): [IPoint](../interfaces/core_schema.IPoint.md)[]

  #### Parameters

  + numberOfSides: number
  + radius: number
  + firstCornerAngleInDegrees: number = 0
  + circumscribed: boolean = false

  #### Returns [IPoint](../interfaces/core_schema.IPoint.md)[]

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
