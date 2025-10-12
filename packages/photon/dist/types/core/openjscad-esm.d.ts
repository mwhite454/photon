import type { IModel } from './schema.js';
import type { IPointMatchOptions, IFindLoopsOptions } from './maker.js';
import type { IExportOptions } from './exporter.js';
import type * as jscad from '../types/jscad.js';
export interface IStatusCallback {
    (status: {
        progress: number;
    }): void;
}
/**
 * Converts a model to a @jscad/csg CAG object - 2D to 2D. See https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#2D_Paths
 *
 * Example:
 * ```
 * //First, use npm install @jscad/csg from the command line in your jscad project
 * //Create a CAG instance from a model.
 * var { CAG } = require('@jscad/csg');
 * var model = new makerjs.models.Ellipse(70, 40);
 * var cag = makerjs.exporter.toJscadCAG(CAG, model, {maxArcFacet: 1});
 * ```
 *
 * @param jscadCAG @jscad/csg CAG engine, see https://www.npmjs.com/package/@jscad/csg
 * @param modelToExport Model object to export.
 * @param options Optional options object.
 * @param options.byLayers Optional flag to separate chains by layers.
 * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
 * @param options.maxArcFacet The maximum length between points on an arc or circle.
 * @param options.statusCallback Optional callback function to get the percentage complete.
 * @returns jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.
 */
export declare function toJscadCAG(jscadCAG: typeof jscad.CAG, modelToExport: IModel, jsCadCagOptions?: IJscadCagOptions): jscad.CAG | {
    [layerId: string]: jscad.CAG;
};
/**
 * Converts a model to a @jscad/csg CSG object - 2D to 3D.
 *
 * Example:
 * ```
 * //First, use npm install @jscad/csg from the command line in your jscad project
 * //Create a CSG instance from a model.
 * var { CAG } = require('@jscad/csg');
 * var model = new makerjs.models.Ellipse(70, 40);
 * var csg = makerjs.exporter.toJscadCSG(CAG, model, {maxArcFacet: 1, extrude: 10});
 * ```
 *
 * @param jscadCAG @jscad/csg CAG engine, see https://www.npmjs.com/package/@jscad/csg
 * @param modelToExport Model object to export.
 * @param options Optional options object.
 * @param options.byLayers Optional flag to separate chains by layers.
 * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
 * @param options.maxArcFacet The maximum length between points on an arc or circle.
 * @param options.statusCallback Optional callback function to get the percentage complete.
 * @param options.extrude Optional default extrusion distance.
 * @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
 * @returns jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.
 */
export declare function toJscadCSG(jscadCAG: typeof jscad.CAG, modelToExport: IModel, options?: IJscadCsgOptions): jscad.CSG;
/**
 * Creates a string of JavaScript code for execution with a Jscad environment.
 *
 * @param modelToExport Model object to export.
 * @param options Export options object.
 * @param options.byLayers Optional flag to separate chains by layers.
 * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
 * @param options.maxArcFacet The maximum length between points on an arc or circle.
 * @param options.statusCallback Optional callback function to get the percentage complete.
 * @param options.extrude Optional default extrusion distance.
 * @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
 * @returns String of JavaScript containing a main() function for Jscad.
 */
export declare function toJscadScript(modelToExport: IModel, options?: IJscadScriptOptions): string;
/**
 * Exports a model in STL format - 2D to 3D.
 *
 * @param jscadCAG @jscad/csg CAG engine, see https://www.npmjs.com/package/@jscad/csg
 * @param stlSerializer @jscad/stl-serializer, see https://www.npmjs.com/package/@jscad/stl-serializer
 * @param modelToExport Model object to export.
 * @param options Optional options object.
 * @param options.byLayers Optional flag to separate chains by layers.
 * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
 * @param options.maxArcFacet The maximum length between points on an arc or circle.
 * @param options.statusCallback Optional callback function to get the percentage complete.
 * @param options.extrude Optional default extrusion distance.
 * @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
 * @returns String in STL ASCII format.
 */
export declare function toJscadSTL(CAG: typeof jscad.CAG, stlSerializer: jscad.StlSerializer, modelToExport: IModel, options?: IJscadCsgOptions): string;
/**
 * OpenJsCad export options.
 */
export interface IOpenJsCadOptions extends IFindLoopsOptions, IExportOptions {
    /**
     * Optional depth of 3D extrusion.
     */
    extrusion?: number;
    /**
     * Optional size of curve facets.
     */
    facetSize?: number;
    /**
     * Optional override of function name, default is "main".
     */
    functionName?: string;
    /**
     * Optional options applied to specific first-child models by model id.
     */
    modelMap?: IOpenJsCadOptionsMap;
}
/**
 * Map of OpenJsCad export options.
 */
export interface IOpenJsCadOptionsMap {
    [modelId: string]: IOpenJsCadOptions;
}
/**
 * Jscad CAG export options.
 */
export interface IJscadCagOptions extends IExportOptions, IPointMatchOptions {
    /**
     * Flag to separate chains by layers.
     */
    byLayers?: boolean;
    /**
     * The maximum length between points on an arc or circle.
     */
    maxArcFacet?: number;
    /**
     * Optional callback to get status during the export.
     */
    statusCallback?: IStatusCallback;
}
/**
 * Jscad CAG extrusion options.
 */
export interface IJscadExtrudeOptions {
    /**
     * Optional depth of 3D extrusion.
     */
    extrude?: number;
    /**
     * Optional depth of 3D extrusion.
     */
    z?: number;
}
/**
 * Jscad CSG export options.
 */
export interface IJscadCsgOptions extends IJscadCagOptions, IJscadExtrudeOptions {
    /**
     * SVG options per layer.
     */
    layerOptions?: {
        [layerId: string]: IJscadExtrudeOptions;
    };
}
/**
 * Jscad Script export options.
 */
export interface IJscadScriptOptions extends IJscadCsgOptions {
    /**
     * Optional override of function name, default is "main".
     */
    functionName?: string;
    /**
     * Optional number of spaces to indent.
     */
    indent?: number;
}
