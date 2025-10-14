---
title: CAG | Photon
source: docs/docs/api/classes/types_jscad.export_.CAG.html
---

CAG | Photon

[Photon](../index.html)




Preparing search index...

* [types/jscad](../modules/types_jscad.html)
* [export=](../modules/types_jscad.export_.html)
* CAG

# Class CAG

CAG (2D Constructive Area Geometry) class

* Defined in [types/jscad.d.ts:11](https://github.com/mwhite454/photon/blob/main/packages/photon/src/types/jscad.d.ts#L11)

##### Index

### Constructors

[constructor](#constructor)

### Methods

[extrude](#extrude)
[subtract](#subtract)
[union](#union)
[fromPoints](#frompoints)

## Constructors

### constructor

* new CAG(): CAG

  #### Returns CAG

## Methods

### extrude

* extrude(options: { offset: number[] }): [export=](../modules/types_jscad.export_.html).[CSG](types_jscad.export_.CSG.html)

  Extrude this 2D CAG into a 3D CSG

  #### Parameters

  + options: { offset: number[] }

  #### Returns [export=](../modules/types_jscad.export_.html).[CSG](types_jscad.export_.CSG.html)

  + Defined in [types/jscad.d.ts:30](https://github.com/mwhite454/photon/blob/main/packages/photon/src/types/jscad.d.ts#L30)

### subtract

* subtract(other: CAG): CAG

  Subtract another CAG from this one

  #### Parameters

  + other: CAG

  #### Returns CAG

  + Defined in [types/jscad.d.ts:25](https://github.com/mwhite454/photon/blob/main/packages/photon/src/types/jscad.d.ts#L25)

### union

* union(other: CAG): CAG

  Union this CAG with another

  #### Parameters

  + other: CAG

  #### Returns CAG

  + Defined in [types/jscad.d.ts:20](https://github.com/mwhite454/photon/blob/main/packages/photon/src/types/jscad.d.ts#L20)

### `Static`fromPoints

* fromPoints(points: number[][]): CAG

  Create a CAG from an array of points

  #### Parameters

  + points: number[][]

  #### Returns CAG

  + Defined in [types/jscad.d.ts:15](https://github.com/mwhite454/photon/blob/main/packages/photon/src/types/jscad.d.ts#L15)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Methods

[extrude](#extrude)[subtract](#subtract)[union](#union)[fromPoints](#frompoints)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
