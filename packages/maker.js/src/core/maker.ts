/**
 * Root module for Maker.js.
 */
import { IModel, IPath, IPoint, IPathLine, IPathCircle, IPathArc, IPathArcInBezierCurve } from './schema.js';

/** Version info */
export const version = 'debug';

/** Enumeration of environment types. */
export const environmentTypes = {
    BrowserUI: 'browser',
    NodeJs: 'node',
    WebWorker: 'worker',
    Unknown: 'unknown'
} as const;

const EPSILON = Number.EPSILON || Math.pow(2, -52);

function tryEval(name: string) {
    try {
        const value = eval(name);
        return value;
    }
    catch (e) { }
    return;
}

function detectEnvironment() {
    if (tryEval('WorkerGlobalScope') && tryEval('self')) {
        return environmentTypes.WebWorker;
    }
    if (tryEval('window') && tryEval('document')) {
        return environmentTypes.BrowserUI;
    }
    //put node last since packagers usually add shims for it
    if (tryEval('global') && tryEval('process')) {
        return environmentTypes.NodeJs;
    }
    return environmentTypes.Unknown;
}

/** Current execution environment type, should be one of environmentTypes. */
export const environment = detectEnvironment();

/** String-based enumeration of unit types. */
export const unitType = {
    Centimeter: 'cm',
    Foot: 'foot',
    Inch: 'inch',
    Meter: 'm',
    Millimeter: 'mm'
} as const;

function split(s: string, char: string) {
    const p = s.indexOf(char);
    if (p < 0) {
        return [s];
    } else if (p > 0) {
        return [s.substr(0, p), s.substr(p + 1)];
    } else {
        return ['', s];
    }
}

/** Split a decimal into its whole and fractional parts as strings. */
export function splitDecimal(n: number) {
    let s = n.toString();
    if (s.indexOf('e') > 0) {
        s = n.toFixed(20).match(/.*[^(0+$)]/)[0];
    }
    return split(s, '.');
}

/** Numeric rounding */
export function round(n: number, accuracy = .0000001): number {
    if (n % 1 === 0) return n;
    const temp = 1 / accuracy;
    return Math.round((n + EPSILON) * temp) / temp;
}

/** Create a string representation of a route array. */
export function createRouteKey(route: string[]) {
    const converted: string[] = [];
    for (let i = 0; i < route.length; i++) {
        const element = route[i];
        const newElement = i % 2 === 0 ? (i > 0 ? '.' : '') + element : JSON.stringify([element]);
        converted.push(newElement);
    }
    return converted.join('');
}

/** Travel along a route inside of a model to extract a specific node in its tree. */
export function travel(modelContext: IModel, route: string | string[]) {
    if (!modelContext || !route) return null;
    const routeArray = Array.isArray(route) ? route : JSON.parse(route);
    const props = routeArray.slice();
    let ref: any = modelContext;
    let origin = modelContext.origin || [0, 0];
    while (props.length) {
        const prop = props.shift();
        ref = ref[prop];
        if (!ref) return null;
        // TEMP: point.add will be available after point.ts is converted
        // if (ref.origin && props.length) {
        //     origin = point.add(origin, ref.origin);
        // }
    }
    return {
        result: ref as IPath | IModel,
        offset: origin
    };
}

const clone = require('clone');

/** Clone an object. */
export function cloneObject<T>(objectToClone: T): T {
    return clone(objectToClone);
}

/** Copy the properties from one object to another object. */
export function extendObject(target: any, other: any) {
    if (target && other) {
        for (const key in other) {
            if (typeof other[key] !== 'undefined') {
                target[key] = other[key];
            }
        }
    }
    return target;
}

/** Test to see if a variable is a function. */
export function isFunction(value: any): boolean {
    return typeof value === 'function';
}

/** Test to see if a variable is a number. */
export function isNumber(value: any): boolean {
    return typeof value === 'number';
}

/** Test to see if a variable is an object. */
export function isObject(value: any): boolean {
    return typeof value === 'object';
}

/** Test to see if an object implements the required properties of a point. */
export function isPoint(item: any) {
    return item && Array.isArray(item) && (item as Array<number>).length == 2 && isNumber(item[0]) && isNumber(item[1]);
}

/** A measurement of extents, the high and low points. */
export interface IMeasure {
    low: IPoint;
    high: IPoint;
}

/** A measurement of extents, with a center point. */
export interface IMeasureWithCenter extends IMeasure {
    center: IPoint;
    width: number;
    height: number;
}

/** A map of measurements. */
export interface IMeasureMap {
    [key: string]: IMeasure;
}

/** A path that was removed in a combine operation. */
export interface IPathRemoved extends IPath {
    reason: string;
    routeKey: string;
}

/** Options to pass to measure.isPointInsideModel(). */
export interface IMeasurePointInsideOptions {
    farPoint?: IPoint;
    measureAtlas?: any; // measure.Atlas - typed as any to avoid circular dependency
    out_intersectionPoints?: IPoint[];
}

/** Test to see if an object implements the required properties of a path. */
export function isPath(item: any): boolean {
    return item && (item as IPath).type && isPoint((item as IPath).origin);
}

/** Test to see if an object implements the required properties of a line. */
export function isPathLine(item: any): boolean {
    return isPath(item) && (<IPath>item).type == 'line' && isPoint((<IPathLine>item).end);
}

/** Test to see if an object implements the required properties of a circle. */
export function isPathCircle(item: any): boolean {
    return isPath(item) && (<IPath>item).type == 'circle' && isNumber((<IPathCircle>item).radius);
}

/** Test to see if an object implements the required properties of an arc. */
export function isPathArc(item: any): boolean {
    return isPath(item) && (<IPath>item).type == 'arc' && isNumber((<IPathArc>item).radius) && isNumber((<IPathArc>item).startAngle) && isNumber((<IPathArc>item).endAngle);
}

/** Test to see if an object implements the required properties of an arc in a bezier curve. */
export function isPathArcInBezierCurve(item: any): boolean {
    return isPathArc(item) && isObject((<IPathArcInBezierCurve>item).bezierData) && isNumber((<IPathArcInBezierCurve>item).bezierData.startT) && isNumber((<IPathArcInBezierCurve>item).bezierData.endT);
}

/** String-based enumeration of all paths types. */
export const pathType = {
    Line: "line",
    Circle: "circle",
    Arc: "arc",
    BezierSeed: "bezier-seed"
} as const;

/** Slope and y-intercept of a line. */
export interface ISlope {
    hasSlope: boolean;
    slope?: number;
    line: IPathLine;
    yIntercept?: number;
}

/** Options to pass to path.intersection() */
export interface IPathIntersectionBaseOptions {
    excludeTangents?: boolean;
    out_AreOverlapped?: boolean;
}

    /**
     * Options to pass to path.intersection()
     */
    export interface IPathIntersectionOptions extends IPathIntersectionBaseOptions {

        /**
         * Optional boolean to only return deep intersections, i.e. not on an end point or tangent.
         */
        path1Offset?: IPoint;

        /**
         * Optional output variable which will be set to true if the paths are overlapped.
         */
        path2Offset?: IPoint;
    }

    /**
     * An intersection of two paths.
     */
    export interface IPathIntersection {

        /**
         * Array of points where the two paths intersected. The length of the array may be either 1 or 2 points.
         */
        intersectionPoints: IPoint[];

        /**
         * This Array property will only be defined if the first parameter passed to pathIntersection is either an Arc or a Circle.
         * It contains the angles of intersection relative to the first path parameter. 
         * The length of the array may be either 1 or 2.
         */
        path1Angles?: number[];

        /**
         * This Array property will only be defined if the second parameter passed to pathIntersection is either an Arc or a Circle.
         * It contains the angles of intersection relative to the second path parameter. 
         * The length of the array may be either 1 or 2.
         */
        path2Angles?: number[];
    }

    /**
     * Options when matching points
     */
    export interface IPointMatchOptions {

        /**
         * Max distance to consider two points as the same.
         */
        pointMatchingDistance?: number;
    }

    /**
     * Options to pass to model.combine.
     */
    export interface ICombineOptions extends IPointMatchOptions {

        /**
         * Flag to remove paths which are not part of a loop.
         */
        trimDeadEnds?: boolean;

        /**
         * Point which is known to be outside of the model.
         */
        farPoint?: IPoint;

        /**
         * Cached measurements for model A.
         */
        measureA?: any; // measure.Atlas - typed as any to avoid circular dependency

        /**
         * Cached measurements for model B.
         */
        measureB?: any; // measure.Atlas - typed as any to avoid circular dependency

        /**
         * Output array of 2 models (corresponding to the input models) containing paths that were deleted in the combination.
         * Each path will be of type IPathRemoved, which has a .reason property describing why it was removed.
         */
        out_deleted?: IModel[];
    }

    /**
     * Options to pass to measure.isPointOnPath.
     */
    export interface IIsPointOnPathOptions {

        /**
         * The slope of the line, if applicable. This will be added to the options object if it did not exist.
         */
        cachedLineSlope?: ISlope;
    }

    /**
     * Options to pass to model.findLoops.
     */
    export interface IFindLoopsOptions extends IPointMatchOptions {

        /**
         * Flag to remove looped paths from the original model.
         */
        removeFromOriginal?: boolean;
    }

    /**
     * Options to pass to model.simplify()
     */
    export interface ISimplifyOptions extends IPointMatchOptions {

        /**
         * Optional 
         */
        scalarMatchingDistance?: number;

    }

    /**
     * A path that may be indicated to "flow" in either direction between its endpoints.
     */
    export interface IPathDirectional extends IPath {

        /**
         * The endpoints of the path.
         */
        endPoints: IPoint[];

        /**
         * Path flows forwards or reverse.
         */
        reversed?: boolean;
    }

    //models

    /**
     * Callback signature for model.walkPaths().
     */
    export interface IModelPathCallback {
        (modelContext: IModel, pathId: string, pathContext: IPath): void;
    }

    /**
     * Test to see if an object implements the required properties of a model.
     */
    export function isModel(item: any): boolean {
        return item && (item.paths || item.models);
    }

    /**
     * Reference to a path id within a model.
     */
    export interface IRefPathIdInModel {
        modelContext: IModel;
        pathId: string;
    }

    /**
     * A route to either a path or a model, and the absolute offset of it.
     */
    export interface IRouteOffset {
        layer: string;
        offset: IPoint;
        route: string[];
        routeKey: string;
    }

    /**
     * A path reference in a walk.
     */
    export interface IWalkPath extends IRefPathIdInModel, IRouteOffset {
        pathContext: IPath;
    }

    /**
     * Callback signature for path in model.walk().
     */
    export interface IWalkPathCallback {
        (context: IWalkPath): void;
    }

    /**
     * Callback for returning a boolean from an IWalkPath.
     */
    export interface IWalkPathBooleanCallback {
        (context: IWalkPath): boolean;
    }

    /**
     * A link in a chain, with direction of flow.
     */
    export interface IChainLink {

        /**
         * Reference to the path.
         */
        walkedPath: IWalkPath;

        /**
         * Path flows forwards or reverse.
         */
        reversed: boolean;

        /**
         * The endpoints of the path, in absolute coords.
         */
        endPoints: IPoint[];

        /**
         * Length of the path.
         */
        pathLength: number;
    }

    /**
     * A chain of paths which connect end to end.
     */
    export interface IChain {

        /**
         * The links in this chain.
         */
        links: IChainLink[];

        /**
         * Flag if this chain forms a loop end to end.
         */
        endless: boolean

        /**
         * Total length of all paths in the chain.
         */
        pathLength: number;

        /**
         * Chains that are contained within this chain. Populated when chains are found with the 'contain' option 
         */
        contains?: IChain[]
    }

    /**
     * A map of chains by layer.
     */
    export interface IChainsMap {
        [layer: string]: IChain[];
    }

    /**
     * Test to see if an object implements the required properties of a chain.
     * 
     * @param item The item to test.
     */
    export function isChain(item: any): boolean {
        var x = item as IChain;
        return x && x.links && Array.isArray(x.links) && isNumber(x.pathLength);
    }

    /**
     * Callback to model.findChains() with resulting array of chains and unchained paths.
     */
    export interface IChainCallback {
        (chains: IChain[], loose: IWalkPath[], layer: string, ignored?: IWalkPath[]): void;
    }

    /**
     * Options to pass to model.findChains.
     */
    export interface IFindChainsOptions extends IPointMatchOptions {

        /**
         * Flag to separate chains by layers.
         */
        byLayers?: boolean;

        /**
         * Flag to not recurse models, look only within current model's immediate paths.
         */
        shallow?: boolean;

        /**
         * Flag to order chains in a heirarchy by their paths being within one another.
         */
        contain?: boolean | IContainChainsOptions;

        /**
         * Flag to flatten BezierCurve arc segments into IPathBezierSeeds.
         */
        unifyBeziers?: boolean;
    }

    /**
     * Sub-options to pass to model.findChains.contain option.
     */
    export interface IContainChainsOptions {

        /**
         * Flag to alternate direction of contained chains.
         */
        alternateDirection?: boolean;
    }

    /**
     * Reference to a model within a model.
     */
    export interface IRefModelInModel {
        parentModel: IModel;
        childId: string;
        childModel: IModel;
    }

    /**
     * A model reference in a walk.
     */
    export interface IWalkModel extends IRefModelInModel, IRouteOffset {
    }

    /**
     * Callback signature for model.walk().
     */
    export interface IWalkModelCallback {
        (context: IWalkModel): void;
    }

    /**
     * Callback signature for model.walk(), which may return false to halt any further walking.
     */
    export interface IWalkModelCancellableCallback {
        (context: IWalkModel): boolean;
    }

    /**
     * Options to pass to model.walk().
     */
    export interface IWalkOptions {

        /**
         * Callback for every path in every model.
         */
        onPath?: IWalkPathCallback;

        /**
         * Callback for every child model in every model. Return false to stop walking down further models.
         */
        beforeChildWalk?: IWalkModelCancellableCallback;

        /**
         * Callback for every child model in every model, after all of its children have been walked.
         */
        afterChildWalk?: IWalkModelCallback;
    }

    /**
     * A hexagon which surrounds a model.
     */
    export interface IBoundingHex extends IModel {

        /**
         * Radius of the hexagon, which is also the length of a side.
         */
        radius: number;
    }

    //kits

    /**
     * Describes a parameter and its limits.
     */
    export interface IMetaParameter {

        /**
         * Display text of the parameter.
         */
        title: string;

        /**
         * Type of the parameter. Currently supports "range".
         */
        type: string;

        /**
         * Optional minimum value of the range.
         */
        min?: number;

        /**
         * Optional maximum value of the range.
         */
        max?: number;

        /**
         * Optional step value between min and max.
         */
        step?: number;

        /**
         * Initial sample value for this parameter.
         */
        value: any;
    }

    /**
     * An IKit is a model-producing class with some sample parameters. Think of it as a packaged model with instructions on how to best use it.
     */
    export interface IKit {

        /**
         * The constructor. The kit must be "new-able" and it must produce an IModel.
         * It can have any number of any type of parameters.
         */
        new(...args: any[]): IModel;

        /**
         * Attached to the constructor is a property named metaParameters which is an array of IMetaParameter objects.
         * Each element of the array corresponds to a parameter of the constructor, in order.
         */
        metaParameters?: IMetaParameter[];

        /**
         * Information about this kit, in plain text or markdown format.
         */
        notes?: string;
    }

    //cascades
    /**
     * A container that allows a series of functions to be called upon an object.
     */
    export interface ICascade {

        /**
         * The initial context object of the cascade.
         */
        $initial: any;

        /**
         * The current final value of the cascade.
         */
        $result: any;

        /**
         * Use the $original as the $result.
         */
        $reset: () => this;
    }

    /**
     * @private
     */
    class Cascade<T> implements ICascade {
        public $result: any;

        constructor(private _module: any, public $initial: T) {
            for (var methodName in this._module) this._shadow(methodName);
            this.$result = $initial;
        }

        private _shadow(methodName: string) {
            var _this = this;
            this[methodName] = function () {
                return _this._apply(_this._module[methodName], arguments);
            }
        }

        private _apply(fn: Function, carriedArguments: IArguments) {
            var args = [].slice.call(carriedArguments);
            args.unshift(this.$result);
            this.$result = fn.apply(undefined, args);
            return this;
        }

        public $reset() {
            this.$result = this.$initial;
            return this;
        }
    }

// TEMP: Cascade functions will be re-enabled after model/path/point modules are converted
// export function $(modelContext: IModel): ICascadeModel;
// export function $(pathContext: IModel): ICascadePath;
// export function $(pointContext: IPoint): ICascadePoint;
// export function $(context: any): ICascade {
//     if (isModel(context)) {
//         return new Cascade<IModel>(model, context);
//     } else if (isPath(context)) {
//         return new Cascade<IPath>(path, context);
//     } else if (isPoint(context)) {
//         return new Cascade<IPoint>(point, context);
//     }
// }
