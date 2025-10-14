---
title: IFindLoopsOptions | Photon
source: docs/docs/api/interfaces/core_maker.IFindLoopsOptions.html
---

IFindLoopsOptions | Photon

[Photon](../index.html)




Preparing search index...

* [core/maker](../modules/core_maker.html)
* IFindLoopsOptions

# Interface IFindLoopsOptions

Options to pass to model.findLoops.

interface IFindLoopsOptions {
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [removeFromOriginal](#removefromoriginal)?: boolean;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/maker.IFindLoopsOptions))

* [IPointMatchOptions](core_maker.IPointMatchOptions.html)
  + IFindLoopsOptions
    - [IOpenJsCadOptions](core_openjscad-esm.IOpenJsCadOptions.html)

* Defined in [core/maker.ts:331](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L331)

##### Index

### Properties

[pointMatchingDistance?](#pointmatchingdistance)
[removeFromOriginal?](#removefromoriginal)

## Properties

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IPointMatchOptions](core_maker.IPointMatchOptions.html).[pointMatchingDistance](core_maker.IPointMatchOptions.html#pointmatchingdistance)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
