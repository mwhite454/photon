---
title: toJson | Photon
source: docs/docs/api/functions/core_exporter.toJson.html
---

toJson | Photon

[Photon](../index.html)




Preparing search index...

* [core/exporter](../modules/core_exporter.html)
* toJson

# Function toJson

* toJson(itemToExport: any, options?: [IJsonExportOptions](../interfaces/core_exporter.IJsonExportOptions.html)): string

  Renders an item in JSON.

  #### Parameters

  + itemToExport: any

    Item to render: may be a path, an array of paths, or a model object.
  + options: [IJsonExportOptions](../interfaces/core_exporter.IJsonExportOptions.html) = {}

    Rendering options object.

    Options for JSON export.

    - ##### `Optional`accuracy?: number

      Optional exemplar of number of decimal places.
    - ##### `Optional`indentation?: number

      Optional number of characters to indent after a newline.
    - ##### `Optional`units?: string

      Optional unit system to embed in exported file, if the export format allows alternate unit systems.

  #### Returns string

  String of DXF content.

  + Defined in [core/exporter.ts:42](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L42)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
