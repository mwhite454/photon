---
title: childrenOnPath | Photon
source: docs/docs/api/functions/core_layout.childrenOnPath.html
---

childrenOnPath | Photon

[Photon](../index.html)




Preparing search index...

* [core/layout](../modules/core_layout.html)
* childrenOnPath

# Function childrenOnPath

* childrenOnPath(
      parentModel: [IModel](../interfaces/core_schema.IModel.html),
      onPath: [IPath](../interfaces/core_schema.IPath.html),
      baseline?: number,
      reversed?: boolean,
      contain?: boolean,
      rotate?: boolean,
  ): [IModel](../interfaces/core_schema.IModel.html)

  Layout the children of a model along a path.
  The x-position of each child will be projected onto the path so that the proportion between children is maintained.
  Each child will be rotated such that it will be perpendicular to the path at the child's x-center.

  #### Parameters

  + parentModel: [IModel](../interfaces/core_schema.IModel.html)

    The model containing children to lay out.
  + onPath: [IPath](../interfaces/core_schema.IPath.html)

    The path on which to lay out.
  + baseline: number = 0

    Numeric percentage value of vertical displacement from the path. Default is zero.
  + reversed: boolean = false

    Flag to travel along the path in reverse. Default is false.
  + contain: boolean = false

    Flag to contain the children layout within the length of the path. Default is false.
  + rotate: boolean = true

    Flag to rotate the child to perpendicular. Default is true.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  The parentModel, for cascading.

  + Defined in [core/layout.ts:133](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L133)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
