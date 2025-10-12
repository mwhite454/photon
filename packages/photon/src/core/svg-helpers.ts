import type { IModel, IPath, IPathLine, IPathCircle, IPathArc, IPathBezierSeed, IPoint } from './schema.js';
import { round, pathType, type IChain } from './maker.js';
import * as point from './point.js';
import * as angle from './angle.js';
import * as path from './path.js';
import * as paths from './paths.js';
import * as equal from './equal.js';

// Internal SVG path data type
interface ISvgPathData extends Array<any> {}

// --- Private helpers shared by both conversions ---

function svgCoords(p: IPoint): IPoint {
  // Mirror Y for SVG coordinate system
  return point.mirror(p, false, true);
}

function correctArc(arc: IPathArc) {
  const arcSpan = angle.ofArcSpan(arc);
  arc.startAngle = angle.noRevolutions(arc.startAngle);
  arc.endAngle = arc.startAngle + arcSpan;
}

function startSvgPathData(start: IPoint, d: ISvgPathData, accuracy: number): ISvgPathData {
  return ['M', round(start[0], accuracy), round(start[1], accuracy)].concat(d);
}

function svgArcData(d: ISvgPathData, radius: number, endPoint: IPoint, accuracy: number, largeArc?: boolean, increasing?: boolean) {
  const r = round(radius, accuracy);
  const end: IPoint = endPoint;
  d.push(r, r);
  d.push(0);                 // x-axis rotation
  d.push(largeArc ? 1 : 0);  // large-arc-flag
  d.push(increasing ? 0 : 1);// sweep-flag 0=increasing, 1=decreasing
  d.push(round(end[0], accuracy), round(end[1], accuracy));
}

function svgCircleData(radius: number, accuracy: number, clockwiseCircle?: boolean): ISvgPathData {
  const r = round(radius, accuracy);
  const d: ISvgPathData = ['m', -r, 0];
  function halfCircle(sign: number) {
    d.push('a');
    svgArcData(d, r, [2 * r * sign, 0], accuracy, false, !clockwiseCircle);
  }
  halfCircle(1);
  halfCircle(-1);
  d.push('z');
  return d;
}

function svgBezierData(d: ISvgPathData, seed: IPathBezierSeed, accuracy: number, reversed?: boolean) {
  if (seed.controls.length === 1) {
    d.push('Q', round(seed.controls[0][0], accuracy), round(seed.controls[0][1], accuracy));
  } else {
    const controls = reversed ? [seed.controls[1], seed.controls[0]] : seed.controls;
    d.push('C',
      round(controls[0][0], accuracy), round(controls[0][1], accuracy),
      round(controls[1][0], accuracy), round(controls[1][1], accuracy)
    );
  }
  const final = reversed ? seed.origin : seed.end;
  d.push(round(final[0], accuracy), round(final[1], accuracy));
}

// --- Path to SVG path-data mapping ---

const svgPathDataMap: {
  [pathType: string]: (pathContext: any, accuracy: number, clockwiseCircle?: boolean) => ISvgPathData
} = {};

svgPathDataMap[pathType.Line] = function (line: IPathLine, accuracy: number) {
  const e = point.rounded(line.end, accuracy);
  const d: ISvgPathData = ['L', e[0], e[1]];
  return startSvgPathData(line.origin, d, accuracy);
};

svgPathDataMap[pathType.Circle] = function (circle: IPathCircle, accuracy: number, clockwiseCircle?: boolean) {
  return startSvgPathData(circle.origin, svgCircleData(circle.radius, accuracy, clockwiseCircle), accuracy);
};

svgPathDataMap[pathType.Arc] = function (arc: IPathArc, accuracy: number) {
  correctArc(arc);
  const arcPoints = point.fromArc(arc);
  if (equal.isPointEqual(arcPoints[0], arcPoints[1])) {
    return svgPathDataMap[pathType.Circle](arc, accuracy);
  } else {
    const d: ISvgPathData = ['A'];
    svgArcData(
      d,
      arc.radius,
      arcPoints[1],
      accuracy,
      angle.ofArcSpan(arc) > 180,
      arc.startAngle > arc.endAngle
    );
    return startSvgPathData(arcPoints[0], d, accuracy);
  }
};

svgPathDataMap[pathType.BezierSeed] = function (seed: IPathBezierSeed, accuracy: number) {
  const d: ISvgPathData = [];
  svgBezierData(d, seed, accuracy);
  return startSvgPathData(seed.origin, d, accuracy);
};

/**
 * Export a single path to SVG path-data string.
 */
export function pathToSVGPathData(pathToExport: IPath, pathOffset: IPoint, exportOffset: IPoint, accuracy = 0.001, clockwiseCircle?: boolean): string {
  const fn = svgPathDataMap[pathToExport.type];
  if (!fn) return '';

  // clone -> move to offset -> mirror Y for SVG -> apply export offset
  let fixedPath = path.clone(pathToExport);
  fixedPath = path.moveRelative(fixedPath, pathOffset);
  fixedPath = path.mirror(fixedPath, false, true);
  path.moveRelative(fixedPath, exportOffset);

  const d = fn(fixedPath as any, accuracy, clockwiseCircle);
  return d.join(' ');
}

// --- Chain to SVG path-data mapping ---

const chainLinkToPathDataMap: {
  [pathType: string]: (pathContext: any, endPoint: IPoint, reversed: boolean, d: ISvgPathData, accuracy: number) => void
} = {};

chainLinkToPathDataMap[pathType.Arc] = function (arc: IPathArc, endPoint: IPoint, reversed: boolean, d: ISvgPathData, accuracy: number) {
  d.push('A');
  svgArcData(
    d,
    arc.radius,
    endPoint,
    accuracy,
    angle.ofArcSpan(arc) > 180,
    reversed ? (arc.startAngle > arc.endAngle) : (arc.startAngle < arc.endAngle)
  );
};

chainLinkToPathDataMap[pathType.Line] = function (_line: IPathLine, endPoint: IPoint, _reversed: boolean, d: ISvgPathData, accuracy: number) {
  d.push('L', round(endPoint[0], accuracy), round(endPoint[1], accuracy));
};

chainLinkToPathDataMap[pathType.BezierSeed] = function (seed: IPathBezierSeed, _endPoint: IPoint, reversed: boolean, d: ISvgPathData, accuracy: number) {
  svgBezierData(d, seed, accuracy, reversed);
};

/**
 * Convert a chain to SVG path-data string.
 */
export function chainToSVGPathData(chain: IChain, offset: IPoint, accuracy = 0.001): string {
  const offsetPoint = (p: IPoint) => point.add(p, offset);

  const first = chain.links[0];
  const firstPoint = offsetPoint(svgCoords(first.endPoints[first.reversed ? 1 : 0]));

  const d: ISvgPathData = ['M', round(firstPoint[0], accuracy), round(firstPoint[1], accuracy)];

  for (let i = 0; i < chain.links.length; i++) {
    const link = chain.links[i];
    const pathContext = link.walkedPath.pathContext;

    const fn = chainLinkToPathDataMap[pathContext.type];
    if (!fn) continue;

    // clone -> move to link offset -> mirror Y for SVG -> apply export offset
    let fixedPath = path.clone(pathContext);
    fixedPath = path.moveRelative(fixedPath, link.walkedPath.offset);
    fixedPath = path.mirror(fixedPath, false, true);
    path.moveRelative(fixedPath, offset);

    fn(
      fixedPath as any,
      offsetPoint(svgCoords(link.endPoints[link.reversed ? 0 : 1])),
      link.reversed,
      d,
      accuracy
    );
  }

  if (chain.endless) {
    d.push('Z');
  }

  return d.join(' ');
}
