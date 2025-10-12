import type { IModel, IPoint } from './schema.js';
import { type IXmlTagAttrs } from './xml.js';
import { type IExportOptions } from './exporter.js';
export interface IPathDataByLayerMap {
    [layer: string]: string;
}
export interface ISVGImportOptions {
    bezierAccuracy?: number;
}
export declare function fromSVGPathData(pathData: string, options?: ISVGImportOptions): IModel;
export interface ISVGPathDataRenderOptions {
    accuracy?: number;
    byLayers?: boolean;
    fillRule?: 'evenodd' | 'nonzero';
    origin?: IPoint;
}
export declare function toSVGPathData(modelToExport: IModel, ...args: any[]): IPathDataByLayerMap | string;
export interface ISVGElementRenderOptions {
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
    cssStyle?: string;
    className?: string;
}
export interface IFlowAnnotation {
    size: number;
}
export interface ISVGRenderOptions extends IExportOptions, ISVGElementRenderOptions {
    accuracy?: number;
    svgAttrs?: IXmlTagAttrs;
    fontSize?: string;
    scale?: number;
    annotate?: boolean;
    flow?: IFlowAnnotation;
    origin?: IPoint;
    useSvgPathOnly?: boolean;
    viewBox?: boolean;
    scalingStroke?: boolean;
    layerOptions?: Record<string, ISVGElementRenderOptions>;
    fillRule?: 'evenodd' | 'nonzero';
}
export interface SvgUnitConversion {
    [unit: string]: {
        svgUnitType: string;
        scaleConversion: number;
    };
}
export declare const svgUnit: SvgUnitConversion;
export declare function toSVG(itemToExport: any, options?: ISVGRenderOptions): string;
