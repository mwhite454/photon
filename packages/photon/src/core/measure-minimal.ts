// Minimal measure module with essential functions needed by models
// This is a temporary file to unblock model conversions
// Full measure.ts will be converted later with all functions

import { IPoint, IPath, IPathLine, IPathCircle, IPathArc, IPathBezierSeed, IModel } from './schema.js';
import { round, pathType } from './maker.js';
import type { IMeasure, IMeasureWithCenter, ISlope } from './maker.js';
import * as angle from './angle.js';
import * as point from './point.js';
import * as path from './path.js';
import * as model from './model.js';
import { isPointEqual } from './equal.js';

// TEMP: These will be available after full measure.ts conversion
declare const models: any;

/** Measures the distance between two points. */
export function pointDistance(a: IPoint, b: IPoint): number {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy);
}

/** Gets the slope of a line. */
export function lineSlope(line: IPathLine): ISlope {
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
export function isBezierSeedLinear(seed: IPathBezierSeed, exclusive?: boolean): boolean {
    // create a slope from the endpoints
    const slope = lineSlope(seed);

    // import from equal.ts
    const isPointOnSlope = (p: IPoint, slope: ISlope, withinDistance = 0): boolean => {
        if (slope.hasSlope) {
            return Math.abs(p[1] - (slope.slope * p[0] + slope.yIntercept)) <= withinDistance;
        } else {
            return Math.abs(p[0] - slope.line.origin[0]) <= withinDistance;
        }
    };

    const isBetweenPoints = (pointInQuestion: IPoint, line: IPathLine, exclusive: boolean): boolean => {
        let oneDimension = false;
        for (let i = 2; i--;) {
            if (round(line.origin[i] - line.end[i], .000001) == 0) {
                oneDimension = true;
            } else {
                const origin_value = round(line.origin[i]);
                const end_value = round(line.end[i]);
                if (exclusive) {
                    if (!isBetween(round(pointInQuestion[i]), origin_value, end_value, exclusive)) {
                        return false;
                    }
                } else {
                    if (!(round(pointInQuestion[i]) >= Math.min(origin_value, end_value) && round(pointInQuestion[i]) <= Math.max(origin_value, end_value))) {
                        return false;
                    }
                }
            }
        }
        return oneDimension;
    };

    const isBetween = (valueInQuestion: number, limitA: number, limitB: number, exclusive: boolean): boolean => {
        if (exclusive) {
            return Math.min(limitA, limitB) < valueInQuestion && valueInQuestion < Math.max(limitA, limitB);
        } else {
            return Math.min(limitA, limitB) <= valueInQuestion && valueInQuestion <= Math.max(limitA, limitB);
        }
    };

    for (let i = 0; i < seed.controls.length; i++) {
        if (!isPointOnSlope(seed.controls[i], slope)) return false;
        if (!isBetweenPoints(seed.controls[i], seed, exclusive)) return false;
    }

    return true;
}

type IMathMinMax = (a: number, b: number) => number;

function getExtremePoint(a: IPoint, b: IPoint, fn: IMathMinMax): IPoint {
    return [
        fn(a[0], b[0]),
        fn(a[1], b[1])
    ];
}

const pathExtentsMap: { [pathType: string]: (pathToMeasure: IPath) => IMeasure } = {};

pathExtentsMap[pathType.Line] = (line: IPathLine): IMeasure => {
    return {
        low: getExtremePoint(line.origin, line.end, Math.min),
        high: getExtremePoint(line.origin, line.end, Math.max)
    };
};

pathExtentsMap[pathType.Circle] = (circle: IPathCircle): IMeasure => {
    const r = circle.radius;
    return {
        low: point.add(circle.origin, [-r, -r]),
        high: point.add(circle.origin, [r, r])
    };
};

const isBetweenArcAngles = (angleInQuestion: number, arc: IPathArc, exclusive: boolean): boolean => {
    const startAngle = angle.noRevolutions(arc.startAngle);
    const span = angle.ofArcSpan(arc);
    const endAngle = startAngle + span;
    angleInQuestion = angle.noRevolutions(angleInQuestion);

    if (angleInQuestion < startAngle) {
        angleInQuestion += 360;
    }

    const isBetween = (valueInQuestion: number, limitA: number, limitB: number, exclusive: boolean): boolean => {
        if (exclusive) {
            return Math.min(limitA, limitB) < valueInQuestion && valueInQuestion < Math.max(limitA, limitB);
        } else {
            return Math.min(limitA, limitB) <= valueInQuestion && valueInQuestion <= Math.max(limitA, limitB);
        }
    };

    return isBetween(angleInQuestion, startAngle, endAngle, exclusive);
};

pathExtentsMap[pathType.Arc] = (arc: IPathArc): IMeasure => {
    const r = arc.radius;
    const arcPoints = point.fromArc(arc);

    const extremeAngle = (xyAngle: number[], value: number, fn: IMathMinMax): IPoint => {
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
export function pathExtents(pathToMeasure: IPath, addOffset?: IPoint): IMeasure {
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

const pathLengthMap: { [pathType: string]: (pathToMeasure: IPath) => number } = {};

pathLengthMap[pathType.Line] = (line: IPathLine) => {
    return pointDistance(line.origin, line.end);
};

pathLengthMap[pathType.Circle] = (circle: IPathCircle) => {
    return 2 * Math.PI * circle.radius;
};

pathLengthMap[pathType.Arc] = (arc: IPathArc) => {
    const value = pathLengthMap[pathType.Circle](arc);
    const pct = angle.ofArcSpan(arc) / 360;
    return value * pct;
};

pathLengthMap[pathType.BezierSeed] = (seed: IPathBezierSeed) => {
    return models.BezierCurve.computeLength(seed);
};

/** Measures the length of a path. */
export function pathLength(pathToMeasure: IPath): number {
    if (pathToMeasure) {
        const fn = pathLengthMap[pathToMeasure.type];
        if (fn) {
            return fn(pathToMeasure);
        }
    }
    return 0;
}

function cloneMeasure(measureToclone: IMeasure): IMeasure {
    return {
        high: point.clone(measureToclone.high),
        low: point.clone(measureToclone.low)
    };
}

function increase(baseMeasure: IMeasure, addMeasure: IMeasure): IMeasure {
    const getExtreme = (basePoint: IPoint, newPoint: IPoint, fn: IMathMinMax) => {
        if (!newPoint) return basePoint;
        if (!basePoint) return newPoint;
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
export function augment(measureToAugment: IMeasure): IMeasureWithCenter {
    const m = measureToAugment as IMeasureWithCenter;

    m.center = point.average(m.high, m.low);
    m.width = m.high[0] - m.low[0];
    m.height = m.high[1] - m.low[1];

    return m;
}

/** Measures the smallest rectangle which contains a model. */
export function modelExtents(modelToMeasure: IModel): IMeasureWithCenter | null {
    let measure: IMeasure = { low: null, high: null };

    model.walk(modelToMeasure, {
        onPath: (walkedPath: any) => {
            const m = pathExtents(walkedPath.pathContext, walkedPath.offset);
            increase(measure, m);
        }
    });

    if (!measure.high) return null;

    return augment(measure);
}

// Re-export isPointEqual from equal module for convenience
export { isPointEqual } from './equal.js';
