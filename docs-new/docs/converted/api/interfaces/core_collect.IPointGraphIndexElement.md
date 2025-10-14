---
title: IPointGraphIndexElement | Photon
source: docs/docs/api/interfaces/core_collect.IPointGraphIndexElement.html
---

IPointGraphIndexElement | Photon

[Photon](../index.html)




Preparing search index...

* [core/collect](../modules/core_collect.html)
* IPointGraphIndexElement

# Interface IPointGraphIndexElement

The element type stored in the index of a PointGraph.

interface IPointGraphIndexElement {
    [kdId](#kdid)?: number;
    [merged](#merged)?: number[];
    [point](#point): [IPoint](core_schema.IPoint.html);
    [pointId](#pointid): number;
    [valueIds](#valueids): number[];
}

* Defined in [core/collect.ts:95](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L95)

##### Index

### Properties

[kdId?](#kdid)
[merged?](#merged)
[point](#point)
[pointId](#pointid)
[valueIds](#valueids)

## Properties

### `Optional`kdId

kdId?: number

This point's ordinal position in the kd-tree.

* Defined in [core/collect.ts:120](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L120)

### `Optional`merged

merged?: number[]

Array of other pointId's merged with this one.

* Defined in [core/collect.ts:110](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L110)

### point

point: [IPoint](core_schema.IPoint.html)

The point.

* Defined in [core/collect.ts:100](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L100)

### pointId

pointId: number

The id of this point.

* Defined in [core/collect.ts:105](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L105)

### valueIds

valueIds: number[]

Array of valueId's for this point.

* Defined in [core/collect.ts:115](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L115)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[kdId](#kdid)[merged](#merged)[point](#point)[pointId](#pointid)[valueIds](#valueids)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
