import { IModel, IPathMap, IModelMap } from '../core/schema.js';
export declare class OvalArc implements IModel {
    paths: IPathMap;
    models: IModelMap;
    constructor(startAngle: number, endAngle: number, sweepRadius: number, slotRadius: number, selfIntersect?: boolean, isolateCaps?: boolean);
}
