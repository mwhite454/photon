---
title: Slot | Photon
source: docs/docs/api/classes/models_Slot.Slot.html
---

Slot | Photon

[Photon](../index.html)




Preparing search index...

* [models/Slot](../modules/models_Slot.html)
* Slot

# Class Slot

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.html)

* Defined in [models/Slot.ts:10](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Slot.ts#L10)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[models](#models)
[origin](#origin)
[paths](#paths)

## Constructors

### constructor

* new Slot(
      origin: [IPoint](../interfaces/core_schema.IPoint.html),
      endPoint: [IPoint](../interfaces/core_schema.IPoint.html),
      radius: number,
      isolateCaps?: boolean,
  ): Slot

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.html)
  + endPoint: [IPoint](../interfaces/core_schema.IPoint.html)
  + radius: number
  + isolateCaps: boolean = false

  #### Returns Slot

  + Defined in [models/Slot.ts:15](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Slot.ts#L15)

## Properties

### models

models: [IModelMap](../interfaces/core_schema.IModelMap.html)

Optional map of models within this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[models](../interfaces/core_schema.IModel.html#models)

* Defined in [models/Slot.ts:13](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Slot.ts#L13)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.html)

Optional origin location of this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[origin](../interfaces/core_schema.IModel.html#origin)

* Defined in [models/Slot.ts:12](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Slot.ts#L12)

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.html) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[paths](../interfaces/core_schema.IModel.html#paths)

* Defined in [models/Slot.ts:11](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Slot.ts#L11)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[models](#models)[origin](#origin)[paths](#paths)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
