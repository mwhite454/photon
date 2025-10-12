import { IModel, IPathMap } from '../core/schema.js';
export declare class Dome implements IModel {
    paths: IPathMap;
    constructor(width: number, height: number, radius?: number, bottomless?: boolean);
}
