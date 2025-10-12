import { pathType } from './maker.js';
import * as point from './point.js';
import * as angle from './angle.js';
// Import only 'paths' to avoid runtime ReferenceError in UMD bundle
import * as paths from './paths.js';
/** Add a path to a model. */
export function addTo(childPath, parentModel, pathId, overwrite = false) {
    model.addPath(parentModel, childPath, pathId, overwrite);
    return childPath;
}
function copyLayer(pathA, pathB) {
    if (pathA && pathB && typeof pathA.layer !== 'undefined') {
        pathB.layer = pathA.layer;
    }
    if (pathA && pathB && ('bezierData' in pathA)) {
        pathB.bezierData = pathA.bezierData;
    }
}
const copyPropsMap = {};
copyPropsMap[pathType.Circle] = (srcCircle, destCircle, offset) => {
    destCircle.radius = srcCircle.radius;
};
copyPropsMap[pathType.Arc] = (srcArc, destArc, offset) => {
    copyPropsMap[pathType.Circle](srcArc, destArc, offset);
    destArc.startAngle = srcArc.startAngle;
    destArc.endAngle = srcArc.endAngle;
};
copyPropsMap[pathType.Line] = (srcLine, destLine, offset) => {
    destLine.end = point.add(srcLine.end, offset);
};
copyPropsMap[pathType.BezierSeed] = (srcSeed, destSeed, offset) => {
    copyPropsMap[pathType.Line](srcSeed, destSeed, offset);
    destSeed.controls = srcSeed.controls.map(p => point.add(p, offset));
};
/** Create a clone of a path. This is faster than cloneObject. */
export function clone(pathToClone, offset) {
    const result = { type: pathToClone.type, origin: point.add(pathToClone.origin, offset) };
    const fn = copyPropsMap[pathToClone.type];
    if (fn) {
        fn(pathToClone, result, offset);
    }
    copyLayer(pathToClone, result);
    return result;
}
/** Copy the schema properties of one path to another. */
export function copyProps(srcPath, destPath) {
    const fn = copyPropsMap[srcPath.type];
    if (fn) {
        destPath.origin = point.clone(srcPath.origin);
        fn(srcPath, destPath);
    }
    copyLayer(srcPath, destPath);
    return srcPath;
}
const mirrorMap = {};
mirrorMap[pathType.Line] = (line, origin, mirrorX, mirrorY) => {
    return new paths.Line(origin, point.mirror(line.end, mirrorX, mirrorY));
};
mirrorMap[pathType.Circle] = (circle, origin, mirrorX, mirrorY) => {
    return new paths.Circle(origin, circle.radius);
};
mirrorMap[pathType.Arc] = (arc, origin, mirrorX, mirrorY) => {
    const startAngle = angle.mirror(arc.startAngle, mirrorX, mirrorY);
    const endAngle = angle.mirror(angle.ofArcEnd(arc), mirrorX, mirrorY);
    const xor = mirrorX != mirrorY;
    return new paths.Arc(origin, arc.radius, xor ? endAngle : startAngle, xor ? startAngle : endAngle);
};
mirrorMap[pathType.BezierSeed] = (seed, origin, mirrorX, mirrorY) => {
    const mirrored = mirrorMap[pathType.Line](seed, origin, mirrorX, mirrorY);
    mirrored.type = pathType.BezierSeed;
    mirrored.controls = seed.controls.map(c => point.mirror(c, mirrorX, mirrorY));
    return mirrored;
};
/** Set the layer of a path. */
export function layer(pathContext, layer) {
    pathContext.layer = layer;
    return pathContext;
}
/** Create a clone of a path, mirrored on either or both x and y axes. */
export function mirror(pathToMirror, mirrorX, mirrorY) {
    let newPath = null;
    if (pathToMirror) {
        const origin = point.mirror(pathToMirror.origin, mirrorX, mirrorY);
        const fn = mirrorMap[pathToMirror.type];
        if (fn) {
            newPath = fn(pathToMirror, origin, mirrorX, mirrorY);
        }
    }
    copyLayer(pathToMirror, newPath);
    return newPath;
}
const moveMap = {};
moveMap[pathType.Line] = (line, origin) => {
    const delta = point.subtract(line.end, line.origin);
    line.end = point.add(origin, delta);
};
/** Move a path to an absolute point. */
export function move(pathToMove, origin) {
    if (pathToMove) {
        const fn = moveMap[pathToMove.type];
        if (fn) {
            fn(pathToMove, origin);
        }
        pathToMove.origin = origin;
    }
    return pathToMove;
}
const moveRelativeMap = {};
moveRelativeMap[pathType.Line] = (line, delta, subtract) => {
    line.end = point.add(line.end, delta, subtract);
};
moveRelativeMap[pathType.BezierSeed] = (seed, delta, subtract) => {
    moveRelativeMap[pathType.Line](seed, delta, subtract);
    seed.controls = seed.controls.map(c => point.add(c, delta, subtract));
};
/** Move a path's origin by a relative amount. */
export function moveRelative(pathToMove, delta, subtract) {
    if (pathToMove && delta) {
        pathToMove.origin = point.add(pathToMove.origin, delta, subtract);
        const fn = moveRelativeMap[pathToMove.type];
        if (fn) {
            fn(pathToMove, delta, subtract);
        }
    }
    return pathToMove;
}
/** Move some paths relatively during a task execution, then unmove them. */
export function moveTemporary(pathsToMove, deltas, task) {
    let subtract = false;
    const moveFunc = (pathToOffset, i) => {
        if (deltas[i]) {
            moveRelative(pathToOffset, deltas[i], subtract);
        }
    };
    pathsToMove.map(moveFunc);
    task();
    subtract = true;
    pathsToMove.map(moveFunc);
}
const rotateMap = {};
rotateMap[pathType.Line] = (line, angleInDegrees, rotationOrigin) => {
    line.end = point.rotate(line.end, angleInDegrees, rotationOrigin);
};
rotateMap[pathType.Arc] = (arc, angleInDegrees, rotationOrigin) => {
    arc.startAngle = angle.noRevolutions(arc.startAngle + angleInDegrees);
    arc.endAngle = angle.noRevolutions(arc.endAngle + angleInDegrees);
};
rotateMap[pathType.BezierSeed] = (seed, angleInDegrees, rotationOrigin) => {
    rotateMap[pathType.Line](seed, angleInDegrees, rotationOrigin);
    seed.controls = seed.controls.map(c => point.rotate(c, angleInDegrees, rotationOrigin));
};
/** Rotate a path. */
export function rotate(pathToRotate, angleInDegrees, rotationOrigin = [0, 0]) {
    if (!pathToRotate || !angleInDegrees)
        return pathToRotate;
    pathToRotate.origin = point.rotate(pathToRotate.origin, angleInDegrees, rotationOrigin);
    const fn = rotateMap[pathToRotate.type];
    if (fn) {
        fn(pathToRotate, angleInDegrees, rotationOrigin);
    }
    return pathToRotate;
}
const scaleMap = {};
scaleMap[pathType.Line] = (line, scaleValue) => {
    line.end = point.scale(line.end, scaleValue);
};
scaleMap[pathType.BezierSeed] = (seed, scaleValue) => {
    scaleMap[pathType.Line](seed, scaleValue);
    seed.controls = seed.controls.map(c => point.scale(c, scaleValue));
};
scaleMap[pathType.Circle] = (circle, scaleValue) => {
    circle.radius *= scaleValue;
};
scaleMap[pathType.Arc] = scaleMap[pathType.Circle];
/** Scale a path. */
export function scale(pathToScale, scaleValue) {
    if (!pathToScale || scaleValue === 1 || !scaleValue)
        return pathToScale;
    pathToScale.origin = point.scale(pathToScale.origin, scaleValue);
    const fn = scaleMap[pathToScale.type];
    if (fn) {
        fn(pathToScale, scaleValue);
    }
    return pathToScale;
}
const distortMap = {};
distortMap[pathType.Arc] = (arc, scaleX, scaleY) => {
    return new models.EllipticArc(arc, scaleX, scaleY);
};
distortMap[pathType.Circle] = (circle, scaleX, scaleY) => {
    const ellipse = new models.Ellipse(circle.radius * scaleX, circle.radius * scaleY);
    ellipse.origin = point.distort(circle.origin, scaleX, scaleY);
    return ellipse;
};
distortMap[pathType.Line] = (line, scaleX, scaleY) => {
    return new paths.Line([line.origin, line.end].map(p => point.distort(p, scaleX, scaleY)));
};
distortMap[pathType.BezierSeed] = (seed, scaleX, scaleY) => {
    const d = point.distort;
    return {
        type: pathType.BezierSeed,
        origin: d(seed.origin, scaleX, scaleY),
        controls: seed.controls.map(c => d(c, scaleX, scaleY)),
        end: d(seed.end, scaleX, scaleY)
    };
};
/** Distort a path - scale x and y individually. */
export function distort(pathToDistort, scaleX, scaleY) {
    if (!pathToDistort || !scaleX || !scaleY)
        return null;
    const fn = distortMap[pathToDistort.type];
    if (fn) {
        const distorted = fn(pathToDistort, scaleX, scaleY);
        if (typeof pathToDistort.layer !== 'undefined') {
            distorted.layer = pathToDistort.layer;
        }
        return distorted;
    }
    return null;
}
/** Connect 2 lines at their slope intersection point. */
export function converge(lineA, lineB, useOriginA, useOriginB) {
    const p = point.fromSlopeIntersection(lineA, lineB);
    if (p) {
        const lines = [lineA, lineB];
        const useOrigin = [useOriginA, useOriginB];
        if (arguments.length === 2) {
            lines.forEach((line, i) => {
                useOrigin[i] = (point.closest(p, [line.origin, line.end]) === line.origin);
            });
        }
        const setPoint = (line, useOrigin) => {
            const setP = useOrigin ? line.origin : line.end;
            setP[0] = p[0];
            setP[1] = p[1];
        };
        lines.forEach((line, i) => {
            setPoint(line, useOrigin[i]);
        });
    }
    return p;
}
const alterMap = {};
alterMap[pathType.Arc] = (arc, pathLength, distance, useOrigin) => {
    const span = angle.ofArcSpan(arc);
    const delta = ((pathLength + distance) * span / pathLength) - span;
    if (useOrigin) {
        arc.startAngle -= delta;
    }
    else {
        arc.endAngle += delta;
    }
};
alterMap[pathType.Circle] = (circle, pathLength, distance, useOrigin) => {
    circle.radius *= (pathLength + distance) / pathLength;
};
alterMap[pathType.Line] = (line, pathLength, distance, useOrigin) => {
    const delta = point.scale(point.subtract(line.end, line.origin), distance / pathLength);
    if (useOrigin) {
        line.origin = point.subtract(line.origin, delta);
    }
    else {
        line.end = point.add(line.end, delta);
    }
};
/** Alter a path by lengthening or shortening it. */
export function alterLength(pathToAlter, distance, useOrigin = false) {
    if (!pathToAlter || !distance)
        return null;
    const fn = alterMap[pathToAlter.type];
    if (fn) {
        const pathLength = measure.pathLength(pathToAlter);
        if (!pathLength || -distance >= pathLength)
            return null;
        fn(pathToAlter, pathLength, distance, useOrigin);
        return pathToAlter;
    }
    return null;
}
/** Get points along a path. */
export function toPoints(pathContext, numberOfPoints) {
    if (numberOfPoints == 1) {
        return [point.middle(pathContext)];
    }
    const points = [];
    let base = numberOfPoints;
    if (pathContext.type != pathType.Circle)
        base--;
    for (let i = 0; i < numberOfPoints; i++) {
        points.push(point.middle(pathContext, i / base));
    }
    return points;
}
const numberOfKeyPointsMap = {};
numberOfKeyPointsMap[pathType.Line] = (line) => 2;
numberOfKeyPointsMap[pathType.Circle] = (circle, maxPointDistance) => {
    const len = measure.pathLength(circle);
    if (!len)
        return 0;
    maxPointDistance = maxPointDistance || len;
    return Math.max(8, Math.ceil(len / (maxPointDistance || len)));
};
numberOfKeyPointsMap[pathType.Arc] = (arc, maxPointDistance) => {
    const len = measure.pathLength(arc);
    if (!len)
        return 0;
    const minPoints = Math.ceil(angle.ofArcSpan(arc) / 45) + 1;
    return Math.max(minPoints, Math.ceil(len / (maxPointDistance || len)));
};
/** Get key points (a minimal a number of points) along a path. */
export function toKeyPoints(pathContext, maxArcFacet) {
    if (pathContext.type == pathType.BezierSeed) {
        const curve = new models.BezierCurve(pathContext);
        let curveKeyPoints;
        model.findChains(curve, (chains, loose, layer) => {
            if (chains.length == 1) {
                const c = chains[0];
                switch (c.links[0].walkedPath.pathId) {
                    case 'arc_0':
                    case 'line_0':
                        break;
                    default:
                        chain.reverse(c);
                }
                curveKeyPoints = chain.toKeyPoints(c);
            }
            else if (loose.length === 1) {
                curveKeyPoints = toKeyPoints(loose[0].pathContext);
            }
        });
        return curveKeyPoints;
    }
    else {
        const fn = numberOfKeyPointsMap[pathContext.type];
        if (fn) {
            const numberOfKeyPoints = fn(pathContext, maxArcFacet);
            if (numberOfKeyPoints) {
                return toPoints(pathContext, numberOfKeyPoints);
            }
        }
    }
    return [];
}
/** Center a path at [0, 0]. */
export function center(pathToCenter) {
    const m = measure.pathExtents(pathToCenter);
    const c = point.average(m.high, m.low);
    const o = point.subtract(pathToCenter.origin || [0, 0], c);
    move(pathToCenter, o);
    return pathToCenter;
}
/** Move a path so its bounding box begins at [0, 0]. */
export function zero(pathToZero) {
    const m = measure.pathExtents(pathToZero);
    const z = point.subtract(pathToZero.origin || [0, 0], m.low);
    move(pathToZero, z);
    return pathToZero;
}
//# sourceMappingURL=path.js.map