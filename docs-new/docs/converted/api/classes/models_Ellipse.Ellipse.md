---
title: Ellipse | Photon
source: docs/docs/api/classes/models_Ellipse.Ellipse.html
---

Ellipse | Photon

[Photon](../index.html)




Preparing search index...

* [models/Ellipse](../modules/models_Ellipse.html)
* Ellipse

# Class Ellipse

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.html)

* Defined in [models/Ellipse.ts:65](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L65)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[models](#models)
[origin](#origin)

## Constructors

### constructor

* new Ellipse(radiusX: number, radiusY: number, accuracy?: number): Ellipse

  Class for Ellipse created with 2 radii.

  #### Parameters

  + radiusX: number

    The x radius of the ellipse.
  + radiusY: number

    The y radius of the ellipse.
  + `Optional`accuracy: number

    Optional accuracy of the underlying BezierCurve.

  #### Returns Ellipse

  + Defined in [models/Ellipse.ts:77](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L77)
* new Ellipse(
      origin: [IPoint](../interfaces/core_schema.IPoint.html),
      radiusX: number,
      radiusY: number,
      accuracy?: number,
  ): Ellipse

  Class for Ellipse created at a specific origin and 2 radii.

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.html)

    The center of the ellipse.
  + radiusX: number

    The x radius of the ellipse.
  + radiusY: number

    The y radius of the ellipse.
  + `Optional`accuracy: number

    Optional accuracy of the underlying BezierCurve.

  #### Returns Ellipse

  + Defined in [models/Ellipse.ts:87](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L87)
* new Ellipse(
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      accuracy?: number,
  ): Ellipse

  Class for Ellipse created at a specific x, y and 2 radii.

  #### Parameters

  + cx: number

    The x coordinate of the center of the ellipse.
  + cy: number

    The y coordinate of the center of the ellipse.
  + rx: number
  + ry: number
  + `Optional`accuracy: number

    Optional accuracy of the underlying BezierCurve.

  #### Returns Ellipse

  + Defined in [models/Ellipse.ts:98](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L98)

## Properties

### models

models: [IModelMap](../interfaces/core_schema.IModelMap.html) = {}

Optional map of models within this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[models](../interfaces/core_schema.IModel.html#models)

* Defined in [models/Ellipse.ts:67](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L67)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.html)

Optional origin location of this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[origin](../interfaces/core_schema.IModel.html#origin)

* Defined in [models/Ellipse.ts:68](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Ellipse.ts#L68)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[models](#models)[origin](#origin)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
