---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- parallel
- paths
- photon
primary_topic: parallel-|-photon
source: docs/docs/api/classes/core_paths.Parallel.html
tags:
- intermediate
- api-reference
- parallel-|-photon
title: Parallel | Photon
---
Parallel | Photon

[Photon](../index.md)




Preparing search index...

* [core/paths](../modules/core_paths.md)
* Parallel

# Class Parallel

Class for a parallel line path.

#### Param: toLine

A line to be parallel to.

#### Param: distance

Distance between parallel and original line.

#### Param: nearPoint

Any point to determine which side of the line to place the parallel.

#### Implements

* [IPathLine](../interfaces/core_schema.IPathLine.md)

* Defined in [core/paths.ts:372](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L372)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[end](#end)
[origin](#origin)
[type](#type)

## Constructors

### constructor

* new Parallel(toLine: [IPathLine](../interfaces/core_schema.IPathLine.md), distance: number, nearPoint: [IPoint](../interfaces/core_schema.IPoint.md)): Parallel

  #### Parameters

  + toLine: [IPathLine](../interfaces/core_schema.IPathLine.md)
  + distance: number
  + nearPoint: [IPoint](../interfaces/core_schema.IPoint.md)

  #### Returns Parallel

  + Defined in [core/paths.ts:377](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L377)

## Properties

### end

end: [IPoint](../interfaces/core_schema.IPoint.md)

The end point defining the line. The start point is the origin.

Implementation of [IPathLine](../interfaces/core_schema.IPathLine.md).[end](../interfaces/core_schema.IPathLine.md#end)

* Defined in [core/paths.ts:375](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L375)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.md)

The main point of reference for this path.

Implementation of [IPathLine](../interfaces/core_schema.IPathLine.md).[origin](../interfaces/core_schema.IPathLine.md#origin)

* Defined in [core/paths.ts:374](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L374)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Implementation of [IPathLine](../interfaces/core_schema.IPathLine.md).[type](../interfaces/core_schema.IPathLine.md#type)

* Defined in [core/paths.ts:373](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L373)

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
