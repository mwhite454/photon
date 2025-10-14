---
title: cycle | Photon
source: docs/docs/api/functions/core_chain.cycle.html
---

cycle | Photon

[Photon](../index.html)




Preparing search index...

* [core/chain](../modules/core_chain.html)
* cycle

# Function cycle

* cycle(chainContext: [IChain](../interfaces/core_maker.IChain.html), amount?: number): [IChain](../interfaces/core_maker.IChain.html)

  Shift the links of an endless chain.

  #### Parameters

  + chainContext: [IChain](../interfaces/core_maker.IChain.html)

    Chain to cycle through. Must be endless.
  + amount: number = 1

    Optional number of links to shift. May be negative to cycle backwards.

  #### Returns [IChain](../interfaces/core_maker.IChain.html)

  The chainContext for cascading.

  + Defined in [core/chain.ts:456](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L456)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
