---
title: parseNumericList | Photon
source: docs/docs/api/functions/core_importer.parseNumericList.html
---

parseNumericList | Photon

[Photon](../index.html)




Preparing search index...

* [core/importer](../modules/core_importer.html)
* parseNumericList

# Function parseNumericList

* parseNumericList(s: string): number[]

  Create a numeric array from a string of numbers. The numbers may be delimited by anything non-numeric.

  Example:

  ```
  var n = makerjs.importer.parseNumericList('5, 10, 15.20 25-30-35 4e1 .5');
  Copy
  ```

  #### Parameters

  + s: string

    The string of numbers.

  #### Returns number[]

  Array of numbers.

  + Defined in [core/importer.ts:12](https://github.com/mwhite454/photon/blob/main/packages/photon/src/core/importer.ts#L12)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
