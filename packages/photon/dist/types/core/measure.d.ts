import type { IModel, IPath, IPathArc, IPathBezierSeed, IPathLine, IPoint } from './schema.js';
import type { IMeasure, IMeasureWithCenter, IMeasureMap, ISlope, IBoundingHex, IMeasurePointInsideOptions, IChain } from './maker.js';
/**
 * Increase a measurement by an additional measurement.
 *
 * @param baseMeasure The measurement to increase.
 * @param addMeasure The additional measurement.
 * @param augmentBaseMeasure Optional flag to call measure.augment on the measurement.
 * @returns The increased original measurement (for cascading).
 */
export declare function increase(baseMeasure: IMeasure, addMeasure: IMeasure, augmentBaseMeasure?: boolean): IMeasure;
/**
 * Check for arc being concave or convex towards a given point.
 *
 * @param arc The arc to test.
 * @param towardsPoint The point to test.
 * @returns Boolean true if arc is concave towards point.
 */
export declare function isArcConcaveTowardsPoint(arc: IPathArc, towardsPoint: IPoint): boolean;
/**
 * DEPRECATED - use isArcSpanOverlapping() instead.
 */
export declare function isArcOverlapping(arcA: IPathArc, arcB: IPathArc, excludeTangents: boolean): boolean;
/**
 * Check for arc overlapping another arc.
 *
 * @param arcA The arc to test.
 * @param arcB The arc to check for overlap.
 * @param excludeTangents Boolean to exclude exact endpoints and only look for deep overlaps.
 * @returns Boolean true if arcA is overlapped with arcB.
 */
export declare function isArcSpanOverlapping(arcA: IPathArc, arcB: IPathArc, excludeTangents: boolean): boolean;
/**
 * Check if a given number is between two given limits.
 *
 * @param valueInQuestion The number to test.
 * @param limitA First limit.
 * @param limitB Second limit.
 * @param exclusive Flag to exclude equaling the limits.
 * @returns Boolean true if value is between (or equal to) the limits.
 */
export declare function isBetween(valueInQuestion: number, limitA: number, limitB: number, exclusive: boolean): boolean;
/**
 * Check if a given angle is between an arc's start and end angles.
 *
 * @param angleInQuestion The angle to test.
 * @param arc Arc to test against.
 * @param exclusive Flag to exclude equaling the start or end angles.
 * @returns Boolean true if angle is between (or equal to) the arc's start and end angles.
 */
export declare function isBetweenArcAngles(angleInQuestion: number, arc: IPathArc, exclusive: boolean): boolean;
/**
 * Check if a given point is between a line's end points.
 *
 * @param pointInQuestion The point to test.
 * @param line Line to test against.
 * @param exclusive Flag to exclude equaling the origin or end points.
 * @returns Boolean true if point is between (or equal to) the line's origin and end points.
 */
export declare function isBetweenPoints(pointInQuestion: IPoint, line: IPathLine, exclusive: boolean): boolean;
/**
 * Check if a given bezier seed has all points on the same slope.
 *
 * @param seed The bezier seed to test.
 * @param exclusive Optional boolean to test only within the boundary of the endpoints.
 * @returns Boolean true if bezier seed has control points on the line slope and between the line endpoints.
 */
export declare function isBezierSeedLinear(seed: IPathBezierSeed, exclusive?: boolean): boolean;
/**
 * Check for flow of paths in a chain being clockwise or not.
 *
 * @param chainContext The chain to test.
 * @param out_result Optional output object, if provided, will be populated with convex hull results.
 * @returns Boolean true if paths in the chain flow clockwise.
 */
export declare function isChainClockwise(chainContext: IChain, out_result?: {
    hullPoints?: IPoint[];
    keyPoints?: IPoint[];
}): boolean;
/**
 * Check for array of points being clockwise or not.
 *
 * @param points The array of points to test.
 * @param out_result Optional output object, if provided, will be populated with convex hull results.
 * @returns Boolean true if points flow clockwise.
 */
export declare function isPointArrayClockwise(points: IPoint[], out_result?: {
    hullPoints?: IPoint[];
    keyPoints?: IPoint[];
}): boolean;
/**
 * Check for line overlapping another line.
 *
 * @param lineA The line to test.
 * @param lineB The line to check for overlap.
 * @param excludeTangents Boolean to exclude exact endpoints and only look for deep overlaps.
 * @returns Boolean true if lineA is overlapped with lineB.
 */
export declare function isLineOverlapping(lineA: IPathLine, lineB: IPathLine, excludeTangents: boolean): boolean;
/**
 * Check for measurement overlapping another measurement.
 *
 * @param measureA The measurement to test.
 * @param measureB The measurement to check for overlap.
 * @returns Boolean true if measureA is overlapped with measureB.
 */
export declare function isMeasurementOverlapping(measureA: IMeasure, measureB: IMeasure): boolean;
/**
 * Gets the slope of a line.
 */
export declare function lineSlope(line: IPathLine): ISlope;
/**
 * Calculates the distance between two points.
 *
 * @param a First point.
 * @param b Second point.
 * @returns Distance between points.
 */
export declare function pointDistance(a: IPoint, b: IPoint): number;
/**
 * Calculates the smallest rectangle which contains a path.
 *
 * @param pathToMeasure The path to measure.
 * @returns object with low and high points.
 */
export declare function pathExtents(pathToMeasure: IPath, addOffset?: IPoint): IMeasure;
/**
 * Measures the length of a path.
 *
 * @param pathToMeasure The path to measure.
 * @returns Length of the path.
 */
export declare function pathLength(pathToMeasure: IPath): number;
/**
 * Measures the length of all paths in a model.
 *
 * @param modelToMeasure The model containing paths to measure.
 * @returns Length of all paths in the model.
 */
export declare function modelPathLength(modelToMeasure: IModel): number;
/**
 * Measures the smallest rectangle which contains a model.
 *
 * @param modelToMeasure The model to measure.
 * @param atlas Optional atlas to save measurements.
 * @returns object with low and high points.
 */
export declare function modelExtents(modelToMeasure: IModel, atlas?: Atlas): IMeasureWithCenter | null;
/**
 * Augment a measurement - add more properties such as center point, height and width.
 *
 * @param measureToAugment The measurement to augment.
 * @returns Measurement object with augmented properties.
 */
export declare function augment(measureToAugment: IMeasure): IMeasureWithCenter;
/**
 * A list of maps of measurements.
 *
 * @param modelToMeasure The model to measure.
 * @param atlas Optional atlas to save measurements.
 * @returns object with low and high points.
 */
export declare class Atlas {
    modelContext: IModel;
    /**
     * Flag that models have been measured.
     */
    modelsMeasured: boolean;
    /**
     * Map of model measurements, mapped by routeKey.
     */
    modelMap: IMeasureMap;
    /**
     * Map of path measurements, mapped by routeKey.
     */
    pathMap: IMeasureMap;
    /**
     * Constructor.
     * @param modelContext The model to measure.
     */
    constructor(modelContext: IModel);
    measureModels(): void;
}
/**
 * Measures the minimum bounding hexagon surrounding a model. The hexagon is oriented such that the right and left sides are vertical, and the top and bottom are pointed.
 *
 * @param modelToMeasure The model to measure.
 * @returns IBoundingHex object which is a hexagon model, with an additional radius property.
 */
export declare function boundingHexagon(modelToMeasure: IModel): IBoundingHex;
/**
 * Check to see if a point is inside of a model.
 *
 * @param pointToCheck The point to check.
 * @param modelContext The model to check against.
 * @param options Optional IMeasurePointInsideOptions object.
 * @returns Boolean true if the path is inside of the modelContext.
 */
export declare function isPointInsideModel(pointToCheck: IPoint, modelContext: IModel, options?: IMeasurePointInsideOptions): boolean;
/** Re-export point equality functions for backward compatibility with makerjs API. */
export { isPointEqual, isPointDistinct, isPointOnSlope } from './equal.js';
