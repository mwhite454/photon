---
title: breakAtPoint | Photon
source: docs/docs/api/functions/core_break.breakAtPoint.html
---

breakAtPoint | Photon

[Photon](../index.html)




Preparing search index...

* [core/break](../modules/core_break.html)
* breakAtPoint

# Function breakAtPoint

* breakAtPoint(pathToBreak: [IPath](../interfaces/core_schema.IPath.html), pointOfBreak: [IPoint](../interfaces/core_schema.IPoint.html)): [IPath](../interfaces/core_schema.IPath.html)

  Breaks a path in two. The supplied path will end at the supplied pointOfBreak,
  a new path is returned which begins at the pointOfBreak and ends at the supplied path's initial end point.
  For Circle, the original path will be converted in place to an Arc, and null is returned.

  #### Parameters

  + pathToBreak: [IPath](../interfaces/core_schema.IPath.html)

    The path to break.
  + pointOfBreak: [IPoint](../interfaces/core_schema.IPoint.html)

    The point at which to break the path.

  #### Returns [IPath](../interfaces/core_schema.IPath.html)

  A new path of the same type, when path type is line or arc. Returns null for circle.

  + Defined in [core/break.ts:143](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/break.ts#L143)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
