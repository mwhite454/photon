---
title: IJscadScriptOptions | Photon
source: docs/docs/api/interfaces/core_openjscad-esm.IJscadScriptOptions.html
---

IJscadScriptOptions | Photon

[Photon](../index.html)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.html)
* IJscadScriptOptions

# Interface IJscadScriptOptions

Jscad Script export options.

interface IJscadScriptOptions {
    [accuracy](#accuracy)?: number;
    [byLayers](#bylayers)?: boolean;
    [extrude](#extrude)?: number;
    [functionName](#functionname)?: string;
    [indent](#indent)?: number;
    [layerOptions](#layeroptions)?: { [layerId: string]: [IJscadExtrudeOptions](core_openjscad-esm.IJscadExtrudeOptions.html) };
    [maxArcFacet](#maxarcfacet)?: number;
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [statusCallback](#statuscallback)?: [IStatusCallback](core_openjscad-esm.IStatusCallback.html);
    [units](#units)?: string;
    [z](#z)?: number;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/openjscad-esm.IJscadScriptOptions))

* [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html)
  + IJscadScriptOptions

* Defined in [core/openjscad-esm.ts:554](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L554)

##### Index

### Properties

[accuracy?](#accuracy)
[byLayers?](#bylayers)
[extrude?](#extrude)
[functionName?](#functionname)
[indent?](#indent)
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

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html).[accuracy](core_openjscad-esm.IJscadCsgOptions.html#accuracy)

* Defined in [core/exporter.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L14)

### `Optional`byLayers

byLayers?: boolean

Flag to separate chains by layers.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html).[byLayers](core_openjscad-esm.IJscadCsgOptions.html#bylayers)

* Defined in [core/openjscad-esm.ts:513](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L513)

### `Optional`extrude

extrude?: number

Optional depth of 3D extrusion.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html).[extrude](core_openjscad-esm.IJscadCsgOptions.html#extrude)

* Defined in [core/openjscad-esm.ts:533](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L533)

### `Optional`functionName

functionName?: string

Optional override of function name, default is "main".

* Defined in [core/openjscad-esm.ts:558](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L558)

### `Optional`indent

indent?: number

Optional number of spaces to indent.

* Defined in [core/openjscad-esm.ts:563](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L563)

### `Optional`layerOptions

layerOptions?: { [layerId: string]: [IJscadExtrudeOptions](core_openjscad-esm.IJscadExtrudeOptions.html) }

SVG options per layer.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html).[layerOptions](core_openjscad-esm.IJscadCsgOptions.html#layeroptions)

* Defined in [core/openjscad-esm.ts:548](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L548)

### `Optional`maxArcFacet

maxArcFacet?: number

The maximum length between points on an arc or circle.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html).[maxArcFacet](core_openjscad-esm.IJscadCsgOptions.html#maxarcfacet)

* Defined in [core/openjscad-esm.ts:518](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L518)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html).[pointMatchingDistance](core_openjscad-esm.IJscadCsgOptions.html#pointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`statusCallback

statusCallback?: [IStatusCallback](core_openjscad-esm.IStatusCallback.html)

Optional callback to get status during the export.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html).[statusCallback](core_openjscad-esm.IJscadCsgOptions.html#statuscallback)

* Defined in [core/openjscad-esm.ts:523](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L523)

### `Optional`units

units?: string

Optional unit system to embed in exported file, if the export format allows alternate unit systems.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html).[units](core_openjscad-esm.IJscadCsgOptions.html#units)

* Defined in [core/exporter.ts:19](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L19)

### `Optional`z

z?: number

Optional depth of 3D extrusion.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.html).[z](core_openjscad-esm.IJscadCsgOptions.html#z)

* Defined in [core/openjscad-esm.ts:538](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L538)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[accuracy](#accuracy)[byLayers](#bylayers)[extrude](#extrude)[functionName](#functionname)[indent](#indent)[layerOptions](#layeroptions)[maxArcFacet](#maxarcfacet)[pointMatchingDistance](#pointmatchingdistance)[statusCallback](#statuscallback)[units](#units)[z](#z)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
