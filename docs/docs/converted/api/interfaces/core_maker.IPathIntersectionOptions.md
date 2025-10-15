---
ai_summary: IPathIntersectionOptions | Photon
category: API Reference
description: IPathIntersectionOptions | Photon
difficulty: intermediate
keywords:
- api-reference
- ipathintersectionoptions
- paths
- photon
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/docs/api/interfaces/core_core.IPathIntersectionOptions.html
tags:
- paths
- api-reference
- intermediate
title: IPathIntersectionOptions | Photon
---
IPathIntersectionOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_core.md)
* IPathIntersectionOptions

# Interface IPathIntersectionOptions

Options to pass to path.intersection()

interface IPathIntersectionOptions {
    [excludeTangents](#excludetangents)?: boolean;
    [out\_AreOverlapped](#out_areoverlapped)?: boolean;
    [path1Offset](#path1offset)?: [IPoint](core_schema.IPoint.md);
    [path2Offset](#path2offset)?: [IPoint](core_schema.IPoint.md);
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IPathIntersectionOptions))

* [IPathIntersectionBaseOptions](core_core.IPathIntersectionBaseOptions.md)
  + IPathIntersectionOptions

* Defined in [core/maker.ts:236](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L236)

##### Index

### Properties

[excludeTangents?](#excludetangents)
[out\_AreOverlapped?](#out_areoverlapped)
[path1Offset?](#path1offset)
[path2Offset?](#path2offset)

## Properties

### `Optional`excludeTangents

excludeTangents?: boolean

Inherited from [IPathIntersectionBaseOptions](core_core.IPathIntersectionBaseOptions.md).[excludeTangents](core_core.IPathIntersectionBaseOptions.md#excludetangents)

* Defined in [core/maker.ts:229](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L229)

### `Optional`out\_AreOverlapped

out\_AreOverlapped?: boolean

Inherited from [IPathIntersectionBaseOptions](core_core.IPathIntersectionBaseOptions.md).[out\_AreOverlapped](core_core.IPathIntersectionBaseOptions.md#out_areoverlapped)

* Defined in [core/maker.ts:230](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L230)

### `Optional`path1Offset

path1Offset?: [IPoint](core_schema.IPoint.md)

Optional boolean to only return deep intersections, i.e. not on an end point or tangent.

* Defined in [core/maker.ts:241](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L241)

### `Optional`path2Offset

path2Offset?: [IPoint](core_schema.IPoint.md)

Optional output variable which will be set to true if the paths are overlapped.

* Defined in [core/maker.ts:246](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L246)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[excludeTangents](#excludetangents)[out\_AreOverlapped](#out_areoverlapped)[path1Offset](#path1offset)[path2Offset](#path2offset)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
