import type { IPath, IPoint } from './schema.js';
import { type IChain } from './core.js';
/**
 * Export a single path to SVG path-data string.
 */
export declare function pathToSVGPathData(pathToExport: IPath, pathOffset: IPoint, exportOffset: IPoint, accuracy?: number, clockwiseCircle?: boolean): string;
/**
 * Convert a chain to SVG path-data string.
 */
export declare function chainToSVGPathData(chain: IChain, offset: IPoint, accuracy?: number): string;
