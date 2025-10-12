import { IModel, IPathMap } from '../core/schema.js';
export declare class BoltCircle implements IModel {
    paths: IPathMap;
    constructor(boltRadius: number, holeRadius: number, boltCount: number, firstBoltAngleInDegrees?: number);
}
