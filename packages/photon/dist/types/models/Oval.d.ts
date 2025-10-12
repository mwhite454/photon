import { IModel, IPathMap } from '../core/schema.js';
export declare class Oval implements IModel {
    paths: IPathMap;
    constructor(width: number, height: number);
}
