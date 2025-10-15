---
ai_summary: isChainClockwise | Photon
category: API Reference
description: isChainClockwise | Photon
difficulty: intermediate
keywords:
- api-reference
- ischainclockwise
- paths
- photon
primary_topic: chains
related:
- Chain Theory
- Breaking
- Routes
source: docs/docs/api/functions/core_measure.isChainClockwise.html
tags:
- intermediate
- api-reference
- chains
title: isChainClockwise | Photon
---
isChainClockwise | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* isChainClockwise

# Function isChainClockwise

* isChainClockwise(
      chainContext: [IChain](../interfaces/core_core.IChain.md),
      out\_result?: { hullPoints?: [IPoint](../interfaces/core_schema.IPoint.md)[]; keyPoints?: [IPoint](../interfaces/core_schema.IPoint.md)[] },
  ): boolean

  Check for flow of paths in a chain being clockwise or not.

  #### Parameters

  + chainContext: [IChain](../interfaces/core_core.IChain.md)

    The chain to test.
  + `Optional`out\_result: { hullPoints?: [IPoint](../interfaces/core_schema.IPoint.md)[]; keyPoints?: [IPoint](../interfaces/core_schema.IPoint.md)[] }

    Optional output object, if provided, will be populated with convex hull results.

  #### Returns boolean

  Boolean true if paths in the chain flow clockwise.

  + Defined in [core/measure.ts:228](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L228)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Chain Theory](../index.md)
- [Breaking](../index.md)
- [Routes](../index.md)
