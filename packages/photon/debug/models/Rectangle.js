import { isObject, isModel } from '../core/maker.js';
import * as point from '../core/point.js';
import * as measure from '../core/measure-minimal.js';
import { ConnectTheDots } from './ConnectTheDots.js';
export class Rectangle {
    constructor(...args) {
        this.paths = {};
        let width;
        let height;
        if (args.length === 2 && !isObject(args[0])) {
            width = args[0];
            height = args[1];
        }
        else {
            let margin = 0;
            let m;
            if (isModel(args[0])) {
                m = measure.modelExtents(args[0]);
                if (args.length === 2) {
                    margin = args[1];
                }
            }
            else {
                // use measurement
                m = args[0];
            }
            this.origin = point.subtract(m.low, [margin, margin]);
            width = m.high[0] - m.low[0] + 2 * margin;
            height = m.high[1] - m.low[1] + 2 * margin;
        }
        this.paths = new ConnectTheDots(true, [[0, 0], [width, 0], [width, height], [0, height]]).paths;
    }
}
Rectangle.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 }
];
//# sourceMappingURL=Rectangle.js.map