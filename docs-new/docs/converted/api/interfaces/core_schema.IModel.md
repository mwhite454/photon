---
title: IModel | Photon
source: docs/docs/api/interfaces/core_schema.IModel.html
---

IModel | Photon

[Photon](../index.html)




Preparing search index...

* [core/schema](../modules/core_schema.html)
* IModel

# Interface IModel

A model is a composite object which may contain a map of paths, or a map of models recursively.

interface IModel {
    [caption](#caption)?: [ICaption](core_schema.ICaption.html);
    [exporterOptions](#exporteroptions)?: { [exporterName: string]: any };
    [layer](#layer)?: string;
    [models](#models)?: [IModelMap](core_schema.IModelMap.html);
    [notes](#notes)?: string;
    [origin](#origin)?: [IPoint](core_schema.IPoint.html);
    [paths](#paths)?: [IPathMap](core_schema.IPathMap.html);
    [type](#type)?: string;
    [units](#units)?: string;
}

#### Hierarchy ([View Summary](../hierarchy.html#core/schema.IModel))

* IModel
  + [IBoundingHex](core_maker.IBoundingHex.html)

#### Implemented by

* [Belt](../classes/models_Belt.Belt.html)
* [BezierCurve](../classes/models_BezierCurve-esm.BezierCurve.html)
* [BoltCircle](../classes/models_BoltCircle.BoltCircle.html)
* [BoltRectangle](../classes/models_BoltRectangle.BoltRectangle.html)
* [ConnectTheDots](../classes/models_ConnectTheDots.ConnectTheDots.html)
* [Dogbone](../classes/models_Dogbone.Dogbone.html)
* [Dome](../classes/models_Dome.Dome.html)
* [Ellipse](../classes/models_Ellipse.Ellipse.html)
* [EllipticArc](../classes/models_Ellipse.EllipticArc.html)
* [Holes](../classes/models_Holes.Holes.html)
* [Oval](../classes/models_Oval.Oval.html)
* [OvalArc](../classes/models_OvalArc.OvalArc.html)
* [Polygon](../classes/models_Polygon.Polygon.html)
* [Rectangle](../classes/models_Rectangle.Rectangle.html)
* [Ring](../classes/models_Ring.Ring.html)
* [RoundRectangle](../classes/models_RoundRectangle.RoundRectangle.html)
* [SCurve](../classes/models_SCurve.SCurve.html)
* [Slot](../classes/models_Slot.Slot.html)
* [Square](../classes/models_Square.Square.html)
* [Star](../classes/models_Star.Star.html)
* [Text](../classes/models_Text.Text.html)

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

caption?: [ICaption](core_schema.ICaption.html)

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

models?: [IModelMap](core_schema.IModelMap.html)

Optional map of models within this model.

* Defined in [core/schema.ts:99](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L99)

### `Optional`notes

notes?: string

An author may wish to add notes to this model instance.

* Defined in [core/schema.ts:103](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L103)

### `Optional`origin

origin?: [IPoint](core_schema.IPoint.html)

Optional origin location of this model.

* Defined in [core/schema.ts:93](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/schema.ts#L93)

### `Optional`paths

paths?: [IPathMap](core_schema.IPathMap.html)

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
