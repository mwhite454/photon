---
title: move | Photon
source: docs/docs/api/functions/core_model.move.html
---

move | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* move

# Function move

* move(modelToMove: [IModel](../interfaces/core_schema.IModel.md), origin: [IPoint](../interfaces/core_schema.IPoint.md)): [IModel](../interfaces/core_schema.IModel.md)

  Move a model to an absolute point. Note that this is also accomplished by directly setting the origin property. This function exists for cascading.

  #### Parameters

  + modelToMove: [IModel](../interfaces/core_schema.IModel.md)

    The model to move.
  + origin: [IPoint](../interfaces/core_schema.IPoint.md)

    The new position of the model.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:326](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L326)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
