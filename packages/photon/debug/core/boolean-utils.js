import { pathType } from './maker.js';
import * as angle from './angle.js';
import * as measure from './measure-minimal.js';
import { isPointOnPath } from './equal.js';
export const DEFAULT_POINT_MATCHING_DISTANCE = 0.005;
export function isZeroLength(pathContext, tolerance = DEFAULT_POINT_MATCHING_DISTANCE / 5) {
    return Math.abs(measure.pathLength(pathContext)) < tolerance;
}
export function isCircleOrArc(pathContext) {
    return pathContext.type === pathType.Circle || pathContext.type === pathType.Arc;
}
export function isArcEnclosingAngle(arc, angleInQuestion, exclusive = false) {
    const startAngle = angle.noRevolutions(arc.startAngle);
    const span = angle.ofArcSpan(arc);
    const endAngle = startAngle + span;
    let normalized = angle.noRevolutions(angleInQuestion);
    if (normalized < startAngle) {
        normalized += 360;
    }
    if (exclusive) {
        return normalized > startAngle && normalized < endAngle;
    }
    return normalized >= startAngle && normalized <= endAngle;
}
export function ensurePathLayer(source, target) {
    if (source && target && typeof source.layer !== 'undefined') {
        target.layer = source.layer;
    }
}
export function isBetween(valueInQuestion, limitA, limitB, exclusive, tolerance = DEFAULT_POINT_MATCHING_DISTANCE) {
    const min = Math.min(limitA, limitB);
    const max = Math.max(limitA, limitB);
    if (exclusive) {
        return valueInQuestion > min + tolerance && valueInQuestion < max - tolerance;
    }
    return valueInQuestion >= min - tolerance && valueInQuestion <= max + tolerance;
}
export function isBetweenArcAngles(angleInQuestion, arc, exclusive, tolerance = DEFAULT_POINT_MATCHING_DISTANCE) {
    const startAngle = angle.noRevolutions(arc.startAngle);
    const span = angle.ofArcSpan(arc);
    const endAngle = startAngle + span;
    let normalized = angle.noRevolutions(angleInQuestion);
    if (normalized < startAngle) {
        normalized += 360;
    }
    return isBetween(normalized, startAngle, endAngle, exclusive, tolerance);
}
export function isBetweenPoints(pointInQuestion, line, exclusive, tolerance = DEFAULT_POINT_MATCHING_DISTANCE) {
    const dx = line.end[0] - line.origin[0];
    const dy = line.end[1] - line.origin[1];
    const lengthSq = dx * dx + dy * dy;
    if (lengthSq === 0) {
        const dx = pointInQuestion[0] - line.origin[0];
        const dy = pointInQuestion[1] - line.origin[1];
        return Math.sqrt(dx * dx + dy * dy) <= tolerance;
    }
    const t = ((pointInQuestion[0] - line.origin[0]) * dx + (pointInQuestion[1] - line.origin[1]) * dy) / lengthSq;
    if (exclusive) {
        if (t <= tolerance || t >= 1 - tolerance) {
            return false;
        }
    }
    else if (t < -tolerance || t > 1 + tolerance) {
        return false;
    }
    return true;
}
export function addPathToModel(modelContext, pathContext, pathId) {
    modelContext.paths = modelContext.paths || {};
    modelContext.paths[pathId] = pathContext;
}
export function trackDeletedPath(container, deletedPath, pathId, reason, routeKey) {
    container.paths[pathId] = deletedPath;
    const info = deletedPath;
    info.reason = reason;
    if (routeKey) {
        info.routeKey = routeKey;
    }
}
export function pathBoundingBox(pathContext, offset) {
    return measure.pathExtents(pathContext, offset);
}
export function findPointsOnPath(points, pathContext, tolerance = DEFAULT_POINT_MATCHING_DISTANCE) {
    const result = [];
    points.forEach(p => {
        if (isPointOnPath(p, pathContext, tolerance)) {
            result.push(p);
        }
    });
    return result;
}
//# sourceMappingURL=boolean-utils.js.map