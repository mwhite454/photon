var MakerJs;
(function (MakerJs) {
    var exporter;
    (function (exporter) {
        /**
         * @private
         */
        var chainLinkToPathDataMap = {};
        chainLinkToPathDataMap[pathType.Arc] = function (arc, endPoint, reversed, d, accuracy) {
            d.push('A');
            svgArcData(d, arc.radius, endPoint, accuracy, angle.ofArcSpan(arc) > 180, reversed ? (arc.startAngle > arc.endAngle) : (arc.startAngle < arc.endAngle));
        };
        chainLinkToPathDataMap[pathType.Line] = function (line, endPoint, reversed, d, accuracy) {
            d.push('L', round(endPoint[0], accuracy), round(endPoint[1], accuracy));
        };
        chainLinkToPathDataMap[pathType.BezierSeed] = function (seed, endPoint, reversed, d, accuracy) {
            svgBezierData(d, seed, accuracy, reversed);
        };
        /**
         * @private
         */
        function svgCoords(p) {
            return point.mirror(p, false, true);
        }
        /**
         * @private
         */
        function correctArc(arc) {
            const arcSpan = angle.ofArcSpan(arc);
            arc.startAngle = angle.noRevolutions(arc.startAngle);
            arc.endAngle = arc.startAngle + arcSpan;
        }
        /**
         * Convert a chain to SVG path data.
         *
         * @param chain Chain to convert.
         * @param offset IPoint relative offset point.
         * @param accuracy Optional accuracy of SVG path data.
         * @returns String of SVG path data.
         */
        function chainToSVGPathData(chain, offset, accuracy) {
            function offsetPoint(p) {
                return point.add(p, offset);
            }
            var first = chain.links[0];
            var firstPoint = offsetPoint(svgCoords(first.endPoints[first.reversed ? 1 : 0]));
            var d = ['M', round(firstPoint[0], accuracy), round(firstPoint[1], accuracy)];
            for (var i = 0; i < chain.links.length; i++) {
                var link = chain.links[i];
                var pathContext = link.walkedPath.pathContext;
                var fn = chainLinkToPathDataMap[pathContext.type];
                if (fn) {
                    var fixedPath;
                    path.moveTemporary([pathContext], [link.walkedPath.offset], function () {
                        fixedPath = path.mirror(pathContext, false, true);
                    });
                    path.moveRelative(fixedPath, offset);
                    fn(fixedPath, offsetPoint(svgCoords(link.endPoints[link.reversed ? 0 : 1])), link.reversed, d, accuracy);
                }
            }
            if (chain.endless) {
                d.push('Z');
            }
            return d.join(' ');
        }
        exporter.chainToSVGPathData = chainToSVGPathData;
        /**
         * @private
         */
        function startSvgPathData(start, d, accuracy) {
            return ["M", round(start[0], accuracy), round(start[1], accuracy)].concat(d);
        }
        /**
         * @private
         */
        var svgPathDataMap = {};
        svgPathDataMap[pathType.Line] = function (line, accuracy) {
            return startSvgPathData(line.origin, point.rounded(line.end, accuracy), accuracy);
        };
        svgPathDataMap[pathType.Circle] = function (circle, accuracy, clockwiseCircle) {
            return startSvgPathData(circle.origin, svgCircleData(circle.radius, accuracy, clockwiseCircle), accuracy);
        };
        svgPathDataMap[pathType.Arc] = function (arc, accuracy) {
            correctArc(arc);
            var arcPoints = point.fromArc(arc);
            if (measure.isPointEqual(arcPoints[0], arcPoints[1])) {
                return svgPathDataMap[pathType.Circle](arc, accuracy);
            }
            else {
                var d = ['A'];
                svgArcData(d, arc.radius, arcPoints[1], accuracy, angle.ofArcSpan(arc) > 180, arc.startAngle > arc.endAngle);
                return startSvgPathData(arcPoints[0], d, accuracy);
            }
        };
        svgPathDataMap[pathType.BezierSeed] = function (seed, accuracy) {
            var d = [];
            svgBezierData(d, seed, accuracy);
            return startSvgPathData(seed.origin, d, accuracy);
        };
        /**
         * Export a path to SVG path data.
         *
         * @param pathToExport IPath to export.
         * @param pathOffset IPoint relative offset of the path object.
         * @param exportOffset IPoint relative offset point of the export.
         * @param accuracy Optional accuracy of SVG path data.
         * @param clockwiseCircle Optional flag to use clockwise winding for circles.
         * @returns String of SVG path data.
         */
        function pathToSVGPathData(pathToExport, pathOffset, exportOffset, accuracy, clockwiseCircle) {
            var fn = svgPathDataMap[pathToExport.type];
            if (fn) {
                var fixedPath;
                path.moveTemporary([pathToExport], [pathOffset], function () {
                    fixedPath = path.mirror(pathToExport, false, true);
                });
                path.moveRelative(fixedPath, exportOffset);
                var d = fn(fixedPath, accuracy, clockwiseCircle);
                return d.join(' ');
            }
            return '';
        }
        exporter.pathToSVGPathData = pathToSVGPathData;
        /**
         * @private
         */
        function getPathDataByLayer(modelToExport, offset, options, accuracy) {
            var pathDataByLayer = {};
            options.unifyBeziers = true;
            model.findChains(modelToExport, function (chains, loose, layer) {
                function single(walkedPath, clockwise) {
                    var pathData = pathToSVGPathData(walkedPath.pathContext, walkedPath.offset, offset, accuracy, clockwise);
                    pathDataByLayer[layer].push(pathData);
                }
                pathDataByLayer[layer] = [];
                function doChains(cs, clockwise) {
                    cs.forEach(function (chain) {
                        if (chain.links.length > 1) {
                            var pathData = chainToSVGPathData(chain, offset, accuracy);
                            pathDataByLayer[layer].push(pathData);
                        }
                        else {
                            single(chain.links[0].walkedPath, clockwise);
                        }
                        if (chain.contains) {
                            doChains(chain.contains, !clockwise);
                        }
                    });
                }
                doChains(chains, true);
                loose.forEach(wp => single(wp));
            }, options);
            return pathDataByLayer;
        }
        /**
         * Attempt to delegate to ES module implementation in MakerJs.svg if available.
         * This enables gradual migration while preserving the legacy namespace API.
         * @private
         */
        function tryDelegateToEsmToSVGPathData(modelToExport, args) {
            const anyMaker = MakerJs;
            const esm = anyMaker && anyMaker.svg;
            if (esm && typeof esm.toSVGPathData === 'function') {
                try {
                    return esm.toSVGPathData(modelToExport, ...args);
                }
                catch (e) {
                    // fall back to legacy implementation
                }
            }
            return null;
        }
        /**
         * Attempt to delegate to ES module implementation of toSVG if available.
         * Only used for path-only rendering flow; otherwise legacy remains in place.
         * @private
         */
        function tryDelegateToEsmToSVG(itemToExport, options) {
            const anyMaker = MakerJs;
            const esm = anyMaker && anyMaker.svg;
            if (esm && typeof esm.toSVG === 'function') {
                try {
                    return esm.toSVG(itemToExport, options);
                }
                catch (e) {
                    // fall back to legacy implementation
                }
            }
            return null;
        }
        function toSVGPathData(modelToExport, ...args) {
            // Phase 2 migration: delegate to ES module if present
            const delegated = tryDelegateToEsmToSVGPathData(modelToExport, args);
            if (delegated != null)
                return delegated;
            var options = {
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
            var findChainsOptions = {
                byLayers: options.byLayers,
                contain: false
            };
            if (options.fillRule === 'nonzero') {
                findChainsOptions.contain = {
                    alternateDirection: true
                };
            }
            var size = measure.modelExtents(modelToExport);
            if (!options.origin) {
                options.origin = [-size.low[0], size.high[1]];
            }
            var pathDataArrayByLayer = getPathDataByLayer(modelToExport, options.origin, findChainsOptions, options.accuracy);
            var pathDataStringByLayer = {};
            for (var layer in pathDataArrayByLayer) {
                pathDataStringByLayer[layer] = pathDataArrayByLayer[layer].join(' ');
            }
            return findChainsOptions.byLayers ? pathDataStringByLayer : pathDataStringByLayer[''];
        }
        exporter.toSVGPathData = toSVGPathData;
        /**
         * Renders an item in SVG markup.
         *
         * @param itemToExport Item to render: may be a path, an array of paths, or a model object.
         * @param options Rendering options object.
         * @param options.annotate Boolean to indicate that the id's of paths should be rendered as SVG text elements.
         * @param options.origin point object for the rendered reference origin.
         * @param options.scale Number to scale the SVG rendering.
         * @param options.stroke String color of the rendered paths.
         * @param options.strokeWidth String numeric width and optional units of the rendered paths.
         * @param options.units String of the unit system. May be omitted. See makerjs.unitType for possible values.
         * @param options.useSvgPathOnly Boolean to use SVG path elements instead of line, circle etc.
         * @returns String of XML / SVG content.
         */
        function toSVG(itemToExport, options) {
            // Phase 3: ESM implementation fully supports rendering. Always delegate when available.
            const delegated = tryDelegateToEsmToSVG(itemToExport, options);
            if (delegated != null)
                return delegated;
            function append(value, layer, forcePush = false) {
                if (!forcePush && typeof layer == "string" && layer.length > 0) {
                    if (!(layer in layers)) {
                        layers[layer] = [];
                    }
                    layers[layer].push(value);
                }
                else {
                    elements.push(value);
                }
            }
            function cssStyle(elOpts) {
                var a = [];
                function push(name, val) {
                    if (val === undefined)
                        return;
                    a.push(name + ':' + val);
                }
                push('stroke', elOpts.stroke);
                push('stroke-width', elOpts.strokeWidth);
                push('fill', elOpts.fill);
                return a.join(';');
            }
            function addSvgAttrs(attrs, elOpts) {
                if (!elOpts)
                    return;
                extendObject(attrs, {
                    "stroke": elOpts.stroke,
                    "stroke-width": elOpts.strokeWidth,
                    "fill": elOpts.fill,
                    "style": elOpts.cssStyle || cssStyle(elOpts),
                    "class": elOpts.className
                });
            }
            function colorLayerOptions(layer) {
                if (opts.layerOptions && opts.layerOptions[layer])
                    return opts.layerOptions[layer];
                if (layer in colors) {
                    return {
                        stroke: layer
                    };
                }
            }
            function createElement(tagname, attrs, layer, innerText = null, forcePush = false) {
                if (tagname !== 'text') {
                    addSvgAttrs(attrs, colorLayerOptions(layer));
                }
                if (!opts.scalingStroke) {
                    attrs['vector-effect'] = 'non-scaling-stroke';
                }
                var tag = new XmlTag(tagname, attrs);
                tag.closingTags = opts.closingTags;
                if (innerText) {
                    tag.innerText = innerText;
                }
                append(tag.toString(), layer, forcePush);
            }
            function fixPoint(pointToFix) {
                //in DXF Y increases upward. in SVG, Y increases downward
                var pointMirroredY = svgCoords(pointToFix);
                return point.scale(pointMirroredY, opts.scale);
            }
            function fixPath(pathToFix, origin) {
                //mirror creates a copy, so we don't modify the original
                var mirrorY = path.mirror(pathToFix, false, true);
                return path.moveRelative(path.scale(mirrorY, opts.scale), origin);
            }
            //fixup options
            var opts = {
                accuracy: .001,
                annotate: false,
                origin: null,
                scale: 1,
                stroke: "#000",
                strokeLineCap: "round",
                strokeWidth: '0.25mm', //a somewhat average kerf of a laser cutter
                fill: "none",
                fillRule: "evenodd",
                fontSize: '9pt',
                useSvgPathOnly: true,
                viewBox: true
            };
            extendObject(opts, options);
            var modelToExport;
            var itemToExportIsModel = isModel(itemToExport);
            if (itemToExportIsModel) {
                modelToExport = itemToExport;
                if (modelToExport.exporterOptions) {
                    extendObject(opts, modelToExport.exporterOptions['toSVG']);
                }
            }
            var elements = [];
            var layers = {};
            //measure the item to move it into svg area
            if (itemToExportIsModel) {
                modelToExport = itemToExport;
            }
            else if (Array.isArray(itemToExport)) {
                //issue: this won't handle an array of models
                var pathMap = {};
                itemToExport.forEach((p, i) => { pathMap[i] = p; });
                modelToExport = { paths: pathMap };
            }
            else if (isPath(itemToExport)) {
                modelToExport = { paths: { modelToMeasure: itemToExport } };
            }
            const size = measure.modelExtents(modelToExport);
            //increase size to fit caption text
            const captions = model.getAllCaptionsOffset(modelToExport);
            captions.forEach(caption => {
                measure.increase(size, measure.pathExtents(caption.anchor), true);
            });
            //try to get the unit system from the itemToExport
            if (!opts.units) {
                var unitSystem = tryGetModelUnits(itemToExport);
                if (unitSystem) {
                    opts.units = unitSystem;
                }
            }
            //convert unit system (if it exists) into SVG's units. scale if necessary.
            var useSvgUnit = exporter.svgUnit[opts.units];
            if (useSvgUnit && opts.viewBox) {
                opts.scale *= useSvgUnit.scaleConversion;
            }
            if (size && !opts.origin) {
                var left = -size.low[0] * opts.scale;
                opts.origin = [left, size.high[1] * opts.scale];
            }
            //also pass back to options parameter
            extendObject(options, opts);
            //begin svg output
            var svgAttrs = {};
            if (size && opts.viewBox) {
                var width = round(size.width * opts.scale, opts.accuracy);
                var height = round(size.height * opts.scale, opts.accuracy);
                var viewBox = [0, 0, width, height];
                var unit = useSvgUnit ? useSvgUnit.svgUnitType : '';
                svgAttrs = {
                    width: width + unit,
                    height: height + unit,
                    viewBox: viewBox.join(' ')
                };
            }
            svgAttrs["xmlns"] = "http://www.w3.org/2000/svg";
            var svgTag = new XmlTag('svg', extendObject(svgAttrs, opts.svgAttrs));
            append(svgTag.getOpeningTag(false));
            var groupAttrs = {
                id: 'svgGroup',
                "stroke-linecap": opts.strokeLineCap,
                "fill-rule": opts.fillRule,
                "font-size": opts.fontSize
            };
            addSvgAttrs(groupAttrs, opts);
            var svgGroup = new XmlTag('g', groupAttrs);
            append(svgGroup.getOpeningTag(false));
            if (opts.useSvgPathOnly) {
                var findChainsOptions = {
                    byLayers: true
                };
                if (opts.fillRule === 'nonzero') {
                    findChainsOptions.contain = {
                        alternateDirection: true
                    };
                }
                var pathDataByLayer = getPathDataByLayer(modelToExport, opts.origin, findChainsOptions, opts.accuracy);
                for (var layerId1 in pathDataByLayer) {
                    var pathData = pathDataByLayer[layerId1].join(' ');
                    var attrs = { "d": pathData };
                    if (layerId1.length > 0) {
                        attrs["id"] = layerId1;
                    }
                    createElement("path", attrs, layerId1, null, true);
                }
            }
            else {
                function drawText(id, textPoint, layer) {
                    createElement("text", {
                        "id": id + "_text",
                        "x": round(textPoint[0], opts.accuracy),
                        "y": round(textPoint[1], opts.accuracy)
                    }, layer, id);
                }
                function drawPath(id, x, y, d, layer, route, textPoint, annotate, flow) {
                    createElement("path", {
                        "id": id,
                        "data-route": route,
                        "d": ["M", round(x, opts.accuracy), round(y, opts.accuracy)].concat(d).join(" ")
                    }, layer);
                    if (annotate) {
                        drawText(id, textPoint, layer);
                    }
                }
                function circleInPaths(id, center, radius, layer, route, annotate, flow) {
                    var d = svgCircleData(radius, opts.accuracy);
                    drawPath(id, center[0], center[1], d, layer, route, center, annotate, flow);
                }
                var map = {};
                map[pathType.Line] = function (id, line, layer, className, route, annotate, flow) {
                    var start = line.origin;
                    var end = line.end;
                    createElement("line", {
                        "id": id,
                        "class": className,
                        "data-route": route,
                        "x1": round(start[0], opts.accuracy),
                        "y1": round(start[1], opts.accuracy),
                        "x2": round(end[0], opts.accuracy),
                        "y2": round(end[1], opts.accuracy)
                    }, layer);
                    if (annotate) {
                        drawText(id, point.middle(line), layer);
                    }
                    if (flow) {
                        addFlowMarks(flow, layer, line.origin, line.end, angle.ofLineInDegrees(line));
                    }
                };
                map[pathType.Circle] = function (id, circle, layer, className, route, annotate, flow) {
                    var center = circle.origin;
                    createElement("circle", {
                        "id": id,
                        "class": className,
                        "data-route": route,
                        "r": circle.radius,
                        "cx": round(center[0], opts.accuracy),
                        "cy": round(center[1], opts.accuracy)
                    }, layer);
                    if (annotate) {
                        drawText(id, center, layer);
                    }
                };
                map[pathType.Arc] = function (id, arc, layer, className, route, annotate, flow) {
                    correctArc(arc);
                    var arcPoints = point.fromArc(arc);
                    if (measure.isPointEqual(arcPoints[0], arcPoints[1])) {
                        circleInPaths(id, arc.origin, arc.radius, layer, route, annotate, flow);
                    }
                    else {
                        var d = ['A'];
                        svgArcData(d, arc.radius, arcPoints[1], opts.accuracy, angle.ofArcSpan(arc) > 180, arc.startAngle > arc.endAngle);
                        drawPath(id, arcPoints[0][0], arcPoints[0][1], d, layer, route, point.middle(arc), annotate, flow);
                        if (flow) {
                            addFlowMarks(flow, layer, arcPoints[1], arcPoints[0], angle.noRevolutions(arc.startAngle - 90));
                        }
                    }
                };
                map[pathType.BezierSeed] = function (id, seed, layer, className, route, annotate, flow) {
                    var d = [];
                    svgBezierData(d, seed, opts.accuracy);
                    drawPath(id, seed.origin[0], seed.origin[1], d, layer, route, point.middle(seed), annotate, flow);
                };
                function addFlowMarks(flow, layer, origin, end, endAngle) {
                    const className = 'flow';
                    //origin: add a circle
                    map[pathType.Circle]('', new paths.Circle(origin, flow.size / 2), layer, className, null, false, null);
                    //end: add an arrow
                    const arrowEnd = [-1 * flow.size, flow.size / 2];
                    const arrowLines = [arrowEnd, point.mirror(arrowEnd, false, true)].map(p => new paths.Line(point.add(point.rotate(p, endAngle), end), end));
                    arrowLines.forEach(a => map[pathType.Line]('', a, layer, className, null, false, null));
                }
                function beginModel(id, modelContext) {
                    modelGroup.attrs = { id: id };
                    append(modelGroup.getOpeningTag(false), modelContext.layer);
                }
                function endModel(modelContext) {
                    append(modelGroup.getClosingTag(), modelContext.layer);
                }
                var modelGroup = new XmlTag('g');
                var walkOptions = {
                    beforeChildWalk: (walkedModel) => {
                        beginModel(walkedModel.childId, walkedModel.childModel);
                        return true;
                    },
                    onPath: (walkedPath) => {
                        var fn = map[walkedPath.pathContext.type];
                        if (fn) {
                            var offset = point.add(fixPoint(walkedPath.offset), opts.origin);
                            fn(walkedPath.pathId, fixPath(walkedPath.pathContext, offset), walkedPath.layer, null, walkedPath.route, opts.annotate, opts.flow);
                        }
                    },
                    afterChildWalk: (walkedModel) => {
                        endModel(walkedModel.childModel);
                    }
                };
                beginModel('0', modelToExport);
                model.walk(modelToExport, walkOptions);
                //export layers as groups
                for (var layerId2 in layers) {
                    var layerGroup = new XmlTag('g', { id: layerId2 });
                    addSvgAttrs(layerGroup.attrs, colorLayerOptions(layerId2));
                    for (var i = 0; i < layers[layerId2].length; i++) {
                        layerGroup.innerText += layers[layerId2][i];
                    }
                    layerGroup.innerTextEscaped = true;
                    append(layerGroup.toString());
                }
                endModel(modelToExport);
            }
            const captionTags = captions.map(caption => {
                const anchor = fixPath(caption.anchor, opts.origin);
                const center = point.rounded(point.middle(anchor), opts.accuracy);
                const tag = new XmlTag('text', {
                    "alignment-baseline": "middle",
                    "text-anchor": "middle",
                    "transform": `rotate(${angle.ofLineInDegrees(anchor)},${center[0]},${center[1]})`,
                    "x": center[0],
                    "y": center[1]
                });
                addSvgAttrs(tag.attrs, colorLayerOptions(caption.layer));
                tag.innerText = caption.text;
                return tag.toString();
            });
            if (captionTags.length) {
                const captionGroup = new XmlTag('g', { "id": "captions" });
                addSvgAttrs(captionGroup.attrs, colorLayerOptions(captionGroup.attrs.id));
                captionGroup.innerText = captionTags.join('');
                captionGroup.innerTextEscaped = true;
                append(captionGroup.toString());
            }
            append(svgGroup.getClosingTag());
            append(svgTag.getClosingTag());
            return elements.join('');
        }
        exporter.toSVG = toSVG;
        /**
         * @private
         */
        function svgCircleData(radius, accuracy, clockwiseCircle) {
            var r = round(radius, accuracy);
            var d = ['m', -r, 0];
            function halfCircle(sign) {
                d.push('a');
                svgArcData(d, r, [2 * r * sign, 0], accuracy, false, !clockwiseCircle);
            }
            halfCircle(1);
            halfCircle(-1);
            d.push('z');
            return d;
        }
        /**
         * @private
         */
        function svgBezierData(d, seed, accuracy, reversed) {
            if (seed.controls.length === 1) {
                d.push('Q', round(seed.controls[0][0], accuracy), round(seed.controls[0][1], accuracy));
            }
            else {
                var controls = reversed ? [seed.controls[1], seed.controls[0]] : seed.controls;
                d.push('C', round(controls[0][0], accuracy), round(controls[0][1], accuracy), round(controls[1][0], accuracy), round(controls[1][1], accuracy));
            }
            var final = reversed ? seed.origin : seed.end;
            d.push(round(final[0], accuracy), round(final[1], accuracy));
        }
        /**
         * @private
         */
        function svgArcData(d, radius, endPoint, accuracy, largeArc, increasing) {
            var r = round(radius, accuracy);
            var end = endPoint;
            d.push(r, r);
            d.push(0); //0 = x-axis rotation
            d.push(largeArc ? 1 : 0); //large arc=1, small arc=0
            d.push(increasing ? 0 : 1); //sweep-flag 0=increasing, 1=decreasing
            d.push(round(end[0], accuracy), round(end[1], accuracy));
        }
        /**
         * Map of MakerJs unit system to SVG unit system
         */
        exporter.svgUnit = {};
        //SVG Coordinate Systems, Transformations and Units documentation:
        //http://www.w3.org/TR/SVG/coords.html
        //The supported length unit identifiers are: em, ex, px, pt, pc, cm, mm, in, and percentages.
        exporter.svgUnit[unitType.Inch] = { svgUnitType: "in", scaleConversion: 1 };
        exporter.svgUnit[unitType.Millimeter] = { svgUnitType: "mm", scaleConversion: 1 };
        exporter.svgUnit[unitType.Centimeter] = { svgUnitType: "cm", scaleConversion: 1 };
        //Add conversions for all unitTypes
        exporter.svgUnit[unitType.Foot] = { svgUnitType: "in", scaleConversion: 12 };
        exporter.svgUnit[unitType.Meter] = { svgUnitType: "cm", scaleConversion: 100 };
    })(exporter = MakerJs.exporter || (MakerJs.exporter = {}));
})(MakerJs || (MakerJs = {}));
(function (MakerJs) {
    var importer;
    (function (importer) {
        /**
         * Attempt to delegate importer to ES module implementation in MakerJs.svg if available.
         * @private
         */
        function tryDelegateToEsmFromSVGPathData(pathData, options) {
            const anyMaker = MakerJs;
            const esm = anyMaker && anyMaker.svg;
            if (esm && typeof esm.fromSVGPathData === 'function') {
                try {
                    return esm.fromSVGPathData(pathData, options);
                }
                catch (e) {
                    // fall back to legacy implementation
                }
            }
            return null;
        }
        /**
         * Create a model from SVG path data.
         *
         * @param pathData SVG path data.
         * @param options ISVGImportOptions object.
         * @param options.bezierAccuracy Optional accuracy of Bezier curves.
         * @returns An IModel object.
         */
        function fromSVGPathData(pathData, options = {}) {
            // Phase 3 migration: delegate to ESM importer if present
            const delegated = tryDelegateToEsmFromSVGPathData(pathData, options);
            if (delegated)
                return delegated;
            var result = {};
            function addPath(p) {
                if (!result.paths) {
                    result.paths = {};
                }
                result.paths['p_' + ++pathCount] = p;
            }
            function addModel(m) {
                if (!result.models) {
                    result.models = {};
                }
                result.models['p_' + ++pathCount] = m;
            }
            function getPoint(cmd, offset = 0, from = cmd.from) {
                if (offset < 0) { // get point from end of list (negative index)
                    offset = offset + cmd.data.length;
                }
                var p = point.mirror([cmd.data[0 + offset], cmd.data[1 + offset]], false, true);
                if (cmd.absolute) {
                    return p;
                }
                else {
                    return point.add(p, from);
                }
            }
            function lineTo(cmd, end) {
                if (!measure.isPointEqual(cmd.from, end)) {
                    addPath(new paths.Line(cmd.from, end));
                }
                return end;
            }
            var map = {};
            map['M'] = function (cmd) {
                firstPoint = getPoint(cmd);
                if (cmd.data.length > 2) { // implicit lineTo
                    cmd.from = firstPoint;
                    for (let a = 2; a < cmd.data.length; a = a + 2) {
                        cmd.from = lineTo(cmd, getPoint(cmd, a));
                    }
                    return cmd.from;
                }
                else
                    return firstPoint;
            };
            map['Z'] = function (cmd) {
                return lineTo(cmd, firstPoint);
            };
            map['H'] = function (cmd) {
                var end = point.clone(cmd.from);
                if (cmd.absolute) {
                    end[0] = cmd.data[0];
                }
                else {
                    end[0] += cmd.data[0];
                }
                return lineTo(cmd, end);
            };
            map['V'] = function (cmd) {
                var end = point.clone(cmd.from);
                //subtract to mirror on y axis: SVG coords
                if (cmd.absolute) {
                    end[1] = -cmd.data[0];
                }
                else {
                    end[1] -= cmd.data[0];
                }
                return lineTo(cmd, end);
            };
            map['L'] = function (cmd) {
                var end;
                for (let a = 0; a < cmd.data.length; a = a + 2) {
                    end = getPoint(cmd, a);
                    cmd.from = lineTo(cmd, end);
                }
                return cmd.from;
            };
            map['A'] = function (cmd) {
                var rx;
                var ry;
                var rotation;
                var large;
                var decreasing;
                var end;
                var elliptic;
                var xAxis;
                var arc;
                var scaleUp;
                var e;
                for (let a = 0; a < cmd.data.length; a = a + 7) {
                    rx = cmd.data[0 + a];
                    ry = cmd.data[1 + a];
                    rotation = cmd.data[2 + a];
                    large = cmd.data[3 + a] === 1;
                    decreasing = cmd.data[4 + a] === 1;
                    end = getPoint(cmd, 5 + a);
                    elliptic = rx !== ry;
                    //first, rotate so we are dealing with a zero angle x-axis
                    xAxis = new paths.Line(cmd.from, point.rotate(end, rotation, cmd.from));
                    //next, un-distort any ellipse back into a circle in terms of x axis
                    if (elliptic) {
                        xAxis = path.distort(xAxis, 1, rx / ry);
                    }
                    //now create an arc, making sure we use the large and decreasing flags
                    arc = new paths.Arc(xAxis.origin, xAxis.end, rx, large, decreasing);
                    if (elliptic) {
                        //scale up if radius was insufficient.
                        if (rx < arc.radius) {
                            scaleUp = arc.radius / rx;
                            rx *= scaleUp;
                            ry *= scaleUp;
                        }
                        //create an elliptical arc, this will re-distort
                        e = new MakerJs.models.EllipticArc(arc, 1, ry / rx, options.bezierAccuracy);
                        //un-rotate back to where it should be.
                        model.rotate(e, -rotation, cmd.from);
                        addModel(e);
                    }
                    else {
                        //just use the arc
                        //un-rotate back to where it should be.
                        path.rotate(arc, -rotation, cmd.from);
                        addPath(arc);
                    }
                    cmd.from = end;
                }
                return end;
            };
            map['C'] = function (cmd) {
                var control1;
                var control2;
                var start = cmd.from;
                var end;
                for (let a = 0; a < cmd.data.length; a = a + 6) {
                    cmd.from = start;
                    control1 = getPoint(cmd, 0 + a, start);
                    control2 = getPoint(cmd, 2 + a, start);
                    end = getPoint(cmd, 4 + a, start);
                    addModel(new MakerJs.models.BezierCurve(start, control1, control2, end, options.bezierAccuracy));
                    start = end;
                }
                return end;
            };
            map['S'] = function (cmd) {
                var control1;
                var prevControl2;
                var control2;
                var start = cmd.from;
                var end;
                if (cmd.prev.command === 'C' || cmd.prev.command === 'S') {
                    prevControl2 = getPoint(cmd.prev, -4);
                }
                else {
                    prevControl2 = cmd.from;
                }
                for (let a = 0; a < cmd.data.length; a = a + 4) {
                    cmd.from = start;
                    control1 = point.rotate(prevControl2, 180, start);
                    control2 = getPoint(cmd, 0 + a);
                    end = getPoint(cmd, 2 + a);
                    addModel(new MakerJs.models.BezierCurve(start, control1, control2, end, options.bezierAccuracy));
                    start = end;
                    prevControl2 = control2;
                }
                return end;
            };
            map['Q'] = function (cmd) {
                var control;
                var start = cmd.from;
                var end;
                for (let a = 0; a < cmd.data.length; a = a + 4) {
                    cmd.from = start;
                    control = getPoint(cmd, 0 + a);
                    end = getPoint(cmd, 2 + a);
                    addModel(new MakerJs.models.BezierCurve(start, control, end, options.bezierAccuracy));
                    start = end;
                }
                return end;
            };
            map['T'] = function (cmd) {
                var control;
                var prevControl;
                var end;
                if (cmd.prev.command === 'Q') {
                    prevControl = getPoint(cmd.prev, -4);
                    control = point.rotate(prevControl, 180, cmd.from);
                }
                else if (cmd.prev.command === 'T') {
                    cmd.prev.absolute = true;
                    control = getPoint(cmd.prev, -2); //see below *
                }
                else {
                    control = cmd.from;
                }
                for (let a = 0; a < cmd.data.length; a = a + 2) {
                    end = getPoint(cmd, 0 + a);
                    addModel(new MakerJs.models.BezierCurve(cmd.from, control, end, options.bezierAccuracy));
                    cmd.from = end;
                    control = point.rotate(control, 180, cmd.from);
                }
                //* save the control point in the data list, will be accessible from index 2
                var p = point.mirror(control, false, true);
                cmd.data.push.apply(cmd.data, p);
                return end;
            };
            var firstPoint = [0, 0];
            var currPoint = [0, 0];
            var pathCount = 0;
            var prevCommand;
            var regexpCommands = /([achlmqstvz])([0-9e\.,\+-\s]*)/ig;
            var commandMatches;
            while ((commandMatches = regexpCommands.exec(pathData)) !== null) {
                if (commandMatches.index === regexpCommands.lastIndex) {
                    regexpCommands.lastIndex++;
                }
                var command = commandMatches[1]; //0 = command and data, 1 = command, 2 = data
                var dataString = commandMatches[2];
                var currCmd = {
                    command: command.toUpperCase(),
                    data: [],
                    from: currPoint,
                    prev: prevCommand
                };
                if (command === currCmd.command) {
                    currCmd.absolute = true;
                }
                currCmd.data = parseNumericList(dataString);
                var fn = map[currCmd.command];
                if (fn) {
                    currPoint = fn(currCmd);
                }
                prevCommand = currCmd;
            }
            return result;
        }
        importer.fromSVGPathData = fromSVGPathData;
    })(importer = MakerJs.importer || (MakerJs.importer = {}));
})(MakerJs || (MakerJs = {}));
//# sourceMappingURL=svg.js.map