---
ai_summary: IMetaParameter | Photon
category: API Reference
description: IMetaParameter | Photon
difficulty: intermediate
keywords:
- api-reference
- imetaparameter
- photon
primary_topic: imetaparameter-|-photon
source: docs/docs/api/interfaces/core_core.IMetaParameter.html
tags:
- intermediate
- api-reference
- imetaparameter-|-photon
title: IMetaParameter | Photon
---
IMetaParameter | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IMetaParameter

# Interface IMetaParameter

Describes a parameter and its limits.

interface IMetaParameter {
    [max](#max)?: number;
    [min](#min)?: number;
    [step](#step)?: number;
    [title](#title): string;
    [type](#type): string;
    [value](#value): any;
}

* Defined in [core/maker.ts:601](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L601)

##### Index

### Properties

[max?](#max)
[min?](#min)
[step?](#step)
[title](#title)
[type](#type)
[value](#value)

## Properties

### `Optional`max

max?: number

Optional maximum value of the range.

* Defined in [core/maker.ts:621](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L621)

### `Optional`min

min?: number

Optional minimum value of the range.

* Defined in [core/maker.ts:616](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L616)

### `Optional`step

step?: number

Optional step value between min and max.

* Defined in [core/maker.ts:626](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L626)

### title

title: string

Display text of the parameter.

* Defined in [core/maker.ts:606](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L606)

### type

type: string

Type of the parameter. Currently supports "range".

* Defined in [core/maker.ts:611](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L611)

### value

value: any

Initial sample value for this parameter.

* Defined in [core/maker.ts:631](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L631)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[max](#max)[min](#min)[step](#step)[title](#title)[type](#type)[value](#value)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
