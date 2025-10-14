---
title: IJscadCagOptions | Photon
source: docs/docs/api/interfaces/core_openjscad-esm.IJscadCagOptions.html
---

IJscadCagOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.md)
* IJscadCagOptions

# Interface IJscadCagOptions

Jscad CAG export options.

interface IJscadCagOptions {
    [accuracy](#accuracy)?: number;
    [byLayers](#bylayers)?: boolean;
    [maxArcFacet](#maxarcfacet)?: number;
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [statusCallback](#statuscallback)?: [IStatusCallback](core_openjscad-esm.IStatusCallback.md);
    [units](#units)?: string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/openjscad-esm.IJscadCagOptions))

* [IPointMatchOptions](core_maker.IPointMatchOptions.md)
  + IJscadCagOptions
    - [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md)

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

Inherited from [IPointMatchOptions](core_maker.IPointMatchOptions.md).[pointMatchingDistance](core_maker.IPointMatchOptions.md#pointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`statusCallback

statusCallback?: [IStatusCallback](core_openjscad-esm.IStatusCallback.md)

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
