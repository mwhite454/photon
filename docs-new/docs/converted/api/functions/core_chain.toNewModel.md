---
title: toNewModel | Photon
source: docs/docs/api/functions/core_chain.toNewModel.html
---

toNewModel | Photon

[Photon](../index.html)




Preparing search index...

* [core/chain](../modules/core_chain.html)
* toNewModel

# Function toNewModel

* toNewModel(chainContext: [IChain](../interfaces/core_maker.IChain.html), detachFromOldModel?: boolean): [IModel](../interfaces/core_schema.IModel.html)

  Convert a chain to a new model, independent of any model from where the chain was found.

  #### Parameters

  + chainContext: [IChain](../interfaces/core_maker.IChain.html)

    Chain to convert to a model.
  + detachFromOldModel: boolean = false

    Flag to remove the chain's paths from their current parent model. If false, each path will be cloned. If true, the original path will be re-parented into the resulting new model. Default is false.

  #### Returns [IModel](../interfaces/core_schema.IModel.html)

  A new model containing paths from the chain.

  + Defined in [core/chain.ts:522](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/chain.ts#L522)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
