"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMap = exports.ExportFormat = void 0;
// Export format enumeration
var ExportFormat;
(function (ExportFormat) {
    ExportFormat[ExportFormat["Json"] = 0] = "Json";
    ExportFormat[ExportFormat["Dxf"] = 1] = "Dxf";
    ExportFormat[ExportFormat["Svg"] = 2] = "Svg";
    ExportFormat[ExportFormat["SvgPathData"] = 3] = "SvgPathData";
    ExportFormat[ExportFormat["OpenJsCad"] = 4] = "OpenJsCad";
    ExportFormat[ExportFormat["Stl"] = 5] = "Stl";
    ExportFormat[ExportFormat["Pdf"] = 6] = "Pdf";
})(ExportFormat || (exports.ExportFormat = ExportFormat = {}));
// Format map with media types and file extensions
exports.formatMap = (_a = {},
    _a[ExportFormat.Json] = {
        mediaType: 'application/json',
        fileExtension: 'json'
    },
    _a[ExportFormat.Dxf] = {
        mediaType: 'application/dxf',
        fileExtension: 'dxf'
    },
    _a[ExportFormat.Svg] = {
        mediaType: 'image/svg+xml',
        fileExtension: 'svg'
    },
    _a[ExportFormat.SvgPathData] = {
        mediaType: 'text/plain',
        fileExtension: 'txt'
    },
    _a[ExportFormat.OpenJsCad] = {
        mediaType: 'text/plain',
        fileExtension: 'txt'
    },
    _a[ExportFormat.Stl] = {
        mediaType: 'application/stl',
        fileExtension: 'stl'
    },
    _a[ExportFormat.Pdf] = {
        mediaType: 'application/pdf',
        fileExtension: 'pdf'
    },
    _a);
//# sourceMappingURL=iexport.js.map