---
title: cloneToHoneycomb | Photon
source: docs/docs/api/functions/core_layout.cloneToHoneycomb.html
---

cloneToHoneycomb | Photon

[Photon](../index.html)




Preparing search index...

* [core/layout](../modules/core_layout.html)
* cloneToHoneycomb

# Function cloneToHoneycomb

* cloneToHoneycomb(
      itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html),
      xCount: number,
      yCount: number,
      margin?: number,
  ): [IModel](../interfaces/core_schema.IModel.html)

  Layout clones in a honeycomb format. Alternating rows will have an additional item in each row.

  Examples:

  ```
  //Honeycomb
  import * as makerjs from 'maker.js';
  const hex = new makerjs.models.Polygon(6, 50, 30);
  const pattern = makerjs.layout.cloneToHoneycomb(hex, 8, 9, 10);
  document.write(makerjs.exporter.toSVG(pattern));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html)
  + xCount: number

    Number of columns in the honeycomb grid.
  + yCount: number

    Number of rows in the honeycomb grid.
  + margin: number = 0

    Optional distance between each clone.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  A new model with clones in a honeycomb layout.

  + Defined in [core/layout.ts:508](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L508)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
