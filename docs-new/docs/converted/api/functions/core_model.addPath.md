---
title: addPath | Photon
source: docs/docs/api/functions/core_model.addPath.html
---

addPath | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* addPath

# Function addPath

* addPath(
      modelContext: [IModel](../interfaces/core_schema.IModel.md),
      pathContext: [IPath](../interfaces/core_schema.IPath.md),
      pathId: string,
      overWrite?: boolean,
  ): [IModel](../interfaces/core_schema.IModel.md)

  Add a path as a child. This is basically equivalent to:

  ```
  parentModel.paths[childPathId] = childPath;
  Copy
  ```

  with additional checks to make it safe for cascading.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to add to.
  + pathContext: [IPath](../interfaces/core_schema.IPath.md)

    The path to add.
  + pathId: string

    The id of the path.
  + overWrite: boolean = false

    Optional flag to overwrite any path referenced by pathId. Default is false, which will create an id similar to pathId.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:48](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L48)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
