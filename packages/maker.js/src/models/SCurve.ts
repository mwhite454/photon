import { IModel, IPoint, IPathMap } from '../core/schema.js';
import type { IKit } from '../core/maker.js';
import * as angle from '../core/angle.js';
import * as path from '../core/path.js';
import * as paths from '../core/paths.js';

export class SCurve implements IModel {
    public paths: IPathMap = {};

    constructor(width: number, height: number) {
        const findRadius = (x: number, y: number) => {
            return x + (y * y - x * x) / (2 * x);
        };

        const h2 = height / 2;
        const w2 = width / 2;
        let radius: number;
        let startAngle: number;
        let endAngle: number;
        let arcOrigin: IPoint;

        if (width > height) {
            radius = findRadius(h2, w2);
            startAngle = 270;
            endAngle = 360 - angle.toDegrees(Math.acos(w2 / radius));
            arcOrigin = [0, radius];
        } else {
            radius = findRadius(w2, h2);
            startAngle = 180 - angle.toDegrees(Math.asin(h2 / radius));
            endAngle = 180;
            arcOrigin = [radius, 0];
        }

        const curve = new paths.Arc(arcOrigin, radius, startAngle, endAngle);

        this.paths['curve_start'] = curve;
        this.paths['curve_end'] = path.moveRelative(path.mirror(curve, true, true), [width, height]);
    }
}

(SCurve as any as IKit).metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 }
];
