---
title: IChain | Photon
source: docs/docs/api/interfaces/core_maker.IChain.html
---

IChain | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IChain

# Interface IChain

A chain of paths which connect end to end.

interface IChain {
    [contains](#contains)?: IChain[];
    [endless](#endless): boolean;
    [links](#links): [IChainLink](core_maker.IChainLink.md)[];
    [pathLength](#pathlength): number;
}

* Defined in [core/maker.ts:451](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L451)

##### Index

### Properties

[contains?](#contains)
[endless](#endless)
[links](#links)
[pathLength](#pathlength)

## Properties

### `Optional`contains

contains?: IChain[]

Chains that are contained within this chain. Populated when chains are found with the 'contain' option

* Defined in [core/maker.ts:471](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L471)

### endless

endless: boolean

Flag if this chain forms a loop end to end.

* Defined in [core/maker.ts:461](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L461)

### links

links: [IChainLink](core_maker.IChainLink.md)[]

The links in this chain.

* Defined in [core/maker.ts:456](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L456)

### pathLength

pathLength: number

Total length of all paths in the chain.

* Defined in [core/maker.ts:466](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L466)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[contains](#contains)[endless](#endless)[links](#links)[pathLength](#pathlength)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
