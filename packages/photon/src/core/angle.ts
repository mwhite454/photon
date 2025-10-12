import { IPoint, IPathArc, IPathLine, IPath } from './schema.js';
import { round, splitDecimal, pathType } from './maker.js';
import * as point from './point.js';

// TEMP: These will be available after respective modules are converted
declare const paths: any;
declare const chain: any;

export interface IChainLink {
    walkedPath: { pathContext: IPath; };
    reversed: boolean;
}

function getFractionalPart(n: number) {
        return splitDecimal(n)[1];
    }

function setFractionalPart(n: number, fractionalPart: string) {
        if (fractionalPart) {
            return +(splitDecimal(n)[0] + '.' + fractionalPart);
        } else {
            return n;
        }
    }

function copyFractionalPart(src: number, dest: number) {
        if ((src < 0 && dest < 0) || (src > 0 && dest > 0)) {
            return setFractionalPart(dest, getFractionalPart(src));
        }
        return dest;
    }

/** Ensures an angle is not greater than 360 */
export function noRevolutions(angleInDegrees: number) {
        const revolutions = Math.floor(angleInDegrees / 360);
        if (revolutions === 0) return angleInDegrees;
        const a = angleInDegrees - (360 * revolutions);
        return copyFractionalPart(angleInDegrees, a);
    }

/** Convert an angle from degrees to radians. */
export function toRadians(angleInDegrees: number): number {
        return noRevolutions(angleInDegrees) * Math.PI / 180.0;
    }

/** Convert an angle from radians to degrees. */
export function toDegrees(angleInRadians: number): number {
        return angleInRadians * 180.0 / Math.PI;
    }

/** Get an arc's end angle, ensured to be greater than its start angle. */
export function ofArcEnd(arc: IPathArc): number {
        //compensate for values past zero. This allows easy compute of total angle size.
        //for example 0 = 360
        if (arc.endAngle < arc.startAngle) {
            const revolutions = Math.ceil((arc.startAngle - arc.endAngle) / 360);
            const a = revolutions * 360 + arc.endAngle;
            return copyFractionalPart(arc.endAngle, a)
        }
        return arc.endAngle;
    }

/** Get the angle in the middle of an arc's start and end angles. */
export function ofArcMiddle(arc: IPathArc, ratio = .5): number {
        return arc.startAngle + ofArcSpan(arc) * ratio;
    }

/** Total angle of an arc between its start and end angles. */
export function ofArcSpan(arc: IPathArc): number {
    const endAngle = ofArcEnd(arc);
    const a = endAngle - arc.startAngle;
        if (round(a) > 360) {
            return noRevolutions(a);
        } else {
            return a;
        }
    }

/** Angle of a line path. */
export function ofLineInDegrees(line: IPathLine) {
        return noRevolutions(toDegrees(ofPointInRadians(line.origin, line.end)));
    }

/** Angle of a line through a point, in degrees. */
export function ofPointInDegrees(origin: IPoint, pointToFindAngle: IPoint): number {
        return toDegrees(ofPointInRadians(origin, pointToFindAngle));
    }

/** Angle of a line through a point, in radians. */
export function ofPointInRadians(origin: IPoint, pointToFindAngle: IPoint): number {
    const d = point.subtract(pointToFindAngle, origin);
    const x = d[0];
    const y = d[1];
        return Math.atan2(-y, -x) + Math.PI;
    }

/** Mirror an angle on either or both x and y axes. */
export function mirror(angleInDegrees: number, mirrorX: boolean, mirrorY: boolean): number {

        if (mirrorY) {
            angleInDegrees = 360 - angleInDegrees;
        }

        if (mirrorX) {
            angleInDegrees = (angleInDegrees < 180 ? 180 : 540) - angleInDegrees;
        }

        return angleInDegrees;
    }

const linkLineMap: { [pathType: string]: (p: IPath, first: boolean, reversed: boolean) => IPathLine } = {};

linkLineMap[pathType.Arc] = (arc: IPathArc, first: boolean, reversed: boolean) => {
        const fromEnd = first != reversed;
        const angleToRotate = fromEnd ? arc.endAngle - 90 : arc.startAngle + 90;
        const origin = point.fromArc(arc)[fromEnd ? 1 : 0];
        const end = point.rotate(point.add(origin, [arc.radius, 0]), angleToRotate, origin);
        return new paths.Line(first ? [end, origin] : [origin, end]);
    };

linkLineMap[pathType.Line] = (line: IPathLine, first: boolean, reversed: boolean) => {
        return reversed ? new paths.Line(line.end, line.origin) : line;
    };

function getLinkLine(chainLink: IChainLink, first: boolean) {
        if (chainLink) {
            const p = chainLink.walkedPath.pathContext;
            const fn = linkLineMap[p.type];
            if (fn) {
                return fn(p, first, chainLink.reversed);
            }
        }
    }

/** Get the angle of a joint between 2 chain links. */
export function ofChainLinkJoint(linkA: IChainLink, linkB: IChainLink) {
    if (arguments.length < 2) return null;
    const linkLines: IPathLine[] = [linkA, linkB].map((link, i) => getLinkLine(link, i === 0));
    let result = noRevolutions(ofLineInDegrees(linkLines[1]) - ofLineInDegrees(linkLines[0]));
    if (result > 180) result -= 360;
    return result;
}
