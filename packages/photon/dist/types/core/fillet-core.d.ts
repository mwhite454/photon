import { IPoint, IPath, IPathLine } from './schema.js';
import type { IPointMatchOptions } from './maker.js';
/** @private */
interface IPointProperty {
    point: IPoint;
    propertyName: string;
}
/** @private */
export interface IMatchPointProperty extends IPointProperty {
    path: IPath;
    isStart: boolean;
    oppositePoint: IPoint;
    shardPoint?: IPoint;
}
/** @private */
export interface IFilletResult {
    filletAngle: number;
    clipPath: () => void;
}
/** @private */
export declare function getPointProperties(pathToInspect: IPath): IPointProperty[];
/** @private */
export declare function getMatchingPointProperties(pathA: IPath, pathB: IPath, _options?: IPointMatchOptions): IMatchPointProperty[];
/** @private */
export declare function populateShardPointsFromReferenceCircle(filletRadius: number, center: IPoint, properties: IMatchPointProperty[], _options: IPointMatchOptions): boolean;
/** @private */
export declare function cloneAndBreakPath(pathToShard: IPath, shardPoint: IPoint): IPath[];
/** @private */
export declare function getGuidePath(context: IMatchPointProperty, filletRadius: number, nearPoint: IPoint): IPath;
/** @private */
export declare function getFilletResult(context: IMatchPointProperty, filletRadius: number, filletCenter: IPoint): IFilletResult;
/** @private */
export declare function getDogboneResult(context: IMatchPointProperty, filletCenter: IPoint): IFilletResult;
/** @private */
export declare function testFilletResult(context: IMatchPointProperty, result: IFilletResult): boolean;
/** @private */
export declare function getLineRatio(lines: IPathLine[]): number;
export {};
