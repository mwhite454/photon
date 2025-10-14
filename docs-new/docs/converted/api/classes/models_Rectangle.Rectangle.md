---
title: Rectangle | Photon
source: docs/docs/api/classes/models_Rectangle.Rectangle.html
---

Rectangle | Photon

[Photon](../index.html)




Preparing search index...

* [models/Rectangle](../modules/models_Rectangle.html)
* Rectangle

# Class Rectangle

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.html)

* Defined in [models/Rectangle.ts:8](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Rectangle.ts#L8)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[origin](#origin)
[paths](#paths)

## Constructors

### constructor

* new Rectangle(width: number, height: number): Rectangle

  Create a rectangle from width and height.

  Example:

  ```
  //Create a rectangle from width and height
  import * as makerjs from 'maker.js';
  const model = new makerjs.models.Rectangle(50, 100);
  const svg = makerjs.exporter.toSVG(model);
  document.write(svg);
  Copy
  ```

  #### Parameters

  + width: number

    Width of the rectangle.
  + height: number

    Height of the rectangle.

  #### Returns Rectangle

  + Defined in [models/Rectangle.ts:27](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Rectangle.ts#L27)
* new Rectangle(modelToSurround: [IModel](../interfaces/core_schema.IModel.html), margin?: number): Rectangle

  Create a rectangle which will surround a model.

  Example:

  ```
  //Create a rectangle which will surround a model
  import * as makerjs from 'maker.js';
  const e = new makerjs.models.Ellipse(17, 10); // draw an ellipse so we have something to surround.
  const r = new makerjs.models.Rectangle(e, 3); // draws a rectangle surrounding the ellipse by 3 units.
  const svg = makerjs.exporter.toSVG({ models: { e, r } });
  document.write(svg);
  Copy
  ```

  #### Parameters

  + modelToSurround: [IModel](../interfaces/core_schema.IModel.html)

    IModel object.
  + `Optional`margin: number

    Optional distance from the model.

  #### Returns Rectangle

  + Defined in [models/Rectangle.ts:45](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Rectangle.ts#L45)
* new Rectangle(measurement: [IMeasure](../interfaces/core_maker.IMeasure.html)): Rectangle

  Create a rectangle from a measurement.

  Example:

  ```
  //Create a rectangle from a measurement.
  import * as makerjs from 'maker.js';
  const e = new makerjs.models.Ellipse(17, 10); // draw an ellipse so we have something to measure.
  const m = makerjs.measure.modelExtents(e);    // measure the ellipse.
  const r = new makerjs.models.Rectangle(m);    // draws a rectangle surrounding the ellipse.
  const svg = makerjs.exporter.toSVG({ models: { e, r } });
  document.write(svg);
  Copy
  ```

  #### Parameters

  + measurement: [IMeasure](../interfaces/core_maker.IMeasure.html)

    IMeasure object. See <http://maker.js.org/docs/api/modules/makerjs.measure.html#pathextents> and <http://maker.js.org/docs/api/modules/makerjs.measure.html#modelextents> to get measurements of paths and models.

  #### Returns Rectangle

  + Defined in [models/Rectangle.ts:63](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Rectangle.ts#L63)

## Properties

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.html)

Optional origin location of this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[origin](../interfaces/core_schema.IModel.html#origin)

* Defined in [models/Rectangle.ts:10](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Rectangle.ts#L10)

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.html) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.html).[paths](../interfaces/core_schema.IModel.html#paths)

* Defined in [models/Rectangle.ts:9](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Rectangle.ts#L9)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[origin](#origin)[paths](#paths)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
