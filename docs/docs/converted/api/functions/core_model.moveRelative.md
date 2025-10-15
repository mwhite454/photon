---
ai_summary: moveRelative | Photon
category: API Reference
description: moveRelative | Photon
difficulty: intermediate
keywords:
- api-reference
- cad
- moverelative
- photon
primary_topic: moving
related:
- Originating
- Scaling
- Rotating
source: docs/docs/api/functions/core_model.moveRelative.html
tags:
- intermediate
- api-reference
- moving
title: moveRelative | Photon
---
moveRelative | Photon

[Photon](../index.md)




Preparing search index...

* [core/model](../modules/core_model.md)
* moveRelative

# Function moveRelative

* moveRelative(modelToMove: [IModel](../interfaces/core_schema.IModel.md), delta: [IPoint](../interfaces/core_schema.IPoint.md)): [IModel](../interfaces/core_schema.IModel.md)

  Move a model's origin by a relative amount.

  #### Parameters

  + modelToMove: [IModel](../interfaces/core_schema.IModel.md)

    The model to move.
  + delta: [IPoint](../interfaces/core_schema.IPoint.md)

    The x & y adjustments as a point object.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  The original model (for cascading).

  + Defined in [core/model.ts:338](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/model.ts#L338)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)

## Related Topics

- [Originating](../index.md)
- [Scaling](../index.md)
- [Rotating](../index.md)
