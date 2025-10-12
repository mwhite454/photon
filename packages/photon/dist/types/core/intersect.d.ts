import { IPath, IPathIntersection, IPathIntersectionOptions } from './schema.js';
/**
 * Find the point(s) where 2 paths intersect.
 *
 * @param path1 First path to find intersection.
 * @param path2 Second path to find intersection.
 * @param options Optional IPathIntersectionOptions.
 * @returns IPathIntersection object, with points(s) of intersection (and angles, when a path is an arc or circle); or null if the paths did not intersect.
 */
export declare function intersection(path1: IPath, path2: IPath, options?: IPathIntersectionOptions): IPathIntersection;
