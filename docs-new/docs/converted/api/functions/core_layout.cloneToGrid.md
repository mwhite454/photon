---
title: cloneToGrid | Photon
source: docs/docs/api/functions/core_layout.cloneToGrid.html
---

cloneToGrid | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* cloneToGrid

# Function cloneToGrid

* cloneToGrid(
      itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md),
      xCount: number,
      yCount: number,
      margin?: number | [IPoint](../interfaces/core_schema.IPoint.md),
  ): [IModel](../interfaces/core_schema.IModel.md)

  Layout clones in a grid format.

  Example:

  ```
  //Grid of squares
  import { exporter, layout, models } from 'photon/core';
  const square = new models.Square(43);
  const grid = layout.cloneToGrid(square, 5, 5, 7);
  document.write(exporter.toSVG(grid));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md)
  + xCount: number

    Number of columns in the grid.
  + yCount: number

    Number of rows in the grid.
  + `Optional`margin: number | [IPoint](../interfaces/core_schema.IPoint.md)

    Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  A new model with clones in a grid layout.

  + Defined in [core/layout.ts:403](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L403)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
