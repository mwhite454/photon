import { IModel, IPathMap } from '../core/schema.js';
import type { IKit } from '../core/core.js';
import * as point from '../core/point.js';
import * as paths from '../core/paths.js';

export class Ring implements IModel {
    public paths: IPathMap = {};

    constructor(outerRadius: number, innerRadius?: number) {
        const radii = {
            "Ring_outer": outerRadius,
            "Ring_inner": innerRadius
        };

        for (const id in radii) {
            const r = radii[id];
            if (r === undefined || r <= 0) continue;
            this.paths[id] = new paths.Circle(point.zero(), r);
        }
    }
}

(Ring as any as IKit).metaParameters = [
    { title: "outer radius", type: "range", min: 0, max: 100, step: 1, value: 50 },
    { title: "inner radius", type: "range", min: 0, max: 100, step: 1, value: 20 }
];
