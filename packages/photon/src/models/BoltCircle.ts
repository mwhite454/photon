import { IModel, IPathMap } from '../core/schema.js';
import type { IKit } from '../core/core.js';
import { Polygon } from './Polygon.js';
import { Holes } from './Holes.js';

export class BoltCircle implements IModel {
    public paths: IPathMap = {};

    constructor(boltRadius: number, holeRadius: number, boltCount: number, firstBoltAngleInDegrees: number = 0) {
        const points = Polygon.getPoints(boltCount, boltRadius, firstBoltAngleInDegrees);
        const ids = points.map((p, i) => "bolt " + i);
        this.paths = new Holes(holeRadius, points, ids).paths;
    }
}

(BoltCircle as any as IKit).metaParameters = [
    { title: "bolt circle radius", type: "range", min: 1, max: 100, value: 50 },
    { title: "hole radius", type: "range", min: 1, max: 50, value: 5 },
    { title: "bolt count", type: "range", min: 3, max: 24, value: 12 },
    { title: "offset angle", type: "range", min: 0, max: 180, value: 0 }
];
