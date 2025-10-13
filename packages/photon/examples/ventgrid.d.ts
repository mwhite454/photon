/// <reference path="../target/ts/photon.d.ts" />
declare const photon: typeof MakerJs;
declare class Ventgrid implements MakerJs.IModel {
    filterRadius: number;
    spacing: number;
    width: number;
    height: number;
    units: string;
    paths: MakerJs.IPathMap;
    constructor(filterRadius: number, spacing: number, width: number, height: number);
}
