---
ai_summary: ISVGRenderOptions | Photon
category: API Reference
description: ISVGRenderOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- export
- isvgrenderoptions
- photon
- svg
primary_topic: svg
source: docs/docs/api/interfaces/core_svg-esm.ISVGRenderOptions.html
tags:
- intermediate
- api-reference
- svg
title: ISVGRenderOptions | Photon
---
ISVGRenderOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/svg-esm](../modules/core_svg-esm.md)
* ISVGRenderOptions

# Interface ISVGRenderOptions

interface ISVGRenderOptions {
    [accuracy](#optionalaccuracy)?: number;
    [annotate](#optionalannotate)?: boolean;
    [className](#optionalclassname)?: string;
    [cssStyle](#optionalcssstyle)?: string;
    [fill](#optionalfill)?: string;
    [fillRule](#optionalfillrule)?: "evenodd" | "nonzero";
    [flow](#optionalflow)?: [IFlowAnnotation](core_svg-esm.IFlowAnnotation.md);
    [fontSize](#optionalfontsize)?: string;
    [layerOptions](#optionallayeroptions)?: Record<string, [ISVGElementRenderOptions](core_svg-esm.ISVGElementRenderOptions.md)>;
    [origin](#optionalorigin)?: [IPoint](core_schema.IPoint.md);
    [scale](#optionalscale)?: number;
    [scalingStroke](#optionalscalingstroke)?: boolean;
    [stroke](#optionalstroke)?: string;
    [strokeWidth](#optionalstrokewidth)?: string;
    [svgAttrs](#optionalsvgattrs)?: [IXmlTagAttrs](core_xml.IXmlTagAttrs.md);
    [units](#optionalunits)?: string;
    [useSvgPathOnly](#optionalusesvgpathonly)?: boolean;
    [viewBox](#optionalviewbox)?: boolean;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/svg-esm.ISVGRenderOptions))

* [ISVGElementRenderOptions](core_svg-esm.ISVGElementRenderOptions.md)
  + ISVGRenderOptions

* Defined in [core/svg-esm.ts:364](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L364)

##### Index

### Properties

[accuracy?](#optionalaccuracy)
[annotate?](#optionalannotate)
[className?](#optionalclassname)
[cssStyle?](#optionalcssstyle)
[fill?](#optionalfill)
[fillRule?](#optionalfillrule)
[flow?](#optionalflow)
[fontSize?](#optionalfontsize)
[layerOptions?](#optionallayeroptions)
[origin?](#optionalorigin)
[scale?](#optionalscale)
[scalingStroke?](#optionalscalingstroke)
[stroke?](#optionalstroke)
[strokeWidth?](#optionalstrokewidth)
[svgAttrs?](#optionalsvgattrs)
[units?](#optionalunits)
[useSvgPathOnly?](#optionalusesvgpathonly)
[viewBox?](#optionalviewbox)

## Properties

### `Optional`accuracy

accuracy?: number

Optional exemplar of number of decimal places.

Overrides IExportOptions.accuracy

* Defined in [core/svg-esm.ts:365](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L365)

### `Optional`annotate

annotate?: boolean

* Defined in [core/svg-esm.ts:369](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L369)

### `Optional`className

className?: string

Inherited from [ISVGElementRenderOptions](core_svg-esm.ISVGElementRenderOptions.md).[className](core_svg-esm.ISVGElementRenderOptions.md#classname)

* Defined in [core/svg-esm.ts:357](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L357)

### `Optional`cssStyle

cssStyle?: string

Inherited from [ISVGElementRenderOptions](core_svg-esm.ISVGElementRenderOptions.md).[cssStyle](core_svg-esm.ISVGElementRenderOptions.md#cssstyle)

* Defined in [core/svg-esm.ts:356](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L356)

### `Optional`fill

fill?: string

Inherited from [ISVGElementRenderOptions](core_svg-esm.ISVGElementRenderOptions.md).[fill](core_svg-esm.ISVGElementRenderOptions.md#fill)

* Defined in [core/svg-esm.ts:353](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L353)

### `Optional`fillRule

fillRule?: "evenodd" | "nonzero"

* Defined in [core/svg-esm.ts:376](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L376)

### `Optional`flow

flow?: [IFlowAnnotation](core_svg-esm.IFlowAnnotation.md)

* Defined in [core/svg-esm.ts:370](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L370)

### `Optional`fontSize

fontSize?: string

* Defined in [core/svg-esm.ts:367](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L367)

### `Optional`layerOptions

layerOptions?: Record<string, [ISVGElementRenderOptions](core_svg-esm.ISVGElementRenderOptions.md)>

* Defined in [core/svg-esm.ts:375](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L375)

### `Optional`origin

origin?: [IPoint](core_schema.IPoint.md)

* Defined in [core/svg-esm.ts:371](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L371)

### `Optional`scale

scale?: number

* Defined in [core/svg-esm.ts:368](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L368)

### `Optional`scalingStroke

scalingStroke?: boolean

* Defined in [core/svg-esm.ts:374](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L374)

### `Optional`stroke

stroke?: string

Inherited from [ISVGElementRenderOptions](core_svg-esm.ISVGElementRenderOptions.md).[stroke](core_svg-esm.ISVGElementRenderOptions.md#stroke)

* Defined in [core/svg-esm.ts:354](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L354)

### `Optional`strokeWidth

strokeWidth?: string

Inherited from [ISVGElementRenderOptions](core_svg-esm.ISVGElementRenderOptions.md).[strokeWidth](core_svg-esm.ISVGElementRenderOptions.md#strokewidth)

* Defined in [core/svg-esm.ts:355](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L355)

### `Optional`svgAttrs

svgAttrs?: [IXmlTagAttrs](core_xml.IXmlTagAttrs.md)

* Defined in [core/svg-esm.ts:366](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L366)

### `Optional`units

units?: string

Optional unit system to embed in exported file, if the export format allows alternate unit systems.

Inherited from IExportOptions.units

* Defined in [core/exporter.ts:19](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/exporter.ts#L19)

### `Optional`useSvgPathOnly

useSvgPathOnly?: boolean

* Defined in [core/svg-esm.ts:372](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L372)

### `Optional`viewBox

viewBox?: boolean

* Defined in [core/svg-esm.ts:373](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/svg-esm.ts#L373)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[accuracy](#accuracy)[annotate](#annotate)[className](#classname)[cssStyle](#cssstyle)[fill](#fill)[fillRule](#fillrule)[flow](#flow)[fontSize](#fontsize)[layerOptions](#layeroptions)[origin](#origin)[scale](#scale)[scalingStroke](#scalingstroke)[stroke](#stroke)[strokeWidth](#strokewidth)[svgAttrs](#svgattrs)[units](#units)[useSvgPathOnly](#usesvgpathonly)[viewBox](#viewbox)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
