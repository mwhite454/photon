import type { IModel, IModelMap, IPathMap, IPoint, IPath, IPathBezierSeed, IPathArc, IPathArcInBezierCurve, IBezierRange } from '../core/schema.js';
import type { IChain, IWalkPath, IFindChainsOptions, IKit } from '../core/core.js';
import { pathType, round, isPoint } from '../core/core.js';
import * as point from '../core/point.js';
import * as path from '../core/path.js';
import * as angle from '../core/angle.js';
import * as measure from '../core/measure.js';
import * as equal from '../core/equal.js';
import * as chain from '../core/chain.js';
import * as model from '../core/model.js';
import * as paths from '../core/paths.js';

// Import Bezier.js v6.x - uses named export at runtime
// @ts-ignore - type definitions expect default export but runtime uses named export
import { Bezier } from 'bezier-js';

// Define types locally since @types/bezier-js doesn't match v6.x export pattern
declare namespace BezierJs {
  interface Point {
    x: number;
    y: number;
    z?: number;
  }
  interface Bezier {
    points: Point[];
    extrema(): { values: number[] };
    get(t: number): Point;
    split(t1: number, t2: number): Bezier;
    length(): number;
    compute(t: number): Point;
  }
}

function getScratch(seed: IPathBezierSeed) {
  const points: IPoint[] = [seed.origin];
  points.push(...seed.controls);
  points.push(seed.end);

  const bezierJsPoints = points.map(function (p: IPoint) {
    const bp: BezierJs.Point = {
      x: p[0],
      y: p[1]
    };
    return bp;
  });

  // Construct a fresh Bezier instance each time. This avoids relying on global state
  // or attempting to re-invoke a class constructor via apply.
  return new Bezier(bezierJsPoints);
}

function BezierToSeed(b: BezierJs.Bezier, range?: IBezierRange): IPathBezierSeed {
  const points = b.points.map(getIPoint);
  const seed = new BezierSeed(points) as IPathBezierSeed;
  if (range) {
    seed.parentRange = range;
  }
  return seed;
}

function seedToBezier(seed: IPathBezierSeed): BezierJs.Bezier {
  const coords: number[] = [];

  coords.push(seed.origin[0], seed.origin[1]);
  coords.push(seed.controls[0][0], seed.controls[0][1]);
  if (seed.controls.length > 1) {
    coords.push(seed.controls[1][0], seed.controls[1][1]);
  }
  coords.push(seed.end[0], seed.end[1]);

  return new Bezier(coords);
}

function getExtrema(b: BezierJs.Bezier) {
  const extrema = b
    .extrema()
    .values
    // round the numbers so we can compare them to each other
    .map(m => round(m))
    // remove duplicates
    .filter((value, index, self) => self.indexOf(value) === index)
    // and put them in order
    .sort();

  if (extrema.length === 0) return [0, 1];

  // ensure leading zero
  if (extrema[0] !== 0) {
    extrema.unshift(0);
  }

  // ensure ending 1
  if (extrema[extrema.length - 1] !== 1) {
    extrema.push(1);
  }

  return extrema;
}

function getIPoint(p: BezierJs.Point): IPoint {
  return [p.x, p.y];
}

class TPoint {
  public point: IPoint;

  constructor(b: BezierJs.Bezier, public t: number, offset?: IPoint) {
    this.point = point.add(getIPoint(b.get(t)), offset);
  }
}

function getError(b: BezierJs.Bezier, startT: number, endT: number, arc: IPathArc, arcReversed: boolean): number {
  const tSpan = endT - startT;

  function m(ratio: number) {
    const t = startT + tSpan * ratio;
    const bp = getIPoint(b.get(t));
    const ap = point.middle(arc, arcReversed ? 1 - ratio : ratio);
    return measure.pointDistance(ap, bp);
  }

  return m(0.25) + m(0.75);
}

function getLargestArc(b: BezierJs.Bezier, startT: number, endT: number, accuracy: number): IPathArcInBezierCurve {
  let arc: IPathArc;
  let lastGoodArc: IPathArc;
  const start = new TPoint(b, startT);
  const end = new TPoint(b, endT);
  let upper = end;
  let lower = start;
  let count = 0;
  let test = upper;
  let reversed: boolean;

  while (count < 100) {
    const middle = getIPoint(b.get((start.t + test.t) / 2));

    // if the 3 points are linear, this may throw
    try {
      arc = new paths.Arc(start.point, middle, test.point);
    } catch (e) {
      if (lastGoodArc) {
        return lastGoodArc as IPath as IPathArcInBezierCurve;
      } else {
        break;
      }
    }

    // only need to test once to see if this arc is polar / clockwise
    if (reversed === undefined) {
      reversed = equal.isPointEqual(start.point, point.fromAngleOnCircle(arc.endAngle, arc));
    }

    // now we have a valid arc, measure the error.
    const error = getError(b, startT, test.t, arc, reversed);

    // if error is within accuracy, this becomes the lower
    if (error <= accuracy) {
      (arc as IPath as IPathArcInBezierCurve).bezierData = {
        startT: startT,
        endT: test.t
      };
      lower = test;
      lastGoodArc = arc;
    } else {
      upper = test;
    }

    // exit if lower is the end
    if (
      lower.t === upper.t ||
      (lastGoodArc && lastGoodArc !== arc && angle.ofArcSpan(arc) - angle.ofArcSpan(lastGoodArc) < 0.5)
    ) {
      return lastGoodArc as IPath as IPathArcInBezierCurve;
    }

    count++;
    test = new TPoint(b, (lower.t + upper.t) / 2);
  }

  // arc failed, so return a line
  const line = new paths.Line(start.point, test.point) as IPath as IPathArcInBezierCurve;
  line.bezierData = {
    startT: startT,
    endT: test.t
  };
  return line;
}

function getArcs(bc: BezierCurve, b: BezierJs.Bezier, accuracy: number, startT: number, endT: number, base: number): number {
  let added = 0;
  let arc: IPathArcInBezierCurve;

  while (startT < endT) {
    arc = getLargestArc(b, startT, endT, accuracy);
    // add an arc

    startT = arc.bezierData.endT;

    const len = measure.pathLength(arc);
    if (len < 0.0001) {
      continue;
    }

    bc.paths[arc.type + '_' + (base + added)] = arc;

    added++;
  }

  return added;
}

function getActualBezierRange(
  curve: BezierCurve,
  arc: IPathArcInBezierCurve,
  endpoints: IPoint[],
  offset: IPoint,
  pointMatchingDistance: number
): IBezierRange | null {
  const b = getScratch(curve.seed);
  const tPoints = [arc.bezierData.startT, arc.bezierData.endT].map(t => new TPoint(b, t, offset));
  const ends = endpoints.slice();

  // clipped arcs will still have endpoints closer to the original endpoints
  const endpointDistancetoStart = ends.map(e => measure.pointDistance(e, tPoints[0].point));
  if (endpointDistancetoStart[0] > endpointDistancetoStart[1]) ends.reverse();

  for (let i = 2; i--; ) {
    if (!equal.isPointEqual(ends[i], tPoints[i].point, pointMatchingDistance)) {
      return null;
    }
  }

  return arc.bezierData;
}

interface IAddToLayer {
  (pathToAdd: IPath, layer: string, clone?: boolean): void;
}

function getChainBezierRange(
  curve: BezierCurve,
  c: IChain,
  layer: string,
  addToLayer: IAddToLayer,
  pointMatchingDistance: number
): IBezierRange | null {
  const endLinks = [c.links[0], c.links[c.links.length - 1]];
  if (
    (endLinks[0].walkedPath.pathContext as IPathArcInBezierCurve).bezierData.startT >
    (endLinks[1].walkedPath.pathContext as IPathArcInBezierCurve).bezierData.startT
  ) {
    chain.reverse(c);
    endLinks.reverse();
  }

  const actualBezierRanges = endLinks.map(endLink =>
    getActualBezierRange(
      curve,
      endLink.walkedPath.pathContext as IPathArcInBezierCurve,
      endLink.endPoints,
      endLink.walkedPath.offset,
      pointMatchingDistance
    )
  );

  const result: IBezierRange = {
    startT: actualBezierRanges[0] ? actualBezierRanges[0].startT : null,
    endT: actualBezierRanges[1] ? actualBezierRanges[1].endT : null
  };

  if (result.startT !== null && result.endT !== null) {
    return result;
  } else if (c.links.length > 2) {
    if (result.startT === null) {
      // exclude the first from the chain
      addToLayer(c.links[0].walkedPath.pathContext, layer, true);
      result.startT = (c.links[1].walkedPath.pathContext as IPathArcInBezierCurve).bezierData.startT;
    }

    if (result.endT === null) {
      // exclude the last from the chain
      addToLayer(c.links[c.links.length - 1].walkedPath.pathContext, layer, true);
      result.endT = (c.links[c.links.length - 2].walkedPath.pathContext as IPathArcInBezierCurve).bezierData.endT;
    }

    return result;
  }
  return null;
}

/**
 * Class for bezier seed.
 */
export class BezierSeed implements IPathBezierSeed {
  public type: string;
  public origin: IPoint;
  public end: IPoint;
  public controls: IPoint[];

  /**
   * Class for bezier seed, created from point array.
   *
   * @param points Array of points, with the first being the origin, and the last being the end, and points between used as control points.
   */
  constructor(points: IPoint[]);

  /**
   * Class for quadratic bezier seed.
   *
   * @param origin The origin point of the curve.
   * @param control The control point of the curve.
   * @param end The end point of the curve.
   */
  constructor(origin: IPoint, control: IPoint, end: IPoint);

  /**
   * Class for cubic bezier seed.
   *
   * @param origin The origin point of the curve.
   * @param controls The control points of the curve.
   * @param end The end point of the curve.
   */
  constructor(origin: IPoint, controls: IPoint[], end: IPoint);

  /**
   * Class for cubic bezier seed.
   *
   * @param origin The origin point of the curve.
   * @param control1 The control point of the curve origin.
   * @param control2 The control point of the curve end.
   * @param end The end point of the curve.
   */
  constructor(origin: IPoint, control1: IPoint, control2: IPoint, end: IPoint);

  constructor(...args: any[]) {
    this.type = pathType.BezierSeed;

    switch (args.length) {
      case 1: // point array
        const points = args[0] as IPoint[];

        this.origin = points[0];

        if (points.length === 3) {
          this.controls = [points[1]];
          this.end = points[2];
        } else if (points.length === 4) {
          this.controls = [points[1], points[2]];
          this.end = points[3];
        } else {
          this.end = points[1];
        }

        break;

      case 3: // quadratic or cubic
        if (Array.isArray(args[1])) {
          this.controls = args[1] as IPoint[];
        } else {
          this.controls = [args[1] as IPoint];
        }

        this.end = args[2] as IPoint;
        break;

      case 4: // cubic params
        this.controls = [args[1] as IPoint, args[2] as IPoint];
        this.end = args[3] as IPoint;
        break;
    }
  }
}

export class BezierCurve implements IModel {
  public models: IModelMap;
  public paths: IPathMap;
  public origin: IPoint;
  public type = BezierCurve.typeName;
  public seed: IPathBezierSeed;
  public accuracy: number;

  constructor(points: IPoint[], accuracy?: number);
  constructor(seed: IPathBezierSeed, accuracy?: number);
  constructor(origin: IPoint, control: IPoint, end: IPoint, accuracy?: number);
  constructor(origin: IPoint, controls: IPoint[], end: IPoint, accuracy?: number);
  constructor(origin: IPoint, control1: IPoint, control2: IPoint, end: IPoint, accuracy?: number);

  constructor(...args: any[]) {
    const isArrayArg0 = Array.isArray(args[0]);

    switch (args.length) {
      case 2:
        if (isArrayArg0) {
          this.accuracy = args[1] as number;
        } else {
          // seed
          this.seed = args[0] as IPathBezierSeed;
          this.accuracy = args[1] as number;
          break;
        }
      // fall through to point array

      case 1: // point array or seed
        if (isArrayArg0) {
          const points = args[0] as IPoint[];
          this.seed = new BezierSeed(points);
        } else {
          this.seed = args[0] as IPathBezierSeed;
        }
        break;

      default:
        switch (args.length) {
          case 4:
            if (isPoint(args[3])) {
              this.seed = new BezierSeed(args as IPoint[]);
              break;
            } else {
              this.accuracy = args[3] as number;
              // fall through
            }
          case 3:
            if (isArrayArg0) {
              this.seed = new BezierSeed(args.slice(0, 3) as IPoint[]);
            }
            break;

          case 5:
            this.accuracy = args[4] as number;
            this.seed = new BezierSeed(args.slice(0, 4) as IPoint[]);
            break;
        }
        break;
    }

    this.paths = {};

    if (measure.isBezierSeedLinear(this.seed)) {
      // use a line and exit

      const line = new paths.Line(point.clone(this.seed.origin), point.clone(this.seed.end));
      (line as IPath as IPathArcInBezierCurve).bezierData = {
        startT: 0,
        endT: 1
      };

      this.paths = {
        '0': line
      };
      return;
    }

    const b = seedToBezier(this.seed);
    const extrema = getExtrema(b);

    this.paths = {};

    // use arcs

    if (!this.accuracy) {
      // get a default accuracy relative to the size of the bezier
      const len = b.length();

      // set the default to be a combination of fast rendering and good smoothing.
      this.accuracy = len / 100;
    }

    let count = 0;
    for (let i = 1; i < extrema.length; i++) {
      const extremaSpan = extrema[i] - extrema[i - 1];
      count += getArcs(this, b, this.accuracy * extremaSpan, extrema[i - 1], extrema[i], count);
    }
  }

  public static typeName = 'BezierCurve';

  public static getBezierSeeds(curve: BezierCurve, options: IFindChainsOptions = {}): IPath[] | { [layer: string]: IPath[] } {
    options.shallow = true;
    options.unifyBeziers = false;

    const seedsByLayer: { [layer: string]: IPath[] } = {};

    const addToLayer: IAddToLayer = (pathToAdd: IPath, layer: string, clone = false) => {
      if (!seedsByLayer[layer]) {
        seedsByLayer[layer] = [];
      }
      seedsByLayer[layer].push(clone ? path.clone(pathToAdd) : pathToAdd);
    };

    chain.findChains(
      curve,
      function (chains: IChain[], loose: IWalkPath[], layer: string) {
        chains.forEach(c => {
          const range = getChainBezierRange(curve, c, layer, addToLayer, options.pointMatchingDistance);
          if (range) {
            const b = getScratch(curve.seed);
            const piece = b.split(range.startT, range.endT);
            addToLayer(BezierToSeed(piece), layer);
          } else {
            c.links.forEach(link => addToLayer(link.walkedPath.pathContext, layer, true));
          }
        });

        loose.forEach(wp => {
          if (wp.pathContext.type === pathType.Line) {
            // bezier is linear
            return addToLayer(wp.pathContext, layer, true);
          }
          const range = getActualBezierRange(
            curve,
            wp.pathContext as IPathArcInBezierCurve,
            point.fromPathEnds(wp.pathContext),
            wp.offset,
            options.pointMatchingDistance
          );
          if (range) {
            const b = getScratch(curve.seed);
            const piece = b.split(range.startT, range.endT);
            addToLayer(BezierToSeed(piece), layer);
          } else {
            addToLayer(wp.pathContext, layer, true);
          }
        });
      },
      options
    );

    if (options.byLayers) {
      return seedsByLayer;
    } else {
      return seedsByLayer[''];
    }
  }

  public static computeLength(seed: IPathBezierSeed): number {
    const b = seedToBezier(seed);
    return b.length();
  }

  public static computePoint(seed: IPathBezierSeed, t: number): IPoint {
    const s = getScratch(seed);
    const computedPoint = s.compute(t);
    return getIPoint(computedPoint);
  }
}

(BezierCurve as any as IKit).metaParameters = [
  {
    title: 'points',
    type: 'select',
    value: [
      [
        [100, 0],
        [-80, -60],
        [100, 220],
        [100, 60]
      ],
      [
        [0, 0],
        [100, 0],
        [100, 100]
      ],
      [
        [0, 0],
        [20, 0],
        [80, 100],
        [100, 100]
      ]
    ]
  }
];
