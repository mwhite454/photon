import type { IModel, IPathArc, IPathLine } from './schema.js';
import { isObject, round, IChain } from './maker.js';
import * as angle from './angle.js';
import * as path from './path.js';
import { pathFillet, pathDogbone } from './fillet-path.js';

export function chainDogbone(chainToFillet: IChain, filletSpec: number | { left?: number; right?: number }): IModel | null {
    return chainFilletInternal(false, chainToFillet, filletSpec);
}

export function chainFillet(chainToFillet: IChain, filletSpec: number | { left?: number; right?: number }): IModel | null {
    return chainFilletInternal(true, chainToFillet, filletSpec);
}

function chainFilletInternal(traditional: boolean, chainToFillet: IChain, filletSpec: number | { left?: number; right?: number }): IModel | null {
    const result: IModel = { paths: {} };
    let added = 0;
    const links = chainToFillet.links;

    const add = (i1: number, i2: number) => {
        const p1 = links[i1].walkedPath;
        const p2 = links[i2].walkedPath;

        path.moveTemporary([p1.pathContext, p2.pathContext], [p1.offset, p2.offset], () => {
            let filletRadius: number;
            if (isObject(filletSpec)) {
                const a = angle.ofChainLinkJoint(links[i1], links[i2]);
                if (a == null || round(a) === 0) return;
                const spec = filletSpec as { left?: number; right?: number };
                filletRadius = a > 0 ? (spec.left as number) : (spec.right as number);
                if (typeof filletRadius !== 'number') return;
            } else {
                filletRadius = filletSpec as number;
            }
            if (!filletRadius || filletRadius < 0) return;

            let filletArc: IPathArc | null;
            if (traditional) {
                filletArc = pathFillet(p1.pathContext, p2.pathContext, filletRadius);
            } else {
                filletArc = pathDogbone(p1.pathContext as IPathLine, p2.pathContext as IPathLine, filletRadius);
            }

            if (filletArc) {
                if (!result.paths) result.paths = {};
                result.paths['fillet' + added] = filletArc;
                added++;
            }
        });
    };

    for (let i = 1; i < links.length; i++) {
        add(i - 1, i);
    }

    if (chainToFillet.endless && links.length > 1) {
        add(links.length - 1, 0);
    }

    if (!added) return null;
    return result;
}
