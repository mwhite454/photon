---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- ichainlink
- photon
primary_topic: chains
related:
- Chain Theory
- Breaking
- Routes
source: docs/docs/api/interfaces/core_core.IChainLink.html
tags:
- intermediate
- api-reference
- chains
title: IChainLink | Photon
---
IChainLink | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IChainLink

# Interface IChainLink

A link in a chain, with direction of flow.

interface IChainLink {
    [endPoints](#endpoints): [IPoint](core_schema.IPoint.md)[];
    [pathLength](#pathlength): number;
    [reversed](#reversed): boolean;
    [walkedPath](#walkedpath): [IWalkPath](core_maker.IWalkPath.md);
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

endPoints: [IPoint](core_schema.IPoint.md)[]

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

walkedPath: [IWalkPath](core_maker.IWalkPath.md)

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Chain Theory](../index.md)
- [Breaking](../index.md)
- [Routes](../index.md)
