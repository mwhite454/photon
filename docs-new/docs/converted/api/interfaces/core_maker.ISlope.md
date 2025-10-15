---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- islope
- photon
primary_topic: islope-|-photon
source: docs/docs/api/interfaces/core_core.ISlope.html
tags:
- intermediate
- api-reference
- islope-|-photon
title: ISlope | Photon
---
ISlope | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_core.md)
* ISlope

# Interface ISlope

Slope and y-intercept of a line.

interface ISlope {
    [hasSlope](#hasslope): boolean;
    [line](#line): [IPathLine](core_schema.IPathLine.md);
    [slope](#slope)?: number;
    [yIntercept](#yintercept)?: number;
}

* Defined in [core/maker.ts:220](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L220)

##### Index

### Properties

[hasSlope](#hasslope)
[line](#line)
[slope?](#slope)
[yIntercept?](#yintercept)

## Properties

### hasSlope

hasSlope: boolean

* Defined in [core/maker.ts:221](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L221)

### line

line: [IPathLine](core_schema.IPathLine.md)

* Defined in [core/maker.ts:223](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L223)

### `Optional`slope

slope?: number

* Defined in [core/maker.ts:222](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L222)

### `Optional`yIntercept

yIntercept?: number

* Defined in [core/maker.ts:224](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L224)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[hasSlope](#hasslope)[line](#line)[slope](#slope)[yIntercept](#yintercept)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
