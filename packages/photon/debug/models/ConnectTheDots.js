import { isPoint } from '../core/maker.js';
import * as paths from '../core/paths.js';
import * as measure from '../core/measure-minimal.js';
function getPoints(arg) {
    let coords;
    if (Array.isArray(arg)) {
        if (isPoint(arg[0])) {
            return arg;
        }
        coords = arg;
    }
    else {
        coords = importer.parseNumericList(arg);
    }
    const points = [];
    for (let i = 0; i < coords.length; i += 2) {
        points.push([coords[i], coords[i + 1]]);
    }
    return points;
}
export class ConnectTheDots {
    constructor(...args) {
        this.paths = {};
        let isClosed;
        let points;
        switch (args.length) {
            case 1:
                isClosed = true;
                points = getPoints(args[0]);
                break;
            case 2:
                isClosed = args[0];
                points = getPoints(args[1]);
                break;
        }
        let lineIndex = 0;
        const connect = (a, b, skipZeroDistance = false) => {
            if (skipZeroDistance && measure.pointDistance(points[a], points[b]) == 0)
                return;
            this.paths["ShapeLine" + lineIndex] = new paths.Line(points[a], points[b]);
            lineIndex++;
        };
        for (let i = 1; i < points.length; i++) {
            connect(i - 1, i);
        }
        if (isClosed && points.length > 2) {
            connect(points.length - 1, 0, true);
        }
    }
}
ConnectTheDots.metaParameters = [
    { title: "closed", type: "bool", value: true },
    {
        title: "points", type: "select", value: [
            [[0, 0], [40, 40], [60, 20], [100, 100], [60, 60], [40, 80]],
            [[0, 0], [100, 0], [50, 87]],
            [-10, 0, 10, 0, 0, 20],
            '-10 0 10 0 0 20',
        ]
    }
];
//# sourceMappingURL=ConnectTheDots.js.map