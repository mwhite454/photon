---
title: IJsonExportOptions | Photon
source: docs/docs/api/interfaces/core_exporter.IJsonExportOptions.html
---

IJsonExportOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/exporter](../modules/core_exporter.md)
* IJsonExportOptions

# Interface IJsonExportOptions

Options for JSON export.

interface IJsonExportOptions {
    [accuracy](#accuracy)?: number;
    [indentation](#indentation)?: number;
    [units](#units)?: string;
}

* Defined in [core/exporter.ts:25](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L25)

##### Index

### Properties

[accuracy?](#accuracy)
[indentation?](#indentation)
[units?](#units)

## Properties

### `Optional`accuracy

accuracy?: number

Optional exemplar of number of decimal places.

Inherited from IExportOptions.accuracy

* Defined in [core/exporter.ts:14](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L14)

### `Optional`indentation

indentation?: number

Optional number of characters to indent after a newline.

* Defined in [core/exporter.ts:30](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L30)

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

[accuracy](#accuracy)[indentation](#indentation)[units](#units)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
