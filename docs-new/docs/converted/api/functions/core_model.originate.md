---
title: originate | Photon
source: docs/docs/api/functions/core_model.originate.html
---

originate | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* originate

# Function originate

* originate(modelToOriginate: [IModel](../interfaces/core_schema.IModel.md), origin?: [IPoint](../interfaces/core_schema.IPoint.md)): [IModel](../interfaces/core_schema.IModel.md)

  Moves all of a model's children (models and paths, recursively) in reference to a single common origin. Useful when points between children need to connect to each other.

  #### Parameters

  + modelToOriginate: [IModel](../interfaces/core_schema.IModel.md)

    The model to originate.
  + `Optional`origin: [IPoint](../interfaces/core_schema.IPoint.md)

    Optional offset reference point.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:199](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L199)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
