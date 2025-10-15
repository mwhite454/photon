---
ai_summary: IMeasureWithCenter | Photon
category: API Reference
description: IMeasureWithCenter | Photon
difficulty: intermediate
keywords:
- api-reference
- imeasurewithcenter
- photon
primary_topic: measuring
source: docs/docs/api/interfaces/core_core.IMeasureWithCenter.html
tags:
- intermediate
- api-reference
- measuring
title: IMeasureWithCenter | Photon
---
IMeasureWithCenter | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_core.md)
* IMeasureWithCenter

# Interface IMeasureWithCenter

A measurement of extents, with a center point.

interface IMeasureWithCenter {
    [center](#center): [IPoint](core_schema.IPoint.md);
    [height](#height): number;
    [high](#high): [IPoint](core_schema.IPoint.md);
    [low](#low): [IPoint](core_schema.IPoint.md);
    [width](#width): number;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IMeasureWithCenter))

* [IMeasure](core_core.IMeasure.md)
  + IMeasureWithCenter

* Defined in [core/maker.ts:162](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L162)

##### Index

### Properties

[center](#center)
[height](#height)
[high](#high)
[low](#low)
[width](#width)

## Properties

### center

center: [IPoint](core_schema.IPoint.md)

* Defined in [core/maker.ts:163](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L163)

### height

height: number

* Defined in [core/maker.ts:165](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L165)

### high

high: [IPoint](core_schema.IPoint.md)

Inherited from [IMeasure](core_core.IMeasure.md).[high](core_core.IMeasure.md#high)

* Defined in [core/maker.ts:158](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L158)

### low

low: [IPoint](core_schema.IPoint.md)

Inherited from [IMeasure](core_core.IMeasure.md).[low](core_core.IMeasure.md#low)

* Defined in [core/maker.ts:157](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L157)

### width

width: number

* Defined in [core/maker.ts:164](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L164)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[center](#center)[height](#height)[high](#high)[low](#low)[width](#width)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
