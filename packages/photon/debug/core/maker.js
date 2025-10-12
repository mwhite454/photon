import clone from 'clone';
/** Version info */
export const version = 'debug';
/** Enumeration of environment types. */
export const environmentTypes = {
    BrowserUI: 'browser',
    NodeJs: 'node',
    WebWorker: 'worker',
    Unknown: 'unknown'
};
const EPSILON = Number.EPSILON || Math.pow(2, -52);
function tryEval(name) {
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
};
function split(s, char) {
    const p = s.indexOf(char);
    if (p < 0) {
        return [s];
    }
    else if (p > 0) {
        return [s.substr(0, p), s.substr(p + 1)];
    }
    else {
        return ['', s];
    }
}
/** Split a decimal into its whole and fractional parts as strings. */
export function splitDecimal(n) {
    let s = n.toString();
    if (s.indexOf('e') > 0) {
        s = n.toFixed(20).match(/.*[^(0+$)]/)[0];
    }
    return split(s, '.');
}
/** Numeric rounding */
export function round(n, accuracy = .0000001) {
    if (n % 1 === 0)
        return n;
    const temp = 1 / accuracy;
    return Math.round((n + EPSILON) * temp) / temp;
}
/** Create a string representation of a route array. */
export function createRouteKey(route) {
    const converted = [];
    for (let i = 0; i < route.length; i++) {
        const element = route[i];
        const newElement = i % 2 === 0 ? (i > 0 ? '.' : '') + element : JSON.stringify([element]);
        converted.push(newElement);
    }
    return converted.join('');
}
/** Travel along a route inside of a model to extract a specific node in its tree. */
export function travel(modelContext, route) {
    if (!modelContext || !route)
        return null;
    const routeArray = Array.isArray(route) ? route : JSON.parse(route);
    const props = routeArray.slice();
    let ref = modelContext;
    let origin = modelContext.origin || [0, 0];
    while (props.length) {
        const prop = props.shift();
        ref = ref[prop];
        if (!ref)
            return null;
        // TEMP: point.add will be available after point.ts is converted
        // if (ref.origin && props.length) {
        //     origin = point.add(origin, ref.origin);
        // }
    }
    return {
        result: ref,
        offset: origin
    };
}
/** Clone an object. */
export function cloneObject(objectToClone) {
    return clone(objectToClone);
}
/** Copy the properties from one object to another object. */
export function extendObject(target, other) {
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
export function isFunction(value) {
    return typeof value === 'function';
}
/** Test to see if a variable is a number. */
export function isNumber(value) {
    return typeof value === 'number';
}
/** Test to see if a variable is an object. */
export function isObject(value) {
    return typeof value === 'object';
}
/** Test to see if an object implements the required properties of a point. */
export function isPoint(item) {
    return item && Array.isArray(item) && item.length == 2 && isNumber(item[0]) && isNumber(item[1]);
}
/** Test to see if an object implements the required properties of a path. */
export function isPath(item) {
    return item && item.type && isPoint(item.origin);
}
/** Test to see if an object implements the required properties of a line. */
export function isPathLine(item) {
    return isPath(item) && item.type == 'line' && isPoint(item.end);
}
/** Test to see if an object implements the required properties of a circle. */
export function isPathCircle(item) {
    return isPath(item) && item.type == 'circle' && isNumber(item.radius);
}
/** Test to see if an object implements the required properties of an arc. */
export function isPathArc(item) {
    return isPath(item) && item.type == 'arc' && isNumber(item.radius) && isNumber(item.startAngle) && isNumber(item.endAngle);
}
/** Test to see if an object implements the required properties of an arc in a bezier curve. */
export function isPathArcInBezierCurve(item) {
    return isPathArc(item) && isObject(item.bezierData) && isNumber(item.bezierData.startT) && isNumber(item.bezierData.endT);
}
/** String-based enumeration of all paths types. */
export const pathType = {
    Line: "line",
    Circle: "circle",
    Arc: "arc",
    BezierSeed: "bezier-seed"
};
/**
 * Test to see if an object implements the required properties of a model.
 */
export function isModel(item) {
    return item && (item.paths || item.models);
}
/**
 * Test to see if an object implements the required properties of a chain.
 *
 * @param item The item to test.
 */
export function isChain(item) {
    var x = item;
    return x && x.links && Array.isArray(x.links) && isNumber(x.pathLength);
}
/**
 * @private
 */
class Cascade {
    constructor(_module, $initial) {
        this._module = _module;
        this.$initial = $initial;
        for (var methodName in this._module)
            this._shadow(methodName);
        this.$result = $initial;
    }
    _shadow(methodName) {
        var _this = this;
        this[methodName] = function () {
            return _this._apply(_this._module[methodName], arguments);
        };
    }
    _apply(fn, carriedArguments) {
        var args = [].slice.call(carriedArguments);
        args.unshift(this.$result);
        this.$result = fn.apply(undefined, args);
        return this;
    }
    $reset() {
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
//# sourceMappingURL=maker.js.map