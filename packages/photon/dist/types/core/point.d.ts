import { IPoint, IPath, IPathLine, IPathCircle, IPathArc } from './schema.js';
import type { IPathIntersectionBaseOptions } from './maker.js';
/** Add two points together and return the result as a new point object. */
export declare function add(a: IPoint, b: IPoint, subtract?: boolean): IPoint;
/** Get the average of two points. */
export declare function average(a: IPoint, b: IPoint): IPoint;
/** Clone a point into a new point. */
export declare function clone(pointToClone: IPoint): IPoint;
/** From an array of points, find the closest point to a given reference point. */
export declare function closest(referencePoint: IPoint, pointOptions: IPoint[]): IPoint;
/** Get a point from its polar coordinates. */
export declare function fromPolar(angleInRadians: number, radius: number): IPoint;
/** Get a point on a circle or arc path, at a given angle. */
export declare function fromAngleOnCircle(angleInDegrees: number, circle: IPathCircle): IPoint;
/** Get the two end points of an arc path. */
export declare function fromArc(arc: IPathArc): IPoint[];
/** Get the two end points of a path. */
export declare function fromPathEnds(pathContext: IPath, pathOffset?: IPoint): IPoint[];
/** Calculates the intersection of slopes of two lines. */
export declare function fromSlopeIntersection(lineA: IPathLine, lineB: IPathLine, options?: IPathIntersectionBaseOptions): IPoint;
/** Get the middle point of a path. */
export declare function middle(pathContext: IPath, ratio?: number): IPoint;
/** Create a clone of a point, mirrored on either or both x and y axes. */
export declare function mirror(pointToMirror: IPoint, mirrorX: boolean, mirrorY: boolean): IPoint;
/** Round the values of a point. */
export declare function rounded(pointContext: IPoint, accuracy?: number): IPoint;
/** Rotate a point. */
export declare function rotate(pointToRotate: IPoint, angleInDegrees: number, rotationOrigin?: IPoint): IPoint;
/** Scale a point's coordinates. */
export declare function scale(pointToScale: IPoint, scaleValue: number): IPoint;
/** Distort a point's coordinates. */
export declare function distort(pointToDistort: IPoint, scaleX: number, scaleY: number): IPoint;
/** Subtract a point from another point, and return the result as a new point. */
export declare function subtract(a: IPoint, b: IPoint): IPoint;
/** A point at 0,0 coordinates. */
export declare function zero(): IPoint;
