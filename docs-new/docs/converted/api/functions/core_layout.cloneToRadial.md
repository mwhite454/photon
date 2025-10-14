---
title: cloneToRadial | Photon
source: docs/docs/api/functions/core_layout.cloneToRadial.html
---

cloneToRadial | Photon

[Photon](../index.html)




Preparing search index...

* [core/layout](../modules/core_layout.html)
* cloneToRadial

# Function cloneToRadial

* cloneToRadial(
      itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html),
      count: number,
      angleInDegrees: number,
      rotationOrigin?: [IPoint](../interfaces/core_schema.IPoint.html),
  ): [IModel](../interfaces/core_schema.IModel.html)

  Layout clones in a radial format.

  Example:

  ```
  //daisy petals
  import * as makerjs from 'maker.js';

  const belt = new makerjs.models.Belt(5, 50, 20);

  makerjs.model.move(belt, [25, 0]);

  const petals = makerjs.layout.cloneToRadial(belt, 8, 45);

  document.write(makerjs.exporter.toSVG(petals));
  Copy
  ```

  #### Parameters

  + itemToClone: [IPath](../interfaces/core_schema.IPath.html) | [IModel](../interfaces/core_schema.IModel.html)
  + count: number

    Number of clones in the radial result.
  + angleInDegrees: number

    angle of rotation between clones..
  + `Optional`rotationOrigin: [IPoint](../interfaces/core_schema.IPoint.html)

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  A new model with clones in a radial format.

  + Defined in [core/layout.ts:281](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L281)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
