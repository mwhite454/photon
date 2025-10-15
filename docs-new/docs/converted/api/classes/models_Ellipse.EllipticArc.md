---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- ellipticarc
- models
- paths
- photon
primary_topic: arcs
source: docs/docs/api/classes/models_Ellipse.EllipticArc.html
tags:
- intermediate
- api-reference
- arcs
title: EllipticArc | Photon
---
EllipticArc | Photon

[Photon](../index.md)




Preparing search index...

* [models/Ellipse](../modules/models_Ellipse.md)
* EllipticArc

# Class EllipticArc

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

* Defined in [models/Ellipse.ts:208](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L208)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[models](#models)

## Constructors

### constructor

* new EllipticArc(
      startAngle: number,
      endAngle: number,
      radiusX: number,
      radiusY: number,
      accuracy?: number,
  ): EllipticArc

  Class for Elliptic Arc created by distorting a circular arc.

  #### Parameters

  + startAngle: number
  + endAngle: number
  + radiusX: number

    The x radius of the ellipse.
  + radiusY: number

    The y radius of the ellipse.
  + `Optional`accuracy: number

    Optional accuracy of the underlying BezierCurve.

  #### Returns EllipticArc

  + Defined in [models/Ellipse.ts:219](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L219)
* new EllipticArc(
      arc: [IPathArc](../interfaces/core_schema.IPathArc.md),
      distortX: number,
      distortY: number,
      accuracy?: number,
  ): EllipticArc

  Class for Elliptic Arc created by distorting a circular arc.

  #### Parameters

  + arc: [IPathArc](../interfaces/core_schema.IPathArc.md)

    The circular arc to use as the basis of the elliptic arc.
  + distortX: number

    The x scale of the ellipse.
  + distortY: number

    The y scale of the ellipse.
  + `Optional`accuracy: number

    Optional accuracy of the underlying BezierCurve.

  #### Returns EllipticArc

  + Defined in [models/Ellipse.ts:229](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L229)

## Properties

### models

models: [IModelMap](../interfaces/core_schema.IModelMap.md) = {}

Optional map of models within this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[models](../interfaces/core_schema.IModel.md#models)

* Defined in [models/Ellipse.ts:209](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L209)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[models](#models)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
