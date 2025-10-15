/**
 * Chain finding and manipulation functions for Maker.js
 * Chains are paths that connect at endpoints
 */
import { IModel, IPoint } from './schema.js';
import { IChain, IFindChainsOptions, IChainCallback, IChainsMap } from './core.js';
/**
 * Find a single chain within a model, across all layers. Shorthand of findChains; useful when you know there is only one chain to find in your model.
 *
 * @param modelContext The model to search for a chain.
 * @returns A chain object or null if chains were not found.
 */
export declare function findSingleChain(modelContext: IModel): IChain;
/**
 * Find paths that have common endpoints and form chains.
 *
 * @param modelContext The model to search for chains.
 * @param options Optional options object.
 * @returns An array of chains, or a map (keyed by layer id) of arrays of chains - if options.byLayers is true.
 */
export declare function findChains(modelContext: IModel, options?: IFindChainsOptions): IChain[] | IChainsMap;
/**
 * Find paths that have common endpoints and form chains.
 *
 * @param modelContext The model to search for chains.
 * @param callback Callback function when chains are found.
 * @param options Optional options object.
 * @returns An array of chains, or a map (keyed by layer id) of arrays of chains - if options.byLayers is true.
 */
export declare function findChains(modelContext: IModel, callback: IChainCallback, options?: IFindChainsOptions): IChain[] | IChainsMap;
/**
 * Shift the links of an endless chain.
 *
 * @param chainContext Chain to cycle through. Must be endless.
 * @param amount Optional number of links to shift. May be negative to cycle backwards.
 * @returns The chainContext for cascading.
 */
export declare function cycle(chainContext: IChain, amount?: number): IChain;
/**
 * Reverse the links of a chain.
 *
 * @param chainContext Chain to reverse.
 * @returns The chainContext for cascading.
 */
export declare function reverse(chainContext: IChain): IChain;
/**
 * Set the beginning of an endless chain to a known routeKey of a path.
 *
 * @param chainContext Chain to cycle through. Must be endless.
 * @param routeKey RouteKey of the desired path to start the chain with.
 * @returns The chainContext for cascading.
 */
export declare function startAt(chainContext: IChain, routeKey: string): IChain;
/**
 * Convert a chain to a new model, independent of any model from where the chain was found.
 *
 * @param chainContext Chain to convert to a model.
 * @param detachFromOldModel Flag to remove the chain's paths from their current parent model. If false, each path will be cloned. If true, the original path will be re-parented into the resulting new model. Default is false.
 * @returns A new model containing paths from the chain.
 */
export declare function toNewModel(chainContext: IChain, detachFromOldModel?: boolean): IModel;
/**
 * Get points along a chain of paths.
 *
 * @param chainContext Chain of paths to get points from.
 * @param distance Numeric distance along the chain between points, or numeric array of distances along the chain between each point.
 * @param maxPoints Maximum number of points to retrieve.
 * @returns Array of points which are on the chain spread at a uniform interval.
 */
export declare function toPoints(chainContext: IChain, distanceOrDistances: number | number[], maxPoints?: number): IPoint[];
/**
 * Get key points (a minimal a number of points) along a chain of paths.
 *
 * @param chainContext Chain of paths to get points from.
 * @param maxArcFacet The maximum length between points on an arc or circle.
 * @returns Array of points which are on the chain.
 */
export declare function toKeyPoints(chainContext: IChain, maxArcFacet?: number): IPoint[];
