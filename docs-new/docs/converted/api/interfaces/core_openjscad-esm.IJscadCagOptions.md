---
title: IJscadCagOptions | Photon
source: docs/docs/api/interfaces/core_openjscad-esm.IJscadCagOptions.html
---

IJscadCagOptions | Photon

[Photon](../index.html)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.html)
* IJscadCagOptions

# Interface IJscadCagOptions

Jscad CAG export options.

interface IJscadCagOptions {
    [accuracy](#accuracy)?: number;
    [byLayers](#bylayers)?: boolean;
    [maxArcFacet](#maxarcfacet)?: number;
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [statusCallback](#statuscallback)?: [IStatusCallback](core_openjscad-esm.IStatusCallback.html);
    [units](#units)?: string;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/openjscad-esm.IJscadCagOptions))

* [IPointMatchOptions](core_maker.IPointMatchOptions.html)
  + IJscadCagOptions
    - [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html)

* Defined in [core/openjscad-esm.ts:509](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L509)

##### Index

### Properties

[accuracy?](#accuracy)
[byLayers?](#bylayers)
[maxArcFacet?](#maxarcfacet)
[pointMatchingDistance?](#pointmatchingdistance)
[statusCallback?](#statuscallback)
[units?](#units)

## Properties

### `Optional`accuracy

accuracy?: number

Optional exemplar of number of decimal places.

Inherited from IExportOptions.accuracy

* Defined in [core/exporter.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L14)

### `Optional`byLayers

byLayers?: boolean

Flag to separate chains by layers.

* Defined in [core/openjscad-esm.ts:513](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L513)

### `Optional`maxArcFacet

maxArcFacet?: number

The maximum length between points on an arc or circle.

* Defined in [core/openjscad-esm.ts:518](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L518)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IPointMatchOptions](core_maker.IPointMatchOptions.html).[pointMatchingDistance](core_maker.IPointMatchOptions.html#pointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`statusCallback

statusCallback?: [IStatusCallback](core_openjscad-esm.IStatusCallback.html)

Optional callback to get status during the export.

* Defined in [core/openjscad-esm.ts:523](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L523)

### `Optional`units

units?: string

Optional unit system to embed in exported file, if the export format allows alternate unit systems.

Inherited from IExportOptions.units

* Defined in [core/exporter.ts:19](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L19)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[accuracy](#accuracy)[byLayers](#bylayers)[maxArcFacet](#maxarcfacet)[pointMatchingDistance](#pointmatchingdistance)[statusCallback](#statuscallback)[units](#units)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
