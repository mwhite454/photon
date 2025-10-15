---
ai_summary: cloneToColumn | Photon
category: Layout
description: cloneToColumn | Photon
difficulty: intermediate
keywords:
- clonetocolumn
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
source: docs/docs/api/functions/core_layout.cloneToColumn.html
tags:
- intermediate
- layout
- cloning
title: cloneToColumn | Photon
---
cloneToColumn | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* cloneToColumn

# Function cloneToColumn

## Prerequisites

Before working with this feature, you should be familiar with:

- [Intermediate Drawing](../index.md)


* cloneToColumn(
      itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md),
      count: number,
      margin?: number,
  ): [IModel](../interfaces/core_schema.IModel.md)

  Layout clones in a column format.

  Example:

  ```
  //Grooves for a finger joint
  import { exporter, layout, models } from '@7syllable/photon-core';

  const dogbone = new models.Dogbone(50, 20, 2, -1, false);

  const grooves = layout.cloneToColumn(dogbone, 5, 20);

  document.write(exporter.toSVG(grooves));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md)
  + count: number

    Number of clones in the column.
  + margin: number = 0

    Optional distance between each clone.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  A new model with clones in a column.

  + Defined in [core/layout.ts:352](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L352)

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
