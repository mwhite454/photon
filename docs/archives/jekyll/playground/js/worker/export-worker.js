// dependency libraries
let PDFDocument;
/* module system */
var module = this;
module.require = (id) => {
    if (id in module) {
        return module[id];
    }
    return this;
};
importScripts('../../../target/js/browser.maker.js?' + new Date().valueOf(), '../../../external/bezier-js/bezier.js', '../iexport.js');
var photon = require('photon');
var deps = {};
deps[PhotonPlaygroundExport.ExportFormat.Dxf] = true;
deps[PhotonPlaygroundExport.ExportFormat.Json] = true;
deps[PhotonPlaygroundExport.ExportFormat.OpenJsCad] = true;
deps[PhotonPlaygroundExport.ExportFormat.Svg] = true;
deps[PhotonPlaygroundExport.ExportFormat.Stl] = false;
deps[PhotonPlaygroundExport.ExportFormat.Pdf] = false;
function getExporter(format, result) {
    var f = PhotonPlaygroundExport.ExportFormat;
    switch (format) {
        case f.Json:
            return photon.exporter.toJson;
        case f.Dxf:
            function toDXF(model, options) {
                if (!options.units) {
                    options.units = model.units || photon.unitType.Millimeter;
                }
                return photon.exporter.toDXF(model, options);
            }
            return toDXF;
        case f.Svg:
            return photon.exporter.toSVG;
        case f.SvgPathData:
            return photon.exporter.toSVGPathData;
        case f.OpenJsCad:
            return photon.exporter.toJscadScript;
        case f.Stl:
            function toStl(model, options) {
                if (!deps[PhotonPlaygroundExport.ExportFormat.Stl]) {
                    importScripts('../../../external/jscad/csg.js', '../../../external/jscad/stl-serializer.js');
                    deps[PhotonPlaygroundExport.ExportFormat.Stl] = true;
                }
                //make sure size is in mm for STL
                model = photon.model.convertUnits(model, photon.unitType.Millimeter);
                const { CAG } = require('@jscad/csg');
                const stlSerializer = require('@jscad/stl-serializer');
                options.statusCallback = function (status) {
                    result.percentComplete = status.progress;
                    postMessage(result);
                };
                return photon.exporter.toJscadSTL(CAG, stlSerializer, model, options);
            }
            return toStl;
        case f.Pdf:
            function toPdf(model, exportOptions) {
                if (!deps[PhotonPlaygroundExport.ExportFormat.Pdf]) {
                    importScripts('../../../external/text-encoding/encoding-indexes.js', '../../../external/text-encoding/encoding.js', '../../../external/PDFKit/pdfkit.js', 'string-reader.js');
                    deps[PhotonPlaygroundExport.ExportFormat.Pdf] = true;
                }
                function complete(pdfDataString) {
                    result.text = pdfDataString;
                    result.percentComplete = 100;
                    postMessage(result);
                }
                //TODO: watermark
                //TODO: title, author, grid from options
                var pdfOptions = {
                    compress: false,
                    info: {
                        Producer: 'MakerJs',
                        Author: 'MakerJs'
                    }
                };
                var doc = new PDFDocument(pdfOptions);
                var reader = new StringReader(complete);
                var stream = doc.pipe(reader);
                //TODO: break up model across pages
                photon.exporter.toPDF(doc, model, exportOptions);
                doc.end();
            }
            return toPdf;
    }
}
/* events */
onmessage = (ev) => {
    var request = ev.data;
    var result = {
        format: request.format,
        formatTitle: request.formatTitle,
        error: null,
        text: null,
        percentComplete: 0
    };
    var exporter = getExporter(request.format, result);
    if (exporter) {
        //call the exporter function.
        try {
            result.text = exporter(request.model, request.options);
        }
        catch (e) {
            result.error = '' + e;
        }
        result.percentComplete = 100;
        postMessage(result);
    }
};
//# sourceMappingURL=export-worker.js.map