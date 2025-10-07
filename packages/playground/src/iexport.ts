// Export format enumeration
export enum ExportFormat {
    Json,
    Dxf,
    Svg,
    SvgPathData,
    OpenJsCad,
    Stl,
    Pdf
}

// Internal interface for export messages
interface IExportMessage {
    format: ExportFormat;
    formatTitle: string;
}

// Export request interface
export interface IExportRequest extends IExportMessage {
    model: MakerJs.IModel;
    options: MakerJs.exporter.IExportOptions;
}

// File export metadata
interface IFileExport {
    mediaType: string;
    fileExtension: string
}

// Export response interface
export interface IExportResponse extends IExportMessage {
    error: string;
    text: string;
    percentComplete: number;
}

// JavaScript error details interface
export interface IJavaScriptErrorDetails {
    colno: number;
    lineno: number;
    message: string;
    name: string;
}

// Format to file export map type
interface IFormatToFileExportMap {
    [format: number]: IFileExport;
}

// Format map with media types and file extensions
export const formatMap: IFormatToFileExportMap = {
    [ExportFormat.Json]: {
        mediaType: 'application/json',
        fileExtension: 'json'
    },
    [ExportFormat.Dxf]: {
        mediaType: 'application/dxf',
        fileExtension: 'dxf'
    },
    [ExportFormat.Svg]: {
        mediaType: 'image/svg+xml',
        fileExtension: 'svg'
    },
    [ExportFormat.SvgPathData]: {
        mediaType: 'text/plain',
        fileExtension: 'txt'
    },
    [ExportFormat.OpenJsCad]: {
        mediaType: 'text/plain',
        fileExtension: 'txt'
    },
    [ExportFormat.Stl]: {
        mediaType: 'application/stl',
        fileExtension: 'stl'
    },
    [ExportFormat.Pdf]: {
        mediaType: 'application/pdf',
        fileExtension: 'pdf'
    }
};

// Font interface
export interface IFont {
    displayName: string;
    path: string;
    tags: string[];
}

// Global playground fonts declaration
declare global {
    var playgroundFonts: { [id: string]: IFont };
}
