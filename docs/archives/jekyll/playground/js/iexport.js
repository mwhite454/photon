// Export format enumeration
export var ExportFormat;
(function (ExportFormat) {
    ExportFormat[ExportFormat["Json"] = 0] = "Json";
    ExportFormat[ExportFormat["Dxf"] = 1] = "Dxf";
    ExportFormat[ExportFormat["Svg"] = 2] = "Svg";
    ExportFormat[ExportFormat["SvgPathData"] = 3] = "SvgPathData";
    ExportFormat[ExportFormat["OpenJsCad"] = 4] = "OpenJsCad";
    ExportFormat[ExportFormat["Stl"] = 5] = "Stl";
    ExportFormat[ExportFormat["Pdf"] = 6] = "Pdf";
})(ExportFormat || (ExportFormat = {}));
// Format map with media types and file extensions
export const formatMap = {
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
//# sourceMappingURL=iexport.js.map