import { IPoint } from './schema.js';
/** Compare keys to see if they are equal. */
export interface ICollectionKeyComparer<K> {
    (a: K, b: K): boolean;
}
/**
 * A collection for items that share a common key.
 */
export interface ICollection<K, T> {
    key: K;
    items: T[];
}
/**
 * Collects items that share a common key.
 */
export declare class Collector<K, T> {
    private comparer?;
    collections: ICollection<K, T>[];
    constructor(comparer?: ICollectionKeyComparer<K>);
    addItemToCollection(key: K, item: T): void;
    findCollection(key: K, action?: (index: number) => void): T[];
    removeCollection(key: K): boolean;
    removeItemFromCollection(key: K, item: T): boolean;
    getCollectionsOfMultiple(cb: (key: K, items: T[]) => void): void;
}
/**
 * @private
 */
/**
 * The element type stored in the index of a PointGraph.
 */
export interface IPointGraphIndexElement {
    /**
     * The point.
     */
    point: IPoint;
    /**
     * The id of this point.
     */
    pointId: number;
    /**
     * Array of other pointId's merged with this one.
     */
    merged?: number[];
    /**
     * Array of valueId's for this point.
     */
    valueIds: number[];
    /**
     * This point's ordinal position in the kd-tree.
     */
    kdId?: number;
}
/**
 * A graph of items which may be located on the same points.
 */
export declare class PointGraph<T> {
    /**
     * Number of points inserted
     */
    insertedCount: number;
    /**
     * Map of unique points by x, then y, to a point id. This will remain intact even after merging.
     */
    graph: {
        [x: number]: {
            [y: number]: number;
        };
    };
    /**
     * Index of points by id.
     */
    index: {
        [pointId: number]: IPointGraphIndexElement;
    };
    /**
     * Map of point ids which once existed but have been merged into another id due to close proximity.
     */
    merged: {
        [pointId: number]: number;
    };
    /**
     * List of values inserted at points.
     */
    values: T[];
    /**
     * KD tree object.
     */
    private kdbush;
    constructor();
    /**
     * Reset the stored points, graphs, lists, to initial state.
     */
    reset(): void;
    /**
     * Insert a value.
     * @param value Value associated with this point.
     * @returns valueId of the inserted value.
     */
    insertValue(value: T): number;
    /**
     * Insert a value at a point.
     * @param p Point.
     * @param value Value associated with this point.
     */
    insertValueIdAtPoint(valueId: number, p: IPoint): {
        existed: boolean;
        pointId: number;
    };
    /**
     * Merge points within a given distance from each other. Call this after inserting values.
     * @param withinDistance Distance to consider points equal.
     */
    mergePoints(withinDistance: number): void;
    /**
     * Finds all points which have only one value associated. Then, merge to the nearest other point within this set.
     * Call this after inserting values.
     * @param withinDistance Distance to consider points equal.
     */
    mergeNearestSinglePoints(withinDistance: number): void;
    private mergeIndexElements;
    /**
     * Iterate over points in the index.
     * @param cb Callback for each point in the index.
     */
    forEachPoint(cb: (p: IPoint, values: T[], pointId?: number, el?: IPointGraphIndexElement) => void): void;
    /**
     * Gets the id of a point, after merging.
     * @param p Point to look up id.
     */
    getIdOfPoint(p: IPoint): number;
    /**
     * Get the index element of a point, after merging.
     * @param p Point to look up index element.
     */
    getElementAtPoint(p: IPoint): IPointGraphIndexElement;
}
