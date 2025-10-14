---
title: BezierCurve | Photon
source: docs/docs/api/classes/models_BezierCurve-esm.BezierCurve.html
---

BezierCurve | Photon

[Photon](../index.html)




Preparing search index...

* [models/BezierCurve-esm](../modules/models_BezierCurve-esm.html)
* BezierCurve

# Class BezierCurve

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.html)

* Defined in [models/BezierCurve-esm.ts:376](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L376)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[accuracy](#accuracy)
[models](#models)
[origin](#origin)
[paths](#paths)
[seed](#seed)
[type](#type)
[typeName](#typename)

### Methods

[computeLength](#computelength)
[computePoint](#computepoint)
[getBezierSeeds](#getbezierseeds)

## Constructors

### constructor

* new BezierCurve(points: [IPoint](../interfaces/core_schema.IPoint.html)[], accuracy?: number): BezierCurve

  #### Parameters

  + points: [IPoint](../interfaces/core_schema.IPoint.html)[]
  + `Optional`accuracy: number

  #### Returns BezierCurve

  + Defined in [models/BezierCurve-esm.ts:384](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L384)
* new BezierCurve(seed: [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.html), accuracy?: number): BezierCurve

  #### Parameters

  + seed: [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.html)
  + `Optional`accuracy: number

  #### Returns BezierCurve

  + Defined in [models/BezierCurve-esm.ts:385](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L385)
* new BezierCurve(
      origin: [IPoint](../interfaces/core_schema.IPoint.html),
      control: [IPoint](../interfaces/core_schema.IPoint.html),
      end: [IPoint](../interfaces/core_schema.IPoint.html),
      accuracy?: number,
  ): BezierCurve

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.html)
  + control: [IPoint](../interfaces/core_schema.IPoint.html)
  + end: [IPoint](../interfaces/core_schema.IPoint.html)
  + `Optional`accuracy: number

  #### Returns BezierCurve

  + Defined in [models/BezierCurve-esm.ts:386](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L386)
* new BezierCurve(
      origin: [IPoint](../interfaces/core_schema.IPoint.html),
      controls: [IPoint](../interfaces/core_schema.IPoint.html)[],
      end: [IPoint](../interfaces/core_schema.IPoint.html),
      accuracy?: number,
  ): BezierCurve

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.html)
  + controls: [IPoint](../interfaces/core_schema.IPoint.html)[]
  + end: [IPoint](../interfaces/core_schema.IPoint.html)
  + `Optional`accuracy: number

  #### Returns BezierCurve

  + Defined in [models/BezierCurve-esm.ts:387](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L387)
* new BezierCurve(
      origin: [IPoint](../interfaces/core_schema.IPoint.html),
      control1: [IPoint](../interfaces/core_schema.IPoint.html),
      control2: [IPoint](../interfaces/core_schema.IPoint.html),
      end: [IPoint](../interfaces/core_schema.IPoint.html),
      accuracy?: number,
  ): BezierCurve

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.html)
  + control1: [IPoint](../interfaces/core_schema.IPoint.html)
  + control2: [IPoint](../interfaces/core_schema.IPoint.html)
  + end: [IPoint](../interfaces/core_schema.IPoint.html)
  + `Optional`accuracy: number

  #### Returns BezierCurve

  + Defined in [models/BezierCurve-esm.ts:388](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L388)

## Properties

### accuracy

accuracy: number

* Defined in [models/BezierCurve-esm.ts:382](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L382)

### models

models: [IModelMap](../interfaces/core_schema.IModelMap.html)

Optional map of models within this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[models](../interfaces/core_schema.IModel.html#models)

* Defined in [models/BezierCurve-esm.ts:377](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L377)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.html)

Optional origin location of this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[origin](../interfaces/core_schema.IModel.html#origin)

* Defined in [models/BezierCurve-esm.ts:379](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L379)

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.html)

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[paths](../interfaces/core_schema.IModel.html#paths)

* Defined in [models/BezierCurve-esm.ts:378](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L378)

### seed

seed: [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.html)

* Defined in [models/BezierCurve-esm.ts:381](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L381)

### type

type: string = BezierCurve.typeName

A model may want to specify its type, but this value is not employed yet.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[type](../interfaces/core_schema.IModel.html#type)

* Defined in [models/BezierCurve-esm.ts:380](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L380)

### `Static`typeName

typeName: string = 'BezierCurve'

* Defined in [models/BezierCurve-esm.ts:477](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L477)

## Methods

### `Static`computeLength

* computeLength(seed: [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.html)): number

  #### Parameters

  + seed: [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.html)

  #### Returns number

  + Defined in [models/BezierCurve-esm.ts:537](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L537)

### `Static`computePoint

* computePoint(seed: [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.html), t: number): [IPoint](../interfaces/core_schema.IPoint.html)

  #### Parameters

  + seed: [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.html)
  + t: number

  #### Returns [IPoint](../interfaces/core_schema.IPoint.html)

  + Defined in [models/BezierCurve-esm.ts:542](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L542)

### `Static`getBezierSeeds

* getBezierSeeds(
      curve: BezierCurve,
      options?: [IFindChainsOptions](../interfaces/core_maker.IFindChainsOptions.html),
  ): [IPath](../interfaces/core_schema.IPath.html)[] | { [layer: string]: [IPath](../interfaces/core_schema.IPath.html)[] }

  #### Parameters

  + curve: BezierCurve
  + options: [IFindChainsOptions](../interfaces/core_maker.IFindChainsOptions.html) = {}

  #### Returns [IPath](../interfaces/core_schema.IPath.html)[] | { [layer: string]: [IPath](../interfaces/core_schema.IPath.html)[] }

  + Defined in [models/BezierCurve-esm.ts:479](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L479)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[accuracy](#accuracy)[models](#models)[origin](#origin)[paths](#paths)[seed](#seed)[type](#type)[typeName](#typename)

Methods

[computeLength](#computelength)[computePoint](#computepoint)[getBezierSeeds](#getbezierseeds)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
