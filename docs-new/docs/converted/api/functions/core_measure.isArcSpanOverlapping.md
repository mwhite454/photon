---
title: isArcSpanOverlapping | Photon
source: docs/docs/api/functions/core_measure.isArcSpanOverlapping.html
---

isArcSpanOverlapping | Photon

[Photon](../index.html)




Preparing search index...

* [core/measure](../modules/core_measure.html)
* isArcSpanOverlapping

# Function isArcSpanOverlapping

* isArcSpanOverlapping(
      arcA: [IPathArc](../interfaces/core_schema.IPathArc.html),
      arcB: [IPathArc](../interfaces/core_schema.IPathArc.html),
      excludeTangents: boolean,
  ): boolean

  Check for arc overlapping another arc.

  #### Parameters

  + arcA: [IPathArc](../interfaces/core_schema.IPathArc.html)

    The arc to test.
  + arcB: [IPathArc](../interfaces/core_schema.IPathArc.html)

    The arc to check for overlap.
  + excludeTangents: boolean

    Boolean to exclude exact endpoints and only look for deep overlaps.

  #### Returns boolean

  Boolean true if arcA is overlapped with arcB.

  + Defined in [core/measure.ts:116](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L116)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
