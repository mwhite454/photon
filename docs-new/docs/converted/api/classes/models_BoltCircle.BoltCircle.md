---
title: BoltCircle | Photon
source: docs/docs/api/classes/models_BoltCircle.BoltCircle.html
---

BoltCircle | Photon

[Photon](../index.html)




Preparing search index...

* [models/BoltCircle](../modules/models_BoltCircle.html)
* BoltCircle

# Class BoltCircle

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.html)

* Defined in [models/BoltCircle.ts:6](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BoltCircle.ts#L6)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[paths](#paths)

## Constructors

### constructor

* new BoltCircle(
      boltRadius: number,
      holeRadius: number,
      boltCount: number,
      firstBoltAngleInDegrees?: number,
  ): BoltCircle

  #### Parameters

  + boltRadius: number
  + holeRadius: number
  + boltCount: number
  + firstBoltAngleInDegrees: number = 0

  #### Returns BoltCircle

  + Defined in [models/BoltCircle.ts:9](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BoltCircle.ts#L9)

## Properties

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.html) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[paths](../interfaces/core_schema.IModel.html#paths)

* Defined in [models/BoltCircle.ts:7](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BoltCircle.ts#L7)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
