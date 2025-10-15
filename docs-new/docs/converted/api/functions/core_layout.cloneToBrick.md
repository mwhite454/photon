---
ai_summary: cloneToBrick | Photon
category: Layout
description: cloneToBrick | Photon
difficulty: intermediate
keywords:
- clonetobrick
- export
- javascript
- layout
- models
- paths
- photon
- photon/core
- svg
prerequisites:
- Intermediate Drawing
primary_topic: cloning
related:
- Moving
- Scaling
- Rotating
- Intermediate Drawing
source: docs/docs/api/functions/core_layout.cloneToBrick.html
tags:
- intermediate
- layout
- cloning
title: cloneToBrick | Photon
---
cloneToBrick | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* cloneToBrick

# Function cloneToBrick

## Prerequisites

Before working with this feature, you should be familiar with:

- [Intermediate Drawing](../index.md)


* cloneToBrick(
      itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md),
      xCount: number,
      yCount: number,
      margin?: number | [IPoint](../interfaces/core_schema.IPoint.md),
  ): [IModel](../interfaces/core_schema.IModel.md)

  Layout clones in a brick format. Alternating rows will have an additional item in each row.

  Examples:

  ```
  //Brick wall
  import { exporter, layout, models, paths } from 'photon/core';
  const brick = new models.RoundRectangle(50, 30, 4);
  const wall = layout.cloneToBrick(brick, 8, 6, 3);
  document.write(exporter.toSVG(wall));
  Copy
  ```

  ```
  //Fish scales
  import { exporter, layout, models, paths } from 'photon/core';
  const arc = new paths.Arc([0, 0], 50, 20, 160);
  const scales = layout.cloneToBrick(arc, 8, 20);
  document.write(exporter.toSVG(scales));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md)
  + xCount: number

    Number of columns in the brick grid.
  + yCount: number

    Number of rows in the brick grid.
  + `Optional`margin: number | [IPoint](../interfaces/core_schema.IPoint.md)

    Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  A new model with clones in a brick layout.

  + Defined in [core/layout.ts:476](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L476)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Moving](../index.md)
- [Scaling](../index.md)
- [Rotating](../index.md)
- [Intermediate Drawing](../index.md)
