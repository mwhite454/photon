import { IModel, IPath, IPoint } from './schema.js';
import { ICombineOptions } from './maker.js';
export declare function isPathInsideModel(pathContext: IPath, modelContext: IModel, pathOffset?: IPoint, farPoint?: IPoint, measureAtlas?: any): boolean;
export declare function breakPathsAtIntersections(modelToBreak: IModel, modelToIntersect?: IModel): IModel;
export declare function combine(modelA: IModel, modelB: IModel, includeAInsideB?: boolean, includeAOutsideB?: boolean, includeBInsideA?: boolean, includeBOutsideA?: boolean, options?: ICombineOptions): IModel;
export declare function combineIntersection(modelA: IModel, modelB: IModel): IModel;
export declare function combineSubtraction(modelA: IModel, modelB: IModel): IModel;
export declare function combineUnion(modelA: IModel, modelB: IModel): IModel;
