import type { IPoint, IPathArc, IModel, IModelMap } from '../core/schema.js';
export declare class Ellipse implements IModel {
    models: IModelMap;
    origin: IPoint;
    /**
     * Class for Ellipse created with 2 radii.
     *
     * @param radiusX The x radius of the ellipse.
     * @param radiusY The y radius of the ellipse.
     * @param accuracy Optional accuracy of the underlying BezierCurve.
     */
    constructor(radiusX: number, radiusY: number, accuracy?: number);
    /**
     * Class for Ellipse created at a specific origin and 2 radii.
     *
     * @param origin The center of the ellipse.
     * @param radiusX The x radius of the ellipse.
     * @param radiusY The y radius of the ellipse.
     * @param accuracy Optional accuracy of the underlying BezierCurve.
     */
    constructor(origin: IPoint, radiusX: number, radiusY: number, accuracy?: number);
    /**
     * Class for Ellipse created at a specific x, y and 2 radii.
     *
     * @param cx The x coordinate of the center of the ellipse.
     * @param cy The y coordinate of the center of the ellipse.
     * @param rX The x radius of the ellipse.
     * @param rY The y radius of the ellipse.
     * @param accuracy Optional accuracy of the underlying BezierCurve.
     */
    constructor(cx: number, cy: number, rx: number, ry: number, accuracy?: number);
}
export declare class EllipticArc implements IModel {
    models: IModelMap;
    /**
     * Class for Elliptic Arc created by distorting a circular arc.
     *
     * @param arc The circular arc to use as the basis of the elliptic arc.
     * @param radiusX The x radius of the ellipse.
     * @param radiusY The y radius of the ellipse.
     * @param accuracy Optional accuracy of the underlying BezierCurve.
     */
    constructor(startAngle: number, endAngle: number, radiusX: number, radiusY: number, accuracy?: number);
    /**
     * Class for Elliptic Arc created by distorting a circular arc.
     *
     * @param arc The circular arc to use as the basis of the elliptic arc.
     * @param distortX The x scale of the ellipse.
     * @param distortY The y scale of the ellipse.
     * @param accuracy Optional accuracy of the underlying BezierCurve.
     */
    constructor(arc: IPathArc, distortX: number, distortY: number, accuracy?: number);
}
