---
title: cloneToRadial | Photon
source: docs/docs/api/functions/core_layout.cloneToRadial.html
---

cloneToRadial | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* cloneToRadial

# Function cloneToRadial

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
