/**
 * @private
 */
export interface IExportOptions {
    /**
     * Optional exemplar of number of decimal places.
     */
    accuracy?: number;
    /**
     * Optional unit system to embed in exported file, if the export format allows alternate unit systems.
     */
    units?: string;
}
/**
 * Options for JSON export.
 */
export interface IJsonExportOptions extends IExportOptions {
    /**
     * Optional number of characters to indent after a newline.
     */
    indentation?: number;
}
/**
 * Renders an item in JSON.
 *
 * @param itemToExport Item to render: may be a path, an array of paths, or a model object.
 * @param options Rendering options object.
 * @param options.accuracy Optional exemplar of number of decimal places.
 * @param options.indentation Optional number of characters to indent after a newline.
 * @returns String of DXF content.
 */
export declare function toJson(itemToExport: any, options?: IJsonExportOptions): string;
/**
 * Try to get the unit system from a model
 * @private
 */
export declare function tryGetModelUnits(itemToExport: any): string;
/**
 * Named colors, safe for CSS and DXF
 * 17 colors from https://www.w3.org/TR/CSS21/syndata.html#value-def-color mapped to DXF equivalent AutoDesk Color Index
 */
export declare const colors: {
    black: number;
    red: number;
    yellow: number;
    lime: number;
    aqua: number;
    blue: number;
    fuchsia: number;
    white: number;
    gray: number;
    maroon: number;
    orange: number;
    olive: number;
    green: number;
    teal: number;
    navy: number;
    purple: number;
    silver: number;
};
export interface IStatusCallback {
    (status: {
        progress?: number;
    }): void;
}
