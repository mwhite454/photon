---
title: findChains | Photon
source: docs/docs/api/functions/core_chain.findChains.html
---

findChains | Photon

[Photon](../index.html)




Preparing search index...

* [core/chain](../modules/core_chain.html)
* findChains

# Function findChains

* findChains(
      modelContext: [IModel](../interfaces/core_schema.IModel.html),
      options?: [IFindChainsOptions](../interfaces/core_maker.IFindChainsOptions.html),
  ): [IChain](../interfaces/core_maker.IChain.html)[] | [IChainsMap](../interfaces/core_maker.IChainsMap.html)

  Find paths that have common endpoints and form chains.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.html)

    The model to search for chains.
  + `Optional`options: [IFindChainsOptions](../interfaces/core_maker.IFindChainsOptions.html)

    Optional options object.

  #### Returns [IChain](../interfaces/core_maker.IChain.html)[] | [IChainsMap](../interfaces/core_maker.IChainsMap.html)

  An array of chains, or a map (keyed by layer id) of arrays of chains - if options.byLayers is true.

  + Defined in [core/chain.ts:160](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L160)
* findChains(
      modelContext: [IModel](../interfaces/core_schema.IModel.html),
      callback: [IChainCallback](../interfaces/core_maker.IChainCallback.html),
      options?: [IFindChainsOptions](../interfaces/core_maker.IFindChainsOptions.html),
  ): [IChain](../interfaces/core_maker.IChain.html)[] | [IChainsMap](../interfaces/core_maker.IChainsMap.html)

  Find paths that have common endpoints and form chains.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.html)

    The model to search for chains.
  + callback: [IChainCallback](../interfaces/core_maker.IChainCallback.html)

    Callback function when chains are found.
  + `Optional`options: [IFindChainsOptions](../interfaces/core_maker.IFindChainsOptions.html)

    Optional options object.

  #### Returns [IChain](../interfaces/core_maker.IChain.html)[] | [IChainsMap](../interfaces/core_maker.IChainsMap.html)

  An array of chains, or a map (keyed by layer id) of arrays of chains - if options.byLayers is true.

  + Defined in [core/chain.ts:170](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L170)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
