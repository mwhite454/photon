---
title: IChainLink | Photon
source: docs/docs/api/interfaces/core_maker.IChainLink.html
---

IChainLink | Photon

[Photon](../index.html)




Preparing search index...

* [core/maker](../modules/core_maker.html)
* IChainLink

# Interface IChainLink

A link in a chain, with direction of flow.

interface IChainLink {
    [endPoints](#endpoints): [IPoint](core_schema.IPoint.html)[];
    [pathLength](#pathlength): number;
    [reversed](#reversed): boolean;
    [walkedPath](#walkedpath): [IWalkPath](core_maker.IWalkPath.html);
}

* Defined in [core/maker.ts:425](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L425)

##### Index

### Properties

[endPoints](#endpoints)
[pathLength](#pathlength)
[reversed](#reversed)
[walkedPath](#walkedpath)

## Properties

### endPoints

endPoints: [IPoint](core_schema.IPoint.html)[]

The endpoints of the path, in absolute coords.

* Defined in [core/maker.ts:440](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L440)

### pathLength

pathLength: number

Length of the path.

* Defined in [core/maker.ts:445](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L445)

### reversed

reversed: boolean

Path flows forwards or reverse.

* Defined in [core/maker.ts:435](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L435)

### walkedPath

walkedPath: [IWalkPath](core_maker.IWalkPath.html)

Reference to the path.

* Defined in [core/maker.ts:430](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L430)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[endPoints](#endpoints)[pathLength](#pathlength)[reversed](#reversed)[walkedPath](#walkedpath)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
