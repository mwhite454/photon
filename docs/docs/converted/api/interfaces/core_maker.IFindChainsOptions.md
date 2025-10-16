---
ai_summary: IFindChainsOptions | Photon
category: API Reference
description: IFindChainsOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- ifindchainsoptions
- models
- paths
- photon
primary_topic: chains
related:
- Chain Theory
- Breaking
- Routes
source: docs/docs/api/interfaces/core_core.IFindChainsOptions.html
tags:
- intermediate
- api-reference
- chains
title: IFindChainsOptions | Photon
---
IFindChainsOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IFindChainsOptions

# Interface IFindChainsOptions

Options to pass to model.findChains.

interface IFindChainsOptions {
    [byLayers](#bylayers)?: boolean;
    [contain](#contain)?: boolean | [IContainChainsOptions](core_maker.IContainChainsOptions.md);
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [shallow](#shallow)?: boolean;
    [unifyBeziers](#unifybeziers)?: boolean;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IFindChainsOptions))

* [IPointMatchOptions](core_maker.IPointMatchOptions.md)
  + IFindChainsOptions

* Defined in [core/maker.ts:501](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L501)

##### Index

### Properties

[byLayers?](#bylayers)
[contain?](#contain)
[pointMatchingDistance?](#pointmatchingdistance)
[shallow?](#shallow)
[unifyBeziers?](#unifybeziers)

## Properties

### `Optional`byLayers

byLayers?: boolean

Flag to separate chains by layers.

* Defined in [core/maker.ts:506](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L506)

### `Optional`contain

contain?: boolean | [IContainChainsOptions](core_maker.IContainChainsOptions.md)

Flag to order chains in a heirarchy by their paths being within one another.

* Defined in [core/maker.ts:516](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L516)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IPointMatchOptions](core_maker.IPointMatchOptions.md).[pointMatchingDistance](core_maker.IPointMatchOptions.md#pointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`shallow

shallow?: boolean

Flag to not recurse models, look only within current model's immediate paths.

* Defined in [core/maker.ts:511](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L511)

### `Optional`unifyBeziers

unifyBeziers?: boolean

Flag to flatten BezierCurve arc segments into IPathBezierSeeds.

* Defined in [core/maker.ts:521](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L521)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[byLayers](#bylayers)[contain](#contain)[pointMatchingDistance](#pointmatchingdistance)[shallow](#shallow)[unifyBeziers](#unifybeziers)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Chain Theory](../index.md)
- [Breaking](../index.md)
- [Routes](../index.md)
