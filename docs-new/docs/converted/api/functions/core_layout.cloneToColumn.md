---
title: cloneToColumn | Photon
source: docs/docs/api/functions/core_layout.cloneToColumn.html
---

cloneToColumn | Photon

[Photon](../index.html)




Preparing search index...

* [core/layout](../modules/core_layout.html)
* cloneToColumn

# Function cloneToColumn

* cloneToColumn(
      itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html),
      count: number,
      margin?: number,
  ): [IModel](../interfaces/core_schema.IModel.html)

  Layout clones in a column format.

  Example:

  ```
  //Grooves for a finger joint
  import * as makerjs from 'maker.js';

  const dogbone = new makerjs.models.Dogbone(50, 20, 2, -1, false);

  const grooves = makerjs.layout.cloneToColumn(dogbone, 5, 20);

  document.write(makerjs.exporter.toSVG(grooves));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html)
  + count: number

    Number of clones in the column.
  + margin: number = 0

    Optional distance between each clone.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  A new model with clones in a column.

  + Defined in [core/layout.ts:352](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L352)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
