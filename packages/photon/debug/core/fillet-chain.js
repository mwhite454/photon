import { isObject, round } from './maker.js';
import * as angle from './angle.js';
import * as path from './path.js';
import { pathFillet, pathDogbone } from './fillet-path.js';
export function chainDogbone(chainToFillet, filletSpec) {
    return chainFilletInternal(false, chainToFillet, filletSpec);
}
export function chainFillet(chainToFillet, filletSpec) {
    return chainFilletInternal(true, chainToFillet, filletSpec);
}
function chainFilletInternal(traditional, chainToFillet, filletSpec) {
    const result = { paths: {} };
    let added = 0;
    const links = chainToFillet.links;
    const add = (i1, i2) => {
        const p1 = links[i1].walkedPath;
        const p2 = links[i2].walkedPath;
        path.moveTemporary([p1.pathContext, p2.pathContext], [p1.offset, p2.offset], () => {
            let filletRadius;
            if (isObject(filletSpec)) {
                const a = angle.ofChainLinkJoint(links[i1], links[i2]);
                if (a == null || round(a) === 0)
                    return;
                const spec = filletSpec;
                filletRadius = a > 0 ? spec.left : spec.right;
                if (typeof filletRadius !== 'number')
                    return;
            }
            else {
                filletRadius = filletSpec;
            }
            if (!filletRadius || filletRadius < 0)
                return;
            let filletArc;
            if (traditional) {
                filletArc = pathFillet(p1.pathContext, p2.pathContext, filletRadius);
            }
            else {
                filletArc = pathDogbone(p1.pathContext, p2.pathContext, filletRadius);
            }
            if (filletArc) {
                if (!result.paths)
                    result.paths = {};
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
    if (!added)
        return null;
    return result;
}
//# sourceMappingURL=fillet-chain.js.map