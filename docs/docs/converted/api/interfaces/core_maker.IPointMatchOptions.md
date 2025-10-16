---
ai_summary: IPointMatchOptions | Photon
category: API Reference
description: IPointMatchOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- cad
- ipointmatchoptions
- photon
primary_topic: ipointmatchoptions-|-photon
source: docs/docs/api/interfaces/core_core.IPointMatchOptions.html
tags:
- ipointmatchoptions-|-photon
- api-reference
- intermediate
title: IPointMatchOptions | Photon
---
IPointMatchOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IPointMatchOptions

# Interface IPointMatchOptions

Options when matching points

interface IPointMatchOptions {
    [pointMatchingDistance](#pointmatchingdistance)?: number;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IPointMatchOptions))

* IPointMatchOptions
  + [IDXFRenderOptions](core_dxf.IDXFRenderOptions.md)
  + [ICombineOptions](core_maker.ICombineOptions.md)
  + [IFindLoopsOptions](core_maker.IFindLoopsOptions.md)
  + [ISimplifyOptions](core_maker.ISimplifyOptions.md)
  + [IFindChainsOptions](core_maker.IFindChainsOptions.md)
  + [IJscadCagOptions](core_openjscad-esm.IJscadCagOptions.md)

* Defined in [core/maker.ts:277](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L277)

##### Index

### Properties

[pointMatchingDistance?](#pointmatchingdistance)

## Properties

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[pointMatchingDistance](#pointmatchingdistance)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
