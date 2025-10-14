---
title: EllipticArc | Photon
source: docs/docs/api/classes/models_Ellipse.EllipticArc.html
---

EllipticArc | Photon

[Photon](../index.html)




Preparing search index...

* [models/Ellipse](../modules/models_Ellipse.html)
* EllipticArc

# Class EllipticArc

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.html)

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
      arc: [IPathArc](../interfaces/core_schema.IPathArc.html),
      distortX: number,
      distortY: number,
      accuracy?: number,
  ): EllipticArc

  Class for Elliptic Arc created by distorting a circular arc.

  #### Parameters

  + arc: [IPathArc](../interfaces/core_schema.IPathArc.html)

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

models: [IModelMap](../interfaces/core_schema.IModelMap.html) = {}

Optional map of models within this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[models](../interfaces/core_schema.IModel.html#models)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
