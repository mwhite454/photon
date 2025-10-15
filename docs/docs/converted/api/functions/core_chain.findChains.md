---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- findchains
- paths
- photon
primary_topic: chains
related:
- Chain Theory
- Breaking
- Routes
source: docs/docs/api/functions/core_chain.findChains.html
tags:
- intermediate
- api-reference
- chains
title: findChains | Photon
---
findChains | Photon

[Photon](../index.md)




Preparing search index...

* [core/chain](../modules/core_chain.md)
* findChains

# Function findChains

* findChains(
      modelContext: [IModel](../interfaces/core_schema.IModel.md),
      options?: [IFindChainsOptions](../interfaces/core_core.IFindChainsOptions.md),
  ): [IChain](../interfaces/core_core.IChain.md)[] | [IChainsMap](../interfaces/core_core.IChainsMap.md)

  Find paths that have common endpoints and form chains.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to search for chains.
  + `Optional`options: [IFindChainsOptions](../interfaces/core_core.IFindChainsOptions.md)

    Optional options object.

  #### Returns [IChain](../interfaces/core_core.IChain.md)[] | [IChainsMap](../interfaces/core_core.IChainsMap.md)

  An array of chains, or a map (keyed by layer id) of arrays of chains - if options.byLayers is true.

  + Defined in [core/chain.ts:160](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L160)
* findChains(
      modelContext: [IModel](../interfaces/core_schema.IModel.md),
      callback: [IChainCallback](../interfaces/core_core.IChainCallback.md),
      options?: [IFindChainsOptions](../interfaces/core_core.IFindChainsOptions.md),
  ): [IChain](../interfaces/core_core.IChain.md)[] | [IChainsMap](../interfaces/core_core.IChainsMap.md)

  Find paths that have common endpoints and form chains.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to search for chains.
  + callback: [IChainCallback](../interfaces/core_core.IChainCallback.md)

    Callback function when chains are found.
  + `Optional`options: [IFindChainsOptions](../interfaces/core_core.IFindChainsOptions.md)

    Optional options object.

  #### Returns [IChain](../interfaces/core_core.IChain.md)[] | [IChainsMap](../interfaces/core_core.IChainsMap.md)

  An array of chains, or a map (keyed by layer id) of arrays of chains - if options.byLayers is true.

  + Defined in [core/chain.ts:170](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L170)

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
