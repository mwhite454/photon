---
title: move | Photon
source: docs/docs/api/functions/core_model.move.html
---

move | Photon

[Photon](../index.html)




Preparing search index...

* [core/model](../modules/core_model.html)
* move

# Function move

* move(modelToMove: [IModel](../interfaces/core_schema.IModel.html), origin: [IPoint](../interfaces/core_schema.IPoint.html)): [IModel](../interfaces/core_schema.IModel.html)

  Move a model to an absolute point. Note that this is also accomplished by directly setting the origin property. This function exists for cascading.

  #### Parameters

  + modelToMove: [IModel](../interfaces/core_schema.IModel.html)

    The model to move.
  + origin: [IPoint](../interfaces/core_schema.IPoint.html)

    The new position of the model.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  The original model (for cascading).

  + Defined in [core/model.ts:326](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L326)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
