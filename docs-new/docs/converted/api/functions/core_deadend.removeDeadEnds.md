---
title: removeDeadEnds | Photon
source: docs/docs/api/functions/core_deadend.removeDeadEnds.html
---

removeDeadEnds | Photon

[Photon](../index.html)




Preparing search index...

* [core/deadend](../modules/core_deadend.html)
* removeDeadEnds

# Function removeDeadEnds

* removeDeadEnds(
      modelContext: [IModel](../interfaces/core_schema.IModel.html),
      pointMatchingDistance?: number,
      keep?: [IWalkPathBooleanCallback](../interfaces/core_maker.IWalkPathBooleanCallback.html),
      trackDeleted?: (wp: [IWalkPath](../interfaces/core_maker.IWalkPath.html), reason: string) => void,
  ): [IModel](../interfaces/core_schema.IModel.html)

  Remove paths from a model which have endpoints that do not connect to other paths.

  #### Parameters

  + modelContext: [IModel](../interfaces/core_schema.IModel.html)

    The model to search for dead ends.
  + `Optional`pointMatchingDistance: number

    Optional max distance to consider two points as the same.
  + `Optional`keep: [IWalkPathBooleanCallback](../interfaces/core_maker.IWalkPathBooleanCallback.html)

    Optional callback function (which should return a boolean) to decide if a dead end path should be kept instead.
  + `Optional`trackDeleted: (wp: [IWalkPath](../interfaces/core_maker.IWalkPath.html), reason: string) => void

    Optional callback function which will log discarded paths and the reason they were discarded.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  The input model (for cascading).

  + Defined in [core/deadend.ts:141](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/deadend.ts#L141)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
