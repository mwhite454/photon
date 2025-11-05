---
ai_summary: ICombineOptions | Photon
category: API Reference
description: ICombineOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- icombineoptions
- models
- paths
- photon
primary_topic: combining
source: docs/docs/api/interfaces/core_core.ICombineOptions.html
tags:
- intermediate
- api-reference
- combining
title: ICombineOptions | Photon
---
ICombineOptions | Photon

[Photon](../index.md)

* [core/maker](../modules/core_maker.md)
* ICombineOptions

# Interface ICombineOptions

Options to pass to model.combine.

interface ICombineOptions {
    farPoint?: [IPoint](core_schema.IPoint.md);
    measureA?: any;
    measureB?: any;
    out_deleted?: [IModel](core_schema.IModel.md)[];
    pointMatchingDistance?: number;
    trimDeadEnds?: boolean;
}

#### Hierarchy

* [IPointMatchOptions](core_maker.IPointMatchOptions.md)
  + ICombineOptions

* Defined in [core/maker.ts:288](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L288)

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

### `Optional`out_deleted

out_deleted?: [IModel](core_schema.IModel.md)[]

Output array of 2 models (corresponding to the input models) containing paths that were deleted in the combination.
Each path will be of type IPathRemoved, which has a .reason property describing why it was removed.

* Defined in [core/maker.ts:314](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L314)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IPointMatchOptions](core_maker.IPointMatchOptions.md). pointMatchingDistance

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`trimDeadEnds

trimDeadEnds?: boolean

Flag to remove paths which are not part of a loop.

* Defined in [core/maker.ts:293](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L293)
