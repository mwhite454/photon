---
title: StlSerializer | Photon
source: docs/docs/api/interfaces/types_jscad.StlSerializer.html
---

StlSerializer | Photon

[Photon](../index.html)




Preparing search index...

* [types/jscad](../modules/types_jscad.html)
* StlSerializer

# Interface StlSerializer

STL serializer interface

interface StlSerializer {
    [serialize](#serialize-1)(
        csg: [export=](../modules/types_jscad.export_.html).[CSG](../classes/types_jscad.export_.CSG.html),
        options: {
            binary: boolean;
            statusCallback?: (status: { progress: number }) => void;
        },
    ): string;
}

* Defined in [types/jscad.d.ts:96](https://github.com/mwhite454/photon/blob/main/packages/photon/src/types/jscad.d.ts#L96)

##### Index

### Methods

[serialize](#serialize)

## Methods

### serialize

* serialize(
      csg: [export=](../modules/types_jscad.export_.html).[CSG](../classes/types_jscad.export_.CSG.html),
      options: {
          binary: boolean;
          statusCallback?: (status: { progress: number }) => void;
      },
  ): string

  #### Parameters

  + csg: [export=](../modules/types_jscad.export_.html).[CSG](../classes/types_jscad.export_.CSG.html)
  + options: { binary: boolean; statusCallback?: (status: { progress: number }) => void }

  #### Returns string

  + Defined in [types/jscad.d.ts:97](https://github.com/mwhite454/photon/blob/main/packages/photon/src/types/jscad.d.ts#L97)

### Settings

Member Visibility

* Protected
* Inherited

ThemeOSLightDark

### On This Page

Methods

[serialize](#serialize)

[Photon](../index.html)

* Loading...

Generated using [TypeDoc](https://typedoc.org/)
