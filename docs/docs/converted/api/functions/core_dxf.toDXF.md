---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- export
- paths
- photon
- todxf
primary_topic: dxf
source: docs/docs/api/functions/core_dxf.toDXF.html
tags:
- intermediate
- api-reference
- dxf
title: toDXF | Photon
---
toDXF | Photon

[Photon](../index.md)




Preparing search index...

* [core/dxf](../modules/core_dxf.md)
* toDXF

# Function toDXF

Renders an item in AutoDesk DFX file format.

#### Param: itemToExport

Item to render: may be a path, an array of paths, or a model object.

#### Param: options

Rendering options object.

#### Param: options.units

String of the unit system. May be omitted. See makerjs.unitType for possible values.

#### Returns

String of DXF content.

* toDXF(modelToExport: [IModel](../interfaces/core_schema.IModel.md), options?: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.md)): string

  #### Parameters

  + modelToExport: [IModel](../interfaces/core_schema.IModel.md)
  + `Optional`options: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.md)

  #### Returns string

  + Defined in [core/dxf.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L22)
* toDXF(pathsToExport: [IPath](../interfaces/core_schema.IPath.md)[], options?: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.md)): string

  #### Parameters

  + pathsToExport: [IPath](../interfaces/core_schema.IPath.md)[]
  + `Optional`options: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.md)

  #### Returns string

  + Defined in [core/dxf.ts:23](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L23)
* toDXF(pathToExport: [IPath](../interfaces/core_schema.IPath.md), options?: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.md)): string

  #### Parameters

  + pathToExport: [IPath](../interfaces/core_schema.IPath.md)
  + `Optional`options: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.md)

  #### Returns string

  + Defined in [core/dxf.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L24)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
