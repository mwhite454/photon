import { ExportFormat } from './iexport.js';
// Base options class for export format configuration
class BaseOptions {
    constructor(format, formatTitle, div, model) {
        this.format = format;
        this.formatTitle = formatTitle;
        this.div = div;
        this.model = model;
    }
    $(selector) {
        return this.div.querySelector(selector);
    }
    $checked(selector) {
        const select = this.$(selector);
        return select.checked;
    }
    $number(selector) {
        const select = this.$(selector);
        if (photon.isNumber(select.valueAsNumber)) {
            return select.valueAsNumber;
        }
        return +select.value;
    }
    $selectValue(selector) {
        const select = this.$(selector);
        return select.value;
    }
    addAccuracy(selector, options) {
        const accuracy = +this.$selectValue(selector);
        if (accuracy >= 0) {
            options.accuracy = accuracy;
        }
    }
    getOptionObject() {
        throw 'not implemented';
    }
    validate() {
        return true;
    }
}
// DXF export options
class DxfOptions extends BaseOptions {
    constructor(format, formatTitle, div, model) {
        super(format, formatTitle, div, model);
        // TODO:
        // inspect model to see if it contains units
        // show unit picker if it does not
    }
    getOptionObject() {
        const options = {
            usePOLYLINE: this.$checked('#dxf-usepolyline')
        };
        this.addAccuracy('#dxf-accuracy', options);
        return options;
    }
}
// SVG export options
class SvgOptions extends BaseOptions {
    getOptionObject() {
        const options = {
            svgAttrs: { xmlns: "http://www.w3.org/2000/svg" }
        };
        this.addAccuracy('#svg-accuracy', options);
        return options;
    }
}
// SVG path data export options
class SvgPathDataOptions extends BaseOptions {
    getOptionObject() {
        const options = {
            byLayers: false,
            fillRule: this.$selectValue('#svgpathdata-fillrule'),
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
        const options = {
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
        }
        else {
            //hide the ui
        }
        const options = {
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
    constructor(format, formatTitle, div, model) {
        super(format, formatTitle, div, model);
        //modelToExport.exporterOptions['toJscadCSG'])
        // TODO:
        // inspect model to see if it contains exporterOptions.layerOptions
        // then disable extrude
    }
    getOptionObject() {
        const options = {
            maxArcFacet: +this.$selectValue('#stl-facetsize'),
            extrude: this.$number('#stl-extrude')
        };
        return options;
    }
}
// PDF export options
class PdfOptions extends BaseOptions {
    getOptionObject() {
        const options = {
            origin: [
                +this.$selectValue('#pdf-leftmargin') * 72,
                +this.$selectValue('#pdf-topmargin') * 72
            ]
        };
        return options;
    }
}
// Map of format types to option classes
const classes = {
    [ExportFormat.Dxf]: DxfOptions,
    [ExportFormat.Json]: JsonOptions,
    [ExportFormat.OpenJsCad]: JscadScriptOptions,
    [ExportFormat.Pdf]: PdfOptions,
    [ExportFormat.Stl]: StlOptions,
    [ExportFormat.Svg]: SvgOptions,
    [ExportFormat.SvgPathData]: SvgPathDataOptions
};
// Current active options
export let current;
// Activate export format options
export function activateOption(format, formatTitle, model) {
    const formatId = ExportFormat[format];
    //deselect all
    const all = document.querySelectorAll(`.download-option`);
    for (let i = 0; i < all.length; i++)
        all[i].classList.remove('selected');
    //select current
    const div = document.querySelector(`.download-option[data-format="${formatId}"]`);
    div.classList.add('selected');
    const formatClass = classes[format];
    current = new formatClass(format, formatTitle, div, model);
}
//# sourceMappingURL=format-options.js.map