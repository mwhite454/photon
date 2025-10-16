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

* [core/maker](../modules/core_maker.md)
* IWalkOptions

## Interface IWalkOptions

Options to pass to model.walk().

interface IWalkOptions {
    [afterChildWalk](#optionalafterchildwalk)?: [IWalkModelCallback](core_maker.IWalkModelCallback.md);
    [beforeChildWalk](#optionalbeforechildwalk)?: [IWalkModelCancellableCallback](core_maker.IWalkModelCancellableCallback.md);
    [onPath](#optionalonpath)?: [IWalkPathCallback](core_maker.IWalkPathCallback.md);
}

* Defined in [core/maker.ts:567](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L567)

* [afterChildWalk?](#optionalafterchildwalk)
* [beforeChildWalk?](#optionalbeforechildwalk)
* [onPath?](#optionalonpath)

### `Optional`afterChildWalk

afterChildWalk?: [IWalkModelCallback](core_maker.IWalkModelCallback.md)

Callback for every child model in every model, after all of its children have been walked.

* Defined in [core/maker.ts:582](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L582)

### `Optional`beforeChildWalk

beforeChildWalk?: [IWalkModelCancellableCallback](core_maker.IWalkModelCancellableCallback.md)

Callback for every child model in every model. Return false to stop walking down further models.

* Defined in [core/maker.ts:577](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L577)

### `Optional`onPath

onPath?: [IWalkPathCallback](core_maker.IWalkPathCallback.md)

Callback for every path in every model.

* Defined in [core/maker.ts:572](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L572)

[afterChildWalk](#optionalafterchildwalk)
[beforeChildWalk](#optionalbeforechildwalk)
[onPath](#optionalonpath)

[Photon](../index.md)

Generated using [TypeDoc](https://typedoc.org/)
