import type { IModel, IPoint } from './schema.js';
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
export declare function toPDF(doc: PDFKit.PDFDocument, modelToExport: IModel, options?: IPDFRenderOptions): void;
