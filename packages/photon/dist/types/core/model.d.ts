import { IModel, IPoint, IPath, ICaption } from './schema.js';
import type { IWalkOptions, IModelPathCallback, IChain, IChainCallback, IFindChainsOptions, IChainsMap } from './core.js';
export declare function findChains(modelContext: IModel, callbackOrOptions?: IChainCallback | IFindChainsOptions, maybeOptions?: IFindChainsOptions): IChain[] | IChainsMap;
export declare function findSingleChain(modelContext: IModel): IChain;
/** Add a Caption object to a model. */
export declare function addCaption(modelContext: IModel, text: string, leftAnchorPoint?: IPoint, rightAnchorPoint?: IPoint): IModel;
/**
 * Add a path as a child. This is basically equivalent to:
 * ```
 * parentModel.paths[childPathId] = childPath;
 * ```
 * with additional checks to make it safe for cascading.
 *
 * @param modelContext The model to add to.
 * @param pathContext The path to add.
 * @param pathId The id of the path.
 * @param overWrite Optional flag to overwrite any path referenced by pathId. Default is false, which will create an id similar to pathId.
 * @returns The original model (for cascading).
 */
export declare function addPath(modelContext: IModel, pathContext: IPath, pathId: string, overWrite?: boolean): IModel;
/**
 * Add a model as a child. This is basically equivalent to:
 * ```
 * parentModel.models[childModelId] = childModel;
 * ```
 * with additional checks to make it safe for cascading.
 *
 * @param parentModel The model to add to.
 * @param childModel The model to add.
 * @param childModelId The id of the child model.
 * @param overWrite Optional flag to overwrite any model referenced by childModelId. Default is false, which will create an id similar to childModelId.
 * @returns The original model (for cascading).
 */
export declare function addModel(parentModel: IModel, childModel: IModel, childModelId: string, overWrite?: boolean): IModel;
/**
 * Add a model as a child of another model. This is basically equivalent to:
 * ```
 * parentModel.models[childModelId] = childModel;
 * ```
 * with additional checks to make it safe for cascading.
 *
 * @param childModel The model to add.
 * @param parentModel The model to add to.
 * @param childModelId The id of the child model.
 * @param overWrite Optional flag to overwrite any model referenced by childModelId. Default is false, which will create an id similar to childModelId.
 * @returns The original model (for cascading).
 */
export declare function addTo(childModel: IModel, parentModel: IModel, childModelId: string, overWrite?: boolean): IModel;
/**
 * Clone a model. Alias of makerjs.cloneObject(modelToClone)
 *
 * @param modelToClone The model to clone.
 * @returns A clone of the model you passed.
 */
export declare function clone(modelToClone: IModel): IModel;
/**
 * Count the number of child models within a given model.
 *
 * @param modelContext The model containing other models.
 * @returns Number of child models.
 */
export declare function countChildModels(modelContext: IModel): number;
/**
 * Gets all Caption objects, in absolute position, in this model and its children.
 * @param modelContext The model to search for Caption objects.
 * @returns Array of Caption objects.
 */
export declare function getAllCaptionsOffset(modelContext: IModel): (ICaption & {
    layer?: string;
})[];
/**
 * Get an unused id in the models map with the same prefix.
 *
 * @param modelContext The model containing the models map.
 * @param modelId The id to use directly (if unused), or as a prefix.
 */
export declare function getSimilarModelId(modelContext: IModel, modelId: string): string;
/**
 * Get an unused id in the paths map with the same prefix.
 *
 * @param modelContext The model containing the paths map.
 * @param pathId The id to use directly (if unused), or as a prefix.
 */
export declare function getSimilarPathId(modelContext: IModel, pathId: string): string;
/**
 * Set the layer of a model. This is equivalent to:
 * ```
 * modelContext.layer = layer;
 * ```
 *
 * @param modelContext The model to set the layer.
 * @param layer The layer name.
 * @returns The original model (for cascading).
 */
export declare function layer(modelContext: IModel, layer: string): IModel;
/**
 * Moves all of a model's children (models and paths, recursively) in reference to a single common origin. Useful when points between children need to connect to each other.
 *
 * @param modelToOriginate The model to originate.
 * @param origin Optional offset reference point.
 * @returns The original model (for cascading).
 */
export declare function originate(modelToOriginate: IModel, origin?: IPoint): IModel;
/**
 * Center a model at [0, 0].
 *
 * @param modelToCenter The model to center.
 * @param centerX Boolean to center on the x axis. Default is true.
 * @param centerY Boolean to center on the y axis. Default is true.
 * @returns The original model (for cascading).
 */
export declare function center(modelToCenter: IModel, centerX?: boolean, centerY?: boolean): IModel;
/**
 * Create a clone of a model, mirrored on either or both x and y axes.
 *
 * @param modelToMirror The model to mirror.
 * @param mirrorX Boolean to mirror on the x axis.
 * @param mirrorY Boolean to mirror on the y axis.
 * @returns Mirrored model.
 */
export declare function mirror(modelToMirror: IModel, mirrorX: boolean, mirrorY: boolean): IModel;
/**
 * Move a model to an absolute point. Note that this is also accomplished by directly setting the origin property. This function exists for cascading.
 *
 * @param modelToMove The model to move.
 * @param origin The new position of the model.
 * @returns The original model (for cascading).
 */
export declare function move(modelToMove: IModel, origin: IPoint): IModel;
/**
 * Move a model's origin by a relative amount.
 *
 * @param modelToMove The model to move.
 * @param delta The x & y adjustments as a point object.
 * @returns The original model (for cascading).
 */
export declare function moveRelative(modelToMove: IModel, delta: IPoint): IModel;
/**
 * Prefix the ids of paths in a model.
 *
 * @param modelToPrefix The model to prefix.
 * @param prefix The prefix to prepend on paths ids.
 * @returns The original model (for cascading).
 */
export declare function prefixPathIds(modelToPrefix: IModel, prefix: string): IModel;
/**
 * Rotate a model.
 *
 * @param modelToRotate The model to rotate.
 * @param angleInDegrees The amount of rotation, in degrees.
 * @param rotationOrigin The center point of rotation.
 * @returns The original model (for cascading).
 */
export declare function rotate(modelToRotate: IModel, angleInDegrees: number, rotationOrigin?: IPoint): IModel;
/**
 * Scale a model.
 *
 * @param modelToScale The model to scale.
 * @param scaleValue The amount of scaling.
 * @param scaleOrigin Optional boolean to scale the origin point. Typically false for the root model.
 * @returns The original model (for cascading).
 */
export declare function scale(modelToScale: IModel, scaleValue: number, scaleOrigin?: boolean): IModel;
/**
 * Create a distorted copy of a model - scale x and y individually.
 *
 * @param modelToDistort The model to distort.
 * @param scaleX The amount of x scaling.
 * @param scaleY The amount of y scaling.
 * @param scaleOrigin Optional boolean to scale the origin point. Typically false for the root model.
 * @param bezierAccuracy Optional accuracy of Bezier curves.
 * @returns New model (for cascading).
 */
export declare function distort(modelToDistort: IModel, scaleX: number, scaleY: number, scaleOrigin?: boolean, bezierAccuracy?: number): IModel;
/**
 * Convert a model to match a different unit system.
 *
 * @param modeltoConvert The model to convert.
 * @param destUnitType The unit system.
 * @returns The scaled model (for cascading).
 */
export declare function convertUnits(modeltoConvert: IModel, destUnitType: string): IModel;
/**
 * DEPRECATED - use model.walk instead.
 * Recursively walk through all paths for a given model.
 *
 * @param modelContext The model to walk.
 * @param callback Callback for each path.
 */
export declare function walkPaths(modelContext: IModel, callback: IModelPathCallback): void;
/**
 * Recursively walk through all child models and paths for a given model.
 *
 * @param modelContext The model to walk.
 * @param options Object containing callbacks.
 * @returns The original model (for cascading).
 */
export declare function walk(modelContext: IModel, options: IWalkOptions): IModel;
/**
 * Move a model so its bounding box begins at [0, 0].
 *
 * @param modelToZero The model to zero.
 * @param zeroX Boolean to zero on the x axis. Default is true.
 * @param zeroY Boolean to zero on the y axis. Default is true.
 * @returns The original model (for cascading).
 */
export declare function zero(modelToZero: IModel, zeroX?: boolean, zeroY?: boolean): IModel;
