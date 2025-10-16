---
ai_summary: boundingHexagon | Photon
category: API Reference
description: boundingHexagon | Photon
difficulty: intermediate
keywords:
- api-reference
- boundinghexagon
- photon
primary_topic: boundinghexagon-|-photon
source: docs/docs/api/functions/core_measure.boundingHexagon.html
tags:
- intermediate
- api-reference
- boundinghexagon-|-photon
title: boundingHexagon | Photon
---
boundingHexagon | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* boundingHexagon

# Function boundingHexagon

* boundingHexagon(modelToMeasure: [IModel](../interfaces/core_schema.IModel.md)): [IBoundingHex](../interfaces/core_maker.IBoundingHex.md)

  Measures the minimum bounding hexagon surrounding a model. The hexagon is oriented such that the right and left sides are vertical, and the top and bottom are pointed.

  #### Parameters

  + modelToMeasure: [IModel](../interfaces/core_schema.IModel.md)

    The model to measure.

  #### Returns [IBoundingHex](../interfaces/core_maker.IBoundingHex.md)

  IBoundingHex object which is a hexagon model, with an additional radius property.

  + Defined in [core/measure.ts:774](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L774)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
