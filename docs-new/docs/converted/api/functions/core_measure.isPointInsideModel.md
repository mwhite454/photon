---
title: isPointInsideModel | Photon
source: docs/docs/api/functions/core_measure.isPointInsideModel.html
---

isPointInsideModel | Photon

[Photon](../index.html)




Preparing search index...

* [core/measure](../modules/core_measure.html)
* isPointInsideModel

# Function isPointInsideModel

* isPointInsideModel(
      pointToCheck: [IPoint](../interfaces/core_schema.IPoint.html),
      modelContext: [IModel](../interfaces/core_schema.IModel.html),
      options?: [IMeasurePointInsideOptions](../interfaces/core_maker.IMeasurePointInsideOptions.html),
  ): boolean

  Check to see if a point is inside of a model.

  #### Parameters

  + pointToCheck: [IPoint](../interfaces/core_schema.IPoint.html)

    The point to check.
  + modelContext: [IModel](../interfaces/core_schema.IModel.html)

    The model to check against.
  + options: [IMeasurePointInsideOptions](../interfaces/core_maker.IMeasurePointInsideOptions.html) = {}

    Optional IMeasurePointInsideOptions object.

  #### Returns boolean

  Boolean true if the path is inside of the modelContext.

  + Defined in [core/measure.ts:893](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L893)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
