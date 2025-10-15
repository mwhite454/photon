---
ai_summary: IFindLoopsOptions | Photon
category: API Reference
description: IFindLoopsOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- cad
- ifindloopsoptions
- paths
- photon
primary_topic: ifindloopsoptions-|-photon
source: docs/docs/api/interfaces/core_core.IFindLoopsOptions.html
tags:
- intermediate
- api-reference
- ifindloopsoptions-|-photon
title: IFindLoopsOptions | Photon
---
IFindLoopsOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_core.md)
* IFindLoopsOptions

# Interface IFindLoopsOptions

Options to pass to model.findLoops.

interface IFindLoopsOptions {
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [removeFromOriginal](#removefromoriginal)?: boolean;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IFindLoopsOptions))

* [IPointMatchOptions](core_core.IPointMatchOptions.md)
  + IFindLoopsOptions
    - [IOpenJsCadOptions](core_openjscad-esm.IOpenJsCadOptions.md)

* Defined in [core/maker.ts:331](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L331)

##### Index

### Properties

[pointMatchingDistance?](#pointmatchingdistance)
[removeFromOriginal?](#removefromoriginal)

## Properties

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IPointMatchOptions](core_core.IPointMatchOptions.md).[pointMatchingDistance](core_core.IPointMatchOptions.md#pointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`removeFromOriginal

removeFromOriginal?: boolean

Flag to remove looped paths from the original model.

* Defined in [core/maker.ts:336](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L336)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[pointMatchingDistance](#pointmatchingdistance)[removeFromOriginal](#removefromoriginal)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
