import { round, pathType } from './maker.js';
import * as angle from './angle.js';
import * as measure from './measure.js';
import * as equal from './equal.js';
/** Add two points together and return the result as a new point object. */
export function add(a, b, subtract) {
    const newPoint = clone(a);
    if (!b)
        return newPoint;
    for (let i = 2; i--;) {
        if (subtract) {
            newPoint[i] -= b[i];
        }
        else {
            newPoint[i] += b[i];
        }
    }
    return newPoint;
}
/** Get the average of two points. */
export function average(a, b) {
    const avg = (i) => (a[i] + b[i]) / 2;
    return [avg(0), avg(1)];
}
/** Clone a point into a new point. */
export function clone(pointToClone) {
    if (!pointToClone)
        return zero();
    return [pointToClone[0], pointToClone[1]];
}
/** From an array of points, find the closest point to a given reference point. */
export function closest(referencePoint, pointOptions) {
    const smallest = { index: 0, distance: -1 };
    for (let i = 0; i < pointOptions.length; i++) {
        const distance = measure.pointDistance(referencePoint, pointOptions[i]);
        if (smallest.distance == -1 || distance < smallest.distance) {
            smallest.distance = distance;
            smallest.index = i;
        }
    }
    return pointOptions[smallest.index];
}
const zero_cos = {};
zero_cos[Math.PI / 2] = true;
zero_cos[3 * Math.PI / 2] = true;
const zero_sin = {};
zero_sin[Math.PI] = true;
zero_sin[2 * Math.PI] = true;
/** Get a point from its polar coordinates. */
export function fromPolar(angleInRadians, radius) {
    return [
        (angleInRadians in zero_cos) ? 0 : round(radius * Math.cos(angleInRadians)),
        (angleInRadians in zero_sin) ? 0 : round(radius * Math.sin(angleInRadians))
    ];
}
/** Get a point on a circle or arc path, at a given angle. */
export function fromAngleOnCircle(angleInDegrees, circle) {
    return add(circle.origin, fromPolar(angle.toRadians(angleInDegrees), circle.radius));
}
/** Get the two end points of an arc path. */
export function fromArc(arc) {
    return [fromAngleOnCircle(arc.startAngle, arc), fromAngleOnCircle(arc.endAngle, arc)];
}
const pathEndsMap = {};
pathEndsMap[pathType.Arc] = (arc) => fromArc(arc);
pathEndsMap[pathType.Line] = (line) => [line.origin, line.end];
pathEndsMap[pathType.BezierSeed] = pathEndsMap[pathType.Line];
/** Get the two end points of a path. */
export function fromPathEnds(pathContext, pathOffset) {
    let result = null;
    const fn = pathEndsMap[pathContext.type];
    if (fn) {
        result = fn(pathContext);
        if (pathOffset) {
            result = result.map((p) => add(p, pathOffset));
        }
    }
    return result;
}
function verticalIntersectionPoint(verticalLine, nonVerticalSlope) {
    const x = verticalLine.origin[0];
    const y = nonVerticalSlope.slope * x + nonVerticalSlope.yIntercept;
    return [x, y];
}
/** Calculates the intersection of slopes of two lines. */
export function fromSlopeIntersection(lineA, lineB, options = {}) {
    const slopeA = measure.lineSlope(lineA);
    const slopeB = measure.lineSlope(lineB);
    if (equal.isSlopeParallel(slopeA, slopeB)) {
        if (equal.isSlopeEqual(slopeA, slopeB)) {
            options.out_AreOverlapped = measure.isLineOverlapping(lineA, lineB, options.excludeTangents);
        }
        return null;
    }
    let pointOfIntersection;
    if (!slopeA.hasSlope) {
        pointOfIntersection = verticalIntersectionPoint(lineA, slopeB);
    }
    else if (!slopeB.hasSlope) {
        pointOfIntersection = verticalIntersectionPoint(lineB, slopeA);
    }
    else {
        const x = (slopeB.yIntercept - slopeA.yIntercept) / (slopeA.slope - slopeB.slope);
        const y = slopeA.slope * x + slopeA.yIntercept;
        pointOfIntersection = [x, y];
    }
    return pointOfIntersection;
}
function midCircle(circle, midAngle) {
    return add(circle.origin, fromPolar(angle.toRadians(midAngle), circle.radius));
}
const middleMap = {};
middleMap[pathType.Arc] = (arc, ratio) => {
    const midAngle = angle.ofArcMiddle(arc, ratio);
    return midCircle(arc, midAngle);
};
middleMap[pathType.Circle] = (circle, ratio) => midCircle(circle, 360 * ratio);
middleMap[pathType.Line] = (line, ratio) => {
    const ration = (a, b) => a + (b - a) * ratio;
    return [ration(line.origin[0], line.end[0]), ration(line.origin[1], line.end[1])];
};
middleMap[pathType.BezierSeed] = (seed, ratio) => models.BezierCurve.computePoint(seed, ratio);
/** Get the middle point of a path. */
export function middle(pathContext, ratio = .5) {
    let midPoint = null;
    const fn = middleMap[pathContext.type];
    if (fn) {
        midPoint = fn(pathContext, ratio);
    }
    return midPoint;
}
/** Create a clone of a point, mirrored on either or both x and y axes. */
export function mirror(pointToMirror, mirrorX, mirrorY) {
    const p = clone(pointToMirror);
    if (mirrorX)
        p[0] = -p[0];
    if (mirrorY)
        p[1] = -p[1];
    return p;
}
/** Round the values of a point. */
export function rounded(pointContext, accuracy) {
    return [round(pointContext[0], accuracy), round(pointContext[1], accuracy)];
}
/** Rotate a point. */
export function rotate(pointToRotate, angleInDegrees, rotationOrigin = [0, 0]) {
    const pointAngleInRadians = angle.ofPointInRadians(rotationOrigin, pointToRotate);
    const d = measure.pointDistance(rotationOrigin, pointToRotate);
    const rotatedPoint = fromPolar(pointAngleInRadians + angle.toRadians(angleInDegrees), d);
    return add(rotationOrigin, rotatedPoint);
}
/** Scale a point's coordinates. */
export function scale(pointToScale, scaleValue) {
    const p = clone(pointToScale);
    for (let i = 2; i--;) {
        p[i] *= scaleValue;
    }
    return p;
}
/** Distort a point's coordinates. */
export function distort(pointToDistort, scaleX, scaleY) {
    return [pointToDistort[0] * scaleX, pointToDistort[1] * scaleY];
}
/** Subtract a point from another point, and return the result as a new point. */
export function subtract(a, b) {
    return add(a, b, true);
}
/** A point at 0,0 coordinates. */
export function zero() {
    return [0, 0];
}
//# sourceMappingURL=point.js.map