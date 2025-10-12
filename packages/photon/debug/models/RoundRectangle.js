import * as point from '../core/point.js';
import * as paths from '../core/paths.js';
import * as measure from '../core/measure-minimal.js';
export class RoundRectangle {
    constructor(...args) {
        this.paths = {};
        let width;
        let height;
        let radius = 0;
        switch (args.length) {
            case 3:
                width = args[0];
                height = args[1];
                radius = args[2];
                break;
            case 2:
                radius = args[1];
            // fall through to 1
            case 1:
                const m = measure.modelExtents(args[0]);
                this.origin = point.subtract(m.low, [radius, radius]);
                width = m.high[0] - m.low[0] + 2 * radius;
                height = m.high[1] - m.low[1] + 2 * radius;
                break;
        }
        const maxRadius = Math.min(height, width) / 2;
        radius = Math.min(radius, maxRadius);
        const wr = width - radius;
        const hr = height - radius;
        if (radius > 0) {
            this.paths["BottomLeft"] = new paths.Arc([radius, radius], radius, 180, 270);
            this.paths["BottomRight"] = new paths.Arc([wr, radius], radius, 270, 0);
            this.paths["TopRight"] = new paths.Arc([wr, hr], radius, 0, 90);
            this.paths["TopLeft"] = new paths.Arc([radius, hr], radius, 90, 180);
        }
        if (wr - radius > 0) {
            this.paths["Bottom"] = new paths.Line([radius, 0], [wr, 0]);
            this.paths["Top"] = new paths.Line([wr, height], [radius, height]);
        }
        if (hr - radius > 0) {
            this.paths["Right"] = new paths.Line([width, radius], [width, hr]);
            this.paths["Left"] = new paths.Line([0, hr], [0, radius]);
        }
    }
}
RoundRectangle.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 },
    { title: "radius", type: "range", min: 0, max: 50, value: 11 }
];
//# sourceMappingURL=RoundRectangle.js.map