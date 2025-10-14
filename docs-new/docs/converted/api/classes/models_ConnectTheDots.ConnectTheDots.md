---
title: ConnectTheDots | Photon
source: docs/docs/api/classes/models_ConnectTheDots.ConnectTheDots.html
---

ConnectTheDots | Photon

[Photon](../index.md)




Preparing search index...

* [models/ConnectTheDots](../modules/models_ConnectTheDots.md)
* ConnectTheDots

# Class ConnectTheDots

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

* Defined in [models/ConnectTheDots.ts:30](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/ConnectTheDots.ts#L30)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[paths](#paths)

## Constructors

### constructor

* new ConnectTheDots(numericList: string): ConnectTheDots

  Create a model by connecting points designated in a string. The model will be 'closed' - i.e. the last point will connect to the first point.

  Example:

  ```
  const c = new makerjs.models.ConnectTheDots('-10 0 10 0 0 20'); // 3 coordinates to form a triangle
  Copy
  ```

  #### Parameters

  + numericList: string

    String containing a list of numbers which can be delimited by spaces, commas, or anything non-numeric (Note: [exponential notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential) is allowed).

  #### Returns ConnectTheDots

  + Defined in [models/ConnectTheDots.ts:43](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/ConnectTheDots.ts#L43)
* new ConnectTheDots(isClosed: boolean, numericList: string): ConnectTheDots

  Create a model by connecting points designated in a string. The model may be closed, or left open.

  Example:

  ```
  const c = new makerjs.models.ConnectTheDots(false, '-10 0 10 0 0 20'); // 3 coordinates to form a polyline
  Copy
  ```

  #### Parameters

  + isClosed: boolean

    Flag to specify if last point should connect to the first point.
  + numericList: string

    String containing a list of numbers which can be delimited by spaces, commas, or anything non-numeric (Note: [exponential notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential) is allowed).

  #### Returns ConnectTheDots

  + Defined in [models/ConnectTheDots.ts:56](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/ConnectTheDots.ts#L56)
* new ConnectTheDots(coords: number[]): ConnectTheDots

  Create a model by connecting points designated in a numeric array. The model will be 'closed' - i.e. the last point will connect to the first point.

  Example:

  ```
  const c = new makerjs.models.ConnectTheDots([-10, 0, 10, 0, 0, 20]); // 3 coordinates to form a triangle
  Copy
  ```

  #### Parameters

  + coords: number[]

    Array of coordinates.

  #### Returns ConnectTheDots

  + Defined in [models/ConnectTheDots.ts:68](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/ConnectTheDots.ts#L68)
* new ConnectTheDots(isClosed: boolean, coords: number[]): ConnectTheDots

  Create a model by connecting points designated in a numeric array. The model may be closed, or left open.

  Example:

  ```
  const c = new makerjs.models.ConnectTheDots(false, [-10, 0, 10, 0, 0, 20]); // 3 coordinates to form a polyline
  Copy
  ```

  #### Parameters

  + isClosed: boolean

    Flag to specify if last point should connect to the first point.
  + coords: number[]

    Array of coordinates.

  #### Returns ConnectTheDots

  + Defined in [models/ConnectTheDots.ts:81](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/ConnectTheDots.ts#L81)
* new ConnectTheDots(isClosed: boolean, points: [IPoint](../interfaces/core_schema.IPoint.md)[]): ConnectTheDots

  Create a model by connecting points designated in an array of points. The model may be closed, or left open.

  Example:

  ```
  const c = new makerjs.models.ConnectTheDots(false, [[-10, 0], [10, 0], [0, 20]]); // 3 coordinates left open
  Copy
  ```

  #### Parameters

  + isClosed: boolean

    Flag to specify if last point should connect to the first point.
  + points: [IPoint](../interfaces/core_schema.IPoint.md)[]

    Array of IPoints.

  #### Returns ConnectTheDots

  + Defined in [models/ConnectTheDots.ts:94](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/ConnectTheDots.ts#L94)

## Properties

### paths

paths: [IPathMap](../interfaces/core_schema.IPathMap.md) = {}

Optional map of path objects in this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[paths](../interfaces/core_schema.IModel.md#paths)

* Defined in [models/ConnectTheDots.ts:31](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/ConnectTheDots.ts#L31)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[paths](#paths)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
