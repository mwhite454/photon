import { cloneObject, isPath, pathType } from './maker.js';
import * as point from './point.js';
import * as path from './path.js';
import * as paths from './paths.js';
import * as units from './units.js';
import * as measure from './measure-minimal.js';
import { BezierCurve } from '../models/BezierCurve-esm.js';
import { findChains as chainFindChains, findSingleChain as chainFindSingleChain } from './chain.js';
export function findChains(modelContext, callbackOrOptions, maybeOptions) {
    if (typeof callbackOrOptions === 'function') {
        return chainFindChains(modelContext, callbackOrOptions, maybeOptions);
    }
    return chainFindChains(modelContext, callbackOrOptions);
}
export function findSingleChain(modelContext) {
    return chainFindSingleChain(modelContext);
}
/** Add a Caption object to a model. */
export function addCaption(modelContext, text, leftAnchorPoint, rightAnchorPoint) {
    if (!leftAnchorPoint) {
        leftAnchorPoint = point.zero();
    }
    if (!rightAnchorPoint) {
        rightAnchorPoint = point.clone(leftAnchorPoint);
    }
    modelContext.caption = { text, anchor: new paths.Line(leftAnchorPoint, rightAnchorPoint) };
    return modelContext;
}
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
export function addPath(modelContext, pathContext, pathId, overWrite = false) {
    const id = overWrite ? pathId : getSimilarPathId(modelContext, pathId);
    modelContext.paths = modelContext.paths || {};
    modelContext.paths[id] = pathContext;
    return modelContext;
}
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
export function addModel(parentModel, childModel, childModelId, overWrite = false) {
    const id = overWrite ? childModelId : getSimilarModelId(parentModel, childModelId);
    parentModel.models = parentModel.models || {};
    parentModel.models[id] = childModel;
    return parentModel;
}
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
export function addTo(childModel, parentModel, childModelId, overWrite = false) {
    addModel(parentModel, childModel, childModelId, overWrite);
    return childModel;
}
/**
 * Clone a model. Alias of makerjs.cloneObject(modelToClone)
 *
 * @param modelToClone The model to clone.
 * @returns A clone of the model you passed.
 */
export function clone(modelToClone) {
    return cloneObject(modelToClone);
}
/**
 * Count the number of child models within a given model.
 *
 * @param modelContext The model containing other models.
 * @returns Number of child models.
 */
export function countChildModels(modelContext) {
    let count = 0;
    if (modelContext.models) {
        for (const id in modelContext.models) {
            count++;
        }
    }
    return count;
}
/**
 * Gets all Caption objects, in absolute position, in this model and its children.
 * @param modelContext The model to search for Caption objects.
 * @returns Array of Caption objects.
 */
export function getAllCaptionsOffset(modelContext) {
    const captions = [];
    function tryAddCaption(m, offset, layer) {
        if (m.caption) {
            captions.push({ text: m.caption.text, anchor: path.clone(m.caption.anchor, point.add(m.origin, offset)), layer: (m.caption.anchor.layer || layer) });
        }
    }
    tryAddCaption(modelContext, modelContext.origin, modelContext.layer);
    walk(modelContext, {
        afterChildWalk: wm => tryAddCaption(wm.childModel, wm.offset, wm.layer)
    });
    return captions;
}
/**
 * @private
 */
function getSimilarId(map, id) {
    if (!map)
        return id;
    let i = 0;
    let newId = id;
    while (newId in map) {
        i++;
        newId = [id, i].join('_');
    }
    return newId;
}
/**
 * Get an unused id in the models map with the same prefix.
 *
 * @param modelContext The model containing the models map.
 * @param modelId The id to use directly (if unused), or as a prefix.
 */
export function getSimilarModelId(modelContext, modelId) {
    return getSimilarId(modelContext.models, modelId);
}
/**
 * Get an unused id in the paths map with the same prefix.
 *
 * @param modelContext The model containing the paths map.
 * @param pathId The id to use directly (if unused), or as a prefix.
 */
export function getSimilarPathId(modelContext, pathId) {
    return getSimilarId(modelContext.paths, pathId);
}
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
export function layer(modelContext, layer) {
    modelContext.layer = layer;
    return modelContext;
}
/**
 * Moves all of a model's children (models and paths, recursively) in reference to a single common origin. Useful when points between children need to connect to each other.
 *
 * @param modelToOriginate The model to originate.
 * @param origin Optional offset reference point.
 * @returns The original model (for cascading).
 */
export function originate(modelToOriginate, origin) {
    function innerOriginate(m, o) {
        if (!m)
            return;
        const newOrigin = point.add(m.origin, o);
        if (m.type === BezierCurve.typeName) {
            path.moveRelative(m.seed, newOrigin);
        }
        if (m.paths) {
            for (let id in m.paths) {
                path.moveRelative(m.paths[id], newOrigin);
            }
        }
        if (m.models) {
            for (let id in m.models) {
                innerOriginate(m.models[id], newOrigin);
            }
        }
        if (m.caption) {
            path.moveRelative(m.caption.anchor, newOrigin);
        }
        m.origin = point.zero();
    }
    innerOriginate(modelToOriginate, origin ? point.subtract([0, 0], origin) : [0, 0]);
    if (origin) {
        modelToOriginate.origin = origin;
    }
    return modelToOriginate;
}
/**
 * Center a model at [0, 0].
 *
 * @param modelToCenter The model to center.
 * @param centerX Boolean to center on the x axis. Default is true.
 * @param centerY Boolean to center on the y axis. Default is true.
 * @returns The original model (for cascading).
 */
export function center(modelToCenter, centerX = true, centerY = true) {
    const m = measure.modelExtents(modelToCenter);
    const o = modelToCenter.origin || [0, 0];
    if (centerX)
        o[0] -= m.center[0];
    if (centerY)
        o[1] -= m.center[1];
    modelToCenter.origin = o;
    return modelToCenter;
}
/**
 * Create a clone of a model, mirrored on either or both x and y axes.
 *
 * @param modelToMirror The model to mirror.
 * @param mirrorX Boolean to mirror on the x axis.
 * @param mirrorY Boolean to mirror on the y axis.
 * @returns Mirrored model.
 */
export function mirror(modelToMirror, mirrorX, mirrorY) {
    let newModel = {};
    if (!modelToMirror)
        return null;
    if (modelToMirror.origin) {
        newModel.origin = point.mirror(modelToMirror.origin, mirrorX, mirrorY);
    }
    if (modelToMirror.type) {
        newModel.type = modelToMirror.type;
    }
    if ('layer' in modelToMirror) {
        newModel.layer = modelToMirror.layer;
    }
    if (modelToMirror.units) {
        newModel.units = modelToMirror.units;
    }
    if (modelToMirror.type === BezierCurve.typeName) {
        newModel.type = BezierCurve.typeName;
        newModel.seed = path.mirror(modelToMirror.seed, mirrorX, mirrorY);
    }
    if (modelToMirror.paths) {
        newModel.paths = {};
        for (let id in modelToMirror.paths) {
            const pathToMirror = modelToMirror.paths[id];
            if (!pathToMirror)
                continue;
            const pathMirrored = path.mirror(pathToMirror, mirrorX, mirrorY);
            if (!pathMirrored)
                continue;
            newModel.paths[id] = pathMirrored;
        }
    }
    if (modelToMirror.models) {
        newModel.models = {};
        for (let id in modelToMirror.models) {
            const childModelToMirror = modelToMirror.models[id];
            if (!childModelToMirror)
                continue;
            const childModelMirrored = mirror(childModelToMirror, mirrorX, mirrorY);
            if (!childModelMirrored)
                continue;
            newModel.models[id] = childModelMirrored;
        }
    }
    if (modelToMirror.caption) {
        newModel.caption = cloneObject(modelToMirror.caption);
        newModel.caption.anchor = path.mirror(modelToMirror.caption.anchor, mirrorX, mirrorY);
    }
    return newModel;
}
/**
 * Move a model to an absolute point. Note that this is also accomplished by directly setting the origin property. This function exists for cascading.
 *
 * @param modelToMove The model to move.
 * @param origin The new position of the model.
 * @returns The original model (for cascading).
 */
export function move(modelToMove, origin) {
    modelToMove.origin = point.clone(origin);
    return modelToMove;
}
/**
 * Move a model's origin by a relative amount.
 *
 * @param modelToMove The model to move.
 * @param delta The x & y adjustments as a point object.
 * @returns The original model (for cascading).
 */
export function moveRelative(modelToMove, delta) {
    if (modelToMove) {
        modelToMove.origin = point.add(modelToMove.origin || point.zero(), delta);
    }
    return modelToMove;
}
/**
 * Prefix the ids of paths in a model.
 *
 * @param modelToPrefix The model to prefix.
 * @param prefix The prefix to prepend on paths ids.
 * @returns The original model (for cascading).
 */
export function prefixPathIds(modelToPrefix, prefix) {
    let walkedPaths = [];
    //first collect the paths because we don't want to modify keys during an iteration on keys
    walk(modelToPrefix, {
        onPath: function (walkedPath) {
            walkedPaths.push(walkedPath);
        }
    });
    //now modify the ids in our own iteration
    for (let i = 0; i < walkedPaths.length; i++) {
        const walkedPath = walkedPaths[i];
        delete walkedPath.modelContext.paths[walkedPath.pathId];
        walkedPath.modelContext.paths[prefix + walkedPath.pathId] = walkedPath.pathContext;
    }
    return modelToPrefix;
}
/**
 * Rotate a model.
 *
 * @param modelToRotate The model to rotate.
 * @param angleInDegrees The amount of rotation, in degrees.
 * @param rotationOrigin The center point of rotation.
 * @returns The original model (for cascading).
 */
export function rotate(modelToRotate, angleInDegrees, rotationOrigin = [0, 0]) {
    if (!modelToRotate || !angleInDegrees)
        return modelToRotate;
    const offsetOrigin = point.subtract(rotationOrigin, modelToRotate.origin);
    if (modelToRotate.type === BezierCurve.typeName) {
        path.rotate(modelToRotate.seed, angleInDegrees, offsetOrigin);
    }
    if (modelToRotate.paths) {
        for (let id in modelToRotate.paths) {
            path.rotate(modelToRotate.paths[id], angleInDegrees, offsetOrigin);
        }
    }
    if (modelToRotate.models) {
        for (let id in modelToRotate.models) {
            rotate(modelToRotate.models[id], angleInDegrees, offsetOrigin);
        }
    }
    if (modelToRotate.caption) {
        path.rotate(modelToRotate.caption.anchor, angleInDegrees, offsetOrigin);
    }
    return modelToRotate;
}
/**
 * Scale a model.
 *
 * @param modelToScale The model to scale.
 * @param scaleValue The amount of scaling.
 * @param scaleOrigin Optional boolean to scale the origin point. Typically false for the root model.
 * @returns The original model (for cascading).
 */
export function scale(modelToScale, scaleValue, scaleOrigin = false) {
    if (scaleOrigin && modelToScale.origin) {
        modelToScale.origin = point.scale(modelToScale.origin, scaleValue);
    }
    if (modelToScale.type === BezierCurve.typeName) {
        path.scale(modelToScale.seed, scaleValue);
    }
    if (modelToScale.paths) {
        for (let id in modelToScale.paths) {
            path.scale(modelToScale.paths[id], scaleValue);
        }
    }
    if (modelToScale.models) {
        for (let id in modelToScale.models) {
            scale(modelToScale.models[id], scaleValue, true);
        }
    }
    if (modelToScale.caption) {
        path.scale(modelToScale.caption.anchor, scaleValue);
    }
    return modelToScale;
}
/**
 * @private
 */
function addDistortedPath(parentModel, pathToDistort, pathId, layer, scaleX, scaleY, bezierAccuracy) {
    const distortedPath = path.distort(pathToDistort, scaleX, scaleY);
    layer = layer || pathToDistort.layer;
    if (layer) {
        distortedPath.layer = layer;
    }
    if (isPath(distortedPath)) {
        if (distortedPath.type === pathType.BezierSeed) {
            const curve = new BezierCurve(distortedPath, bezierAccuracy);
            addModel(parentModel, curve, pathId);
        }
        else {
            addPath(parentModel, distortedPath, pathId);
        }
    }
    else {
        addModel(parentModel, distortedPath, pathId);
    }
}
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
export function distort(modelToDistort, scaleX, scaleY, scaleOrigin = false, bezierAccuracy) {
    const distorted = {};
    if (modelToDistort.layer) {
        distorted.layer = modelToDistort.layer;
    }
    if (scaleOrigin && modelToDistort.origin) {
        distorted.origin = point.distort(modelToDistort.origin, scaleX, scaleY);
    }
    if (modelToDistort.type === BezierCurve.typeName) {
        const b = modelToDistort;
        const bezierPartsByLayer = BezierCurve.getBezierSeeds(b, { byLayers: true, pointMatchingDistance: bezierAccuracy });
        for (let layer in bezierPartsByLayer) {
            let pathArray = bezierPartsByLayer[layer];
            pathArray.forEach((p, i) => {
                addDistortedPath(distorted, p, i.toString(), layer, scaleX, scaleY, bezierAccuracy);
            });
        }
    }
    else if (modelToDistort.paths) {
        for (let pathId in modelToDistort.paths) {
            let pathToDistort = modelToDistort.paths[pathId];
            addDistortedPath(distorted, pathToDistort, pathId, null, scaleX, scaleY, bezierAccuracy);
        }
    }
    if (modelToDistort.models) {
        for (let childId in modelToDistort.models) {
            let childModel = modelToDistort.models[childId];
            let distortedChild = distort(childModel, scaleX, scaleY, true, bezierAccuracy);
            addModel(distorted, distortedChild, childId);
        }
    }
    if (modelToDistort.caption) {
        distorted.caption = cloneObject(modelToDistort.caption);
        distorted.caption.anchor = path.distort(modelToDistort.caption.anchor, scaleX, scaleY);
    }
    return distorted;
}
/**
 * Convert a model to match a different unit system.
 *
 * @param modeltoConvert The model to convert.
 * @param destUnitType The unit system.
 * @returns The scaled model (for cascading).
 */
export function convertUnits(modeltoConvert, destUnitType) {
    if (modeltoConvert.units && units.isValidUnit(modeltoConvert.units) && units.isValidUnit(destUnitType)) {
        const ratio = units.conversionScale(modeltoConvert.units, destUnitType);
        if (ratio != 1) {
            scale(modeltoConvert, ratio);
            //update the model with its new unit type
            modeltoConvert.units = destUnitType;
        }
    }
    return modeltoConvert;
}
/**
 * DEPRECATED - use model.walk instead.
 * Recursively walk through all paths for a given model.
 *
 * @param modelContext The model to walk.
 * @param callback Callback for each path.
 */
export function walkPaths(modelContext, callback) {
    if (modelContext.paths) {
        for (let pathId in modelContext.paths) {
            if (!modelContext.paths[pathId])
                continue;
            callback(modelContext, pathId, modelContext.paths[pathId]);
        }
    }
    if (modelContext.models) {
        for (let id in modelContext.models) {
            if (!modelContext.models[id])
                continue;
            walkPaths(modelContext.models[id], callback);
        }
    }
}
/**
 * Recursively walk through all child models and paths for a given model.
 *
 * @param modelContext The model to walk.
 * @param options Object containing callbacks.
 * @returns The original model (for cascading).
 */
export function walk(modelContext, options) {
    if (!modelContext)
        return;
    function walkRecursive(modelContext, layer, offset, route, routeKey) {
        const newOffset = point.add(modelContext.origin, offset);
        layer = (layer != undefined) ? layer : '';
        if (modelContext.paths) {
            for (let pathId in modelContext.paths) {
                const pathContext = modelContext.paths[pathId];
                if (!pathContext)
                    continue;
                let walkedPath = {
                    modelContext: modelContext,
                    layer: (pathContext.layer != undefined) ? pathContext.layer : layer,
                    offset: newOffset,
                    pathContext: pathContext,
                    pathId: pathId,
                    route: route.concat(['paths', pathId]),
                    routeKey: routeKey + (routeKey ? '.' : '') + 'paths' + JSON.stringify([pathId])
                };
                if (options.onPath)
                    options.onPath(walkedPath);
            }
        }
        if (modelContext.models) {
            for (let modelId in modelContext.models) {
                const childModel = modelContext.models[modelId];
                if (!childModel)
                    continue;
                let walkedModel = {
                    parentModel: modelContext,
                    layer: (childModel.layer != undefined) ? childModel.layer : layer,
                    offset: newOffset,
                    route: route.concat(['models', modelId]),
                    routeKey: routeKey + (routeKey ? '.' : '') + 'models' + JSON.stringify([modelId]),
                    childId: modelId,
                    childModel: childModel
                };
                if (options.beforeChildWalk) {
                    if (!options.beforeChildWalk(walkedModel))
                        continue;
                }
                walkRecursive(walkedModel.childModel, walkedModel.layer, newOffset, walkedModel.route, walkedModel.routeKey);
                if (options.afterChildWalk) {
                    options.afterChildWalk(walkedModel);
                }
            }
        }
    }
    walkRecursive(modelContext, modelContext.layer, [0, 0], [], '');
    return modelContext;
}
/**
 * Move a model so its bounding box begins at [0, 0].
 *
 * @param modelToZero The model to zero.
 * @param zeroX Boolean to zero on the x axis. Default is true.
 * @param zeroY Boolean to zero on the y axis. Default is true.
 * @returns The original model (for cascading).
 */
export function zero(modelToZero, zeroX = true, zeroY = true) {
    const m = measure.modelExtents(modelToZero);
    const z = modelToZero.origin || [0, 0];
    if (zeroX)
        z[0] -= m.low[0];
    if (zeroY)
        z[1] -= m.low[1];
    modelToZero.origin = z;
    return modelToZero;
}
//# sourceMappingURL=model.js.map