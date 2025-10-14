---
title: IPDFRenderOptions | Photon
source: docs/docs/api/interfaces/core_pdf-esm.IPDFRenderOptions.html
---

IPDFRenderOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/pdf-esm](../modules/core_pdf-esm.md)
* IPDFRenderOptions

# Interface IPDFRenderOptions

PDF rendering options.

interface IPDFRenderOptions {
    [accuracy](#accuracy)?: number;
    [fontName](#fontname)?: string;
    [fontSize](#fontsize)?: number;
    [origin](#origin)?: [IPoint](core_schema.IPoint.md);
    [stroke](#stroke)?: string;
    [units](#units)?: string;
}

* Defined in [core/pdf-esm.ts:17](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/pdf-esm.ts#L17)

##### Index

### Properties

[accuracy?](#accuracy)
[fontName?](#fontname)
[fontSize?](#fontsize)
[origin?](#origin)
[stroke?](#stroke)
[units?](#units)

## Properties

### `Optional`accuracy

accuracy?: number

Optional exemplar of number of decimal places.

Inherited from IExportOptions.accuracy

* Defined in [core/exporter.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L14)

### `Optional`fontName

fontName?: string

Font name, see list at <https://github.com/foliojs/pdfkit/blob/master/docs/text.coffee.md#fonts>

* Defined in [core/pdf-esm.ts:21](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/pdf-esm.ts#L21)

### `Optional`fontSize

fontSize?: number

Font size.

* Defined in [core/pdf-esm.ts:26](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/pdf-esm.ts#L26)

### `Optional`origin

origin?: [IPoint](core_schema.IPoint.md)

Rendered reference origin.

* Defined in [core/pdf-esm.ts:31](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/pdf-esm.ts#L31)

### `Optional`stroke

stroke?: string

SVG color of the rendered paths.

* Defined in [core/pdf-esm.ts:36](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/pdf-esm.ts#L36)

### `Optional`units

units?: string

Optional unit system to embed in exported file, if the export format allows alternate unit systems.

Inherited from IExportOptions.units

* Defined in [core/exporter.ts:19](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L19)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[accuracy](#accuracy)[fontName](#fontname)[fontSize](#fontsize)[origin](#origin)[stroke](#stroke)[units](#units)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
