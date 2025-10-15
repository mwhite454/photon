---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- dome
- models
- paths
- photon
primary_topic: dome-|-photon
source: docs/docs/api/classes/models_Dome.Dome.html
tags:
- intermediate
- api-reference
- dome-|-photon
title: Dome | Photon
---
Dome | Photon

[Photon](../index.md)




Preparing search index...

* [models/Dome](../modules/models_Dome.md)
* Dome

# Class Dome

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

* Defined in [models/Dome.ts:5](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Dome.ts#L5)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[paths](#paths)

## Constructors

### constructor

* new Dome(
      width: number,
      height: number,
      radius?: number,
      bottomless?: boolean,
  ): Dome

  #### Parameters

  + width: number
  + height: number
  + `Optional`radius: number
  + `Optional`bottomless: boolean

  #### Returns Dome

  + Defined in [models/Dome.ts:8](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Dome.ts#L8)

## Properties

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.md) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[paths](../interfaces/core_schema.IModel.md#paths)

* Defined in [models/Dome.ts:6](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Dome.ts#L6)

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
