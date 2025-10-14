---
title: boundingHexagon | Photon
source: docs/docs/api/functions/core_measure.boundingHexagon.html
---

boundingHexagon | Photon

[Photon](../index.html)




Preparing search index...

* [core/measure](../modules/core_measure.html)
* boundingHexagon

# Function boundingHexagon

* boundingHexagon(modelToMeasure: [IModel](../interfaces/core_schema.IModel.html)): [IBoundingHex](../interfaces/core_maker.IBoundingHex.html)

  Measures the minimum bounding hexagon surrounding a model. The hexagon is oriented such that the right and left sides are vertical, and the top and bottom are pointed.

  #### Parameters

  + modelToMeasure: [IModel](../interfaces/core_schema.IModel.html)

    The model to measure.

  #### Returns [IBoundingHex](../interfaces/core_maker.IBoundingHex.html)

  IBoundingHex object which is a hexagon model, with an additional radius property.

  + Defined in [core/measure.ts:774](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L774)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
