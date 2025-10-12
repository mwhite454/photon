import { IModel, IPoint, IPathMap } from '../core/schema.js';
export declare class RoundRectangle implements IModel {
    origin: IPoint;
    paths: IPathMap;
    /**
     * Create a round rectangle from width, height, and corner radius.
     *
     * Example:
     * ```
     * var r = new makerjs.models.RoundRectangle(100, 50, 5);
     * ```
     *
     * @param width Width of the rectangle.
     * @param height Height of the rectangle.
     * @param radius Corner radius.
     */
    constructor(width: number, height: number, radius: number);
    /**
     * Create a round rectangle which will surround a model.
     *
     * Example:
     * ```
     * var b = new makerjs.models.BoltRectangle(30, 20, 1); //draw a bolt rectangle so we have something to surround
     * var r = new makerjs.models.RoundRectangle(b, 2.5);   //surround it
     * ```
     *
     * @param modelToSurround IModel object.
     * @param margin Distance from the model. This will also become the corner radius.
     */
    constructor(modelToSurround: IModel, margin: number);
}
