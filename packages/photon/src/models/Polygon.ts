import { IModel, IPoint, IPathMap } from '../core/schema.js';
import type { IKit } from '../core/maker.js';
import * as angle from '../core/angle.js';
import * as point from '../core/point.js';
import { ConnectTheDots } from './ConnectTheDots.js';

export class Polygon implements IModel {
    public paths: IPathMap = {};

    constructor(numberOfSides: number, radius: number, firstCornerAngleInDegrees?: number, circumscribed?: boolean) {
        this.paths = new ConnectTheDots(true, Polygon.getPoints(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed)).paths;
    }

    public static circumscribedRadius(radius: number, angleInRadians: number) {
        return radius / Math.cos(angleInRadians / 2);
    }

    public static getPoints(numberOfSides: number, radius: number, firstCornerAngleInDegrees = 0, circumscribed = false): IPoint[] {
        const points = [];

        const a1 = angle.toRadians(firstCornerAngleInDegrees);
        const a = 2 * Math.PI / numberOfSides;

        if (circumscribed) {
            radius = Polygon.circumscribedRadius(radius, a);
        }

        for (let i = 0; i < numberOfSides; i++) {
            points.push(point.fromPolar(a * i + a1, radius));
        }

        return points;
    }
}

(Polygon as any as IKit).metaParameters = [
    { title: "number of sides", type: "range", min: 3, max: 24, value: 6 },
    { title: "radius", type: "range", min: 1, max: 100, value: 50 },
    { title: "offset angle", type: "range", min: 0, max: 180, value: 0 },
    { title: "radius on flats (vs radius on vertexes)", type: "bool", value: false }
];
