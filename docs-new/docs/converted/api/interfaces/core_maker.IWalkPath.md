---
title: IWalkPath | Photon
source: docs/docs/api/interfaces/core_maker.IWalkPath.html
---

IWalkPath | Photon

[Photon](../index.html)




Preparing search index...

* [core/maker](../modules/core_maker.html)
* IWalkPath

# Interface IWalkPath

A path reference in a walk.

interface IWalkPath {
    [layer](#layer): string;
    [modelContext](#modelcontext): [IModel](core_schema.IModel.html);
    [offset](#offset): [IPoint](core_schema.IPoint.html);
    [pathContext](#pathcontext): [IPath](core_schema.IPath.html);
    [pathId](#pathid): string;
    [route](#route): string[];
    [routeKey](#routekey): string;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/maker.IWalkPath))

* [IRefPathIdInModel](core_maker.IRefPathIdInModel.html)
* [IRouteOffset](core_maker.IRouteOffset.html)
  + IWalkPath

* Defined in [core/maker.ts:404](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L404)

##### Index

### Properties

[layer](#layer)
[modelContext](#modelcontext)
[offset](#offset)
[pathContext](#pathcontext)
[pathId](#pathid)
[route](#route)
[routeKey](#routekey)

## Properties

### layer

layer: string

Inherited from [IRouteOffset](core_maker.IRouteOffset.html).[layer](core_maker.IRouteOffset.html#layer)

* Defined in [core/maker.ts:395](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L395)

### modelContext

modelContext: [IModel](core_schema.IModel.html)

Inherited from [IRefPathIdInModel](core_maker.IRefPathIdInModel.html).[modelContext](core_maker.IRefPathIdInModel.html#modelcontext)

* Defined in [core/maker.ts:387](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L387)

### offset

offset: [IPoint](core_schema.IPoint.html)

Inherited from [IRouteOffset](core_maker.IRouteOffset.html).[offset](core_maker.IRouteOffset.html#offset)

* Defined in [core/maker.ts:396](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L396)

### pathContext

pathContext: [IPath](core_schema.IPath.html)

* Defined in [core/maker.ts:405](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L405)

### pathId

pathId: string

Inherited from [IRefPathIdInModel](core_maker.IRefPathIdInModel.html).[pathId](core_maker.IRefPathIdInModel.html#pathid)

* Defined in [core/maker.ts:388](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L388)

### route

route: string[]

Inherited from [IRouteOffset](core_maker.IRouteOffset.html).[route](core_maker.IRouteOffset.html#route)

* Defined in [core/maker.ts:397](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L397)

### routeKey

routeKey: string

Inherited from [IRouteOffset](core_maker.IRouteOffset.html).[routeKey](core_maker.IRouteOffset.html#routekey)

* Defined in [core/maker.ts:398](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L398)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[layer](#layer)[modelContext](#modelcontext)[offset](#offset)[pathContext](#pathcontext)[pathId](#pathid)[route](#route)[routeKey](#routekey)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
