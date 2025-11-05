---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
  - api-reference
  - collector
  - photon
primary_topic: collector-|-photon
source: docs/docs/api/classes/core_collect.Collector.html
tags:
  - intermediate
  - api-reference
  - collector-|-photon
title: Collector | Photon
---

Collector | Photon

[Photon](../index.md)

Preparing search index...

- [core/collect](../modules/core_collect.md)
- Collector

# Class Collector<K, T>

Collects items that share a common key.

#### Type Parameters

- K
- T

- Defined in [core/collect.ts:22](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L22)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[collections](#collections)

### Methods

[addItemToCollection](#additemtocollection)
[findCollection](#findcollection)
[getCollectionsOfMultiple](#getcollectionsofmultiple)
[removeCollection](#removecollection)
[removeItemFromCollection](#removeitemfromcollection)

## Constructors

### constructor

- new Collector<K, T>(comparer?: [ICollectionKeyComparer](../interfaces/core_collect.ICollectionKeyComparer.md)<K>): Collector<K, T>

<a id="constructorcollectork"></a>
<a id="constructorcollectort"></a>
#### Type Parameters

- K
- T

#### Parameters

- `Optional`comparer: [ICollectionKeyComparer](../interfaces/core_collect.ICollectionKeyComparer.md)<K>

#### Returns Collector<K, T>

- Defined in [core/collect.ts:25](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L25)

## Properties

### collections

collections: [ICollection](../interfaces/core_collect.ICollection.md)<K, T>[] = []

- Defined in [core/collect.ts:23](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L23)

## Methods

### addItemToCollection

- addItemToCollection(key: K, item: T): void

  #### Parameters

  - key: K
  - item: T

  #### Returns void

  - Defined in [core/collect.ts:28](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L28)

### findCollection

- findCollection(key: K, action?: (index: number) => void): T[]

  #### Parameters

  - key: K
  - `Optional`action: (index: number) => void

  #### Returns T[]

  - Defined in [core/collect.ts:38](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L38)

### getCollectionsOfMultiple

- getCollectionsOfMultiple(cb: (key: K, items: T[]) => void): void

  #### Parameters

  - cb: (key: K, items: T[]) => void

  #### Returns void

  - Defined in [core/collect.ts:77](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L77)

### removeCollection

- removeCollection(key: K): boolean

  #### Parameters

  - key: K

  #### Returns boolean

  - Defined in [core/collect.ts:53](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L53)

### removeItemFromCollection

- removeItemFromCollection(key: K, item: T): boolean

  #### Parameters

  - key: K
  - item: T

  #### Returns boolean

  - Defined in [core/collect.ts:62](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/collect.ts#L62)

---

_Generated using [TypeDoc](https://typedoc.org/)_
