import type { IModel } from './schema.js';
import { IChain } from './core.js';
export declare function chainDogbone(chainToFillet: IChain, filletSpec: number | {
    left?: number;
    right?: number;
}): IModel | null;
export declare function chainFillet(chainToFillet: IChain, filletSpec: number | {
    left?: number;
    right?: number;
}): IModel | null;
