import type { IModel, IModelMap, IPathMap, IPoint, IPath, IPathBezierSeed } from '../core/schema.js';
import type { IFindChainsOptions } from '../core/core.js';
/**
 * Class for bezier seed.
 */
export declare class BezierSeed implements IPathBezierSeed {
    type: string;
    origin: IPoint;
    end: IPoint;
    controls: IPoint[];
    /**
     * Class for bezier seed, created from point array.
     *
     * @param points Array of points, with the first being the origin, and the last being the end, and points between used as control points.
     */
    constructor(points: IPoint[]);
    /**
     * Class for quadratic bezier seed.
     *
     * @param origin The origin point of the curve.
     * @param control The control point of the curve.
     * @param end The end point of the curve.
     */
    constructor(origin: IPoint, control: IPoint, end: IPoint);
    /**
     * Class for cubic bezier seed.
     *
     * @param origin The origin point of the curve.
     * @param controls The control points of the curve.
     * @param end The end point of the curve.
     */
    constructor(origin: IPoint, controls: IPoint[], end: IPoint);
    /**
     * Class for cubic bezier seed.
     *
     * @param origin The origin point of the curve.
     * @param control1 The control point of the curve origin.
     * @param control2 The control point of the curve end.
     * @param end The end point of the curve.
     */
    constructor(origin: IPoint, control1: IPoint, control2: IPoint, end: IPoint);
}
export declare class BezierCurve implements IModel {
    models: IModelMap;
    paths: IPathMap;
    origin: IPoint;
    type: string;
    seed: IPathBezierSeed;
    accuracy: number;
    constructor(points: IPoint[], accuracy?: number);
    constructor(seed: IPathBezierSeed, accuracy?: number);
    constructor(origin: IPoint, control: IPoint, end: IPoint, accuracy?: number);
    constructor(origin: IPoint, controls: IPoint[], end: IPoint, accuracy?: number);
    constructor(origin: IPoint, control1: IPoint, control2: IPoint, end: IPoint, accuracy?: number);
    static typeName: string;
    static getBezierSeeds(curve: BezierCurve, options?: IFindChainsOptions): IPath[] | {
        [layer: string]: IPath[];
    };
    static computeLength(seed: IPathBezierSeed): number;
    static computePoint(seed: IPathBezierSeed, t: number): IPoint;
}
