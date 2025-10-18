---
ai_summary: IJscadScriptOptions | Photon
category: API Reference
description: IJscadScriptOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- cad
- export
- ijscadscriptoptions
- photon
- svg
primary_topic: ijscadscriptoptions-|-photon
source: docs/docs/api/interfaces/core_openjscad-esm.IJscadScriptOptions.html
tags:
- ijscadscriptoptions-|-photon
- api-reference
- intermediate
title: IJscadScriptOptions | Photon
---
IJscadScriptOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.md)
* IJscadScriptOptions

# Interface IJscadScriptOptions

Jscad Script export options.

interface IJscadScriptOptions {
    [accuracy](#optionalaccuracy)?: number;
    [byLayers](#optionalbylayers)?: boolean;
    [extrude](#optionalextrude)?: number;
    [functionName](#optionalfunctionname)?: string;
    [indent](#optionalindent)?: number;
    [layerOptions](#optionallayeroptions)?: { [layerId: string]: [IJscadExtrudeOptions](core_openjscad-esm.IJscadExtrudeOptions.md) };
    [maxArcFacet](#optionalmaxarcfacet)?: number;
    [pointMatchingDistance](#optionalpointmatchingdistance)?: number;
    [statusCallback](#optionalstatuscallback)?: [IStatusCallback](core_openjscad-esm.IStatusCallback.md);
    [units](#optionalunits)?: string;
    [z](#optionalz)?: number;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/openjscad-esm.IJscadScriptOptions))

* [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md)
  + IJscadScriptOptions

* Defined in [core/openjscad-esm.ts:554](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L554)

##### Index

### Properties

[accuracy?](#optionalaccuracy)
[byLayers?](#optionalbylayers)
[extrude?](#optionalextrude)
[functionName?](#optionalfunctionname)
[indent?](#optionalindent)
[layerOptions?](#optionallayeroptions)
[maxArcFacet?](#optionalmaxarcfacet)
[pointMatchingDistance?](#optionalpointmatchingdistance)
[statusCallback?](#optionalstatuscallback)
[units?](#optionalunits)
[z?](#optionalz)

## Properties

### `Optional`accuracy

accuracy?: number

Optional exemplar of number of decimal places.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md).[accuracy](core_openjscad-esm.IJscadCsgOptions.md#optionalaccuracy)

* Defined in [core/exporter.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L14)

### `Optional`byLayers

byLayers?: boolean

Flag to separate chains by layers.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md).[byLayers](core_openjscad-esm.IJscadCsgOptions.md#optionalbylayers)

* Defined in [core/openjscad-esm.ts:513](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L513)

### `Optional`extrude

extrude?: number

Optional depth of 3D extrusion.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md).[extrude](core_openjscad-esm.IJscadCsgOptions.md#optionalextrude)

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

layerOptions?: { [layerId: string]: [IJscadExtrudeOptions](core_openjscad-esm.IJscadExtrudeOptions.md) }

SVG options per layer.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md).[layerOptions](core_openjscad-esm.IJscadCsgOptions.md#optionallayeroptions)

* Defined in [core/openjscad-esm.ts:548](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L548)

### `Optional`maxArcFacet

maxArcFacet?: number

The maximum length between points on an arc or circle.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md).[maxArcFacet](core_openjscad-esm.IJscadCsgOptions.md#optionalmaxarcfacet)

* Defined in [core/openjscad-esm.ts:518](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L518)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md).[pointMatchingDistance](core_openjscad-esm.IJscadCsgOptions.md#optionalpointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`statusCallback

statusCallback?: [IStatusCallback](core_openjscad-esm.IStatusCallback.md)

Optional callback to get status during the export.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md).[statusCallback](core_openjscad-esm.IJscadCsgOptions.md#optionalstatuscallback)

* Defined in [core/openjscad-esm.ts:523](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L523)

### `Optional`units

units?: string

Optional unit system to embed in exported file, if the export format allows alternate unit systems.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md).[units](core_openjscad-esm.IJscadCsgOptions.md#optionalunits)

* Defined in [core/exporter.ts:19](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L19)

### `Optional`z

z?: number

Optional depth of 3D extrusion.

Inherited from [IJscadCsgOptions](core_openjscad-esm.IJscadCsgOptions.md).[z](core_openjscad-esm.IJscadCsgOptions.md#optionalz)

* Defined in [core/openjscad-esm.ts:538](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L538)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

* **Properties**
  * [accuracy](#optionalaccuracy)
  * [byLayers](#optionalbylayers)
  * [extrude](#optionalextrude)
  * [functionName](#optionalfunctionname)
  * [indent](#optionalindent)
  * [layerOptions](#optionallayeroptions)
  * [maxArcFacet](#optionalmaxarcfacet)
  * [pointMatchingDistance](#optionalpointmatchingdistance)
  * [statusCallback](#optionalstatuscallback)
  * [units](#optionalunits)
  * [z](#optionalz)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
