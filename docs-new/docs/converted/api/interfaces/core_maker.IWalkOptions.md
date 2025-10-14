---
title: IWalkOptions | Photon
source: docs/docs/api/interfaces/core_maker.IWalkOptions.html
---

IWalkOptions | Photon

[Photon](../index.html)




Preparing search index...

* [core/maker](../modules/core_maker.html)
* IWalkOptions

# Interface IWalkOptions

Options to pass to model.walk().

interface IWalkOptions {
    [afterChildWalk](#afterchildwalk)?: [IWalkModelCallback](core_maker.IWalkModelCallback.html);
    [beforeChildWalk](#beforechildwalk)?: [IWalkModelCancellableCallback](core_maker.IWalkModelCancellableCallback.html);
    [onPath](#onpath)?: [IWalkPathCallback](core_maker.IWalkPathCallback.html);
}

* Defined in [core/maker.ts:567](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L567)

##### Index

### Properties

[afterChildWalk?](#afterchildwalk)
[beforeChildWalk?](#beforechildwalk)
[onPath?](#onpath)

## Properties

### `Optional`afterChildWalk

afterChildWalk?: [IWalkModelCallback](core_maker.IWalkModelCallback.html)

Callback for every child model in every model, after all of its children have been walked.

* Defined in [core/maker.ts:582](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L582)

### `Optional`beforeChildWalk

beforeChildWalk?: [IWalkModelCancellableCallback](core_maker.IWalkModelCancellableCallback.html)

Callback for every child model in every model. Return false to stop walking down further models.

* Defined in [core/maker.ts:577](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L577)

### `Optional`onPath

onPath?: [IWalkPathCallback](core_maker.IWalkPathCallback.html)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
