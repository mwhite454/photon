import { IModel, IPoint, IPathMap, IModelMap } from '../core/schema.js';
export declare class Slot implements IModel {
    paths: IPathMap;
    origin: IPoint;
    models: IModelMap;
    constructor(origin: IPoint, endPoint: IPoint, radius: number, isolateCaps?: boolean);
}
