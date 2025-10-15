---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- drawing
- export
- photon
- topdf
primary_topic: topdf-|-photon
source: docs/docs/api/functions/core_pdf-esm.toPDF.html
tags:
- intermediate
- api-reference
- topdf-|-photon
title: toPDF | Photon
---
toPDF | Photon

[Photon](../index.md)




Preparing search index...

* [core/pdf-esm](../modules/core_pdf-esm.md)
* toPDF

# Function toPDF

* toPDF(
      doc: PDFDocument,
      modelToExport: [IModel](../interfaces/core_schema.IModel.md),
      options?: [IPDFRenderOptions](../interfaces/core_pdf-esm.IPDFRenderOptions.md),
  ): void

  Injects drawing into a PDFKit document.

  #### Parameters

  + doc: PDFDocument

    PDFKit.PDFDocument object. See <https://pdfkit.org/>
  + modelToExport: [IModel](../interfaces/core_schema.IModel.md)

    Model object to export.
  + `Optional`options: [IPDFRenderOptions](../interfaces/core_pdf-esm.IPDFRenderOptions.md)

    Export options object.

  #### Returns void

  String of PDF file contents.

  + Defined in [core/pdf-esm.ts:47](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/pdf-esm.ts#L47)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
