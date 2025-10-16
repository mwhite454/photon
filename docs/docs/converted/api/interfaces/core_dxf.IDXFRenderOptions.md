---
ai_summary: IDXFRenderOptions | Photon
category: API Reference
description: IDXFRenderOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- export
- idxfrenderoptions
- photon
primary_topic: dxf
source: docs/docs/api/interfaces/core_dxf.IDXFRenderOptions.html
tags:
- intermediate
- api-reference
- dxf
title: IDXFRenderOptions | Photon
---
IDXFRenderOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/dxf](../modules/core_dxf.md)
* IDXFRenderOptions

# Interface IDXFRenderOptions

DXF rendering options.

interface IDXFRenderOptions {
    [accuracy](#accuracy)?: number;
    [fontSize](#fontsize)?: number;
    [layerOptions](#layeroptions)?: { [layerId: string]: [IDXFLayerOptions](core_dxf.IDXFLayerOptions.md) };
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [units](#units)?: string;
    [usePOLYLINE](#usepolyline)?: boolean;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/dxf.IDXFRenderOptions))

* [IPointMatchOptions](core_maker.IPointMatchOptions.md)
  + IDXFRenderOptions

* Defined in [core/dxf.ts:550](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L550)

##### Index

### Properties

[accuracy?](#accuracy)
[fontSize?](#fontsize)
[layerOptions?](#layeroptions)
[pointMatchingDistance?](#pointmatchingdistance)
[units?](#units)
[usePOLYLINE?](#usepolyline)

## Properties

### `Optional`accuracy

accuracy?: number

Optional exemplar of number of decimal places.

Inherited from IExportOptions.accuracy

* Defined in [core/exporter.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L14)

### `Optional`fontSize

fontSize?: number

Text size for TEXT entities.

* Defined in [core/dxf.ts:555](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L555)

### `Optional`layerOptions

layerOptions?: { [layerId: string]: [IDXFLayerOptions](core_dxf.IDXFLayerOptions.md) }

DXF options per layer.

* Defined in [core/dxf.ts:560](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L560)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IPointMatchOptions](core_maker.IPointMatchOptions.md).[pointMatchingDistance](core_maker.IPointMatchOptions.md#pointmatchingdistance)

* Defined in [core/maker.ts:282](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L282)

### `Optional`units

units?: string

Optional unit system to embed in exported file, if the export format allows alternate unit systems.

Inherited from IExportOptions.units

* Defined in [core/exporter.ts:19](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L19)

### `Optional`usePOLYLINE

usePOLYLINE?: boolean

Flag to use POLYLINE

* Defined in [core/dxf.ts:565](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L565)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[accuracy](#accuracy)[fontSize](#fontsize)[layerOptions](#layeroptions)[pointMatchingDistance](#pointmatchingdistance)[units](#units)[usePOLYLINE](#usepolyline)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
