---
title: cycle | Photon
source: docs/docs/api/functions/core_chain.cycle.html
---

cycle | Photon

[Photon](../index.md)




Preparing search index...

* [core/chain](../modules/core_chain.md)
* cycle

# Function cycle

* cycle(chainContext: [IChain](../interfaces/core_maker.IChain.md), amount?: number): [IChain](../interfaces/core_maker.IChain.md)

  Shift the links of an endless chain.

  #### Parameters

  + chainContext: [IChain](../interfaces/core_maker.IChain.md)

    Chain to cycle through. Must be endless.
  + amount: number = 1

    Optional number of links to shift. May be negative to cycle backwards.

  #### Returns [IChain](../interfaces/core_maker.IChain.md)

  The chainContext for cascading.

  + Defined in [core/chain.ts:456](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L456)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
