---
ai_summary: ISimplifyOptions | Photon
category: API Reference
description: ISimplifyOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- isimplifyoptions
- photon
primary_topic: simplification
source: docs/docs/api/interfaces/core_core.ISimplifyOptions.html
tags:
- simplification
- api-reference
- intermediate
title: ISimplifyOptions | Photon
---
ISimplifyOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_core.md)
* ISimplifyOptions

# Interface ISimplifyOptions

Options to pass to model.simplify()

interface ISimplifyOptions {
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [scalarMatchingDistance](#scalarmatchingdistance)?: number;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.ISimplifyOptions))

* [IPointMatchOptions](core_core.IPointMatchOptions.md)
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

Inherited from [IPointMatchOptions](core_core.IPointMatchOptions.md).[pointMatchingDistance](core_core.IPointMatchOptions.md#pointmatchingdistance)

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
