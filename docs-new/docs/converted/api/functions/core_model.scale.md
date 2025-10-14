---
title: scale | Photon
source: docs/docs/api/functions/core_model.scale.html
---

scale | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* scale

# Function scale

* scale(modelToScale: [IModel](../interfaces/core_schema.IModel.md), scaleValue: number, scaleOrigin?: boolean): [IModel](../interfaces/core_schema.IModel.md)

  Scale a model.

  #### Parameters

  + modelToScale: [IModel](../interfaces/core_schema.IModel.md)

    The model to scale.
  + scaleValue: number

    The amount of scaling.
  + scaleOrigin: boolean = false

    Optional boolean to scale the origin point. Typically false for the root model.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:419](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L419)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
