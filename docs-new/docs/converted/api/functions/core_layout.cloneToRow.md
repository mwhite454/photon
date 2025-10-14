---
title: cloneToRow | Photon
source: docs/docs/api/functions/core_layout.cloneToRow.html
---

cloneToRow | Photon

[Photon](../index.html)




Preparing search index...

* [core/layout](../modules/core_layout.html)
* cloneToRow

# Function cloneToRow

* cloneToRow(itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html), count: number, margin?: number): [IModel](../interfaces/core_schema.IModel.html)

  Layout clones in a row format.

  Example:

  ```
  //Tongue and grooves for a box joint
  import * as makerjs from 'maker.js';
  const tongueWidth = 60;
  const grooveWidth = 50;
  const grooveDepth = 30;
  const groove = new makerjs.models.Dogbone(grooveWidth, grooveDepth, 5, 0, true);

  groove.paths['leftTongue'] = new makerjs.paths.Line([-tongueWidth / 2, 0], [0, 0]);
  groove.paths['rightTongue'] = new makerjs.paths.Line([grooveWidth, 0], [grooveWidth + tongueWidth / 2, 0]);

  const tongueAndGrooves = makerjs.layout.cloneToRow(groove, 3);

  document.write(makerjs.exporter.toSVG(tongueAndGrooves));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html)
  + count: number

    Number of clones in the row.
  + margin: number = 0

    Optional distance between each clone.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  A new model with clones in a row.

  + Defined in [core/layout.ts:381](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L381)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
