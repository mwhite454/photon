---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- atlas
- models
- photon
primary_topic: atlas-|-photon
source: docs/docs/api/classes/core_measure.Atlas.html
tags:
- intermediate
- api-reference
- atlas-|-photon
title: Atlas | Photon
---
Atlas | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* Atlas

# Class Atlas

A list of maps of measurements.

#### Param: modelToMeasure

The model to measure.

#### Param: atlas

Optional atlas to save measurements.

#### Returns

object with low and high points.

* Defined in [core/measure.ts:595](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L595)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[modelContext](#modelcontext)
[modelMap](#modelmap)
[modelsMeasured](#modelsmeasured)
[pathMap](#pathmap)

### Methods

[measureModels](#measuremodels)

## Constructors

### constructor

* new Atlas(modelContext: [IModel](../interfaces/core_schema.IModel.md)): Atlas

  Constructor.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to measure.

  #### Returns Atlas

  + Defined in [core/measure.ts:616](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L616)

## Properties

### modelContext

modelContext: [IModel](../interfaces/core_schema.IModel.md)

The model to measure.

* Defined in [core/measure.ts:616](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L616)

### modelMap

modelMap: [IMeasureMap](../interfaces/core_core.IMeasureMap.md) = {}

Map of model measurements, mapped by routeKey.

* Defined in [core/measure.ts:605](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L605)

### modelsMeasured

modelsMeasured: boolean = false

Flag that models have been measured.

* Defined in [core/measure.ts:600](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L600)

### pathMap

pathMap: [IMeasureMap](../interfaces/core_core.IMeasureMap.md) = {}

Map of path measurements, mapped by routeKey.

* Defined in [core/measure.ts:610](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L610)

## Methods

### measureModels

* measureModels(): void

  #### Returns void

  + Defined in [core/measure.ts:619](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L619)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[modelContext](#modelcontext)[modelMap](#modelmap)[modelsMeasured](#modelsmeasured)[pathMap](#pathmap)

Methods

[measureModels](#measuremodels)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
