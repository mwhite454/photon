---
title: DeletedPathInfo | Photon
source: docs/docs/api/interfaces/core_boolean-utils.DeletedPathInfo.html
---

DeletedPathInfo | Photon

[Photon](../index.md)




Preparing search index...

* [core/boolean-utils](../modules/core_boolean-utils.md)
* DeletedPathInfo

# Interface DeletedPathInfo

A line, curved line or other simple two dimensional shape.

interface DeletedPathInfo {
    [layer](#layer)?: string;
    [origin](#origin): [IPoint](core_schema.IPoint.md);
    [reason](#reason): string;
    [routeKey](#routekey): string;
    [type](#type): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/boolean-utils.DeletedPathInfo))

* [IPath](core_schema.IPath.md)
  + DeletedPathInfo

* Defined in [core/boolean-utils.ts:91](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/boolean-utils.ts#L91)

##### Index

### Properties

[layer?](#layer)
[origin](#origin)
[reason](#reason)
[routeKey](#routekey)
[type](#type)

## Properties

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

### reason

reason: string

* Defined in [core/boolean-utils.ts:92](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/boolean-utils.ts#L92)

### routeKey

routeKey: string

* Defined in [core/boolean-utils.ts:93](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/boolean-utils.ts#L93)

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

[layer](#layer)[origin](#origin)[reason](#reason)[routeKey](#routekey)[type](#type)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
