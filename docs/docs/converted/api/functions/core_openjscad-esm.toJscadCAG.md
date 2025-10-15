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
- paths
- photon
- tojscadcag
primary_topic: tojscadcag-|-photon
source: docs/docs/api/functions/core_openjscad-esm.toJscadCAG.html
tags:
- intermediate
- api-reference
- tojscadcag-|-photon
title: toJscadCAG | Photon
---
toJscadCAG | Photon

[Photon](../index.md)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.md)
* toJscadCAG

# Function toJscadCAG

* toJscadCAG(
      jscadCAG: typeof [CAG](../classes/types_jscad.export_.CAG.md),
      modelToExport: [IModel](../interfaces/core_schema.IModel.md),
      jsCadCagOptions?: [IJscadCagOptions](../interfaces/core_openjscad-esm.IJscadCagOptions.md),
  ): [CAG](../classes/types_jscad.export_.CAG.md) | { [layerId: string]: [CAG](../classes/types_jscad.export_.CAG.md) }

  Converts a model to a @jscad/csg CAG object - 2D to 2D. See <https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#2D_Paths>

  Example:

  ```
  //First, use npm install @jscad/csg from the command line in your jscad project
  //Create a CAG instance from a model.
  var { CAG } = require('@jscad/csg');
  const model = new makerjs.models.Ellipse(70, 40);
  const cag = makerjs.exporter.toJscadCAG(CAG, model, {maxArcFacet: 1});
  Copy
  ```

  #### Parameters

  + jscadCAG: typeof [CAG](../classes/types_jscad.export_.CAG.md)

    @jscad/csg CAG engine, see <https://www.npmjs.com/package/@jscad/csg>
  + modelToExport: [IModel](../interfaces/core_schema.IModel.md)

    Model object to export.
  + `Optional`jsCadCagOptions: [IJscadCagOptions](../interfaces/core_openjscad-esm.IJscadCagOptions.md)

  #### Returns [CAG](../classes/types_jscad.export_.CAG.md) | { [layerId: string]: [CAG](../classes/types_jscad.export_.CAG.md) }

  jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.

  + Defined in [core/openjscad-esm.ts:275](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L275)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
