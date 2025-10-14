---
title: IDXFRenderOptions | Photon
source: docs/docs/api/interfaces/core_dxf.IDXFRenderOptions.html
---

IDXFRenderOptions | Photon

[Photon](../index.html)




Preparing search index...

* [core/dxf](../modules/core_dxf.html)
* IDXFRenderOptions

# Interface IDXFRenderOptions

DXF rendering options.

interface IDXFRenderOptions {
    [accuracy](#accuracy)?: number;
    [fontSize](#fontsize)?: number;
    [layerOptions](#layeroptions)?: { [layerId: string]: [IDXFLayerOptions](core_dxf.IDXFLayerOptions.html) };
    [pointMatchingDistance](#pointmatchingdistance)?: number;
    [units](#units)?: string;
    [usePOLYLINE](#usepolyline)?: boolean;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/dxf.IDXFRenderOptions))

* [IPointMatchOptions](core_maker.IPointMatchOptions.html)
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

layerOptions?: { [layerId: string]: [IDXFLayerOptions](core_dxf.IDXFLayerOptions.html) }

DXF options per layer.

* Defined in [core/dxf.ts:560](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L560)

### `Optional`pointMatchingDistance

pointMatchingDistance?: number

Max distance to consider two points as the same.

Inherited from [IPointMatchOptions](core_maker.IPointMatchOptions.html).[pointMatchingDistance](core_maker.IPointMatchOptions.html#pointmatchingdistance)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
