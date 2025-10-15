import type { IModel, IPoint, IPath, IPathCircle, IPathLine, IPathArc } from './schema.js';
import type { IChain, IChainLink, IChainsMap, IFindChainsOptions, IPointMatchOptions, IFindLoopsOptions } from './core.js';
import { extendObject, isNumber, round, pathType } from './core.js';
import * as point from './point.js';
import * as angle from './angle.js';
import * as paths from './paths.js';
import * as measure from './measure.js';
import * as chain from './chain.js';
import * as model from './model.js';
import type { IExportOptions } from './exporter.js';
import type * as jscad from '../types/jscad.js';

export interface IStatusCallback {
  (status: { progress: number }): void;
}

type ChainHandler = (pathValue: IPath, link: IChainLink) => void;

function wrap(prefix: string, content: string, condition?: any): string {
  if (!prefix) return content;
  if (condition) {
    return prefix + '(' + content + ')';
  }
  return prefix + content;
}

function facetSizeToResolution(arcOrCircle: IPathCircle, facetSize?: number): number | undefined {
  if (!facetSize) return undefined;

  const circle = new paths.Circle([0, 0], arcOrCircle.radius);
  const length = measure.pathLength(circle);
  if (!length) return undefined;

  return Math.ceil(length / facetSize);
}

function chainToJscadScript(chainContext: IChain, facetSize?: number, accuracy?: number): string {
  let head = '';
  let tail = '';
  let first = true;
  let exit = false;
  let reverseTail = false;

  const beginMap: Partial<Record<string, ChainHandler>> = {};

  beginMap[pathType.Circle] = function (circlePath: IPath, link: IChainLink) {
    const circle = circlePath as IPathCircle;
    const circleOptions: jscad.CSG.ICircleOptions = {
      center: point.rounded(point.add(circle.origin, link.walkedPath.offset), accuracy) as number[],
      radius: round(circle.radius, accuracy),
      resolution: facetSizeToResolution(circle, facetSize)
    };
    head = wrap('CAG.circle', JSON.stringify(circleOptions), true);
    exit = true;
  };

  beginMap[pathType.Line] = function (linePath: IPath, link: IChainLink) {
    let points = link.endPoints.map(p => point.rounded(p, accuracy));
    if (link.reversed) {
      points.reverse();
    }
    head = wrap('new CSG.Path2D', JSON.stringify(points), true);
  };

  beginMap[pathType.Arc] = function (arcPath: IPath, link: IChainLink) {
    const arc = arcPath as IPathArc;
    const endAngle = angle.ofArcEnd(arc);
    if (link.reversed) {
      reverseTail = true;
    }
    const arcOptions: jscad.CSG.IArcOptions = {
      center: point.rounded(point.add(arc.origin, link.walkedPath.offset), accuracy) as number[],
      radius: round(arc.radius, accuracy),
      startangle: round(arc.startAngle, accuracy),
      endangle: round(endAngle, accuracy),
      resolution: facetSizeToResolution(arc, facetSize)
    };
    head = wrap('new CSG.Path2D.arc', JSON.stringify(arcOptions), true);
  };

  const appendMap: Partial<Record<string, ChainHandler>> = {};

  appendMap[pathType.Line] = function (_linePath: IPath, link: IChainLink) {
    const reverse = reverseTail != link.reversed;
    const endPoint = point.rounded(link.endPoints[reverse ? 0 : 1], accuracy);
    append(wrap('.appendPoint', JSON.stringify(endPoint), true));
  };

  appendMap[pathType.Arc] = function (arcPath: IPath, link: IChainLink) {
    const arc = arcPath as IPathArc;
    const reverse = reverseTail != link.reversed;
    const endAngle = angle.ofArcEnd(arc);
    const arcOptions: jscad.CSG.IEllpiticalArcOptions = {
      radius: round(arc.radius, accuracy),
      clockwise: reverse,
      large: Math.abs(endAngle - arc.startAngle) > 180,
      resolution: facetSizeToResolution(arc, facetSize)
    };
    const endPoint = point.rounded(link.endPoints[reverse ? 0 : 1], accuracy);
    append(wrap('.appendArc', JSON.stringify(endPoint) + ',' + JSON.stringify(arcOptions), true));
  };

  function append(s: string) {
    if (reverseTail) {
      tail = s + tail;
    } else {
      tail += s;
    }
  }

  for (let i = 0; i < chainContext.links.length; i++) {
    const link = chainContext.links[i];
    const pathContext = link.walkedPath.pathContext;

    const fn = (first ? beginMap[pathContext.type] : appendMap[pathContext.type]) as ChainHandler | undefined;

    if (fn) {
      fn(pathContext, link);
    }

    if (exit) {
      return head;
    }

    first = false;
  }

  return head + tail + '.close().innerToCAG()';
}

interface IAdd<T> {
  cag: T;
  subtracts: T[][];
}

interface IOperate<T> {
  (a: T, b: T): T;
}

function makePhasedCallback(originalCb: IStatusCallback | undefined, phaseStart: number, phaseSpan: number): IStatusCallback | undefined {
  if (!originalCb) return undefined;
  return function statusCallback(status) {
    originalCb({ progress: phaseStart + (status.progress * phaseSpan) / 100 });
  };
}

function convertChainsTo2D<T>(
  convertToT: { (c: IChain, maxArcFacet: number): T },
  union: IOperate<T>,
  subtraction: IOperate<T>,
  modelToExport: IModel,
  jsCadCagOptions: IJscadCagOptions = {}
) {
  const adds: { [layerId: string]: IAdd<T>[] } = {};
  const status = { total: 0, complete: 0 };

  function unionize(phaseStart: number, phaseSpan: number, arr: T[]) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i += 1) {
      result = union(result, arr[i]);
    }
    status.complete++;

    jsCadCagOptions.statusCallback &&
      jsCadCagOptions.statusCallback({ progress: phaseStart + (phaseSpan * status.complete) / status.total });

    return result;
  }

  function subtractChains(layerId: string, cs: IChain[]) {
    const subtracts: T[] = [];
    cs.forEach(c => {
      if (!c.endless) return;
      if (c.contains) {
        addChains(layerId, c.contains);
      }
      status.total++;
      subtracts.unshift(convertToT(c, jsCadCagOptions.maxArcFacet!));
    });
    return subtracts;
  }

  function addChains(layerId: string, cs: IChain[]) {
    cs.forEach(c => {
      if (!c.endless) return;
      const add: IAdd<T> = { cag: convertToT(c, jsCadCagOptions.maxArcFacet!), subtracts: [] };
      if (c.contains) {
        const subtracts = subtractChains(layerId, c.contains);
        if (subtracts.length > 0) {
          add.subtracts.push(subtracts);
        }
      }
      status.total++;
      if (!(layerId in adds)) {
        adds[layerId] = [];
      }
      adds[layerId].unshift(add);
    });
  }

  const options: IFindChainsOptions = {
    pointMatchingDistance: jsCadCagOptions.pointMatchingDistance,
    byLayers: jsCadCagOptions.byLayers,
    contain: true
  };

  jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 25 });

  const chainsResult = chain.findChains(modelToExport, options);
  if (!chainsResult) {
    jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });
    throw new Error('No closed geometries found.');
  }

  if (Array.isArray(chainsResult)) {
    addChains('', chainsResult);
  } else {
    const chainsByLayer = chainsResult as IChainsMap;
    Object.keys(chainsByLayer).forEach(layerId => {
      addChains(layerId, chainsByLayer[layerId] ?? []);
    });
  }

  jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 50 });

  let closedCount = 0;
  for (const layerId in adds) {
    closedCount += adds[layerId].length;
  }
  if (closedCount === 0) {
    jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });
    throw new Error('No closed geometries found.');
  }

  const resultMap: { [layerId: string]: T } = {};

  for (const layerId in adds) {
    const flatAdds = adds[layerId].map(add => {
      let result = add.cag;
      add.subtracts.forEach(subtract => {
        const union = unionize(50, 50, subtract);
        result = subtraction(result, union);
      });
      return result;
    });
    resultMap[layerId] = unionize(50, 50, flatAdds);
  }

  jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });

  return options.byLayers ? resultMap : resultMap[''];
}

/**
 * Converts a model to a @jscad/csg CAG object - 2D to 2D. See https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#2D_Paths
 *
 * Example:
 * ```
 * //First, use npm install @jscad/csg from the command line in your jscad project
 * //Create a CAG instance from a model.
 * var { CAG } = require('@jscad/csg');
 * var model = new makerjs.models.Ellipse(70, 40);
 * var cag = makerjs.exporter.toJscadCAG(CAG, model, {maxArcFacet: 1});
 * ```
 *
 * @param jscadCAG @jscad/csg CAG engine, see https://www.npmjs.com/package/@jscad/csg
 * @param modelToExport Model object to export.
 * @param options Optional options object.
 * @param options.byLayers Optional flag to separate chains by layers.
 * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
 * @param options.maxArcFacet The maximum length between points on an arc or circle.
 * @param options.statusCallback Optional callback function to get the percentage complete.
 * @returns jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.
 */
export function toJscadCAG(
  jscadCAG: typeof jscad.CAG,
  modelToExport: IModel,
  jsCadCagOptions?: IJscadCagOptions
): jscad.CAG | { [layerId: string]: jscad.CAG } {
  function chainToJscadCag(c: IChain, maxArcFacet: number) {
    const keyPoints = chain.toKeyPoints(c, maxArcFacet).map(pt => [pt[0], pt[1]] as number[]);
    if (keyPoints.length > 0) {
      keyPoints.push([keyPoints[0][0], keyPoints[0][1]]);
    }
    return jscadCAG.fromPoints(keyPoints as number[][]);
  }

  function jscadCagUnion(augend: jscad.CAG, addend: jscad.CAG) {
    return augend.union(addend);
  }

  function jscadCagSubtraction(minuend: jscad.CAG, subtrahend: jscad.CAG) {
    return minuend.subtract(subtrahend);
  }

  return convertChainsTo2D<jscad.CAG>(chainToJscadCag, jscadCagUnion, jscadCagSubtraction, modelToExport, jsCadCagOptions);
}

function convert2Dto3D<T2D, T3D>(
  to2D: { (options: IJscadCsgOptions): T2D | { [layerId: string]: T2D } },
  to3D: { (result2D: T2D, extrude: number, z: number): T3D },
  union3D: { (a: T3D, b: T3D): T3D },
  modelToExport: IModel,
  options: IJscadCsgOptions = {}
) {
  const originalCb = options.statusCallback;

  function getDefinedNumber(a: number | undefined, b: number | undefined) {
    if (isNumber(a)) return a;
    return b;
  }

  if (modelToExport.exporterOptions) {
    extendObject(options, modelToExport.exporterOptions['toJscadCSG']);
  }

  options.byLayers = options.byLayers || (options.layerOptions && true);
  options.statusCallback = makePhasedCallback(originalCb, 0, 50);

  const result2D = to2D(options);
  const csgs: T3D[] = [];

  if (options.byLayers) {
    const map = result2D as { [layerId: string]: T2D };
    for (const layerId in map) {
      if (!Object.prototype.hasOwnProperty.call(map, layerId)) continue;
      const layerOptions = (options.layerOptions && options.layerOptions[layerId]) || {};
      const csg = to3D(map[layerId], layerOptions.extrude ?? options.extrude!, getDefinedNumber(layerOptions.z, options.z)!);
      csgs.push(csg);
    }
  } else {
    const csg = to3D(result2D as T2D, options.extrude!, options.z!);
    csgs.push(csg);
  }

  options.statusCallback = makePhasedCallback(originalCb, 50, 100);

  if (csgs.length === 0) {
    throw new Error('No extrusions generated.');
  }

  const status = { total: Math.max(csgs.length - 1, 1), complete: 0 };

  let result = csgs[0];
  for (let i = 1; i < csgs.length; i += 1) {
    result = union3D(result, csgs[i]);
    status.complete++;
    options.statusCallback && options.statusCallback({ progress: status.complete / status.total });
  }

  return result;
}

/**
 * Converts a model to a @jscad/csg CSG object - 2D to 3D.
 *
 * Example:
 * ```
 * //First, use npm install @jscad/csg from the command line in your jscad project
 * //Create a CSG instance from a model.
 * var { CAG } = require('@jscad/csg');
 * var model = new makerjs.models.Ellipse(70, 40);
 * var csg = makerjs.exporter.toJscadCSG(CAG, model, {maxArcFacet: 1, extrude: 10});
 * ```
 *
 * @param jscadCAG @jscad/csg CAG engine, see https://www.npmjs.com/package/@jscad/csg
 * @param modelToExport Model object to export.
 * @param options Optional options object.
 * @param options.byLayers Optional flag to separate chains by layers.
 * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
 * @param options.maxArcFacet The maximum length between points on an arc or circle.
 * @param options.statusCallback Optional callback function to get the percentage complete.
 * @param options.extrude Optional default extrusion distance.
 * @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
 * @returns jscad CAG object in 2D, or a map (keyed by layer id) of jscad CAG objects - if options.byLayers is true.
 */
export function toJscadCSG(jscadCAG: typeof jscad.CAG, modelToExport: IModel, options?: IJscadCsgOptions): jscad.CSG {
  function to2D(opts: IJscadCsgOptions) {
    return toJscadCAG(jscadCAG, modelToExport, opts);
  }

  function to3D(cag: jscad.CAG, extrude: number, z: number) {
    let csg = cag.extrude({ offset: [0, 0, extrude] });
    if (z) {
      csg = csg.translate([0, 0, z]);
    }
    return csg;
  }

  function union3D(augend: jscad.CSG, addend: jscad.CSG) {
    return augend.union(addend);
  }

  return convert2Dto3D<jscad.CAG, jscad.CSG>(to2D, to3D, union3D, modelToExport, options);
}

/**
 * Creates a string of JavaScript code for execution with a Jscad environment.
 *
 * @param modelToExport Model object to export.
 * @param options Export options object.
 * @param options.byLayers Optional flag to separate chains by layers.
 * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
 * @param options.maxArcFacet The maximum length between points on an arc or circle.
 * @param options.statusCallback Optional callback function to get the percentage complete.
 * @param options.extrude Optional default extrusion distance.
 * @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
 * @returns String of JavaScript containing a main() function for Jscad.
 */
export function toJscadScript(modelToExport: IModel, options: IJscadScriptOptions = {}) {
  function _chainToJscadScript(c: IChain, maxArcFacet: number) {
    return wrap('', chainToJscadScript(c, maxArcFacet, options.accuracy));
  }

  function scriptUnion(augend: string, addend: string) {
    return augend + `.union(${addend})`;
  }

  function scriptSubtraction(minuend: string, subtrahend: string) {
    return minuend + `.subtract(${subtrahend})`;
  }

  function to2D(opts: IJscadCsgOptions) {
    return convertChainsTo2D<string>(_chainToJscadScript, scriptUnion, scriptSubtraction, modelToExport, options);
  }

  function to3D(cag: string, extrude: number, z: number) {
    let csg = cag + `.extrude({ offset: [0, 0, ${extrude}] })`;
    if (z) {
      csg = csg + `.translate([0, 0, ${z}])`;
    }
    return csg;
  }

  function wrapScript(s: string) {
    return `${nl}${indent}${s}${nl}`;
  }

  const indent = new Array((options.indent || 0) + 1).join(' ');
  const nl = options.indent ? '\n' : '';

  const result = convert2Dto3D<string, string>(to2D, to3D, scriptUnion, modelToExport, options).trim();

  return `function ${options.functionName || 'main'}(){${wrapScript(`return ${result};`)}}${nl}`;
}

/**
 * Exports a model in STL format - 2D to 3D.
 *
 * @param jscadCAG @jscad/csg CAG engine, see https://www.npmjs.com/package/@jscad/csg
 * @param stlSerializer @jscad/stl-serializer, see https://www.npmjs.com/package/@jscad/stl-serializer
 * @param modelToExport Model object to export.
 * @param options Optional options object.
 * @param options.byLayers Optional flag to separate chains by layers.
 * @param options.pointMatchingDistance Optional max distance to consider two points as the same.
 * @param options.maxArcFacet The maximum length between points on an arc or circle.
 * @param options.statusCallback Optional callback function to get the percentage complete.
 * @param options.extrude Optional default extrusion distance.
 * @param options.layerOptions Optional object map of options per layer, keyed by layer name. Each value for a key is an object with 'extrude' and 'z' properties.
 * @returns String in STL ASCII format.
 */
export function toJscadSTL(
  CAG: typeof jscad.CAG,
  stlSerializer: jscad.StlSerializer,
  modelToExport: IModel,
  options: IJscadCsgOptions = {}
) {
  const originalCb = options.statusCallback;
  options.statusCallback = makePhasedCallback(originalCb, 0, 50);
  const csg = toJscadCSG(CAG, modelToExport, options);
  return stlSerializer.serialize(csg, { binary: false, statusCallback: makePhasedCallback(originalCb, 50, 50) });
}

/**
 * OpenJsCad export options.
 */
export interface IOpenJsCadOptions extends IFindLoopsOptions, IExportOptions {
  /**
   * Optional depth of 3D extrusion.
   */
  extrusion?: number;

  /**
   * Optional size of curve facets.
   */
  facetSize?: number;

  /**
   * Optional override of function name, default is "main".
   */
  functionName?: string;

  /**
   * Optional options applied to specific first-child models by model id.
   */
  modelMap?: IOpenJsCadOptionsMap;
}

/**
 * Map of OpenJsCad export options.
 */
export interface IOpenJsCadOptionsMap {
  [modelId: string]: IOpenJsCadOptions;
}

/**
 * Jscad CAG export options.
 */
export interface IJscadCagOptions extends IExportOptions, IPointMatchOptions {
  /**
   * Flag to separate chains by layers.
   */
  byLayers?: boolean;

  /**
   * The maximum length between points on an arc or circle.
   */
  maxArcFacet?: number;

  /**
   * Optional callback to get status during the export.
   */
  statusCallback?: IStatusCallback;
}

/**
 * Jscad CAG extrusion options.
 */
export interface IJscadExtrudeOptions {
  /**
   * Optional depth of 3D extrusion.
   */
  extrude?: number;

  /**
   * Optional depth of 3D extrusion.
   */
  z?: number;
}

/**
 * Jscad CSG export options.
 */
export interface IJscadCsgOptions extends IJscadCagOptions, IJscadExtrudeOptions {
  /**
   * SVG options per layer.
   */
  layerOptions?: { [layerId: string]: IJscadExtrudeOptions };
}

/**
 * Jscad Script export options.
 */
export interface IJscadScriptOptions extends IJscadCsgOptions {
  /**
   * Optional override of function name, default is "main".
   */
  functionName?: string;

  /**
   * Optional number of spaces to indent.
   */
  indent?: number;
}
