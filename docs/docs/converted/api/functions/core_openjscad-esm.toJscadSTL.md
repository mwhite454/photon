---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- 2d
- api-reference
- cad
- export
- photon
- svg
- tojscadstl
primary_topic: tojscadstl-|-photon
source: docs/docs/api/functions/core_openjscad-esm.toJscadSTL.html
tags:
- tojscadstl-|-photon
- api-reference
- intermediate
title: toJscadSTL | Photon
---
toJscadSTL | Photon

[Photon](../index.md)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.md)
* toJscadSTL

# Function toJscadSTL

* toJscadSTL(
      CAG: typeof [CAG](../classes/types_jscad.export_.CAG.md),
      stlSerializer: [StlSerializer](../interfaces/types_jscad.StlSerializer.md),
      modelToExport: [IModel](../interfaces/core_schema.IModel.md),
      options?: [IJscadCsgOptions](../interfaces/core_openjscad-esm.IJscadCsgOptions.md),
  ): string

  Exports a model in STL format - 2D to 3D.

  #### Parameters

  + CAG: typeof [CAG](../classes/types_jscad.export_.CAG.md)
  + stlSerializer: [StlSerializer](../interfaces/types_jscad.StlSerializer.md)

    @jscad/stl-serializer, see <https://www.npmjs.com/package/@jscad/stl-serializer>
  + modelToExport: [IModel](../interfaces/core_schema.IModel.md)

    Model object to export.
  + options: [IJscadCsgOptions](../interfaces/core_openjscad-esm.IJscadCsgOptions.md) = {}

    Optional options object.

    Jscad CSG export options.

    - ##### `Optional`accuracy?: number

      Optional exemplar of number of decimal places.
    - ##### `Optional`byLayers?: boolean

      Flag to separate chains by layers.
    - ##### `Optional`extrude?: number

      Optional depth of 3D extrusion.
    - ##### `Optional`layerOptions?: { [layerId: string]: [IJscadExtrudeOptions](../interfaces/core_openjscad-esm.IJscadExtrudeOptions.md) }

      SVG options per layer.
    - ##### `Optional`maxArcFacet?: number

      The maximum length between points on an arc or circle.
    - ##### `Optional`pointMatchingDistance?: number

      Max distance to consider two points as the same.
    - ##### `Optional`statusCallback?: [IStatusCallback](../interfaces/core_openjscad-esm.IStatusCallback.md)

      Optional callback to get status during the export.
    - ##### `Optional`units?: string

      Optional unit system to embed in exported file, if the export format allows alternate unit systems.
    - ##### `Optional`z?: number

      Optional depth of 3D extrusion.

  #### Returns string

  String in STL ASCII format.

  + Defined in [core/openjscad-esm.ts:462](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L462)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
