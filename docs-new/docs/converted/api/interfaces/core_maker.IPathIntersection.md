---
title: IPathIntersection | Photon
source: docs/docs/api/interfaces/core_maker.IPathIntersection.html
---

IPathIntersection | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IPathIntersection

# Interface IPathIntersection

An intersection of two paths.

interface IPathIntersection {
    [intersectionPoints](#intersectionpoints): [IPoint](core_schema.IPoint.md)[];
    [path1Angles](#path1angles)?: number[];
    [path2Angles](#path2angles)?: number[];
}

* Defined in [core/maker.ts:252](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L252)

##### Index

### Properties

[intersectionPoints](#intersectionpoints)
[path1Angles?](#path1angles)
[path2Angles?](#path2angles)

## Properties

### intersectionPoints

intersectionPoints: [IPoint](core_schema.IPoint.md)[]

Array of points where the two paths intersected. The length of the array may be either 1 or 2 points.

* Defined in [core/maker.ts:257](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L257)

### `Optional`path1Angles

path1Angles?: number[]

This Array property will only be defined if the first parameter passed to pathIntersection is either an Arc or a Circle.
It contains the angles of intersection relative to the first path parameter.
The length of the array may be either 1 or 2.

* Defined in [core/maker.ts:264](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L264)

### `Optional`path2Angles

path2Angles?: number[]

This Array property will only be defined if the second parameter passed to pathIntersection is either an Arc or a Circle.
It contains the angles of intersection relative to the second path parameter.
The length of the array may be either 1 or 2.

* Defined in [core/maker.ts:271](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L271)

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
