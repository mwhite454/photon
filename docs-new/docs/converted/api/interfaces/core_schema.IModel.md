---
title: IModel | Photon
source: docs/docs/api/interfaces/core_schema.IModel.html
---

IModel | Photon

[Photon](../index.md)




Preparing search index...

* [core/schema](../modules/core_schema.md)
* IModel

# Interface IModel

A model is a composite object which may contain a map of paths, or a map of models recursively.

interface IModel {
    [caption](#caption)?: [ICaption](core_schema.ICaption.md);
    [exporterOptions](#exporteroptions)?: { [exporterName: string]: any };
    [layer](#layer)?: string;
    [models](#models)?: [IModelMap](core_schema.IModelMap.md);
    [notes](#notes)?: string;
    [origin](#origin)?: [IPoint](core_schema.IPoint.md);
    [paths](#paths)?: [IPathMap](core_schema.IPathMap.md);
    [type](#type)?: string;
    [units](#units)?: string;
}

#### Hierarchy ([View Summary](../hierarchy.md#core/schema.IModel))

* IModel
  + [IBoundingHex](core_maker.IBoundingHex.md)

#### Implemented by

* [Belt](../classes/models_Belt.Belt.md)
* [BezierCurve](../classes/models_BezierCurve-esm.BezierCurve.md)
* [BoltCircle](../classes/models_BoltCircle.BoltCircle.md)
* [BoltRectangle](../classes/models_BoltRectangle.BoltRectangle.md)
* [ConnectTheDots](../classes/models_ConnectTheDots.ConnectTheDots.md)
* [Dogbone](../classes/models_Dogbone.Dogbone.md)
* [Dome](../classes/models_Dome.Dome.md)
* [Ellipse](../classes/models_Ellipse.Ellipse.md)
* [EllipticArc](../classes/models_Ellipse.EllipticArc.md)
* [Holes](../classes/models_Holes.Holes.md)
* [Oval](../classes/models_Oval.Oval.md)
* [OvalArc](../classes/models_OvalArc.OvalArc.md)
* [Polygon](../classes/models_Polygon.Polygon.md)
* [Rectangle](../classes/models_Rectangle.Rectangle.md)
* [Ring](../classes/models_Ring.Ring.md)
* [RoundRectangle](../classes/models_RoundRectangle.RoundRectangle.md)
* [SCurve](../classes/models_SCurve.SCurve.md)
* [Slot](../classes/models_Slot.Slot.md)
* [Square](../classes/models_Square.Square.md)
* [Star](../classes/models_Star.Star.md)
* [Text](../classes/models_Text.Text.md)

* Defined in [core/schema.ts:91](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L91)

##### Index

### Properties

[caption?](#caption)
[exporterOptions?](#exporteroptions)
[layer?](#layer)
[models?](#models)
[notes?](#notes)
[origin?](#origin)
[paths?](#paths)
[type?](#type)
[units?](#units)

## Properties

### `Optional`caption

caption?: [ICaption](core_schema.ICaption.md)

Optional Caption object.

* Defined in [core/schema.ts:107](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L107)

### `Optional`exporterOptions

exporterOptions?: { [exporterName: string]: any }

Optional exporter options for this model.

* Defined in [core/schema.ts:109](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L109)

### `Optional`layer

layer?: string

Optional layer of this model.

* Defined in [core/schema.ts:105](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L105)

### `Optional`models

models?: [IModelMap](core_schema.IModelMap.md)

Optional map of models within this model.

* Defined in [core/schema.ts:99](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L99)

### `Optional`notes

notes?: string

An author may wish to add notes to this model instance.

* Defined in [core/schema.ts:103](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L103)

### `Optional`origin

origin?: [IPoint](core_schema.IPoint.md)

Optional origin location of this model.

* Defined in [core/schema.ts:93](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L93)

### `Optional`paths

paths?: [IPathMap](core_schema.IPathMap.md)

Optional map of path objects in this model.

* Defined in [core/schema.ts:97](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L97)

### `Optional`type

type?: string

A model may want to specify its type, but this value is not employed yet.

* Defined in [core/schema.ts:95](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L95)

### `Optional`units

units?: string

Optional unit system of this model. See UnitType for possible values.

* Defined in [core/schema.ts:101](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L101)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[caption](#caption)[exporterOptions](#exporteroptions)[layer](#layer)[models](#models)[notes](#notes)[origin](#origin)[paths](#paths)[type](#type)[units](#units)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
