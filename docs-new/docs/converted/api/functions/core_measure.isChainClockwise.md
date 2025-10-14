---
title: isChainClockwise | Photon
source: docs/docs/api/functions/core_measure.isChainClockwise.html
---

isChainClockwise | Photon

[Photon](../index.html)




Preparing search index...

* [core/measure](../modules/core_measure.html)
* isChainClockwise

# Function isChainClockwise

* isChainClockwise(
      chainContext: [IChain](../interfaces/core_maker.IChain.html),
      out\_result?: { hullPoints?: [IPoint](../interfaces/core_schema.IPoint.html)[]; keyPoints?: [IPoint](../interfaces/core_schema.IPoint.html)[] },
  ): boolean

  Check for flow of paths in a chain being clockwise or not.

  #### Parameters

  + chainContext: [IChain](../interfaces/core_maker.IChain.html)

    The chain to test.
  + `Optional`out\_result: { hullPoints?: [IPoint](../interfaces/core_schema.IPoint.html)[]; keyPoints?: [IPoint](../interfaces/core_schema.IPoint.html)[] }

    Optional output object, if provided, will be populated with convex hull results.

  #### Returns boolean

  Boolean true if paths in the chain flow clockwise.

  + Defined in [core/measure.ts:228](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L228)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
