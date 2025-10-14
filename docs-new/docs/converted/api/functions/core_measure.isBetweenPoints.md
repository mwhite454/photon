---
title: isBetweenPoints | Photon
source: docs/docs/api/functions/core_measure.isBetweenPoints.html
---

isBetweenPoints | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* isBetweenPoints

# Function isBetweenPoints

* isBetweenPoints(
      pointInQuestion: [IPoint](../interfaces/core_schema.IPoint.md),
      line: [IPathLine](../interfaces/core_schema.IPathLine.md),
      exclusive: boolean,
  ): boolean

  Check if a given point is between a line's end points.

  #### Parameters

  + pointInQuestion: [IPoint](../interfaces/core_schema.IPoint.md)

    The point to test.
  + line: [IPathLine](../interfaces/core_schema.IPathLine.md)

    Line to test against.
  + exclusive: boolean

    Flag to exclude equaling the origin or end points.

  #### Returns boolean

  Boolean true if point is between (or equal to) the line's origin and end points.

  + Defined in [core/measure.ts:176](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L176)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
