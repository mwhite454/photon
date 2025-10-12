import * as measure from './measure-minimal.js';
import KDBush from 'kdbush';
/**
 * Collects items that share a common key.
 */
export class Collector {
    constructor(comparer) {
        this.comparer = comparer;
        this.collections = [];
    }
    addItemToCollection(key, item) {
        let found = this.findCollection(key);
        if (found) {
            found.push(item);
        }
        else {
            let collection = { key: key, items: [item] };
            this.collections.push(collection);
        }
    }
    findCollection(key, action) {
        for (let i = 0; i < this.collections.length; i++) {
            let collection = this.collections[i];
            if (this.comparer(key, collection.key)) {
                if (action) {
                    action(i);
                }
                return collection.items;
            }
        }
        return null;
    }
    removeCollection(key) {
        if (this.findCollection(key, (index) => { this.collections.splice(index, 1); })) {
            return true;
        }
        return false;
    }
    removeItemFromCollection(key, item) {
        let collection = this.findCollection(key);
        if (!collection)
            return;
        for (let i = 0; i < collection.length; i++) {
            if (collection[i] === item) {
                collection.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    getCollectionsOfMultiple(cb) {
        for (let i = 0; i < this.collections.length; i++) {
            let collection = this.collections[i];
            if (collection.items.length > 1) {
                cb(collection.key, collection.items);
            }
        }
    }
}
/**
 * A graph of items which may be located on the same points.
 */
export class PointGraph {
    constructor() {
        this.reset();
    }
    /**
     * Reset the stored points, graphs, lists, to initial state.
     */
    reset() {
        this.insertedCount = 0;
        this.graph = {};
        this.index = {};
        this.merged = {};
        this.values = [];
    }
    /**
     * Insert a value.
     * @param value Value associated with this point.
     * @returns valueId of the inserted value.
     */
    insertValue(value) {
        this.values.push(value);
        return this.values.length - 1;
    }
    /**
     * Insert a value at a point.
     * @param p Point.
     * @param value Value associated with this point.
     */
    insertValueIdAtPoint(valueId, p) {
        const x = p[0], y = p[1];
        if (!this.graph[x]) {
            this.graph[x] = {};
        }
        const pgx = this.graph[x];
        const existed = (y in pgx);
        let el;
        let pointId;
        if (!existed) {
            pgx[y] = pointId = this.insertedCount++;
            el = {
                pointId,
                point: p,
                valueIds: [valueId]
            };
            this.index[pointId] = el;
        }
        else {
            pointId = pgx[y];
            if (pointId in this.merged) {
                pointId = this.merged[pointId];
            }
            el = this.index[pointId];
            el.valueIds.push(valueId);
        }
        return { existed, pointId };
    }
    /**
     * Merge points within a given distance from each other. Call this after inserting values.
     * @param withinDistance Distance to consider points equal.
     */
    mergePoints(withinDistance) {
        const points = [];
        const kEls = [];
        for (let pointId in this.index) {
            let el = this.index[pointId];
            let p = el.point;
            el.kdId = points.length;
            points.push(p);
            kEls.push(el);
        }
        this.kdbush = new KDBush(points, (pt) => pt[0], (pt) => pt[1]);
        for (let pointId in this.index) {
            if (pointId in this.merged)
                continue;
            let el = this.index[pointId];
            let mergeIds = this.kdbush.within(el.point[0], el.point[1], withinDistance);
            mergeIds.forEach(kdId => {
                if (kdId === el.kdId)
                    return;
                this.mergeIndexElements(el, kEls[kdId]);
            });
        }
    }
    /**
     * Finds all points which have only one value associated. Then, merge to the nearest other point within this set.
     * Call this after inserting values.
     * @param withinDistance Distance to consider points equal.
     */
    mergeNearestSinglePoints(withinDistance) {
        const singles = [];
        for (let pointId in this.index) {
            let el = this.index[pointId];
            if (el.valueIds.length === 1) {
                singles.push(el);
            }
        }
        this.kdbush = new KDBush(singles.map(el => el.point), (pt) => pt[0], (pt) => pt[1]);
        singles.forEach(el => {
            if (el.pointId in this.merged)
                return;
            let mergeIds = this.kdbush.within(el.point[0], el.point[1], withinDistance);
            let byDistance = [];
            mergeIds.forEach(i => {
                const other = singles[i];
                if (other.pointId === el.pointId)
                    return;
                byDistance.push({ el: other, distance: measure.pointDistance(other.point, el.point) });
            });
            byDistance.sort((a, b) => a.distance - b.distance);
            for (let i = 0; i < byDistance.length; i++) {
                let other = byDistance[i].el;
                if (other.pointId in this.merged)
                    continue;
                if (other.merged && other.merged.length > 0) {
                    this.mergeIndexElements(other, el);
                }
                else {
                    this.mergeIndexElements(el, other);
                }
                return;
            }
        });
    }
    mergeIndexElements(keep, remove) {
        keep.merged = keep.merged || [];
        keep.merged.push(remove.pointId);
        this.merged[remove.pointId] = keep.pointId;
        keep.valueIds.push.apply(keep.valueIds, remove.valueIds);
        delete this.index[remove.pointId];
        return keep.pointId;
    }
    /**
     * Iterate over points in the index.
     * @param cb Callback for each point in the index.
     */
    forEachPoint(cb) {
        for (let pointId = 0; pointId < this.insertedCount; pointId++) {
            let el = this.index[pointId];
            if (!el)
                continue;
            let length = el.valueIds.length;
            if (length > 0) {
                cb(el.point, el.valueIds.map(i => this.values[i]), pointId, el);
            }
        }
    }
    /**
     * Gets the id of a point, after merging.
     * @param p Point to look up id.
     */
    getIdOfPoint(p) {
        const px = this.graph[p[0]];
        if (px) {
            const pointId = px[p[1]];
            if (pointId >= 0) {
                if (pointId in this.merged) {
                    return this.merged[pointId];
                }
                else {
                    return pointId;
                }
            }
        }
    }
    /**
     * Get the index element of a point, after merging.
     * @param p Point to look up index element.
     */
    getElementAtPoint(p) {
        const pointId = this.getIdOfPoint(p);
        if (pointId >= 0) {
            return this.index[pointId];
        }
    }
}
//# sourceMappingURL=collect.js.map