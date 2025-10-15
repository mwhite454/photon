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
- tojson
primary_topic: tojson-|-photon
source: docs/docs/api/functions/core_exporter.toJson.html
tags:
- intermediate
- api-reference
- tojson-|-photon
title: toJson | Photon
---
toJson | Photon

[Photon](../index.md)




Preparing search index...

* [core/exporter](../modules/core_exporter.md)
* toJson

# Function toJson

* toJson(itemToExport: any, options?: [IJsonExportOptions](../interfaces/core_exporter.IJsonExportOptions.md)): string

  Renders an item in JSON.

  #### Parameters

  + itemToExport: any

    Item to render: may be a path, an array of paths, or a model object.
  + options: [IJsonExportOptions](../interfaces/core_exporter.IJsonExportOptions.md) = {}

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
