import { IModel, IPoint, IPathMap } from '../core/schema.js';
import type { IKit } from '../core/maker.js';
import * as paths from '../core/paths.js';

export class Holes implements IModel {
    public paths: IPathMap = {};

    /** Create an array of circles of the same radius from an array of center points. */
    constructor(holeRadius: number, points: IPoint[], ids?: string[]) {
        for (let i = 0; i < points.length; i++) {
            const id = ids ? ids[i] : i.toString();
            this.paths[id] = new paths.Circle(points[i], holeRadius);
        }
    }
}

(Holes as any as IKit).metaParameters = [
    { title: "holeRadius", type: "range", min: .1, max: 10, step: .1, value: 1 },
    {
        title: "points", type: "select", value: [
            [[0, 0], [10, 10], [20, 20], [30, 30], [40, 40], [50, 50], [60, 60], [70, 70], [80, 80]],
            [[0, 0], [0, 25], [0, 50], [0, 75], [0, 100], [25, 50], [50, 50], [75, 50], [100, 100], [100, 75], [100, 50], [100, 25], [100, 0]]]
    }
];
