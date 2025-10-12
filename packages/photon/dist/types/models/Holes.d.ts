import { IModel, IPoint, IPathMap } from '../core/schema.js';
export declare class Holes implements IModel {
    paths: IPathMap;
    /** Create an array of circles of the same radius from an array of center points. */
    constructor(holeRadius: number, points: IPoint[], ids?: string[]);
}
