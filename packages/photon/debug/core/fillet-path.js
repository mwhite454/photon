import { round, isPathLine, extendObject } from './maker.js';
import * as point from './point.js';
import * as angle from './angle.js';
import { Arc, Line } from './paths.js';
import { getMatchingPointProperties, populateShardPointsFromReferenceCircle, getGuidePath, getFilletResult, getDogboneResult, getLineRatio, } from './fillet-core.js';
import { intersection } from './intersect.js';
export function pathDogbone(lineA, lineB, filletRadius, options) {
    if (!isPathLine(lineA) || !isPathLine(lineB) || !filletRadius || filletRadius <= 0)
        return null;
    const opts = { pointMatchingDistance: 0.005 };
    extendObject(opts, options);
    const commonProperty = getMatchingPointProperties(lineA, lineB, opts);
    if (!commonProperty)
        return null;
    const ratio = getLineRatio([lineA, lineB]);
    const span = new Line(commonProperty[0].oppositePoint, commonProperty[1].oppositePoint);
    const midRatioPoint = point.middle(span, ratio);
    const bisectionAngle = angle.ofPointInDegrees(commonProperty[0].point, midRatioPoint);
    const center = point.add(commonProperty[0].point, point.fromPolar(angle.toRadians(bisectionAngle), filletRadius));
    if (!populateShardPointsFromReferenceCircle(filletRadius, center, commonProperty, opts))
        return null;
    const results = [];
    for (let i = 0; i < 2; i++) {
        const result = getDogboneResult(commonProperty[i], center);
        if (!result)
            return null;
        results.push(result);
    }
    const filletArc = new Arc(center, filletRadius, results[0].filletAngle, results[1].filletAngle);
    if (round(angle.noRevolutions(angle.ofArcMiddle(filletArc))) === round(bisectionAngle)) {
        filletArc.startAngle = results[1].filletAngle;
        filletArc.endAngle = results[0].filletAngle;
    }
    results[0].clipPath();
    results[1].clipPath();
    return filletArc;
}
export function pathFillet(pathA, pathB, filletRadius, options) {
    if (!pathA || !pathB || !filletRadius || filletRadius <= 0)
        return null;
    const opts = { pointMatchingDistance: 0.005 };
    extendObject(opts, options);
    const commonProperty = getMatchingPointProperties(pathA, pathB, opts);
    if (!commonProperty)
        return null;
    if (!populateShardPointsFromReferenceCircle(filletRadius, commonProperty[0].point, commonProperty, opts))
        return null;
    const guidePaths = [];
    for (let i = 0; i < 2; i++) {
        const otherPathShardPoint = commonProperty[1 - i].shardPoint;
        if (!otherPathShardPoint)
            return null;
        const guidePath = getGuidePath(commonProperty[i], filletRadius, otherPathShardPoint);
        guidePaths.push(guidePath);
    }
    const intersectionPoint = intersection(guidePaths[0], guidePaths[1]);
    if (!intersectionPoint)
        return null;
    let center;
    if (intersectionPoint.intersectionPoints.length === 1) {
        center = intersectionPoint.intersectionPoints[0];
    }
    else {
        center = point.closest(commonProperty[0].point, intersectionPoint.intersectionPoints);
    }
    const results = [];
    for (let i = 0; i < 2; i++) {
        const result = getFilletResult(commonProperty[i], filletRadius, center);
        if (!result)
            return null;
        results.push(result);
    }
    if (round(results[0].filletAngle - results[1].filletAngle) === 0)
        return null;
    const filletArc = new Arc(center, filletRadius, results[0].filletAngle, results[1].filletAngle);
    const filletSpan = angle.ofArcSpan(filletArc);
    if (filletSpan === 180)
        return null;
    if (filletSpan > 180) {
        filletArc.startAngle = results[1].filletAngle;
        filletArc.endAngle = results[0].filletAngle;
    }
    results[0].clipPath();
    results[1].clipPath();
    return filletArc;
}
//# sourceMappingURL=fillet-path.js.map