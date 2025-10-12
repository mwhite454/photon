import { IModel, IPathMap } from '../core/schema.js';
export declare class Ring implements IModel {
    paths: IPathMap;
    constructor(outerRadius: number, innerRadius?: number);
}
