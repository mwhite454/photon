---
title: IWalkModel | Photon
source: docs/docs/api/interfaces/core_maker.IWalkModel.html
---

IWalkModel | Photon

[Photon](../index.html)




Preparing search index...

* [core/maker](../modules/core_maker.html)
* IWalkModel

# Interface IWalkModel

A model reference in a walk.

interface IWalkModel {
    [childId](#childid): string;
    [childModel](#childmodel): [IModel](core_schema.IModel.html);
    [layer](#layer): string;
    [offset](#offset): [IPoint](core_schema.IPoint.html);
    [parentModel](#parentmodel): [IModel](core_schema.IModel.html);
    [route](#route): string[];
    [routeKey](#routekey): string;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/maker.IWalkModel))

* [IRefModelInModel](core_maker.IRefModelInModel.html)
* [IRouteOffset](core_maker.IRouteOffset.html)
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

Inherited from [IRefModelInModel](core_maker.IRefModelInModel.html).[childId](core_maker.IRefModelInModel.html#childid)

* Defined in [core/maker.ts:540](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L540)

### childModel

childModel: [IModel](core_schema.IModel.html)

Inherited from [IRefModelInModel](core_maker.IRefModelInModel.html).[childModel](core_maker.IRefModelInModel.html#childmodel)

* Defined in [core/maker.ts:541](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L541)

### layer

layer: string

Inherited from [IRouteOffset](core_maker.IRouteOffset.html).[layer](core_maker.IRouteOffset.html#layer)

* Defined in [core/maker.ts:395](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L395)

### offset

offset: [IPoint](core_schema.IPoint.html)

Inherited from [IRouteOffset](core_maker.IRouteOffset.html).[offset](core_maker.IRouteOffset.html#offset)

* Defined in [core/maker.ts:396](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L396)

### parentModel

parentModel: [IModel](core_schema.IModel.html)

Inherited from [IRefModelInModel](core_maker.IRefModelInModel.html).[parentModel](core_maker.IRefModelInModel.html#parentmodel)

* Defined in [core/maker.ts:539](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L539)

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

[childId](#childid)[childModel](#childmodel)[layer](#layer)[offset](#offset)[parentModel](#parentmodel)[route](#route)[routeKey](#routekey)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
