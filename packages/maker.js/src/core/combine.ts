import { IModel, IPath, IPoint } from './schema.js';
import {
    cloneObject,
    extendObject,
    pathType,
    createRouteKey,
    IWalkPath,
    IWalkModel,
    IWalkOptions,
    IWalkPathBooleanCallback,
    ICombineOptions,
    IMeasurePointInsideOptions,
    IPathIntersectionOptions,
    IPathRemoved,
    IIsPointOnPathOptions
} from './maker.js';
import * as path from './path.js';
import * as point from './point.js';
import { addPath, getSimilarPathId, walk } from './model.js';
import { breakAtPoint } from './break.js';
import { isPointOnPath, isPathEqual } from './equal.js';
import { DEFAULT_POINT_MATCHING_DISTANCE, isZeroLength } from './boolean-utils.js';

declare const measure: any;
declare function removeDeadEnds(modelContext: IModel, pointMatchingDistance?: number | null, keep?: IWalkPathBooleanCallback, trackDeleted?: (wp: IWalkPath, reason: string) => void): IModel;

const pathInternal: any = path;

interface CrossedPathSegment {
    isInside?: boolean;
    uniqueForeignIntersectionPoints: IPoint[];
    absolutePath: IPath;
    addedPath?: IPath;
    pathId: string;
    overlapped: boolean;
    duplicate?: boolean;
}

interface CrossedPath extends IWalkPath {
    broken: boolean;
    segments: CrossedPathSegment[];
}

interface CombinedModel {
    crossedPaths: CrossedPath[];
    overlappedSegments: CrossedPathSegment[];
}

function getNonZeroSegments(pathToSegment: IPath, breakPoint: IPoint): IPath[] | null {
    const segment1 = cloneObject(pathToSegment);
    if (!segment1) {
        return null;
    }

    const segment2 = breakAtPoint(segment1, breakPoint);

    if (segment2) {
        const segments: IPath[] = [segment1, segment2];
        for (let i = 0; i < segments.length; i += 1) {
            if (isZeroLength(segments[i], DEFAULT_POINT_MATCHING_DISTANCE / 5)) {
                return null;
            }
        }
        return segments;
    }

    if (pathToSegment.type === pathType.Circle) {
        return [segment1];
    }

    return null;
}

function getPointsOnPath(points: IPoint[], onPath: IPath, popOptions: IIsPointOnPathOptions): IPoint[] {
    const endpointsOnPath: IPoint[] = [];
    points.forEach(p => {
        if (isPointOnPath(p, onPath, 0.00001, undefined, popOptions as any)) {
            endpointsOnPath.push(p);
        }
    });
    return endpointsOnPath;
}

function breakAlongForeignPath(crossedPath: CrossedPath, overlappedSegments: CrossedPathSegment[], foreignWalkedPath: IWalkPath) {
    const foreignPath = foreignWalkedPath.pathContext;
    const segments = crossedPath.segments;

    if (isPathEqual(segments[0].absolutePath, foreignPath, 0.0001, undefined, foreignWalkedPath.offset)) {
        segments[0].overlapped = true;
        segments[0].duplicate = true;
        overlappedSegments.push(segments[0]);
        return;
    }

    const popOptions: IIsPointOnPathOptions = {} as IIsPointOnPathOptions;
    const options: IPathIntersectionOptions = { path1Offset: crossedPath.offset, path2Offset: foreignWalkedPath.offset };
    const foreignIntersection = pathInternal.intersection?.(crossedPath.pathContext, foreignPath, options);
    const intersectionPoints = foreignIntersection ? foreignIntersection.intersectionPoints : null;
    const foreignPathEndPoints = point.fromPathEnds(foreignPath, foreignWalkedPath.offset) || [];

    for (let i = 0; i < segments.length; i += 1) {
        const pointsOfInterest = intersectionPoints ? foreignPathEndPoints.concat(intersectionPoints) : foreignPathEndPoints;
        const pointsToCheck = getPointsOnPath(pointsOfInterest, segments[i].absolutePath, popOptions);

        if (options.out_AreOverlapped) {
            segments[i].overlapped = true;
            overlappedSegments.push(segments[i]);
        }

        if (pointsToCheck.length > 0) {
            let subSegments: IPath[] | null = null;
            let pointer = 0;
            while (!subSegments && pointer < pointsToCheck.length) {
                subSegments = getNonZeroSegments(segments[i].absolutePath, pointsToCheck[pointer]);
                pointer += 1;
            }

            if (subSegments) {
                crossedPath.broken = true;
                segments[i].absolutePath = subSegments[0];

                if (subSegments[1]) {
                    const newSegment: CrossedPathSegment = {
                        absolutePath: subSegments[1],
                        pathId: segments[0].pathId,
                        overlapped: segments[i].overlapped,
                        uniqueForeignIntersectionPoints: []
                    };

                    if (segments[i].overlapped) {
                        overlappedSegments.push(newSegment);
                    }

                    segments.push(newSegment);
                }

                i -= 1;
            }
        }
    }
}

export function isPathInsideModel(pathContext: IPath, modelContext: IModel, pathOffset?: IPoint, farPoint?: IPoint, measureAtlas?: any): boolean {
    const options = { farPoint } as IMeasurePointInsideOptions & { measureAtlas?: any };
    if (measureAtlas) {
        options.measureAtlas = measureAtlas;
    }

    const p = point.add(point.middle(pathContext), pathOffset);
    return measure.isPointInsideModel(p, modelContext, options);
}

function breakAllPathsAtIntersections(
    modelToBreak: IModel,
    modelToIntersect: IModel,
    checkIsInside: boolean,
    modelToBreakAtlas: any,
    modelToIntersectAtlas: any,
    farPoint?: IPoint
): CombinedModel {
    const crossedPaths: CrossedPath[] = [];
    const overlappedSegments: CrossedPathSegment[] = [];

    const walkModelToBreakOptions: IWalkOptions = {
        onPath(outerWalkedPath: IWalkPath) {
            const segment: CrossedPathSegment = {
                absolutePath: path.clone(outerWalkedPath.pathContext, outerWalkedPath.offset),
                pathId: outerWalkedPath.pathId,
                overlapped: false,
                uniqueForeignIntersectionPoints: []
            };

            const thisPath = outerWalkedPath as CrossedPath;
            thisPath.broken = false;
            thisPath.segments = [segment];

            const walkModelToIntersectOptions: IWalkOptions = {
                onPath(innerWalkedPath: IWalkPath) {
                    if (
                        outerWalkedPath.pathContext !== innerWalkedPath.pathContext &&
                        measure.isMeasurementOverlapping(
                            modelToBreakAtlas.pathMap[outerWalkedPath.routeKey],
                            modelToIntersectAtlas.pathMap[innerWalkedPath.routeKey]
                        )
                    ) {
                        breakAlongForeignPath(thisPath, overlappedSegments, innerWalkedPath);
                    }
                },
                beforeChildWalk(innerWalkedModel: IWalkModel): boolean {
                    const innerModelMeasurement = modelToIntersectAtlas.modelMap[innerWalkedModel.routeKey];
                    return innerModelMeasurement && measure.isMeasurementOverlapping(modelToBreakAtlas.pathMap[outerWalkedPath.routeKey], innerModelMeasurement);
                }
            };

            walk(modelToIntersect, walkModelToIntersectOptions);

            if (checkIsInside) {
                for (let i = 0; i < thisPath.segments.length; i += 1) {
                    const midpoint = point.middle(thisPath.segments[i].absolutePath);
                    const pointInsideOptions = { farPoint } as IMeasurePointInsideOptions & { measureAtlas?: any };
                    pointInsideOptions.measureAtlas = modelToIntersectAtlas;
                    thisPath.segments[i].isInside = measure.isPointInsideModel(midpoint, modelToIntersect, pointInsideOptions);
                    thisPath.segments[i].uniqueForeignIntersectionPoints = pointInsideOptions.out_intersectionPoints;
                }
            }

            crossedPaths.push(thisPath);
        }
    };

    walk(modelToBreak, walkModelToBreakOptions);

    return { crossedPaths, overlappedSegments };
}

function checkForEqualOverlaps(crossedPathsA: CrossedPathSegment[], crossedPathsB: CrossedPathSegment[], pointMatchingDistance: number) {
    const compareSegments = (segment1: CrossedPathSegment, segment2: CrossedPathSegment) => {
        if (isPathEqual(segment1.absolutePath, segment2.absolutePath, pointMatchingDistance)) {
            segment1.duplicate = true;
            segment2.duplicate = true;
        }
    };

    const compareAll = (segment: CrossedPathSegment) => {
        crossedPathsB.forEach(other => compareSegments(other, segment));
    };

    crossedPathsA.forEach(compareAll);
}

type TrackDeleted = (pathToDelete: IPath, routeKey: string, reason: string) => void;

function addOrDeleteSegments(
    crossedPath: CrossedPath,
    includeInside: boolean,
    includeOutside: boolean,
    keepDuplicates: boolean,
    atlas: any,
    trackDeleted: TrackDeleted
) {
    const addSegment = (modelContext: IModel, pathIdBase: string, segment: CrossedPathSegment) => {
        const id = getSimilarPathId(modelContext, pathIdBase);
        const newRouteKey = id === pathIdBase ? crossedPath.routeKey : createRouteKey(crossedPath.route.slice(0, -1).concat([id]));

        segment.addedPath = cloneObject(crossedPath.pathContext);
        segment.addedPath.type = segment.absolutePath.type;

        path.copyProps(segment.absolutePath, segment.addedPath);
        path.moveRelative(segment.addedPath, crossedPath.offset, true);

        modelContext.paths = modelContext.paths || {};
        modelContext.paths[id] = segment.addedPath;

        if (crossedPath.broken) {
            const measurement = measure.pathExtents(segment.absolutePath);
            atlas.pathMap[newRouteKey] = measurement;
            atlas.modelsMeasured = false;
        } else {
            atlas.pathMap[newRouteKey] = savedMeasurement;
        }
    };

    const checkAddSegment = (modelContext: IModel, pathIdBase: string, segment: CrossedPathSegment) => {
        if ((segment.isInside && includeInside) || (!segment.isInside && includeOutside)) {
            addSegment(modelContext, pathIdBase, segment);
        } else {
            atlas.modelsMeasured = false;
            trackDeleted(
                segment.absolutePath,
                crossedPath.routeKey,
                `segment is ${segment.isInside ? 'inside' : 'outside'} intersectionPoints=${JSON.stringify(segment.uniqueForeignIntersectionPoints)}`
            );
        }
    };

    const savedMeasurement = atlas.pathMap[crossedPath.routeKey];

    delete crossedPath.modelContext.paths[crossedPath.pathId];
    delete atlas.pathMap[crossedPath.routeKey];

    crossedPath.segments.forEach(segment => {
        if (segment.duplicate) {
            if (keepDuplicates) {
                addSegment(crossedPath.modelContext, crossedPath.pathId, segment);
            } else {
                trackDeleted(segment.absolutePath, crossedPath.routeKey, 'segment is duplicate');
            }
        } else {
            checkAddSegment(crossedPath.modelContext, crossedPath.pathId, segment);
        }
    });
}

export function breakPathsAtIntersections(modelToBreak: IModel, modelToIntersect?: IModel) {
    const modelToBreakAtlas = new measure.Atlas(modelToBreak);
    modelToBreakAtlas.measureModels();

    let modelToIntersectAtlas: any;

    if (!modelToIntersect) {
        modelToIntersect = modelToBreak;
        modelToIntersectAtlas = modelToBreakAtlas;
    } else {
        modelToIntersectAtlas = new measure.Atlas(modelToIntersect);
        modelToIntersectAtlas.measureModels();
    }

    breakAllPathsAtIntersections(modelToBreak, modelToIntersect || modelToBreak, false, modelToBreakAtlas, modelToIntersectAtlas);

    return modelToBreak;
}

export function combine(
    modelA: IModel,
    modelB: IModel,
    includeAInsideB = false,
    includeAOutsideB = true,
    includeBInsideA = false,
    includeBOutsideA = true,
    options?: ICombineOptions
) {
    const opts: ICombineOptions = {
        trimDeadEnds: true,
        pointMatchingDistance: DEFAULT_POINT_MATCHING_DISTANCE,
        out_deleted: [{ paths: {} }, { paths: {} }]
    };
    extendObject(opts, options);

    opts.measureA = opts.measureA || new measure.Atlas(modelA);
    opts.measureB = opts.measureB || new measure.Atlas(modelB);

    opts.measureA.measureModels();
    opts.measureB.measureModels();

    if (!opts.farPoint) {
        const measureBoth = measure.increase(
            measure.increase({ high: [null, null], low: [null, null] }, opts.measureA.modelMap['']),
            opts.measureB.modelMap['']
        );
        opts.farPoint = point.add(measureBoth.high, [1, 1]);
    }

    const pathsA = breakAllPathsAtIntersections(modelA, modelB, true, opts.measureA, opts.measureB, opts.farPoint);
    const pathsB = breakAllPathsAtIntersections(modelB, modelA, true, opts.measureB, opts.measureA, opts.farPoint);

    checkForEqualOverlaps(pathsA.overlappedSegments, pathsB.overlappedSegments, opts.pointMatchingDistance || DEFAULT_POINT_MATCHING_DISTANCE);

    const trackDeleted = (which: number, deletedPath: IPath, routeKey: string, reason: string) => {
        addPath(opts.out_deleted[which], deletedPath, 'deleted');
        const removed = deletedPath as IPathRemoved;
        removed.reason = reason;
        removed.routeKey = routeKey;
    };

    pathsA.crossedPaths.forEach(crossedPath => {
        addOrDeleteSegments(crossedPath, includeAInsideB, includeAOutsideB, true, opts.measureA, (p, id, reason) => trackDeleted(0, p, id, reason));
    });

    pathsB.crossedPaths.forEach(crossedPath => {
        addOrDeleteSegments(crossedPath, includeBInsideA, includeBOutsideA, false, opts.measureB, (p, id, reason) => trackDeleted(1, p, id, reason));
    });

    const result: IModel = { models: { a: modelA, b: modelB } };

    if (opts.trimDeadEnds) {
        let shouldKeep: IWalkPathBooleanCallback | undefined;

        if (!includeAInsideB && !includeBInsideA) {
            shouldKeep = (walkedPath: IWalkPath): boolean => {
                return !pathsA.overlappedSegments.some(segment => segment.duplicate && walkedPath.pathContext === segment.addedPath);
            };
        }

        removeDeadEnds(result, null, shouldKeep, (wp, reason) => {
            const which = wp.route[1] === 'a' ? 0 : 1;
            trackDeleted(which, wp.pathContext, wp.routeKey, reason);
        });
    }

    extendObject(options, opts);

    return result;
}

export function combineIntersection(modelA: IModel, modelB: IModel) {
    return combine(modelA, modelB, true, false, true, false);
}

export function combineSubtraction(modelA: IModel, modelB: IModel) {
    return combine(modelA, modelB, false, true, true, false);
}

export function combineUnion(modelA: IModel, modelB: IModel) {
    return combine(modelA, modelB, false, true, false, true);
}
