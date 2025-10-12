import { IModel, IPathMap } from '../core/schema.js';
export declare class Star implements IModel {
    paths: IPathMap;
    constructor(numberOfPoints: number, outerRadius: number, innerRadius?: number, skipPoints?: number);
    static InnerRadiusRatio(numberOfPoints: number, skipPoints: number): number;
}
