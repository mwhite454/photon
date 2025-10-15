---
ai_summary: childrenOnChain | Photon
category: Layout
description: childrenOnChain | Photon
difficulty: intermediate
keywords:
- cad
- childrenonchain
- layout
- photon
prerequisites:
- Intermediate Drawing
primary_topic: chains
related:
- Chain Theory
- Routes
- Breaking
- Intermediate Drawing
source: docs/docs/api/functions/core_layout.childrenOnChain.html
tags:
- intermediate
- layout
- chains
title: childrenOnChain | Photon
---
childrenOnChain | Photon

[Photon](../index.md)




Preparing search index...

* [core/layout](../modules/core_layout.md)
* childrenOnChain

# Function childrenOnChain

## Prerequisites

Before working with this feature, you should be familiar with:

- [Intermediate Drawing](../index.md)


* childrenOnChain(
      parentModel: [IModel](../interfaces/core_schema.IModel.md),
      onChain: [IChain](../interfaces/core_core.IChain.md),
      baseline?: number,
      reversed?: boolean,
      contain?: boolean,
      rotated?: boolean,
  ): [IModel](../interfaces/core_schema.IModel.md)

  Layout the children of a model along a chain.
  The x-position of each child will be projected onto the chain so that the proportion between children is maintained.
  The projected positions of the children will become an array of points that approximate the chain.
  Each child will be rotated such that it will be mitered according to the vertex angles formed by this series of points.

  #### Parameters

  + parentModel: [IModel](../interfaces/core_schema.IModel.md)

    The model containing children to lay out.
  + onChain: [IChain](../interfaces/core_core.IChain.md)

    The chain on which to lay out.
  + baseline: number = 0

    Numeric percentage value of vertical displacement from the chain. Default is zero.
  + reversed: boolean = false

    Flag to travel along the chain in reverse. Default is false.
  + contain: boolean = false

    Flag to contain the children layout within the length of the chain. Default is false.
  + rotated: boolean = true

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The parentModel, for cascading.

  + Defined in [core/layout.ts:197](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/layout.ts#L197)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Chain Theory](../index.md)
- [Routes](../index.md)
- [Breaking](../index.md)
- [Intermediate Drawing](../index.md)
