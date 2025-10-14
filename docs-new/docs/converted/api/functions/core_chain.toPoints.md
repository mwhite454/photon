---
title: toPoints | Photon
source: docs/docs/api/functions/core_chain.toPoints.html
---

toPoints | Photon

[Photon](../index.md)




Preparing search index...

* [core/chain](../modules/core_chain.md)
* toPoints

# Function toPoints

* toPoints(
      chainContext: [IChain](../interfaces/core_maker.IChain.md),
      distanceOrDistances: number | number[],
      maxPoints?: number,
  ): [IPoint](../interfaces/core_schema.IPoint.md)[]

  Get points along a chain of paths.

  #### Parameters

  + chainContext: [IChain](../interfaces/core_maker.IChain.md)

    Chain of paths to get points from.
  + distanceOrDistances: number | number[]
  + `Optional`maxPoints: number

    Maximum number of points to retrieve.

  #### Returns [IPoint](../interfaces/core_schema.IPoint.md)[]

  Array of points which are on the chain spread at a uniform interval.

  + Defined in [core/chain.ts:577](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L577)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
