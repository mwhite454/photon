// ES Module imports
import type { IPoint, IPathArc, IPathBezierSeed, IModel, IModelMap } from '../core/schema.js';
import { pathType, isPoint, isPathArc } from '../core/core.js';
import type { IKit } from '../core/core.js';
import * as angle from '../core/angle.js';
import * as point from '../core/point.js';
import * as path from '../core/path.js';
import * as paths from '../core/paths.js';
import { BezierCurve } from './BezierCurve-esm.js';

/**
 * @private
 * Our maximum circular arc span for accurate representation by a cubic curve.
 */
const maxBezierArcspan = 45;

/**
 * @private
 */
function controlYForCircularCubic(arcSpanInRadians: number): number {

    //from http://pomax.github.io/bezierinfo/#circles_cubic
    return 4 * (Math.tan(arcSpanInRadians / 4) / 3);

}

/**
 * @private
 */
function controlPointsForCircularCubic(arc: IPathArc): IPoint[] {

    const arcSpan = angle.ofArcSpan(arc);

    //compute y for radius of 1
    const y = controlYForCircularCubic(angle.toRadians(arcSpan));

    //multiply by radius
    const c1: IPoint = [arc.radius, arc.radius * y];

    //get second control point by mirroring, then rotating
    const c2 = point.rotate(point.mirror(c1, false, true), arcSpan, [0, 0]);

    //rotate again to start angle, then offset by arc's origin
    return [c1, c2].map(function (p: IPoint) { return point.add(arc.origin, point.rotate(p, arc.startAngle, [0, 0])); });
}

/**
 * @private
 */
function bezierSeedFromArc(arc: IPathArc): IPathBezierSeed {
    const span = angle.ofArcSpan(arc);
    if (span <= 90) {
        const endPoints = point.fromPathEnds(arc);
        const controls = controlPointsForCircularCubic(arc);
        return {
            type: pathType.BezierSeed,
            origin: endPoints[0],
            controls: controls,
            end: endPoints[1]
        };
    }
    return null;
}

export class Ellipse implements IModel {

    public models: IModelMap = {};
    public origin: IPoint;

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

    constructor(...args: any[]) {

        const n = 360 / maxBezierArcspan;
        let accuracy: number;

        const isPointArgs0 = isPoint(args[0]);

        const realArgs = (numArgs: number) => {
            switch (numArgs) {
                case 2:
                    if (isPointArgs0) {
                        //origin, radius
                        this.origin = <IPoint>args[0];
                    }
                    break;

                case 3:
                    //origin, rx, ry
                    this.origin = <IPoint>args[0];
                    break;

                case 4:
                    //cx, cy, rx, ry
                    this.origin = [args[0] as number, args[1] as number];
                    break;
            }

            //construct a bezier approximation for an arc with radius of 1.
            const a = 360 / n;
            const arc = new paths.Arc([0, 0], 1, 0, a);

            //clone and rotate to complete a circle
            for (let i = 0; i < n; i++) {

                let seed = bezierSeedFromArc(arc);

                switch (numArgs) {
                    case 1:
                        //radius
                        seed = path.scale(seed, args[0] as number) as IPathBezierSeed;
                        break;

                    case 2:
                        if (isPointArgs0) {
                            //origin, radius
                            seed = path.scale(seed, args[1] as number) as IPathBezierSeed;

                        } else {
                            //rx, ry
                            seed = path.distort(seed, args[0] as number, args[1] as number) as IPathBezierSeed;
                        }
                        break;

                    case 3:
                        //origin, rx, ry
                        seed = path.distort(seed, args[1] as number, args[2] as number) as IPathBezierSeed;
                        break;

                    case 4:
                        //cx, cy, rx, ry
                        seed = path.distort(seed, args[2] as number, args[3] as number) as IPathBezierSeed;
                        break;
                }

                this.models['Curve_' + (1 + i)] = new BezierCurve(seed, accuracy);

                arc.startAngle += a;
                arc.endAngle += a;
            }
        };

        switch (args.length) {
            case 2:
                realArgs(2);
                break;

            case 3:
                if (isPointArgs0) {
                    realArgs(3);
                } else {
                    accuracy = args[2] as number;
                    realArgs(2);
                }
                break;

            case 4:
                if (isPointArgs0) {
                    accuracy = args[3] as number;
                    realArgs(3);
                } else {
                    realArgs(4);
                }
                break;

            case 5:
                accuracy = args[4] as number;
                realArgs(4);
                break;
        }

    }
}

(<IKit>Ellipse).metaParameters = [
    { title: "radiusX", type: "range", min: 1, max: 50, value: 50 },
    { title: "radiusY", type: "range", min: 1, max: 50, value: 25 }
];

export class EllipticArc implements IModel {
    public models: IModelMap = {};

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

    constructor(...args: any[]) {

        let arc: IPathArc;
        let accuracy: number;
        let distortX: number;
        let distortY: number;

        if (isPathArc(args[0])) {
            arc = args[0] as IPathArc;
            distortX = args[1] as number;
            distortY = args[2] as number;
            accuracy = args[3] as number;
        } else {
            arc = new paths.Arc([0, 0], 1, args[0] as number, args[1] as number);
            distortX = args[2] as number;
            distortY = args[3] as number;
            accuracy = args[4] as number;
        }

        const span = angle.ofArcSpan(arc);

        //split into equal chunks, no larger than max chunk size
        const count = Math.ceil(span / maxBezierArcspan);
        const subSpan = span / count;
        const subArc = path.clone(arc) as IPathArc;

        for (let i = 0; i < count; i++) {
            subArc.startAngle = arc.startAngle + (i * subSpan);
            subArc.endAngle = subArc.startAngle + subSpan;

            let seed = bezierSeedFromArc(subArc);
            seed = path.distort(seed, distortX, distortY) as IPathBezierSeed;

            this.models['Curve_' + (1 + i)] = new BezierCurve(seed, accuracy);
        }
    }
}

(<IKit>EllipticArc).metaParameters = [
    { title: "startAngle", type: "range", min: 0, max: 90, value: 0 },
    { title: "endAngle", type: "range", min: 90, max: 360, value: 180 },
    { title: "radiusX", type: "range", min: 1, max: 50, value: 50 },
    { title: "radiusY", type: "range", min: 1, max: 50, value: 25 }
];
