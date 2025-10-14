---
title: IKit | Photon
source: docs/docs/api/interfaces/core_maker.IKit.html
---

IKit | Photon

[Photon](../index.md)




Preparing search index...

* [core/maker](../modules/core_maker.md)
* IKit

# Interface IKit

An IKit is a model-producing class with some sample parameters. Think of it as a packaged model with instructions on how to best use it.

interface IKit {
    new [IKit](#constructorikit)(...args: any[]): [IModel](core_schema.IModel.md);
    [metaParameters](#metaparameters)?: [IMetaParameter](core_maker.IMetaParameter.md)[];
    [notes](#notes)?: string;
}

* Defined in [core/maker.ts:637](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L637)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[metaParameters?](#metaparameters)
[notes?](#notes)

## Constructors

### constructor

* new IKit(...args: any[]): [IModel](core_schema.IModel.md)

  The constructor. The kit must be "new-able" and it must produce an IModel.
  It can have any number of any type of parameters.

  #### Parameters

  + ...args: any[]

  #### Returns [IModel](core_schema.IModel.md)

  + Defined in [core/maker.ts:643](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L643)

## Properties

### `Optional`metaParameters

metaParameters?: [IMetaParameter](core_maker.IMetaParameter.md)[]

Attached to the constructor is a property named metaParameters which is an array of IMetaParameter objects.
Each element of the array corresponds to a parameter of the constructor, in order.

* Defined in [core/maker.ts:649](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L649)

### `Optional`notes

notes?: string

Information about this kit, in plain text or markdown format.

* Defined in [core/maker.ts:654](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L654)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[metaParameters](#metaparameters)[notes](#notes)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
