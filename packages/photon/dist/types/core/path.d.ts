import { IPoint, IPath, IPathLine, IModel } from './schema.js';
export interface IChain {
    links: Array<{
        walkedPath: {
            pathId: string;
            pathContext: IPath;
        };
    }>;
}
export interface IWalkPath {
    pathContext: IPath;
}
/** Add a path to a model. */
export declare function addTo(childPath: IPath, parentModel: IModel, pathId: string, overwrite?: boolean): IPath;
/** Create a clone of a path. This is faster than cloneObject. */
export declare function clone(pathToClone: IPath, offset?: IPoint): IPath;
/** Copy the schema properties of one path to another. */
export declare function copyProps(srcPath: IPath, destPath: IPath): IPath;
/** Set the layer of a path. */
export declare function layer(pathContext: IPath, layer: string): IPath;
/** Create a clone of a path, mirrored on either or both x and y axes. */
export declare function mirror(pathToMirror: IPath, mirrorX: boolean, mirrorY: boolean): IPath;
/** Move a path to an absolute point. */
export declare function move(pathToMove: IPath, origin: IPoint): IPath;
/** Move a path's origin by a relative amount. */
export declare function moveRelative(pathToMove: IPath, delta: IPoint, subtract?: boolean): IPath;
/** Move some paths relatively during a task execution, then unmove them. */
export declare function moveTemporary(pathsToMove: IPath[], deltas: IPoint[], task: Function): void;
/** Rotate a path. */
export declare function rotate(pathToRotate: IPath, angleInDegrees: number, rotationOrigin?: IPoint): IPath;
/** Scale a path. */
export declare function scale(pathToScale: IPath, scaleValue: number): IPath;
/** Distort a path - scale x and y individually. */
export declare function distort(pathToDistort: IPath, scaleX: number, scaleY: number): IModel | IPath;
/** Connect 2 lines at their slope intersection point. */
export declare function converge(lineA: IPathLine, lineB: IPathLine, useOriginA?: boolean, useOriginB?: boolean): IPoint;
/** Alter a path by lengthening or shortening it. */
export declare function alterLength(pathToAlter: IPath, distance: number, useOrigin?: boolean): IPath;
/** Get points along a path. */
export declare function toPoints(pathContext: IPath, numberOfPoints: number): IPoint[];
/** Get key points (a minimal a number of points) along a path. */
export declare function toKeyPoints(pathContext: IPath, maxArcFacet?: number): IPoint[];
/** Center a path at [0, 0]. */
export declare function center(pathToCenter: IPath): IPath;
/** Move a path so its bounding box begins at [0, 0]. */
export declare function zero(pathToZero: IPath): IPath;
