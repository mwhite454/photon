---
ai_summary: modelExtents | Photon
category: API Reference
description: modelExtents | Photon
difficulty: intermediate
keywords:
- api-reference
- modelextents
- photon
primary_topic: models
related:
- Modeling
- Paths
- Built-in Models
source: docs/docs/api/functions/core_measure.modelExtents.html
tags:
- intermediate
- api-reference
- models
title: modelExtents | Photon
---
modelExtents | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* modelExtents

# Function modelExtents

* modelExtents(modelToMeasure: [IModel](../interfaces/core_schema.IModel.md), atlas?: [Atlas](../classes/core_measure.Atlas.md)): [IMeasureWithCenter](../interfaces/core_maker.IMeasureWithCenter.md)

  Measures the smallest rectangle which contains a model.

  #### Parameters

  + modelToMeasure: [IModel](../interfaces/core_schema.IModel.md)

    The model to measure.
  + `Optional`atlas: [Atlas](../classes/core_measure.Atlas.md)

    Optional atlas to save measurements.

  #### Returns [IMeasureWithCenter](../interfaces/core_maker.IMeasureWithCenter.md)

  object with low and high points.

  + Defined in [core/measure.ts:521](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L521)

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
