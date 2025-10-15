import { IPoint, IPath, IPathLine, IPathCircle, IPathArc, IPathIntersection, IPathIntersectionOptions } from './schema.js';
import { pathType, round } from './core.js';
import * as point from './point.js';
import * as angle from './angle.js';
import * as measure from './measure.js';
import * as solvers from './solvers.js';
import { Line, Circle } from './paths.js';
import { moveTemporary, rotate } from './path.js';
import * as equal from './equal.js';

/**
 * @private
 */
interface IPathIntersectionMap {
    [type: string]: { [type: string]: (path1: IPath, path2: IPath, options: IPathIntersectionOptions, swapOffsets?: boolean) => IPathIntersection };
}

/**
 * @private
 */
const map: IPathIntersectionMap = {};

map[pathType.Arc] = {};
map[pathType.Circle] = {};
map[pathType.Line] = {};

map[pathType.Arc][pathType.Arc] = (arc1: IPathArc, arc2: IPathArc, options: IPathIntersectionOptions, swapOffsets: boolean) => {
    let result: IPathIntersection = null;

    moveTemp([arc1, arc2], options, swapOffsets, () => {

        const angles = circleToCircle(arc1, arc2, options);
        if (angles) {
            const arc1Angles = getAnglesWithinArc(angles[0], arc1, options);
            const arc2Angles = getAnglesWithinArc(angles[1], arc2, options);
            if (arc1Angles && arc2Angles) {

                //must correspond to the same angle indexes
                if (arc1Angles.length === 1 || arc2Angles.length === 1) {

                    for (let i1 = 0; i1 < arc1Angles.length; i1++) {
                        for (let i2 = 0; i2 < arc2Angles.length; i2++) {

                            const p1 = point.fromAngleOnCircle(arc1Angles[i1], arc1);
                            const p2 = point.fromAngleOnCircle(arc2Angles[i2], arc2);

                            //if they do not correspond then they don't intersect
                            if (equal.isPointEqual(p1, p2, .0001)) {

                                result = {
                                    intersectionPoints: [p1],
                                    path1Angles: [arc1Angles[i1]],
                                    path2Angles: [arc2Angles[i2]]
                                };

                                return;
                            }
                        }
                    }

                } else {

                    result = {
                        intersectionPoints: pointsFromAnglesOnCircle(arc1Angles, arc1),
                        path1Angles: arc1Angles,
                        path2Angles: arc2Angles
                    };
                }
            }
        } else {
            if (options.out_AreOverlapped) {
                //overlapped for circle, reset and see if arcs actually overlap.

                options.out_AreOverlapped = measure.isArcOverlapping(arc1, arc2, options.excludeTangents);
            }
        }
    });

    return result;
};

map[pathType.Arc][pathType.Circle] = (arc: IPathArc, circle: IPathArc, options: IPathIntersectionOptions, swapOffsets: boolean) => {
    let result: IPathIntersection = null;

    moveTemp([arc, circle], options, swapOffsets, () => {

        const angles = circleToCircle(arc, circle, options);
        if (angles) {
            const arcAngles = getAnglesWithinArc(angles[0], arc, options);
            if (arcAngles) {
                let circleAngles: number[];

                //if both points are on arc, use both on circle
                if (arcAngles.length == 2) {
                    circleAngles = angles[1];
                } else {
                    //use the corresponding point on circle 
                    const index = findCorrespondingAngleIndex(angles[0], arcAngles[0]);
                    circleAngles = [angles[1][index]];
                }

                result = {
                    intersectionPoints: pointsFromAnglesOnCircle(arcAngles, arc),
                    path1Angles: arcAngles,
                    path2Angles: circleAngles
                };
            }
        }
    });

    return result;
};

map[pathType.Arc][pathType.Line] = (arc: IPathArc, line: IPathLine, options: IPathIntersectionOptions, swapOffsets: boolean) => {
    let result: IPathIntersection = null;

    moveTemp([arc, line], options, swapOffsets, () => {

        const angles = lineToCircle(line, arc, options);
        if (angles) {
            const arcAngles = getAnglesWithinArc(angles, arc, options);
            if (arcAngles) {
                result = {
                    intersectionPoints: pointsFromAnglesOnCircle(arcAngles, arc),
                    path1Angles: arcAngles
                };
            }
        }
    });

    return result;
};

map[pathType.Circle][pathType.Arc] = (circle: IPathCircle, arc: IPathArc, options: IPathIntersectionOptions) => {
    const result = map[pathType.Arc][pathType.Circle](arc, circle, options, true);
    if (result) {
        return swapAngles(result);
    }
    return null;
};

map[pathType.Circle][pathType.Circle] = (circle1: IPathCircle, circle2: IPathCircle, options: IPathIntersectionOptions, swapOffsets: boolean) => {
    let result: IPathIntersection = null;

    moveTemp([circle1, circle2], options, swapOffsets, () => {

        const angles = circleToCircle(circle1, circle2, options);
        if (angles) {
            result = {
                intersectionPoints: pointsFromAnglesOnCircle(angles[0], circle1),
                path1Angles: angles[0],
                path2Angles: angles[1]
            };
        }
    });

    return result;
};

map[pathType.Circle][pathType.Line] = (circle: IPathCircle, line: IPathLine, options: IPathIntersectionOptions, swapOffsets: boolean) => {
    let result: IPathIntersection = null;

    moveTemp([circle, line], options, swapOffsets, () => {

        const angles = lineToCircle(line, circle, options);
        if (angles) {
            result = {
                intersectionPoints: pointsFromAnglesOnCircle(angles, circle),
                path1Angles: angles
            };
        }
    });

    return result;
};

map[pathType.Line][pathType.Arc] = (line: IPathLine, arc: IPathArc, options: IPathIntersectionOptions) => {
    const result = map[pathType.Arc][pathType.Line](arc, line, options, true);
    if (result) {
        return swapAngles(result);
    }
    return null;
};

map[pathType.Line][pathType.Circle] = (line: IPathLine, circle: IPathCircle, options: IPathIntersectionOptions) => {
    const result = map[pathType.Circle][pathType.Line](circle, line, options, true);
    if (result) {
        return swapAngles(result);
    }
    return null;
};

map[pathType.Line][pathType.Line] = (line1: IPathLine, line2: IPathLine, options: IPathIntersectionOptions, swapOffsets: boolean) => {
    let result: IPathIntersection = null;

    moveTemp([line1, line2], options, swapOffsets, () => {

        const intersectionPoint = point.fromSlopeIntersection(line1, line2, options);
        if (intersectionPoint) {

            //we have the point of intersection of endless lines, now check to see if the point is between both segemnts
            if (measure.isBetweenPoints(intersectionPoint, line1, options.excludeTangents) && measure.isBetweenPoints(intersectionPoint, line2, options.excludeTangents)) {
                result = {
                    intersectionPoints: [intersectionPoint]
                };
            }
        }
    });

    return result;
};

/**
 * @private
 */
function moveTemp(pathsToOffset: IPath[], options: IPathIntersectionOptions, swapOffsets: boolean, task: Function) {
    const offsets = swapOffsets ? [options.path2Offset, options.path1Offset] : [options.path1Offset, options.path2Offset];
    moveTemporary(pathsToOffset, offsets, task);
}

/**
 * @private
 */
function swapAngles(result: IPathIntersection) {
    const temp = result.path1Angles;

    if (result.path2Angles) {
        result.path1Angles = result.path2Angles;
    } else {
        delete result.path1Angles;
    }

    if (temp) {
        result.path2Angles = temp;
    }

    return result;
}

/**
 * Find the point(s) where 2 paths intersect.
 * 
 * @param path1 First path to find intersection.
 * @param path2 Second path to find intersection.
 * @param options Optional IPathIntersectionOptions.
 * @returns IPathIntersection object, with points(s) of intersection (and angles, when a path is an arc or circle); or null if the paths did not intersect.
 */
export function intersection(path1: IPath, path2: IPath, options: IPathIntersectionOptions = {}): IPathIntersection {

    if (path1 && path2) {
        const fn = map[path1.type][path2.type];
        if (fn) {
            return fn(path1, path2, options);
        }
    }
    return null;
}

/**
 * @private
 */
function findCorrespondingAngleIndex(circleAngles: number[], arcAngle: number): number {
    for (let i = 2; i--;) {
        if (circleAngles[i] === arcAngle) return i;
    }
    return -1;
}

/**
 * @private
 */
function pointsFromAnglesOnCircle(anglesInDegrees: number[], circle: IPathCircle): IPoint[] {
    const result: IPoint[] = [];
    for (let i = 0; i < anglesInDegrees.length; i++) {
        result.push(point.fromAngleOnCircle(anglesInDegrees[i], circle));
    }
    return result;
}

/**
 * @private
 */
function getAnglesWithinArc(angles: number[], arc: IPathArc, options: IPathIntersectionOptions): number[] {

    if (!angles) return null;

    const anglesWithinArc: number[] = [];

    for (let i = 0; i < angles.length; i++) {
        if (measure.isBetweenArcAngles(angles[i], arc, options.excludeTangents)) {
            anglesWithinArc.push(angles[i]);
        }
    }

    if (anglesWithinArc.length == 0) return null;

    return anglesWithinArc;
}

/**
 * @private
 */
function lineToCircle(line: IPathLine, circle: IPathCircle, options: IPathIntersectionOptions): number[] {

    const radius = round(circle.radius);

    //no-op for degenerate circle
    if (circle.radius <= 0) {
        return null;
    }

    //clone the line
    const clonedLine = new Line(point.subtract(line.origin, circle.origin), point.subtract(line.end, circle.origin));

    //get angle of line
    const lineAngleNormal = angle.ofLineInDegrees(line);

    //use the positive horizontal angle
    const lineAngle = (lineAngleNormal >= 180) ? lineAngleNormal - 360 : lineAngleNormal;

    //rotate the line to horizontal
    rotate(clonedLine, -lineAngle, point.zero());

    //remember how to undo the rotation we just did
    const unRotate = (resultAngle: number): number => {
        const unrotated = resultAngle + lineAngle;
        return round(angle.noRevolutions(unrotated));
    }

    //line is horizontal, get the y value from any point
    const lineY = round(clonedLine.origin[1]);
    const lineYabs = Math.abs(lineY);

    //if y is greater than radius, there is no intersection
    if (lineYabs > radius) {
        return null;
    }

    const anglesOfIntersection: number[] = [];

    //if horizontal Y is the same as the radius, we know it's 90 degrees
    if (lineYabs == radius) {

        if (options.excludeTangents) {
            return null;
        }

        anglesOfIntersection.push(unRotate(lineY > 0 ? 90 : 270));

    } else {

        const intersectionBetweenEndpoints = (x: number, angleOfX: number) => {
            if (measure.isBetween(round(x), round(clonedLine.origin[0]), round(clonedLine.end[0]), options.excludeTangents)) {
                anglesOfIntersection.push(unRotate(angleOfX));
            }
        }

        //find angle where line intersects
        const intersectRadians = Math.asin(lineY / radius);
        const intersectDegrees = angle.toDegrees(intersectRadians);

        //line may intersect in 2 places
        const intersectX = Math.cos(intersectRadians) * radius;
        intersectionBetweenEndpoints(-intersectX, 180 - intersectDegrees);
        intersectionBetweenEndpoints(intersectX, intersectDegrees);
    }

    if (anglesOfIntersection.length > 0) {
        return anglesOfIntersection;
    }

    return null;
}

/**
 * @private
 */
function circleToCircle(circle1: IPathCircle, circle2: IPathCircle, options: IPathIntersectionOptions): number[][] {

    //no-op if either circle is degenerate
    if (circle1.radius <= 0 || circle2.radius <= 0) {
        return null;
    }

    //see if circles are the same
    if (circle1.radius == circle2.radius && equal.isPointEqual(circle1.origin, circle2.origin, .0001)) {
        options.out_AreOverlapped = true;
        return null;
    }

    //clone circle1 and move to origin
    const c1 = new Circle(point.zero(), circle1.radius);

    //clone circle2 and move relative to circle1
    const c2 = new Circle(point.subtract(circle2.origin, circle1.origin), circle2.radius);

    //rotate circle2 to horizontal, c2 will be to the right of the origin.
    const c2Angle = angle.ofPointInDegrees(point.zero(), c2.origin);
    rotate(c2, -c2Angle, point.zero());

    const unRotate = (resultAngle: number): number => {
        const unrotated = resultAngle + c2Angle;
        return angle.noRevolutions(unrotated);
    }

    //get X of c2 origin
    const x = c2.origin[0];

    //see if circles are tangent interior on left side
    if (round(c2.radius - x - c1.radius) == 0) {

        if (options.excludeTangents) {
            return null;
        }

        return [[unRotate(180)], [unRotate(180)]];
    }

    //see if circles are tangent interior on right side
    if (round(c2.radius + x - c1.radius) == 0) {

        if (options.excludeTangents) {
            return null;
        }

        return [[unRotate(0)], [unRotate(0)]];
    }

    //see if circles are tangent exterior
    if (round(x - c2.radius - c1.radius) == 0) {

        if (options.excludeTangents) {
            return null;
        }

        return [[unRotate(0)], [unRotate(180)]];
    }

    //see if c2 is outside of c1
    if (round(x - c2.radius) > c1.radius) {
        return null;
    }

    //see if c2 is within c1
    if (round(x + c2.radius) < c1.radius) {
        return null;
    }

    //see if c1 is within c2
    if (round(x - c2.radius) < -c1.radius) {
        return null;
    }

    const bothAngles = (oneAngle: number): number[] => {
        return [unRotate(oneAngle), unRotate(angle.mirror(oneAngle, false, true))];
    }

    const c1IntersectionAngle = solvers.solveTriangleSSS(c2.radius, c1.radius, x);
    const c2IntersectionAngle = solvers.solveTriangleSSS(c1.radius, x, c2.radius);

    return [bothAngles(c1IntersectionAngle), bothAngles(180 - c2IntersectionAngle)];
}
