---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- export
- javascript
- models
- paths
- photon
- photon/core
- rectangle
- svg
primary_topic: rectangle-|-photon
source: docs/docs/api/classes/models_Rectangle.Rectangle.html
tags:
- intermediate
- api-reference
- rectangle-|-photon
title: Rectangle | Photon
---
Rectangle | Photon

[Photon](../index.md)




Preparing search index...

* [models/Rectangle](../modules/models_Rectangle.md)
* Rectangle

# Class Rectangle

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

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
  import { exporter, measure, models } from '@7syllable/photon-core';
  const model = new models.Rectangle(50, 100);
  const svg = exporter.toSVG(model);
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
* new Rectangle(modelToSurround: [IModel](../interfaces/core_schema.IModel.md), margin?: number): Rectangle

  Create a rectangle which will surround a model.

  Example:

  ```
  //Create a rectangle which will surround a model
  import { exporter, measure, models } from '@7syllable/photon-core';
  const e = new models.Ellipse(17, 10); // draw an ellipse so we have something to surround.
  const r = new models.Rectangle(e, 3); // draws a rectangle surrounding the ellipse by 3 units.
  const svg = exporter.toSVG({ models: { e, r } });
  document.write(svg);
  Copy
  ```

  #### Parameters

  + modelToSurround: [IModel](../interfaces/core_schema.IModel.md)

    IModel object.
  + `Optional`margin: number

    Optional distance from the model.

  #### Returns Rectangle

  + Defined in [models/Rectangle.ts:45](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Rectangle.ts#L45)
* new Rectangle(measurement: [IMeasure](../interfaces/core_maker.IMeasure.md)): Rectangle

  Create a rectangle from a measurement.

  Example:

  ```
  //Create a rectangle from a measurement.
  import { exporter, measure, models } from '@7syllable/photon-core';
  const e = new models.Ellipse(17, 10); // draw an ellipse so we have something to measure.
  const m = measure.modelExtents(e);    // measure the ellipse.
  const r = new models.Rectangle(m);    // draws a rectangle surrounding the ellipse.
  const svg = exporter.toSVG({ models: { e, r } });
  document.write(svg);
  Copy
  ```

  #### Parameters

  + measurement: [IMeasure](../interfaces/core_maker.IMeasure.md)

    IMeasure object. See <http:// photon/core.org/docs/api/modules/measure.html#pathextents> and <http:// photon/core.org/docs/api/modules/measure.html#modelextents> to get measurements of paths and models.

  #### Returns Rectangle

  + Defined in [models/Rectangle.ts:63](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Rectangle.ts#L63)

## Properties

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.md)

Optional origin location of this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[origin](../interfaces/core_schema.IModel.md#origin)

* Defined in [models/Rectangle.ts:10](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Rectangle.ts#L10)

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.md) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[paths](../interfaces/core_schema.IModel.md#paths)

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

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
