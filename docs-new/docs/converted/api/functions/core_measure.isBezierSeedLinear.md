---
title: isBezierSeedLinear | Photon
source: docs/docs/api/functions/core_measure.isBezierSeedLinear.html
---

isBezierSeedLinear | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* isBezierSeedLinear

# Function isBezierSeedLinear

* isBezierSeedLinear(seed: [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.md), exclusive?: boolean): boolean

  Check if a given bezier seed has all points on the same slope.

  #### Parameters

  + seed: [IPathBezierSeed](../interfaces/core_schema.IPathBezierSeed.md)

    The bezier seed to test.
  + `Optional`exclusive: boolean

    Optional boolean to test only within the boundary of the endpoints.

  #### Returns boolean

  Boolean true if bezier seed has control points on the line slope and between the line endpoints.

  + Defined in [core/measure.ts:198](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L198)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
