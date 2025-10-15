---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- cad
- icascade
- photon
primary_topic: icascade-|-photon
source: docs/docs/api/interfaces/core_core.ICascade.html
tags:
- icascade-|-photon
- api-reference
- intermediate
title: ICascade | Photon
---
ICascade | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_core.md)
* ICascade

# Interface ICascade

A container that allows a series of functions to be called upon an object.

interface ICascade {
    [$initial](#initial): any;
    [$reset](#reset): () => this;
    [$result](#result): any;
}

* Defined in [core/maker.ts:661](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L661)

##### Index

### Properties

[$initial](#initial)
[$reset](#reset)
[$result](#result)

## Properties

### $initial

$initial: any

The initial context object of the cascade.

* Defined in [core/maker.ts:666](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L666)

### $reset

$reset: () => this

Use the $original as the $result.

* Defined in [core/maker.ts:676](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L676)

### $result

$result: any

The current final value of the cascade.

* Defined in [core/maker.ts:671](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L671)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[$initial](#initial)[$reset](#reset)[$result](#result)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
