import { pathFillet, pathDogbone } from './fillet-path.js';
import { chainFillet, chainDogbone } from './fillet-chain.js';

export { pathFillet, pathDogbone, chainFillet, chainDogbone };

// Legacy Maker.js namespace compatibility
declare const MakerJs: any;

if (typeof MakerJs !== 'undefined') {
    MakerJs.path = MakerJs.path || {};
    MakerJs.chain = MakerJs.chain || {};

    MakerJs.path.fillet = function (pathA: any, pathB: any, filletRadius: number, options?: any): any {
        return pathFillet(pathA, pathB, filletRadius, options);
    };

    MakerJs.path.dogbone = function (lineA: any, lineB: any, filletRadius: number, options?: any): any {
        return pathDogbone(lineA, lineB, filletRadius, options);
    };

    MakerJs.chain.fillet = function (chainToFillet: any, filletSpec: number | { left?: number; right?: number }): any {
        return chainFillet(chainToFillet, filletSpec);
    };

    MakerJs.chain.dogbone = function (chainToFillet: any, filletSpec: number | { left?: number; right?: number }): any {
        return chainDogbone(chainToFillet, filletSpec);
    };
}
