---
ai_summary: isPointArrayClockwise | Photon
category: API Reference
description: isPointArrayClockwise | Photon
difficulty: intermediate
keywords:
- api-reference
- ispointarrayclockwise
- photon
primary_topic: ispointarrayclockwise-|-photon
source: docs/docs/api/functions/core_measure.isPointArrayClockwise.html
tags:
- intermediate
- api-reference
- ispointarrayclockwise-|-photon
title: isPointArrayClockwise | Photon
---
isPointArrayClockwise | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* isPointArrayClockwise

# Function isPointArrayClockwise

* isPointArrayClockwise(
      points: [IPoint](../interfaces/core_schema.IPoint.md)[],
      out\_result?: { hullPoints?: [IPoint](../interfaces/core_schema.IPoint.md)[]; keyPoints?: [IPoint](../interfaces/core_schema.IPoint.md)[] },
  ): boolean

  Check for array of points being clockwise or not.

  #### Parameters

  + points: [IPoint](../interfaces/core_schema.IPoint.md)[]

    The array of points to test.
  + `Optional`out\_result: { hullPoints?: [IPoint](../interfaces/core_schema.IPoint.md)[]; keyPoints?: [IPoint](../interfaces/core_schema.IPoint.md)[] }

    Optional output object, if provided, will be populated with convex hull results.

  #### Returns boolean

  Boolean true if points flow clockwise.

  + Defined in [core/measure.ts:247](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L247)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
