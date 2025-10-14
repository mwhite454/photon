---
title: RoundRectangle | Photon
source: docs/docs/api/classes/models_RoundRectangle.RoundRectangle.html
---

RoundRectangle | Photon

[Photon](../index.md)




Preparing search index...

* [models/RoundRectangle](../modules/models_RoundRectangle.md)
* RoundRectangle

# Class RoundRectangle

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

* Defined in [models/RoundRectangle.ts:7](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/RoundRectangle.ts#L7)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[origin](#origin)
[paths](#paths)

## Constructors

### constructor

* new RoundRectangle(
      width: number,
      height: number,
      radius: number,
  ): RoundRectangle

  Create a round rectangle from width, height, and corner radius.

  Example:

  ```
  const r = new makerjs.models.RoundRectangle(100, 50, 5);
  Copy
  ```

  #### Parameters

  + width: number

    Width of the rectangle.
  + height: number

    Height of the rectangle.
  + radius: number

    Corner radius.

  #### Returns RoundRectangle

  + Defined in [models/RoundRectangle.ts:23](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/RoundRectangle.ts#L23)
* new RoundRectangle(modelToSurround: [IModel](../interfaces/core_schema.IModel.md), margin: number): RoundRectangle

  Create a round rectangle which will surround a model.

  Example:

  ```
  const b = new makerjs.models.BoltRectangle(30, 20, 1); //draw a bolt rectangle so we have something to surround
  const r = new makerjs.models.RoundRectangle(b, 2.5);   //surround it
  Copy
  ```

  #### Parameters

  + modelToSurround: [IModel](../interfaces/core_schema.IModel.md)

    IModel object.
  + margin: number

    Distance from the model. This will also become the corner radius.

  #### Returns RoundRectangle

  + Defined in [models/RoundRectangle.ts:37](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/RoundRectangle.ts#L37)

## Properties

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.md)

Optional origin location of this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[origin](../interfaces/core_schema.IModel.md#origin)

* Defined in [models/RoundRectangle.ts:8](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/RoundRectangle.ts#L8)

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.md) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[paths](../interfaces/core_schema.IModel.md#paths)

* Defined in [models/RoundRectangle.ts:9](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/RoundRectangle.ts#L9)

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
