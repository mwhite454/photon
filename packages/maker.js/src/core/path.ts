import { IPoint, IPath, IPathLine, IPathCircle, IPathArc, IPathBezierSeed, IPathArcInBezierCurve, IModel } from './schema.js';
import { pathType } from './maker.js';
import * as point from './point.js';
import * as angle from './angle.js';

// Import only 'paths' to avoid runtime ReferenceError in UMD bundle
import * as paths from './paths.js';

// TEMP: These will be available after respective modules are converted
declare const model: any;
declare const models: any;
declare const measure: any;
declare const chain: any;

// TEMP: These interfaces will be moved to a shared location
export interface IChain {
    links: Array<{ walkedPath: { pathId: string; pathContext: IPath; }; }>;
}
export interface IWalkPath {
    pathContext: IPath;
}

/** Add a path to a model. */
export function addTo(childPath: IPath, parentModel: IModel, pathId: string, overwrite = false): IPath {
    model.addPath(parentModel, childPath, pathId, overwrite);
    return childPath;
}

function copyLayer(pathA: IPath, pathB: IPath) {
    if (pathA && pathB && typeof pathA.layer !== 'undefined') {
        pathB.layer = pathA.layer;
    }
    if (pathA && pathB && ('bezierData' in pathA)) {
        (<IPathArcInBezierCurve>pathB).bezierData = (<IPathArcInBezierCurve>pathA).bezierData;
    }
}

const copyPropsMap: { [pathType: string]: (src: IPath, dest: IPath, offset?: IPoint) => void } = {};

copyPropsMap[pathType.Circle] = (srcCircle: IPathCircle, destCircle: IPathCircle, offset?: IPoint) => {
    destCircle.radius = srcCircle.radius;
};

copyPropsMap[pathType.Arc] = (srcArc: IPathArc, destArc: IPathArc, offset?: IPoint) => {
    copyPropsMap[pathType.Circle](srcArc, destArc, offset);
    destArc.startAngle = srcArc.startAngle;
    destArc.endAngle = srcArc.endAngle;
};

copyPropsMap[pathType.Line] = (srcLine: IPathLine, destLine: IPathLine, offset?: IPoint) => {
    destLine.end = point.add(srcLine.end, offset);
};

copyPropsMap[pathType.BezierSeed] = (srcSeed: IPathBezierSeed, destSeed: IPathBezierSeed, offset?: IPoint) => {
    copyPropsMap[pathType.Line](srcSeed, destSeed, offset);
    destSeed.controls = srcSeed.controls.map(p => point.add(p, offset));
};

/** Create a clone of a path. This is faster than cloneObject. */
export function clone(pathToClone: IPath, offset?: IPoint): IPath {
    const result: IPath = { type: pathToClone.type, origin: point.add(pathToClone.origin, offset) };
    const fn = copyPropsMap[pathToClone.type];
    if (fn) {
        fn(pathToClone, result, offset);
    }
    copyLayer(pathToClone, result);
    return result;
}

/** Copy the schema properties of one path to another. */
export function copyProps(srcPath: IPath, destPath: IPath): IPath {
    const fn = copyPropsMap[srcPath.type];
    if (fn) {
        destPath.origin = point.clone(srcPath.origin);
        fn(srcPath, destPath);
    }
    copyLayer(srcPath, destPath);
    return srcPath;
}

const mirrorMap: { [pathType: string]: (pathToMirror: IPath, origin: IPoint, mirrorX: boolean, mirrorY: boolean) => IPath } = {};

mirrorMap[pathType.Line] = (line: IPathLine, origin: IPoint, mirrorX: boolean, mirrorY: boolean) => {
    return new paths.Line(origin, point.mirror(line.end, mirrorX, mirrorY));
};

mirrorMap[pathType.Circle] = (circle: IPathCircle, origin: IPoint, mirrorX: boolean, mirrorY: boolean) => {
    return new paths.Circle(origin, circle.radius);
};

mirrorMap[pathType.Arc] = (arc: IPathArc, origin: IPoint, mirrorX: boolean, mirrorY: boolean) => {
    const startAngle = angle.mirror(arc.startAngle, mirrorX, mirrorY);
    const endAngle = angle.mirror(angle.ofArcEnd(arc), mirrorX, mirrorY);
    const xor = mirrorX != mirrorY;
    return new paths.Arc(origin, arc.radius, xor ? endAngle : startAngle, xor ? startAngle : endAngle);
};

mirrorMap[pathType.BezierSeed] = (seed: IPathBezierSeed, origin: IPoint, mirrorX: boolean, mirrorY: boolean) => {
    const mirrored = mirrorMap[pathType.Line](seed, origin, mirrorX, mirrorY) as IPathBezierSeed;
    mirrored.type = pathType.BezierSeed;
    mirrored.controls = seed.controls.map(c => point.mirror(c, mirrorX, mirrorY));
    return mirrored;
};

/** Set the layer of a path. */
export function layer(pathContext: IPath, layer: string): IPath {
    pathContext.layer = layer;
    return pathContext;
}

/** Create a clone of a path, mirrored on either or both x and y axes. */
export function mirror(pathToMirror: IPath, mirrorX: boolean, mirrorY: boolean): IPath {
    let newPath: IPath = null;
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

const moveMap: { [pathType: string]: (pathToMove: IPath, origin: IPoint) => void } = {};

moveMap[pathType.Line] = (line: IPathLine, origin: IPoint) => {
    const delta = point.subtract(line.end, line.origin);
    line.end = point.add(origin, delta);
};

/** Move a path to an absolute point. */
export function move(pathToMove: IPath, origin: IPoint): IPath {
    if (pathToMove) {
        const fn = moveMap[pathToMove.type];
        if (fn) {
            fn(pathToMove, origin);
        }
        pathToMove.origin = origin;
    }
    return pathToMove;
}

const moveRelativeMap: { [pathType: string]: (pathToMove: IPath, delta: IPoint, subtract: boolean) => void } = {};

moveRelativeMap[pathType.Line] = (line: IPathLine, delta: IPoint, subtract: boolean) => {
    line.end = point.add(line.end, delta, subtract);
};

moveRelativeMap[pathType.BezierSeed] = (seed: IPathBezierSeed, delta: IPoint, subtract: boolean) => {
    moveRelativeMap[pathType.Line](seed, delta, subtract);
    seed.controls = seed.controls.map(c => point.add(c, delta, subtract));
};

/** Move a path's origin by a relative amount. */
export function moveRelative(pathToMove: IPath, delta: IPoint, subtract?: boolean): IPath {
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
export function moveTemporary(pathsToMove: IPath[], deltas: IPoint[], task: Function) {
    let subtract = false;
    const moveFunc = (pathToOffset: IPath, i: number) => {
        if (deltas[i]) {
            moveRelative(pathToOffset, deltas[i], subtract);
        }
    };
    pathsToMove.map(moveFunc);
    task();
    subtract = true;
    pathsToMove.map(moveFunc);
}

const rotateMap: { [pathType: string]: (pathToRotate: IPath, angleInDegrees: number, rotationOrigin: IPoint) => void } = {};

rotateMap[pathType.Line] = (line: IPathLine, angleInDegrees: number, rotationOrigin: IPoint) => {
    line.end = point.rotate(line.end, angleInDegrees, rotationOrigin);
};

rotateMap[pathType.Arc] = (arc: IPathArc, angleInDegrees: number, rotationOrigin: IPoint) => {
    arc.startAngle = angle.noRevolutions(arc.startAngle + angleInDegrees);
    arc.endAngle = angle.noRevolutions(arc.endAngle + angleInDegrees);
};

rotateMap[pathType.BezierSeed] = (seed: IPathBezierSeed, angleInDegrees: number, rotationOrigin: IPoint) => {
    rotateMap[pathType.Line](seed, angleInDegrees, rotationOrigin);
    seed.controls = seed.controls.map(c => point.rotate(c, angleInDegrees, rotationOrigin));
};

/** Rotate a path. */
export function rotate(pathToRotate: IPath, angleInDegrees: number, rotationOrigin: IPoint = [0, 0]): IPath {
    if (!pathToRotate || !angleInDegrees) return pathToRotate;
    pathToRotate.origin = point.rotate(pathToRotate.origin, angleInDegrees, rotationOrigin);
    const fn = rotateMap[pathToRotate.type];
    if (fn) {
        fn(pathToRotate, angleInDegrees, rotationOrigin);
    }
    return pathToRotate;
}

const scaleMap: { [pathType: string]: (pathValue: IPath, scaleValue: number) => void } = {};

scaleMap[pathType.Line] = (line: IPathLine, scaleValue: number) => {
    line.end = point.scale(line.end, scaleValue);
};

scaleMap[pathType.BezierSeed] = (seed: IPathBezierSeed, scaleValue: number) => {
    scaleMap[pathType.Line](seed, scaleValue);
    seed.controls = seed.controls.map(c => point.scale(c, scaleValue));
};

scaleMap[pathType.Circle] = (circle: IPathCircle, scaleValue: number) => {
    circle.radius *= scaleValue;
};

scaleMap[pathType.Arc] = scaleMap[pathType.Circle];

/** Scale a path. */
export function scale(pathToScale: IPath, scaleValue: number): IPath {
    if (!pathToScale || scaleValue === 1 || !scaleValue) return pathToScale;
    pathToScale.origin = point.scale(pathToScale.origin, scaleValue);
    const fn = scaleMap[pathToScale.type];
    if (fn) {
        fn(pathToScale, scaleValue);
    }
    return pathToScale;
}

const distortMap: { [pathType: string]: (pathValue: IPath, scaleX: number, scaleY: number) => IModel | IPath } = {};

distortMap[pathType.Arc] = (arc: IPathArc, scaleX: number, scaleY: number) => {
    return new models.EllipticArc(arc, scaleX, scaleY);
};

distortMap[pathType.Circle] = (circle: IPathCircle, scaleX: number, scaleY: number) => {
    const ellipse = new models.Ellipse(circle.radius * scaleX, circle.radius * scaleY);
    ellipse.origin = point.distort(circle.origin, scaleX, scaleY);
    return ellipse;
};

distortMap[pathType.Line] = (line: IPathLine, scaleX: number, scaleY: number) => {
    return new paths.Line([line.origin, line.end].map(p => point.distort(p, scaleX, scaleY)));
};

distortMap[pathType.BezierSeed] = (seed: IPathBezierSeed, scaleX: number, scaleY: number) => {
    const d = point.distort;
    return {
        type: pathType.BezierSeed,
        origin: d(seed.origin, scaleX, scaleY),
        controls: seed.controls.map(c => d(c, scaleX, scaleY)),
        end: d(seed.end, scaleX, scaleY)
    } as IPathBezierSeed;
};

/** Distort a path - scale x and y individually. */
export function distort(pathToDistort: IPath, scaleX: number, scaleY: number): IModel | IPath {
    if (!pathToDistort || !scaleX || !scaleY) return null;
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
export function converge(lineA: IPathLine, lineB: IPathLine, useOriginA?: boolean, useOriginB?: boolean): IPoint {
    const p = point.fromSlopeIntersection(lineA, lineB);
    if (p) {
        const lines = [lineA, lineB];
        const useOrigin = [useOriginA, useOriginB];
        if (arguments.length === 2) {
            lines.forEach((line, i) => {
                useOrigin[i] = (point.closest(p, [line.origin, line.end]) === line.origin);
            });
        }
        const setPoint = (line: IPathLine, useOrigin: boolean) => {
            const setP: IPoint = useOrigin ? line.origin : line.end;
            setP[0] = p[0];
            setP[1] = p[1];
        };
        lines.forEach((line, i) => {
            setPoint(line, useOrigin[i]);
        });
    }
    return p;
}

const alterMap: { [pathType: string]: (pathValue: IPath, pathLength: number, distance: number, useOrigin: boolean) => void } = {};

alterMap[pathType.Arc] = (arc: IPathArc, pathLength: number, distance: number, useOrigin: boolean) => {
    const span = angle.ofArcSpan(arc);
    const delta = ((pathLength + distance) * span / pathLength) - span;
    if (useOrigin) {
        arc.startAngle -= delta;
    } else {
        arc.endAngle += delta;
    }
};

alterMap[pathType.Circle] = (circle: IPathCircle, pathLength: number, distance: number, useOrigin: boolean) => {
    circle.radius *= (pathLength + distance) / pathLength;
};

alterMap[pathType.Line] = (line: IPathLine, pathLength: number, distance: number, useOrigin: boolean) => {
    const delta = point.scale(point.subtract(line.end, line.origin), distance / pathLength);
    if (useOrigin) {
        line.origin = point.subtract(line.origin, delta);
    } else {
        line.end = point.add(line.end, delta);
    }
};

/** Alter a path by lengthening or shortening it. */
export function alterLength(pathToAlter: IPath, distance: number, useOrigin = false): IPath {
    if (!pathToAlter || !distance) return null;
    const fn = alterMap[pathToAlter.type];
    if (fn) {
        const pathLength = measure.pathLength(pathToAlter);
        if (!pathLength || -distance >= pathLength) return null;
        fn(pathToAlter, pathLength, distance, useOrigin);
        return pathToAlter;
    }
    return null;
}

/** Get points along a path. */
export function toPoints(pathContext: IPath, numberOfPoints: number): IPoint[] {
    if (numberOfPoints == 1) {
        return [point.middle(pathContext)];
    }
    const points: IPoint[] = [];
    let base = numberOfPoints;
    if (pathContext.type != pathType.Circle) base--;
    for (let i = 0; i < numberOfPoints; i++) {
        points.push(point.middle(pathContext, i / base));
    }
    return points;
}

const numberOfKeyPointsMap: { [type: string]: (pathContext: IPath, maxPointDistance?: number) => number } = {};

numberOfKeyPointsMap[pathType.Line] = (line: IPathLine) => 2;

numberOfKeyPointsMap[pathType.Circle] = (circle: IPathCircle, maxPointDistance?: number) => {
    const len = measure.pathLength(circle);
    if (!len) return 0;
    maxPointDistance = maxPointDistance || len;
    return Math.max(8, Math.ceil(len / (maxPointDistance || len)));
};

numberOfKeyPointsMap[pathType.Arc] = (arc: IPathArc, maxPointDistance?: number) => {
    const len = measure.pathLength(arc);
    if (!len) return 0;
    const minPoints = Math.ceil(angle.ofArcSpan(arc) / 45) + 1;
    return Math.max(minPoints, Math.ceil(len / (maxPointDistance || len)));
};

/** Get key points (a minimal a number of points) along a path. */
export function toKeyPoints(pathContext: IPath, maxArcFacet?: number): IPoint[] {
    if (pathContext.type == pathType.BezierSeed) {
        const curve = new models.BezierCurve(pathContext as IPathBezierSeed);
        let curveKeyPoints: IPoint[];
        model.findChains(curve, (chains: IChain[], loose: IWalkPath[], layer: string) => {
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
            } else if (loose.length === 1) {
                curveKeyPoints = toKeyPoints(loose[0].pathContext);
            }
        });
        return curveKeyPoints;
    } else {
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
export function center(pathToCenter: IPath) {
    const m = measure.pathExtents(pathToCenter);
    const c = point.average(m.high, m.low);
    const o = point.subtract(pathToCenter.origin || [0, 0], c);
    move(pathToCenter, o);
    return pathToCenter;
}

/** Move a path so its bounding box begins at [0, 0]. */
export function zero(pathToZero: IPath) {
    const m = measure.pathExtents(pathToZero);
    const z = point.subtract(pathToZero.origin || [0, 0], m.low);
    move(pathToZero, z);
    return pathToZero;
}
