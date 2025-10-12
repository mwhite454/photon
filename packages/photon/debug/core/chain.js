/**
 * Chain finding and manipulation functions for Maker.js
 * Chains are paths that connect at endpoints
 */
import { extendObject, isObject, round, pathType } from './maker.js';
import * as point from './point.js';
import * as path from './path.js';
import * as angle from './angle.js';
import * as measure from './measure-minimal.js';
import { PointGraph } from './collect.js';
import * as model from './model.js';
/**
 * @private
 */
function getOpposedLink(linkedPaths, pathContext) {
    if (linkedPaths[0].walkedPath.pathContext === pathContext) {
        return linkedPaths[1];
    }
    return linkedPaths[0];
}
/**
 * @private
 */
function followLinks(pointGraph, chainFound, chainNotFound) {
    const followLink = (initialLink, chain, firstLink) => {
        let currLink = initialLink;
        while (currLink) {
            chain.links.push(currLink);
            chain.pathLength += currLink.pathLength;
            const next = currLink.reversed ? 0 : 1;
            const nextPoint = currLink.endPoints[next];
            const nextEl = pointGraph.getElementAtPoint(nextPoint);
            if (!nextEl || nextEl.valueIds.length === 0) {
                break;
            }
            const items = nextEl.valueIds.map(valueIndex => pointGraph.values[valueIndex]);
            const nextLink = getOpposedLink(items, currLink.walkedPath.pathContext);
            //remove the first 2 items, which should be currLink and nextLink
            nextEl.valueIds.splice(0, 2);
            if (!nextLink) {
                break;
            }
            if (nextLink.walkedPath.pathContext === firstLink.walkedPath.pathContext) {
                if (chain.links.length > 1) {
                    chain.endless = true;
                }
                break;
            }
            currLink = nextLink;
        }
    };
    pointGraph.forEachPoint((p, values, _pointId, el) => {
        if (!el || el.valueIds.length === 0) {
            return;
        }
        const chain = {
            links: [],
            endless: false,
            pathLength: 0
        };
        const firstValue = values[0];
        if (!firstValue) {
            return;
        }
        followLink(firstValue, chain, firstValue);
        if (chain.endless) {
            chainFound(chain, false);
            return;
        }
        //need to go in reverse
        chain.links.reverse();
        const firstLink = chain.links[0];
        if (!firstLink) {
            return;
        }
        chain.links.forEach((link) => { link.reversed = !link.reversed; });
        //remove the last link, it will be added in the call
        const lastLink = chain.links[chain.links.length - 1];
        if (lastLink) {
            chain.pathLength -= lastLink.pathLength;
        }
        const currLink = chain.links.pop();
        followLink(currLink, chain, firstLink);
        if (chain.links.length > 1) {
            chainFound(chain, true);
        }
        else {
            const singleLink = chain.links[0];
            if (singleLink) {
                chainNotFound === null || chainNotFound === void 0 ? void 0 : chainNotFound(singleLink.walkedPath);
            }
        }
    });
}
/**
 * Find a single chain within a model, across all layers. Shorthand of findChains; useful when you know there is only one chain to find in your model.
 *
 * @param modelContext The model to search for a chain.
 * @returns A chain object or null if chains were not found.
 */
export function findSingleChain(modelContext) {
    let singleChain = null;
    findChains(modelContext, (chains, loose, layer) => {
        singleChain = chains[0];
    }, { byLayers: false });
    return singleChain;
}
/**
 * @private
 */
function linkEndpoint(link, beginning) {
    const index = (beginning === link.reversed) ? 1 : 0;
    return link.endPoints[index];
}
export function findChains(modelContext, ...args) {
    var _a;
    let options;
    let callback;
    switch (args.length) {
        case 1:
            if (typeof args[0] === 'function') {
                callback = args[0];
            }
            else {
                options = args[0];
            }
            break;
        case 2:
            callback = args[0];
            options = args[1];
            break;
    }
    const opts = {
        pointMatchingDistance: 0.005
    };
    extendObject(opts, options);
    const pointGraphsByLayer = {};
    const chainsByLayer = {};
    const ignored = {};
    const walkOptions = {
        onPath(walkedPath) {
            var _a, _b, _c;
            const layer = opts.byLayers ? (_a = walkedPath.layer) !== null && _a !== void 0 ? _a : '' : '';
            if (!pointGraphsByLayer[layer]) {
                pointGraphsByLayer[layer] = new PointGraph();
            }
            const pointGraph = pointGraphsByLayer[layer];
            const pathLength = measure.pathLength(walkedPath.pathContext);
            //circles are loops by nature
            if (walkedPath.pathContext.type === pathType.Circle ||
                (walkedPath.pathContext.type === pathType.Arc && round(angle.ofArcSpan(walkedPath.pathContext) - 360) === 0) ||
                (walkedPath.pathContext.type === pathType.BezierSeed && measure.isPointEqual(walkedPath.pathContext.origin, walkedPath.pathContext.end, opts.pointMatchingDistance))) {
                const chain = {
                    links: [{
                            walkedPath,
                            reversed: null,
                            endPoints: null,
                            pathLength
                        }],
                    endless: true,
                    pathLength
                };
                //store circles so that layers fire grouped
                chainsByLayer[layer] = (_b = chainsByLayer[layer]) !== null && _b !== void 0 ? _b : [];
                chainsByLayer[layer].push(chain);
            }
            else {
                //don't add lines which are 5x shorter than the tolerance
                if (pathLength < opts.pointMatchingDistance / 5) {
                    ignored[layer] = (_c = ignored[layer]) !== null && _c !== void 0 ? _c : [];
                    ignored[layer].push(walkedPath);
                    return;
                }
                //gather both endpoints from all non-circle segments
                const endPoints = point.fromPathEnds(walkedPath.pathContext, walkedPath.offset);
                for (let i = 0; i < 2; i += 1) {
                    const link = {
                        walkedPath,
                        endPoints,
                        reversed: i !== 0,
                        pathLength
                    };
                    const valueId = pointGraph.insertValue(link);
                    pointGraph.insertValueIdAtPoint(valueId, endPoints[i]);
                }
            }
        }
    };
    if (opts.shallow) {
        walkOptions.beforeChildWalk = function () { return false; };
    }
    let beziers;
    if (opts.unifyBeziers) {
        beziers = getBezierModels(modelContext);
        swapBezierPathsWithSeeds(beziers, true, opts.pointMatchingDistance);
    }
    model.walk(modelContext, walkOptions);
    for (const layer of Object.keys(pointGraphsByLayer)) {
        const pointGraph = pointGraphsByLayer[layer];
        pointGraph.mergeNearestSinglePoints(opts.pointMatchingDistance);
        const loose = [];
        chainsByLayer[layer] = (_a = chainsByLayer[layer]) !== null && _a !== void 0 ? _a : [];
        //follow paths to find endless chains
        followLinks(pointGraph, function (chain, checkEndless) {
            if (checkEndless) {
                chain.endless = measure.isPointEqual(linkEndpoint(chain.links[0], true), linkEndpoint(chain.links[chain.links.length - 1], false), opts.pointMatchingDistance);
            }
            else {
                chain.endless = !!chain.endless;
            }
            chainsByLayer[layer].push(chain);
        }, function (walkedPath) {
            loose.push(walkedPath);
        });
        //sort to return largest chains first
        chainsByLayer[layer].sort((a, b) => b.pathLength - a.pathLength);
        if (opts.contain) {
            const containChainsOptions = isObject(opts.contain) ? opts.contain : { alternateDirection: false };
            const containedChains = getContainment(chainsByLayer[layer], containChainsOptions);
            chainsByLayer[layer] = containedChains;
        }
        callback === null || callback === void 0 ? void 0 : callback(chainsByLayer[layer], loose, layer, ignored[layer]);
    }
    if (beziers) {
        swapBezierPathsWithSeeds(beziers, false, opts.pointMatchingDistance);
    }
    if (opts.byLayers) {
        return chainsByLayer;
    }
    else {
        return chainsByLayer[''];
    }
}
/**
 * @private
 */
function getContainment(allChains, opts) {
    const chainsAsModels = allChains.map(c => toNewModel(c));
    const parents = [];
    //see which are inside of each other
    allChains.forEach((chainContext, i1) => {
        if (!chainContext.endless)
            return;
        const wp = chainContext.links[0].walkedPath;
        const firstPath = path.clone(wp.pathContext, wp.offset);
        allChains.forEach((otherChain, i2) => {
            if (chainContext === otherChain)
                return;
            if (!otherChain.endless)
                return;
            // TODO: isPointInsideModel needs to be imported from full measure.ts
            // For now, skip this check - will be fixed when measure.ts is converted
            // if (measure.isPointInsideModel(point.middle(firstPath), chainsAsModels[i2])) {
            //     parents[i1] = otherChain;
            // }
        });
    });
    //convert parent to children
    const result = [];
    allChains.forEach((chainContext, i) => {
        const parent = parents[i];
        if (!parent) {
            result.push(chainContext);
        }
        else {
            if (!parent.contains) {
                parent.contains = [];
            }
            parent.contains.push(chainContext);
        }
    });
    if (opts.alternateDirection) {
        const alternate = (chains, shouldBeClockwise) => {
            chains.forEach((chainContext) => {
                // TODO: isChainClockwise needs to be imported from full measure.ts
                // For now, skip this check - will be fixed when measure.ts is converted
                // const isClockwise = measure.isChainClockwise(chainContext);
                // if (isClockwise !== null) {
                //     if (!isClockwise && shouldBeClockwise || isClockwise && !shouldBeClockwise) {
                //         reverse(chainContext);
                //     }
                // }
                if (chainContext.contains) {
                    alternate(chainContext.contains, !shouldBeClockwise);
                }
            });
        };
        alternate(result, true);
    }
    return result;
}
/**
 * @private
 */
function getBezierModels(modelContext) {
    const beziers = [];
    const checkIsBezier = (wm) => {
        // TODO: BezierCurve model class needs to be converted first
        // For now, skip this check
        // if (wm.childModel.type === models.BezierCurve.typeName) {
        //     beziers.push(wm);
        // }
    };
    const options = {
        beforeChildWalk: (walkedModel) => {
            checkIsBezier(walkedModel);
            return true;
        }
    };
    const rootModel = {
        childId: '',
        childModel: modelContext,
        layer: modelContext.layer,
        offset: modelContext.origin,
        parentModel: null,
        route: [],
        routeKey: ''
    };
    checkIsBezier(rootModel);
    model.walk(modelContext, options);
    return beziers;
}
/**
 * @private
 */
function swapBezierPathsWithSeeds(beziers, swap, pointMatchingDistance) {
    const tempKey = 'tempPaths';
    const tempLayerKey = 'tempLayer';
    beziers.forEach(wm => {
        // TODO: BezierCurve model class needs to be converted first
        // For now, skip this operation
        // const b = wm.childModel as models.BezierCurve;
        // Bezier operations commented out until BezierCurve model is converted
    });
}
// Chain manipulation functions
/**
 * Shift the links of an endless chain.
 *
 * @param chainContext Chain to cycle through. Must be endless.
 * @param amount Optional number of links to shift. May be negative to cycle backwards.
 * @returns The chainContext for cascading.
 */
export function cycle(chainContext, amount = 1) {
    if (!chainContext.endless)
        return;
    const n = Math.abs(amount);
    const { links } = chainContext;
    if (links.length === 0) {
        return chainContext;
    }
    for (let i = 0; i < n; i += 1) {
        if (amount < 0) {
            const moved = links.shift();
            if (moved) {
                links.push(moved);
            }
        }
        else {
            const moved = links.pop();
            if (moved) {
                links.unshift(moved);
            }
        }
    }
    return chainContext;
}
/**
 * Reverse the links of a chain.
 *
 * @param chainContext Chain to reverse.
 * @returns The chainContext for cascading.
 */
export function reverse(chainContext) {
    chainContext.links.reverse();
    chainContext.links.forEach(link => { link.reversed = !link.reversed; });
    return chainContext;
}
/**
 * Set the beginning of an endless chain to a known routeKey of a path.
 *
 * @param chainContext Chain to cycle through. Must be endless.
 * @param routeKey RouteKey of the desired path to start the chain with.
 * @returns The chainContext for cascading.
 */
export function startAt(chainContext, routeKey) {
    if (!chainContext.endless)
        return;
    let index = -1;
    for (let i = 0; i < chainContext.links.length; i++) {
        if (chainContext.links[i].walkedPath.routeKey === routeKey) {
            index = i;
            break;
        }
    }
    if (index > 0) {
        cycle(chainContext, index);
    }
    return chainContext;
}
/**
 * Convert a chain to a new model, independent of any model from where the chain was found.
 *
 * @param chainContext Chain to convert to a model.
 * @param detachFromOldModel Flag to remove the chain's paths from their current parent model. If false, each path will be cloned. If true, the original path will be re-parented into the resulting new model. Default is false.
 * @returns A new model containing paths from the chain.
 */
export function toNewModel(chainContext, detachFromOldModel = false) {
    const result = { paths: {} };
    for (const link of chainContext.links) {
        const wp = link.walkedPath;
        if (wp.pathContext.type === pathType.BezierSeed) {
            if (detachFromOldModel) {
                delete wp.modelContext.paths[wp.pathId];
            }
            if (!result.models) {
                result.models = {};
            }
            // TODO: BezierCurve model needs to be converted first
            // const modelId = model.getSimilarModelId(result, wp.pathId);
            // result.models[modelId] = model.moveRelative(new models.BezierCurve(wp.pathContext as IPathBezierSeed), wp.offset);
        }
        else {
            let newPath;
            if (detachFromOldModel) {
                newPath = wp.pathContext;
                delete wp.modelContext.paths[wp.pathId];
            }
            else {
                newPath = path.clone(wp.pathContext);
            }
            const pathId = model.getSimilarPathId(result, wp.pathId);
            result.paths[pathId] = path.moveRelative(newPath, wp.offset);
        }
    }
    return result;
}
/**
 * @private
 */
function removeDuplicateEnds(endless, points) {
    if (!endless || points.length < 2)
        return;
    if (measure.isPointEqual(points[0], points[points.length - 1], .00001)) {
        points.pop();
    }
}
/**
 * Get points along a chain of paths.
 *
 * @param chainContext Chain of paths to get points from.
 * @param distance Numeric distance along the chain between points, or numeric array of distances along the chain between each point.
 * @param maxPoints Maximum number of points to retrieve.
 * @returns Array of points which are on the chain spread at a uniform interval.
 */
export function toPoints(chainContext, distanceOrDistances, maxPoints) {
    const result = [];
    let di = 0;
    let t = 0;
    let distanceArray;
    if (Array.isArray(distanceOrDistances)) {
        distanceArray = distanceOrDistances;
    }
    for (const link of chainContext.links) {
        const wp = link.walkedPath;
        const len = link.pathLength;
        while (round(len - t) > 0) {
            let r = t / len;
            if (link.reversed) {
                r = 1 - r;
            }
            result.push(point.add(point.middle(wp.pathContext, r), wp.offset));
            if (maxPoints && result.length >= maxPoints)
                return result;
            let distance;
            if (distanceArray) {
                distance = distanceArray[di];
                di++;
                if (di > distanceArray.length) {
                    return result;
                }
            }
            else {
                distance = distanceOrDistances;
            }
            t += distance;
        }
        t -= len;
    }
    removeDuplicateEnds(chainContext.endless, result);
    return result;
}
/**
 * Get key points (a minimal a number of points) along a chain of paths.
 *
 * @param chainContext Chain of paths to get points from.
 * @param maxArcFacet The maximum length between points on an arc or circle.
 * @returns Array of points which are on the chain.
 */
export function toKeyPoints(chainContext, maxArcFacet) {
    const result = [];
    for (let i = 0; i < chainContext.links.length; i++) {
        const link = chainContext.links[i];
        const wp = link.walkedPath;
        const keyPoints = path.toKeyPoints(wp.pathContext, maxArcFacet);
        if (keyPoints.length > 0) {
            if (link.reversed) {
                keyPoints.reverse();
            }
            if (i > 0) {
                keyPoints.shift();
            }
            const offsetPathPoints = keyPoints.map(p => point.add(p, wp.offset));
            result.push.apply(result, offsetPathPoints);
        }
    }
    removeDuplicateEnds(chainContext.endless, result);
    return result;
}
//# sourceMappingURL=chain.js.map