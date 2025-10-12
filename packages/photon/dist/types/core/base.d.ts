export declare const version = "debug";
export declare const environmentTypes: {
    readonly BrowserUI: "browser";
    readonly NodeJs: "node";
    readonly WebWorker: "worker";
    readonly Unknown: "unknown";
};
export declare const environment: "browser" | "node" | "worker" | "unknown";
export declare const unitType: {
    readonly Centimeter: "cm";
    readonly Foot: "foot";
    readonly Inch: "inch";
    readonly Meter: "m";
    readonly Millimeter: "mm";
};
export declare const pathType: {
    readonly Line: "line";
    readonly Circle: "circle";
    readonly Arc: "arc";
    readonly BezierSeed: "bezier-seed";
};
export declare function splitDecimal(n: number): string[];
export declare function round(n: number, accuracy?: number): number;
export declare function createRouteKey(route: string[]): string;
export declare function cloneObject<T>(objectToClone: T): T;
export declare function extendObject(target: Record<string, any>, other: Record<string, any>): Record<string, any>;
export declare const isFunction: (value: any) => value is Function;
export declare const isNumber: (value: any) => value is number;
export declare const isObject: (value: any) => value is object;
export declare const isPoint: (item: any) => item is [number, number];
