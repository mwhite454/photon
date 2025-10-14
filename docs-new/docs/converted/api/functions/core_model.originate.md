---
title: originate | Photon
source: docs/docs/api/functions/core_model.originate.html
---

originate | Photon

[Photon](../index.html)




Preparing search index...

* [core/model](../modules/core_model.html)
* originate

# Function originate

* originate(modelToOriginate: [IModel](../interfaces/core_schema.IModel.html), origin?: [IPoint](../interfaces/core_schema.IPoint.html)): [IModel](../interfaces/core_schema.IModel.html)

  Moves all of a model's children (models and paths, recursively) in reference to a single common origin. Useful when points between children need to connect to each other.

  #### Parameters

  + modelToOriginate: [IModel](../interfaces/core_schema.IModel.html)

    The model to originate.
  + `Optional`origin: [IPoint](../interfaces/core_schema.IPoint.html)

    Optional offset reference point.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  The original model (for cascading).

  + Defined in [core/model.ts:199](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L199)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
