---
ai_summary: IPathIntersection | Photon
category: API Reference
description: IPathIntersection | Photon
difficulty: intermediate
keywords:
- api-reference
- ipathintersection
- paths
- photon
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/docs/api/interfaces/core_schema.IPathIntersection.html
tags:
- paths
- api-reference
- intermediate
title: IPathIntersection | Photon
---
IPathIntersection | Photon

[Photon](../index.md)




Preparing search index...

* [core/schema](../modules/core_schema.md)
* IPathIntersection

# Interface IPathIntersection

An intersection of two paths.

interface IPathIntersection {
    [intersectionPoints](#intersectionpoints): [IPoint](core_schema.IPoint.md)[];
    [path1Angles](#path1angles)?: number[];
    [path2Angles](#path2angles)?: number[];
}

* Defined in [core/schema.ts:115](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L115)

##### Index

### Properties

[intersectionPoints](#intersectionpoints)
[path1Angles?](#path1angles)
[path2Angles?](#path2angles)

## Properties

### intersectionPoints

intersectionPoints: [IPoint](core_schema.IPoint.md)[]

The points of intersection.

* Defined in [core/schema.ts:117](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L117)

### `Optional`path1Angles

path1Angles?: number[]

The angle of the first path at the point of intersection.

* Defined in [core/schema.ts:119](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L119)

### `Optional`path2Angles

path2Angles?: number[]

The angle of the second path at the point of intersection.

* Defined in [core/schema.ts:121](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L121)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[intersectionPoints](#intersectionpoints)[path1Angles](#path1angles)[path2Angles](#path2angles)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
