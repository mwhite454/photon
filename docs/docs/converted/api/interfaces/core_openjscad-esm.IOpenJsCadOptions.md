---
ai_summary: IOpenJsCadOptions | Photon
category: API Reference
description: IOpenJsCadOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- cad
- export
- iopenjscadoptions
- models
- paths
- photon
primary_topic: iopenjscadoptions-|-photon
source: docs/docs/api/interfaces/core_openjscad-esm.IOpenJsCadOptions.html
tags:
- intermediate
- api-reference
- iopenjscadoptions-|-photon
title: IOpenJsCadOptions | Photon
---
IOpenJsCadOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.md)
* IOpenJsCadOptions

# Interface IOpenJsCadOptions

OpenJsCad export options.

interface IOpenJsCadOptions {
  accuracy?: number;
  extrusion?: number;
  facetSize?: number;
  functionName?: string;
  modelMap?: [IOpenJsCadOptionsMap](core_openjscad-esm.IOpenJsCadOptionsMap.md);
  pointMatchingDistance?: number;
  removeFromOriginal?: boolean;
  units?: string;
}

#### Hierarchy ([View Summary](../hierarchy.md))

* [IFindLoopsOptions](core_maker.IFindLoopsOptions.md)
  + IOpenJsCadOptions

* Defined in [core/openjscad-esm.ts:477](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L477)

##### Index

### Properties

accuracy?
extrusion?
facetSize?
functionName?
modelMap?
pointMatchingDistance?
removeFromOriginal?
units?

## Properties

### `Optional`accuracy

accuracy?: number

Optional exemplar of number of decimal places.

Inherited from IExportOptions.accuracy

* Defined in [core/exporter.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L14)

### `Optional`extrusion

extrusion?: number

Optional depth of 3D extrusion.

* Defined in [core/openjscad-esm.ts:481](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L481)

### `Optional`facetSize

facetSize?: number

Optional size of curve facets.

* Defined in [core/openjscad-esm.ts:486](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L486)

### `Optional`functionName

functionName?: string

Optional override of function name, default is "main".

* Defined in [core/openjscad-esm.ts:491](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L491)

### `Optional`modelMap

modelMap?: [IOpenJsCadOptionsMap](core_openjscad-esm.IOpenJsCadOptionsMap.md)

Optional options applied to specific first-child models by model id.

* Defined in [core/openjscad-esm.ts:496](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L496)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IFindLoopsOptions](core_maker.IFindLoopsOptions.md). pointMatchingDistance

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`removeFromOriginal

removeFromOriginal?: boolean

Flag to remove looped paths from the original model.

Inherited from [IFindLoopsOptions](core_maker.IFindLoopsOptions.md). removeFromOriginal

* Defined in [core/maker.ts:336](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L336)

### `Optional`units

units?: string

Optional unit system to embed in exported file, if the export format allows alternate unit systems.

Inherited from IExportOptions.units

* Defined in [core/exporter.ts:19](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L19)

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
