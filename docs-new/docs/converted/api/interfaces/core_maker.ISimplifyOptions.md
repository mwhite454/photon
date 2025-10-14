---
title: ISimplifyOptions | Photon
source: docs/docs/api/interfaces/core_maker.ISimplifyOptions.html
---

ISimplifyOptions | Photon

[Photon](../index.html)




Preparing search index...

* [core/maker](../modules/core_maker.html)
* ISimplifyOptions

# Interface ISimplifyOptions

Options to pass to model.simplify()

interface ISimplifyOptions {
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [scalarMatchingDistance](#scalarmatchingdistance)?: number;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/maker.ISimplifyOptions))

* [IPointMatchOptions](core_maker.IPointMatchOptions.html)
  + ISimplifyOptions

* Defined in [core/maker.ts:342](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L342)

##### Index

### Properties

[pointMatchingDistance?](#pointmatchingdistance)
[scalarMatchingDistance?](#scalarmatchingdistance)

## Properties

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IPointMatchOptions](core_maker.IPointMatchOptions.html).[pointMatchingDistance](core_maker.IPointMatchOptions.html#pointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`scalarMatchingDistance

scalarMatchingDistance?: number

Optional

* Defined in [core/maker.ts:347](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L347)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[pointMatchingDistance](#pointmatchingdistance)[scalarMatchingDistance](#scalarmatchingdistance)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
