---
title: addTo | Photon
source: docs/docs/api/functions/core_model.addTo.html
---

addTo | Photon

[Photon](../index.html)




Preparing search index...

* [core/model](../modules/core_model.html)
* addTo

# Function addTo

* addTo(
      childModel: [IModel](../interfaces/core_schema.IModel.html),
      parentModel: [IModel](../interfaces/core_schema.IModel.html),
      childModelId: string,
      overWrite?: boolean,
  ): [IModel](../interfaces/core_schema.IModel.html)

  Add a model as a child of another model. This is basically equivalent to:

  ```
  parentModel.models[childModelId] = childModel;
  Copy
  ```

  with additional checks to make it safe for cascading.

  #### Parameters

  + childModel: [IModel](../interfaces/core_schema.IModel.html)

    The model to add.
  + parentModel: [IModel](../interfaces/core_schema.IModel.html)

    The model to add to.
  + childModelId: string

    The id of the child model.
  + overWrite: boolean = false

    Optional flag to overwrite any model referenced by childModelId. Default is false, which will create an id similar to childModelId.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  The original model (for cascading).

  + Defined in [core/model.ts:88](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L88)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
