/**
 * Path breaking functions for Maker.js
 * Break paths at specific points
 */

import { IPath, IPoint, IPathArc, IPathCircle, IPathLine } from './schema.js';
import { cloneObject, pathType } from './core.js';
import * as angle from './angle.js';
import { isAngleEqual } from './equal.js';

function isBetween(valueInQuestion: number, limitA: number, limitB: number, exclusive: boolean): boolean {
    if (exclusive) {
        return Math.min(limitA, limitB) < valueInQuestion && valueInQuestion < Math.max(limitA, limitB);
    }
    return Math.min(limitA, limitB) <= valueInQuestion && valueInQuestion <= Math.max(limitA, limitB);
}

function isBetweenArcAngles(angleInQuestion: number, arc: IPathArc, exclusive: boolean): boolean {
    const startAngle = angle.noRevolutions(arc.startAngle);
    const span = angle.ofArcSpan(arc);
    const endAngle = startAngle + span;
    let normalized = angle.noRevolutions(angleInQuestion);
    if (normalized < startAngle) {
        normalized += 360;
    }
    return isBetween(normalized, startAngle, endAngle, exclusive);
}

function isBetweenPoints(pointInQuestion: IPoint, line: IPathLine, exclusive: boolean): boolean {
    let oneDimension = false;
    for (let i = 2; i--;) {
        if (Math.abs(line.origin[i] - line.end[i]) < 0.000001) {
            oneDimension = true;
        } else {
            const originValue = Math.round(line.origin[i] * 1000000) / 1000000;
            const endValue = Math.round(line.end[i] * 1000000) / 1000000;
            const pointValue = Math.round(pointInQuestion[i] * 1000000) / 1000000;
            if (exclusive) {
                if (!isBetween(pointValue, originValue, endValue, true)) {
                    return false;
                }
            } else if (!(pointValue >= Math.min(originValue, endValue) && pointValue <= Math.max(originValue, endValue))) {
                return false;
            }
        }
    }
    return oneDimension;
}

/**
 * @private
 */
interface IBreakPathFunctionMap {
    [type: string]: (path: IPath, pointOfBreak: IPoint) => IPath;
}

/**
 * @private
 */
const breakPathFunctionMap: IBreakPathFunctionMap = {};

breakPathFunctionMap[pathType.Arc] = (arc: IPathArc, pointOfBreak: IPoint): IPath => {

    const angleAtBreakPoint = angle.ofPointInDegrees(arc.origin, pointOfBreak);

    if (isAngleEqual(angleAtBreakPoint, arc.startAngle) || isAngleEqual(angleAtBreakPoint, arc.endAngle)) {
        return null;
    }

    const getAngleStrictlyBetweenArcAngles = () => {
        const startAngle = angle.noRevolutions(arc.startAngle);
        const endAngle = startAngle + angle.ofArcEnd(arc) - arc.startAngle;

        const tries = [0, 1, -1];
        for (let i = 0; i < tries.length; i++) {
            const add = + 360 * tries[i];
            if (isBetween(angleAtBreakPoint + add, startAngle, endAngle, true)) {
                return arc.startAngle + angleAtBreakPoint + add - startAngle;
            }
        }
        return null;
    };

    const angleAtBreakPointBetween = getAngleStrictlyBetweenArcAngles();
    if (angleAtBreakPointBetween == null) {
        return null;
    }

    const savedEndAngle = arc.endAngle;

    arc.endAngle = angleAtBreakPointBetween;

    //clone the original to carry other properties
    const copy = cloneObject(arc) as IPathArc;
    copy.startAngle = angleAtBreakPointBetween;
    copy.endAngle = savedEndAngle;

    return copy;
};

breakPathFunctionMap[pathType.Circle] = (circle: IPathCircle, pointOfBreak: IPoint): IPath => {

    //breaking a circle turns it into an arc
    circle.type = pathType.Arc;

    const arc: IPathArc = <IPathArc>circle;

    const angleAtBreakPoint = angle.ofPointInDegrees(circle.origin, pointOfBreak);

    arc.startAngle = angleAtBreakPoint;
    arc.endAngle = angleAtBreakPoint + 360;

    return null;
};

breakPathFunctionMap[pathType.Line] = (line: IPathLine, pointOfBreak: IPoint): IPath => {

    if (!isBetweenPoints(pointOfBreak, line, true)) {
        return null;
    }

    const savedEndPoint = line.end;

    line.end = pointOfBreak;

    //clone the original to carry other properties
    const copy = cloneObject(line) as IPathLine;
    copy.origin = pointOfBreak;
    copy.end = savedEndPoint;

    return copy;
};

/**
 * Breaks a path in two. The supplied path will end at the supplied pointOfBreak, 
 * a new path is returned which begins at the pointOfBreak and ends at the supplied path's initial end point.
 * For Circle, the original path will be converted in place to an Arc, and null is returned.
 * 
 * @param pathToBreak The path to break.
 * @param pointOfBreak The point at which to break the path.
 * @returns A new path of the same type, when path type is line or arc. Returns null for circle.
 */
export function breakAtPoint(pathToBreak: IPath, pointOfBreak: IPoint): IPath {
    if (pathToBreak && pointOfBreak) {
        const fn = breakPathFunctionMap[pathToBreak.type];
        if (fn) {
            const result = fn(pathToBreak, pointOfBreak);

            if (result && ('layer' in pathToBreak)) {
                result.layer = pathToBreak.layer;
            }

            return result;
        }
    }
    return null;
}
