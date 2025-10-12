import { IPoint, IPathArc, IPathLine, IPath } from './schema.js';
export interface IChainLink {
    walkedPath: {
        pathContext: IPath;
    };
    reversed: boolean;
}
/** Ensures an angle is not greater than 360 */
export declare function noRevolutions(angleInDegrees: number): number;
/** Convert an angle from degrees to radians. */
export declare function toRadians(angleInDegrees: number): number;
/** Convert an angle from radians to degrees. */
export declare function toDegrees(angleInRadians: number): number;
/** Get an arc's end angle, ensured to be greater than its start angle. */
export declare function ofArcEnd(arc: IPathArc): number;
/** Get the angle in the middle of an arc's start and end angles. */
export declare function ofArcMiddle(arc: IPathArc, ratio?: number): number;
/** Total angle of an arc between its start and end angles. */
export declare function ofArcSpan(arc: IPathArc): number;
/** Angle of a line path. */
export declare function ofLineInDegrees(line: IPathLine): number;
/** Angle of a line through a point, in degrees. */
export declare function ofPointInDegrees(origin: IPoint, pointToFindAngle: IPoint): number;
/** Angle of a line through a point, in radians. */
export declare function ofPointInRadians(origin: IPoint, pointToFindAngle: IPoint): number;
/** Mirror an angle on either or both x and y axes. */
export declare function mirror(angleInDegrees: number, mirrorX: boolean, mirrorY: boolean): number;
/** Get the angle of a joint between 2 chain links. */
export declare function ofChainLinkJoint(linkA: IChainLink, linkB: IChainLink): number;
