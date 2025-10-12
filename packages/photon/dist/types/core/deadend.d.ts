import { IModel } from './schema.js';
import { IWalkPath, IWalkPathBooleanCallback } from './maker.js';
/**
 * Remove paths from a model which have endpoints that do not connect to other paths.
 *
 * @param modelContext The model to search for dead ends.
 * @param pointMatchingDistance Optional max distance to consider two points as the same.
 * @param keep Optional callback function (which should return a boolean) to decide if a dead end path should be kept instead.
 * @param trackDeleted Optional callback function which will log discarded paths and the reason they were discarded.
 * @returns The input model (for cascading).
 */
export declare function removeDeadEnds(modelContext: IModel, pointMatchingDistance?: number, keep?: IWalkPathBooleanCallback, trackDeleted?: (wp: IWalkPath, reason: string) => void): IModel;
