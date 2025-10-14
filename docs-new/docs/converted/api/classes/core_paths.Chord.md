---
title: Chord | Photon
source: docs/docs/api/classes/core_paths.Chord.html
---

Chord | Photon

[Photon](../index.html)




Preparing search index...

* [core/paths](../modules/core_paths.html)
* Chord

# Class Chord

Class for chord, which is simply a line path that connects the endpoints of an arc.

#### Param: arc

Arc to use as the basic for the chord.

#### Implements

* [IPathLine](../interfaces/core_schema.IPathLine.html)

* Defined in [core/paths.ts:351](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L351)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[end](#end)
[origin](#origin)
[type](#type)

## Constructors

### constructor

* new Chord(arc: [IPathArc](../interfaces/core_schema.IPathArc.html)): Chord

  #### Parameters

  + arc: [IPathArc](../interfaces/core_schema.IPathArc.html)

  #### Returns Chord

  + Defined in [core/paths.ts:356](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L356)

## Properties

### end

end: [IPoint](../interfaces/core_schema.IPoint.html)

The end point defining the line. The start point is the origin.

Implementation of [IPathLine](../interfaces/core_schema.IPathLine.html).[end](../interfaces/core_schema.IPathLine.html#end)

* Defined in [core/paths.ts:354](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L354)

### origin

origin: [IPoint](../interfaces/core_schema.IPoint.html)

The main point of reference for this path.

Implementation of [IPathLine](../interfaces/core_schema.IPathLine.html).[origin](../interfaces/core_schema.IPathLine.html#origin)

* Defined in [core/paths.ts:353](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L353)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Implementation of [IPathLine](../interfaces/core_schema.IPathLine.html).[type](../interfaces/core_schema.IPathLine.html#type)

* Defined in [core/paths.ts:352](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/paths.ts#L352)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
