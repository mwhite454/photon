---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- iwalkpath
- photon
primary_topic: paths
related:
- Path Independence
- Models
- Path Constructors
source: docs/docs/api/interfaces/core_core.IWalkPath.html
tags:
- paths
- api-reference
- intermediate
title: IWalkPath | Photon
---
IWalkPath | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IWalkPath

# Interface IWalkPath

A path reference in a walk.

interface IWalkPath {
    [layer](#layer): string;
    [modelContext](#modelcontext): [IModel](core_schema.IModel.md);
    [offset](#offset): [IPoint](core_schema.IPoint.md);
    [pathContext](#pathcontext): [IPath](core_schema.IPath.md);
    [pathId](#pathid): string;
    [route](#route): string[];
    [routeKey](#routekey): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IWalkPath))

* [IRefPathIdInModel](core_maker.IRefPathIdInModel.md)
* [IRouteOffset](core_maker.IRouteOffset.md)
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

Inherited from [IRouteOffset](core_maker.IRouteOffset.md).[layer](core_maker.IRouteOffset.md#layer)

* Defined in [core/maker.ts:395](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L395)

### modelContext

modelContext: [IModel](core_schema.IModel.md)

Inherited from [IRefPathIdInModel](core_maker.IRefPathIdInModel.md).[modelContext](core_maker.IRefPathIdInModel.md#modelcontext)

* Defined in [core/maker.ts:387](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L387)

### offset

offset: [IPoint](core_schema.IPoint.md)

Inherited from [IRouteOffset](core_maker.IRouteOffset.md).[offset](core_maker.IRouteOffset.md#offset)

* Defined in [core/maker.ts:396](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L396)

### pathContext

pathContext: [IPath](core_schema.IPath.md)

* Defined in [core/maker.ts:405](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L405)

### pathId

pathId: string

Inherited from [IRefPathIdInModel](core_maker.IRefPathIdInModel.md).[pathId](core_maker.IRefPathIdInModel.md#pathid)

* Defined in [core/maker.ts:388](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L388)

### route

route: string[]

Inherited from [IRouteOffset](core_maker.IRouteOffset.md).[route](core_maker.IRouteOffset.md#route)

* Defined in [core/maker.ts:397](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L397)

### routeKey

routeKey: string

Inherited from [IRouteOffset](core_maker.IRouteOffset.md).[routeKey](core_maker.IRouteOffset.md#routekey)

* Defined in [core/maker.ts:398](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L398)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[layer](#layer)[modelContext](#modelcontext)[offset](#offset)[pathContext](#pathcontext)[pathId](#pathid)[route](#route)[routeKey](#routekey)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Path Independence](../index.md)
- [Models](../index.md)
- [Path Constructors](../index.md)
