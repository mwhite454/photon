---
title: toDXF | Photon
source: docs/docs/api/functions/core_dxf.toDXF.html
---

toDXF | Photon

[Photon](../index.html)




Preparing search index...

* [core/dxf](../modules/core_dxf.html)
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

* toDXF(modelToExport: [IModel](../interfaces/core_schema.IModel.html), options?: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.html)): string

  #### Parameters

  + modelToExport: [IModel](../interfaces/core_schema.IModel.html)
  + `Optional`options: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.html)

  #### Returns string

  + Defined in [core/dxf.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L22)
* toDXF(pathsToExport: [IPath](../interfaces/core_schema.IPath.html)[], options?: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.html)): string

  #### Parameters

  + pathsToExport: [IPath](../interfaces/core_schema.IPath.html)[]
  + `Optional`options: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.html)

  #### Returns string

  + Defined in [core/dxf.ts:23](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L23)
* toDXF(pathToExport: [IPath](../interfaces/core_schema.IPath.html), options?: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.html)): string

  #### Parameters

  + pathToExport: [IPath](../interfaces/core_schema.IPath.html)
  + `Optional`options: [IDXFRenderOptions](../interfaces/core_dxf.IDXFRenderOptions.html)

  #### Returns string

  + Defined in [core/dxf.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/dxf.ts#L24)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
