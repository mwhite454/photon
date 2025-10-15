---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- cad
- models
- paths
- photon
- walk
primary_topic: traversal
source: docs/docs/api/functions/core_model.walk.html
tags:
- intermediate
- api-reference
- traversal
title: walk | Photon
---
walk | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* walk

# Function walk

* walk(modelContext: [IModel](../interfaces/core_schema.IModel.md), options: [IWalkOptions](../interfaces/core_core.IWalkOptions.md)): [IModel](../interfaces/core_schema.IModel.md)

  Recursively walk through all child models and paths for a given model.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to walk.
  + options: [IWalkOptions](../interfaces/core_core.IWalkOptions.md)

    Object containing callbacks.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:575](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L575)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
