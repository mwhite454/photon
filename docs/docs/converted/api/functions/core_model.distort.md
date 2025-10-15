---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- cad
- distort
- photon
primary_topic: distorting
source: docs/docs/api/functions/core_model.distort.html
tags:
- intermediate
- api-reference
- distorting
title: distort | Photon
---
distort | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* distort

# Function distort

* distort(
      modelToDistort: [IModel](../interfaces/core_schema.IModel.md),
      scaleX: number,
      scaleY: number,
      scaleOrigin?: boolean,
      bezierAccuracy?: number,
  ): [IModel](../interfaces/core_schema.IModel.md)

  Create a distorted copy of a model - scale x and y individually.

  #### Parameters

  + modelToDistort: [IModel](../interfaces/core_schema.IModel.md)

    The model to distort.
  + scaleX: number

    The amount of x scaling.
  + scaleY: number

    The amount of y scaling.
  + scaleOrigin: boolean = false

    Optional boolean to scale the origin point. Typically false for the root model.
  + `Optional`bezierAccuracy: number

    Optional accuracy of Bezier curves.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  New model (for cascading).

  + Defined in [core/model.ts:479](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L479)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
