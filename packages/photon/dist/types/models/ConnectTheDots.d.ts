import { IModel, IPoint, IPathMap } from '../core/schema.js';
export declare class ConnectTheDots implements IModel {
    paths: IPathMap;
    /**
     * Create a model by connecting points designated in a string. The model will be 'closed' - i.e. the last point will connect to the first point.
     *
     * Example:
     * ```
     * var c = new makerjs.models.ConnectTheDots('-10 0 10 0 0 20'); // 3 coordinates to form a triangle
     * ```
     *
     * @param numericList String containing a list of numbers which can be delimited by spaces, commas, or anything non-numeric (Note: [exponential notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential) is allowed).
     */
    constructor(numericList: string);
    /**
     * Create a model by connecting points designated in a string. The model may be closed, or left open.
     *
     * Example:
     * ```
     * var c = new makerjs.models.ConnectTheDots(false, '-10 0 10 0 0 20'); // 3 coordinates to form a polyline
     * ```
     *
     * @param isClosed Flag to specify if last point should connect to the first point.
     * @param numericList String containing a list of numbers which can be delimited by spaces, commas, or anything non-numeric (Note: [exponential notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential) is allowed).
     */
    constructor(isClosed: boolean, numericList: string);
    /**
     * Create a model by connecting points designated in a numeric array. The model will be 'closed' - i.e. the last point will connect to the first point.
     *
     * Example:
     * ```
     * var c = new makerjs.models.ConnectTheDots([-10, 0, 10, 0, 0, 20]); // 3 coordinates to form a triangle
     * ```
     *
     * @param coords Array of coordinates.
     */
    constructor(coords: number[]);
    /**
     * Create a model by connecting points designated in a numeric array. The model may be closed, or left open.
     *
     * Example:
     * ```
     * var c = new makerjs.models.ConnectTheDots(false, [-10, 0, 10, 0, 0, 20]); // 3 coordinates to form a polyline
     * ```
     *
     * @param isClosed Flag to specify if last point should connect to the first point.
     * @param coords Array of coordinates.
     */
    constructor(isClosed: boolean, coords: number[]);
    /**
     * Create a model by connecting points designated in an array of points. The model may be closed, or left open.
     *
     * Example:
     * ```
     * var c = new makerjs.models.ConnectTheDots(false, [[-10, 0], [10, 0], [0, 20]]); // 3 coordinates left open
     * ```
     *
     * @param isClosed Flag to specify if last point should connect to the first point.
     * @param points Array of IPoints.
     */
    constructor(isClosed: boolean, points: IPoint[]);
}
