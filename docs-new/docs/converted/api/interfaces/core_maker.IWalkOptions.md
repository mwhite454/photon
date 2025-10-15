---
ai_summary: IWalkOptions | Photon
category: API Reference
description: IWalkOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- iwalkoptions
- models
- photon
primary_topic: traversal
source: docs/docs/api/interfaces/core_core.IWalkOptions.html
tags:
- intermediate
- api-reference
- traversal
title: IWalkOptions | Photon
---
IWalkOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_core.md)
* IWalkOptions

# Interface IWalkOptions

Options to pass to model.walk().

interface IWalkOptions {
    [afterChildWalk](#afterchildwalk)?: [IWalkModelCallback](core_core.IWalkModelCallback.md);
    [beforeChildWalk](#beforechildwalk)?: [IWalkModelCancellableCallback](core_core.IWalkModelCancellableCallback.md);
    [onPath](#onpath)?: [IWalkPathCallback](core_core.IWalkPathCallback.md);
}

* Defined in [core/maker.ts:567](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L567)

##### Index

### Properties

[afterChildWalk?](#afterchildwalk)
[beforeChildWalk?](#beforechildwalk)
[onPath?](#onpath)

## Properties

### `Optional`afterChildWalk

afterChildWalk?: [IWalkModelCallback](core_core.IWalkModelCallback.md)

Callback for every child model in every model, after all of its children have been walked.

* Defined in [core/maker.ts:582](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L582)

### `Optional`beforeChildWalk

beforeChildWalk?: [IWalkModelCancellableCallback](core_core.IWalkModelCancellableCallback.md)

Callback for every child model in every model. Return false to stop walking down further models.

* Defined in [core/maker.ts:577](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L577)

### `Optional`onPath

onPath?: [IWalkPathCallback](core_core.IWalkPathCallback.md)

Callback for every path in every model.

* Defined in [core/maker.ts:572](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L572)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[afterChildWalk](#afterchildwalk)[beforeChildWalk](#beforechildwalk)[onPath](#onpath)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
