---
title: PointGraph | Photon
source: docs/docs/api/classes/core_collect.PointGraph.html
---

PointGraph | Photon

[Photon](../index.html)




Preparing search index...

* [core/collect](../modules/core_collect.html)
* PointGraph

# Class PointGraph<T>

A graph of items which may be located on the same points.

#### Type Parameters

* T

* Defined in [core/collect.ts:126](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L126)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[graph](#graph)
[index](#index)
[insertedCount](#insertedcount)
[merged](#merged)
[values](#values)

### Methods

[forEachPoint](#foreachpoint)
[getElementAtPoint](#getelementatpoint)
[getIdOfPoint](#getidofpoint)
[insertValue](#insertvalue)
[insertValueIdAtPoint](#insertvalueidatpoint)
[mergeNearestSinglePoints](#mergenearestsinglepoints)
[mergePoints](#mergepoints)
[reset](#reset)

## Constructors

### constructor

* new PointGraph<[T](#constructorpointgrapht)>(): PointGraph<[T](#constructorpointgrapht)>

  #### Type Parameters

  + T

  #### Returns PointGraph<[T](#constructorpointgrapht)>

  + Defined in [core/collect.ts:158](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L158)

## Properties

### graph

graph: { [x: number]: { [y: number]: number } }

Map of unique points by x, then y, to a point id. This will remain intact even after merging.

* Defined in [core/collect.ts:136](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L136)

### index

index: { [pointId: number]: [IPointGraphIndexElement](../interfaces/core_collect.IPointGraphIndexElement.html) }

Index of points by id.

* Defined in [core/collect.ts:141](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L141)

### insertedCount

insertedCount: number

Number of points inserted

* Defined in [core/collect.ts:131](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L131)

### merged

merged: { [pointId: number]: number }

Map of point ids which once existed but have been merged into another id due to close proximity.

* Defined in [core/collect.ts:146](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L146)

### values

values: [T](#constructorpointgrapht)[]

List of values inserted at points.

* Defined in [core/collect.ts:151](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L151)

## Methods

### forEachPoint

* forEachPoint(
      cb: (
          p: [IPoint](../interfaces/core_schema.IPoint.html),
          values: [T](#constructorpointgrapht)[],
          pointId?: number,
          el?: [IPointGraphIndexElement](../interfaces/core_collect.IPointGraphIndexElement.html),
      ) => void,
  ): void

  Iterate over points in the index.

  #### Parameters

  + cb: (p: [IPoint](../interfaces/core_schema.IPoint.html), values: [T](#constructorpointgrapht)[], pointId?: number, el?: [IPointGraphIndexElement](../interfaces/core_collect.IPointGraphIndexElement.html)) => void

    Callback for each point in the index.

  #### Returns void

  + Defined in [core/collect.ts:302](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L302)

### getElementAtPoint

* getElementAtPoint(p: [IPoint](../interfaces/core_schema.IPoint.html)): [IPointGraphIndexElement](../interfaces/core_collect.IPointGraphIndexElement.html)

  Get the index element of a point, after merging.

  #### Parameters

  + p: [IPoint](../interfaces/core_schema.IPoint.html)

    Point to look up index element.

  #### Returns [IPointGraphIndexElement](../interfaces/core_collect.IPointGraphIndexElement.html)

  + Defined in [core/collect.ts:335](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L335)

### getIdOfPoint

* getIdOfPoint(p: [IPoint](../interfaces/core_schema.IPoint.html)): number

  Gets the id of a point, after merging.

  #### Parameters

  + p: [IPoint](../interfaces/core_schema.IPoint.html)

    Point to look up id.

  #### Returns number

  + Defined in [core/collect.ts:317](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L317)

### insertValue

* insertValue(value: [T](#constructorpointgrapht)): number

  Insert a value.

  #### Parameters

  + value: [T](#constructorpointgrapht)

    Value associated with this point.

  #### Returns number

  valueId of the inserted value.

  + Defined in [core/collect.ts:178](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L178)

### insertValueIdAtPoint

* insertValueIdAtPoint(
      valueId: number,
      p: [IPoint](../interfaces/core_schema.IPoint.html),
  ): { existed: boolean; pointId: number }

  Insert a value at a point.

  #### Parameters

  + valueId: number
  + p: [IPoint](../interfaces/core_schema.IPoint.html)

    Point.

  #### Returns { existed: boolean; pointId: number }

  + Defined in [core/collect.ts:188](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L188)

### mergeNearestSinglePoints

* mergeNearestSinglePoints(withinDistance: number): void

  Finds all points which have only one value associated. Then, merge to the nearest other point within this set.
  Call this after inserting values.

  #### Parameters

  + withinDistance: number

    Distance to consider points equal.

  #### Returns void

  + Defined in [core/collect.ts:252](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L252)

### mergePoints

* mergePoints(withinDistance: number): void

  Merge points within a given distance from each other. Call this after inserting values.

  #### Parameters

  + withinDistance: number

    Distance to consider points equal.

  #### Returns void

  + Defined in [core/collect.ts:220](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L220)

### reset

* reset(): void

  Reset the stored points, graphs, lists, to initial state.

  #### Returns void

  + Defined in [core/collect.ts:165](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L165)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[graph](#graph)[index](#index)[insertedCount](#insertedcount)[merged](#merged)[values](#values)

Methods

[forEachPoint](#foreachpoint)[getElementAtPoint](#getelementatpoint)[getIdOfPoint](#getidofpoint)[insertValue](#insertvalue)[insertValueIdAtPoint](#insertvalueidatpoint)[mergeNearestSinglePoints](#mergenearestsinglepoints)[mergePoints](#mergepoints)[reset](#reset)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
