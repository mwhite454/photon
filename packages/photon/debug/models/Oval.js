import { RoundRectangle } from './RoundRectangle.js';
export class Oval {
    constructor(width, height) {
        this.paths = {};
        this.paths = new RoundRectangle(width, height, Math.min(height / 2, width / 2)).paths;
    }
}
Oval.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 }
];
//# sourceMappingURL=Oval.js.map