import { IPathCircle } from './schema.js';
import { round } from './maker.js';
import * as angle from './angle.js';
import * as path from './path.js';
import * as paths from './paths.js';

// TEMP: These will be available after respective modules are converted
declare const measure: any;

const equilateral = Math.sqrt(3) / 2;

/** Solves for the altitude of an equilateral triangle when you know its side length. */
export function equilateralAltitude(sideLength: number) {
    return sideLength * equilateral;
}

/** Solves for the side length of an equilateral triangle when you know its altitude. */
export function equilateralSide(altitude: number) {
    return altitude / equilateral;
}

/** Solves for the angle of a triangle when you know lengths of 3 sides. */
export function solveTriangleSSS(lengthA: number, lengthB: number, lengthC: number): number {
    return angle.toDegrees(Math.acos((lengthB * lengthB + lengthC * lengthC - lengthA * lengthA) / (2 * lengthB * lengthC)));
}

/** Solves for the length of a side of a triangle when you know length of one side and 2 angles. */
export function solveTriangleASA(oppositeAngleInDegrees: number, lengthOfSideBetweenAngles: number, otherAngleInDegrees: number): number {
    const angleOppositeSide = 180 - oppositeAngleInDegrees - otherAngleInDegrees;
    return (lengthOfSideBetweenAngles * Math.sin(angle.toRadians(oppositeAngleInDegrees))) / Math.sin(angle.toRadians(angleOppositeSide));
}

/** Solves for the angles of the tangent lines between 2 circles. */
export function circleTangentAngles(a: IPathCircle, b: IPathCircle, inner = false): number[] {
    const connect = new paths.Line(a.origin, b.origin);
    const distance = measure.pointDistance(a.origin, b.origin);

    // no tangents if either circle encompasses the other
    if (a.radius >= distance + b.radius || b.radius >= distance + a.radius) return null;

    // no inner tangents when circles touch or overlap
    if (inner && (a.radius + b.radius >= distance)) return null;

    let tangentAngles: number[];

    if (!inner && round(a.radius - b.radius) == 0) {
        tangentAngles = [90, 270];
    } else {
        // solve for circles on the x axis at the distance
        const d2 = distance / 2;
        const between = new paths.Circle([d2, 0], d2);
        const diff = new paths.Circle(a.radius > b.radius ? [0, 0] : [distance, 0], inner ? (a.radius + b.radius) : Math.abs(a.radius - b.radius));
        const int = path.intersection(diff, between);

        if (!int || !int.path1Angles) return null;

        tangentAngles = int.path1Angles;
    }

    const connectAngle = angle.ofLineInDegrees(connect);

    // add the line's angle to the result
    return tangentAngles.map(a => angle.noRevolutions(a + connectAngle));
}