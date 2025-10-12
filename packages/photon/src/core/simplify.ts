import { IModel, IPath, IPathArc, IPathCircle, IPathLine } from './schema.js';
import {
    extendObject,
    pathType,
    type IWalkPath,
    type IWalkOptions,
    type ISimplifyOptions,
    type ISlope
} from './maker.js';
import * as angle from './angle.js';
import { Collector } from './collect.js';
import { walk } from './model.js';
import { isArcEnclosingAngle } from './boolean-utils.js';

declare const measure: any;

function checkForOverlaps(
    refPaths: IWalkPath[],
    isOverlapping: (pathA: IPath, pathB: IPath, excludeTangents: boolean) => boolean,
    overlapUnion: (pathA: IPath, pathB: IPath) => void
) {
    let currIndex = 0;

    do {
        const root = refPaths[currIndex];

        let overlaps: boolean;
        do {
            overlaps = false;

            for (let i = currIndex + 1; i < refPaths.length; i++) {
                const arcRef = refPaths[i];

                overlaps = isOverlapping(root.pathContext, arcRef.pathContext, false);
                if (overlaps) {
                    overlapUnion(root.pathContext, arcRef.pathContext);
                    delete arcRef.modelContext.paths[arcRef.pathId];
                    refPaths.splice(i, 1);
                    break;
                }
            }

        } while (overlaps);

        currIndex += 1;
    } while (currIndex < refPaths.length);
}

interface WalkPathFunctionMap {
    [type: string]: (walkedPath: IWalkPath) => void;
}

export function simplify(modelToSimplify: IModel, options?: ISimplifyOptions) {
    const compareCircles = (circleA: IPathCircle, circleB: IPathCircle): boolean => {
        if (Math.abs(circleA.radius - circleB.radius) <= opts.scalarMatchingDistance) {
            const distance = measure.pointDistance(circleA.origin, circleB.origin);
            return distance <= opts.pointMatchingDistance;
        }
        return false;
    };

    const similarArcs = new Collector<IPathCircle, IWalkPath>(compareCircles);
    const similarCircles = new Collector<IPathCircle, IWalkPath>(compareCircles);
    const similarLines = new Collector<ISlope, IWalkPath>(measure.isSlopeEqual);

    const map: WalkPathFunctionMap = {};

    map[pathType.Arc] = (arcRef: IWalkPath) => {
        similarArcs.addItemToCollection(arcRef.pathContext as IPathCircle, arcRef);
    };

    map[pathType.Circle] = (circleRef: IWalkPath) => {
        similarCircles.addItemToCollection(circleRef.pathContext as IPathCircle, circleRef);
    };

    map[pathType.Line] = (lineRef: IWalkPath) => {
        const slope = measure.lineSlope(lineRef.pathContext as IPathLine);
        similarLines.addItemToCollection(slope, lineRef);
    };

    const opts: ISimplifyOptions = {
        scalarMatchingDistance: 0.001,
        pointMatchingDistance: 0.005
    };
    extendObject(opts, options);

    const walkOptions: IWalkOptions = {
        onPath(walkedPath: IWalkPath) {
            const fn = map[walkedPath.pathContext.type];
            if (fn) {
                fn(walkedPath);
            }
        }
    };
    walk(modelToSimplify, walkOptions);

    similarArcs.getCollectionsOfMultiple((key: IPathCircle, arcRefs: IWalkPath[]) => {
        checkForOverlaps(arcRefs, measure.isArcOverlapping, (arcA: IPathArc, arcB: IPathArc) => {
            const aEndsInB = isArcEnclosingAngle(arcB, arcA.endAngle, false);
            const bEndsInA = isArcEnclosingAngle(arcA, arcB.endAngle, false);

            if (aEndsInB && bEndsInA) {
                arcA.endAngle = arcA.startAngle + 360;
                return;
            }

            const ordered: IPathArc[] = aEndsInB ? [arcA, arcB] : [arcB, arcA];

            arcA.startAngle = angle.noRevolutions(ordered[0].startAngle);
            arcA.endAngle = ordered[1].endAngle;
        });
    });

    similarCircles.getCollectionsOfMultiple((key: IPathCircle, circleRefs: IWalkPath[]) => {
        for (let i = 1; i < circleRefs.length; i += 1) {
            const circleRef = circleRefs[i];
            delete circleRef.modelContext.paths[circleRef.pathId];
        }
    });

    similarLines.getCollectionsOfMultiple((slope: ISlope, arcRefs: IWalkPath[]) => {
        checkForOverlaps(arcRefs, measure.isLineOverlapping, (lineA: IPathLine, lineB: IPathLine) => {
            const box: IModel = { paths: { lineA, lineB } };
            const m = measure.modelExtents(box);

            if (!slope.hasSlope) {
                lineA.origin[1] = m.low[1];
                lineA.end[1] = m.high[1];
            } else if (slope.slope < 0) {
                lineA.origin = [m.low[0], m.high[1]];
                lineA.end = [m.high[0], m.low[1]];
            } else if (slope.slope > 0) {
                lineA.origin = m.low;
                lineA.end = m.high;
            } else {
                lineA.origin[0] = m.low[0];
                lineA.end[0] = m.high[0];
            }
        });
    });

    return modelToSimplify;
}
