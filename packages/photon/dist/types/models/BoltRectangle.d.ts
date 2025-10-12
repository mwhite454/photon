import { IModel, IPathMap } from '../core/schema.js';
export declare class BoltRectangle implements IModel {
    paths: IPathMap;
    constructor(width: number, height: number, holeRadius: number);
}
