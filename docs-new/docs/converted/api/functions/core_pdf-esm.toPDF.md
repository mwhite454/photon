---
title: toPDF | Photon
source: docs/docs/api/functions/core_pdf-esm.toPDF.html
---

toPDF | Photon

[Photon](../index.html)




Preparing search index...

* [core/pdf-esm](../modules/core_pdf-esm.html)
* toPDF

# Function toPDF

* toPDF(
      doc: PDFDocument,
      modelToExport: [IModel](../interfaces/core_schema.IModel.html),
      options?: [IPDFRenderOptions](../interfaces/core_pdf-esm.IPDFRenderOptions.html),
  ): void

  Injects drawing into a PDFKit document.

  #### Parameters

  + doc: PDFDocument

    PDFKit.PDFDocument object. See <https://pdfkit.org/>
  + modelToExport: [IModel](../interfaces/core_schema.IModel.html)

    Model object to export.
  + `Optional`options: [IPDFRenderOptions](../interfaces/core_pdf-esm.IPDFRenderOptions.html)

    Export options object.

  #### Returns void

  String of PDF file contents.

  + Defined in [core/pdf-esm.ts:47](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/pdf-esm.ts#L47)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
