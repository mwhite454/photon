---
title: toPoints | Photon
source: docs/docs/api/functions/core_chain.toPoints.html
---

toPoints | Photon

[Photon](../index.html)




Preparing search index...

* [core/chain](../modules/core_chain.html)
* toPoints

# Function toPoints

* toPoints(
      chainContext: [IChain](../interfaces/core_maker.IChain.html),
      distanceOrDistances: number | number[],
      maxPoints?: number,
  ): [IPoint](../interfaces/core_schema.IPoint.html)[]

  Get points along a chain of paths.

  #### Parameters

  + chainContext: [IChain](../interfaces/core_maker.IChain.html)

    Chain of paths to get points from.
  + distanceOrDistances: number | number[]
  + `Optional`maxPoints: number

    Maximum number of points to retrieve.

  #### Returns [IPoint](../interfaces/core_schema.IPoint.html)[]

  Array of points which are on the chain spread at a uniform interval.

  + Defined in [core/chain.ts:577](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L577)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
