---
ai_summary: getAllCaptionsOffset | Photon
category: API Reference
description: getAllCaptionsOffset | Photon
difficulty: intermediate
keywords:
- api-reference
- getallcaptionsoffset
- photon
primary_topic: getallcaptionsoffset-|-photon
source: docs/docs/api/functions/core_model.getAllCaptionsOffset.html
tags:
- getallcaptionsoffset-|-photon
- api-reference
- intermediate
title: getAllCaptionsOffset | Photon
---
getAllCaptionsOffset | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* getAllCaptionsOffset

# Function getAllCaptionsOffset

* getAllCaptionsOffset(modelContext: [IModel](../interfaces/core_schema.IModel.md)): ([ICaption](../interfaces/core_schema.ICaption.md) & { layer?: string })[]

  Gets all Caption objects, in absolute position, in this model and its children.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to search for Caption objects.

  #### Returns ([ICaption](../interfaces/core_schema.ICaption.md) & { layer?: string })[]

  Array of Caption objects.

  + Defined in [core/model.ts:126](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L126)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
