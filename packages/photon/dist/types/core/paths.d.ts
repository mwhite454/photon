import { IPoint, IPathLine, IPathCircle, IPathArc } from './schema.js';
/** Class for arc path. */
export declare class Arc implements IPathArc {
    origin: IPoint;
    radius: number;
    startAngle: number;
    endAngle: number;
    type: string;
    /**
     * Class for arc path, created from origin point, radius, start angle, and end angle.
     *
     * @param origin The center point of the arc.
     * @param radius The radius of the arc.
     * @param startAngle The start angle of the arc.
     * @param endAngle The end angle of the arc.
     */
    constructor(origin: IPoint, radius: number, startAngle: number, endAngle: number);
    /**
     * Class for arc path, created from 2 points, radius, large Arc flag, and clockwise flag.
     *
     * @param pointA First end point of the arc.
     * @param pointB Second end point of the arc.
     * @param radius The radius of the arc.
     * @param largeArc Boolean flag to indicate clockwise direction.
     * @param clockwise Boolean flag to indicate clockwise direction.
     */
    constructor(pointA: IPoint, pointB: IPoint, radius: number, largeArc: boolean, clockwise: boolean);
    /**
     * Class for arc path, created from 2 points and optional boolean flag indicating clockwise.
     *
     * @param pointA First end point of the arc.
     * @param pointB Second end point of the arc.
     * @param clockwise Boolean flag to indicate clockwise direction.
     */
    constructor(pointA: IPoint, pointB: IPoint, clockwise?: boolean);
    /**
     * Class for arc path, created from 3 points.
     *
     * @param pointA First end point of the arc.
     * @param pointB Middle point on the arc.
     * @param pointC Second end point of the arc.
     */
    constructor(pointA: IPoint, pointB: IPoint, pointC: IPoint);
}
/**
 * Class for circle path.
 */
export declare class Circle implements IPathCircle {
    type: string;
    origin: IPoint;
    radius: number;
    /**
     * Class for circle path, created from radius. Origin will be [0, 0].
     *
     * Example:
     * ```
     * var c = new makerjs.paths.Circle(7);
     * ```
     *
     * @param radius The radius of the circle.
     */
    constructor(radius: number);
    /**
     * Class for circle path, created from origin point and radius.
     *
     * Example:
     * ```
     * var c = new makerjs.paths.Circle([10, 10], 7);
     * ```
     *
     * @param origin The center point of the circle.
     * @param radius The radius of the circle.
     */
    constructor(origin: IPoint, radius: number);
    /**
     * Class for circle path, created from 2 points.
     *
     * Example:
     * ```
     * var c = new makerjs.paths.Circle([5, 15], [25, 15]);
     * ```
     *
     * @param pointA First point on the circle.
     * @param pointB Second point on the circle.
     */
    constructor(pointA: IPoint, pointB: IPoint);
    /**
     * Class for circle path, created from 3 points.
     *
     * Example:
     * ```
     * var c = new makerjs.paths.Circle([0, 0], [0, 10], [20, 0]);
     * ```
     *
     * @param pointA First point on the circle.
     * @param pointB Second point on the circle.
     * @param pointC Third point on the circle.
     */
    constructor(pointA: IPoint, pointB: IPoint, pointC: IPoint);
}
/**
 * Class for line path.
 */
export declare class Line implements IPathLine {
    type: string;
    origin: IPoint;
    end: IPoint;
    /**
     * Class for line path, constructed from array of 2 points.
     *
     * @param points Array of 2 points.
     */
    constructor(points: IPoint[]);
    /**
     * Class for line path, constructed from 2 points.
     *
     * @param origin The origin point of the line.
     * @param end The end point of the line.
     */
    constructor(origin: IPoint, end: IPoint);
}
/**
 * Class for chord, which is simply a line path that connects the endpoints of an arc.
 *
 * @param arc Arc to use as the basic for the chord.
 */
export declare class Chord implements IPathLine {
    type: string;
    origin: IPoint;
    end: IPoint;
    constructor(arc: IPathArc);
}
/**
 * Class for a parallel line path.
 *
 * @param toLine A line to be parallel to.
 * @param distance Distance between parallel and original line.
 * @param nearPoint Any point to determine which side of the line to place the parallel.
 */
export declare class Parallel implements IPathLine {
    type: string;
    origin: IPoint;
    end: IPoint;
    constructor(toLine: IPathLine, distance: number, nearPoint: IPoint);
}
