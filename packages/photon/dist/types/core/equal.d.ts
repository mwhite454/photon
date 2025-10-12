import { IPoint, IPath, IPathCircle } from './schema.js';
import type { ISlope, IIsPointOnPathOptions } from './maker.js';
/** Find out if two angles are equal. */
export declare function isAngleEqual(angleA: number, angleB: number, accuracy?: number): boolean;
/** Find out if two paths are equal. */
export declare function isPathEqual(pathA: IPath, pathB: IPath, withinPointDistance?: number, pathAOffset?: IPoint, pathBOffset?: IPoint): boolean;
/** Find out if two points are equal. */
export declare function isPointEqual(a: IPoint, b: IPoint, withinDistance?: number): boolean;
/** Find out if a point is distinct among an array of points. */
export declare function isPointDistinct(pointToCheck: IPoint, pointArray: IPoint[], withinDistance?: number): boolean;
/** Find out if point is on a slope. */
export declare function isPointOnSlope(p: IPoint, slope: ISlope, withinDistance?: number): boolean;
/** Find out if point is on a circle. */
export declare function isPointOnCircle(p: IPoint, circle: IPathCircle, withinDistance?: number): boolean;
/** Find out if a point lies on a path. */
export declare function isPointOnPath(pointToCheck: IPoint, onPath: IPath, withinDistance?: number, pathOffset?: IPoint, options?: IIsPointOnPathOptions): boolean;
/** Check for slope equality. */
export declare function isSlopeEqual(slopeA: ISlope, slopeB: ISlope): boolean;
/** Check for parallel slopes. */
export declare function isSlopeParallel(slopeA: ISlope, slopeB: ISlope): boolean;
