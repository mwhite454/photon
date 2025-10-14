---
title: increase | Photon
source: docs/docs/api/functions/core_measure.increase.html
---

increase | Photon

[Photon](../index.html)




Preparing search index...

* [core/measure](../modules/core_measure.html)
* increase

# Function increase

* increase(
      baseMeasure: [IMeasure](../interfaces/core_maker.IMeasure.html),
      addMeasure: [IMeasure](../interfaces/core_maker.IMeasure.html),
      augmentBaseMeasure?: boolean,
  ): [IMeasure](../interfaces/core_maker.IMeasure.html)

  Increase a measurement by an additional measurement.

  #### Parameters

  + baseMeasure: [IMeasure](../interfaces/core_maker.IMeasure.html)

    The measurement to increase.
  + addMeasure: [IMeasure](../interfaces/core_maker.IMeasure.html)

    The additional measurement.
  + `Optional`augmentBaseMeasure: boolean

    Optional flag to call measure.augment on the measurement.

  #### Returns [IMeasure](../interfaces/core_maker.IMeasure.html)

  The increased original measurement (for cascading).

  + Defined in [core/measure.ts:47](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/measure.ts#L47)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
