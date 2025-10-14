---
title: rotate | Photon
source: docs/docs/api/functions/core_model.rotate.html
---

rotate | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* rotate

# Function rotate

* rotate(
      modelToRotate: [IModel](../interfaces/core_schema.IModel.md),
      angleInDegrees: number,
      rotationOrigin?: [IPoint](../interfaces/core_schema.IPoint.md),
  ): [IModel](../interfaces/core_schema.IModel.md)

  Rotate a model.

  #### Parameters

  + modelToRotate: [IModel](../interfaces/core_schema.IModel.md)

    The model to rotate.
  + angleInDegrees: number

    The amount of rotation, in degrees.
  + rotationOrigin: [IPoint](../interfaces/core_schema.IPoint.md) = ...

    The center point of rotation.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:383](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L383)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
