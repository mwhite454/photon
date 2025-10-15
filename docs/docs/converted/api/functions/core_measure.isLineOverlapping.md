---
ai_summary: isLineOverlapping | Photon
category: API Reference
description: isLineOverlapping | Photon
difficulty: intermediate
keywords:
- api-reference
- islineoverlapping
- photon
primary_topic: lines
source: docs/docs/api/functions/core_measure.isLineOverlapping.html
tags:
- intermediate
- api-reference
- lines
title: isLineOverlapping | Photon
---
isLineOverlapping | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* isLineOverlapping

# Function isLineOverlapping

* isLineOverlapping(
      lineA: [IPathLine](../interfaces/core_schema.IPathLine.md),
      lineB: [IPathLine](../interfaces/core_schema.IPathLine.md),
      excludeTangents: boolean,
  ): boolean

  Check for line overlapping another line.

  #### Parameters

  + lineA: [IPathLine](../interfaces/core_schema.IPathLine.md)

    The line to test.
  + lineB: [IPathLine](../interfaces/core_schema.IPathLine.md)

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
