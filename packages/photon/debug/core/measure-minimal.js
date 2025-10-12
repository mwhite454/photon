// Minimal measure module with essential functions needed by models
// This is a temporary file to unblock model conversions
// Full measure.ts will be converted later with all functions
import { round, pathType } from './maker.js';
import * as angle from './angle.js';
import * as point from './point.js';
/** Measures the distance between two points. */
export function pointDistance(a, b) {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy);
}
/** Gets the slope of a line. */
export function lineSlope(line) {
    const dx = line.end[0] - line.origin[0];
    if (round(dx, .000001) == 0) {
        return {
            line: line,
            hasSlope: false
        };
    }
    const dy = line.end[1] - line.origin[1];
    const slope = dy / dx;
    return {
        line: line,
        hasSlope: true,
        slope: slope,
        yIntercept: line.origin[1] - (slope * line.origin[0])
    };
}
/** Check if a bezier seed has control points on the line slope and between the line endpoints. */
export function isBezierSeedLinear(seed, exclusive) {
    // create a slope from the endpoints
    const slope = lineSlope(seed);
    // import from equal.ts
    const isPointOnSlope = (p, slope, withinDistance = 0) => {
        if (slope.hasSlope) {
            return Math.abs(p[1] - (slope.slope * p[0] + slope.yIntercept)) <= withinDistance;
        }
        else {
            return Math.abs(p[0] - slope.line.origin[0]) <= withinDistance;
        }
    };
    const isBetweenPoints = (pointInQuestion, line, exclusive) => {
        let oneDimension = false;
        for (let i = 2; i--;) {
            if (round(line.origin[i] - line.end[i], .000001) == 0) {
                oneDimension = true;
            }
            else {
                const origin_value = round(line.origin[i]);
                const end_value = round(line.end[i]);
                if (exclusive) {
                    if (!isBetween(round(pointInQuestion[i]), origin_value, end_value, exclusive)) {
                        return false;
                    }
                }
                else {
                    if (!(round(pointInQuestion[i]) >= Math.min(origin_value, end_value) && round(pointInQuestion[i]) <= Math.max(origin_value, end_value))) {
                        return false;
                    }
                }
            }
        }
        return oneDimension;
    };
    const isBetween = (valueInQuestion, limitA, limitB, exclusive) => {
        if (exclusive) {
            return Math.min(limitA, limitB) < valueInQuestion && valueInQuestion < Math.max(limitA, limitB);
        }
        else {
            return Math.min(limitA, limitB) <= valueInQuestion && valueInQuestion <= Math.max(limitA, limitB);
        }
    };
    for (let i = 0; i < seed.controls.length; i++) {
        if (!isPointOnSlope(seed.controls[i], slope))
            return false;
        if (!isBetweenPoints(seed.controls[i], seed, exclusive))
            return false;
    }
    return true;
}
function getExtremePoint(a, b, fn) {
    return [
        fn(a[0], b[0]),
        fn(a[1], b[1])
    ];
}
const pathExtentsMap = {};
pathExtentsMap[pathType.Line] = (line) => {
    return {
        low: getExtremePoint(line.origin, line.end, Math.min),
        high: getExtremePoint(line.origin, line.end, Math.max)
    };
};
pathExtentsMap[pathType.Circle] = (circle) => {
    const r = circle.radius;
    return {
        low: point.add(circle.origin, [-r, -r]),
        high: point.add(circle.origin, [r, r])
    };
};
const isBetweenArcAngles = (angleInQuestion, arc, exclusive) => {
    const startAngle = angle.noRevolutions(arc.startAngle);
    const span = angle.ofArcSpan(arc);
    const endAngle = startAngle + span;
    angleInQuestion = angle.noRevolutions(angleInQuestion);
    if (angleInQuestion < startAngle) {
        angleInQuestion += 360;
    }
    const isBetween = (valueInQuestion, limitA, limitB, exclusive) => {
        if (exclusive) {
            return Math.min(limitA, limitB) < valueInQuestion && valueInQuestion < Math.max(limitA, limitB);
        }
        else {
            return Math.min(limitA, limitB) <= valueInQuestion && valueInQuestion <= Math.max(limitA, limitB);
        }
    };
    return isBetween(angleInQuestion, startAngle, endAngle, exclusive);
};
pathExtentsMap[pathType.Arc] = (arc) => {
    const r = arc.radius;
    const arcPoints = point.fromArc(arc);
    const extremeAngle = (xyAngle, value, fn) => {
        const extremePoint = getExtremePoint(arcPoints[0], arcPoints[1], fn);
        for (let i = 2; i--;) {
            if (isBetweenArcAngles(xyAngle[i], arc, false)) {
                extremePoint[i] = value + arc.origin[i];
            }
        }
        return extremePoint;
    };
    return {
        low: extremeAngle([180, 270], -r, Math.min),
        high: extremeAngle([360, 90], r, Math.max)
    };
};
/** Calculates the smallest rectangle which contains a path. */
export function pathExtents(pathToMeasure, addOffset) {
    if (pathToMeasure) {
        const fn = pathExtentsMap[pathToMeasure.type];
        if (fn) {
            const m = fn(pathToMeasure);
            if (addOffset) {
                m.high = point.add(m.high, addOffset);
                m.low = point.add(m.low, addOffset);
            }
            return m;
        }
    }
    return { low: null, high: null };
}
const pathLengthMap = {};
pathLengthMap[pathType.Line] = (line) => {
    return pointDistance(line.origin, line.end);
};
pathLengthMap[pathType.Circle] = (circle) => {
    return 2 * Math.PI * circle.radius;
};
pathLengthMap[pathType.Arc] = (arc) => {
    const value = pathLengthMap[pathType.Circle](arc);
    const pct = angle.ofArcSpan(arc) / 360;
    return value * pct;
};
pathLengthMap[pathType.BezierSeed] = (seed) => {
    return models.BezierCurve.computeLength(seed);
};
/** Measures the length of a path. */
export function pathLength(pathToMeasure) {
    if (pathToMeasure) {
        const fn = pathLengthMap[pathToMeasure.type];
        if (fn) {
            return fn(pathToMeasure);
        }
    }
    return 0;
}
function cloneMeasure(measureToclone) {
    return {
        high: point.clone(measureToclone.high),
        low: point.clone(measureToclone.low)
    };
}
function increase(baseMeasure, addMeasure) {
    const getExtreme = (basePoint, newPoint, fn) => {
        if (!newPoint)
            return basePoint;
        if (!basePoint)
            return newPoint;
        return [
            fn(basePoint[0], newPoint[0]),
            fn(basePoint[1], newPoint[1])
        ];
    };
    baseMeasure.high = getExtreme(baseMeasure.high, addMeasure.high, Math.max);
    baseMeasure.low = getExtreme(baseMeasure.low, addMeasure.low, Math.min);
    return baseMeasure;
}
/** Augment a measurement with center and width/height. */
export function augment(measureToAugment) {
    const m = measureToAugment;
    m.center = point.average(m.high, m.low);
    m.width = m.high[0] - m.low[0];
    m.height = m.high[1] - m.low[1];
    return m;
}
/** Measures the smallest rectangle which contains a model. */
export function modelExtents(modelToMeasure) {
    let measure = { low: null, high: null };
    model.walk(modelToMeasure, {
        onPath: (walkedPath) => {
            const m = pathExtents(walkedPath.pathContext, walkedPath.offset);
            increase(measure, m);
        }
    });
    if (!measure.high)
        return null;
    return augment(measure);
}
// Re-export isPointEqual from equal module for convenience
export { isPointEqual } from './equal.js';
//# sourceMappingURL=measure-minimal.js.map