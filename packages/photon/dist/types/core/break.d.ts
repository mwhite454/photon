/**
 * Path breaking functions for Maker.js
 * Break paths at specific points
 */
import { IPath, IPoint } from './schema.js';
/**
 * Breaks a path in two. The supplied path will end at the supplied pointOfBreak,
 * a new path is returned which begins at the pointOfBreak and ends at the supplied path's initial end point.
 * For Circle, the original path will be converted in place to an Arc, and null is returned.
 *
 * @param pathToBreak The path to break.
 * @param pointOfBreak The point at which to break the path.
 * @returns A new path of the same type, when path type is line or arc. Returns null for circle.
 */
export declare function breakAtPoint(pathToBreak: IPath, pointOfBreak: IPoint): IPath;
