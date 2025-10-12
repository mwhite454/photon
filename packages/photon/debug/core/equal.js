import { round, pathType } from './maker.js';
import * as angle from './angle.js';
import * as path from './path.js';
/** Find out if two angles are equal. */
export function isAngleEqual(angleA, angleB, accuracy = .0001) {
    const a = angle.noRevolutions(angleA);
    const b = angle.noRevolutions(angleB);
    const d = angle.noRevolutions(round(b - a, accuracy));
    return d == 0;
}
const pathAreEqualMap = {};
pathAreEqualMap[pathType.Line] = (lineA, lineB, withinPointDistance) => {
    return (isPointEqual(lineA.origin, lineB.origin, withinPointDistance) && isPointEqual(lineA.end, lineB.end, withinPointDistance))
        || (isPointEqual(lineA.origin, lineB.end, withinPointDistance) && isPointEqual(lineA.end, lineB.origin, withinPointDistance));
};
pathAreEqualMap[pathType.Circle] = (circleA, circleB, withinPointDistance) => {
    return isPointEqual(circleA.origin, circleB.origin, withinPointDistance) && circleA.radius == circleB.radius;
};
pathAreEqualMap[pathType.Arc] = (arcA, arcB, withinPointDistance) => {
    return pathAreEqualMap[pathType.Circle](arcA, arcB, withinPointDistance) && isAngleEqual(arcA.startAngle, arcB.startAngle) && isAngleEqual(arcA.endAngle, arcB.endAngle);
};
/** Find out if two paths are equal. */
export function isPathEqual(pathA, pathB, withinPointDistance, pathAOffset, pathBOffset) {
    let result = false;
    if (pathA.type == pathB.type) {
        const fn = pathAreEqualMap[pathA.type];
        if (fn) {
            const getResult = () => {
                result = fn(pathA, pathB, withinPointDistance);
            };
            if (pathAOffset || pathBOffset) {
                path.moveTemporary([pathA, pathB], [pathAOffset, pathBOffset], getResult);
            }
            else {
                getResult();
            }
        }
    }
    return result;
}
/** Find out if two points are equal. */
export function isPointEqual(a, b, withinDistance) {
    if (!withinDistance) {
        return round(a[0] - b[0]) == 0 && round(a[1] - b[1]) == 0;
    }
    else {
        if (!a || !b)
            return false;
        const distance = pointDistance(a, b);
        return distance <= withinDistance;
    }
}
/** Point distance calculation. */
function pointDistance(a, b) {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy);
}
/** Find out if a point is distinct among an array of points. */
export function isPointDistinct(pointToCheck, pointArray, withinDistance) {
    for (let i = 0; i < pointArray.length; i++) {
        if (isPointEqual(pointArray[i], pointToCheck, withinDistance)) {
            return false;
        }
    }
    return true;
}
/** Find out if point is on a slope. */
export function isPointOnSlope(p, slope, withinDistance = 0) {
    if (slope.hasSlope) {
        // y = mx * b
        return Math.abs(p[1] - (slope.slope * p[0] + slope.yIntercept)) <= withinDistance;
    }
    else {
        // vertical slope
        return Math.abs(p[0] - slope.line.origin[0]) <= withinDistance;
    }
}
/** Find out if point is on a circle. */
export function isPointOnCircle(p, circle, withinDistance = 0) {
    const d = Math.abs(pointDistance(p, circle.origin) - circle.radius);
    return d <= withinDistance;
}
const onPathMap = {};
onPathMap[pathType.Circle] = (p, circle, withinDistance) => {
    return isPointOnCircle(p, circle, withinDistance);
};
onPathMap[pathType.Arc] = (p, arc, withinDistance) => {
    if (onPathMap[pathType.Circle](p, arc, withinDistance)) {
        const a = angle.ofPointInDegrees(arc.origin, p);
        return measure.isBetweenArcAngles(a, arc, false);
    }
    return false;
};
onPathMap[pathType.Line] = (p, line, withinDistance, options) => {
    const slope = (options && options.cachedLineSlope) || measure.lineSlope(line);
    if (options && !options.cachedLineSlope) {
        options.cachedLineSlope = slope;
    }
    return isPointOnSlope(p, slope, withinDistance) && measure.isBetweenPoints(p, line, false);
};
/** Find out if a point lies on a path. */
export function isPointOnPath(pointToCheck, onPath, withinDistance = 0, pathOffset, options) {
    const fn = onPathMap[onPath.type];
    if (fn) {
        const offsetPath = pathOffset ? path.clone(onPath, pathOffset) : onPath;
        return fn(pointToCheck, offsetPath, withinDistance, options);
    }
    return false;
}
/** Check for slope equality. */
export function isSlopeEqual(slopeA, slopeB) {
    if (!isSlopeParallel(slopeA, slopeB))
        return false;
    if (!slopeA.hasSlope && !slopeB.hasSlope) {
        // lines are both vertical, see if x are the same
        return round(slopeA.line.origin[0] - slopeB.line.origin[0]) == 0;
    }
    // lines are parallel, but not vertical
    const slopes = [slopeA, slopeB];
    const angles = slopes.map(s => angle.toDegrees(Math.atan(s.slope)));
    const lines = slopes.map(s => path.clone(s.line));
    const origin = lines[0].origin;
    lines.forEach((l, i) => path.rotate(l, -angles[i], origin));
    const averageYs = lines.map(l => (l.origin[1] + l.end[1]) / 2);
    return round(averageYs[0] - averageYs[1], .00001) == 0;
}
/** Check for parallel slopes. */
export function isSlopeParallel(slopeA, slopeB) {
    if (!slopeA.hasSlope && !slopeB.hasSlope) {
        return true;
    }
    if (slopeA.hasSlope && slopeB.hasSlope && (round(slopeA.slope - slopeB.slope, .00001) == 0)) {
        // lines are parallel
        return true;
    }
    return false;
}
//# sourceMappingURL=equal.js.map