---
title: intersection | Photon
source: docs/docs/api/functions/core_intersect.intersection.html
---

intersection | Photon

[Photon](../index.html)




Preparing search index...

* [core/intersect](../modules/core_intersect.html)
* intersection

# Function intersection

* intersection(
      path1: [IPath](../interfaces/core_schema.IPath.html),
      path2: [IPath](../interfaces/core_schema.IPath.html),
      options?: [IPathIntersectionOptions](../interfaces/core_schema.IPathIntersectionOptions.html),
  ): [IPathIntersection](../interfaces/core_schema.IPathIntersection.html)

  Find the point(s) where 2 paths intersect.

  #### Parameters

  + path1: [IPath](../interfaces/core_schema.IPath.html)

    First path to find intersection.
  + path2: [IPath](../interfaces/core_schema.IPath.html)

    Second path to find intersection.
  + options: [IPathIntersectionOptions](../interfaces/core_schema.IPathIntersectionOptions.html) = {}

    Optional IPathIntersectionOptions.

  #### Returns [IPathIntersection](../interfaces/core_schema.IPathIntersection.html)

  IPathIntersection object, with points(s) of intersection (and angles, when a path is an arc or circle); or null if the paths did not intersect.

  + Defined in [core/intersect.ts:248](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/intersect.ts#L248)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
