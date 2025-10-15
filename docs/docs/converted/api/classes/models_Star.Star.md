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
- star
primary_topic: star-|-photon
source: docs/docs/api/classes/models_Star.Star.html
tags:
- star-|-photon
- api-reference
- intermediate
title: Star | Photon
---
Star | Photon

[Photon](../index.md)




Preparing search index...

* [models/Star](../modules/models_Star.md)
* Star

# Class Star

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

* Defined in [models/Star.ts:6](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Star.ts#L6)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[paths](#paths)

### Methods

[InnerRadiusRatio](#innerradiusratio)

## Constructors

### constructor

* new Star(
      numberOfPoints: number,
      outerRadius: number,
      innerRadius?: number,
      skipPoints?: number,
  ): Star

  #### Parameters

  + numberOfPoints: number
  + outerRadius: number
  + `Optional`innerRadius: number
  + skipPoints: number = 2

  #### Returns Star

  + Defined in [models/Star.ts:9](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Star.ts#L9)

## Properties

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.md) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[paths](../interfaces/core_schema.IModel.md#paths)

* Defined in [models/Star.ts:7](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Star.ts#L7)

## Methods

### `Static`InnerRadiusRatio

* InnerRadiusRatio(numberOfPoints: number, skipPoints: number): number

  #### Parameters

  + numberOfPoints: number
  + skipPoints: number

  #### Returns number

  + Defined in [models/Star.ts:29](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Star.ts#L29)

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

Methods

[InnerRadiusRatio](#innerradiusratio)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
