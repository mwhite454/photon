---
title: Line | Photon
source: docs/docs/api/classes/core_paths.Line.html
---

Line | Photon

[Photon](../index.md)




Preparing search index...

* [core/paths](../modules/core_paths.md)
* Line

# Class Line

Class for line path.

#### Implements

* [IPathLine](../interfaces/core_schema.IPathLine.md)

* Defined in [core/paths.ts:307](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L307)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[end](#end)
[origin](#origin)
[type](#type)

## Constructors

### constructor

* new Line(points: [IPoint](../interfaces/core_schema.IPoint.md)[]): Line

  Class for line path, constructed from array of 2 points.

  #### Parameters

  + points: [IPoint](../interfaces/core_schema.IPoint.md)[]

    Array of 2 points.

  #### Returns Line

  + Defined in [core/paths.ts:317](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L317)
* new Line(origin: [IPoint](../interfaces/core_schema.IPoint.md), end: [IPoint](../interfaces/core_schema.IPoint.md)): Line

  Class for line path, constructed from 2 points.

  #### Parameters

  + origin: [IPoint](../interfaces/core_schema.IPoint.md)

    The origin point of the line.
  + end: [IPoint](../interfaces/core_schema.IPoint.md)

    The end point of the line.

  #### Returns Line

  + Defined in [core/paths.ts:325](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L325)

## Properties

### end

end: [IPoint](../interfaces/core_schema.IPoint.md)

The end point defining the line. The start point is the origin.

Implementation of [IPathLine](../interfaces/core_schema.IPathLine.md).[end](../interfaces/core_schema.IPathLine.md#end)

* Defined in [core/paths.ts:310](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L310)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.md)

The main point of reference for this path.

Implementation of [IPathLine](../interfaces/core_schema.IPathLine.md).[origin](../interfaces/core_schema.IPathLine.md#origin)

* Defined in [core/paths.ts:309](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L309)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Implementation of [IPathLine](../interfaces/core_schema.IPathLine.md).[type](../interfaces/core_schema.IPathLine.md#type)

* Defined in [core/paths.ts:308](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L308)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[end](#end)[origin](#origin)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
