---
ai_summary: cloneToRadial | Photon
category: Layout
description: cloneToRadial | Photon
difficulty: intermediate
keywords:
- clonetoradial
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
source: docs/docs/api/functions/core_layout.cloneToRadial.html
tags:
- intermediate
- layout
- cloning
title: cloneToRadial | Photon
---
cloneToRadial | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* cloneToRadial

# Function cloneToRadial

## Prerequisites

Before working with this feature, you should be familiar with:

- [Intermediate Drawing](../index.md)


* cloneToRadial(
      itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md),
      count: number,
      angleInDegrees: number,
      rotationOrigin?: [IPoint](../interfaces/core_schema.IPoint.md),
  ): [IModel](../interfaces/core_schema.IModel.md)

  Layout clones in a radial format.

  Example:

  ```
  //daisy petals
  import { exporter, layout, model, models } from 'photon/core';

  const belt = new models.Belt(5, 50, 20);

  model.move(belt, [25, 0]);

  const petals = layout.cloneToRadial(belt, 8, 45);

  document.write(exporter.toSVG(petals));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.md) | [IModel](../interfaces/core_schema.IModel.md)
  + count: number

    Number of clones in the radial result.
  + angleInDegrees: number

    angle of rotation between clones..
  + `Optional`rotationOrigin: [IPoint](../interfaces/core_schema.IPoint.md)

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  A new model with clones in a radial format.

  + Defined in [core/layout.ts:281](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L281)

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
