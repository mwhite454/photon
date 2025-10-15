---
ai_summary: removeDeadEnds | Photon
category: API Reference
description: removeDeadEnds | Photon
difficulty: intermediate
keywords:
- api-reference
- cad
- paths
- photon
- removedeadends
primary_topic: moving
related:
- Originating
- Scaling
- Rotating
source: docs/docs/api/functions/core_deadend.removeDeadEnds.html
tags:
- intermediate
- api-reference
- moving
title: removeDeadEnds | Photon
---
removeDeadEnds | Photon

[Photon](../index.md)




Preparing search index...

* [core/deadend](../modules/core_deadend.md)
* removeDeadEnds

# Function removeDeadEnds

* removeDeadEnds(
      modelContext: [IModel](../interfaces/core_schema.IModel.md),
      pointMatchingDistance?: number,
      keep?: [IWalkPathBooleanCallback](../interfaces/core_core.IWalkPathBooleanCallback.md),
      trackDeleted?: (wp: [IWalkPath](../interfaces/core_core.IWalkPath.md), reason: string) => void,
  ): [IModel](../interfaces/core_schema.IModel.md)

  Remove paths from a model which have endpoints that do not connect to other paths.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.md)

    The model to search for dead ends.
  + `Optional`pointMatchingDistance: number

    Optional max distance to consider two points as the same.
  + `Optional`keep: [IWalkPathBooleanCallback](../interfaces/core_core.IWalkPathBooleanCallback.md)

    Optional callback function (which should return a boolean) to decide if a dead end path should be kept instead.
  + `Optional`trackDeleted: (wp: [IWalkPath](../interfaces/core_core.IWalkPath.md), reason: string) => void

    Optional callback function which will log discarded paths and the reason they were discarded.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The input model (for cascading).

  + Defined in [core/deadend.ts:141](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/deadend.ts#L141)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Originating](../index.md)
- [Scaling](../index.md)
- [Rotating](../index.md)
