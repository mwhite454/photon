---
title: IPathIntersectionOptions | Photon
source: docs/docs/api/interfaces/core_maker.IPathIntersectionOptions.html
---

IPathIntersectionOptions | Photon

[Photon](../index.html)




Preparing search index...

* [core/maker](../modules/core_maker.html)
* IPathIntersectionOptions

# Interface IPathIntersectionOptions

Options to pass to path.intersection()

interface IPathIntersectionOptions {
    [excludeTangents](#excludetangents)?: boolean;
    [out\_AreOverlapped](#out_areoverlapped)?: boolean;
    [path1Offset](#path1offset)?: [IPoint](core_schema.IPoint.html);
    [path2Offset](#path2offset)?: [IPoint](core_schema.IPoint.html);
}

#### Hierarchy ([View Summary](../hierarchy.html#core/maker.IPathIntersectionOptions))

* [IPathIntersectionBaseOptions](core_maker.IPathIntersectionBaseOptions.html)
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

Inherited from [IPathIntersectionBaseOptions](core_maker.IPathIntersectionBaseOptions.html).[excludeTangents](core_maker.IPathIntersectionBaseOptions.html#excludetangents)

* Defined in [core/maker.ts:229](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L229)

### `Optional`out\_AreOverlapped

out\_AreOverlapped?: boolean

Inherited from [IPathIntersectionBaseOptions](core_maker.IPathIntersectionBaseOptions.html).[out\_AreOverlapped](core_maker.IPathIntersectionBaseOptions.html#out_areoverlapped)

* Defined in [core/maker.ts:230](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L230)

### `Optional`path1Offset

path1Offset?: [IPoint](core_schema.IPoint.html)

Optional boolean to only return deep intersections, i.e. not on an end point or tangent.

* Defined in [core/maker.ts:241](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L241)

### `Optional`path2Offset

path2Offset?: [IPoint](core_schema.IPoint.html)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
