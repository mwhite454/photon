---
ai_summary: IPathDirectional | Photon
category: API Reference
description: IPathDirectional | Photon
difficulty: intermediate
keywords:
- api-reference
- ipathdirectional
- photon
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/docs/api/interfaces/core_core.IPathDirectional.html
tags:
- paths
- api-reference
- intermediate
title: IPathDirectional | Photon
---
IPathDirectional | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_core.md)
* IPathDirectional

# Interface IPathDirectional

A path that may be indicated to "flow" in either direction between its endpoints.

interface IPathDirectional {
    [endPoints](#endpoints): [IPoint](core_schema.IPoint.md)[];
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.md);
    [reversed](#reversed)?: boolean;
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IPathDirectional))

* [IPath](core_schema.IPath.md)
  + IPathDirectional

* Defined in [core/maker.ts:354](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L354)

##### Index

### Properties

[endPoints](#endpoints)
[layer?](#layer)
[origin](#origin)
[reversed?](#reversed)
[type](#type)

## Properties

### endPoints

endPoints: [IPoint](core_schema.IPoint.md)[]

The endpoints of the path.

* Defined in [core/maker.ts:359](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L359)

### `Optional`layer

layer?: string

Optional layer of this path.

Inherited from [IPath](core_schema.IPath.md).[layer](core_schema.IPath.md#layer)

* Defined in [core/schema.ts:24](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L24)

### origin

origin: [IPoint](core_schema.IPoint.md)

The main point of reference for this path.

Inherited from [IPath](core_schema.IPath.md).[origin](core_schema.IPath.md#origin)

* Defined in [core/schema.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L22)

### `Optional`reversed

reversed?: boolean

Path flows forwards or reverse.

* Defined in [core/maker.ts:364](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L364)

### type

type: string

The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType.

Inherited from [IPath](core_schema.IPath.md).[type](core_schema.IPath.md#type)

* Defined in [core/schema.ts:20](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L20)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[endPoints](#endpoints)[layer](#layer)[origin](#origin)[reversed](#reversed)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
