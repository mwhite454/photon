---
ai_summary: Preparing search index...
category: Layout
description: Preparing search index...
difficulty: intermediate
keywords:
- clonetorow
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
source: docs/docs/api/functions/core_layout.cloneToRow.html
tags:
- intermediate
- layout
- cloning
title: cloneToRow | Photon
---
cloneToRow | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* cloneToRow

# Function cloneToRow

## Prerequisites

Before working with this feature, you should be familiar with:

- [Intermediate Drawing](../index.md)


* cloneToRow(itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md), count: number, margin?: number): [IModel](../interfaces/core_schema.IModel.md)

  Layout clones in a row format.

  Example:

  ```
  //Tongue and grooves for a box joint
  import { exporter, layout, models, paths } from '@7syllable/photon-core';
  const tongueWidth = 60;
  const grooveWidth = 50;
  const grooveDepth = 30;
  const groove = new models.Dogbone(grooveWidth, grooveDepth, 5, 0, true);

  groove.paths['leftTongue'] = new paths.Line([-tongueWidth / 2, 0], [0, 0]);
  groove.paths['rightTongue'] = new paths.Line([grooveWidth, 0], [grooveWidth + tongueWidth / 2, 0]);

  const tongueAndGrooves = layout.cloneToRow(groove, 3);

  document.write(exporter.toSVG(tongueAndGrooves));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md)
  + count: number

    Number of clones in the row.
  + margin: number = 0

    Optional distance between each clone.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  A new model with clones in a row.

  + Defined in [core/layout.ts:381](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L381)

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
