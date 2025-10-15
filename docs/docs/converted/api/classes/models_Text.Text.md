---
ai_summary: Preparing search index...
category: API Reference
description: Preparing search index...
difficulty: intermediate
keywords:
- api-reference
- models
- paths
- photon
- text
primary_topic: text
source: docs/docs/api/classes/models_Text.Text.html
tags:
- intermediate
- api-reference
- text
title: Text | Photon
---
Text | Photon

[Photon](../index.md)




Preparing search index...

* [models/Text](../modules/models_Text.md)
* Text

# Class Text

A model is a composite object which may contain a map of paths, or a map of models recursively.

#### Implements

* [IModel](../interfaces/core_schema.IModel.md)

* Defined in [models/Text.ts:12](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Text.ts#L12)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[models](#models)

### Methods

[glyphToModel](#glyphtomodel)

## Constructors

### constructor

* new Text(
      font: Font,
      text: string,
      fontSize: number,
      combine?: boolean,
      centerCharacterOrigin?: boolean,
      bezierAccuracy?: number,
      opentypeOptions?: RenderOptions,
  ): Text

  Renders text in a given font to a model.

  #### Parameters

  + font: Font

    OpenType.Font object.
  + text: string

    String of text to render.
  + fontSize: number

    Font size.
  + combine: boolean = false

    Flag (default false) to perform a combineUnion upon each character with characters to the left and right.
  + centerCharacterOrigin: boolean = false

    Flag (default false) to move the x origin of each character to the center. Useful for rotating text characters.
  + `Optional`bezierAccuracy: number

    Optional accuracy of Bezier curves.
  + `Optional`opentypeOptions: RenderOptions

    Optional opentype.RenderOptions object.

  #### Returns Text

  Model of the text.

  + Defined in [models/Text.ts:26](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Text.ts#L26)

## Properties

### models

models: [IModelMap](../interfaces/core_schema.IModelMap.md) = {}

Optional map of models within this model.

Implementation of [IModel](../interfaces/core_schema.IModel.md).[models](../interfaces/core_schema.IModel.md#models)

* Defined in [models/Text.ts:13](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Text.ts#L13)

## Methods

### `Static`glyphToModel

* glyphToModel(glyph: Glyph, fontSize: number, bezierAccuracy?: number): [IModel](../interfaces/core_schema.IModel.md)

  Convert an opentype glyph to a model.

  #### Parameters

  + glyph: Glyph

    Opentype.Glyph object.
  + fontSize: number

    Font size.
  + `Optional`bezierAccuracy: number

    Optional accuracy of Bezier curves.

  #### Returns [IModel](../interfaces/core_schema.IModel.md)

  Model of the glyph.

  + Defined in [models/Text.ts:81](https://github.com/mwhite454/photon/blob/main/packages/photon/src/models/Text.ts#L81)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[models](#models)

Methods

[glyphToModel](#glyphtomodel)

[Photon](../index.md)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
