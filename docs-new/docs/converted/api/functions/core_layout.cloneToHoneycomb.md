---
ai_summary: cloneToHoneycomb | Photon
category: Layout
description: cloneToHoneycomb | Photon
difficulty: intermediate
keywords:
- clonetohoneycomb
- export
- javascript
- layout
- models
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
source: docs/docs/api/functions/core_layout.cloneToHoneycomb.html
tags:
- intermediate
- layout
- cloning
title: cloneToHoneycomb | Photon
---
cloneToHoneycomb | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* cloneToHoneycomb

# Function cloneToHoneycomb

## Prerequisites

Before working with this feature, you should be familiar with:

- [Intermediate Drawing](../index.md)


* cloneToHoneycomb(
      itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md),
      xCount: number,
      yCount: number,
      margin?: number,
  ): [IModel](../interfaces/core_schema.IModel.md)

  Layout clones in a honeycomb format. Alternating rows will have an additional item in each row.

  Examples:

  ```
  //Honeycomb
  import { exporter, layout, models } from 'photon/core';
  const hex = new models.Polygon(6, 50, 30);
  const pattern = layout.cloneToHoneycomb(hex, 8, 9, 10);
  document.write(exporter.toSVG(pattern));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md)
  + xCount: number

    Number of columns in the honeycomb grid.
  + yCount: number

    Number of rows in the honeycomb grid.
  + margin: number = 0

    Optional distance between each clone.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  A new model with clones in a honeycomb layout.

  + Defined in [core/layout.ts:508](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L508)

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
