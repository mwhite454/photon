import { Rectangle } from './Rectangle.js';
export class Square {
    constructor(side) {
        this.paths = {};
        this.paths = new Rectangle(side, side).paths;
    }
}
Square.metaParameters = [
    { title: "side", type: "range", min: 1, max: 100, value: 100 }
];
//# sourceMappingURL=Square.js.map