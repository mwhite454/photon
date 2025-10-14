---
title: isLineOverlapping | Photon
source: docs/docs/api/functions/core_measure.isLineOverlapping.html
---

isLineOverlapping | Photon

[Photon](../index.html)




Preparing search index...

* [core/measure](../modules/core_measure.html)
* isLineOverlapping

# Function isLineOverlapping

* isLineOverlapping(
      lineA: [IPathLine](../interfaces/core_schema.IPathLine.html),
      lineB: [IPathLine](../interfaces/core_schema.IPathLine.html),
      excludeTangents: boolean,
  ): boolean

  Check for line overlapping another line.

  #### Parameters

  + lineA: [IPathLine](../interfaces/core_schema.IPathLine.html)

    The line to test.
  + lineB: [IPathLine](../interfaces/core_schema.IPathLine.html)

    The line to check for overlap.
  + excludeTangents: boolean

    Boolean to exclude exact endpoints and only look for deep overlaps.

  #### Returns boolean

  Boolean true if lineA is overlapped with lineB.

  + Defined in [core/measure.ts:295](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L295)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
