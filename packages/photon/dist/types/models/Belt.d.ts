import { IModel, IPathMap } from '../core/schema.js';
export declare class Belt implements IModel {
    paths: IPathMap;
    constructor(leftRadius: number, distance: number, rightRadius: number);
}
