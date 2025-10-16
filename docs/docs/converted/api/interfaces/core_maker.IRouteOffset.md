---
ai_summary: IRouteOffset | Photon
category: API Reference
description: IRouteOffset | Photon
difficulty: intermediate
keywords:
- api-reference
- irouteoffset
- photon
primary_topic: routes
source: docs/docs/api/interfaces/core_core.IRouteOffset.html
tags:
- intermediate
- api-reference
- routes
title: IRouteOffset | Photon
---
IRouteOffset | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IRouteOffset

# Interface IRouteOffset

A route to either a path or a model, and the absolute offset of it.

interface IRouteOffset {
    [layer](#layer): string;
    [offset](#offset): [IPoint](core_schema.IPoint.md);
    [route](#route): string[];
    [routeKey](#routekey): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IRouteOffset))

* IRouteOffset
  + [IWalkPath](core_maker.IWalkPath.md)
  + [IWalkModel](core_maker.IWalkModel.md)

* Defined in [core/maker.ts:394](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L394)

##### Index

### Properties

[layer](#layer)
[offset](#offset)
[route](#route)
[routeKey](#routekey)

## Properties

### layer

layer: string

* Defined in [core/maker.ts:395](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L395)

### offset

offset: [IPoint](core_schema.IPoint.md)

* Defined in [core/maker.ts:396](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L396)

### route

route: string[]

* Defined in [core/maker.ts:397](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L397)

### routeKey

routeKey: string

* Defined in [core/maker.ts:398](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L398)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[layer](#layer)[offset](#offset)[route](#route)[routeKey](#routekey)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
