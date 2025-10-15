import { IPoint, IPath, IPathLine, IPathBezierSeed, IModel } from './schema.js';
import type { IMeasure, IMeasureWithCenter, ISlope } from './core.js';
/** Measures the distance between two points. */
export declare function pointDistance(a: IPoint, b: IPoint): number;
/** Gets the slope of a line. */
export declare function lineSlope(line: IPathLine): ISlope;
/** Check if a bezier seed has control points on the line slope and between the line endpoints. */
export declare function isBezierSeedLinear(seed: IPathBezierSeed, exclusive?: boolean): boolean;
/** Calculates the smallest rectangle which contains a path. */
export declare function pathExtents(pathToMeasure: IPath, addOffset?: IPoint): IMeasure;
/** Measures the length of a path. */
export declare function pathLength(pathToMeasure: IPath): number;
/** Augment a measurement with center and width/height. */
export declare function augment(measureToAugment: IMeasure): IMeasureWithCenter;
/** Measures the smallest rectangle which contains a model. */
export declare function modelExtents(modelToMeasure: IModel): IMeasureWithCenter | null;
export { isPointEqual } from './equal.js';
