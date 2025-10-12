// Global type declarations for playground

// Photon global (loaded via script tag)
declare const makerjs: any;
declare namespace Photon {
    interface IModel {
        [key: string]: any;
    }
    interface IPath {
        [key: string]: any;
    }
    interface IPoint extends Array<number> {
        0: number;
        1: number;
    }
    interface IKit {
        [key: string]: any;
    }
    interface IMeasure {
        [key: string]: any;
    }
    interface IMetaParameter {
        [key: string]: any;
    }
    interface IPathMap {
        [id: string]: IPath;
    }
    interface IModelMap {
        [id: string]: IModel;
    }
    namespace exporter {
        interface IExportOptions {
            [key: string]: any;
        }
        interface IDXFRenderOptions extends IExportOptions {
            usePOLYLINE?: boolean;
        }
        interface ISVGRenderOptions extends IExportOptions {
            svgAttrs?: any;
        }
        interface ISVGPathDataRenderOptions extends IExportOptions {
            byLayers?: boolean;
            fillRule?: 'evenodd' | 'nonzero';
            origin?: IPoint;
        }
        interface IJsonExportOptions extends IExportOptions {
            indentation?: number;
        }
        interface IJscadScriptOptions extends IExportOptions {
            extrude?: number;
            functionName?: string;
            indent?: number;
            maxArcFacet?: number;
        }
        interface IJscadCsgOptions extends IExportOptions {
            maxArcFacet?: number;
            extrude?: number;
        }
        interface IPDFRenderOptions extends IExportOptions {
            origin?: IPoint;
        }
        class XmlTag {
            constructor(tagName: string, attrs?: any);
            innerText: string;
            innerTextEscaped: boolean;
            toString(): string;
        }
    }
}

// OpenType.js global (loaded via script tag)
declare namespace opentype {
    interface Font {
        [key: string]: any;
    }
    function load(url: string, callback: (err: any, font?: Font) => void): void;
}

// Monaco Editor Adapter types
declare namespace MonacoEditorAdapter {
    interface TextMarker {
        clear(): void;
    }
}

// Marked library (loaded via script tag)
declare function marked(markdown: string): string;
