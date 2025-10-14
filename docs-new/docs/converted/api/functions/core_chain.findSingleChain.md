---
title: findSingleChain | Photon
source: docs/docs/api/functions/core_chain.findSingleChain.html
---

findSingleChain | Photon

[Photon](../index.html)




Preparing search index...

* [core/chain](../modules/core_chain.html)
* findSingleChain

# Function findSingleChain

* findSingleChain(modelContext: [IModel](../interfaces/core_schema.IModel.html)): [IChain](../interfaces/core_maker.IChain.html)

  Find a single chain within a model, across all layers. Shorthand of findChains; useful when you know there is only one chain to find in your model.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.html)

    The model to search for a chain.

  #### Returns [IChain](../interfaces/core_maker.IChain.html)

  A chain object or null if chains were not found.

  + Defined in [core/chain.ts:132](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L132)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
