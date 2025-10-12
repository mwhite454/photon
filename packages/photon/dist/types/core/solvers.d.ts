import { IPathCircle } from './schema.js';
/** Solves for the altitude of an equilateral triangle when you know its side length. */
export declare function equilateralAltitude(sideLength: number): number;
/** Solves for the side length of an equilateral triangle when you know its altitude. */
export declare function equilateralSide(altitude: number): number;
/** Solves for the angle of a triangle when you know lengths of 3 sides. */
export declare function solveTriangleSSS(lengthA: number, lengthB: number, lengthC: number): number;
/** Solves for the length of a side of a triangle when you know length of one side and 2 angles. */
export declare function solveTriangleASA(oppositeAngleInDegrees: number, lengthOfSideBetweenAngles: number, otherAngleInDegrees: number): number;
/** Solves for the angles of the tangent lines between 2 circles. */
export declare function circleTangentAngles(a: IPathCircle, b: IPathCircle, inner?: boolean): number[];
