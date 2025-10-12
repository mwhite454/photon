import { IModel, IPathMap } from '../core/schema.js';
import type { IKit } from '../core/maker.js';
import * as paths from '../core/paths.js';

export class Dogbone implements IModel {
    public paths: IPathMap = {};

    /** Create a dogbone from width, height, corner radius, style, and bottomless flag. */
    constructor(width: number, height: number, radius: number, style = 0, bottomless = false) {
        const maxSide = Math.min(height, width) / 2;
        let maxRadius: number;

        switch (style) {
            case -1: // horizontal
            case 1: // vertical
                maxRadius = maxSide / 2;
                break;

            case 0: // equal
            default:
                maxRadius = maxSide * Math.SQRT2 / 2;
                break;
        }

        radius = Math.min(radius, maxRadius);

        let ax: number;
        let ay: number;
        let lx: number;
        let ly: number;
        let apexes: number[];

        switch (style) {
            case -1:
                ax = 0;
                ay = radius;
                lx = 0;
                ly = radius * 2;
                apexes = [180, 0, 0, 180];
                break;

            case 1:
                ax = radius;
                ay = 0;
                lx = radius * 2;
                ly = 0;
                apexes = [270, 270, 90, 90];
                break;

            case 0:
            default:
                ax = ay = radius / Math.SQRT2;
                lx = ly = ax * 2;
                apexes = [225, 315, 45, 135];
                break;
        }

        if (bottomless) {
            this.paths['Left'] = new paths.Line([0, 0], [0, height - ly]);
            this.paths['Right'] = new paths.Line([width, 0], [width, height - ly]);
        } else {
            this.paths['Left'] = new paths.Line([0, ly], [0, height - ly]);
            this.paths['Right'] = new paths.Line([width, ly], [width, height - ly]);
            this.paths['Bottom'] = new paths.Line([lx, 0], [width - lx, 0]);
            this.paths["BottomLeft"] = new paths.Arc([ax, ay], radius, apexes[0] - 90, apexes[0] + 90);
            this.paths["BottomRight"] = new paths.Arc([width - ax, ay], radius, apexes[1] - 90, apexes[1] + 90);
        }

        this.paths["TopRight"] = new paths.Arc([width - ax, height - ay], radius, apexes[2] - 90, apexes[2] + 90);
        this.paths["TopLeft"] = new paths.Arc([ax, height - ay], radius, apexes[3] - 90, apexes[3] + 90);
        this.paths['Top'] = new paths.Line([lx, height], [width - lx, height]);
    }
}

(Dogbone as any as IKit).metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 },
    { title: "radius", type: "range", min: 0, max: 50, value: 5 },
    { title: "style", type: "select", value: [0, 1, -1] },
    { title: "bottomless", type: "bool", value: false }
];
