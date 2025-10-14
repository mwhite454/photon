---
title: layer | Photon
source: docs/docs/api/functions/core_model.layer.html
---

layer | Photon

[Photon](../index.html)




Preparing search index...

* [core/model](../modules/core_model.html)
* layer

# Function layer

* layer(modelContext: [IModel](../interfaces/core_schema.IModel.html), layer: string): [IModel](../interfaces/core_schema.IModel.html)

  Set the layer of a model. This is equivalent to:

  ```
  modelContext.layer = layer;
  Copy
  ```

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.html)

    The model to set the layer.
  + layer: string

    The layer name.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  The original model (for cascading).

  + Defined in [core/model.ts:187](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L187)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
