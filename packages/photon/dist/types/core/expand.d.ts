import type { ICombineOptions } from './maker.js';
import type { IModel, IPath, IPathArc } from './schema.js';
export declare function expand(pathToExpand: IPath, expansion: number, isolateCaps?: boolean): IModel | null;
export declare function straighten(arc: IPathArc, bevel?: boolean, prefix?: string, close?: boolean): IModel;
export declare function expandPaths(modelToExpand: IModel, distance: number, joints?: number, combineOptions?: ICombineOptions): IModel | null;
export declare function outline(modelToOutline: IModel, distance: number, joints?: number, inside?: boolean, options?: ICombineOptions): IModel | null;
