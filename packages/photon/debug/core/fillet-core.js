import { pathType, round } from './maker.js';
import * as point from './point.js';
import * as angle from './angle.js';
import * as measure from './measure.js';
import * as equal from './equal.js';
import { Line, Circle, Arc, Parallel } from './paths.js';
import * as path from './path.js';
import { intersection } from './intersect.js';
import { breakAtPoint } from './break.js';
const propertyNamesMap = {};
propertyNamesMap[pathType.Arc] = (_arc) => ['startAngle', 'endAngle'];
propertyNamesMap[pathType.Line] = (_line) => ['origin', 'end'];
/** @private */
export function getPointProperties(pathToInspect) {
    var _a;
    const points = point.fromPathEnds(pathToInspect);
    if (!points)
        return null;
    const propertyNames = (_a = propertyNamesMap[pathToInspect.type]) === null || _a === void 0 ? void 0 : _a.call(propertyNamesMap, pathToInspect);
    if (!propertyNames)
        return null;
    const pointProperty = (index) => ({
        point: points[index],
        propertyName: propertyNames[index],
    });
    return [pointProperty(0), pointProperty(1)];
}
/** @private */
export function getMatchingPointProperties(pathA, pathB, _options) {
    const pathAProps = getPointProperties(pathA);
    const pathBProps = getPointProperties(pathB);
    if (!pathAProps || !pathBProps)
        return null;
    const makeMatch = (pathContext, props, index) => ({
        path: pathContext,
        isStart: index === 0,
        propertyName: props[index].propertyName,
        point: props[index].point,
        oppositePoint: props[1 - index].point,
    });
    const check = (iA, iB) => {
        if (equal.isPointEqual(pathAProps[iA].point, pathBProps[iB].point, 0.0001)) {
            return [makeMatch(pathA, pathAProps, iA), makeMatch(pathB, pathBProps, iB)];
        }
        return null;
    };
    return check(0, 0) || check(0, 1) || check(1, 0) || check(1, 1);
}
/** @private */
export function populateShardPointsFromReferenceCircle(filletRadius, center, properties, _options) {
    const referenceCircle = new Circle(center, filletRadius);
    for (let i = 0; i < 2; i++) {
        const circleIntersection = intersection(referenceCircle, properties[i].path);
        if (!circleIntersection)
            return false;
        properties[i].shardPoint = circleIntersection.intersectionPoints[0];
        if (equal.isPointEqual(properties[i].point, circleIntersection.intersectionPoints[0], 0.0001)) {
            if (circleIntersection.intersectionPoints.length > 1) {
                properties[i].shardPoint = circleIntersection.intersectionPoints[1];
            }
            else {
                return false;
            }
        }
    }
    return true;
}
/** @private */
export function cloneAndBreakPath(pathToShard, shardPoint) {
    const shardStart = path.clone(pathToShard);
    const shardEnd = breakAtPoint(shardStart, shardPoint);
    return [shardStart, shardEnd];
}
const guidePathMap = {};
guidePathMap[pathType.Arc] = (arc, filletRadius, nearPoint, shardPoint, isStart) => {
    let guideRadius = arc.radius;
    const guideArcShard = cloneAndBreakPath(arc, shardPoint)[isStart ? 0 : 1];
    if (!guideArcShard)
        return null;
    if (measure.isArcConcaveTowardsPoint(guideArcShard, nearPoint)) {
        guideRadius -= filletRadius;
    }
    else {
        guideRadius += filletRadius;
    }
    if (round(guideRadius) <= 0)
        return null;
    return new Arc(arc.origin, guideRadius, arc.startAngle, arc.endAngle);
};
guidePathMap[pathType.Line] = (line, filletRadius, nearPoint) => new Parallel(line, filletRadius, nearPoint);
/** @private */
export function getGuidePath(context, filletRadius, nearPoint) {
    const fn = guidePathMap[context.path.type];
    return fn ? fn(context.path, filletRadius, nearPoint, context.shardPoint, context.isStart) : null;
}
const filletResultMap = {};
filletResultMap[pathType.Arc] = (arc, propertyName, _filletRadius, filletCenter) => {
    const guideLine = new Line(arc.origin, filletCenter);
    const guideLineAngle = angle.ofLineInDegrees(guideLine);
    let filletAngle = guideLineAngle;
    if (!measure.isArcConcaveTowardsPoint(arc, filletCenter)) {
        filletAngle += 180;
    }
    return {
        filletAngle: angle.noRevolutions(filletAngle),
        clipPath: () => {
            arc[propertyName] = guideLineAngle;
        },
    };
};
filletResultMap[pathType.Line] = (line, propertyName, _filletRadius, filletCenter) => {
    const guideLine = new Line([0, 0], [0, 1]);
    const lineAngle = angle.ofLineInDegrees(line);
    path.rotate(guideLine, lineAngle, [0, 0]);
    path.moveRelative(guideLine, filletCenter);
    const intersectionPoint = point.fromSlopeIntersection(line, guideLine);
    if (!intersectionPoint)
        return null;
    return {
        filletAngle: angle.ofPointInDegrees(filletCenter, intersectionPoint),
        clipPath: () => {
            line[propertyName] = intersectionPoint;
        },
    };
};
/** @private */
export function getFilletResult(context, filletRadius, filletCenter) {
    const fn = filletResultMap[context.path.type];
    const result = fn ? fn(context.path, context.propertyName, filletRadius, filletCenter) : null;
    return testFilletResult(context, result) ? result : null;
}
/** @private */
export function getDogboneResult(context, filletCenter) {
    const result = {
        filletAngle: angle.ofPointInDegrees(filletCenter, context.shardPoint),
        clipPath: () => {
            context.path[context.propertyName] = context.shardPoint;
        },
    };
    return testFilletResult(context, result) ? result : null;
}
/** @private */
export function testFilletResult(context, result) {
    if (!result)
        return false;
    const originalValue = context.path[context.propertyName];
    result.clipPath();
    const ok = measure.pathLength(context.path) > 0;
    context.path[context.propertyName] = originalValue;
    return ok;
}
/** @private */
export function getLineRatio(lines) {
    let totalLength = 0;
    const lengths = [];
    for (let i = 0; i < lines.length; i++) {
        const length = measure.pathLength(lines[i]);
        lengths.push(length);
        totalLength += length;
    }
    return lengths[0] / totalLength;
}
//# sourceMappingURL=fillet-core.js.map