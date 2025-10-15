import type { IModel, IPoint, IPath, IPathMap, IPathLine, IPathArc } from './schema.js';
import {
  extendObject,
  isObject,
  isModel,
  isPath,
  round,
  unitType,
  pathType,
  type IFindChainsOptions,
  type IContainChainsOptions,
  type IWalkPath,
  type IChain
} from './core.js';
import * as measure from './measure.js';
import * as chain from './chain.js';
import { XmlTag, type IXmlTagAttrs } from './xml.js';
import { tryGetModelUnits, colors, type IExportOptions } from './exporter.js';
import { pathToSVGPathData as pathToData, chainToSVGPathData as chainToData } from './svg-helpers.js';
import * as point from './point.js';
import * as angle from './angle.js';
import * as path from './path.js';
import * as paths from './paths.js';
import * as model from './model.js';
import * as equal from './equal.js';
import { parseNumericList } from './importer.js';
// Use legacy global models if present; avoids compile-time coupling to pending model migrations
declare const Photon: any;
const models: any = (typeof Photon !== 'undefined' && Photon.models) ? Photon.models : ({} as any);

export interface IPathDataByLayerMap {
  [layer: string]: string;
}

// --- SVG Importer (ESM) ---

export interface ISVGImportOptions {
  bezierAccuracy?: number;
}

interface ISVGPathCommand {
  command: string;
  absolute?: boolean;
  data: number[];
  from: IPoint;
  prev?: ISVGPathCommand;
}

export function fromSVGPathData(pathData: string, options: ISVGImportOptions = {}): IModel {
  const result: IModel = {};

  let pathCount = 0;
  const addPath = (p: IPath) => {
    if (!result.paths) result.paths = {} as any;
    (result.paths as any)['p_' + ++pathCount] = p;
  };
  const addModel = (m: IModel) => {
    if (!result.models) result.models = {} as any;
    (result.models as any)['p_' + ++pathCount] = m;
  };

  const getPoint = (cmd: ISVGPathCommand, offset = 0, from: IPoint = cmd.from): IPoint => {
    if (offset < 0) offset = offset + cmd.data.length;
    const p: IPoint = point.mirror([cmd.data[0 + offset], cmd.data[1 + offset]], false, true);
    return cmd.absolute ? p : point.add(p, from);
  };

  const lineTo = (cmd: ISVGPathCommand, end: IPoint) => {
    if (!equal.isPointEqual(cmd.from, end)) {
      addPath(new paths.Line(cmd.from, end));
    }
    return end;
  };

  const map: { [command: string]: (cmd: ISVGPathCommand) => IPoint } = {};

  let firstPoint: IPoint = [0, 0];

  map['M'] = (cmd: ISVGPathCommand) => {
    firstPoint = getPoint(cmd);
    if (cmd.data.length > 2) {
      cmd.from = firstPoint;
      for (let a = 2; a < cmd.data.length; a += 2) {
        cmd.from = lineTo(cmd, getPoint(cmd, a));
      }
      return cmd.from;
    }
    return firstPoint;
  };

  map['Z'] = (cmd: ISVGPathCommand) => lineTo(cmd, firstPoint);

  map['H'] = (cmd: ISVGPathCommand) => {
    const end = point.clone(cmd.from);
    if (cmd.absolute) {
      end[0] = cmd.data[0];
    } else {
      end[0] += cmd.data[0];
    }
    return lineTo(cmd, end);
  };

  map['V'] = (cmd: ISVGPathCommand) => {
    const end = point.clone(cmd.from);
    if (cmd.absolute) {
      end[1] = -cmd.data[0];
    } else {
      end[1] -= cmd.data[0];
    }
    return lineTo(cmd, end);
  };

  map['L'] = (cmd: ISVGPathCommand) => {
    let end: IPoint = cmd.from;
    for (let a = 0; a < cmd.data.length; a += 2) {
      end = getPoint(cmd, a);
      cmd.from = lineTo(cmd, end);
    }
    return cmd.from;
  };

  map['A'] = (cmd: ISVGPathCommand) => {
    let rx: number, ry: number, rotation: number, large: boolean, decreasing: boolean;
    let end: IPoint = cmd.from;
    let elliptic: boolean;
    let xAxis: IPathLine;
    let arc: IPathArc;
    let scaleUp: number;
    let e: IModel;
    for (let a = 0; a < cmd.data.length; a += 7) {
      rx = cmd.data[0 + a];
      ry = cmd.data[1 + a];
      rotation = cmd.data[2 + a];
      large = cmd.data[3 + a] === 1;
      decreasing = cmd.data[4 + a] === 1;
      end = getPoint(cmd, 5 + a);
      elliptic = rx !== ry;
      xAxis = new paths.Line(cmd.from, point.rotate(end, rotation, cmd.from));
      if (elliptic) {
        xAxis = path.distort(xAxis, 1, rx / ry) as IPathLine;
      }
      arc = new paths.Arc(xAxis.origin, xAxis.end, rx, large, decreasing);
      if (elliptic) {
        if (rx < arc.radius) {
          scaleUp = arc.radius / rx;
          rx *= scaleUp;
          ry *= scaleUp;
        }
        e = new models.EllipticArc(arc as any, 1, ry / rx, options.bezierAccuracy) as any;
        model.rotate(e, -rotation, cmd.from);
        addModel(e);
      } else {
        path.rotate(arc, -rotation, cmd.from);
        addPath(arc);
      }
      cmd.from = end;
    }
    return end;
  };

  map['C'] = (cmd: ISVGPathCommand) => {
    let control1: IPoint, control2: IPoint;
    let start: IPoint = cmd.from;
    let end: IPoint = start;
    for (let a = 0; a < cmd.data.length; a += 6) {
      cmd.from = start;
      control1 = getPoint(cmd, 0 + a, start);
      control2 = getPoint(cmd, 2 + a, start);
      end = getPoint(cmd, 4 + a, start);
      addModel(new models.BezierCurve(start, control1, control2, end, options.bezierAccuracy) as any);
      start = end;
    }
    return end;
  };

  map['S'] = (cmd: ISVGPathCommand) => {
    let control1: IPoint, prevControl2: IPoint, control2: IPoint;
    let start: IPoint = cmd.from;
    let end: IPoint = start;
    if (cmd.prev && (cmd.prev.command === 'C' || cmd.prev.command === 'S')) {
      prevControl2 = getPoint(cmd.prev, -4);
    } else {
      prevControl2 = cmd.from;
    }
    for (let a = 0; a < cmd.data.length; a += 4) {
      cmd.from = start;
      control1 = point.rotate(prevControl2, 180, start);
      control2 = getPoint(cmd, 0 + a);
      end = getPoint(cmd, 2 + a);
      addModel(new models.BezierCurve(start, control1, control2, end, options.bezierAccuracy) as any);
      start = end;
      prevControl2 = control2;
    }
    return end;
  };

  map['Q'] = (cmd: ISVGPathCommand) => {
    let control: IPoint;
    let start: IPoint = cmd.from;
    let end: IPoint = start;
    for (let a = 0; a < cmd.data.length; a += 4) {
      cmd.from = start;
      control = getPoint(cmd, 0 + a);
      end = getPoint(cmd, 2 + a);
      addModel(new models.BezierCurve(start, control, end, options.bezierAccuracy) as any);
      start = end;
    }
    return end;
  };

  map['T'] = (cmd: ISVGPathCommand) => {
    let control: IPoint;
    let prevControl: IPoint;
    let end: IPoint = cmd.from;
    if (cmd.prev && cmd.prev.command === 'Q') {
      prevControl = getPoint(cmd.prev, -4);
      control = point.rotate(prevControl, 180, cmd.from);
    } else if (cmd.prev && cmd.prev.command === 'T') {
      cmd.prev.absolute = true;
      control = getPoint(cmd.prev, -2);
    } else {
      control = cmd.from;
    }
    for (let a = 0; a < cmd.data.length; a += 2) {
      end = getPoint(cmd, 0 + a);
      addModel(new models.BezierCurve(cmd.from, control, end, options.bezierAccuracy) as any);
      cmd.from = end;
      control = point.rotate(control, 180, cmd.from);
    }
    // save control point
    const p = point.mirror(control, false, true);
    cmd.data.push(p[0], p[1]);
    return end;
  };

  // Parse and walk the commands
  let currPoint: IPoint = [0, 0];
  let prevCommand: ISVGPathCommand | undefined;
  const regexpCommands = /([achlmqstvz])([0-9e\.,\+-\s]*)/ig;
  let commandMatches: RegExpExecArray | null;
  while ((commandMatches = regexpCommands.exec(pathData)) !== null) {
    if (commandMatches.index === regexpCommands.lastIndex) {
      regexpCommands.lastIndex++;
    }
    const command = commandMatches[1];
    const dataString = commandMatches[2];
    const currCmd: ISVGPathCommand = {
      command: command.toUpperCase(),
      data: [],
      from: currPoint,
      prev: prevCommand
    };
    if (command === currCmd.command) currCmd.absolute = true;
    currCmd.data = parseNumericList(dataString);
    const fn = map[currCmd.command];
    if (fn) currPoint = fn(currCmd);
    prevCommand = currCmd;
  }

  return result;
}

interface IPathDataMap {
  [layer: string]: string[];
}

export interface ISVGPathDataRenderOptions {
  accuracy?: number;
  byLayers?: boolean;
  fillRule?: 'evenodd' | 'nonzero';
  origin?: IPoint;
}

function getPathDataByLayer(modelToExport: IModel, offset: IPoint, options: IFindChainsOptions, accuracy = 0.001) {
  const pathDataByLayer: IPathDataMap = {};
  options.unifyBeziers = true;

  chain.findChains(
    modelToExport,
    function (chains: IChain[], loose: IWalkPath[], layer: string) {
      function single(walkedPath: IWalkPath, clockwise?: boolean) {
        const pathData = pathToData(walkedPath.pathContext, walkedPath.offset, offset, accuracy, clockwise);
        pathDataByLayer[layer].push(pathData);
      }

      pathDataByLayer[layer] = [];

      function doChains(cs: IChain[], clockwise: boolean) {
        cs.forEach(function (c: IChain) {
          if (c.links.length > 1) {
            const pathData = chainToData(c, offset, accuracy);
            pathDataByLayer[layer].push(pathData);
          } else {
            single(c.links[0].walkedPath, clockwise);
          }
          if (c.contains) {
            doChains(c.contains, !clockwise);
          }
        });
      }

      doChains(chains, true);
      loose.forEach(wp => single(wp));
    },
    options
  );

  return pathDataByLayer;
}

export function toSVGPathData(modelToExport: IModel, ...args: any[]): IPathDataByLayerMap | string {
  const options: ISVGPathDataRenderOptions = {
    fillRule: 'evenodd'
  };

  if (typeof args[0] === 'boolean') {
    options.byLayers = args[0];
    options.origin = args[1];
    options.accuracy = args[2];
  } else if (isObject(args[0])) {
    extendObject(options, args[0]);
  }

  const findChainsOptions: IFindChainsOptions = {
    byLayers: options.byLayers,
    contain: false
  };

  if (options.fillRule === 'nonzero') {
    findChainsOptions.contain = <IContainChainsOptions>{
      alternateDirection: true
    };
  }

  const size = measure.modelExtents(modelToExport);
  if (!options.origin) {
    options.origin = [-size.low[0], size.high[1]];
  }

  const pathDataArrayByLayer = getPathDataByLayer(modelToExport, options.origin, findChainsOptions, options.accuracy);
  const pathDataStringByLayer: IPathDataByLayerMap = {};

  for (const layer in pathDataArrayByLayer) {
    pathDataStringByLayer[layer] = pathDataArrayByLayer[layer].join(' ');
  }

  return findChainsOptions.byLayers ? pathDataStringByLayer : pathDataStringByLayer[''];
}

// --- Minimal SVG rendering (path elements only) ---

export interface ISVGElementRenderOptions {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  cssStyle?: string;
  className?: string;
}

export interface IFlowAnnotation {
  size: number;
}

export interface ISVGRenderOptions extends IExportOptions, ISVGElementRenderOptions {
  accuracy?: number;
  svgAttrs?: IXmlTagAttrs;
  fontSize?: string;
  scale?: number;
  annotate?: boolean;
  flow?: IFlowAnnotation;
  origin?: IPoint;
  useSvgPathOnly?: boolean;
  viewBox?: boolean;
  scalingStroke?: boolean;
  layerOptions?: Record<string, ISVGElementRenderOptions>;
  fillRule?: 'evenodd' | 'nonzero';
}

export interface SvgUnitConversion {
  [unit: string]: { svgUnitType: string; scaleConversion: number };
}

export const svgUnit: SvgUnitConversion = {
  [unitType.Inch]: { svgUnitType: 'in', scaleConversion: 1 },
  [unitType.Millimeter]: { svgUnitType: 'mm', scaleConversion: 1 },
  [unitType.Centimeter]: { svgUnitType: 'cm', scaleConversion: 1 },
  [unitType.Foot]: { svgUnitType: 'in', scaleConversion: 12 },
  [unitType.Meter]: { svgUnitType: 'cm', scaleConversion: 100 }
};

function cssStyle(elOpts: ISVGElementRenderOptions) {
  const a: string[] = [];
  const push = (name: string, val: string | undefined) => {
    if (val === undefined) return;
    a.push(name + ':' + val);
  };
  push('stroke', elOpts.stroke);
  push('stroke-width', elOpts.strokeWidth);
  push('fill', elOpts.fill);
  return a.join(';');
}

function addSvgAttrs(attrs: IXmlTagAttrs, elOpts?: ISVGElementRenderOptions) {
  if (!elOpts) return;
  extendObject(attrs, {
    stroke: elOpts.stroke,
    'stroke-width': elOpts.strokeWidth,
    fill: elOpts.fill,
    style: (elOpts as any).cssStyle || cssStyle(elOpts),
    class: elOpts.className
  });
}

function colorLayerOptions(layer: string, layerOptions?: Record<string, ISVGElementRenderOptions>) {
  if (layerOptions && layerOptions[layer]) return layerOptions[layer];
  if (layer in colors) {
    return { stroke: layer } as ISVGElementRenderOptions;
  }
}

export function toSVG(itemToExport: any, options: ISVGRenderOptions = {}): string {
  // defaults
  const opts: ISVGRenderOptions = {
    accuracy: 0.001,
    annotate: false,
    origin: null as any,
    scale: 1,
    stroke: '#000',
    strokeWidth: '0.25mm',
    fill: 'none',
    fillRule: 'evenodd',
    fontSize: '9pt',
    useSvgPathOnly: true,
    viewBox: true,
    scalingStroke: false,
    ...options
  };

  let modelToExport: IModel;
  const itemIsModel = isModel(itemToExport);
  if (itemIsModel) {
    modelToExport = itemToExport as IModel;
  } else if (Array.isArray(itemToExport)) {
    const pathMap: IPathMap = {};
    (itemToExport as IPath[]).forEach((p, i) => { pathMap[String(i)] = p; });
    modelToExport = { paths: pathMap } as IModel;
  } else if (isPath(itemToExport)) {
    modelToExport = { paths: { modelToMeasure: itemToExport as IPath } } as any;
  } else {
    return '';
  }

  // units
  if (!opts.units) {
    const unitSystem = tryGetModelUnits(itemToExport);
    if (unitSystem) opts.units = unitSystem;
  }
  const useSvgUnit = opts.units ? svgUnit[opts.units] : undefined;

  // size and origin
  const size = measure.modelExtents(modelToExport);
  if (!opts.origin) {
    if (size) {
      const scale = opts.scale ?? 1;
      const left = -size.low[0] * scale;
      opts.origin = [left, size.high[1] * scale];
    } else {
      opts.origin = [0, 0];
    }
  }

  // Include caption extents before sizing to ensure viewBox fits text
  const captionsForSizing = model.getAllCaptionsOffset(modelToExport);
  if (captionsForSizing && captionsForSizing.length && size) {
    captionsForSizing.forEach(c => {
      measure.increase(size, measure.pathExtents(c.anchor), true);
    });
  }

  // begin SVG
  const elements: string[] = [];

  let svgAttrs: IXmlTagAttrs = {};
  if (size && opts.viewBox) {
    let scaleFactor = opts.scale ?? 1;
    if (useSvgUnit && opts.viewBox) {
      scaleFactor *= useSvgUnit.scaleConversion;
    }
    const width = round(size.width * scaleFactor, opts.accuracy);
    const height = round(size.height * scaleFactor, opts.accuracy);
    const viewBox = [0, 0, width, height];
    const unit = useSvgUnit ? useSvgUnit.svgUnitType : '';
    svgAttrs = {
      width: String(width) + unit,
      height: String(height) + unit,
      viewBox: viewBox.join(' ')
    };
  }
  svgAttrs['xmlns'] = 'http://www.w3.org/2000/svg';
  const svgTag = new XmlTag('svg', extendObject(svgAttrs, opts.svgAttrs));
  elements.push(svgTag.getOpeningTag(false));

  const groupAttrs: IXmlTagAttrs = {
    id: 'svgGroup',
    'stroke-linecap': 'round',
    'fill-rule': opts.fillRule,
    'font-size': opts.fontSize
  };
  addSvgAttrs(groupAttrs, opts);
  const svgGroup = new XmlTag('g', groupAttrs);
  elements.push(svgGroup.getOpeningTag(false));

  // Captions for rendering
  const captions = model.getAllCaptionsOffset(modelToExport);

  if (opts.useSvgPathOnly) {
    // Path-only rendering (existing behavior)
    const findChainsOptions: IFindChainsOptions = { byLayers: true };
    if (opts.fillRule === 'nonzero') {
      findChainsOptions.contain = <IContainChainsOptions>{ alternateDirection: true };
    }
    const pathDataByLayer = getPathDataByLayer(modelToExport, opts.origin!, findChainsOptions, opts.accuracy);
    for (const layerId in pathDataByLayer) {
      const pathData = pathDataByLayer[layerId].join(' ');
      const attrs: IXmlTagAttrs = { d: pathData } as any;
      if (layerId.length > 0) {
        (attrs as any).id = layerId;
      }
      addSvgAttrs(attrs, colorLayerOptions(layerId, opts.layerOptions));
      const pathTag = new XmlTag('path', attrs);
      elements.push(pathTag.toString());
    }
  } else {
    // Full element rendering (non-path mode)
    const layers: Record<string, string[]> = {};

    const append = (value: string, layer?: string, forcePush = false) => {
      if (!forcePush && typeof layer === 'string' && layer.length > 0) {
        if (!(layer in layers)) layers[layer] = [];
        layers[layer].push(value);
      } else {
        elements.push(value);
      }
    };

    const addSvgAttrsLocal = (attrs: IXmlTagAttrs, layer: string) => {
      addSvgAttrs(attrs, colorLayerOptions(layer, opts.layerOptions));
      if (!opts.scalingStroke) {
        (attrs as any)['vector-effect'] = 'non-scaling-stroke';
      }
    };

    const createElementLocal = (tagname: string, attrs: IXmlTagAttrs, layer: string, innerText: string | null = null, forcePush = false) => {
      if (tagname !== 'text') {
        addSvgAttrsLocal(attrs, layer);
      }
      const tag = new XmlTag(tagname, attrs);
      if (innerText) tag.innerText = innerText;
      append(tag.toString(), layer, forcePush);
    };

    const fixPoint = (p: IPoint): IPoint => {
      const mirrored = point.mirror(p, false, true);
      return point.scale(mirrored, opts.scale ?? 1);
    };

    const fixPath = (p: any, origin: IPoint): any => {
      const mirrorY = path.mirror(p, false, true);
      const scaled = path.scale(mirrorY, opts.scale ?? 1);
      return path.moveRelative(scaled, origin);
    };

    // Local helpers for arcs and beziers (duplicated to avoid exporting internals)
    const svgArcData = (d: any[], radius: number, endPoint: IPoint, accuracy = 0.001, largeArc?: boolean, increasing?: boolean) => {
      const r = round(radius, accuracy);
      d.push(r, r);
      d.push(0);
      d.push(largeArc ? 1 : 0);
      d.push(increasing ? 0 : 1);
      d.push(round(endPoint[0], accuracy), round(endPoint[1], accuracy));
    };

    const svgBezierData = (d: any[], seed: any, accuracy = 0.001, reversed?: boolean) => {
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
    };

    const drawText = (id: string, textPoint: IPoint, layer: string) => {
      createElementLocal('text', {
        id: id + '_text',
        x: round(textPoint[0], opts.accuracy),
        y: round(textPoint[1], opts.accuracy)
      } as any, layer, id);
    };

    const drawPath = (id: string, x: number, y: number, d: any[], layer: string, route: string[] | null, textPoint: IPoint, annotate: boolean) => {
      const attrs: IXmlTagAttrs = {
        id,
        d: ['M', round(x, opts.accuracy), round(y, opts.accuracy)].concat(d).join(' ')
      } as any;
      if (route) (attrs as any)['data-route'] = route;
      createElementLocal('path', attrs, layer);
      if (annotate) drawText(id, textPoint, layer);
    };

    const addFlowMarks = (flow: IFlowAnnotation | undefined, layer: string, origin: IPoint, end: IPoint, endAngle: number) => {
      if (!flow) return;
      const className = 'flow';
      // origin circle
      createElementLocal('circle', {
        r: flow.size / 2,
        cx: round(origin[0], opts.accuracy),
        cy: round(origin[1], opts.accuracy),
        class: className
      } as any, layer);
      // arrow lines
      const arrowEnd: IPoint = [-1 * flow.size, flow.size / 2];
      const p1 = point.add(point.rotate(arrowEnd, endAngle), end);
      const p2 = point.mirror(arrowEnd, false, true);
      const p2r = point.add(point.rotate(p2, endAngle), end);
      createElementLocal('line', {
        x1: round(p1[0], opts.accuracy), y1: round(p1[1], opts.accuracy),
        x2: round(end[0], opts.accuracy), y2: round(end[1], opts.accuracy),
        class: className
      } as any, layer);
      createElementLocal('line', {
        x1: round(p2r[0], opts.accuracy), y1: round(p2r[1], opts.accuracy),
        x2: round(end[0], opts.accuracy), y2: round(end[1], opts.accuracy),
        class: className
      } as any, layer);
    };

    const map: { [type: string]: (id: string, pathValue: any, layer: string, className: string | null, route: string[] | null, annotate: boolean) => void } = {};

    map[pathType.Line] = (id, line, layer, className, route, annotate) => {
      const start = line.origin;
      const end = line.end;
      const attrs: IXmlTagAttrs = {
        id,
        x1: round(start[0], opts.accuracy), y1: round(start[1], opts.accuracy),
        x2: round(end[0], opts.accuracy), y2: round(end[1], opts.accuracy)
      } as any;
      if (className) (attrs as any).class = className;
      if (route) (attrs as any)['data-route'] = route;
      createElementLocal('line', attrs, layer);
      if (annotate) drawText(id, point.middle(line), layer);
      if (opts.flow) addFlowMarks(opts.flow, layer, line.origin, line.end, angle.ofLineInDegrees(line));
    };

    map[pathType.Circle] = (id, circle, layer, className, route, annotate) => {
      const center = circle.origin;
      const attrs: IXmlTagAttrs = {
        id,
        r: circle.radius,
        cx: round(center[0], opts.accuracy), cy: round(center[1], opts.accuracy)
      } as any;
      if (className) (attrs as any).class = className;
      if (route) (attrs as any)['data-route'] = route;
      createElementLocal('circle', attrs, layer);
      if (annotate) drawText(id, center, layer);
    };

    map[pathType.Arc] = (id, arc, layer, className, route, annotate) => {
      // normalize arc angles
      const arcSpan = angle.ofArcSpan(arc);
      arc.startAngle = angle.noRevolutions(arc.startAngle);
      arc.endAngle = arc.startAngle + arcSpan;
      const arcPoints = point.fromArc(arc);
      if (equal.isPointEqual(arcPoints[0], arcPoints[1])) {
        map[pathType.Circle](id, { origin: arc.origin, radius: arc.radius }, layer, className, route, annotate);
      } else {
        const d: any[] = ['A'];
        svgArcData(d, arc.radius, arcPoints[1], opts.accuracy, angle.ofArcSpan(arc) > 180, arc.startAngle > arc.endAngle);
        drawPath(id, arcPoints[0][0], arcPoints[0][1], d, layer, route, point.middle(arc), annotate);
        addFlowMarks(opts.flow, layer, arcPoints[1], arcPoints[0], angle.noRevolutions(arc.startAngle - 90));
      }
    };

    map[pathType.BezierSeed] = (id, seed, layer, className, route, annotate) => {
      const d: any[] = [];
      svgBezierData(d, seed, opts.accuracy);
      drawPath(id, seed.origin[0], seed.origin[1], d, layer, route, point.middle(seed), annotate);
    };

    const modelGroup = new XmlTag('g');

    const beginModel = (id: string, modelContext: IModel) => {
      modelGroup.attrs = { id } as any;
      append(modelGroup.getOpeningTag(false), modelContext.layer);
    };

    const endModel = (modelContext: IModel) => {
      append(modelGroup.getClosingTag(), modelContext.layer);
    };

    beginModel('0', modelToExport);

    const walkOptions: any = {
      beforeChildWalk: (walkedModel: any) => { beginModel(walkedModel.childId, walkedModel.childModel); return true; },
      onPath: (walkedPath: any) => {
        const pctx = walkedPath.pathContext;
        const layer = walkedPath.layer;
        const offset = point.add(fixPoint(walkedPath.offset), opts.origin!);
        const fixed = fixPath(pctx, offset);
        switch (pctx.type) {
          case pathType.Line:
            map[pathType.Line](walkedPath.pathId, fixed, layer, null, walkedPath.route, opts.annotate);
            break;
          case pathType.Circle:
            map[pathType.Circle](walkedPath.pathId, fixed, layer, null, walkedPath.route, opts.annotate);
            break;
          case pathType.Arc:
            map[pathType.Arc](walkedPath.pathId, fixed, layer, null, walkedPath.route, opts.annotate);
            break;
          case pathType.BezierSeed:
            map[pathType.BezierSeed](walkedPath.pathId, fixed, layer, null, walkedPath.route, opts.annotate);
            break;
          default:
            // fallback to path element for unknown types
            const d = pathToData(pctx, walkedPath.offset, opts.origin!, opts.accuracy);
            const attrs: IXmlTagAttrs = { id: walkedPath.pathId, d } as any;
            createElementLocal('path', attrs, layer);
            break;
        }
      },
      afterChildWalk: (walkedModel: any) => { endModel(walkedModel.childModel); }
    };

    model.walk(modelToExport, walkOptions);

    // export layers as groups
    for (const layerId in layers) {
      const layerGroup = new XmlTag('g', { id: layerId } as any);
      addSvgAttrs(layerGroup.attrs, colorLayerOptions(layerId, opts.layerOptions));
      layerGroup.innerText = layers[layerId].join('');
      layerGroup.innerTextEscaped = true;
      elements.push(layerGroup.toString());
    }

    endModel(modelToExport);

    // Captions
    if (captions && captions.length) {
      const captionTags = captions.map(caption => {
        const anchor = fixPath(caption.anchor, opts.origin!) as any;
        const center = point.rounded(point.middle(anchor), opts.accuracy);
        const tag = new XmlTag('text', {
          'alignment-baseline': 'middle',
          'text-anchor': 'middle',
          transform: `rotate(${angle.ofLineInDegrees(anchor)},${center[0]},${center[1]})`,
          x: center[0],
          y: center[1]
        } as any);
        addSvgAttrs(tag.attrs, colorLayerOptions(caption.layer, opts.layerOptions));
        tag.innerText = caption.text;
        return tag.toString();
      });
      if (captionTags.length) {
        const captionGroup = new XmlTag('g', { id: 'captions' } as any);
        addSvgAttrs(captionGroup.attrs, colorLayerOptions('captions', opts.layerOptions));
        captionGroup.innerText = captionTags.join('');
        captionGroup.innerTextEscaped = true;
        elements.push(captionGroup.toString());
      }
    }
  }

  elements.push(svgGroup.getClosingTag());
  elements.push(svgTag.getClosingTag());
  return elements.join('');
}
