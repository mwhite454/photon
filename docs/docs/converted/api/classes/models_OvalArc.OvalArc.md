---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- models
- ovalarc
- paths
- photon
primary_topic: arcs
source: docs/docs/api/classes/models_OvalArc.OvalArc.html
tags:
- intermediate
- api-reference
- arcs
title: OvalArc | Photon
---
OvalArc | Photon

[Photon](../index.md)




Preparing search index...

* [models/OvalArc](../modules/models_OvalArc.md)
* OvalArc

# Class OvalArc

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

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

models: [IModelMap](../interfaces/core_schema.IModelMap.md)

Optional map of models within this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[models](../interfaces/core_schema.IModel.md#models)

* Defined in [models/OvalArc.ts:12](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/OvalArc.ts#L12)

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.md) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[paths](../interfaces/core_schema.IModel.md#paths)

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
