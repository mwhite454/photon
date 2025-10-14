---
title: IRouteOffset | Photon
source: docs/docs/api/interfaces/core_maker.IRouteOffset.html
---

IRouteOffset | Photon

[Photon](../index.html)




Preparing search index...

* [core/maker](../modules/core_maker.html)
* IRouteOffset

# Interface IRouteOffset

A route to either a path or a model, and the absolute offset of it.

interface IRouteOffset {
    [layer](#layer): string;
    [offset](#offset): [IPoint](core_schema.IPoint.html);
    [route](#route): string[];
    [routeKey](#routekey): string;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/maker.IRouteOffset))

* IRouteOffset
  + [IWalkPath](core_maker.IWalkPath.html)
  + [IWalkModel](core_maker.IWalkModel.html)

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

offset: [IPoint](core_schema.IPoint.html)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
