---
title: cloneToBrick | Photon
source: docs/docs/api/functions/core_layout.cloneToBrick.html
---

cloneToBrick | Photon

[Photon](../index.html)




Preparing search index...

* [core/layout](../modules/core_layout.html)
* cloneToBrick

# Function cloneToBrick

* cloneToBrick(
      itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html),
      xCount: number,
      yCount: number,
      margin?: number | [IPoint](../interfaces/core_schema.IPoint.html),
  ): [IModel](../interfaces/core_schema.IModel.html)

  Layout clones in a brick format. Alternating rows will have an additional item in each row.

  Examples:

  ```
  //Brick wall
  import * as makerjs from 'maker.js';
  const brick = new makerjs.models.RoundRectangle(50, 30, 4);
  const wall = makerjs.layout.cloneToBrick(brick, 8, 6, 3);
  document.write(makerjs.exporter.toSVG(wall));
  Copy
  ```

  ```
  //Fish scales
  import * as makerjs from 'maker.js';
  const arc = new makerjs.paths.Arc([0, 0], 50, 20, 160);
  const scales = makerjs.layout.cloneToBrick(arc, 8, 20);
  document.write(makerjs.exporter.toSVG(scales));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html)
  + xCount: number

    Number of columns in the brick grid.
  + yCount: number

    Number of rows in the brick grid.
  + `Optional`margin: number | [IPoint](../interfaces/core_schema.IPoint.html)

    Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  A new model with clones in a brick layout.

  + Defined in [core/layout.ts:476](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L476)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
