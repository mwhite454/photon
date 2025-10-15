---
ai_summary: childrenOnPath | Photon
category: Layout
description: childrenOnPath | Photon
difficulty: intermediate
keywords:
- cad
- childrenonpath
- layout
- photon
prerequisites:
- Intermediate Drawing
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
- Intermediate Drawing
source: docs/docs/api/functions/core_layout.childrenOnPath.html
tags:
- paths
- layout
- intermediate
title: childrenOnPath | Photon
---
childrenOnPath | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* childrenOnPath

# Function childrenOnPath

## Prerequisites

Before working with this feature, you should be familiar with:

- [Intermediate Drawing](../index.md)


* childrenOnPath(
      parentModel: [IModel](../interfaces/core_schema.IModel.md),
      onPath: [IPath](../interfaces/core_schema.IPath.md),
      baseline?: number,
      reversed?: boolean,
      contain?: boolean,
      rotate?: boolean,
  ): [IModel](../interfaces/core_schema.IModel.md)

  Layout the children of a model along a path.
  The x-position of each child will be projected onto the path so that the proportion between children is maintained.
  Each child will be rotated such that it will be perpendicular to the path at the child's x-center.

  #### Parameters

  + parentModel: [IModel](../interfaces/core_schema.IModel.md)

    The model containing children to lay out.
  + onPath: [IPath](../interfaces/core_schema.IPath.md)

    The path on which to lay out.
  + baseline: number = 0

    Numeric percentage value of vertical displacement from the path. Default is zero.
  + reversed: boolean = false

    Flag to travel along the path in reverse. Default is false.
  + contain: boolean = false

    Flag to contain the children layout within the length of the path. Default is false.
  + rotate: boolean = true

    Flag to rotate the child to perpendicular. Default is true.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The parentModel, for cascading.

  + Defined in [core/layout.ts:133](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L133)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
- [Intermediate Drawing](../index.md)
