import { IModel, IPoint, IPathMap } from '../core/schema.js';
import type { IMeasure } from '../core/maker.js';
export declare class Rectangle implements IModel {
    paths: IPathMap;
    origin: IPoint;
    /**
     * Create a rectangle from width and height.
     *
     * Example:
     * ```
     * //Create a rectangle from width and height
     * import * as makerjs from 'maker.js';
     * const model = new makerjs.models.Rectangle(50, 100);
     * const svg = makerjs.exporter.toSVG(model);
     * document.write(svg);
     * ```
     *
     * @param width Width of the rectangle.
     * @param height Height of the rectangle.
     */
    constructor(width: number, height: number);
    /**
     * Create a rectangle which will surround a model.
     *
     * Example:
     * ```
     * //Create a rectangle which will surround a model
     * import * as makerjs from 'maker.js';
     * const e = new makerjs.models.Ellipse(17, 10); // draw an ellipse so we have something to surround.
     * const r = new makerjs.models.Rectangle(e, 3); // draws a rectangle surrounding the ellipse by 3 units.
     * const svg = makerjs.exporter.toSVG({ models: { e, r } });
     * document.write(svg);
     * ```
     *
     * @param modelToSurround IModel object.
     * @param margin Optional distance from the model.
     */
    constructor(modelToSurround: IModel, margin?: number);
    /**
     * Create a rectangle from a measurement.
     *
     * Example:
     * ```
     * //Create a rectangle from a measurement.
     * import * as makerjs from 'maker.js';
     * const e = new makerjs.models.Ellipse(17, 10); // draw an ellipse so we have something to measure.
     * const m = makerjs.measure.modelExtents(e);    // measure the ellipse.
     * const r = new makerjs.models.Rectangle(m);    // draws a rectangle surrounding the ellipse.
     * const svg = makerjs.exporter.toSVG({ models: { e, r } });
     * document.write(svg);
     * ```
     *
     * @param measurement IMeasure object. See http://maker.js.org/docs/api/modules/makerjs.measure.html#pathextents and http://maker.js.org/docs/api/modules/makerjs.measure.html#modelextents to get measurements of paths and models.
     */
    constructor(measurement: IMeasure);
}
