---
ai_summary: IRefModelInModel | Photon
category: API Reference
description: IRefModelInModel | Photon
difficulty: intermediate
keywords:
- api-reference
- irefmodelinmodel
- photon
primary_topic: models
related:
- Modeling
- Paths
- Built-in Models
source: docs/docs/api/interfaces/core_core.IRefModelInModel.html
tags:
- intermediate
- api-reference
- models
title: IRefModelInModel | Photon
---
IRefModelInModel | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IRefModelInModel

# Interface IRefModelInModel

Reference to a model within a model.

interface IRefModelInModel {
    [childId](#childid): string;
    [childModel](#childmodel): [IModel](core_schema.IModel.md);
    [parentModel](#parentmodel): [IModel](core_schema.IModel.md);
}

#### Hierarchy ([View Summary](../hierarchy.md#core/maker.IRefModelInModel))

* IRefModelInModel
  + [IWalkModel](core_maker.IWalkModel.md)

* Defined in [core/maker.ts:538](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L538)

##### Index

### Properties

[childId](#childid)
[childModel](#childmodel)
[parentModel](#parentmodel)

## Properties

### childId

childId: string

* Defined in [core/maker.ts:540](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L540)

### childModel

childModel: [IModel](core_schema.IModel.md)

* Defined in [core/maker.ts:541](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L541)

### parentModel

parentModel: [IModel](core_schema.IModel.md)

* Defined in [core/maker.ts:539](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L539)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Properties

[childId](#childid)[childModel](#childmodel)[parentModel](#parentmodel)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Modeling](../index.md)
- [Paths](../index.md)
- [Built-in Models](../index.md)
