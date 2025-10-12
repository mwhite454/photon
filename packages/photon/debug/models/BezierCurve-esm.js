import { pathType, round, isPoint } from '../core/maker.js';
import * as point from '../core/point.js';
import * as path from '../core/path.js';
import * as angle from '../core/angle.js';
import * as measure from '../core/measure.js';
import * as equal from '../core/equal.js';
import * as chain from '../core/chain.js';
import * as paths from '../core/paths.js';
// Import Bezier.js via default export for CJS compatibility, and namespace for types
import BezierJsDefault from 'bezier-js';
const Bezier = BezierJsDefault;
function getScratch(seed) {
    const points = [seed.origin];
    points.push(...seed.controls);
    points.push(seed.end);
    const bezierJsPoints = points.map(function (p) {
        const bp = {
            x: p[0],
            y: p[1]
        };
        return bp;
    });
    // Construct a fresh Bezier instance each time. This avoids relying on global state
    // or attempting to re-invoke a class constructor via apply.
    return new Bezier(bezierJsPoints);
}
function BezierToSeed(b, range) {
    const points = b.points.map(getIPoint);
    const seed = new BezierSeed(points);
    if (range) {
        seed.parentRange = range;
    }
    return seed;
}
function seedToBezier(seed) {
    const coords = [];
    coords.push(seed.origin[0], seed.origin[1]);
    coords.push(seed.controls[0][0], seed.controls[0][1]);
    if (seed.controls.length > 1) {
        coords.push(seed.controls[1][0], seed.controls[1][1]);
    }
    coords.push(seed.end[0], seed.end[1]);
    return new Bezier(coords);
}
function getExtrema(b) {
    const extrema = b
        .extrema()
        .values
        // round the numbers so we can compare them to each other
        .map(m => round(m))
        // remove duplicates
        .filter((value, index, self) => self.indexOf(value) === index)
        // and put them in order
        .sort();
    if (extrema.length === 0)
        return [0, 1];
    // ensure leading zero
    if (extrema[0] !== 0) {
        extrema.unshift(0);
    }
    // ensure ending 1
    if (extrema[extrema.length - 1] !== 1) {
        extrema.push(1);
    }
    return extrema;
}
function getIPoint(p) {
    return [p.x, p.y];
}
class TPoint {
    constructor(b, t, offset) {
        this.t = t;
        this.point = point.add(getIPoint(b.get(t)), offset);
    }
}
function getError(b, startT, endT, arc, arcReversed) {
    const tSpan = endT - startT;
    function m(ratio) {
        const t = startT + tSpan * ratio;
        const bp = getIPoint(b.get(t));
        const ap = point.middle(arc, arcReversed ? 1 - ratio : ratio);
        return measure.pointDistance(ap, bp);
    }
    return m(0.25) + m(0.75);
}
function getLargestArc(b, startT, endT, accuracy) {
    let arc;
    let lastGoodArc;
    const start = new TPoint(b, startT);
    const end = new TPoint(b, endT);
    let upper = end;
    let lower = start;
    let count = 0;
    let test = upper;
    let reversed;
    while (count < 100) {
        const middle = getIPoint(b.get((start.t + test.t) / 2));
        // if the 3 points are linear, this may throw
        try {
            arc = new paths.Arc(start.point, middle, test.point);
        }
        catch (e) {
            if (lastGoodArc) {
                return lastGoodArc;
            }
            else {
                break;
            }
        }
        // only need to test once to see if this arc is polar / clockwise
        if (reversed === undefined) {
            reversed = equal.isPointEqual(start.point, point.fromAngleOnCircle(arc.endAngle, arc));
        }
        // now we have a valid arc, measure the error.
        const error = getError(b, startT, test.t, arc, reversed);
        // if error is within accuracy, this becomes the lower
        if (error <= accuracy) {
            arc.bezierData = {
                startT: startT,
                endT: test.t
            };
            lower = test;
            lastGoodArc = arc;
        }
        else {
            upper = test;
        }
        // exit if lower is the end
        if (lower.t === upper.t ||
            (lastGoodArc && lastGoodArc !== arc && angle.ofArcSpan(arc) - angle.ofArcSpan(lastGoodArc) < 0.5)) {
            return lastGoodArc;
        }
        count++;
        test = new TPoint(b, (lower.t + upper.t) / 2);
    }
    // arc failed, so return a line
    const line = new paths.Line(start.point, test.point);
    line.bezierData = {
        startT: startT,
        endT: test.t
    };
    return line;
}
function getArcs(bc, b, accuracy, startT, endT, base) {
    let added = 0;
    let arc;
    while (startT < endT) {
        arc = getLargestArc(b, startT, endT, accuracy);
        // add an arc
        startT = arc.bezierData.endT;
        const len = measure.pathLength(arc);
        if (len < 0.0001) {
            continue;
        }
        bc.paths[arc.type + '_' + (base + added)] = arc;
        added++;
    }
    return added;
}
function getActualBezierRange(curve, arc, endpoints, offset, pointMatchingDistance) {
    const b = getScratch(curve.seed);
    const tPoints = [arc.bezierData.startT, arc.bezierData.endT].map(t => new TPoint(b, t, offset));
    const ends = endpoints.slice();
    // clipped arcs will still have endpoints closer to the original endpoints
    const endpointDistancetoStart = ends.map(e => measure.pointDistance(e, tPoints[0].point));
    if (endpointDistancetoStart[0] > endpointDistancetoStart[1])
        ends.reverse();
    for (let i = 2; i--;) {
        if (!equal.isPointEqual(ends[i], tPoints[i].point, pointMatchingDistance)) {
            return null;
        }
    }
    return arc.bezierData;
}
function getChainBezierRange(curve, c, layer, addToLayer, pointMatchingDistance) {
    const endLinks = [c.links[0], c.links[c.links.length - 1]];
    if (endLinks[0].walkedPath.pathContext.bezierData.startT >
        endLinks[1].walkedPath.pathContext.bezierData.startT) {
        chain.reverse(c);
        endLinks.reverse();
    }
    const actualBezierRanges = endLinks.map(endLink => getActualBezierRange(curve, endLink.walkedPath.pathContext, endLink.endPoints, endLink.walkedPath.offset, pointMatchingDistance));
    const result = {
        startT: actualBezierRanges[0] ? actualBezierRanges[0].startT : null,
        endT: actualBezierRanges[1] ? actualBezierRanges[1].endT : null
    };
    if (result.startT !== null && result.endT !== null) {
        return result;
    }
    else if (c.links.length > 2) {
        if (result.startT === null) {
            // exclude the first from the chain
            addToLayer(c.links[0].walkedPath.pathContext, layer, true);
            result.startT = c.links[1].walkedPath.pathContext.bezierData.startT;
        }
        if (result.endT === null) {
            // exclude the last from the chain
            addToLayer(c.links[c.links.length - 1].walkedPath.pathContext, layer, true);
            result.endT = c.links[c.links.length - 2].walkedPath.pathContext.bezierData.endT;
        }
        return result;
    }
    return null;
}
/**
 * Class for bezier seed.
 */
export class BezierSeed {
    constructor(...args) {
        this.type = pathType.BezierSeed;
        switch (args.length) {
            case 1: // point array
                const points = args[0];
                this.origin = points[0];
                if (points.length === 3) {
                    this.controls = [points[1]];
                    this.end = points[2];
                }
                else if (points.length === 4) {
                    this.controls = [points[1], points[2]];
                    this.end = points[3];
                }
                else {
                    this.end = points[1];
                }
                break;
            case 3: // quadratic or cubic
                if (Array.isArray(args[1])) {
                    this.controls = args[1];
                }
                else {
                    this.controls = [args[1]];
                }
                this.end = args[2];
                break;
            case 4: // cubic params
                this.controls = [args[1], args[2]];
                this.end = args[3];
                break;
        }
    }
}
export class BezierCurve {
    constructor(...args) {
        this.type = BezierCurve.typeName;
        const isArrayArg0 = Array.isArray(args[0]);
        switch (args.length) {
            case 2:
                if (isArrayArg0) {
                    this.accuracy = args[1];
                }
                else {
                    // seed
                    this.seed = args[0];
                    this.accuracy = args[1];
                    break;
                }
            // fall through to point array
            case 1: // point array or seed
                if (isArrayArg0) {
                    const points = args[0];
                    this.seed = new BezierSeed(points);
                }
                else {
                    this.seed = args[0];
                }
                break;
            default:
                switch (args.length) {
                    case 4:
                        if (isPoint(args[3])) {
                            this.seed = new BezierSeed(args);
                            break;
                        }
                        else {
                            this.accuracy = args[3];
                            // fall through
                        }
                    case 3:
                        if (isArrayArg0) {
                            this.seed = new BezierSeed(args.slice(0, 3));
                        }
                        break;
                    case 5:
                        this.accuracy = args[4];
                        this.seed = new BezierSeed(args.slice(0, 4));
                        break;
                }
                break;
        }
        this.paths = {};
        if (measure.isBezierSeedLinear(this.seed)) {
            // use a line and exit
            const line = new paths.Line(point.clone(this.seed.origin), point.clone(this.seed.end));
            line.bezierData = {
                startT: 0,
                endT: 1
            };
            this.paths = {
                '0': line
            };
            return;
        }
        const b = seedToBezier(this.seed);
        const extrema = getExtrema(b);
        this.paths = {};
        // use arcs
        if (!this.accuracy) {
            // get a default accuracy relative to the size of the bezier
            const len = b.length();
            // set the default to be a combination of fast rendering and good smoothing.
            this.accuracy = len / 100;
        }
        let count = 0;
        for (let i = 1; i < extrema.length; i++) {
            const extremaSpan = extrema[i] - extrema[i - 1];
            count += getArcs(this, b, this.accuracy * extremaSpan, extrema[i - 1], extrema[i], count);
        }
    }
    static getBezierSeeds(curve, options = {}) {
        options.shallow = true;
        options.unifyBeziers = false;
        const seedsByLayer = {};
        const addToLayer = (pathToAdd, layer, clone = false) => {
            if (!seedsByLayer[layer]) {
                seedsByLayer[layer] = [];
            }
            seedsByLayer[layer].push(clone ? path.clone(pathToAdd) : pathToAdd);
        };
        chain.findChains(curve, function (chains, loose, layer) {
            chains.forEach(c => {
                const range = getChainBezierRange(curve, c, layer, addToLayer, options.pointMatchingDistance);
                if (range) {
                    const b = getScratch(curve.seed);
                    const piece = b.split(range.startT, range.endT);
                    addToLayer(BezierToSeed(piece), layer);
                }
                else {
                    c.links.forEach(link => addToLayer(link.walkedPath.pathContext, layer, true));
                }
            });
            loose.forEach(wp => {
                if (wp.pathContext.type === pathType.Line) {
                    // bezier is linear
                    return addToLayer(wp.pathContext, layer, true);
                }
                const range = getActualBezierRange(curve, wp.pathContext, point.fromPathEnds(wp.pathContext), wp.offset, options.pointMatchingDistance);
                if (range) {
                    const b = getScratch(curve.seed);
                    const piece = b.split(range.startT, range.endT);
                    addToLayer(BezierToSeed(piece), layer);
                }
                else {
                    addToLayer(wp.pathContext, layer, true);
                }
            });
        }, options);
        if (options.byLayers) {
            return seedsByLayer;
        }
        else {
            return seedsByLayer[''];
        }
    }
    static computeLength(seed) {
        const b = seedToBezier(seed);
        return b.length();
    }
    static computePoint(seed, t) {
        const s = getScratch(seed);
        const computedPoint = s.compute(t);
        return getIPoint(computedPoint);
    }
}
BezierCurve.typeName = 'BezierCurve';
BezierCurve.metaParameters = [
    {
        title: 'points',
        type: 'select',
        value: [
            [
                [100, 0],
                [-80, -60],
                [100, 220],
                [100, 60]
            ],
            [
                [0, 0],
                [100, 0],
                [100, 100]
            ],
            [
                [0, 0],
                [20, 0],
                [80, 100],
                [100, 100]
            ]
        ]
    }
];
//# sourceMappingURL=BezierCurve-esm.js.map