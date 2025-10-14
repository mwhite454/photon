---
title: Dogbone | Photon
source: docs/docs/api/classes/models_Dogbone.Dogbone.html
---

Dogbone | Photon

[Photon](../index.html)




Preparing search index...

* [models/Dogbone](../modules/models_Dogbone.html)
* Dogbone

# Class Dogbone

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.html)

* Defined in [models/Dogbone.ts:5](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Dogbone.ts#L5)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[paths](#paths)

## Constructors

### constructor

* new Dogbone(
      width: number,
      height: number,
      radius: number,
      style?: number,
      bottomless?: boolean,
  ): Dogbone

  Create a dogbone from width, height, corner radius, style, and bottomless flag.

  #### Parameters

  + width: number
  + height: number
  + radius: number
  + style: number = 0
  + bottomless: boolean = false

  #### Returns Dogbone

  + Defined in [models/Dogbone.ts:9](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Dogbone.ts#L9)

## Properties

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.html) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[paths](../interfaces/core_schema.IModel.html#paths)

* Defined in [models/Dogbone.ts:6](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Dogbone.ts#L6)

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
