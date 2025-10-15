---
ai_summary: breakAtPoint | Photon
category: API Reference
description: breakAtPoint | Photon
difficulty: intermediate
keywords:
- api-reference
- breakatpoint
- photon
primary_topic: breaking
source: docs/docs/api/functions/core_break.breakAtPoint.html
tags:
- intermediate
- api-reference
- breaking
title: breakAtPoint | Photon
---
breakAtPoint | Photon

[Photon](../index.md)




Preparing search index...

* [core/break](../modules/core_break.md)
* breakAtPoint

# Function breakAtPoint

* breakAtPoint(pathToBreak: [IPath](../interfaces/core_schema.IPath.md), pointOfBreak: [IPoint](../interfaces/core_schema.IPoint.md)): [IPath](../interfaces/core_schema.IPath.md)

  Breaks a path in two. The supplied path will end at the supplied pointOfBreak,
  a new path is returned which begins at the pointOfBreak and ends at the supplied path's initial end point.
  For Circle, the original path will be converted in place to an Arc, and null is returned.

  #### Parameters

  + pathToBreak: [IPath](../interfaces/core_schema.IPath.md)

    The path to break.
  + pointOfBreak: [IPoint](../interfaces/core_schema.IPoint.md)

    The point at which to break the path.

  #### Returns [IPath](../interfaces/core_schema.IPath.md)

  A new path of the same type, when path type is line or arc. Returns null for circle.

  + Defined in [core/break.ts:143](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/break.ts#L143)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
