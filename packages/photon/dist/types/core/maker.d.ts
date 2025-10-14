/**
 * Root module for Photon.
 */
import { IModel, IPath, IPoint, IPathLine } from './schema.js';
/** Version info */
export declare const version = "debug";
/** Enumeration of environment types. */
export declare const environmentTypes: {
    readonly BrowserUI: "browser";
    readonly NodeJs: "node";
    readonly WebWorker: "worker";
    readonly Unknown: "unknown";
};
/** Current execution environment type, should be one of environmentTypes. */
export declare const environment: "browser" | "node" | "worker" | "unknown";
/** String-based enumeration of unit types. */
export declare const unitType: {
    readonly Centimeter: "cm";
    readonly Foot: "foot";
    readonly Inch: "inch";
    readonly Meter: "m";
    readonly Millimeter: "mm";
};
/** Split a decimal into its whole and fractional parts as strings. */
export declare function splitDecimal(n: number): string[];
/** Numeric rounding */
export declare function round(n: number, accuracy?: number): number;
/** Create a string representation of a route array. */
export declare function createRouteKey(route: string[]): string;
/** Travel along a route inside of a model to extract a specific node in its tree. */
export declare function travel(modelContext: IModel, route: string | string[]): {
    result: IPath | IModel;
    offset: IPoint;
};
/** Clone an object. */
export declare function cloneObject<T>(objectToClone: T): T;
/** Copy the properties from one object to another object. */
export declare function extendObject(target: any, other: any): any;
/** Test to see if a variable is a function. */
export declare function isFunction(value: any): boolean;
/** Test to see if a variable is a number. */
export declare function isNumber(value: any): boolean;
/** Test to see if a variable is an object. */
export declare function isObject(value: any): boolean;
/** Test to see if an object implements the required properties of a point. */
export declare function isPoint(item: any): boolean;
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
    measureAtlas?: any;
    out_intersectionPoints?: IPoint[];
}
/** Test to see if an object implements the required properties of a path. */
export declare function isPath(item: any): boolean;
/** Test to see if an object implements the required properties of a line. */
export declare function isPathLine(item: any): boolean;
/** Test to see if an object implements the required properties of a circle. */
export declare function isPathCircle(item: any): boolean;
/** Test to see if an object implements the required properties of an arc. */
export declare function isPathArc(item: any): boolean;
/** Test to see if an object implements the required properties of an arc in a bezier curve. */
export declare function isPathArcInBezierCurve(item: any): boolean;
/** String-based enumeration of all paths types. */
export declare const pathType: {
    readonly Line: "line";
    readonly Circle: "circle";
    readonly Arc: "arc";
    readonly BezierSeed: "bezier-seed";
};
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
    measureA?: any;
    /**
     * Cached measurements for model B.
     */
    measureB?: any;
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
/**
 * Callback signature for model.walkPaths().
 */
export interface IModelPathCallback {
    (modelContext: IModel, pathId: string, pathContext: IPath): void;
}
/**
 * Test to see if an object implements the required properties of a model.
 */
export declare function isModel(item: any): boolean;
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
    endless: boolean;
    /**
     * Total length of all paths in the chain.
     */
    pathLength: number;
    /**
     * Chains that are contained within this chain. Populated when chains are found with the 'contain' option
     */
    contains?: IChain[];
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
export declare function isChain(item: any): boolean;
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
    new (...args: any[]): IModel;
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
/**
 * A container that allows a series of functions to be called upon an object.
 * @deprecated Use pipe() or compose() for new code. This legacy API is provided for backward compatibility.
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
 * Register modules for cascade use. Called automatically by index.ts.
 * @private
 */
export declare function registerCascadeModules(model: any, path: any, point: any): void;
/**
 * Create cascade container for fluent API (LEGACY)
 * @deprecated Use pipe() or compose() for new code. This legacy API is provided for backward compatibility.
 * @param context - Model, Path, or Point to wrap
 * @returns Cascade container with chainable operations
 */
export declare function $(modelContext: IModel): ICascade;
export declare function $(pathContext: IPath): ICascade;
export declare function $(pointContext: IPoint): ICascade;
