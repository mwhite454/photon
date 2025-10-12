import { round } from '../core/maker.js';
import * as angle from '../core/angle.js';
import * as point from '../core/point.js';
import * as paths from '../core/paths.js';
import * as measure from '../core/measure-minimal.js';
import { intersection } from '../core/intersect.js';
export class OvalArc {
    constructor(startAngle, endAngle, sweepRadius, slotRadius, selfIntersect = false, isolateCaps = false) {
        this.paths = {};
        let capRoot;
        if (isolateCaps) {
            capRoot = { models: {} };
            this.models = { 'Caps': capRoot };
        }
        if (slotRadius <= 0 || sweepRadius <= 0)
            return;
        startAngle = angle.noRevolutions(startAngle);
        endAngle = angle.noRevolutions(endAngle);
        if (round(startAngle - endAngle) == 0)
            return;
        if (endAngle < startAngle)
            endAngle += 360;
        const addCap = (id, tiltAngle, offsetStartAngle, offsetEndAngle) => {
            let capModel;
            if (isolateCaps) {
                capModel = { paths: {} };
                capRoot.models[id] = capModel;
            }
            else {
                capModel = this;
            }
            return capModel.paths[id] = new paths.Arc(point.fromPolar(angle.toRadians(tiltAngle), sweepRadius), slotRadius, tiltAngle + offsetStartAngle, tiltAngle + offsetEndAngle);
        };
        const addSweep = (id, offsetRadius) => {
            return this.paths[id] = new paths.Arc([0, 0], sweepRadius + offsetRadius, startAngle, endAngle);
        };
        addSweep("Outer", slotRadius);
        const hasInner = (sweepRadius - slotRadius) > 0;
        if (hasInner) {
            addSweep("Inner", -slotRadius);
        }
        const caps = [];
        caps.push(addCap("StartCap", startAngle, 180, 0));
        caps.push(addCap("EndCap", endAngle, 0, 180));
        // the distance between the cap origins
        const d = measure.pointDistance(caps[0].origin, caps[1].origin);
        if ((d / 2) < slotRadius) {
            // the caps intersect
            const int = intersection(caps[0], caps[1]);
            if (int) {
                if (!hasInner || !selfIntersect) {
                    caps[0].startAngle = int.path1Angles[0];
                    caps[1].endAngle = int.path2Angles[0];
                }
                if (!selfIntersect && hasInner && int.intersectionPoints.length == 2) {
                    addCap("StartCap2", startAngle, 180, 0).endAngle = int.path1Angles[1];
                    addCap("EndCap2", endAngle, 0, 180).startAngle = int.path2Angles[1] + 360;
                }
            }
        }
    }
}
OvalArc.metaParameters = [
    { title: "start angle", type: "range", min: -360, max: 360, step: 1, value: 180 },
    { title: "end angle", type: "range", min: -360, max: 360, step: 1, value: 0 },
    { title: "sweep", type: "range", min: 0, max: 100, step: 1, value: 50 },
    { title: "radius", type: "range", min: 0, max: 100, step: 1, value: 15 },
    { title: "self intersect", type: "bool", value: false }
];
//# sourceMappingURL=OvalArc.js.map