---
title: addModel | Photon
source: docs/docs/api/functions/core_model.addModel.html
---

addModel | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* addModel

# Function addModel

* addModel(
      parentModel: [IModel](../interfaces/core_schema.IModel.md),
      childModel: [IModel](../interfaces/core_schema.IModel.md),
      childModelId: string,
      overWrite?: boolean,
  ): [IModel](../interfaces/core_schema.IModel.md)

  Add a model as a child. This is basically equivalent to:

  ```
  parentModel.models[childModelId] = childModel;
  Copy
  ```

  with additional checks to make it safe for cascading.

  #### Parameters

  + parentModel: [IModel](../interfaces/core_schema.IModel.md)

    The model to add to.
  + childModel: [IModel](../interfaces/core_schema.IModel.md)

    The model to add.
  + childModelId: string

    The id of the child model.
  + overWrite: boolean = false

    Optional flag to overwrite any model referenced by childModelId. Default is false, which will create an id similar to childModelId.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:68](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L68)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
