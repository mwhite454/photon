import { pathType } from './maker.js';
import * as angle from './angle.js';
import * as point from './point.js';
import * as modelUtils from './model.js';
import { combine } from './combine.js';
import { simplify } from './simplify.js';
import * as measure from './measure-minimal.js';
import * as measureFull from './measure.js';
import { findChains, toNewModel } from './chain.js';
import { OvalArc } from '../models/OvalArc.js';
import { Ring } from '../models/Ring.js';
import { Slot } from '../models/Slot.js';
import { ConnectTheDots } from '../models/ConnectTheDots.js';
function circumscribedRadius(radius, angleInRadians) {
    if (angleInRadians === 0)
        return radius;
    return radius / Math.cos(angleInRadians / 2);
}
const pathExpansionMap = {
    [pathType.Arc](arc, expansion, isolateCaps) {
        return new OvalArc(arc.startAngle, arc.endAngle, arc.radius, expansion, false, isolateCaps);
    },
    [pathType.Circle](circle, expansion) {
        return new Ring(circle.radius + expansion, circle.radius - expansion);
    },
    [pathType.Line](line, expansion, isolateCaps) {
        return new Slot(line.origin, line.end, expansion, isolateCaps);
    }
};
export function expand(pathToExpand, expansion, isolateCaps = false) {
    if (!pathToExpand)
        return null;
    const factory = pathExpansionMap[pathToExpand.type];
    if (!factory)
        return null;
    const expanded = factory(pathToExpand, expansion, isolateCaps);
    if (!expanded)
        return null;
    expanded.origin = pathToExpand.origin ? point.clone(pathToExpand.origin) : undefined;
    return expanded;
}
export function straighten(arc, bevel, prefix, close) {
    const arcSpan = angle.ofArcSpan(arc);
    let joints = 1;
    if (arcSpan >= 270) {
        joints = 4;
    }
    else if (arcSpan > 180) {
        joints = 3;
    }
    else if (arcSpan > 150 || bevel) {
        joints = 2;
    }
    const jointAngleInRadians = angle.toRadians(arcSpan / joints);
    const jointRadius = circumscribedRadius(arc.radius, jointAngleInRadians);
    const ends = point.fromArc(arc);
    const points = [point.subtract(ends[0], arc.origin)];
    let a = angle.toRadians(arc.startAngle) + jointAngleInRadians / 2;
    for (let i = 0; i < joints; i += 1) {
        points.push(point.fromPolar(a, jointRadius));
        a += jointAngleInRadians;
    }
    points.push(point.subtract(ends[1], arc.origin));
    const result = new ConnectTheDots(close !== null && close !== void 0 ? close : false, points);
    result.origin = arc.origin;
    if (typeof prefix === 'string' && prefix.length) {
        modelUtils.prefixPathIds(result, prefix);
    }
    return result;
}
export function expandPaths(modelToExpand, distance, joints = 0, combineOptions = {}) {
    if (distance <= 0)
        return null;
    const result = {
        models: {
            expansions: { models: {} },
            caps: { models: {} }
        }
    };
    let first = true;
    let lastFarPoint = combineOptions.farPoint;
    const walkOptions = {
        onPath: (walkedPath) => {
            if (combineOptions.pointMatchingDistance && measure.pathLength(walkedPath.pathContext) < combineOptions.pointMatchingDistance)
                return;
            const expandedPathModel = expand(walkedPath.pathContext, distance, true);
            if (!expandedPathModel)
                return;
            modelUtils.moveRelative(expandedPathModel, walkedPath.offset);
            const expansions = result.models.expansions.models;
            const newId = modelUtils.getSimilarModelId(expansions, walkedPath.pathId);
            modelUtils.prefixPathIds(expandedPathModel, `${walkedPath.pathId}_`);
            modelUtils.originate(expandedPathModel);
            if (!first) {
                combine(result, expandedPathModel, false, true, false, true, combineOptions);
                if (combineOptions.measureA) {
                    combineOptions.measureA.modelsMeasured = false;
                }
                lastFarPoint = combineOptions.farPoint;
                delete combineOptions.farPoint;
                delete combineOptions.measureB;
            }
            expansions[newId] = expandedPathModel;
            if (expandedPathModel.models) {
                const caps = expandedPathModel.models['Caps'];
                if (caps) {
                    delete expandedPathModel.models['Caps'];
                    result.models.caps.models[newId] = caps;
                }
            }
            first = false;
        }
    };
    modelUtils.walk(modelToExpand, walkOptions);
    if (joints) {
        const roundCaps = result.models.caps;
        const straightCaps = { models: {} };
        result.models.straightcaps = straightCaps;
        simplify(roundCaps);
        modelUtils.walk(roundCaps, {
            onPath(walkedPath) {
                const arc = walkedPath.pathContext;
                const straightened = straighten(arc, joints === 2, `${walkedPath.pathId}_`, true);
                combine(result, straightened, false, true, false, true, combineOptions);
                if (combineOptions.measureA) {
                    combineOptions.measureA.modelsMeasured = false;
                }
                lastFarPoint = combineOptions.farPoint;
                delete combineOptions.farPoint;
                delete combineOptions.measureB;
                straightCaps.models[walkedPath.pathId] = straightened;
                delete walkedPath.modelContext.paths[walkedPath.pathId];
            }
        });
        delete result.models.caps;
    }
    combineOptions.farPoint = lastFarPoint;
    return result;
}
function getEndlessChains(modelContext) {
    var _a;
    const chainsResult = findChains(modelContext);
    if (!chainsResult)
        return [];
    const filterEndless = (chains) => chains.filter(chain => chain.endless);
    if (Array.isArray(chainsResult)) {
        return filterEndless(chainsResult);
    }
    const result = [];
    const chainsByLayer = chainsResult;
    for (const layerId in chainsByLayer) {
        if (!Object.prototype.hasOwnProperty.call(chainsByLayer, layerId))
            continue;
        result.push(...filterEndless((_a = chainsByLayer[layerId]) !== null && _a !== void 0 ? _a : []));
    }
    return result;
}
function getClosedGeometries(modelContext) {
    const endlessChains = getEndlessChains(modelContext);
    if (endlessChains.length === 0)
        return null;
    const closed = { models: {} };
    endlessChains.forEach((c, i) => {
        closed.models[i] = toNewModel(c);
    });
    return closed;
}
export function outline(modelToOutline, distance, joints = 0, inside = false, options = {}) {
    const expanded = expandPaths(modelToOutline, distance, joints, options);
    if (!expanded)
        return null;
    const closed = getClosedGeometries(modelToOutline);
    if (!closed) {
        return expanded;
    }
    let childCount = 0;
    const result = { models: {} };
    const chains = getEndlessChains(expanded);
    chains.forEach(c => {
        const wp = c.links[0].walkedPath;
        const isInside = measureFull.isPointInsideModel(point.middle(wp.pathContext), closed, wp.offset);
        if ((inside && isInside) || (!inside && !isInside)) {
            result.models[childCount++] = toNewModel(c);
        }
    });
    return result;
}
//# sourceMappingURL=expand.js.map