import { pathType, isPoint, isPathArc } from '../core/maker.js';
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
function controlYForCircularCubic(arcSpanInRadians) {
    //from http://pomax.github.io/bezierinfo/#circles_cubic
    return 4 * (Math.tan(arcSpanInRadians / 4) / 3);
}
/**
 * @private
 */
function controlPointsForCircularCubic(arc) {
    const arcSpan = angle.ofArcSpan(arc);
    //compute y for radius of 1
    const y = controlYForCircularCubic(angle.toRadians(arcSpan));
    //multiply by radius
    const c1 = [arc.radius, arc.radius * y];
    //get second control point by mirroring, then rotating
    const c2 = point.rotate(point.mirror(c1, false, true), arcSpan, [0, 0]);
    //rotate again to start angle, then offset by arc's origin
    return [c1, c2].map(function (p) { return point.add(arc.origin, point.rotate(p, arc.startAngle, [0, 0])); });
}
/**
 * @private
 */
function bezierSeedFromArc(arc) {
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
export class Ellipse {
    constructor(...args) {
        this.models = {};
        const n = 360 / maxBezierArcspan;
        let accuracy;
        const isPointArgs0 = isPoint(args[0]);
        const realArgs = (numArgs) => {
            switch (numArgs) {
                case 2:
                    if (isPointArgs0) {
                        //origin, radius
                        this.origin = args[0];
                    }
                    break;
                case 3:
                    //origin, rx, ry
                    this.origin = args[0];
                    break;
                case 4:
                    //cx, cy, rx, ry
                    this.origin = [args[0], args[1]];
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
                        seed = path.scale(seed, args[0]);
                        break;
                    case 2:
                        if (isPointArgs0) {
                            //origin, radius
                            seed = path.scale(seed, args[1]);
                        }
                        else {
                            //rx, ry
                            seed = path.distort(seed, args[0], args[1]);
                        }
                        break;
                    case 3:
                        //origin, rx, ry
                        seed = path.distort(seed, args[1], args[2]);
                        break;
                    case 4:
                        //cx, cy, rx, ry
                        seed = path.distort(seed, args[2], args[3]);
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
                }
                else {
                    accuracy = args[2];
                    realArgs(2);
                }
                break;
            case 4:
                if (isPointArgs0) {
                    accuracy = args[3];
                    realArgs(3);
                }
                else {
                    realArgs(4);
                }
                break;
            case 5:
                accuracy = args[4];
                realArgs(4);
                break;
        }
    }
}
Ellipse.metaParameters = [
    { title: "radiusX", type: "range", min: 1, max: 50, value: 50 },
    { title: "radiusY", type: "range", min: 1, max: 50, value: 25 }
];
export class EllipticArc {
    constructor(...args) {
        this.models = {};
        let arc;
        let accuracy;
        let distortX;
        let distortY;
        if (isPathArc(args[0])) {
            arc = args[0];
            distortX = args[1];
            distortY = args[2];
            accuracy = args[3];
        }
        else {
            arc = new paths.Arc([0, 0], 1, args[0], args[1]);
            distortX = args[2];
            distortY = args[3];
            accuracy = args[4];
        }
        const span = angle.ofArcSpan(arc);
        //split into equal chunks, no larger than max chunk size
        const count = Math.ceil(span / maxBezierArcspan);
        const subSpan = span / count;
        const subArc = path.clone(arc);
        for (let i = 0; i < count; i++) {
            subArc.startAngle = arc.startAngle + (i * subSpan);
            subArc.endAngle = subArc.startAngle + subSpan;
            let seed = bezierSeedFromArc(subArc);
            seed = path.distort(seed, distortX, distortY);
            this.models['Curve_' + (1 + i)] = new BezierCurve(seed, accuracy);
        }
    }
}
EllipticArc.metaParameters = [
    { title: "startAngle", type: "range", min: 0, max: 90, value: 0 },
    { title: "endAngle", type: "range", min: 90, max: 360, value: 180 },
    { title: "radiusX", type: "range", min: 1, max: 50, value: 50 },
    { title: "radiusY", type: "range", min: 1, max: 50, value: 25 }
];
//# sourceMappingURL=Ellipse.js.map