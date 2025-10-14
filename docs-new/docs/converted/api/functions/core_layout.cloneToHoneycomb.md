---
title: cloneToHoneycomb | Photon
source: docs/docs/api/functions/core_layout.cloneToHoneycomb.html
---

cloneToHoneycomb | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* cloneToHoneycomb

# Function cloneToHoneycomb

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
