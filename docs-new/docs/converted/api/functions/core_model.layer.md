---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- cad
- layer
- photon
primary_topic: layers
source: docs/docs/api/functions/core_model.layer.html
tags:
- intermediate
- api-reference
- layers
title: layer | Photon
---
layer | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* layer

# Function layer

* layer(modelContext: [IModel](../interfaces/core_schema.IModel.md), layer: string): [IModel](../interfaces/core_schema.IModel.md)

  Set the layer of a model. This is equivalent to:

  ```
  modelContext.layer = layer;
  Copy
  ```

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to set the layer.
  + layer: string

    The layer name.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:187](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L187)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
