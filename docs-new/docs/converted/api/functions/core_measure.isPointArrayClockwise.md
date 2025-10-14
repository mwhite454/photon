---
title: isPointArrayClockwise | Photon
source: docs/docs/api/functions/core_measure.isPointArrayClockwise.html
---

isPointArrayClockwise | Photon

[Photon](../index.html)




Preparing search index...

* [core/measure](../modules/core_measure.html)
* isPointArrayClockwise

# Function isPointArrayClockwise

* isPointArrayClockwise(
      points: [IPoint](../interfaces/core_schema.IPoint.html)[],
      out\_result?: { hullPoints?: [IPoint](../interfaces/core_schema.IPoint.html)[]; keyPoints?: [IPoint](../interfaces/core_schema.IPoint.html)[] },
  ): boolean

  Check for array of points being clockwise or not.

  #### Parameters

  + points: [IPoint](../interfaces/core_schema.IPoint.html)[]

    The array of points to test.
  + `Optional`out\_result: { hullPoints?: [IPoint](../interfaces/core_schema.IPoint.html)[]; keyPoints?: [IPoint](../interfaces/core_schema.IPoint.html)[] }

    Optional output object, if provided, will be populated with convex hull results.

  #### Returns boolean

  Boolean true if points flow clockwise.

  + Defined in [core/measure.ts:247](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L247)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
