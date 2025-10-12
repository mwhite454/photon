import { Polygon } from './Polygon.js';
import { ConnectTheDots } from './ConnectTheDots.js';
export class Star {
    constructor(numberOfPoints, outerRadius, innerRadius, skipPoints = 2) {
        this.paths = {};
        if (!innerRadius) {
            innerRadius = outerRadius * Star.InnerRadiusRatio(numberOfPoints, skipPoints);
        }
        const outerPoints = Polygon.getPoints(numberOfPoints, outerRadius);
        const innerPoints = Polygon.getPoints(numberOfPoints, innerRadius, 180 / numberOfPoints);
        const allPoints = [];
        for (let i = 0; i < numberOfPoints; i++) {
            allPoints.push(outerPoints[i]);
            allPoints.push(innerPoints[i]);
        }
        const model = new ConnectTheDots(true, allPoints);
        this.paths = model.paths;
        delete model.paths;
    }
    static InnerRadiusRatio(numberOfPoints, skipPoints) {
        // formula from http://www.jdawiseman.com/papers/easymath/surds_star_inner_radius.html
        // Cos(Pi()*m/n) / Cos(Pi()*(m-1)/n)
        if (numberOfPoints > 0 && skipPoints > 1 && skipPoints < numberOfPoints / 2) {
            return Math.cos(Math.PI * skipPoints / numberOfPoints) / Math.cos(Math.PI * (skipPoints - 1) / numberOfPoints);
        }
        return 0;
    }
}
Star.metaParameters = [
    { title: "number of sides", type: "range", min: 3, max: 24, value: 8 },
    { title: "outer radius", type: "range", min: 1, max: 100, value: 50 },
    { title: "inner radius", type: "range", min: 0, max: 100, value: 15 },
    { title: "skip points (when inner radius is zero)", type: "range", min: 0, max: 12, value: 2 }
];
//# sourceMappingURL=Star.js.map