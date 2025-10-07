import { IPoint, IPath, IPathLine, IPathArc } from './schema.js';
import { pathType, round, extendObject } from './maker.js';
import * as point from './point.js';
import * as angle from './angle.js';
import * as measure from './measure.js';
import * as equal from './equal.js';
import { Line, Circle, Arc, Parallel } from './paths.js';
import * as path from './path.js';
import { intersection } from './intersect.js';
import { breakAtPoint } from './break.js';
import type { IPointMatchOptions } from './maker.js';

/** @private */
interface IPointProperty {
  point: IPoint;
  propertyName: string;
}

/** @private */
export interface IMatchPointProperty extends IPointProperty {
  path: IPath;
  isStart: boolean;
  oppositePoint: IPoint;
  shardPoint?: IPoint;
}

/** @private */
export interface IFilletResult {
  filletAngle: number;
  clipPath: () => void;
}

const propertyNamesMap: { [pathType: string]: (p: IPath) => string[] } = {};
propertyNamesMap[pathType.Arc] = (_arc: IPathArc) => ['startAngle', 'endAngle'];
propertyNamesMap[pathType.Line] = (_line: IPathLine) => ['origin', 'end'];

/** @private */
export function getPointProperties(pathToInspect: IPath): IPointProperty[] {
  const points = point.fromPathEnds(pathToInspect);
  if (!points) return null;

  const propertyNames = propertyNamesMap[pathToInspect.type]?.(pathToInspect);
  if (!propertyNames) return null;

  const pointProperty = (index: number): IPointProperty => ({
    point: points[index],
    propertyName: propertyNames[index],
  });

  return [pointProperty(0), pointProperty(1)];
}

/** @private */
export function getMatchingPointProperties(pathA: IPath, pathB: IPath, _options?: IPointMatchOptions): IMatchPointProperty[] {
  const pathAProps = getPointProperties(pathA);
  const pathBProps = getPointProperties(pathB);
  if (!pathAProps || !pathBProps) return null;

  const makeMatch = (pathContext: IPath, props: IPointProperty[], index: number): IMatchPointProperty => ({
    path: pathContext,
    isStart: index === 0,
    propertyName: props[index].propertyName,
    point: props[index].point,
    oppositePoint: props[1 - index].point,
  });

  const check = (iA: number, iB: number) => {
    if (equal.isPointEqual(pathAProps[iA].point, pathBProps[iB].point, 0.0001)) {
      return [makeMatch(pathA, pathAProps, iA), makeMatch(pathB, pathBProps, iB)] as IMatchPointProperty[];
    }
    return null;
  };

  return check(0, 0) || check(0, 1) || check(1, 0) || check(1, 1);
}

/** @private */
export function populateShardPointsFromReferenceCircle(
  filletRadius: number,
  center: IPoint,
  properties: IMatchPointProperty[],
  _options: IPointMatchOptions
): boolean {
  const referenceCircle = new Circle(center, filletRadius);

  for (let i = 0; i < 2; i++) {
    const circleIntersection = intersection(referenceCircle, properties[i].path);
    if (!circleIntersection) return false;

    properties[i].shardPoint = circleIntersection.intersectionPoints[0];

    if (equal.isPointEqual(properties[i].point, circleIntersection.intersectionPoints[0], 0.0001)) {
      if (circleIntersection.intersectionPoints.length > 1) {
        properties[i].shardPoint = circleIntersection.intersectionPoints[1];
      } else {
        return false;
      }
    }
  }

  return true;
}

/** @private */
export function cloneAndBreakPath(pathToShard: IPath, shardPoint: IPoint): IPath[] {
  const shardStart = path.clone(pathToShard);
  const shardEnd = breakAtPoint(shardStart, shardPoint);
  return [shardStart, shardEnd];
}

const guidePathMap: {
  [pathType: string]: (
    pathContext: IPath,
    filletRadius: number,
    nearPoint: IPoint,
    shardPoint: IPoint,
    isStart: boolean
  ) => IPath;
} = {};

guidePathMap[pathType.Arc] = (arc: IPathArc, filletRadius: number, nearPoint: IPoint, shardPoint: IPoint, isStart: boolean) => {
  let guideRadius = arc.radius;

  const guideArcShard = cloneAndBreakPath(arc, shardPoint)[isStart ? 0 : 1] as IPathArc;
  if (!guideArcShard) return null;

  if (measure.isArcConcaveTowardsPoint(guideArcShard, nearPoint)) {
    guideRadius -= filletRadius;
  } else {
    guideRadius += filletRadius;
  }

  if (round(guideRadius) <= 0) return null;

  return new Arc(arc.origin, guideRadius, arc.startAngle, arc.endAngle);
};

guidePathMap[pathType.Line] = (line: IPathLine, filletRadius: number, nearPoint: IPoint) => new Parallel(line, filletRadius, nearPoint);

/** @private */
export function getGuidePath(context: IMatchPointProperty, filletRadius: number, nearPoint: IPoint): IPath {
  const fn = guidePathMap[context.path.type];
  return fn ? fn(context.path, filletRadius, nearPoint, context.shardPoint, context.isStart) : null;
}

const filletResultMap: {
  [pathType: string]: (
    pathContext: IPath,
    propertyName: string,
    filletRadius: number,
    filletCenter: IPoint
  ) => IFilletResult;
} = {};

filletResultMap[pathType.Arc] = (arc: IPathArc, propertyName: string, _filletRadius: number, filletCenter: IPoint) => {
  const guideLine = new Line(arc.origin, filletCenter);
  const guideLineAngle = angle.ofLineInDegrees(guideLine);
  let filletAngle = guideLineAngle;

  if (!measure.isArcConcaveTowardsPoint(arc, filletCenter)) {
    filletAngle += 180;
  }

  return {
    filletAngle: angle.noRevolutions(filletAngle),
    clipPath: () => {
      (arc as any)[propertyName] = guideLineAngle;
    },
  };
};

filletResultMap[pathType.Line] = (line: IPathLine, propertyName: string, _filletRadius: number, filletCenter: IPoint) => {
  const guideLine = new Line([0, 0], [0, 1]);
  const lineAngle = angle.ofLineInDegrees(line);
  path.rotate(guideLine, lineAngle, [0, 0]);
  path.moveRelative(guideLine, filletCenter);

  const intersectionPoint = point.fromSlopeIntersection(line, guideLine);
  if (!intersectionPoint) return null;

  return {
    filletAngle: angle.ofPointInDegrees(filletCenter, intersectionPoint),
    clipPath: () => {
      (line as any)[propertyName] = intersectionPoint;
    },
  };
};

/** @private */
export function getFilletResult(context: IMatchPointProperty, filletRadius: number, filletCenter: IPoint): IFilletResult {
  const fn = filletResultMap[context.path.type];
  const result = fn ? fn(context.path, context.propertyName, filletRadius, filletCenter) : null;
  return testFilletResult(context, result) ? result : null;
}

/** @private */
export function getDogboneResult(context: IMatchPointProperty, filletCenter: IPoint): IFilletResult {
  const result: IFilletResult = {
    filletAngle: angle.ofPointInDegrees(filletCenter, context.shardPoint),
    clipPath: () => {
      (context.path as any)[context.propertyName] = context.shardPoint;
    },
  };
  return testFilletResult(context, result) ? result : null;
}

/** @private */
export function testFilletResult(context: IMatchPointProperty, result: IFilletResult): boolean {
  if (!result) return false;

  const originalValue = (context.path as any)[context.propertyName];
  result.clipPath();
  const ok = measure.pathLength(context.path) > 0;
  (context.path as any)[context.propertyName] = originalValue;
  return ok;
}

/** @private */
export function getLineRatio(lines: IPathLine[]): number {
  let totalLength = 0;
  const lengths: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const length = measure.pathLength(lines[i]);
    lengths.push(length);
    totalLength += length;
  }
  return lengths[0] / totalLength;
}
