import { IModel, IPathMap } from '../core/schema.js';
export declare class Dogbone implements IModel {
    paths: IPathMap;
    /** Create a dogbone from width, height, corner radius, style, and bottomless flag. */
    constructor(width: number, height: number, radius: number, style?: number, bottomless?: boolean);
}
