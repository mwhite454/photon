---
title: toKeyPoints | Photon
source: docs/docs/api/functions/core_chain.toKeyPoints.html
---

toKeyPoints | Photon

[Photon](../index.md)




Preparing search index...

* [core/chain](../modules/core_chain.md)
* toKeyPoints

# Function toKeyPoints

* toKeyPoints(chainContext: [IChain](../interfaces/core_maker.IChain.md), maxArcFacet?: number): [IPoint](../interfaces/core_schema.IPoint.md)[]

  Get key points (a minimal a number of points) along a chain of paths.

  #### Parameters

  + chainContext: [IChain](../interfaces/core_maker.IChain.md)

    Chain of paths to get points from.
  + `Optional`maxArcFacet: number

    The maximum length between points on an arc or circle.

  #### Returns [IPoint](../interfaces/core_schema.IPoint.md)[]

  Array of points which are on the chain.

  + Defined in [core/chain.ts:631](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L631)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
