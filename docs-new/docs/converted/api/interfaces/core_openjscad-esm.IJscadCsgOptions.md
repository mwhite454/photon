---
title: IJscadCsgOptions | Photon
source: docs/docs/api/interfaces/core_openjscad-esm.IJscadCsgOptions.html
---

IJscadCsgOptions | Photon

[Photon](../index.html)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.html)
* IJscadCsgOptions

# Interface IJscadCsgOptions

Jscad CSG export options.

interface IJscadCsgOptions {
    [accuracy](#accuracy)?: number;
    [byLayers](#bylayers)?: boolean;
    [extrude](#extrude)?: number;
    [layerOptions](#layeroptions)?: { [layerId: string]: [IJscadExtrudeOptions](core_openjscad-esm.IJscadExtrudeOptions.html) };
    [maxArcFacet](#maxarcfacet)?: number;
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [statusCallback](#statuscallback)?: [IStatusCallback](core_openjscad-esm.IStatusCallback.html);
    [units](#units)?: string;
    [z](#z)?: number;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/openjscad-esm.IJscadCsgOptions))

* [IJscadCagOptions](core_openjscad-esm.IJscadCagOptions.html)
* [IJscadExtrudeOptions](core_openjscad-esm.IJscadExtrudeOptions.html)
  + IJscadCsgOptions
    - [IJscadScriptOptions](core_openjscad-esm.IJscadScriptOptions.html)

* Defined in [core/openjscad-esm.ts:544](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L544)

##### Index

### Properties

[accuracy?](#accuracy)
[byLayers?](#bylayers)
[extrude?](#extrude)
[layerOptions?](#layeroptions)
[maxArcFacet?](#maxarcfacet)
[pointMatchingDistance?](#pointmatchingdistance)
[statusCallback?](#statuscallback)
[units?](#units)
[z?](#z)

## Properties

### `Optional`accuracy

accuracy?: number

Optional exemplar of number of decimal places.

Inherited from [IJscadCagOptions](core_openjscad-esm.IJscadCagOptions.html).[accuracy](core_openjscad-esm.IJscadCagOptions.html#accuracy)

* Defined in [core/exporter.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L14)

### `Optional`byLayers

byLayers?: boolean

Flag to separate chains by layers.

Inherited from [IJscadCagOptions](core_openjscad-esm.IJscadCagOptions.html).[byLayers](core_openjscad-esm.IJscadCagOptions.html#bylayers)

* Defined in [core/openjscad-esm.ts:513](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L513)

### `Optional`extrude

extrude?: number

Optional depth of 3D extrusion.

Inherited from [IJscadExtrudeOptions](core_openjscad-esm.IJscadExtrudeOptions.html).[extrude](core_openjscad-esm.IJscadExtrudeOptions.html#extrude)

* Defined in [core/openjscad-esm.ts:533](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L533)

### `Optional`layerOptions

layerOptions?: { [layerId: string]: [IJscadExtrudeOptions](core_openjscad-esm.IJscadExtrudeOptions.html) }

SVG options per layer.

* Defined in [core/openjscad-esm.ts:548](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L548)

### `Optional`maxArcFacet

maxArcFacet?: number

The maximum length between points on an arc or circle.

Inherited from [IJscadCagOptions](core_openjscad-esm.IJscadCagOptions.html).[maxArcFacet](core_openjscad-esm.IJscadCagOptions.html#maxarcfacet)

* Defined in [core/openjscad-esm.ts:518](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L518)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IJscadCagOptions](core_openjscad-esm.IJscadCagOptions.html).[pointMatchingDistance](core_openjscad-esm.IJscadCagOptions.html#pointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`statusCallback

statusCallback?: [IStatusCallback](core_openjscad-esm.IStatusCallback.html)

Optional callback to get status during the export.

Inherited from [IJscadCagOptions](core_openjscad-esm.IJscadCagOptions.html).[statusCallback](core_openjscad-esm.IJscadCagOptions.html#statuscallback)

* Defined in [core/openjscad-esm.ts:523](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L523)

### `Optional`units

units?: string

Optional unit system to embed in exported file, if the export format allows alternate unit systems.

Inherited from [IJscadCagOptions](core_openjscad-esm.IJscadCagOptions.html).[units](core_openjscad-esm.IJscadCagOptions.html#units)

* Defined in [core/exporter.ts:19](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L19)

### `Optional`z

z?: number

Optional depth of 3D extrusion.

Inherited from [IJscadExtrudeOptions](core_openjscad-esm.IJscadExtrudeOptions.html).[z](core_openjscad-esm.IJscadExtrudeOptions.html#z)

* Defined in [core/openjscad-esm.ts:538](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L538)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[accuracy](#accuracy)[byLayers](#bylayers)[extrude](#extrude)[layerOptions](#layeroptions)[maxArcFacet](#maxarcfacet)[pointMatchingDistance](#pointmatchingdistance)[statusCallback](#statuscallback)[units](#units)[z](#z)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
