---
title: OvalArc | Photon
source: docs/docs/api/classes/models_OvalArc.OvalArc.html
---

OvalArc | Photon

[Photon](../index.html)




Preparing search index...

* [models/OvalArc](../modules/models_OvalArc.html)
* OvalArc

# Class OvalArc

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.html)

* Defined in [models/OvalArc.ts:10](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/OvalArc.ts#L10)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[models](#models)
[paths](#paths)

## Constructors

### constructor

* new OvalArc(
      startAngle: number,
      endAngle: number,
      sweepRadius: number,
      slotRadius: number,
      selfIntersect?: boolean,
      isolateCaps?: boolean,
  ): OvalArc

  #### Parameters

  + startAngle: number
  + endAngle: number
  + sweepRadius: number
  + slotRadius: number
  + selfIntersect: boolean = false
  + isolateCaps: boolean = false

  #### Returns OvalArc

  + Defined in [models/OvalArc.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/OvalArc.ts#L14)

## Properties

### models

models: [IModelMap](../interfaces/core_schema.IModelMap.html)

Optional map of models within this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[models](../interfaces/core_schema.IModel.html#models)

* Defined in [models/OvalArc.ts:12](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/OvalArc.ts#L12)

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.html) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[paths](../interfaces/core_schema.IModel.html#paths)

* Defined in [models/OvalArc.ts:11](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/OvalArc.ts#L11)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[models](#models)[paths](#paths)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
