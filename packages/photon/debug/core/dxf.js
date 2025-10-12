import { extendObject, isModel, pathType, round, unitType } from './maker.js';
import { tryGetModelUnits, colors } from './exporter.js';
import * as point from './point.js';
import * as angle from './angle.js';
import * as model from './model.js';
/**
 * Renders an item in AutoDesk DFX file format.
 *
 * @param itemToExport Item to render: may be a path, an array of paths, or a model object.
 * @param options Rendering options object.
 * @param options.units String of the unit system. May be omitted. See makerjs.unitType for possible values.
 * @returns String of DXF content.
 */
export function toDXF(itemToExport, options = {}) {
    //DXF format documentation:
    //http://images.autodesk.com/adsk/files/acad_dxf0.pdf
    var opts = {
        fontSize: 9
    };
    var layerIds = [];
    const doc = {
        entities: [],
        header: {},
        tables: {}
    };
    extendObject(opts, options);
    if (isModel(itemToExport)) {
        var modelToExport = itemToExport;
        if (modelToExport.exporterOptions) {
            extendObject(opts, modelToExport.exporterOptions['toDXF']);
        }
    }
    function colorLayerOptions(layer) {
        if (opts.layerOptions && opts.layerOptions[layer])
            return opts.layerOptions[layer];
        if (layer in colors) {
            return {
                color: colors[layer]
            };
        }
    }
    function defaultLayer(pathContext, parentLayer) {
        var layerId = (pathContext && pathContext.layer) || parentLayer || '0';
        if (layerIds.indexOf(layerId) < 0) {
            layerIds.push(layerId);
        }
        return layerId;
    }
    var map = {};
    map[pathType.Line] = function (line, offset, layer) {
        const lineEntity = {
            type: "LINE",
            layer: defaultLayer(line, layer),
            vertices: [
                {
                    x: round(line.origin[0] + offset[0], opts.accuracy),
                    y: round(line.origin[1] + offset[1], opts.accuracy)
                },
                {
                    x: round(line.end[0] + offset[0], opts.accuracy),
                    y: round(line.end[1] + offset[1], opts.accuracy)
                }
            ]
        };
        return lineEntity;
    };
    map[pathType.Circle] = function (circle, offset, layer) {
        const circleEntity = {
            type: "CIRCLE",
            layer: defaultLayer(circle, layer),
            center: {
                x: round(circle.origin[0] + offset[0], opts.accuracy),
                y: round(circle.origin[1] + offset[1], opts.accuracy),
            },
            radius: round(circle.radius, opts.accuracy)
        };
        return circleEntity;
    };
    map[pathType.Arc] = function (arc, offset, layer) {
        const arcEntity = {
            type: "ARC",
            layer: defaultLayer(arc, layer),
            center: {
                x: round(arc.origin[0] + offset[0], opts.accuracy),
                y: round(arc.origin[1] + offset[1], opts.accuracy)
            },
            radius: round(arc.radius, opts.accuracy),
            startAngle: round(arc.startAngle, opts.accuracy),
            endAngle: round(arc.endAngle, opts.accuracy)
        };
        return arcEntity;
    };
    //TODO - handle scenario if any bezier seeds get passed
    //map[pathType.BezierSeed]
    function appendVertex(v, layer, bulge) {
        const vertex = {
            type: "VERTEX",
            layer: defaultLayer(null, layer),
            x: round(v[0], opts.accuracy),
            y: round(v[1], opts.accuracy),
            bulge
        };
        return vertex;
    }
    function polyline(c) {
        const polylineEntity = {
            type: "POLYLINE",
            layer: defaultLayer(null, c.layer),
            shape: c.chain.endless,
            vertices: []
        };
        c.chain.links.forEach((link, i) => {
            let bulge;
            if (link.walkedPath.pathContext.type === pathType.Arc) {
                const arc = link.walkedPath.pathContext;
                bulge = round(Math.tan(angle.toRadians(angle.ofArcSpan(arc)) / 4), opts.accuracy);
                if (link.reversed) {
                    bulge *= -1;
                }
            }
            const vertex = link.endPoints[link.reversed ? 1 : 0];
            polylineEntity.vertices.push(appendVertex(vertex, c.layer, bulge));
        });
        if (!c.chain.endless) {
            const lastLink = c.chain.links[c.chain.links.length - 1];
            const endPoint = lastLink.endPoints[lastLink.reversed ? 0 : 1];
            polylineEntity.vertices.push(appendVertex(endPoint, c.layer));
        }
        return polylineEntity;
    }
    function text(caption) {
        const layerId = defaultLayer(null, caption.layer);
        const layerOptions = colorLayerOptions(layerId);
        const center = point.middle(caption.anchor);
        const textEntity = {
            type: "TEXT",
            startPoint: appendVertex(center, null),
            endPoint: appendVertex(center, null),
            layer: layerId,
            textHeight: (layerOptions && layerOptions.fontSize) || opts.fontSize,
            text: caption.text,
            halign: 4, // Middle
            valign: 0, // Baseline
            rotation: angle.ofPointInDegrees(caption.anchor.origin, caption.anchor.end)
        };
        return textEntity;
    }
    function layerOut(layerId, layerColor) {
        const layerEntity = {
            name: layerId,
            color: layerColor
        };
        return layerEntity;
    }
    function lineTypesOut() {
        const lineStyleTable = {
            lineTypes: {
                "CONTINUOUS": {
                    name: "CONTINUOUS",
                    description: "______",
                    patternLength: 0
                }
            }
        };
        const tableName = 'lineType';
        doc.tables[tableName] = lineStyleTable;
    }
    function layersOut() {
        const layerTable = {
            layers: {}
        };
        layerIds.forEach(layerId => {
            var layerOptions = colorLayerOptions(layerId);
            if (layerOptions) {
                layerTable.layers[layerId] = layerOut(layerId, layerOptions.color);
            }
        });
        const tableName = 'layer';
        doc.tables[tableName] = layerTable;
    }
    function header() {
        if (opts.units) {
            var units = dxfUnit[opts.units];
            doc.header["$INSUNITS"] = units;
        }
    }
    function entities(walkedPaths, chains, captions) {
        const entityArray = doc.entities;
        entityArray.push.apply(entityArray, chains.map(polyline));
        walkedPaths.forEach((walkedPath) => {
            var fn = map[walkedPath.pathContext.type];
            if (fn) {
                const entity = fn(walkedPath.pathContext, walkedPath.offset, walkedPath.layer);
                entityArray.push(entity);
            }
        });
        entityArray.push.apply(entityArray, captions.map(text));
    }
    //fixup options
    if (!opts.units) {
        var units = tryGetModelUnits(itemToExport);
        if (units) {
            opts.units = units;
        }
    }
    //also pass back to options parameter
    extendObject(options, opts);
    //begin dxf output
    const chainsOnLayers = [];
    const walkedPaths = [];
    if (opts.usePOLYLINE) {
        const cb = function (chains, loose, layer) {
            chains.forEach(c => {
                if (c.endless && c.links.length === 1 && c.links[0].walkedPath.pathContext.type === pathType.Circle) {
                    //don't treat circles as lwpolylines
                    walkedPaths.push(c.links[0].walkedPath);
                    return;
                }
                const chainOnLayer = { chain: c, layer };
                chainsOnLayers.push(chainOnLayer);
            });
            walkedPaths.push.apply(walkedPaths, loose);
        };
        model.findChains(modelToExport, cb, { byLayers: true, pointMatchingDistance: opts.pointMatchingDistance });
    }
    else {
        var walkOptions = {
            onPath: (walkedPath) => {
                walkedPaths.push(walkedPath);
            }
        };
        model.walk(modelToExport, walkOptions);
    }
    entities(walkedPaths, chainsOnLayers, model.getAllCaptionsOffset(modelToExport));
    header();
    lineTypesOut();
    layersOut();
    return outputDocument(doc);
}
/**
 * @private
 */
function outputDocument(doc) {
    const dxf = [];
    function append(...values) {
        dxf.push.apply(dxf, values);
    }
    var map = {};
    map["LINE"] = function (line) {
        append("0", "LINE", "8", line.layer, "10", line.vertices[0].x, "20", line.vertices[0].y, "11", line.vertices[1].x, "21", line.vertices[1].y);
    };
    map["CIRCLE"] = function (circle) {
        append("0", "CIRCLE", "8", circle.layer, "10", circle.center.x, "20", circle.center.y, "40", circle.radius);
    };
    map["ARC"] = function (arc) {
        append("0", "ARC", "8", arc.layer, "10", arc.center.x, "20", arc.center.y, "40", arc.radius, "50", arc.startAngle, "51", arc.endAngle);
    };
    //TODO - handle scenario if any bezier seeds get passed
    //map[pathType.BezierSeed]
    map["VERTEX"] = function (vertex) {
        append("0", "VERTEX", "8", vertex.layer, "10", vertex.x, "20", vertex.y);
        if (vertex.bulge !== undefined) {
            append("42", vertex.bulge);
        }
    };
    map["POLYLINE"] = function (polyline) {
        append("0", "POLYLINE", "8", polyline.layer, "66", 1, "70", polyline.shape ? 1 : 0);
        polyline.vertices.forEach(vertex => map["VERTEX"](vertex));
        append("0", "SEQEND");
    };
    map["TEXT"] = function (text) {
        append("0", "TEXT", "10", text.startPoint.x, "20", text.startPoint.y, "11", text.endPoint.x, "21", text.endPoint.y, "40", text.textHeight, "1", text.text, "50", text.rotation, "8", text.layer, "72", text.halign, "73", text.valign);
    };
    function section(sectionFn) {
        append("0", "SECTION");
        sectionFn();
        append("0", "ENDSEC");
    }
    function table(fn) {
        append("0", "TABLE");
        fn();
        append("0", "ENDTAB");
    }
    function tables() {
        append("2", "TABLES");
        table(lineTypesOut);
        table(layersOut);
    }
    function layerOut(layer) {
        append("0", "LAYER", "2", layer.name, "70", "0", "62", layer.color, "6", "CONTINUOUS");
    }
    function lineTypeOut(lineType) {
        append("0", "LTYPE", "72", //72 Alignment code; value is always 65, the ASCII code for A
        "65", "70", "64", "2", lineType.name, "3", lineType.description, "73", "0", "40", lineType.patternLength);
    }
    function lineTypesOut() {
        const lineTypeTableName = 'lineType';
        const lineTypeTable = doc.tables[lineTypeTableName];
        append("2", "LTYPE");
        for (let lineTypeId in lineTypeTable.lineTypes) {
            let lineType = lineTypeTable.lineTypes[lineTypeId];
            lineTypeOut(lineType);
        }
    }
    function layersOut() {
        const layerTableName = 'layer';
        const layerTable = doc.tables[layerTableName];
        append("2", "LAYER");
        for (let layerId in layerTable.layers) {
            let layer = layerTable.layers[layerId];
            layerOut(layer);
        }
    }
    function header() {
        append("2", "HEADER");
        for (let key in doc.header) {
            let value = doc.header[key];
            append("9", key, "70", value);
        }
    }
    function entities(entityArray) {
        append("2", "ENTITIES");
        entityArray.forEach(entity => {
            const fn = map[entity.type];
            if (fn) {
                fn(entity);
            }
        });
    }
    //begin dxf output
    section(header);
    section(tables);
    section(() => entities(doc.entities));
    append("0", "EOF");
    return dxf.join('\n');
}
/**
 * @private
 */
var dxfUnit = {};
//DXF format documentation:
//http://images.autodesk.com/adsk/files/acad_dxf0.pdf
//Default drawing units for AutoCAD DesignCenter blocks:
//0 = Unitless; 1 = Inches; 2 = Feet; 3 = Miles; 4 = Millimeters; 5 = Centimeters; 6 = Meters; 7 = Kilometers; 8 = Microinches;
dxfUnit[''] = 0;
dxfUnit[unitType.Inch] = 1;
dxfUnit[unitType.Foot] = 2;
dxfUnit[unitType.Millimeter] = 4;
dxfUnit[unitType.Centimeter] = 5;
dxfUnit[unitType.Meter] = 6;
//# sourceMappingURL=dxf.js.map