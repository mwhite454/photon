import type { IModel, IPath } from './schema.js';
import { type IPointMatchOptions } from './core.js';
import { type IExportOptions } from './exporter.js';
export declare function toDXF(modelToExport: IModel, options?: IDXFRenderOptions): string;
export declare function toDXF(pathsToExport: IPath[], options?: IDXFRenderOptions): string;
export declare function toDXF(pathToExport: IPath, options?: IDXFRenderOptions): string;
/**
 * DXF layer options.
 */
export interface IDXFLayerOptions {
    /**
     * DXF layer color.
     */
    color: number;
    /**
     * Text size for TEXT entities.
     */
    fontSize?: number;
}
/**
 * DXF rendering options.
 */
export interface IDXFRenderOptions extends IExportOptions, IPointMatchOptions {
    /**
     * Text size for TEXT entities.
     */
    fontSize?: number;
    /**
     * DXF options per layer.
     */
    layerOptions?: {
        [layerId: string]: IDXFLayerOptions;
    };
    /**
     * Flag to use POLYLINE
     */
    usePOLYLINE?: boolean;
}
