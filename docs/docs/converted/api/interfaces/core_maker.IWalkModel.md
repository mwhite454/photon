---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- iwalkmodel
- photon
primary_topic: models
related:
- Modeling
- Paths
- Built-in Models
source: docs/docs/api/interfaces/core_core.IWalkModel.html
tags:
- intermediate
- api-reference
- models
title: IWalkModel | Photon
---
IWalkModel | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IWalkModel

# Interface IWalkModel

A model reference in a walk.

interface IWalkModel {
    [childId](#childid): string;
    [childModel](#childmodel): [IModel](core_schema.IModel.md);
    [layer](#layer): string;
    [offset](#offset): [IPoint](core_schema.IPoint.md);
    [parentModel](#parentmodel): [IModel](core_schema.IModel.md);
    [route](#route): string[];
    [routeKey](#routekey): string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IWalkModel))

* [IRefModelInModel](core_maker.IRefModelInModel.md)
* [IRouteOffset](core_maker.IRouteOffset.md)
  + IWalkModel

* Defined in [core/maker.ts:547](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L547)

##### Index

### Properties

[childId](#childid)
[childModel](#childmodel)
[layer](#layer)
[offset](#offset)
[parentModel](#parentmodel)
[route](#route)
[routeKey](#routekey)

## Properties

### childId

childId: string

Inherited from [IRefModelInModel](core_maker.IRefModelInModel.md).[childId](core_maker.IRefModelInModel.md#childid)

* Defined in [core/maker.ts:540](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L540)

### childModel

childModel: [IModel](core_schema.IModel.md)

Inherited from [IRefModelInModel](core_maker.IRefModelInModel.md).[childModel](core_maker.IRefModelInModel.md#childmodel)

* Defined in [core/maker.ts:541](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L541)

### layer

layer: string

Inherited from [IRouteOffset](core_maker.IRouteOffset.md).[layer](core_maker.IRouteOffset.md#layer)

* Defined in [core/maker.ts:395](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L395)

### offset

offset: [IPoint](core_schema.IPoint.md)

Inherited from [IRouteOffset](core_maker.IRouteOffset.md).[offset](core_maker.IRouteOffset.md#offset)

* Defined in [core/maker.ts:396](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L396)

### parentModel

parentModel: [IModel](core_schema.IModel.md)

Inherited from [IRefModelInModel](core_maker.IRefModelInModel.md).[parentModel](core_maker.IRefModelInModel.md#parentmodel)

* Defined in [core/maker.ts:539](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L539)

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

[childId](#childid)[childModel](#childmodel)[layer](#layer)[offset](#offset)[parentModel](#parentmodel)[route](#route)[routeKey](#routekey)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Modeling](../index.md)
- [Paths](../index.md)
- [Built-in Models](../index.md)
