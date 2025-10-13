import { ExportFormat } from './iexport.js';

// Base options class for export format configuration
class BaseOptions {
        constructor(public format: ExportFormat, public formatTitle: string, public div: HTMLDivElement, public model: Photon.IModel) {
        }

        $(selector: string) {
            return this.div.querySelector(selector);
        }

        $checked(selector: string) {
            const select = this.$(selector) as HTMLInputElement;
            return select.checked;
        }

        $number(selector: string) {
            const select = this.$(selector) as HTMLInputElement;
            if (photon.isNumber(select.valueAsNumber)) {
                return select.valueAsNumber;
            }
            return +select.value;
        }

        $selectValue(selector: string) {
            const select = this.$(selector) as HTMLSelectElement;
            return select.value;
        }

        addAccuracy(selector: string, options: Photon.exporter.IExportOptions) {
            const accuracy = +this.$selectValue(selector);
            if (accuracy >= 0) {
                options.accuracy = accuracy;
            }
        }

        getOptionObject(): Photon.exporter.IExportOptions {
            throw 'not implemented';
        }

        validate() {
            return true;
        }
    }

// DXF export options
class DxfOptions extends BaseOptions {
        constructor(format: ExportFormat, formatTitle: string, div: HTMLDivElement, model: Photon.IModel) {
            super(format, formatTitle, div, model);

            // TODO:
            // inspect model to see if it contains units
            // show unit picker if it does not
        }

        getOptionObject() {
            const options: Photon.exporter.IDXFRenderOptions = {
                usePOLYLINE: this.$checked('#dxf-usepolyline')
            };
            this.addAccuracy('#dxf-accuracy', options);
            return options;
        }
    }

// SVG export options
class SvgOptions extends BaseOptions {
        getOptionObject() {
            const options: Photon.exporter.ISVGRenderOptions = {
                svgAttrs: { xmlns: "http://www.w3.org/2000/svg" }
            };
            this.addAccuracy('#svg-accuracy', options);
            return options;
        }
    }

// SVG path data export options
class SvgPathDataOptions extends BaseOptions {
        getOptionObject() {
            const options: Photon.exporter.ISVGPathDataRenderOptions = {
                byLayers: false,
                fillRule: this.$selectValue('#svgpathdata-fillrule') as 'evenodd' | 'nonzero',
                origin: this.$selectValue('#svgpathdata-origin') === 'zero' ? [0, 0] : undefined
                // TODO: Layer order
            };
            this.addAccuracy('#svgpathdata-accuracy', options);
            return options;
        }
    }

// JSON export options
class JsonOptions extends BaseOptions {
        getOptionObject() {
            const options: Photon.exporter.IJsonExportOptions = {
                indentation: +this.$selectValue('#json-indent')
            };
            this.addAccuracy('#json-accuracy', options);
            return options;
        }
    }

// OpenJSCAD script export options
class JscadScriptOptions extends BaseOptions {
        getOptionObject() {
            const extrude = this.$number('#openjscad-extrusion');
            if (extrude <= 0) {
                //show the UI
                return null;
            } else {
                //hide the ui
            }
            const options: Photon.exporter.IJscadScriptOptions = {
                extrude,
                functionName: this.$selectValue('#openjscad-name'),
                indent: this.$number('#openjscad-indent'),
                maxArcFacet: +this.$selectValue('#openjscad-facetsize')
            };
            this.addAccuracy('#openjscad-accuracy', options);
            return options;
        }
    }

// STL export options
class StlOptions extends BaseOptions {
        constructor(format: ExportFormat, formatTitle: string, div: HTMLDivElement, model: Photon.IModel) {
            super(format, formatTitle, div, model);

            //modelToExport.exporterOptions['toJscadCSG'])
            // TODO:
            // inspect model to see if it contains exporterOptions.layerOptions
            // then disable extrude
        }

        getOptionObject() {
            const options: Photon.exporter.IJscadCsgOptions = {
                maxArcFacet: +this.$selectValue('#stl-facetsize'),
                extrude: this.$number('#stl-extrude')
            };
            return options;
        }
    }

// PDF export options
class PdfOptions extends BaseOptions {
        getOptionObject() {
            const options: Photon.exporter.IPDFRenderOptions = {
                origin: [
                    +this.$selectValue('#pdf-leftmargin') * 72,
                    +this.$selectValue('#pdf-topmargin') * 72
                ]
            };
            return options;
        }
    }

// Map of format types to option classes
const classes: { [format: number]: typeof BaseOptions } = {
    [ExportFormat.Dxf]: DxfOptions,
    [ExportFormat.Json]: JsonOptions,
    [ExportFormat.OpenJsCad]: JscadScriptOptions,
    [ExportFormat.Pdf]: PdfOptions,
    [ExportFormat.Stl]: StlOptions,
    [ExportFormat.Svg]: SvgOptions,
    [ExportFormat.SvgPathData]: SvgPathDataOptions
};

// Current active options
export let current: BaseOptions;

// Activate export format options
export function activateOption(format: ExportFormat, formatTitle: string, model: Photon.IModel) {
    const formatId = ExportFormat[format];

    //deselect all
    const all = document.querySelectorAll(`.download-option`);
    for (let i = 0; i < all.length; i++) all[i].classList.remove('selected');

    //select current
    const div = document.querySelector(`.download-option[data-format="${formatId}"]`) as HTMLDivElement;
    div.classList.add('selected');

    const formatClass = classes[format];
    current = new formatClass(format, formatTitle, div, model);
}