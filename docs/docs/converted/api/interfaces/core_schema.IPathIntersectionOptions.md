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
source: docs/docs/api/interfaces/core_schema.IPathIntersectionOptions.html
tags:
- paths
- api-reference
- intermediate
title: IPathIntersectionOptions | Photon
---
IPathIntersectionOptions | Photon

[Photon](../index.md)




Preparing search index...

* [core/schema](../modules/core_schema.md)
* IPathIntersectionOptions

# Interface IPathIntersectionOptions

Options for path intersection.

interface IPathIntersectionOptions {
    [excludeTangents](#excludetangents)?: boolean;
    [out\_AreOverlapped](#out_areoverlapped)?: boolean;
    [path1Offset](#path1offset)?: [IPoint](core_schema.IPoint.md);
    [path2Offset](#path2offset)?: [IPoint](core_schema.IPoint.md);
}

* Defined in [core/schema.ts:125](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L125)

##### Index

### Properties

[excludeTangents?](#excludetangents)
[out\_AreOverlapped?](#out_areoverlapped)
[path1Offset?](#path1offset)
[path2Offset?](#path2offset)

## Properties

### `Optional`excludeTangents

excludeTangents?: boolean

Optional boolean to only return deep intersections, i.e. not tangent.

* Defined in [core/schema.ts:127](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L127)

### `Optional`out\_AreOverlapped

out\_AreOverlapped?: boolean

Optional output variable which will be true if the paths are overlapped.

* Defined in [core/schema.ts:129](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L129)

### `Optional`path1Offset

path1Offset?: [IPoint](core_schema.IPoint.md)

Optional offset of the first path.

* Defined in [core/schema.ts:131](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L131)

### `Optional`path2Offset

path2Offset?: [IPoint](core_schema.IPoint.md)

Optional offset of the second path.

* Defined in [core/schema.ts:133](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L133)

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
