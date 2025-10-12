import { extendObject, isObject, isModel, isPath, round, unitType, pathType } from './maker.js';
import * as measure from './measure.js';
import * as chain from './chain.js';
import { XmlTag } from './xml.js';
import { tryGetModelUnits, colors } from './exporter.js';
import { pathToSVGPathData as pathToData, chainToSVGPathData as chainToData } from './svg-helpers.js';
import * as point from './point.js';
import * as angle from './angle.js';
import * as path from './path.js';
import * as paths from './paths.js';
import * as model from './model.js';
import * as equal from './equal.js';
import { parseNumericList } from './importer.js';
const models = (typeof MakerJs !== 'undefined' && MakerJs.models) ? MakerJs.models : {};
export function fromSVGPathData(pathData, options = {}) {
    const result = {};
    let pathCount = 0;
    const addPath = (p) => {
        if (!result.paths)
            result.paths = {};
        result.paths['p_' + ++pathCount] = p;
    };
    const addModel = (m) => {
        if (!result.models)
            result.models = {};
        result.models['p_' + ++pathCount] = m;
    };
    const getPoint = (cmd, offset = 0, from = cmd.from) => {
        if (offset < 0)
            offset = offset + cmd.data.length;
        const p = point.mirror([cmd.data[0 + offset], cmd.data[1 + offset]], false, true);
        return cmd.absolute ? p : point.add(p, from);
    };
    const lineTo = (cmd, end) => {
        if (!equal.isPointEqual(cmd.from, end)) {
            addPath(new paths.Line(cmd.from, end));
        }
        return end;
    };
    const map = {};
    let firstPoint = [0, 0];
    map['M'] = (cmd) => {
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
    map['Z'] = (cmd) => lineTo(cmd, firstPoint);
    map['H'] = (cmd) => {
        const end = point.clone(cmd.from);
        if (cmd.absolute) {
            end[0] = cmd.data[0];
        }
        else {
            end[0] += cmd.data[0];
        }
        return lineTo(cmd, end);
    };
    map['V'] = (cmd) => {
        const end = point.clone(cmd.from);
        if (cmd.absolute) {
            end[1] = -cmd.data[0];
        }
        else {
            end[1] -= cmd.data[0];
        }
        return lineTo(cmd, end);
    };
    map['L'] = (cmd) => {
        let end = cmd.from;
        for (let a = 0; a < cmd.data.length; a += 2) {
            end = getPoint(cmd, a);
            cmd.from = lineTo(cmd, end);
        }
        return cmd.from;
    };
    map['A'] = (cmd) => {
        let rx, ry, rotation, large, decreasing;
        let end = cmd.from;
        let elliptic;
        let xAxis;
        let arc;
        let scaleUp;
        let e;
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
                xAxis = path.distort(xAxis, 1, rx / ry);
            }
            arc = new paths.Arc(xAxis.origin, xAxis.end, rx, large, decreasing);
            if (elliptic) {
                if (rx < arc.radius) {
                    scaleUp = arc.radius / rx;
                    rx *= scaleUp;
                    ry *= scaleUp;
                }
                e = new models.EllipticArc(arc, 1, ry / rx, options.bezierAccuracy);
                model.rotate(e, -rotation, cmd.from);
                addModel(e);
            }
            else {
                path.rotate(arc, -rotation, cmd.from);
                addPath(arc);
            }
            cmd.from = end;
        }
        return end;
    };
    map['C'] = (cmd) => {
        let control1, control2;
        let start = cmd.from;
        let end = start;
        for (let a = 0; a < cmd.data.length; a += 6) {
            cmd.from = start;
            control1 = getPoint(cmd, 0 + a, start);
            control2 = getPoint(cmd, 2 + a, start);
            end = getPoint(cmd, 4 + a, start);
            addModel(new models.BezierCurve(start, control1, control2, end, options.bezierAccuracy));
            start = end;
        }
        return end;
    };
    map['S'] = (cmd) => {
        let control1, prevControl2, control2;
        let start = cmd.from;
        let end = start;
        if (cmd.prev && (cmd.prev.command === 'C' || cmd.prev.command === 'S')) {
            prevControl2 = getPoint(cmd.prev, -4);
        }
        else {
            prevControl2 = cmd.from;
        }
        for (let a = 0; a < cmd.data.length; a += 4) {
            cmd.from = start;
            control1 = point.rotate(prevControl2, 180, start);
            control2 = getPoint(cmd, 0 + a);
            end = getPoint(cmd, 2 + a);
            addModel(new models.BezierCurve(start, control1, control2, end, options.bezierAccuracy));
            start = end;
            prevControl2 = control2;
        }
        return end;
    };
    map['Q'] = (cmd) => {
        let control;
        let start = cmd.from;
        let end = start;
        for (let a = 0; a < cmd.data.length; a += 4) {
            cmd.from = start;
            control = getPoint(cmd, 0 + a);
            end = getPoint(cmd, 2 + a);
            addModel(new models.BezierCurve(start, control, end, options.bezierAccuracy));
            start = end;
        }
        return end;
    };
    map['T'] = (cmd) => {
        let control;
        let prevControl;
        let end = cmd.from;
        if (cmd.prev && cmd.prev.command === 'Q') {
            prevControl = getPoint(cmd.prev, -4);
            control = point.rotate(prevControl, 180, cmd.from);
        }
        else if (cmd.prev && cmd.prev.command === 'T') {
            cmd.prev.absolute = true;
            control = getPoint(cmd.prev, -2);
        }
        else {
            control = cmd.from;
        }
        for (let a = 0; a < cmd.data.length; a += 2) {
            end = getPoint(cmd, 0 + a);
            addModel(new models.BezierCurve(cmd.from, control, end, options.bezierAccuracy));
            cmd.from = end;
            control = point.rotate(control, 180, cmd.from);
        }
        // save control point
        const p = point.mirror(control, false, true);
        cmd.data.push(p[0], p[1]);
        return end;
    };
    // Parse and walk the commands
    let currPoint = [0, 0];
    let prevCommand;
    const regexpCommands = /([achlmqstvz])([0-9e\.,\+-\s]*)/ig;
    let commandMatches;
    while ((commandMatches = regexpCommands.exec(pathData)) !== null) {
        if (commandMatches.index === regexpCommands.lastIndex) {
            regexpCommands.lastIndex++;
        }
        const command = commandMatches[1];
        const dataString = commandMatches[2];
        const currCmd = {
            command: command.toUpperCase(),
            data: [],
            from: currPoint,
            prev: prevCommand
        };
        if (command === currCmd.command)
            currCmd.absolute = true;
        currCmd.data = parseNumericList(dataString);
        const fn = map[currCmd.command];
        if (fn)
            currPoint = fn(currCmd);
        prevCommand = currCmd;
    }
    return result;
}
function getPathDataByLayer(modelToExport, offset, options, accuracy = 0.001) {
    const pathDataByLayer = {};
    options.unifyBeziers = true;
    chain.findChains(modelToExport, function (chains, loose, layer) {
        function single(walkedPath, clockwise) {
            const pathData = pathToData(walkedPath.pathContext, walkedPath.offset, offset, accuracy, clockwise);
            pathDataByLayer[layer].push(pathData);
        }
        pathDataByLayer[layer] = [];
        function doChains(cs, clockwise) {
            cs.forEach(function (c) {
                if (c.links.length > 1) {
                    const pathData = chainToData(c, offset, accuracy);
                    pathDataByLayer[layer].push(pathData);
                }
                else {
                    single(c.links[0].walkedPath, clockwise);
                }
                if (c.contains) {
                    doChains(c.contains, !clockwise);
                }
            });
        }
        doChains(chains, true);
        loose.forEach(wp => single(wp));
    }, options);
    return pathDataByLayer;
}
export function toSVGPathData(modelToExport, ...args) {
    const options = {
        fillRule: 'evenodd'
    };
    if (typeof args[0] === 'boolean') {
        options.byLayers = args[0];
        options.origin = args[1];
        options.accuracy = args[2];
    }
    else if (isObject(args[0])) {
        extendObject(options, args[0]);
    }
    const findChainsOptions = {
        byLayers: options.byLayers,
        contain: false
    };
    if (options.fillRule === 'nonzero') {
        findChainsOptions.contain = {
            alternateDirection: true
        };
    }
    const size = measure.modelExtents(modelToExport);
    if (!options.origin) {
        options.origin = [-size.low[0], size.high[1]];
    }
    const pathDataArrayByLayer = getPathDataByLayer(modelToExport, options.origin, findChainsOptions, options.accuracy);
    const pathDataStringByLayer = {};
    for (const layer in pathDataArrayByLayer) {
        pathDataStringByLayer[layer] = pathDataArrayByLayer[layer].join(' ');
    }
    return findChainsOptions.byLayers ? pathDataStringByLayer : pathDataStringByLayer[''];
}
export const svgUnit = {
    [unitType.Inch]: { svgUnitType: 'in', scaleConversion: 1 },
    [unitType.Millimeter]: { svgUnitType: 'mm', scaleConversion: 1 },
    [unitType.Centimeter]: { svgUnitType: 'cm', scaleConversion: 1 },
    [unitType.Foot]: { svgUnitType: 'in', scaleConversion: 12 },
    [unitType.Meter]: { svgUnitType: 'cm', scaleConversion: 100 }
};
function cssStyle(elOpts) {
    const a = [];
    const push = (name, val) => {
        if (val === undefined)
            return;
        a.push(name + ':' + val);
    };
    push('stroke', elOpts.stroke);
    push('stroke-width', elOpts.strokeWidth);
    push('fill', elOpts.fill);
    return a.join(';');
}
function addSvgAttrs(attrs, elOpts) {
    if (!elOpts)
        return;
    extendObject(attrs, {
        stroke: elOpts.stroke,
        'stroke-width': elOpts.strokeWidth,
        fill: elOpts.fill,
        style: elOpts.cssStyle || cssStyle(elOpts),
        class: elOpts.className
    });
}
function colorLayerOptions(layer, layerOptions) {
    if (layerOptions && layerOptions[layer])
        return layerOptions[layer];
    if (layer in colors) {
        return { stroke: layer };
    }
}
export function toSVG(itemToExport, options = {}) {
    var _a, _b;
    // defaults
    const opts = Object.assign({ accuracy: 0.001, annotate: false, origin: null, scale: 1, stroke: '#000', strokeWidth: '0.25mm', fill: 'none', fillRule: 'evenodd', fontSize: '9pt', useSvgPathOnly: true, viewBox: true, scalingStroke: false }, options);
    let modelToExport;
    const itemIsModel = isModel(itemToExport);
    if (itemIsModel) {
        modelToExport = itemToExport;
    }
    else if (Array.isArray(itemToExport)) {
        const pathMap = {};
        itemToExport.forEach((p, i) => { pathMap[String(i)] = p; });
        modelToExport = { paths: pathMap };
    }
    else if (isPath(itemToExport)) {
        modelToExport = { paths: { modelToMeasure: itemToExport } };
    }
    else {
        return '';
    }
    // units
    if (!opts.units) {
        const unitSystem = tryGetModelUnits(itemToExport);
        if (unitSystem)
            opts.units = unitSystem;
    }
    const useSvgUnit = opts.units ? svgUnit[opts.units] : undefined;
    // size and origin
    const size = measure.modelExtents(modelToExport);
    if (!opts.origin) {
        if (size) {
            const scale = (_a = opts.scale) !== null && _a !== void 0 ? _a : 1;
            const left = -size.low[0] * scale;
            opts.origin = [left, size.high[1] * scale];
        }
        else {
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
    const elements = [];
    let svgAttrs = {};
    if (size && opts.viewBox) {
        let scaleFactor = (_b = opts.scale) !== null && _b !== void 0 ? _b : 1;
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
    const groupAttrs = {
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
        const findChainsOptions = { byLayers: true };
        if (opts.fillRule === 'nonzero') {
            findChainsOptions.contain = { alternateDirection: true };
        }
        const pathDataByLayer = getPathDataByLayer(modelToExport, opts.origin, findChainsOptions, opts.accuracy);
        for (const layerId in pathDataByLayer) {
            const pathData = pathDataByLayer[layerId].join(' ');
            const attrs = { d: pathData };
            if (layerId.length > 0) {
                attrs.id = layerId;
            }
            addSvgAttrs(attrs, colorLayerOptions(layerId, opts.layerOptions));
            const pathTag = new XmlTag('path', attrs);
            elements.push(pathTag.toString());
        }
    }
    else {
        // Full element rendering (non-path mode)
        const layers = {};
        const append = (value, layer, forcePush = false) => {
            if (!forcePush && typeof layer === 'string' && layer.length > 0) {
                if (!(layer in layers))
                    layers[layer] = [];
                layers[layer].push(value);
            }
            else {
                elements.push(value);
            }
        };
        const addSvgAttrsLocal = (attrs, layer) => {
            addSvgAttrs(attrs, colorLayerOptions(layer, opts.layerOptions));
            if (!opts.scalingStroke) {
                attrs['vector-effect'] = 'non-scaling-stroke';
            }
        };
        const createElementLocal = (tagname, attrs, layer, innerText = null, forcePush = false) => {
            if (tagname !== 'text') {
                addSvgAttrsLocal(attrs, layer);
            }
            const tag = new XmlTag(tagname, attrs);
            if (innerText)
                tag.innerText = innerText;
            append(tag.toString(), layer, forcePush);
        };
        const fixPoint = (p) => {
            var _a;
            const mirrored = point.mirror(p, false, true);
            return point.scale(mirrored, (_a = opts.scale) !== null && _a !== void 0 ? _a : 1);
        };
        const fixPath = (p, origin) => {
            var _a;
            const mirrorY = path.mirror(p, false, true);
            const scaled = path.scale(mirrorY, (_a = opts.scale) !== null && _a !== void 0 ? _a : 1);
            return path.moveRelative(scaled, origin);
        };
        // Local helpers for arcs and beziers (duplicated to avoid exporting internals)
        const svgArcData = (d, radius, endPoint, accuracy = 0.001, largeArc, increasing) => {
            const r = round(radius, accuracy);
            d.push(r, r);
            d.push(0);
            d.push(largeArc ? 1 : 0);
            d.push(increasing ? 0 : 1);
            d.push(round(endPoint[0], accuracy), round(endPoint[1], accuracy));
        };
        const svgBezierData = (d, seed, accuracy = 0.001, reversed) => {
            if (seed.controls.length === 1) {
                d.push('Q', round(seed.controls[0][0], accuracy), round(seed.controls[0][1], accuracy));
            }
            else {
                const controls = reversed ? [seed.controls[1], seed.controls[0]] : seed.controls;
                d.push('C', round(controls[0][0], accuracy), round(controls[0][1], accuracy), round(controls[1][0], accuracy), round(controls[1][1], accuracy));
            }
            const final = reversed ? seed.origin : seed.end;
            d.push(round(final[0], accuracy), round(final[1], accuracy));
        };
        const drawText = (id, textPoint, layer) => {
            createElementLocal('text', {
                id: id + '_text',
                x: round(textPoint[0], opts.accuracy),
                y: round(textPoint[1], opts.accuracy)
            }, layer, id);
        };
        const drawPath = (id, x, y, d, layer, route, textPoint, annotate) => {
            const attrs = {
                id,
                d: ['M', round(x, opts.accuracy), round(y, opts.accuracy)].concat(d).join(' ')
            };
            if (route)
                attrs['data-route'] = route;
            createElementLocal('path', attrs, layer);
            if (annotate)
                drawText(id, textPoint, layer);
        };
        const addFlowMarks = (flow, layer, origin, end, endAngle) => {
            if (!flow)
                return;
            const className = 'flow';
            // origin circle
            createElementLocal('circle', {
                r: flow.size / 2,
                cx: round(origin[0], opts.accuracy),
                cy: round(origin[1], opts.accuracy),
                class: className
            }, layer);
            // arrow lines
            const arrowEnd = [-1 * flow.size, flow.size / 2];
            const p1 = point.add(point.rotate(arrowEnd, endAngle), end);
            const p2 = point.mirror(arrowEnd, false, true);
            const p2r = point.add(point.rotate(p2, endAngle), end);
            createElementLocal('line', {
                x1: round(p1[0], opts.accuracy), y1: round(p1[1], opts.accuracy),
                x2: round(end[0], opts.accuracy), y2: round(end[1], opts.accuracy),
                class: className
            }, layer);
            createElementLocal('line', {
                x1: round(p2r[0], opts.accuracy), y1: round(p2r[1], opts.accuracy),
                x2: round(end[0], opts.accuracy), y2: round(end[1], opts.accuracy),
                class: className
            }, layer);
        };
        const map = {};
        map[pathType.Line] = (id, line, layer, className, route, annotate) => {
            const start = line.origin;
            const end = line.end;
            const attrs = {
                id,
                x1: round(start[0], opts.accuracy), y1: round(start[1], opts.accuracy),
                x2: round(end[0], opts.accuracy), y2: round(end[1], opts.accuracy)
            };
            if (className)
                attrs.class = className;
            if (route)
                attrs['data-route'] = route;
            createElementLocal('line', attrs, layer);
            if (annotate)
                drawText(id, point.middle(line), layer);
            if (opts.flow)
                addFlowMarks(opts.flow, layer, line.origin, line.end, angle.ofLineInDegrees(line));
        };
        map[pathType.Circle] = (id, circle, layer, className, route, annotate) => {
            const center = circle.origin;
            const attrs = {
                id,
                r: circle.radius,
                cx: round(center[0], opts.accuracy), cy: round(center[1], opts.accuracy)
            };
            if (className)
                attrs.class = className;
            if (route)
                attrs['data-route'] = route;
            createElementLocal('circle', attrs, layer);
            if (annotate)
                drawText(id, center, layer);
        };
        map[pathType.Arc] = (id, arc, layer, className, route, annotate) => {
            // normalize arc angles
            const arcSpan = angle.ofArcSpan(arc);
            arc.startAngle = angle.noRevolutions(arc.startAngle);
            arc.endAngle = arc.startAngle + arcSpan;
            const arcPoints = point.fromArc(arc);
            if (equal.isPointEqual(arcPoints[0], arcPoints[1])) {
                map[pathType.Circle](id, { origin: arc.origin, radius: arc.radius }, layer, className, route, annotate);
            }
            else {
                const d = ['A'];
                svgArcData(d, arc.radius, arcPoints[1], opts.accuracy, angle.ofArcSpan(arc) > 180, arc.startAngle > arc.endAngle);
                drawPath(id, arcPoints[0][0], arcPoints[0][1], d, layer, route, point.middle(arc), annotate);
                addFlowMarks(opts.flow, layer, arcPoints[1], arcPoints[0], angle.noRevolutions(arc.startAngle - 90));
            }
        };
        map[pathType.BezierSeed] = (id, seed, layer, className, route, annotate) => {
            const d = [];
            svgBezierData(d, seed, opts.accuracy);
            drawPath(id, seed.origin[0], seed.origin[1], d, layer, route, point.middle(seed), annotate);
        };
        const modelGroup = new XmlTag('g');
        const beginModel = (id, modelContext) => {
            modelGroup.attrs = { id };
            append(modelGroup.getOpeningTag(false), modelContext.layer);
        };
        const endModel = (modelContext) => {
            append(modelGroup.getClosingTag(), modelContext.layer);
        };
        beginModel('0', modelToExport);
        const walkOptions = {
            beforeChildWalk: (walkedModel) => { beginModel(walkedModel.childId, walkedModel.childModel); return true; },
            onPath: (walkedPath) => {
                const pctx = walkedPath.pathContext;
                const layer = walkedPath.layer;
                const offset = point.add(fixPoint(walkedPath.offset), opts.origin);
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
                        const d = pathToData(pctx, walkedPath.offset, opts.origin, opts.accuracy);
                        const attrs = { id: walkedPath.pathId, d };
                        createElementLocal('path', attrs, layer);
                        break;
                }
            },
            afterChildWalk: (walkedModel) => { endModel(walkedModel.childModel); }
        };
        model.walk(modelToExport, walkOptions);
        // export layers as groups
        for (const layerId in layers) {
            const layerGroup = new XmlTag('g', { id: layerId });
            addSvgAttrs(layerGroup.attrs, colorLayerOptions(layerId, opts.layerOptions));
            layerGroup.innerText = layers[layerId].join('');
            layerGroup.innerTextEscaped = true;
            elements.push(layerGroup.toString());
        }
        endModel(modelToExport);
        // Captions
        if (captions && captions.length) {
            const captionTags = captions.map(caption => {
                const anchor = fixPath(caption.anchor, opts.origin);
                const center = point.rounded(point.middle(anchor), opts.accuracy);
                const tag = new XmlTag('text', {
                    'alignment-baseline': 'middle',
                    'text-anchor': 'middle',
                    transform: `rotate(${angle.ofLineInDegrees(anchor)},${center[0]},${center[1]})`,
                    x: center[0],
                    y: center[1]
                });
                addSvgAttrs(tag.attrs, colorLayerOptions(caption.layer, opts.layerOptions));
                tag.innerText = caption.text;
                return tag.toString();
            });
            if (captionTags.length) {
                const captionGroup = new XmlTag('g', { id: 'captions' });
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
//# sourceMappingURL=svg-esm.js.map