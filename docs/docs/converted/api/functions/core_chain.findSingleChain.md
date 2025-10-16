---
ai_summary: findSingleChain | Photon
category: API Reference
description: findSingleChain | Photon
difficulty: intermediate
keywords:
- api-reference
- findsinglechain
- photon
primary_topic: chains
related:
- Chain Theory
- Breaking
- Routes
source: docs/docs/api/functions/core_chain.findSingleChain.html
tags:
- intermediate
- api-reference
- chains
title: findSingleChain | Photon
---
findSingleChain | Photon

[Photon](../index.md)




Preparing search index...

* [core/chain](../modules/core_chain.md)
* findSingleChain

# Function findSingleChain

* findSingleChain(modelContext: [IModel](../interfaces/core_schema.IModel.md)): [IChain](../interfaces/core_maker.IChain.md)

  Find a single chain within a model, across all layers. Shorthand of findChains; useful when you know there is only one chain to find in your model.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to search for a chain.

  #### Returns [IChain](../interfaces/core_maker.IChain.md)

  A chain object or null if chains were not found.

  + Defined in [core/chain.ts:132](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L132)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Chain Theory](../index.md)
- [Breaking](../index.md)
- [Routes](../index.md)
