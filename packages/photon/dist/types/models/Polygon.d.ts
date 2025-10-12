import { IModel, IPoint, IPathMap } from '../core/schema.js';
export declare class Polygon implements IModel {
    paths: IPathMap;
    constructor(numberOfSides: number, radius: number, firstCornerAngleInDegrees?: number, circumscribed?: boolean);
    static circumscribedRadius(radius: number, angleInRadians: number): number;
    static getPoints(numberOfSides: number, radius: number, firstCornerAngleInDegrees?: number, circumscribed?: boolean): IPoint[];
}
