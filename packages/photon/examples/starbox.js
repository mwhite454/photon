/// <reference path="typings/tsd.d.ts" />
import * as photon from 'photon';
const starboxCorner = (function () {
    function starboxCorner(holeRadius, rimThickness) {
       const rim = Math.min(rimThickness, holeRadius);
       const hr = holeRadius + rim;
        this.paths = {
            centerRound: new photon.paths.Arc([0, 0], hr, 0, 90),
            hFillet: new photon.paths.Arc([0, hr + holeRadius], holeRadius, 180, 270),
            wFillet: new photon.paths.Arc([hr + holeRadius, 0], holeRadius, 180, 270)
        };
    }
    return starboxCorner;
})();
const starboxInner = (function () {
    function starboxInner(width, height, holeRadius, rimThickness) {
       const mm = photon.model;
       const corner = new starboxCorner(holeRadius, rimThickness);
        this.models = {
            bottomLeft: corner,
            bottomRight: mm.move(mm.mirror(corner, true, false), [width, 0]),
            topLeft: mm.move(mm.mirror(corner, false, true), [0, height]),
            topRight: mm.move(mm.mirror(corner, true, true), [width, height])
        };
       const line = photon.paths.Line;
       const rim = Math.min(rimThickness, holeRadius);
       const d = 2 * holeRadius + rim;
        this.paths = {
            bottom: new line([d, -holeRadius], [width - d, -holeRadius]),
            top: new line([d, height + holeRadius], [width - d, height + holeRadius]),
            left: new line([-holeRadius, d], [-holeRadius, height - d]),
            right: new line([width + holeRadius, d], [width + holeRadius, height - d])
        };
    }
    return starboxInner;
})();
const starbox = (function () {
    function starbox(width, height, holeRadius, rimThickness, angle) {
        if (arguments.length == 0) {
           const defaultValues = photon.kit.getParameterValues(starbox);
            width = defaultValues.shift();
            height = defaultValues.shift();
            holeRadius = defaultValues.shift();
            rimThickness = defaultValues.shift();
        }
       const mm = photon.models;
       const cornerRadius = holeRadius + rimThickness;
       const c2 = cornerRadius * 2;
        this.models = {
            bolts: new mm.BoltRectangle(width, height, holeRadius),
            outer: new mm.RoundRectangle(width + c2, height + c2, cornerRadius),
            inner: new starboxInner(width, height, holeRadius, rimThickness)
        };
        this.models['outer'].origin = [-cornerRadius, -cornerRadius];

       const star = new photon.models.Star(6, height / 2 + 4 * (rimThickness + holeRadius), height / 5);
        photon.model.rotate(star, angle);

        star.origin = [width / 2, height / 2];

        this.models.star = star;

        photon.model.originate(this);

        photon.model.combine(this.models.inner, star, false, true, true, false);
    }
    return starbox;
})();
starbox.metaParameters = [
    { title: "width", type: "range", min: 10, max: 500, value: 120 },
    { title: "height", type: "range", min: 10, max: 500, value: 100 },
    { title: "holeRadius", type: "range", min: 1, max: 20, value: 3 },
    { title: "rimThickness", type: "range", min: 1, max: 20, value: 2 },
    { title: "angle", type: "range", min: -180, max: 180, value: 45 }
];
export default starbox;
