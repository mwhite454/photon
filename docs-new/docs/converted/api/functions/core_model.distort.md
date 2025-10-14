---
title: distort | Photon
source: docs/docs/api/functions/core_model.distort.html
---

distort | Photon

[Photon](../index.html)




Preparing search index...

* [core/model](../modules/core_model.html)
* distort

# Function distort

* distort(
      modelToDistort: [IModel](../interfaces/core_schema.IModel.html),
      scaleX: number,
      scaleY: number,
      scaleOrigin?: boolean,
      bezierAccuracy?: number,
  ): [IModel](../interfaces/core_schema.IModel.html)

  Create a distorted copy of a model - scale x and y individually.

  #### Parameters

  + modelToDistort: [IModel](../interfaces/core_schema.IModel.html)

    The model to distort.
  + scaleX: number

    The amount of x scaling.
  + scaleY: number

    The amount of y scaling.
  + scaleOrigin: boolean = false

    Optional boolean to scale the origin point. Typically false for the root model.
  + `Optional`bezierAccuracy: number

    Optional accuracy of Bezier curves.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  New model (for cascading).

  + Defined in [core/model.ts:479](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L479)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
