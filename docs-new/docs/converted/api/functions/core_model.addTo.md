---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- addto
- api-reference
- cad
- models
- photon
primary_topic: addto-|-photon
source: docs/docs/api/functions/core_model.addTo.html
tags:
- intermediate
- api-reference
- addto-|-photon
title: addTo | Photon
---
addTo | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* addTo

# Function addTo

* addTo(
      childModel: [IModel](../interfaces/core_schema.IModel.md),
      parentModel: [IModel](../interfaces/core_schema.IModel.md),
      childModelId: string,
      overWrite?: boolean,
  ): [IModel](../interfaces/core_schema.IModel.md)

  Add a model as a child of another model. This is basically equivalent to:

  ```
  parentModel.models[childModelId] = childModel;
  Copy
  ```

  with additional checks to make it safe for cascading.

  #### Parameters

  + childModel: [IModel](../interfaces/core_schema.IModel.md)

    The model to add.
  + parentModel: [IModel](../interfaces/core_schema.IModel.md)

    The model to add to.
  + childModelId: string

    The id of the child model.
  + overWrite: boolean = false

    Optional flag to overwrite any model referenced by childModelId. Default is false, which will create an id similar to childModelId.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:88](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L88)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
