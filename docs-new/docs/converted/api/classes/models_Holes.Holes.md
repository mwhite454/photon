---
title: Holes | Photon
source: docs/docs/api/classes/models_Holes.Holes.html
---

Holes | Photon

[Photon](../index.md)




Preparing search index...

* [models/Holes](../modules/models_Holes.md)
* Holes

# Class Holes

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

* Defined in [models/Holes.ts:5](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Holes.ts#L5)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[paths](#paths)

## Constructors

### constructor

* new Holes(holeRadius: number, points: [IPoint](../interfaces/core_schema.IPoint.md)[], ids?: string[]): Holes

  Create an array of circles of the same radius from an array of center points.

  #### Parameters

  + holeRadius: number
  + points: [IPoint](../interfaces/core_schema.IPoint.md)[]
  + `Optional`ids: string[]

  #### Returns Holes

  + Defined in [models/Holes.ts:9](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Holes.ts#L9)

## Properties

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.md) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[paths](../interfaces/core_schema.IModel.md#paths)

* Defined in [models/Holes.ts:6](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Holes.ts#L6)

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
