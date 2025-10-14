---
title: toJscadScript | Photon
source: docs/docs/api/functions/core_openjscad-esm.toJscadScript.html
---

toJscadScript | Photon

[Photon](../index.html)




Preparing search index...

* [core/openjscad-esm](../modules/core_openjscad-esm.html)
* toJscadScript

# Function toJscadScript

* toJscadScript(modelToExport: [IModel](../interfaces/core_schema.IModel.html), options?: [IJscadScriptOptions](../interfaces/core_openjscad-esm.IJscadScriptOptions.html)): string

  Creates a string of JavaScript code for execution with a Jscad environment.

  #### Parameters

  + modelToExport: [IModel](../interfaces/core_schema.IModel.html)

    Model object to export.
  + options: [IJscadScriptOptions](../interfaces/core_openjscad-esm.IJscadScriptOptions.html) = {}

    Export options object.

    Jscad Script export options.

    - ##### `Optional`accuracy?: number

      Optional exemplar of number of decimal places.
    - ##### `Optional`byLayers?: boolean

      Flag to separate chains by layers.
    - ##### `Optional`extrude?: number

      Optional depth of 3D extrusion.
    - ##### `Optional`functionName?: string

      Optional override of function name, default is "main".
    - ##### `Optional`indent?: number

      Optional number of spaces to indent.
    - ##### `Optional`layerOptions?: { [layerId: string]: [IJscadExtrudeOptions](../interfaces/core_openjscad-esm.IJscadExtrudeOptions.html) }

      SVG options per layer.
    - ##### `Optional`maxArcFacet?: number

      The maximum length between points on an arc or circle.
    - ##### `Optional`pointMatchingDistance?: number

      Max distance to consider two points as the same.
    - ##### `Optional`statusCallback?: [IStatusCallback](../interfaces/core_openjscad-esm.IStatusCallback.html)

      Optional callback to get status during the export.
    - ##### `Optional`units?: string

      Optional unit system to embed in exported file, if the export format allows alternate unit systems.
    - ##### `Optional`z?: number

      Optional depth of 3D extrusion.

  #### Returns string

  String of JavaScript containing a main() function for Jscad.

  + Defined in [core/openjscad-esm.ts:410](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/openjscad-esm.ts#L410)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
