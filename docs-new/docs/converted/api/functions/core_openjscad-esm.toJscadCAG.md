---
title: toJscadCAG | Photon
source: docs/docs/api/functions/core_openjscad-esm.toJscadCAG.html
---

toJscadCAG | Photon

[Photon](../index.html)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.html)
* toJscadCAG

# Function toJscadCAG

* toJscadCAG(
      jscadCAG: typeof [CAG](../classes/types_jscad.export_.CAG.html),
      modelToExport: [IModel](../interfaces/core_schema.IModel.html),
      jsCadCagOptions?: [IJscadCagOptions](../interfaces/core_openjscad-esm.IJscadCagOptions.html),
  ): [CAG](../classes/types_jscad.export_.CAG.html) | { [layerId: string]: [CAG](../classes/types_jscad.export_.CAG.html) }

  Converts a model to a @jscad/csg CAG object - 2D to 2D. See <https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#2D_Paths>

  Example:

  ```
  //First, use npm install @jscad/csg from the command line in your jscad project
  //Create a CAG instance from a model.
  var { CAG } = require('@jscad/csg');
  var model = new makerjs.models.Ellipse(70, 40);
  var cag = makerjs.exporter.toJscadCAG(CAG, model, {maxArcFacet: 1});
  Copy
  ```

  #### Parameters

  + jscadCAG: typeof [CAG](../classes/types_jscad.export_.CAG.html)

    @jscad/csg CAG engine, see <https://www.npmjs.com/package/@jscad/csg>
  + modelToExport: [IModel](../interfaces/core_schema.IModel.html)

    Model object to export.
  + `Optional`jsCadCagOptions: [IJscadCagOptions](../interfaces/core_openjscad-esm.IJscadCagOptions.html)

  #### Returns [CAG](../classes/types_jscad.export_.CAG.html) | { [layerId: string]: [CAG](../classes/types_jscad.export_.CAG.html) }

  jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.

  + Defined in [core/openjscad-esm.ts:275](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L275)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
