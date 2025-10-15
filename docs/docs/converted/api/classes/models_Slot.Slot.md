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
- slot
primary_topic: slot-|-photon
source: docs/docs/api/classes/models_Slot.Slot.html
tags:
- slot-|-photon
- api-reference
- intermediate
title: Slot | Photon
---
Slot | Photon

[Photon](../index.md)




Preparing search index...

* [models/Slot](../modules/models_Slot.md)
* Slot

# Class Slot

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

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
      origin: [IPoint](../interfaces/core_schema.IPoint.md),
      endPoint: [IPoint](../interfaces/core_schema.IPoint.md),
      radius: number,
      isolateCaps?: boolean,
  ): Slot

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.md)
  + endPoint: [IPoint](../interfaces/core_schema.IPoint.md)
  + radius: number
  + isolateCaps: boolean = false

  #### Returns Slot

  + Defined in [models/Slot.ts:15](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Slot.ts#L15)

## Properties

### models

models: [IModelMap](../interfaces/core_schema.IModelMap.md)

Optional map of models within this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[models](../interfaces/core_schema.IModel.md#models)

* Defined in [models/Slot.ts:13](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Slot.ts#L13)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.md)

Optional origin location of this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[origin](../interfaces/core_schema.IModel.md#origin)

* Defined in [models/Slot.ts:12](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Slot.ts#L12)

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.md) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[paths](../interfaces/core_schema.IModel.md#paths)

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
