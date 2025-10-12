import { IModel, IPath, IPathArc, IPathCircle, IPathLine, IPoint } from './schema.js';
export declare const DEFAULT_POINT_MATCHING_DISTANCE = 0.005;
export interface SegmentClassification {
    isInside: boolean;
    isDuplicate: boolean;
}
export type SegmentClassifier = (segmentPath: IPath) => SegmentClassification;
export declare function isZeroLength(pathContext: IPath, tolerance?: number): boolean;
export declare function isCircleOrArc(pathContext: IPath): pathContext is IPathArc | IPathCircle;
export declare function isArcEnclosingAngle(arc: IPathArc, angleInQuestion: number, exclusive?: boolean): boolean;
export declare function ensurePathLayer(source: IPath, target: IPath): void;
export declare function isBetween(valueInQuestion: number, limitA: number, limitB: number, exclusive: boolean, tolerance?: number): boolean;
export declare function isBetweenArcAngles(angleInQuestion: number, arc: IPathArc, exclusive: boolean, tolerance?: number): boolean;
export declare function isBetweenPoints(pointInQuestion: IPoint, line: IPathLine, exclusive: boolean, tolerance?: number): boolean;
export declare function addPathToModel(modelContext: IModel, pathContext: IPath, pathId: string): void;
export interface DeletedPathInfo extends IPath {
    reason: string;
    routeKey: string;
}
export declare function trackDeletedPath(container: {
    paths: Record<string, IPath>;
}, deletedPath: IPath, pathId: string, reason: string, routeKey?: string): void;
export declare function pathBoundingBox(pathContext: IPath, offset?: IPoint): import("./maker.js").IMeasure;
export declare function findPointsOnPath(points: IPoint[], pathContext: IPath, tolerance?: number): IPoint[];
