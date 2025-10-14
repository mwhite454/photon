---
title: IChainCallback | Photon
source: docs/docs/api/interfaces/core_maker.IChainCallback.html
---

IChainCallback | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IChainCallback

# Interface IChainCallback

Callback to model.findChains() with resulting array of chains and unchained paths.

* IChainCallback(
      chains: [IChain](core_maker.IChain.md)[],
      loose: [IWalkPath](core_maker.IWalkPath.md)[],
      layer: string,
      ignored?: [IWalkPath](core_maker.IWalkPath.md)[],
  ): void

  #### Parameters

  + chains: [IChain](core_maker.IChain.md)[]
  + loose: [IWalkPath](core_maker.IWalkPath.md)[]
  + layer: string
  + `Optional`ignored: [IWalkPath](core_maker.IWalkPath.md)[]

  #### Returns void

  + Defined in [core/maker.ts:495](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L495)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
