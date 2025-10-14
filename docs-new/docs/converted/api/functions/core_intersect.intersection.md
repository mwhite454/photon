---
title: intersection | Photon
source: docs/docs/api/functions/core_intersect.intersection.html
---

intersection | Photon

[Photon](../index.md)




Preparing search index...

* [core/intersect](../modules/core_intersect.md)
* intersection

# Function intersection

* intersection(
      path1: [IPath](../interfaces/core_schema.IPath.md),
      path2: [IPath](../interfaces/core_schema.IPath.md),
      options?: [IPathIntersectionOptions](../interfaces/core_schema.IPathIntersectionOptions.md),
  ): [IPathIntersection](../interfaces/core_schema.IPathIntersection.md)

  Find the point(s) where 2 paths intersect.

  #### Parameters

  + path1: [IPath](../interfaces/core_schema.IPath.md)

    First path to find intersection.
  + path2: [IPath](../interfaces/core_schema.IPath.md)

    Second path to find intersection.
  + options: [IPathIntersectionOptions](../interfaces/core_schema.IPathIntersectionOptions.md) = {}

    Optional IPathIntersectionOptions.

  #### Returns [IPathIntersection](../interfaces/core_schema.IPathIntersection.md)

  IPathIntersection object, with points(s) of intersection (and angles, when a path is an arc or circle); or null if the paths did not intersect.

  + Defined in [core/intersect.ts:248](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/intersect.ts#L248)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
