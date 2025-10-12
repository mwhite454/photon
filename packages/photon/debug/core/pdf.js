var MakerJs;
(function (MakerJs) {
    var exporter;
    (function (exporter) {
        /**
         * Attempt to delegate to ES module implementation in MakerJs.pdf if available.
         * @private
         */
        function tryDelegateToEsmToPDF(doc, modelToExport, options) {
            const anyMaker = MakerJs;
            const esm = anyMaker && anyMaker.pdf;
            if (esm && typeof esm.toPDF === 'function') {
                try {
                    esm.toPDF(doc, modelToExport, options);
                    return true;
                }
                catch (e) {
                    // fall back to legacy implementation
                }
            }
            return false;
        }
        /**
         * Injects drawing into a PDFKit document.
         *
         * @param doc PDFKit.PDFDocument object. See https://pdfkit.org/
         * @param modelToExport Model object to export.
         * @param options Export options object.
         * @returns String of PDF file contents.
         */
        function toPDF(doc, modelToExport, options) {
            // Delegate to ES module if available
            if (tryDelegateToEsmToPDF(doc, modelToExport, options))
                return;
            if (!modelToExport)
                return;
            //fixup options
            var opts = {
                fontName: 'Courier',
                fontSize: 9,
                origin: [0, 0],
                stroke: "#000",
            };
            extendObject(opts, options);
            //try to get the unit system from the itemToExport
            var scale = 1;
            var exportUnits = opts.units || modelToExport.units;
            if (exportUnits) {
                //convert to inch
                scale = units.conversionScale(exportUnits, unitType.Inch);
            }
            else {
                //assume pixels, convert to inch
                scale = 1 / 100;
            }
            //from inch to PDF PPI
            scale *= 72;
            //TODO scale each element without a whole clone
            var scaledModel = model.scale(cloneObject(modelToExport), scale);
            var size = measure.modelExtents(scaledModel);
            var left = -size.low[0];
            var offset = [left, size.high[1]];
            offset = point.add(offset, opts.origin);
            model.findChains(scaledModel, function (chains, loose, layer) {
                function single(walkedPath) {
                    var pathData = exporter.pathToSVGPathData(walkedPath.pathContext, walkedPath.offset, offset);
                    doc.path(pathData).stroke(opts.stroke);
                }
                chains.map(function (chain) {
                    if (chain.links.length > 1) {
                        var pathData = exporter.chainToSVGPathData(chain, offset);
                        doc.path(pathData).stroke(opts.stroke);
                    }
                    else {
                        var walkedPath = chain.links[0].walkedPath;
                        if (walkedPath.pathContext.type === pathType.Circle) {
                            var fixedPath;
                            path.moveTemporary([walkedPath.pathContext], [walkedPath.offset], function () {
                                fixedPath = path.mirror(walkedPath.pathContext, false, true);
                            });
                            path.moveRelative(fixedPath, offset);
                            //TODO use only chainToSVGPathData instead of circle, so that we can use fill
                            doc.circle(fixedPath.origin[0], fixedPath.origin[1], walkedPath.pathContext.radius).stroke(opts.stroke);
                        }
                        else {
                            single(walkedPath);
                        }
                    }
                });
                loose.map(single);
            }, { byLayers: false });
            doc.font(opts.fontName).fontSize(opts.fontSize);
            model.getAllCaptionsOffset(scaledModel).forEach(caption => {
                //measure the angle of the line, prior to mirroring
                const a = angle.ofLineInDegrees(caption.anchor);
                //mirror into pdf y coords
                const anchor = path.mirror(caption.anchor, false, true);
                //move mirrored line by document offset
                path.moveRelative(anchor, offset);
                //measure center point of text
                const text = caption.text;
                const textCenter = [doc.widthOfString(text) / 2, doc.heightOfString(text) / 2];
                //get center point on line
                const center = point.middle(anchor);
                const textOffset = point.subtract(center, textCenter);
                doc.rotate(-a, { origin: center });
                doc.text(text, textOffset[0], textOffset[1]);
                doc.rotate(a, { origin: center });
            });
        }
        exporter.toPDF = toPDF;
    })(exporter = MakerJs.exporter || (MakerJs.exporter = {}));
})(MakerJs || (MakerJs = {}));
//# sourceMappingURL=pdf.js.map