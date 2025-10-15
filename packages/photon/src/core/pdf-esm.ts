import type { IModel, IPoint, IPath, IPathCircle, IPathLine } from './schema.js';
import type { IChain, IWalkPath } from './core.js';
import { extendObject, cloneObject, unitType, pathType } from './core.js';
import * as units from './units.js';
import * as model from './model.js';
import * as chain from './chain.js';
import * as measure from './measure.js';
import * as point from './point.js';
import * as path from './path.js';
import * as angle from './angle.js';
import { pathToSVGPathData, chainToSVGPathData } from './svg-helpers.js';
import type { IExportOptions } from './exporter.js';

/**
 * PDF rendering options.
 */
export interface IPDFRenderOptions extends IExportOptions {
  /**
   * Font name, see list at https://github.com/foliojs/pdfkit/blob/master/docs/text.coffee.md#fonts
   */
  fontName?: string;

  /**
   * Font size.
   */
  fontSize?: number;

  /**
   * Rendered reference origin.
   */
  origin?: IPoint;

  /**
   * SVG color of the rendered paths.
   */
  stroke?: string;
}

/**
 * Injects drawing into a PDFKit document.
 *
 * @param doc PDFKit.PDFDocument object. See https://pdfkit.org/
 * @param modelToExport Model object to export.
 * @param options Export options object.
 * @returns String of PDF file contents.
 */
export function toPDF(doc: PDFKit.PDFDocument, modelToExport: IModel, options?: IPDFRenderOptions) {
  if (!modelToExport) return;

  // fixup options
  const opts: IPDFRenderOptions = {
    fontName: 'Courier',
    fontSize: 9,
    origin: [0, 0],
    stroke: '#000',
    ...options
  };

  // try to get the unit system from the itemToExport
  let scale = 1;
  const exportUnits = opts.units || modelToExport.units;
  if (exportUnits) {
    // convert to inch
    scale = units.conversionScale(exportUnits, unitType.Inch);
  } else {
    // assume pixels, convert to inch
    scale = 1 / 100;
  }

  // from inch to PDF PPI
  scale *= 72;

  // TODO scale each element without a whole clone
  const scaledModel = model.scale(cloneObject(modelToExport), scale);

  const size = measure.modelExtents(scaledModel);
  if (!size) return;

  const left = -size.low[0];
  let offset: IPoint = [left, size.high[1]];

  offset = point.add(offset, opts.origin!);

  chain.findChains(
    scaledModel,
    function (chains: IChain[], loose: IWalkPath[], layer: string) {
      function single(walkedPath: IWalkPath) {
        const pathData = pathToSVGPathData(walkedPath.pathContext, walkedPath.offset, offset);
        doc.path(pathData).stroke(opts.stroke!);
      }

      chains.map(function (chain: IChain) {
        if (chain.links.length > 1) {
          const pathData = chainToSVGPathData(chain, offset);
          doc.path(pathData).stroke(opts.stroke!);
        } else {
          const walkedPath = chain.links[0].walkedPath;
          if (walkedPath.pathContext.type === pathType.Circle) {
            let fixedPath: IPath = walkedPath.pathContext;
            path.moveTemporary([walkedPath.pathContext], [walkedPath.offset], function () {
              fixedPath = path.mirror(walkedPath.pathContext, false, true);
            });
            path.moveRelative(fixedPath, offset);

            // TODO use only chainToSVGPathData instead of circle, so that we can use fill
            doc
              .circle(fixedPath.origin[0], fixedPath.origin[1], (walkedPath.pathContext as IPathCircle).radius)
              .stroke(opts.stroke!);
          } else {
            single(walkedPath);
          }
        }
      });

      loose.map(single);
    },
    { byLayers: false }
  );

  doc.font(opts.fontName!).fontSize(opts.fontSize!);

  model.getAllCaptionsOffset(scaledModel).forEach(caption => {
    // measure the angle of the line, prior to mirroring
    const a = angle.ofLineInDegrees(caption.anchor);

    // mirror into pdf y coords
    const anchor = path.mirror(caption.anchor, false, true) as IPathLine;

    // move mirrored line by document offset
    path.moveRelative(anchor, offset);

    // measure center point of text
    const text = caption.text;
    const textCenter: IPoint = [doc.widthOfString(text) / 2, doc.heightOfString(text) / 2];

    // get center point on line
    const center = point.middle(anchor) as number[];
    const textOffset = point.subtract(center, textCenter);

    doc.rotate(-a, { origin: center });
    doc.text(text, textOffset[0], textOffset[1]);
    doc.rotate(a, { origin: center });
  });
}
