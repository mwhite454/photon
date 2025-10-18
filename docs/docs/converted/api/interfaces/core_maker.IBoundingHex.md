---
ai_summary: IBoundingHex | Photon
category: API Reference
description: IBoundingHex | Photon
difficulty: intermediate
keywords:
- api-reference
- export
- iboundinghex
- models
- paths
- photon
primary_topic: iboundinghex-|-photon
source: docs/docs/api/interfaces/core_core.IBoundingHex.html
tags:
- iboundinghex-|-photon
- api-reference
- intermediate
title: IBoundingHex | Photon
---
IBoundingHex | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IBoundingHex

# Interface IBoundingHex

A hexagon which surrounds a model.

interface IBoundingHex {
    [caption](#optionalcaption)?: [ICaption](core_schema.ICaption.md);
    [exporterOptions](#optionalexporteroptions)?: { [exporterName: string]: any };
    [layer](#optionallayer)?: string;
    [models](#optionalmodels)?: [IModelMap](core_schema.IModelMap.md);
    [notes](#optionalnotes)?: string;
    [origin](#optionalorigin)?: [IPoint](core_schema.IPoint.md);
    [paths](#optionalpaths)?: [IPathMap](core_schema.IPathMap.md);
    [radius](#radius): number;
    [type](#optionaltype)?: string;
    [units](#optionalunits)?: string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IBoundingHex))

* [IModel](core_schema.IModel.md)
  + IBoundingHex

* Defined in [core/maker.ts:588](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L588)

##### Index

### Properties

[caption?](#optionalcaption)
[exporterOptions?](#optionalexporteroptions)
[layer?](#optionallayer)
[models?](#optionalmodels)
[notes?](#optionalnotes)
[origin?](#optionalorigin)
[paths?](#optionalpaths)
[radius](#radius)
[type?](#optionaltype)
[units?](#optionalunits)

## Properties

### `Optional`caption

caption?: [ICaption](core_schema.ICaption.md)

Optional Caption object.

Inherited from [IModel](core_schema.IModel.md).[caption](core_schema.IModel.md#optionalcaption)

* Defined in [core/schema.ts:107](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L107)

### `Optional`exporterOptions

exporterOptions?: { [exporterName: string]: any }

Optional exporter options for this model.

Inherited from [IModel](core_schema.IModel.md).[exporterOptions](core_schema.IModel.md#optionalexporteroptions)

* Defined in [core/schema.ts:109](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L109)

### `Optional`layer

layer?: string

Optional layer of this model.

Inherited from [IModel](core_schema.IModel.md).[layer](core_schema.IModel.md#optionallayer)

* Defined in [core/schema.ts:105](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L105)

### `Optional`models

models?: [IModelMap](core_schema.IModelMap.md)

Optional map of models within this model.

Inherited from [IModel](core_schema.IModel.md).[models](core_schema.IModel.md#optionalmodels)

* Defined in [core/schema.ts:99](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L99)

### `Optional`notes

notes?: string

An author may wish to add notes to this model instance.

Inherited from [IModel](core_schema.IModel.md).[notes](core_schema.IModel.md#optionalnotes)

* Defined in [core/schema.ts:103](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L103)

### `Optional`origin

origin?: [IPoint](core_schema.IPoint.md)

Optional origin location of this model.

Inherited from [IModel](core_schema.IModel.md).[origin](core_schema.IModel.md#optionalorigin)

* Defined in [core/schema.ts:93](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L93)

### `Optional`paths

paths?: [IPathMap](core_schema.IPathMap.md)

Optional map of path objects in this model.

Inherited from [IModel](core_schema.IModel.md).[paths](core_schema.IModel.md#optionalpaths)

* Defined in [core/schema.ts:97](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L97)

### radius

radius: number

Radius of the hexagon, which is also the length of a side.

* Defined in [core/maker.ts:593](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L593)

### `Optional`type

type?: string

A model may want to specify its type, but this value is not employed yet.

Inherited from [IModel](core_schema.IModel.md).[type](core_schema.IModel.md#optionaltype)

* Defined in [core/schema.ts:95](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L95)

### `Optional`units

units?: string

Optional unit system of this model. See UnitType for possible values.

Inherited from [IModel](core_schema.IModel.md).[units](core_schema.IModel.md#optionalunits)

* Defined in [core/schema.ts:101](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L101)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

* **Properties**
  * [caption](#optionalcaption)
  * [exporterOptions](#optionalexporteroptions)
  * [layer](#optionallayer)
  * [models](#optionalmodels)
  * [notes](#optionalnotes)
  * [origin](#optionalorigin)
  * [paths](#optionalpaths)
  * [radius](#radius)
  * [type](#optionaltype)
  * [units](#optionalunits)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
