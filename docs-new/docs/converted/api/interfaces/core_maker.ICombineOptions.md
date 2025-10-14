---
title: ICombineOptions | Photon
source: docs/docs/api/interfaces/core_maker.ICombineOptions.html
---

ICombineOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* ICombineOptions

# Interface ICombineOptions

Options to pass to model.combine.

interface ICombineOptions {
    [farPoint](#farpoint)?: [IPoint](core_schema.IPoint.md);
    [measureA](#measurea)?: any;
    [measureB](#measureb)?: any;
    [out\_deleted](#out_deleted)?: [IModel](core_schema.IModel.md)[];
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [trimDeadEnds](#trimdeadends)?: boolean;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.ICombineOptions))

* [IPointMatchOptions](core_maker.IPointMatchOptions.md)
  + ICombineOptions

* Defined in [core/maker.ts:288](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L288)

##### Index

### Properties

[farPoint?](#farpoint)
[measureA?](#measurea)
[measureB?](#measureb)
[out\_deleted?](#out_deleted)
[pointMatchingDistance?](#pointmatchingdistance)
[trimDeadEnds?](#trimdeadends)

## Properties

### `Optional`farPoint

farPoint?: [IPoint](core_schema.IPoint.md)

Point which is known to be outside of the model.

* Defined in [core/maker.ts:298](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L298)

### `Optional`measureA

measureA?: any

Cached measurements for model A.

* Defined in [core/maker.ts:303](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L303)

### `Optional`measureB

measureB?: any

Cached measurements for model B.

* Defined in [core/maker.ts:308](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L308)

### `Optional`out\_deleted

out\_deleted?: [IModel](core_schema.IModel.md)[]

Output array of 2 models (corresponding to the input models) containing paths that were deleted in the combination.
Each path will be of type IPathRemoved, which has a .reason property describing why it was removed.

* Defined in [core/maker.ts:314](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L314)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IPointMatchOptions](core_maker.IPointMatchOptions.md).[pointMatchingDistance](core_maker.IPointMatchOptions.md#pointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`trimDeadEnds

trimDeadEnds?: boolean

Flag to remove paths which are not part of a loop.

* Defined in [core/maker.ts:293](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L293)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[farPoint](#farpoint)[measureA](#measurea)[measureB](#measureb)[out\_deleted](#out_deleted)[pointMatchingDistance](#pointmatchingdistance)[trimDeadEnds](#trimdeadends)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
