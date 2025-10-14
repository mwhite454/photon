---
title: cloneToGrid | Photon
source: docs/docs/api/functions/core_layout.cloneToGrid.html
---

cloneToGrid | Photon

[Photon](../index.html)




Preparing search index...

* [core/layout](../modules/core_layout.html)
* cloneToGrid

# Function cloneToGrid

* cloneToGrid(
      itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html),
      xCount: number,
      yCount: number,
      margin?: number | [IPoint](../interfaces/core_schema.IPoint.html),
  ): [IModel](../interfaces/core_schema.IModel.html)

  Layout clones in a grid format.

  Example:

  ```
  //Grid of squares
  import * as makerjs from 'maker.js';
  const square = new makerjs.models.Square(43);
  const grid = makerjs.layout.cloneToGrid(square, 5, 5, 7);
  document.write(makerjs.exporter.toSVG(grid));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html)
  + xCount: number

    Number of columns in the grid.
  + yCount: number

    Number of rows in the grid.
  + `Optional`margin: number | [IPoint](../interfaces/core_schema.IPoint.html)

    Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  A new model with clones in a grid layout.

  + Defined in [core/layout.ts:403](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L403)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
