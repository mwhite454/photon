---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- bezierseed
- models
- photon
primary_topic: bezier-curves
source: docs/docs/api/classes/models_BezierCurve-esm.BezierSeed.html
tags:
- intermediate
- api-reference
- bezier-curves
title: BezierSeed | Photon
---
BezierSeed | Photon

[Photon](../index.md)




Preparing search index...

* [models/BezierCurve-esm](../modules/models_BezierCurve-esm.md)
* BezierSeed

# Class BezierSeed

Class for bezier seed.

#### Implements

* [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.md)

* Defined in [models/BezierCurve-esm.ts:296](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L296)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[controls](#controls)
[end](#end)
[origin](#origin)
[type](#type)

## Constructors

### constructor

* new BezierSeed(points: [IPoint](../interfaces/core_schema.IPoint.md)[]): BezierSeed

  Class for bezier seed, created from point array.

  #### Parameters

  + points: [IPoint](../interfaces/core_schema.IPoint.md)[]

    Array of points, with the first being the origin, and the last being the end, and points between used as control points.

  #### Returns BezierSeed

  + Defined in [models/BezierCurve-esm.ts:307](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L307)
* new BezierSeed(origin: [IPoint](../interfaces/core_schema.IPoint.md), control: [IPoint](../interfaces/core_schema.IPoint.md), end: [IPoint](../interfaces/core_schema.IPoint.md)): BezierSeed

  Class for quadratic bezier seed.

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.md)

    The origin point of the curve.
  + control: [IPoint](../interfaces/core_schema.IPoint.md)

    The control point of the curve.
  + end: [IPoint](../interfaces/core_schema.IPoint.md)

    The end point of the curve.

  #### Returns BezierSeed

  + Defined in [models/BezierCurve-esm.ts:316](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L316)
* new BezierSeed(origin: [IPoint](../interfaces/core_schema.IPoint.md), controls: [IPoint](../interfaces/core_schema.IPoint.md)[], end: [IPoint](../interfaces/core_schema.IPoint.md)): BezierSeed

  Class for cubic bezier seed.

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.md)

    The origin point of the curve.
  + controls: [IPoint](../interfaces/core_schema.IPoint.md)[]

    The control points of the curve.
  + end: [IPoint](../interfaces/core_schema.IPoint.md)

    The end point of the curve.

  #### Returns BezierSeed

  + Defined in [models/BezierCurve-esm.ts:325](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L325)
* new BezierSeed(
      origin: [IPoint](../interfaces/core_schema.IPoint.md),
      control1: [IPoint](../interfaces/core_schema.IPoint.md),
      control2: [IPoint](../interfaces/core_schema.IPoint.md),
      end: [IPoint](../interfaces/core_schema.IPoint.md),
  ): BezierSeed

  Class for cubic bezier seed.

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.md)

    The origin point of the curve.
  + control1: [IPoint](../interfaces/core_schema.IPoint.md)

    The control point of the curve origin.
  + control2: [IPoint](../interfaces/core_schema.IPoint.md)

    The control point of the curve end.
  + end: [IPoint](../interfaces/core_schema.IPoint.md)

    The end point of the curve.

  #### Returns BezierSeed

  + Defined in [models/BezierCurve-esm.ts:335](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L335)

## Properties

### controls

controls: [IPoint](../interfaces/core_schema.IPoint.md)[]

The bezier control points. One point for quadratic, 2 points for cubic.

Implementation of [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.md).[controls](../interfaces/core_schema.IPathBezierSeed.md#controls)

* Defined in [models/BezierCurve-esm.ts:300](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L300)

### end

end: [IPoint](../interfaces/core_schema.IPoint.md)

The end point defining the line. The start point is the origin.

Implementation of [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.md).[end](../interfaces/core_schema.IPathBezierSeed.md#end)

* Defined in [models/BezierCurve-esm.ts:299](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L299)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.md)

The main point of reference for this path.

Implementation of [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.md).[origin](../interfaces/core_schema.IPathBezierSeed.md#origin)

* Defined in [models/BezierCurve-esm.ts:298](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L298)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Implementation of [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.md).[type](../interfaces/core_schema.IPathBezierSeed.md#type)

* Defined in [models/BezierCurve-esm.ts:297](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/BezierCurve-esm.ts#L297)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[controls](#controls)[end](#end)[origin](#origin)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
