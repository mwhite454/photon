import * as angle from '../core/angle.js';
import * as point from '../core/point.js';
import { ConnectTheDots } from './ConnectTheDots.js';
export class Polygon {
    constructor(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed) {
        this.paths = {};
        this.paths = new ConnectTheDots(true, Polygon.getPoints(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed)).paths;
    }
    static circumscribedRadius(radius, angleInRadians) {
        return radius / Math.cos(angleInRadians / 2);
    }
    static getPoints(numberOfSides, radius, firstCornerAngleInDegrees = 0, circumscribed = false) {
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
Polygon.metaParameters = [
    { title: "number of sides", type: "range", min: 3, max: 24, value: 6 },
    { title: "radius", type: "range", min: 1, max: 100, value: 50 },
    { title: "offset angle", type: "range", min: 0, max: 180, value: 0 },
    { title: "radius on flats (vs radius on vertexes)", type: "bool", value: false }
];
//# sourceMappingURL=Polygon.js.map