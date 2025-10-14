---
title: isPointInsideModel | Photon
source: docs/docs/api/functions/core_measure.isPointInsideModel.html
---

isPointInsideModel | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* isPointInsideModel

# Function isPointInsideModel

* isPointInsideModel(
      pointToCheck: [IPoint](../interfaces/core_schema.IPoint.md),
      modelContext: [IModel](../interfaces/core_schema.IModel.md),
      options?: [IMeasurePointInsideOptions](../interfaces/core_maker.IMeasurePointInsideOptions.md),
  ): boolean

  Check to see if a point is inside of a model.

  #### Parameters

  + pointToCheck: [IPoint](../interfaces/core_schema.IPoint.md)

    The point to check.
  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to check against.
  + options: [IMeasurePointInsideOptions](../interfaces/core_maker.IMeasurePointInsideOptions.md) = {}

    Optional IMeasurePointInsideOptions object.

  #### Returns boolean

  Boolean true if the path is inside of the modelContext.

  + Defined in [core/measure.ts:893](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L893)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
