---
title: isBetweenArcAngles | Photon
source: docs/docs/api/functions/core_measure.isBetweenArcAngles.html
---

isBetweenArcAngles | Photon

[Photon](../index.html)




Preparing search index...

* [core/measure](../modules/core_measure.html)
* isBetweenArcAngles

# Function isBetweenArcAngles

* isBetweenArcAngles(
      angleInQuestion: number,
      arc: [IPathArc](../interfaces/core_schema.IPathArc.html),
      exclusive: boolean,
  ): boolean

  Check if a given angle is between an arc's start and end angles.

  #### Parameters

  + angleInQuestion: number

    The angle to test.
  + arc: [IPathArc](../interfaces/core_schema.IPathArc.html)

    Arc to test against.
  + exclusive: boolean

    Flag to exclude equaling the start or end angles.

  #### Returns boolean

  Boolean true if angle is between (or equal to) the arc's start and end angles.

  + Defined in [core/measure.ts:156](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L156)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
