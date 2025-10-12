import { extendObject, pathType } from './maker.js';
import * as angle from './angle.js';
import { Collector } from './collect.js';
import { walk } from './model.js';
import { isArcEnclosingAngle } from './boolean-utils.js';
function checkForOverlaps(refPaths, isOverlapping, overlapUnion) {
    let currIndex = 0;
    do {
        const root = refPaths[currIndex];
        let overlaps;
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
export function simplify(modelToSimplify, options) {
    const compareCircles = (circleA, circleB) => {
        if (Math.abs(circleA.radius - circleB.radius) <= opts.scalarMatchingDistance) {
            const distance = measure.pointDistance(circleA.origin, circleB.origin);
            return distance <= opts.pointMatchingDistance;
        }
        return false;
    };
    const similarArcs = new Collector(compareCircles);
    const similarCircles = new Collector(compareCircles);
    const similarLines = new Collector(measure.isSlopeEqual);
    const map = {};
    map[pathType.Arc] = (arcRef) => {
        similarArcs.addItemToCollection(arcRef.pathContext, arcRef);
    };
    map[pathType.Circle] = (circleRef) => {
        similarCircles.addItemToCollection(circleRef.pathContext, circleRef);
    };
    map[pathType.Line] = (lineRef) => {
        const slope = measure.lineSlope(lineRef.pathContext);
        similarLines.addItemToCollection(slope, lineRef);
    };
    const opts = {
        scalarMatchingDistance: 0.001,
        pointMatchingDistance: 0.005
    };
    extendObject(opts, options);
    const walkOptions = {
        onPath(walkedPath) {
            const fn = map[walkedPath.pathContext.type];
            if (fn) {
                fn(walkedPath);
            }
        }
    };
    walk(modelToSimplify, walkOptions);
    similarArcs.getCollectionsOfMultiple((key, arcRefs) => {
        checkForOverlaps(arcRefs, measure.isArcOverlapping, (arcA, arcB) => {
            const aEndsInB = isArcEnclosingAngle(arcB, arcA.endAngle, false);
            const bEndsInA = isArcEnclosingAngle(arcA, arcB.endAngle, false);
            if (aEndsInB && bEndsInA) {
                arcA.endAngle = arcA.startAngle + 360;
                return;
            }
            const ordered = aEndsInB ? [arcA, arcB] : [arcB, arcA];
            arcA.startAngle = angle.noRevolutions(ordered[0].startAngle);
            arcA.endAngle = ordered[1].endAngle;
        });
    });
    similarCircles.getCollectionsOfMultiple((key, circleRefs) => {
        for (let i = 1; i < circleRefs.length; i += 1) {
            const circleRef = circleRefs[i];
            delete circleRef.modelContext.paths[circleRef.pathId];
        }
    });
    similarLines.getCollectionsOfMultiple((slope, arcRefs) => {
        checkForOverlaps(arcRefs, measure.isLineOverlapping, (lineA, lineB) => {
            const box = { paths: { lineA, lineB } };
            const m = measure.modelExtents(box);
            if (!slope.hasSlope) {
                lineA.origin[1] = m.low[1];
                lineA.end[1] = m.high[1];
            }
            else if (slope.slope < 0) {
                lineA.origin = [m.low[0], m.high[1]];
                lineA.end = [m.high[0], m.low[1]];
            }
            else if (slope.slope > 0) {
                lineA.origin = m.low;
                lineA.end = m.high;
            }
            else {
                lineA.origin[0] = m.low[0];
                lineA.end[0] = m.high[0];
            }
        });
    });
    return modelToSimplify;
}
//# sourceMappingURL=simplify.js.map