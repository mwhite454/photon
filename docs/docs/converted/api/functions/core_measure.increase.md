---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- cad
- increase
- photon
primary_topic: increase-|-photon
source: docs/docs/api/functions/core_measure.increase.html
tags:
- intermediate
- api-reference
- increase-|-photon
title: increase | Photon
---
increase | Photon

[Photon](../index.md)




Preparing search index...

* [core/measure](../modules/core_measure.md)
* increase

# Function increase

* increase(
      baseMeasure: [IMeasure](../interfaces/core_core.IMeasure.md),
      addMeasure: [IMeasure](../interfaces/core_core.IMeasure.md),
      augmentBaseMeasure?: boolean,
  ): [IMeasure](../interfaces/core_core.IMeasure.md)

  Increase a measurement by an additional measurement.

  #### Parameters

  + baseMeasure: [IMeasure](../interfaces/core_core.IMeasure.md)

    The measurement to increase.
  + addMeasure: [IMeasure](../interfaces/core_core.IMeasure.md)

    The additional measurement.
  + `Optional`augmentBaseMeasure: boolean

    Optional flag to call measure.augment on the measurement.

  #### Returns [IMeasure](../interfaces/core_core.IMeasure.md)

  The increased original measurement (for cascading).

  + Defined in [core/measure.ts:47](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L47)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
