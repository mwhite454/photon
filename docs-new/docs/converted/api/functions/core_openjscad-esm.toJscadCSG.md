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
- models
- photon
- svg
- tojscadcsg
primary_topic: tojscadcsg-|-photon
source: docs/docs/api/functions/core_openjscad-esm.toJscadCSG.html
tags:
- intermediate
- api-reference
- tojscadcsg-|-photon
title: toJscadCSG | Photon
---
toJscadCSG | Photon

[Photon](../index.md)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.md)
* toJscadCSG

# Function toJscadCSG

* toJscadCSG(
      jscadCAG: typeof [CAG](../classes/types_jscad.export_.CAG.md),
      modelToExport: [IModel](../interfaces/core_schema.IModel.md),
      options?: [IJscadCsgOptions](../interfaces/core_openjscad-esm.IJscadCsgOptions.md),
  ): [export=](../modules/types_jscad.export_.md).[CSG](../classes/types_jscad.export_.CSG.md)

  Converts a model to a @jscad/csg CSG object - 2D to 3D.

  Example:

  ```
  //First, use npm install @jscad/csg from the command line in your jscad project
  //Create a CSG instance from a model.
  var { CAG } = require('@jscad/csg');
  const model = new makerjs.models.Ellipse(70, 40);
  const csg = makerjs.exporter.toJscadCSG(CAG, model, {maxArcFacet: 1, extrude: 10});
  Copy
  ```

  #### Parameters

  + jscadCAG: typeof [CAG](../classes/types_jscad.export_.CAG.md)

    @jscad/csg CAG engine, see <https://www.npmjs.com/package/@jscad/csg>
  + modelToExport: [IModel](../interfaces/core_schema.IModel.md)

    Model object to export.
  + `Optional`options: [IJscadCsgOptions](../interfaces/core_openjscad-esm.IJscadCsgOptions.md)

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

  #### Returns [export=](../modules/types_jscad.export_.md).[CSG](../classes/types_jscad.export_.CSG.md)

  jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.

  + Defined in [core/openjscad-esm.ts:377](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L377)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
