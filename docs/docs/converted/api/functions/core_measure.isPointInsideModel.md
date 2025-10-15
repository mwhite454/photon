---
ai_summary: isPointInsideModel | Photon
category: API Reference
description: isPointInsideModel | Photon
difficulty: intermediate
keywords:
- api-reference
- ispointinsidemodel
- photon
primary_topic: models
related:
- Modeling
- Paths
- Built-in Models
source: docs/docs/api/functions/core_measure.isPointInsideModel.html
tags:
- intermediate
- api-reference
- models
title: isPointInsideModel | Photon
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
      options?: [IMeasurePointInsideOptions](../interfaces/core_core.IMeasurePointInsideOptions.md),
  ): boolean

  Check to see if a point is inside of a model.

  #### Parameters

  + pointToCheck: [IPoint](../interfaces/core_schema.IPoint.md)

    The point to check.
  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to check against.
  + options: [IMeasurePointInsideOptions](../interfaces/core_core.IMeasurePointInsideOptions.md) = {}

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

## Related Topics

- [Modeling](../index.md)
- [Paths](../index.md)
- [Built-in Models](../index.md)
