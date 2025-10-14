---
title: XmlTag | Photon
source: docs/docs/api/classes/core_xml.XmlTag.html
---

XmlTag | Photon

[Photon](../index.html)




Preparing search index...

* [core/xml](../modules/core_xml.html)
* XmlTag

# Class XmlTag

Class for an XML tag.

* Defined in [core/xml.ts:7](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L7)

##### Index

### Constructors

[constructor](#constructor)

### Properties

[attrs?](#attrs)
[closingTags?](#closingtags)
[innerText](#innertext)
[innerTextEscaped](#innertextescaped)
[name](#name)

### Methods

[getClosingTag](#getclosingtag)
[getInnerText](#getinnertext)
[getOpeningTag](#getopeningtag)
[toString](#tostring)
[escapeString](#escapestring)

## Constructors

### constructor

* new XmlTag(name: string, attrs?: [IXmlTagAttrs](../interfaces/core_xml.IXmlTagAttrs.html)): XmlTag

  #### Parameters

  + name: string
  + `Optional`attrs: [IXmlTagAttrs](../interfaces/core_xml.IXmlTagAttrs.html)

  #### Returns XmlTag

  + Defined in [core/xml.ts:34](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L34)

## Properties

### `Optional`attrs

attrs?: [IXmlTagAttrs](../interfaces/core_xml.IXmlTagAttrs.html)

* Defined in [core/xml.ts:34](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L34)

### `Optional`closingTags

closingTags?: boolean

Flag to explicitly close XML tags.

* Defined in [core/xml.ts:15](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L15)

### innerText

innerText: string = ''

Text between the opening and closing tags.

* Defined in [core/xml.ts:9](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L9)

### innerTextEscaped

innerTextEscaped: boolean

Boolean to indicate that the innerText has been escaped.

* Defined in [core/xml.ts:12](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L12)

### name

name: string

* Defined in [core/xml.ts:34](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L34)

## Methods

### getClosingTag

* getClosingTag(): string

  Get the closing tag.

  #### Returns string

  + Defined in [core/xml.ts:72](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L72)

### getInnerText

* getInnerText(): string

  Get the inner text.

  #### Returns string

  + Defined in [core/xml.ts:63](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L63)

### getOpeningTag

* getOpeningTag(selfClose: boolean): string

  Get the opening tag.

  #### Parameters

  + selfClose: boolean

  #### Returns string

  + Defined in [core/xml.ts:38](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L38)

### toString

* toString(): string

  Output the entire tag as a string.

  #### Returns string

  + Defined in [core/xml.ts:77](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L77)

### `Static`escapeString

* escapeString(value: string): string

  Escapes certain characters within a string so that it can appear in a tag or its attribute.

  #### Parameters

  + value: string

  #### Returns string

  + Defined in [core/xml.ts:18](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/xml.ts#L18)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Constructors

[constructor](#constructor)

Properties

[attrs](#attrs)[closingTags](#closingtags)[innerText](#innertext)[innerTextEscaped](#innertextescaped)[name](#name)

Methods

[getClosingTag](#getclosingtag)[getInnerText](#getinnertext)[getOpeningTag](#getopeningtag)[toString](#tostring)[escapeString](#escapestring)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
