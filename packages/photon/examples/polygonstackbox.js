/// <reference path="typings/tsd.d.ts" />
import * as photon from 'photon';
const arc = photon.paths.Arc;
const line = photon.paths.Line;
const point = photon.point;
const PolygonStackBoxInside = (function () {
    function PolygonStackBoxInside(angle, radius, holeRadius, rimThickness) {
       const rim = Math.min(rimThickness, holeRadius);
       const a2 = angle * 2;
       const innerFilletCenter = point.rotate([radius + 2 * holeRadius + rim, 0], 90 + angle, [radius, 0]);
       const innerFilletTop = new arc(innerFilletCenter, holeRadius, 270 + angle, angle);
       const innerFilletTopPoints = point.fromArc(innerFilletTop);
       const innerFilletBottomPoint = [innerFilletTopPoints[1][0], -innerFilletTopPoints[1][1]];
        this.paths = {
            innerFilletTop: innerFilletTop,
            innerFilletBottom: photon.path.mirror(innerFilletTop, false, true),
            innerLine: new line(innerFilletTopPoints[1], point.rotate(innerFilletBottomPoint, a2, [0, 0])),
            innerFillet: new arc([radius, 0], holeRadius + rim, 90 + angle, 270 - angle)
        };
    }
    return PolygonStackBoxInside;
})();
const PolygonStackBoxOutside = (function () {
    function PolygonStackBoxOutside(angle, radius, holeRadius, rimThickness) {
       const outerFillet = new arc([radius, 0], holeRadius + rimThickness, -angle, angle);
       const outerFilletPoints = point.fromArc(outerFillet);
       const endPoint = point.rotate(outerFilletPoints[0], angle * 2, [0, 0]);
        this.paths = {
            outerFillet: outerFillet,
            outerLine: new line(outerFilletPoints[1], endPoint)
        };
    }
    return PolygonStackBoxOutside;
})();
const PolygonStackBox = (function () {
    function PolygonStackBox(sides, radius, holeRadius, rimThickness) {
        if (arguments.length == 0) {
           const defaultValues = photon.kit.getParameterValues(PolygonStackBox);
            sides = defaultValues.shift();
            radius = defaultValues.shift();
            holeRadius = defaultValues.shift();
            rimThickness = defaultValues.shift();
        }
       const mm = photon.models;
        this.models = {
            bolts: new mm.BoltCircle(radius, holeRadius, sides),
            inner: { models: {} },
            outer: { models: {} }
        };
       const angle = 180 / sides;
       const a2 = angle * 2;
        for (var i = 0; i < sides; i++) {
           const inside = photon.model.rotate(new PolygonStackBoxInside(angle, radius, holeRadius, rimThickness), a2 * i, [0, 0]);
           const outside = photon.model.rotate(new PolygonStackBoxOutside(angle, radius, holeRadius, rimThickness), a2 * i, [0, 0]);
            this.models['inner'].models['side' + i] = inside;
            this.models['outer'].models['side' + i] = outside;
        }
    }
    return PolygonStackBox;
})();
PolygonStackBox.metaParameters = [
    { title: "sides", type: "range", min: 3, max: 25, value: 6 },
    { title: "radius", type: "range", min: 10, max: 500, value: 50 },
    { title: "holeRadius", type: "range", min: 1, max: 20, value: 3 },
    { title: "rimThickness", type: "range", min: 1, max: 20, value: 2 }
];
export default PolygonStackBox;
