import { IModel, IPathMap } from '../core/schema.js';
import type { IKit } from '../core/maker.js';
import { Rectangle } from './Rectangle.js';

export class Square implements IModel {
    public paths: IPathMap = {};

    constructor(side: number) {
        this.paths = new Rectangle(side, side).paths;
    }
}

(Square as any as IKit).metaParameters = [
    { title: "side", type: "range", min: 1, max: 100, value: 100 }
];
