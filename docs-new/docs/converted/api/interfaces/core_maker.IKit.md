---
title: IKit | Photon
source: docs/docs/api/interfaces/core_maker.IKit.html
---

IKit | Photon

[Photon](../index.html)




Preparing search index...

* [core/maker](../modules/core_maker.html)
* IKit

# Interface IKit

An IKit is a model-producing class with some sample parameters. Think of it as a packaged model with instructions on how to best use it.

interface IKit {
    new [IKit](#constructorikit)(...args: any[]): [IModel](core_schema.IModel.html);
    [metaParameters](#metaparameters)?: [IMetaParameter](core_maker.IMetaParameter.html)[];
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

* new IKit(...args: any[]): [IModel](core_schema.IModel.html)

  The constructor. The kit must be "new-able" and it must produce an IModel.
  It can have any number of any type of parameters.

  #### Parameters

  + ...args: any[]

  #### Returns [IModel](core_schema.IModel.html)

  + Defined in [core/maker.ts:643](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/maker.ts#L643)

## Properties

### `Optional`metaParameters

metaParameters?: [IMetaParameter](core_maker.IMetaParameter.html)[]

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

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
