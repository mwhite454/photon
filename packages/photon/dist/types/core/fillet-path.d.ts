import { IPath, IPathLine, IPathArc } from './schema.js';
import type { IPointMatchOptions } from './maker.js';
export declare function pathDogbone(lineA: IPathLine, lineB: IPathLine, filletRadius: number, options?: IPointMatchOptions): IPathArc | null;
export declare function pathFillet(pathA: IPath, pathB: IPath, filletRadius: number, options?: IPointMatchOptions): IPathArc | null;
