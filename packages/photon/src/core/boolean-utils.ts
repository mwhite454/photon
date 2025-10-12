import { IModel, IPath, IPathArc, IPathCircle, IPathLine, IPoint } from './schema.js';
import { pathType } from './maker.js';
import * as angle from './angle.js';
import * as point from './point.js';
import * as path from './path.js';
import * as measure from './measure-minimal.js';
import { isPointOnPath } from './equal.js';

export const DEFAULT_POINT_MATCHING_DISTANCE = 0.005;

export interface SegmentClassification {
    isInside: boolean;
    isDuplicate: boolean;
}

export type SegmentClassifier = (segmentPath: IPath) => SegmentClassification;

export function isZeroLength(pathContext: IPath, tolerance = DEFAULT_POINT_MATCHING_DISTANCE / 5): boolean {
    return Math.abs(measure.pathLength(pathContext)) < tolerance;
}

export function isCircleOrArc(pathContext: IPath): pathContext is IPathArc | IPathCircle {
    return pathContext.type === pathType.Circle || pathContext.type === pathType.Arc;
}

export function isArcEnclosingAngle(arc: IPathArc, angleInQuestion: number, exclusive = false): boolean {
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

export function ensurePathLayer(source: IPath, target: IPath) {
    if (source && target && typeof source.layer !== 'undefined') {
        target.layer = source.layer;
    }
}

export function isBetween(valueInQuestion: number, limitA: number, limitB: number, exclusive: boolean, tolerance = DEFAULT_POINT_MATCHING_DISTANCE): boolean {
    const min = Math.min(limitA, limitB);
    const max = Math.max(limitA, limitB);
    if (exclusive) {
        return valueInQuestion > min + tolerance && valueInQuestion < max - tolerance;
    }
    return valueInQuestion >= min - tolerance && valueInQuestion <= max + tolerance;
}

export function isBetweenArcAngles(angleInQuestion: number, arc: IPathArc, exclusive: boolean, tolerance = DEFAULT_POINT_MATCHING_DISTANCE): boolean {
    const startAngle = angle.noRevolutions(arc.startAngle);
    const span = angle.ofArcSpan(arc);
    const endAngle = startAngle + span;
    let normalized = angle.noRevolutions(angleInQuestion);
    if (normalized < startAngle) {
        normalized += 360;
    }
    return isBetween(normalized, startAngle, endAngle, exclusive, tolerance);
}

export function isBetweenPoints(pointInQuestion: IPoint, line: IPathLine, exclusive: boolean, tolerance = DEFAULT_POINT_MATCHING_DISTANCE): boolean {
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
    } else if (t < -tolerance || t > 1 + tolerance) {
        return false;
    }
    return true;
}

export function addPathToModel(modelContext: IModel, pathContext: IPath, pathId: string) {
    modelContext.paths = modelContext.paths || {};
    modelContext.paths[pathId] = pathContext;
}

export interface DeletedPathInfo extends IPath {
    reason: string;
    routeKey: string;
}

export function trackDeletedPath(container: { paths: Record<string, IPath> }, deletedPath: IPath, pathId: string, reason: string, routeKey?: string) {
    container.paths[pathId] = deletedPath;
    const info = deletedPath as DeletedPathInfo;
    info.reason = reason;
    if (routeKey) {
        info.routeKey = routeKey;
    }
}

export function pathBoundingBox(pathContext: IPath, offset?: IPoint) {
    return measure.pathExtents(pathContext, offset);
}

export function findPointsOnPath(points: IPoint[], pathContext: IPath, tolerance = DEFAULT_POINT_MATCHING_DISTANCE) {
    const result: IPoint[] = [];
    points.forEach(p => {
        if (isPointOnPath(p, pathContext, tolerance)) {
            result.push(p);
        }
    });
    return result;
}
