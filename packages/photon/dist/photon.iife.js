var Photon = (function(exports, KDBush, bezierJs, grahamScanModule) {
  "use strict";
  const models$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get Belt() {
      return Belt;
    },
    get BezierCurve() {
      return BezierCurve;
    },
    get BezierSeed() {
      return BezierSeed;
    },
    get BoltCircle() {
      return BoltCircle;
    },
    get BoltRectangle() {
      return BoltRectangle;
    },
    get ConnectTheDots() {
      return ConnectTheDots;
    },
    get Dogbone() {
      return Dogbone;
    },
    get Dome() {
      return Dome;
    },
    get Ellipse() {
      return Ellipse;
    },
    get EllipticArc() {
      return EllipticArc;
    },
    get Holes() {
      return Holes;
    },
    get Oval() {
      return Oval;
    },
    get OvalArc() {
      return OvalArc;
    },
    get Polygon() {
      return Polygon;
    },
    get Rectangle() {
      return Rectangle;
    },
    get Ring() {
      return Ring;
    },
    get RoundRectangle() {
      return RoundRectangle;
    },
    get SCurve() {
      return SCurve;
    },
    get Slot() {
      return Slot;
    },
    get Square() {
      return Square;
    },
    get Star() {
      return Star;
    },
    get Text() {
      return Text;
    }
  }, Symbol.toStringTag, { value: "Module" }));
  const version = "debug";
  const environmentTypes = {
    BrowserUI: "browser",
    NodeJs: "node",
    WebWorker: "worker",
    Unknown: "unknown"
  };
  const EPSILON = Number.EPSILON || Math.pow(2, -52);
  function tryEval(name) {
    try {
      const value = eval(name);
      return value;
    } catch (e) {
    }
    return;
  }
  function detectEnvironment() {
    if (tryEval("WorkerGlobalScope") && tryEval("self")) {
      return environmentTypes.WebWorker;
    }
    if (tryEval("window") && tryEval("document")) {
      return environmentTypes.BrowserUI;
    }
    if (tryEval("global") && tryEval("process")) {
      return environmentTypes.NodeJs;
    }
    return environmentTypes.Unknown;
  }
  const environment = detectEnvironment();
  const unitType = {
    Centimeter: "cm",
    Foot: "foot",
    Inch: "inch",
    Meter: "m",
    Millimeter: "mm"
  };
  function split(s, char) {
    const p = s.indexOf(char);
    if (p < 0) {
      return [s];
    } else if (p > 0) {
      return [s.substr(0, p), s.substr(p + 1)];
    } else {
      return ["", s];
    }
  }
  function splitDecimal(n) {
    let s = n.toString();
    if (s.indexOf("e") > 0) {
      s = n.toFixed(20).match(/.*[^(0+$)]/)[0];
    }
    return split(s, ".");
  }
  function round(n, accuracy = 1e-7) {
    if (n % 1 === 0) return n;
    const temp = 1 / accuracy;
    return Math.round((n + EPSILON) * temp) / temp;
  }
  function createRouteKey(route) {
    const converted = [];
    for (let i = 0; i < route.length; i++) {
      const element = route[i];
      const newElement = i % 2 === 0 ? (i > 0 ? "." : "") + element : JSON.stringify([element]);
      converted.push(newElement);
    }
    return converted.join("");
  }
  function travel(modelContext, route) {
    if (!modelContext || !route) return null;
    const routeArray = Array.isArray(route) ? route : JSON.parse(route);
    const props = routeArray.slice();
    let ref = modelContext;
    let origin = modelContext.origin || [0, 0];
    while (props.length) {
      const prop = props.shift();
      ref = ref[prop];
      if (!ref) return null;
    }
    return {
      result: ref,
      offset: origin
    };
  }
  function cloneObject(objectToClone) {
    const anyGlobal = globalThis;
    if (typeof anyGlobal.structuredClone === "function") {
      return anyGlobal.structuredClone(objectToClone);
    }
    return JSON.parse(JSON.stringify(objectToClone));
  }
  function extendObject(target, other) {
    if (target && other) {
      for (const key in other) {
        if (typeof other[key] !== "undefined") {
          target[key] = other[key];
        }
      }
    }
    return target;
  }
  function isFunction(value2) {
    return typeof value2 === "function";
  }
  function isNumber(value2) {
    return typeof value2 === "number";
  }
  function isObject(value2) {
    return typeof value2 === "object";
  }
  function isPoint(item) {
    return item && Array.isArray(item) && item.length == 2 && isNumber(item[0]) && isNumber(item[1]);
  }
  function isPath(item) {
    return item && item.type && isPoint(item.origin);
  }
  function isPathLine(item) {
    return isPath(item) && item.type == "line" && isPoint(item.end);
  }
  function isPathCircle(item) {
    return isPath(item) && item.type == "circle" && isNumber(item.radius);
  }
  function isPathArc(item) {
    return isPath(item) && item.type == "arc" && isNumber(item.radius) && isNumber(item.startAngle) && isNumber(item.endAngle);
  }
  function isPathArcInBezierCurve(item) {
    return isPathArc(item) && isObject(item.bezierData) && isNumber(item.bezierData.startT) && isNumber(item.bezierData.endT);
  }
  const pathType = {
    Line: "line",
    Circle: "circle",
    Arc: "arc",
    BezierSeed: "bezier-seed"
  };
  function isModel(item) {
    return item && (item.paths || item.models);
  }
  function isChain(item) {
    var x = item;
    return x && x.links && Array.isArray(x.links) && isNumber(x.pathLength);
  }
  class Cascade {
    constructor(_module, $initial) {
      this._module = _module;
      this.$initial = $initial;
      for (const methodName in this._module) this._shadow(methodName);
      this.$result = cloneObject($initial);
    }
    _shadow(methodName) {
      this[methodName] = (...args) => {
        return this._apply(this._module[methodName], args);
      };
    }
    _apply(fn, carriedArgs) {
      const args = [this.$result, ...carriedArgs];
      this.$result = fn(...args);
      return this;
    }
    $reset() {
      this.$result = this.$initial;
      return this;
    }
  }
  const _moduleRegistry = {};
  function registerCascadeModules(model2, path, point) {
    _moduleRegistry.model = model2;
    _moduleRegistry.path = path;
    _moduleRegistry.point = point;
  }
  function $(context) {
    if (isModel(context)) {
      if (!_moduleRegistry.model) {
        throw new Error("Model module not registered for cascade. This is likely a build or import order issue.");
      }
      return new Cascade(_moduleRegistry.model, context);
    } else if (isPath(context)) {
      if (!_moduleRegistry.path) {
        throw new Error("Path module not registered for cascade. This is likely a build or import order issue.");
      }
      return new Cascade(_moduleRegistry.path, context);
    } else if (isPoint(context)) {
      if (!_moduleRegistry.point) {
        throw new Error("Point module not registered for cascade. This is likely a build or import order issue.");
      }
      return new Cascade(_moduleRegistry.point, context);
    }
    throw new Error("Invalid context for Photon cascade function. Expected Model, Path, or Point.");
  }
  const core = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    $,
    cloneObject,
    createRouteKey,
    environment,
    environmentTypes,
    extendObject,
    isChain,
    isFunction,
    isModel,
    isNumber,
    isObject,
    isPath,
    isPathArc,
    isPathArcInBezierCurve,
    isPathCircle,
    isPathLine,
    isPoint,
    pathType,
    registerCascadeModules,
    round,
    splitDecimal,
    travel,
    unitType,
    version
  }, Symbol.toStringTag, { value: "Module" }));
  function getFractionalPart(n) {
    return splitDecimal(n)[1];
  }
  function setFractionalPart(n, fractionalPart) {
    if (fractionalPart) {
      return +(splitDecimal(n)[0] + "." + fractionalPart);
    } else {
      return n;
    }
  }
  function copyFractionalPart(src, dest) {
    if (src < 0 && dest < 0 || src > 0 && dest > 0) {
      return setFractionalPart(dest, getFractionalPart(src));
    }
    return dest;
  }
  function noRevolutions(angleInDegrees) {
    const revolutions = Math.floor(angleInDegrees / 360);
    if (revolutions === 0) return angleInDegrees;
    const a = angleInDegrees - 360 * revolutions;
    return copyFractionalPart(angleInDegrees, a);
  }
  function toRadians(angleInDegrees) {
    return noRevolutions(angleInDegrees) * Math.PI / 180;
  }
  function toDegrees(angleInRadians) {
    return angleInRadians * 180 / Math.PI;
  }
  function ofArcEnd(arc) {
    if (arc.endAngle < arc.startAngle) {
      const revolutions = Math.ceil((arc.startAngle - arc.endAngle) / 360);
      const a = revolutions * 360 + arc.endAngle;
      return copyFractionalPart(arc.endAngle, a);
    }
    return arc.endAngle;
  }
  function ofArcMiddle(arc, ratio = 0.5) {
    return arc.startAngle + ofArcSpan(arc) * ratio;
  }
  function ofArcSpan(arc) {
    const endAngle = ofArcEnd(arc);
    const a = endAngle - arc.startAngle;
    if (round(a) > 360) {
      return noRevolutions(a);
    } else {
      return a;
    }
  }
  function ofLineInDegrees(line) {
    return noRevolutions(toDegrees(ofPointInRadians(line.origin, line.end)));
  }
  function ofPointInDegrees(origin, pointToFindAngle) {
    return toDegrees(ofPointInRadians(origin, pointToFindAngle));
  }
  function ofPointInRadians(origin, pointToFindAngle) {
    const d = subtract(pointToFindAngle, origin);
    const x = d[0];
    const y = d[1];
    return Math.atan2(-y, -x) + Math.PI;
  }
  function mirror$3(angleInDegrees, mirrorX, mirrorY) {
    if (mirrorY) {
      angleInDegrees = 360 - angleInDegrees;
    }
    if (mirrorX) {
      angleInDegrees = (angleInDegrees < 180 ? 180 : 540) - angleInDegrees;
    }
    return angleInDegrees;
  }
  const linkLineMap = {};
  linkLineMap[pathType.Arc] = (arc, first, reversed) => {
    const fromEnd = first != reversed;
    const angleToRotate = fromEnd ? arc.endAngle - 90 : arc.startAngle + 90;
    const origin = fromArc(arc)[fromEnd ? 1 : 0];
    const end = rotate(add(origin, [arc.radius, 0]), angleToRotate, origin);
    return new paths.Line(first ? [end, origin] : [origin, end]);
  };
  linkLineMap[pathType.Line] = (line, first, reversed) => {
    return reversed ? new paths.Line(line.end, line.origin) : line;
  };
  function getLinkLine(chainLink, first) {
    if (chainLink) {
      const p = chainLink.walkedPath.pathContext;
      const fn = linkLineMap[p.type];
      if (fn) {
        return fn(p, first, chainLink.reversed);
      }
    }
  }
  function ofChainLinkJoint(linkA, linkB) {
    if (arguments.length < 2) return null;
    const linkLines = [linkA, linkB].map((link, i) => getLinkLine(link, i === 0));
    let result = noRevolutions(ofLineInDegrees(linkLines[1]) - ofLineInDegrees(linkLines[0]));
    if (result > 180) result -= 360;
    return result;
  }
  const angle = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    mirror: mirror$3,
    noRevolutions,
    ofArcEnd,
    ofArcMiddle,
    ofArcSpan,
    ofChainLinkJoint,
    ofLineInDegrees,
    ofPointInDegrees,
    ofPointInRadians,
    toDegrees,
    toRadians
  }, Symbol.toStringTag, { value: "Module" }));
  const base = unitType.Millimeter;
  let table;
  function init() {
    addBaseConversion(unitType.Centimeter, 10);
    addBaseConversion(unitType.Meter, 1e3);
    addBaseConversion(unitType.Inch, 25.4);
    addBaseConversion(unitType.Foot, 25.4 * 12);
  }
  function addConversion(srcUnitType, destUnitType, value2) {
    const row = (unitType2) => {
      if (!table[unitType2]) {
        table[unitType2] = {};
      }
      return table[unitType2];
    };
    row(srcUnitType)[destUnitType] = value2;
    row(destUnitType)[srcUnitType] = 1 / value2;
  }
  function addBaseConversion(destUnitType, value2) {
    addConversion(destUnitType, base, value2);
  }
  function conversionScale(srcUnitType, destUnitType) {
    if (srcUnitType == destUnitType) {
      return 1;
    }
    if (!table) {
      table = {};
      init();
    }
    if (!table[srcUnitType][destUnitType]) {
      addConversion(srcUnitType, destUnitType, table[srcUnitType][base] * table[base][destUnitType]);
    }
    return table[srcUnitType] && table[srcUnitType][destUnitType];
  }
  function isValidUnit(tryUnit) {
    for (const id in unitType) {
      if (unitType[id] == tryUnit) {
        return true;
      }
    }
    return false;
  }
  const units = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    conversionScale,
    isValidUnit
  }, Symbol.toStringTag, { value: "Module" }));
  function isAngleEqual(angleA, angleB, accuracy = 1e-4) {
    const a = noRevolutions(angleA);
    const b = noRevolutions(angleB);
    const d = noRevolutions(round(b - a, accuracy));
    return d == 0;
  }
  const pathAreEqualMap = {};
  pathAreEqualMap[pathType.Line] = (lineA, lineB, withinPointDistance) => {
    return isPointEqual(lineA.origin, lineB.origin, withinPointDistance) && isPointEqual(lineA.end, lineB.end, withinPointDistance) || isPointEqual(lineA.origin, lineB.end, withinPointDistance) && isPointEqual(lineA.end, lineB.origin, withinPointDistance);
  };
  pathAreEqualMap[pathType.Circle] = (circleA, circleB, withinPointDistance) => {
    return isPointEqual(circleA.origin, circleB.origin, withinPointDistance) && circleA.radius == circleB.radius;
  };
  pathAreEqualMap[pathType.Arc] = (arcA, arcB, withinPointDistance) => {
    return pathAreEqualMap[pathType.Circle](arcA, arcB, withinPointDistance) && isAngleEqual(arcA.startAngle, arcB.startAngle) && isAngleEqual(arcA.endAngle, arcB.endAngle);
  };
  function isPathEqual(pathA, pathB, withinPointDistance, pathAOffset, pathBOffset) {
    let result = false;
    if (pathA.type == pathB.type) {
      const fn = pathAreEqualMap[pathA.type];
      if (fn) {
        const getResult = () => {
          result = fn(pathA, pathB, withinPointDistance);
        };
        if (pathAOffset || pathBOffset) {
          moveTemporary([pathA, pathB], [pathAOffset, pathBOffset], getResult);
        } else {
          getResult();
        }
      }
    }
    return result;
  }
  function isPointEqual(a, b, withinDistance) {
    if (!withinDistance) {
      return round(a[0] - b[0]) == 0 && round(a[1] - b[1]) == 0;
    } else {
      if (!a || !b) return false;
      const distance = pointDistance$2(a, b);
      return distance <= withinDistance;
    }
  }
  function pointDistance$2(a, b) {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  function isPointDistinct(pointToCheck, pointArray, withinDistance) {
    for (let i = 0; i < pointArray.length; i++) {
      if (isPointEqual(pointArray[i], pointToCheck, withinDistance)) {
        return false;
      }
    }
    return true;
  }
  function isPointOnSlope(p, slope, withinDistance = 0) {
    if (slope.hasSlope) {
      return Math.abs(p[1] - (slope.slope * p[0] + slope.yIntercept)) <= withinDistance;
    } else {
      return Math.abs(p[0] - slope.line.origin[0]) <= withinDistance;
    }
  }
  function isPointOnCircle(p, circle, withinDistance = 0) {
    const d = Math.abs(pointDistance$2(p, circle.origin) - circle.radius);
    return d <= withinDistance;
  }
  const onPathMap$1 = {};
  onPathMap$1[pathType.Circle] = (p, circle, withinDistance) => {
    return isPointOnCircle(p, circle, withinDistance);
  };
  onPathMap$1[pathType.Arc] = (p, arc, withinDistance) => {
    if (onPathMap$1[pathType.Circle](p, arc, withinDistance)) {
      const a = ofPointInDegrees(arc.origin, p);
      return measure.isBetweenArcAngles(a, arc, false);
    }
    return false;
  };
  onPathMap$1[pathType.Line] = (p, line, withinDistance, options) => {
    const slope = options && options.cachedLineSlope || measure.lineSlope(line);
    if (options && !options.cachedLineSlope) {
      options.cachedLineSlope = slope;
    }
    return isPointOnSlope(p, slope, withinDistance) && measure.isBetweenPoints(p, line, false);
  };
  function isPointOnPath(pointToCheck, onPath, withinDistance = 0, pathOffset, options) {
    const fn = onPathMap$1[onPath.type];
    if (fn) {
      const offsetPath = pathOffset ? clone$1(onPath, pathOffset) : onPath;
      return fn(pointToCheck, offsetPath, withinDistance, options);
    }
    return false;
  }
  function isSlopeEqual(slopeA, slopeB) {
    if (!isSlopeParallel(slopeA, slopeB)) return false;
    if (!slopeA.hasSlope && !slopeB.hasSlope) {
      return round(slopeA.line.origin[0] - slopeB.line.origin[0]) == 0;
    }
    const slopes = [slopeA, slopeB];
    const angles = slopes.map((s) => toDegrees(Math.atan(s.slope)));
    const lines = slopes.map((s) => clone$1(s.line));
    const origin = lines[0].origin;
    lines.forEach((l, i) => rotate$1(l, -angles[i], origin));
    const averageYs = lines.map((l) => (l.origin[1] + l.end[1]) / 2);
    return round(averageYs[0] - averageYs[1], 1e-5) == 0;
  }
  function isSlopeParallel(slopeA, slopeB) {
    if (!slopeA.hasSlope && !slopeB.hasSlope) {
      return true;
    }
    if (slopeA.hasSlope && slopeB.hasSlope && round(slopeA.slope - slopeB.slope, 1e-5) == 0) {
      return true;
    }
    return false;
  }
  const equal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    isAngleEqual,
    isPathEqual,
    isPointDistinct,
    isPointEqual,
    isPointOnCircle,
    isPointOnPath,
    isPointOnSlope,
    isSlopeEqual,
    isSlopeParallel
  }, Symbol.toStringTag, { value: "Module" }));
  function pointDistance$1(a, b) {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  function getExtremePoint$1(a, b, fn) {
    return [
      fn(a[0], b[0]),
      fn(a[1], b[1])
    ];
  }
  const pathExtentsMap$1 = {};
  pathExtentsMap$1[pathType.Line] = (line) => {
    return {
      low: getExtremePoint$1(line.origin, line.end, Math.min),
      high: getExtremePoint$1(line.origin, line.end, Math.max)
    };
  };
  pathExtentsMap$1[pathType.Circle] = (circle) => {
    const r = circle.radius;
    return {
      low: add(circle.origin, [-r, -r]),
      high: add(circle.origin, [r, r])
    };
  };
  const isBetweenArcAngles$1 = (angleInQuestion, arc, exclusive) => {
    const startAngle = noRevolutions(arc.startAngle);
    const span = ofArcSpan(arc);
    const endAngle = startAngle + span;
    angleInQuestion = noRevolutions(angleInQuestion);
    if (angleInQuestion < startAngle) {
      angleInQuestion += 360;
    }
    const isBetween2 = (valueInQuestion, limitA, limitB, exclusive2) => {
      {
        return Math.min(limitA, limitB) <= valueInQuestion && valueInQuestion <= Math.max(limitA, limitB);
      }
    };
    return isBetween2(angleInQuestion, startAngle, endAngle);
  };
  pathExtentsMap$1[pathType.Arc] = (arc) => {
    const r = arc.radius;
    const arcPoints = fromArc(arc);
    const extremeAngle = (xyAngle, value2, fn) => {
      const extremePoint = getExtremePoint$1(arcPoints[0], arcPoints[1], fn);
      for (let i = 2; i--; ) {
        if (isBetweenArcAngles$1(xyAngle[i], arc)) {
          extremePoint[i] = value2 + arc.origin[i];
        }
      }
      return extremePoint;
    };
    return {
      low: extremeAngle([180, 270], -r, Math.min),
      high: extremeAngle([360, 90], r, Math.max)
    };
  };
  function pathExtents$1(pathToMeasure, addOffset) {
    if (pathToMeasure) {
      const fn = pathExtentsMap$1[pathToMeasure.type];
      if (fn) {
        const m = fn(pathToMeasure);
        if (addOffset) {
          m.high = add(m.high, addOffset);
          m.low = add(m.low, addOffset);
        }
        return m;
      }
    }
    return { low: null, high: null };
  }
  const pathLengthMap$1 = {};
  pathLengthMap$1[pathType.Line] = (line) => {
    return pointDistance$1(line.origin, line.end);
  };
  pathLengthMap$1[pathType.Circle] = (circle) => {
    return 2 * Math.PI * circle.radius;
  };
  pathLengthMap$1[pathType.Arc] = (arc) => {
    const value2 = pathLengthMap$1[pathType.Circle](arc);
    const pct = ofArcSpan(arc) / 360;
    return value2 * pct;
  };
  pathLengthMap$1[pathType.BezierSeed] = (seed) => {
    return models.BezierCurve.computeLength(seed);
  };
  function pathLength$1(pathToMeasure) {
    if (pathToMeasure) {
      const fn = pathLengthMap$1[pathToMeasure.type];
      if (fn) {
        return fn(pathToMeasure);
      }
    }
    return 0;
  }
  function increase$1(baseMeasure, addMeasure) {
    const getExtreme = (basePoint, newPoint, fn) => {
      if (!newPoint) return basePoint;
      if (!basePoint) return newPoint;
      return [
        fn(basePoint[0], newPoint[0]),
        fn(basePoint[1], newPoint[1])
      ];
    };
    baseMeasure.high = getExtreme(baseMeasure.high, addMeasure.high, Math.max);
    baseMeasure.low = getExtreme(baseMeasure.low, addMeasure.low, Math.min);
    return baseMeasure;
  }
  function augment$1(measureToAugment) {
    const m = measureToAugment;
    m.center = average(m.high, m.low);
    m.width = m.high[0] - m.low[0];
    m.height = m.high[1] - m.low[1];
    return m;
  }
  function modelExtents$1(modelToMeasure) {
    let measure2 = { low: null, high: null };
    walk(modelToMeasure, {
      onPath: (walkedPath) => {
        const m = pathExtents$1(walkedPath.pathContext, walkedPath.offset);
        increase$1(measure2, m);
      }
    });
    if (!measure2.high) return null;
    return augment$1(measure2);
  }
  class Collector {
    constructor(comparer) {
      this.comparer = comparer;
      this.collections = [];
    }
    addItemToCollection(key, item) {
      let found = this.findCollection(key);
      if (found) {
        found.push(item);
      } else {
        let collection = { key, items: [item] };
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
      if (this.findCollection(key, (index) => {
        this.collections.splice(index, 1);
      })) {
        return true;
      }
      return false;
    }
    removeItemFromCollection(key, item) {
      let collection = this.findCollection(key);
      if (!collection) return;
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
  class PointGraph {
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
    insertValue(value2) {
      this.values.push(value2);
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
      const existed = y in pgx;
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
      } else {
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
      this.kdbush = new KDBush(points.length);
      for (const point of points) {
        this.kdbush.add(point[0], point[1]);
      }
      this.kdbush.finish();
      for (let pointId in this.index) {
        if (pointId in this.merged) continue;
        let el = this.index[pointId];
        let mergeIds = this.kdbush.within(el.point[0], el.point[1], withinDistance);
        mergeIds.forEach((kdId) => {
          if (kdId === el.kdId) return;
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
      this.kdbush = new KDBush(singles.length);
      for (const single of singles) {
        this.kdbush.add(single.point[0], single.point[1]);
      }
      this.kdbush.finish();
      singles.forEach((el) => {
        if (el.pointId in this.merged) return;
        let mergeIds = this.kdbush.within(el.point[0], el.point[1], withinDistance);
        let byDistance = [];
        mergeIds.forEach((i) => {
          const other = singles[i];
          if (other.pointId === el.pointId) return;
          byDistance.push({ el: other, distance: pointDistance$1(other.point, el.point) });
        });
        byDistance.sort((a, b) => a.distance - b.distance);
        for (let i = 0; i < byDistance.length; i++) {
          let other = byDistance[i].el;
          if (other.pointId in this.merged) continue;
          if (other.merged && other.merged.length > 0) {
            this.mergeIndexElements(other, el);
          } else {
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
        if (!el) continue;
        let length = el.valueIds.length;
        if (length > 0) {
          cb(el.point, el.valueIds.map((i) => this.values[i]), pointId, el);
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
          } else {
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
  const collect = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Collector,
    PointGraph
  }, Symbol.toStringTag, { value: "Module" }));
  function getOpposedLink(linkedPaths, pathContext) {
    if (linkedPaths[0].walkedPath.pathContext === pathContext) {
      return linkedPaths[1];
    }
    return linkedPaths[0];
  }
  function followLinks(pointGraph, chainFound, chainNotFound) {
    const followLink = (initialLink, chain2, firstLink) => {
      let currLink = initialLink;
      while (currLink) {
        chain2.links.push(currLink);
        chain2.pathLength += currLink.pathLength;
        const next = currLink.reversed ? 0 : 1;
        const nextPoint = currLink.endPoints[next];
        const nextEl = pointGraph.getElementAtPoint(nextPoint);
        if (!nextEl || nextEl.valueIds.length === 0) {
          break;
        }
        const items = nextEl.valueIds.map((valueIndex) => pointGraph.values[valueIndex]);
        const nextLink = getOpposedLink(items, currLink.walkedPath.pathContext);
        nextEl.valueIds.splice(0, 2);
        if (!nextLink) {
          break;
        }
        if (nextLink.walkedPath.pathContext === firstLink.walkedPath.pathContext) {
          if (chain2.links.length > 1) {
            chain2.endless = true;
          }
          break;
        }
        currLink = nextLink;
      }
    };
    pointGraph.forEachPoint((p, values, _pointId, el) => {
      if (!el || el.valueIds.length === 0) {
        return;
      }
      const chain2 = {
        links: [],
        endless: false,
        pathLength: 0
      };
      const firstValue = values[0];
      if (!firstValue) {
        return;
      }
      followLink(firstValue, chain2, firstValue);
      if (chain2.endless) {
        chainFound(chain2, false);
        return;
      }
      chain2.links.reverse();
      const firstLink = chain2.links[0];
      if (!firstLink) {
        return;
      }
      chain2.links.forEach((link) => {
        link.reversed = !link.reversed;
      });
      const lastLink = chain2.links[chain2.links.length - 1];
      if (lastLink) {
        chain2.pathLength -= lastLink.pathLength;
      }
      const currLink = chain2.links.pop();
      followLink(currLink, chain2, firstLink);
      if (chain2.links.length > 1) {
        chainFound(chain2, true);
      } else {
        const singleLink = chain2.links[0];
        if (singleLink) {
          chainNotFound?.(singleLink.walkedPath);
        }
      }
    });
  }
  function findSingleChain$1(modelContext) {
    let singleChain = null;
    findChains$1(
      modelContext,
      (chains, loose, layer2) => {
        singleChain = chains[0];
      },
      { byLayers: false }
    );
    return singleChain;
  }
  function linkEndpoint(link, beginning) {
    const index = beginning === link.reversed ? 1 : 0;
    return link.endPoints[index];
  }
  function findChains$1(modelContext, ...args) {
    let options;
    let callback;
    switch (args.length) {
      case 1:
        if (typeof args[0] === "function") {
          callback = args[0];
        } else {
          options = args[0];
        }
        break;
      case 2:
        callback = args[0];
        options = args[1];
        break;
    }
    const opts = {
      pointMatchingDistance: 5e-3
    };
    extendObject(opts, options);
    const pointGraphsByLayer = {};
    const chainsByLayer = {};
    const ignored = {};
    const walkOptions = {
      onPath(walkedPath) {
        const layer2 = opts.byLayers ? walkedPath.layer ?? "" : "";
        if (!pointGraphsByLayer[layer2]) {
          pointGraphsByLayer[layer2] = new PointGraph();
        }
        const pointGraph = pointGraphsByLayer[layer2];
        const pathLength2 = pathLength$1(walkedPath.pathContext);
        if (walkedPath.pathContext.type === pathType.Circle || walkedPath.pathContext.type === pathType.Arc && round(ofArcSpan(walkedPath.pathContext) - 360) === 0 || walkedPath.pathContext.type === pathType.BezierSeed && isPointEqual(walkedPath.pathContext.origin, walkedPath.pathContext.end, opts.pointMatchingDistance)) {
          const chain2 = {
            links: [{
              walkedPath,
              reversed: null,
              endPoints: null,
              pathLength: pathLength2
            }],
            endless: true,
            pathLength: pathLength2
          };
          chainsByLayer[layer2] = chainsByLayer[layer2] ?? [];
          chainsByLayer[layer2].push(chain2);
        } else {
          if (pathLength2 < opts.pointMatchingDistance / 5) {
            ignored[layer2] = ignored[layer2] ?? [];
            ignored[layer2].push(walkedPath);
            return;
          }
          const endPoints = fromPathEnds(walkedPath.pathContext, walkedPath.offset);
          for (let i = 0; i < 2; i += 1) {
            const link = {
              walkedPath,
              endPoints,
              reversed: i !== 0,
              pathLength: pathLength2
            };
            const valueId = pointGraph.insertValue(link);
            pointGraph.insertValueIdAtPoint(valueId, endPoints[i]);
          }
        }
      }
    };
    if (opts.shallow) {
      walkOptions.beforeChildWalk = function() {
        return false;
      };
    }
    let beziers;
    if (opts.unifyBeziers) {
      beziers = getBezierModels(modelContext);
      swapBezierPathsWithSeeds(beziers, true, opts.pointMatchingDistance);
    }
    walk(modelContext, walkOptions);
    for (const layer2 of Object.keys(pointGraphsByLayer)) {
      const pointGraph = pointGraphsByLayer[layer2];
      pointGraph.mergeNearestSinglePoints(opts.pointMatchingDistance);
      const loose = [];
      chainsByLayer[layer2] = chainsByLayer[layer2] ?? [];
      followLinks(
        pointGraph,
        function(chain2, checkEndless) {
          if (checkEndless) {
            chain2.endless = isPointEqual(linkEndpoint(chain2.links[0], true), linkEndpoint(chain2.links[chain2.links.length - 1], false), opts.pointMatchingDistance);
          } else {
            chain2.endless = !!chain2.endless;
          }
          chainsByLayer[layer2].push(chain2);
        },
        function(walkedPath) {
          loose.push(walkedPath);
        }
      );
      chainsByLayer[layer2].sort((a, b) => b.pathLength - a.pathLength);
      if (opts.contain) {
        const containChainsOptions = isObject(opts.contain) ? opts.contain : { alternateDirection: false };
        const containedChains = getContainment(chainsByLayer[layer2], containChainsOptions);
        chainsByLayer[layer2] = containedChains;
      }
      callback?.(chainsByLayer[layer2], loose, layer2, ignored[layer2]);
    }
    if (beziers) {
      swapBezierPathsWithSeeds(beziers, false, opts.pointMatchingDistance);
    }
    if (opts.byLayers) {
      return chainsByLayer;
    } else {
      return chainsByLayer[""];
    }
  }
  function getContainment(allChains, opts) {
    allChains.map((c) => toNewModel(c));
    const parents = [];
    allChains.forEach((chainContext, i1) => {
      if (!chainContext.endless) return;
      const wp = chainContext.links[0].walkedPath;
      clone$1(wp.pathContext, wp.offset);
      allChains.forEach((otherChain, i2) => {
        if (chainContext === otherChain) return;
        if (!otherChain.endless) return;
      });
    });
    const result = [];
    allChains.forEach((chainContext, i) => {
      const parent = parents[i];
      if (!parent) {
        result.push(chainContext);
      } else {
        if (!parent.contains) {
          parent.contains = [];
        }
        parent.contains.push(chainContext);
      }
    });
    if (opts.alternateDirection) {
      const alternate = (chains, shouldBeClockwise) => {
        chains.forEach((chainContext) => {
          if (chainContext.contains) {
            alternate(chainContext.contains);
          }
        });
      };
      alternate(result);
    }
    return result;
  }
  function getBezierModels(modelContext) {
    const beziers = [];
    const options = {
      beforeChildWalk: (walkedModel) => {
        return true;
      }
    };
    ({
      layer: modelContext.layer,
      offset: modelContext.origin
    });
    walk(modelContext, options);
    return beziers;
  }
  function swapBezierPathsWithSeeds(beziers, swap, pointMatchingDistance) {
    beziers.forEach((wm) => {
    });
  }
  function cycle(chainContext, amount = 1) {
    if (!chainContext.endless) return;
    const n = Math.abs(amount);
    const { links } = chainContext;
    if (links.length === 0) {
      return chainContext;
    }
    for (let i = 0; i < n; i += 1) {
      if (amount < 0) {
        const moved = links.shift();
        if (moved) {
          links.push(moved);
        }
      } else {
        const moved = links.pop();
        if (moved) {
          links.unshift(moved);
        }
      }
    }
    return chainContext;
  }
  function reverse(chainContext) {
    chainContext.links.reverse();
    chainContext.links.forEach((link) => {
      link.reversed = !link.reversed;
    });
    return chainContext;
  }
  function startAt(chainContext, routeKey) {
    if (!chainContext.endless) return;
    let index = -1;
    for (let i = 0; i < chainContext.links.length; i++) {
      if (chainContext.links[i].walkedPath.routeKey === routeKey) {
        index = i;
        break;
      }
    }
    if (index > 0) {
      cycle(chainContext, index);
    }
    return chainContext;
  }
  function toNewModel(chainContext, detachFromOldModel = false) {
    const result = { paths: {} };
    for (const link of chainContext.links) {
      const wp = link.walkedPath;
      if (wp.pathContext.type === pathType.BezierSeed) {
        if (detachFromOldModel) {
          delete wp.modelContext.paths[wp.pathId];
        }
        if (!result.models) {
          result.models = {};
        }
      } else {
        let newPath;
        if (detachFromOldModel) {
          newPath = wp.pathContext;
          delete wp.modelContext.paths[wp.pathId];
        } else {
          newPath = clone$1(wp.pathContext);
        }
        const pathId = getSimilarPathId(result, wp.pathId);
        result.paths[pathId] = moveRelative(newPath, wp.offset);
      }
    }
    return result;
  }
  function removeDuplicateEnds(endless, points) {
    if (!endless || points.length < 2) return;
    if (isPointEqual(points[0], points[points.length - 1], 1e-5)) {
      points.pop();
    }
  }
  function toPoints$1(chainContext, distanceOrDistances, maxPoints) {
    const result = [];
    let di = 0;
    let t = 0;
    let distanceArray;
    if (Array.isArray(distanceOrDistances)) {
      distanceArray = distanceOrDistances;
    }
    for (const link of chainContext.links) {
      const wp = link.walkedPath;
      const len = link.pathLength;
      while (round(len - t) > 0) {
        let r = t / len;
        if (link.reversed) {
          r = 1 - r;
        }
        result.push(add(middle(wp.pathContext, r), wp.offset));
        if (maxPoints && result.length >= maxPoints) return result;
        let distance;
        if (distanceArray) {
          distance = distanceArray[di];
          di++;
          if (di > distanceArray.length) {
            return result;
          }
        } else {
          distance = distanceOrDistances;
        }
        t += distance;
      }
      t -= len;
    }
    removeDuplicateEnds(chainContext.endless, result);
    return result;
  }
  function toKeyPoints$1(chainContext, maxArcFacet) {
    const result = [];
    for (let i = 0; i < chainContext.links.length; i++) {
      const link = chainContext.links[i];
      const wp = link.walkedPath;
      const keyPoints = toKeyPoints(wp.pathContext, maxArcFacet);
      if (keyPoints.length > 0) {
        if (link.reversed) {
          keyPoints.reverse();
        }
        if (i > 0) {
          keyPoints.shift();
        }
        const offsetPathPoints = keyPoints.map((p) => add(p, wp.offset));
        result.push.apply(result, offsetPathPoints);
      }
    }
    removeDuplicateEnds(chainContext.endless, result);
    return result;
  }
  const chain$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    cycle,
    findChains: findChains$1,
    findSingleChain: findSingleChain$1,
    reverse,
    startAt,
    toKeyPoints: toKeyPoints$1,
    toNewModel,
    toPoints: toPoints$1
  }, Symbol.toStringTag, { value: "Module" }));
  function getScratch(seed) {
    const points = [seed.origin];
    points.push(...seed.controls);
    points.push(seed.end);
    const bezierJsPoints = points.map(function(p) {
      const bp = {
        x: p[0],
        y: p[1]
      };
      return bp;
    });
    return new bezierJs.Bezier(bezierJsPoints);
  }
  function BezierToSeed(b, range) {
    const points = b.points.map(getIPoint);
    const seed = new BezierSeed(points);
    return seed;
  }
  function seedToBezier(seed) {
    const coords = [];
    coords.push(seed.origin[0], seed.origin[1]);
    coords.push(seed.controls[0][0], seed.controls[0][1]);
    if (seed.controls.length > 1) {
      coords.push(seed.controls[1][0], seed.controls[1][1]);
    }
    coords.push(seed.end[0], seed.end[1]);
    return new bezierJs.Bezier(coords);
  }
  function getExtrema(b) {
    const extrema = b.extrema().values.map((m) => round(m)).filter((value2, index, self) => self.indexOf(value2) === index).sort();
    if (extrema.length === 0) return [0, 1];
    if (extrema[0] !== 0) {
      extrema.unshift(0);
    }
    if (extrema[extrema.length - 1] !== 1) {
      extrema.push(1);
    }
    return extrema;
  }
  function getIPoint(p) {
    return [p.x, p.y];
  }
  class TPoint {
    constructor(b, t, offset) {
      this.t = t;
      this.point = add(getIPoint(b.get(t)), offset);
    }
  }
  function getError(b, startT, endT, arc, arcReversed) {
    const tSpan = endT - startT;
    function m(ratio) {
      const t = startT + tSpan * ratio;
      const bp = getIPoint(b.get(t));
      const ap = middle(arc, arcReversed ? 1 - ratio : ratio);
      return pointDistance(ap, bp);
    }
    return m(0.25) + m(0.75);
  }
  function getLargestArc(b, startT, endT, accuracy) {
    let arc;
    let lastGoodArc;
    const start = new TPoint(b, startT);
    const end = new TPoint(b, endT);
    let upper = end;
    let lower = start;
    let count = 0;
    let test = upper;
    let reversed;
    while (count < 100) {
      const middle2 = getIPoint(b.get((start.t + test.t) / 2));
      try {
        arc = new Arc(start.point, middle2, test.point);
      } catch (e) {
        if (lastGoodArc) {
          return lastGoodArc;
        } else {
          break;
        }
      }
      if (reversed === void 0) {
        reversed = isPointEqual(start.point, fromAngleOnCircle(arc.endAngle, arc));
      }
      const error = getError(b, startT, test.t, arc, reversed);
      if (error <= accuracy) {
        arc.bezierData = {
          startT,
          endT: test.t
        };
        lower = test;
        lastGoodArc = arc;
      } else {
        upper = test;
      }
      if (lower.t === upper.t || lastGoodArc && lastGoodArc !== arc && ofArcSpan(arc) - ofArcSpan(lastGoodArc) < 0.5) {
        return lastGoodArc;
      }
      count++;
      test = new TPoint(b, (lower.t + upper.t) / 2);
    }
    const line = new Line(start.point, test.point);
    line.bezierData = {
      startT,
      endT: test.t
    };
    return line;
  }
  function getArcs(bc, b, accuracy, startT, endT, base2) {
    let added = 0;
    let arc;
    while (startT < endT) {
      arc = getLargestArc(b, startT, endT, accuracy);
      startT = arc.bezierData.endT;
      const len = pathLength(arc);
      if (len < 1e-4) {
        continue;
      }
      bc.paths[arc.type + "_" + (base2 + added)] = arc;
      added++;
    }
    return added;
  }
  function getActualBezierRange(curve, arc, endpoints, offset, pointMatchingDistance) {
    const b = getScratch(curve.seed);
    const tPoints = [arc.bezierData.startT, arc.bezierData.endT].map((t) => new TPoint(b, t, offset));
    const ends = endpoints.slice();
    const endpointDistancetoStart = ends.map((e) => pointDistance(e, tPoints[0].point));
    if (endpointDistancetoStart[0] > endpointDistancetoStart[1]) ends.reverse();
    for (let i = 2; i--; ) {
      if (!isPointEqual(ends[i], tPoints[i].point, pointMatchingDistance)) {
        return null;
      }
    }
    return arc.bezierData;
  }
  function getChainBezierRange(curve, c, layer2, addToLayer, pointMatchingDistance) {
    const endLinks = [c.links[0], c.links[c.links.length - 1]];
    if (endLinks[0].walkedPath.pathContext.bezierData.startT > endLinks[1].walkedPath.pathContext.bezierData.startT) {
      reverse(c);
      endLinks.reverse();
    }
    const actualBezierRanges = endLinks.map(
      (endLink) => getActualBezierRange(
        curve,
        endLink.walkedPath.pathContext,
        endLink.endPoints,
        endLink.walkedPath.offset,
        pointMatchingDistance
      )
    );
    const result = {
      startT: actualBezierRanges[0] ? actualBezierRanges[0].startT : null,
      endT: actualBezierRanges[1] ? actualBezierRanges[1].endT : null
    };
    if (result.startT !== null && result.endT !== null) {
      return result;
    } else if (c.links.length > 2) {
      if (result.startT === null) {
        addToLayer(c.links[0].walkedPath.pathContext, layer2, true);
        result.startT = c.links[1].walkedPath.pathContext.bezierData.startT;
      }
      if (result.endT === null) {
        addToLayer(c.links[c.links.length - 1].walkedPath.pathContext, layer2, true);
        result.endT = c.links[c.links.length - 2].walkedPath.pathContext.bezierData.endT;
      }
      return result;
    }
    return null;
  }
  class BezierSeed {
    constructor(...args) {
      this.type = pathType.BezierSeed;
      switch (args.length) {
        case 1:
          const points = args[0];
          this.origin = points[0];
          if (points.length === 3) {
            this.controls = [points[1]];
            this.end = points[2];
          } else if (points.length === 4) {
            this.controls = [points[1], points[2]];
            this.end = points[3];
          } else {
            this.end = points[1];
          }
          break;
        case 3:
          if (Array.isArray(args[1])) {
            this.controls = args[1];
          } else {
            this.controls = [args[1]];
          }
          this.end = args[2];
          break;
        case 4:
          this.controls = [args[1], args[2]];
          this.end = args[3];
          break;
      }
    }
  }
  const _BezierCurve = class _BezierCurve {
    constructor(...args) {
      this.type = _BezierCurve.typeName;
      const isArrayArg0 = Array.isArray(args[0]);
      switch (args.length) {
        case 2:
          if (isArrayArg0) {
            this.accuracy = args[1];
          } else {
            this.seed = args[0];
            this.accuracy = args[1];
            break;
          }
        // fall through to point array
        case 1:
          if (isArrayArg0) {
            const points = args[0];
            this.seed = new BezierSeed(points);
          } else {
            this.seed = args[0];
          }
          break;
        default:
          switch (args.length) {
            case 4:
              if (isPoint(args[3])) {
                this.seed = new BezierSeed(args);
                break;
              } else {
                this.accuracy = args[3];
              }
            case 3:
              if (isArrayArg0) {
                this.seed = new BezierSeed(args.slice(0, 3));
              }
              break;
            case 5:
              this.accuracy = args[4];
              this.seed = new BezierSeed(args.slice(0, 4));
              break;
          }
          break;
      }
      this.paths = {};
      if (isBezierSeedLinear(this.seed)) {
        const line = new Line(clone(this.seed.origin), clone(this.seed.end));
        line.bezierData = {
          startT: 0,
          endT: 1
        };
        this.paths = {
          "0": line
        };
        return;
      }
      const b = seedToBezier(this.seed);
      const extrema = getExtrema(b);
      this.paths = {};
      if (!this.accuracy) {
        const len = b.length();
        this.accuracy = len / 100;
      }
      let count = 0;
      for (let i = 1; i < extrema.length; i++) {
        const extremaSpan = extrema[i] - extrema[i - 1];
        count += getArcs(this, b, this.accuracy * extremaSpan, extrema[i - 1], extrema[i], count);
      }
    }
    static getBezierSeeds(curve, options = {}) {
      options.shallow = true;
      options.unifyBeziers = false;
      const seedsByLayer = {};
      const addToLayer = (pathToAdd, layer2, clone2 = false) => {
        if (!seedsByLayer[layer2]) {
          seedsByLayer[layer2] = [];
        }
        seedsByLayer[layer2].push(clone2 ? clone$1(pathToAdd) : pathToAdd);
      };
      findChains$1(
        curve,
        function(chains, loose, layer2) {
          chains.forEach((c) => {
            const range = getChainBezierRange(curve, c, layer2, addToLayer, options.pointMatchingDistance);
            if (range) {
              const b = getScratch(curve.seed);
              const piece = b.split(range.startT, range.endT);
              addToLayer(BezierToSeed(piece), layer2);
            } else {
              c.links.forEach((link) => addToLayer(link.walkedPath.pathContext, layer2, true));
            }
          });
          loose.forEach((wp) => {
            if (wp.pathContext.type === pathType.Line) {
              return addToLayer(wp.pathContext, layer2, true);
            }
            const range = getActualBezierRange(
              curve,
              wp.pathContext,
              fromPathEnds(wp.pathContext),
              wp.offset,
              options.pointMatchingDistance
            );
            if (range) {
              const b = getScratch(curve.seed);
              const piece = b.split(range.startT, range.endT);
              addToLayer(BezierToSeed(piece), layer2);
            } else {
              addToLayer(wp.pathContext, layer2, true);
            }
          });
        },
        options
      );
      if (options.byLayers) {
        return seedsByLayer;
      } else {
        return seedsByLayer[""];
      }
    }
    static computeLength(seed) {
      const b = seedToBezier(seed);
      return b.length();
    }
    static computePoint(seed, t) {
      const s = getScratch(seed);
      const computedPoint = s.compute(t);
      return getIPoint(computedPoint);
    }
  };
  _BezierCurve.typeName = "BezierCurve";
  let BezierCurve = _BezierCurve;
  BezierCurve.metaParameters = [
    {
      title: "points",
      type: "select",
      value: [
        [
          [100, 0],
          [-80, -60],
          [100, 220],
          [100, 60]
        ],
        [
          [0, 0],
          [100, 0],
          [100, 100]
        ],
        [
          [0, 0],
          [20, 0],
          [80, 100],
          [100, 100]
        ]
      ]
    }
  ];
  function findChains(modelContext, callbackOrOptions, maybeOptions) {
    if (typeof callbackOrOptions === "function") {
      return findChains$1(modelContext, callbackOrOptions, maybeOptions);
    }
    return findChains$1(modelContext, callbackOrOptions);
  }
  function findSingleChain(modelContext) {
    return findSingleChain$1(modelContext);
  }
  function addCaption(modelContext, text, leftAnchorPoint, rightAnchorPoint) {
    if (!leftAnchorPoint) {
      leftAnchorPoint = zero();
    }
    if (!rightAnchorPoint) {
      rightAnchorPoint = clone(leftAnchorPoint);
    }
    modelContext.caption = { text, anchor: new Line(leftAnchorPoint, rightAnchorPoint) };
    return modelContext;
  }
  function addPath(modelContext, pathContext, pathId, overWrite = false) {
    const id = overWrite ? pathId : getSimilarPathId(modelContext, pathId);
    modelContext.paths = modelContext.paths || {};
    modelContext.paths[id] = pathContext;
    return modelContext;
  }
  function addModel(parentModel, childModel, childModelId, overWrite = false) {
    const id = overWrite ? childModelId : getSimilarModelId(parentModel, childModelId);
    parentModel.models = parentModel.models || {};
    parentModel.models[id] = childModel;
    return parentModel;
  }
  function addTo$1(childModel, parentModel, childModelId, overWrite = false) {
    addModel(parentModel, childModel, childModelId, overWrite);
    return childModel;
  }
  function clone$2(modelToClone) {
    return cloneObject(modelToClone);
  }
  function countChildModels(modelContext) {
    let count = 0;
    if (modelContext.models) {
      for (const id in modelContext.models) {
        count++;
      }
    }
    return count;
  }
  function getAllCaptionsOffset(modelContext) {
    const captions = [];
    function tryAddCaption(m, offset, layer2) {
      if (m.caption) {
        captions.push({ text: m.caption.text, anchor: clone$1(m.caption.anchor, add(m.origin, offset)), layer: m.caption.anchor.layer || layer2 });
      }
    }
    tryAddCaption(modelContext, modelContext.origin, modelContext.layer);
    walk(modelContext, {
      afterChildWalk: (wm) => tryAddCaption(wm.childModel, wm.offset, wm.layer)
    });
    return captions;
  }
  function getSimilarId(map2, id) {
    if (!map2) return id;
    let i = 0;
    let newId = id;
    while (newId in map2) {
      i++;
      newId = [id, i].join("_");
    }
    return newId;
  }
  function getSimilarModelId(modelContext, modelId) {
    return getSimilarId(modelContext.models, modelId);
  }
  function getSimilarPathId(modelContext, pathId) {
    return getSimilarId(modelContext.paths, pathId);
  }
  function layer$1(modelContext, layer2) {
    modelContext.layer = layer2;
    return modelContext;
  }
  function originate(modelToOriginate, origin) {
    function innerOriginate(m, o) {
      if (!m) return;
      const newOrigin = add(m.origin, o);
      if (m.type === BezierCurve.typeName) {
        moveRelative(m.seed, newOrigin);
      }
      if (m.paths) {
        for (let id in m.paths) {
          moveRelative(m.paths[id], newOrigin);
        }
      }
      if (m.models) {
        for (let id in m.models) {
          innerOriginate(m.models[id], newOrigin);
        }
      }
      if (m.caption) {
        moveRelative(m.caption.anchor, newOrigin);
      }
      m.origin = zero();
    }
    innerOriginate(modelToOriginate, origin ? subtract([0, 0], origin) : [0, 0]);
    if (origin) {
      modelToOriginate.origin = origin;
    }
    return modelToOriginate;
  }
  function center$1(modelToCenter, centerX = true, centerY = true) {
    const m = modelExtents$1(modelToCenter);
    const o = modelToCenter.origin || [0, 0];
    if (centerX) o[0] -= m.center[0];
    if (centerY) o[1] -= m.center[1];
    modelToCenter.origin = o;
    return modelToCenter;
  }
  function mirror$2(modelToMirror, mirrorX, mirrorY) {
    let newModel = {};
    if (!modelToMirror) return null;
    if (modelToMirror.origin) {
      newModel.origin = mirror(modelToMirror.origin, mirrorX, mirrorY);
    }
    if (modelToMirror.type) {
      newModel.type = modelToMirror.type;
    }
    if ("layer" in modelToMirror) {
      newModel.layer = modelToMirror.layer;
    }
    if (modelToMirror.units) {
      newModel.units = modelToMirror.units;
    }
    if (modelToMirror.type === BezierCurve.typeName) {
      newModel.type = BezierCurve.typeName;
      newModel.seed = mirror$1(modelToMirror.seed, mirrorX, mirrorY);
    }
    if (modelToMirror.paths) {
      newModel.paths = {};
      for (let id in modelToMirror.paths) {
        const pathToMirror = modelToMirror.paths[id];
        if (!pathToMirror) continue;
        const pathMirrored = mirror$1(pathToMirror, mirrorX, mirrorY);
        if (!pathMirrored) continue;
        newModel.paths[id] = pathMirrored;
      }
    }
    if (modelToMirror.models) {
      newModel.models = {};
      for (let id in modelToMirror.models) {
        const childModelToMirror = modelToMirror.models[id];
        if (!childModelToMirror) continue;
        const childModelMirrored = mirror$2(childModelToMirror, mirrorX, mirrorY);
        if (!childModelMirrored) continue;
        newModel.models[id] = childModelMirrored;
      }
    }
    if (modelToMirror.caption) {
      newModel.caption = cloneObject(modelToMirror.caption);
      newModel.caption.anchor = mirror$1(modelToMirror.caption.anchor, mirrorX, mirrorY);
    }
    return newModel;
  }
  function move$1(modelToMove, origin) {
    modelToMove.origin = clone(origin);
    return modelToMove;
  }
  function moveRelative$1(modelToMove, delta) {
    if (modelToMove) {
      modelToMove.origin = add(modelToMove.origin || zero(), delta);
    }
    return modelToMove;
  }
  function prefixPathIds(modelToPrefix, prefix) {
    let walkedPaths = [];
    walk(modelToPrefix, {
      onPath: function(walkedPath) {
        walkedPaths.push(walkedPath);
      }
    });
    for (let i = 0; i < walkedPaths.length; i++) {
      const walkedPath = walkedPaths[i];
      delete walkedPath.modelContext.paths[walkedPath.pathId];
      walkedPath.modelContext.paths[prefix + walkedPath.pathId] = walkedPath.pathContext;
    }
    return modelToPrefix;
  }
  function rotate$2(modelToRotate, angleInDegrees, rotationOrigin = [0, 0]) {
    if (!modelToRotate || !angleInDegrees) return modelToRotate;
    const offsetOrigin = subtract(rotationOrigin, modelToRotate.origin);
    if (modelToRotate.type === BezierCurve.typeName) {
      rotate$1(modelToRotate.seed, angleInDegrees, offsetOrigin);
    }
    if (modelToRotate.paths) {
      for (let id in modelToRotate.paths) {
        rotate$1(modelToRotate.paths[id], angleInDegrees, offsetOrigin);
      }
    }
    if (modelToRotate.models) {
      for (let id in modelToRotate.models) {
        rotate$2(modelToRotate.models[id], angleInDegrees, offsetOrigin);
      }
    }
    if (modelToRotate.caption) {
      rotate$1(modelToRotate.caption.anchor, angleInDegrees, offsetOrigin);
    }
    return modelToRotate;
  }
  function scale$2(modelToScale, scaleValue, scaleOrigin = false) {
    if (scaleOrigin && modelToScale.origin) {
      modelToScale.origin = scale(modelToScale.origin, scaleValue);
    }
    if (modelToScale.type === BezierCurve.typeName) {
      scale$1(modelToScale.seed, scaleValue);
    }
    if (modelToScale.paths) {
      for (let id in modelToScale.paths) {
        scale$1(modelToScale.paths[id], scaleValue);
      }
    }
    if (modelToScale.models) {
      for (let id in modelToScale.models) {
        scale$2(modelToScale.models[id], scaleValue, true);
      }
    }
    if (modelToScale.caption) {
      scale$1(modelToScale.caption.anchor, scaleValue);
    }
    return modelToScale;
  }
  function addDistortedPath(parentModel, pathToDistort, pathId, layer2, scaleX, scaleY, bezierAccuracy) {
    const distortedPath = distort$1(pathToDistort, scaleX, scaleY);
    layer2 = layer2 || pathToDistort.layer;
    if (layer2) {
      distortedPath.layer = layer2;
    }
    if (isPath(distortedPath)) {
      if (distortedPath.type === pathType.BezierSeed) {
        const curve = new BezierCurve(distortedPath, bezierAccuracy);
        addModel(parentModel, curve, pathId);
      } else {
        addPath(parentModel, distortedPath, pathId);
      }
    } else {
      addModel(parentModel, distortedPath, pathId);
    }
  }
  function distort$2(modelToDistort, scaleX, scaleY, scaleOrigin = false, bezierAccuracy) {
    const distorted = {};
    if (modelToDistort.layer) {
      distorted.layer = modelToDistort.layer;
    }
    if (scaleOrigin && modelToDistort.origin) {
      distorted.origin = distort(modelToDistort.origin, scaleX, scaleY);
    }
    if (modelToDistort.type === BezierCurve.typeName) {
      const b = modelToDistort;
      const bezierPartsByLayer = BezierCurve.getBezierSeeds(b, { byLayers: true, pointMatchingDistance: bezierAccuracy });
      for (let layer2 in bezierPartsByLayer) {
        let pathArray = bezierPartsByLayer[layer2];
        pathArray.forEach((p, i) => {
          addDistortedPath(distorted, p, i.toString(), layer2, scaleX, scaleY, bezierAccuracy);
        });
      }
    } else if (modelToDistort.paths) {
      for (let pathId in modelToDistort.paths) {
        let pathToDistort = modelToDistort.paths[pathId];
        addDistortedPath(distorted, pathToDistort, pathId, null, scaleX, scaleY, bezierAccuracy);
      }
    }
    if (modelToDistort.models) {
      for (let childId in modelToDistort.models) {
        let childModel = modelToDistort.models[childId];
        let distortedChild = distort$2(childModel, scaleX, scaleY, true, bezierAccuracy);
        addModel(distorted, distortedChild, childId);
      }
    }
    if (modelToDistort.caption) {
      distorted.caption = cloneObject(modelToDistort.caption);
      distorted.caption.anchor = distort$1(modelToDistort.caption.anchor, scaleX, scaleY);
    }
    return distorted;
  }
  function convertUnits(modeltoConvert, destUnitType) {
    if (modeltoConvert.units && isValidUnit(modeltoConvert.units) && isValidUnit(destUnitType)) {
      const ratio = conversionScale(modeltoConvert.units, destUnitType);
      if (ratio != 1) {
        scale$2(modeltoConvert, ratio);
        modeltoConvert.units = destUnitType;
      }
    }
    return modeltoConvert;
  }
  function walkPaths(modelContext, callback) {
    if (modelContext.paths) {
      for (let pathId in modelContext.paths) {
        if (!modelContext.paths[pathId]) continue;
        callback(modelContext, pathId, modelContext.paths[pathId]);
      }
    }
    if (modelContext.models) {
      for (let id in modelContext.models) {
        if (!modelContext.models[id]) continue;
        walkPaths(modelContext.models[id], callback);
      }
    }
  }
  function walk(modelContext, options) {
    if (!modelContext) return;
    function walkRecursive(modelContext2, layer2, offset, route, routeKey) {
      const newOffset = add(modelContext2.origin, offset);
      layer2 = layer2 != void 0 ? layer2 : "";
      if (modelContext2.paths) {
        for (let pathId in modelContext2.paths) {
          const pathContext = modelContext2.paths[pathId];
          if (!pathContext) continue;
          let walkedPath = {
            modelContext: modelContext2,
            layer: pathContext.layer != void 0 ? pathContext.layer : layer2,
            offset: newOffset,
            pathContext,
            pathId,
            route: route.concat(["paths", pathId]),
            routeKey: routeKey + (routeKey ? "." : "") + "paths" + JSON.stringify([pathId])
          };
          if (options.onPath) options.onPath(walkedPath);
        }
      }
      if (modelContext2.models) {
        for (let modelId in modelContext2.models) {
          const childModel = modelContext2.models[modelId];
          if (!childModel) continue;
          let walkedModel = {
            parentModel: modelContext2,
            layer: childModel.layer != void 0 ? childModel.layer : layer2,
            offset: newOffset,
            route: route.concat(["models", modelId]),
            routeKey: routeKey + (routeKey ? "." : "") + "models" + JSON.stringify([modelId]),
            childId: modelId,
            childModel
          };
          if (options.beforeChildWalk) {
            if (!options.beforeChildWalk(walkedModel)) continue;
          }
          walkRecursive(walkedModel.childModel, walkedModel.layer, newOffset, walkedModel.route, walkedModel.routeKey);
          if (options.afterChildWalk) {
            options.afterChildWalk(walkedModel);
          }
        }
      }
    }
    walkRecursive(modelContext, modelContext.layer, [0, 0], [], "");
    return modelContext;
  }
  function zero$2(modelToZero, zeroX = true, zeroY = true) {
    const m = modelExtents$1(modelToZero);
    const z = modelToZero.origin || [0, 0];
    if (zeroX) z[0] -= m.low[0];
    if (zeroY) z[1] -= m.low[1];
    modelToZero.origin = z;
    return modelToZero;
  }
  const _model = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    addCaption,
    addModel,
    addPath,
    addTo: addTo$1,
    center: center$1,
    clone: clone$2,
    convertUnits,
    countChildModels,
    distort: distort$2,
    findChains,
    findSingleChain,
    getAllCaptionsOffset,
    getSimilarModelId,
    getSimilarPathId,
    layer: layer$1,
    mirror: mirror$2,
    move: move$1,
    moveRelative: moveRelative$1,
    originate,
    prefixPathIds,
    rotate: rotate$2,
    scale: scale$2,
    walk,
    walkPaths,
    zero: zero$2
  }, Symbol.toStringTag, { value: "Module" }));
  function addTo(childPath, parentModel, pathId, overwrite = false) {
    addPath(parentModel, childPath, pathId, overwrite);
    return childPath;
  }
  function copyLayer(pathA, pathB) {
    if (pathA && pathB && typeof pathA.layer !== "undefined") {
      pathB.layer = pathA.layer;
    }
    if (pathA && pathB && "bezierData" in pathA) {
      pathB.bezierData = pathA.bezierData;
    }
  }
  const copyPropsMap = {};
  copyPropsMap[pathType.Circle] = (srcCircle, destCircle, offset) => {
    destCircle.radius = srcCircle.radius;
  };
  copyPropsMap[pathType.Arc] = (srcArc, destArc, offset) => {
    copyPropsMap[pathType.Circle](srcArc, destArc, offset);
    destArc.startAngle = srcArc.startAngle;
    destArc.endAngle = srcArc.endAngle;
  };
  copyPropsMap[pathType.Line] = (srcLine, destLine, offset) => {
    destLine.end = add(srcLine.end, offset);
  };
  copyPropsMap[pathType.BezierSeed] = (srcSeed, destSeed, offset) => {
    copyPropsMap[pathType.Line](srcSeed, destSeed, offset);
    destSeed.controls = srcSeed.controls.map((p) => add(p, offset));
  };
  function clone$1(pathToClone, offset) {
    const result = { type: pathToClone.type, origin: add(pathToClone.origin, offset) };
    const fn = copyPropsMap[pathToClone.type];
    if (fn) {
      fn(pathToClone, result, offset);
    }
    copyLayer(pathToClone, result);
    return result;
  }
  function copyProps(srcPath, destPath) {
    const fn = copyPropsMap[srcPath.type];
    if (fn) {
      destPath.origin = clone(srcPath.origin);
      fn(srcPath, destPath);
    }
    copyLayer(srcPath, destPath);
    return srcPath;
  }
  const mirrorMap = {};
  mirrorMap[pathType.Line] = (line, origin, mirrorX, mirrorY) => {
    return new Line(origin, mirror(line.end, mirrorX, mirrorY));
  };
  mirrorMap[pathType.Circle] = (circle, origin, mirrorX, mirrorY) => {
    return new Circle(origin, circle.radius);
  };
  mirrorMap[pathType.Arc] = (arc, origin, mirrorX, mirrorY) => {
    const startAngle = mirror$3(arc.startAngle, mirrorX, mirrorY);
    const endAngle = mirror$3(ofArcEnd(arc), mirrorX, mirrorY);
    const xor = mirrorX != mirrorY;
    return new Arc(origin, arc.radius, xor ? endAngle : startAngle, xor ? startAngle : endAngle);
  };
  mirrorMap[pathType.BezierSeed] = (seed, origin, mirrorX, mirrorY) => {
    const mirrored = mirrorMap[pathType.Line](seed, origin, mirrorX, mirrorY);
    mirrored.type = pathType.BezierSeed;
    mirrored.controls = seed.controls.map((c) => mirror(c, mirrorX, mirrorY));
    return mirrored;
  };
  function layer(pathContext, layer2) {
    pathContext.layer = layer2;
    return pathContext;
  }
  function mirror$1(pathToMirror, mirrorX, mirrorY) {
    let newPath = null;
    if (pathToMirror) {
      const origin = mirror(pathToMirror.origin, mirrorX, mirrorY);
      const fn = mirrorMap[pathToMirror.type];
      if (fn) {
        newPath = fn(pathToMirror, origin, mirrorX, mirrorY);
      }
    }
    copyLayer(pathToMirror, newPath);
    return newPath;
  }
  const moveMap = {};
  moveMap[pathType.Line] = (line, origin) => {
    const delta = subtract(line.end, line.origin);
    line.end = add(origin, delta);
  };
  function move(pathToMove, origin) {
    if (pathToMove) {
      const fn = moveMap[pathToMove.type];
      if (fn) {
        fn(pathToMove, origin);
      }
      pathToMove.origin = origin;
    }
    return pathToMove;
  }
  const moveRelativeMap = {};
  moveRelativeMap[pathType.Line] = (line, delta, subtract2) => {
    line.end = add(line.end, delta, subtract2);
  };
  moveRelativeMap[pathType.BezierSeed] = (seed, delta, subtract2) => {
    moveRelativeMap[pathType.Line](seed, delta, subtract2);
    seed.controls = seed.controls.map((c) => add(c, delta, subtract2));
  };
  function moveRelative(pathToMove, delta, subtract2) {
    if (pathToMove && delta) {
      pathToMove.origin = add(pathToMove.origin, delta, subtract2);
      const fn = moveRelativeMap[pathToMove.type];
      if (fn) {
        fn(pathToMove, delta, subtract2);
      }
    }
    return pathToMove;
  }
  function moveTemporary(pathsToMove, deltas, task) {
    let subtract2 = false;
    const moveFunc = (pathToOffset, i) => {
      if (deltas[i]) {
        moveRelative(pathToOffset, deltas[i], subtract2);
      }
    };
    pathsToMove.map(moveFunc);
    task();
    subtract2 = true;
    pathsToMove.map(moveFunc);
  }
  const rotateMap = {};
  rotateMap[pathType.Line] = (line, angleInDegrees, rotationOrigin) => {
    line.end = rotate(line.end, angleInDegrees, rotationOrigin);
  };
  rotateMap[pathType.Arc] = (arc, angleInDegrees, rotationOrigin) => {
    arc.startAngle = noRevolutions(arc.startAngle + angleInDegrees);
    arc.endAngle = noRevolutions(arc.endAngle + angleInDegrees);
  };
  rotateMap[pathType.BezierSeed] = (seed, angleInDegrees, rotationOrigin) => {
    rotateMap[pathType.Line](seed, angleInDegrees, rotationOrigin);
    seed.controls = seed.controls.map((c) => rotate(c, angleInDegrees, rotationOrigin));
  };
  function rotate$1(pathToRotate, angleInDegrees, rotationOrigin = [0, 0]) {
    if (!pathToRotate || !angleInDegrees) return pathToRotate;
    pathToRotate.origin = rotate(pathToRotate.origin, angleInDegrees, rotationOrigin);
    const fn = rotateMap[pathToRotate.type];
    if (fn) {
      fn(pathToRotate, angleInDegrees, rotationOrigin);
    }
    return pathToRotate;
  }
  const scaleMap = {};
  scaleMap[pathType.Line] = (line, scaleValue) => {
    line.end = scale(line.end, scaleValue);
  };
  scaleMap[pathType.BezierSeed] = (seed, scaleValue) => {
    scaleMap[pathType.Line](seed, scaleValue);
    seed.controls = seed.controls.map((c) => scale(c, scaleValue));
  };
  scaleMap[pathType.Circle] = (circle, scaleValue) => {
    circle.radius *= scaleValue;
  };
  scaleMap[pathType.Arc] = scaleMap[pathType.Circle];
  function scale$1(pathToScale, scaleValue) {
    if (!pathToScale || scaleValue === 1 || !scaleValue) return pathToScale;
    pathToScale.origin = scale(pathToScale.origin, scaleValue);
    const fn = scaleMap[pathToScale.type];
    if (fn) {
      fn(pathToScale, scaleValue);
    }
    return pathToScale;
  }
  const distortMap = {};
  distortMap[pathType.Arc] = (arc, scaleX, scaleY) => {
    return new models.EllipticArc(arc, scaleX, scaleY);
  };
  distortMap[pathType.Circle] = (circle, scaleX, scaleY) => {
    const ellipse = new models.Ellipse(circle.radius * scaleX, circle.radius * scaleY);
    ellipse.origin = distort(circle.origin, scaleX, scaleY);
    return ellipse;
  };
  distortMap[pathType.Line] = (line, scaleX, scaleY) => {
    return new Line([line.origin, line.end].map((p) => distort(p, scaleX, scaleY)));
  };
  distortMap[pathType.BezierSeed] = (seed, scaleX, scaleY) => {
    const d = distort;
    return {
      type: pathType.BezierSeed,
      origin: d(seed.origin, scaleX, scaleY),
      controls: seed.controls.map((c) => d(c, scaleX, scaleY)),
      end: d(seed.end, scaleX, scaleY)
    };
  };
  function distort$1(pathToDistort, scaleX, scaleY) {
    if (!pathToDistort || !scaleX || !scaleY) return null;
    const fn = distortMap[pathToDistort.type];
    if (fn) {
      const distorted = fn(pathToDistort, scaleX, scaleY);
      if (typeof pathToDistort.layer !== "undefined") {
        distorted.layer = pathToDistort.layer;
      }
      return distorted;
    }
    return null;
  }
  function converge(lineA, lineB, useOriginA, useOriginB) {
    const p = fromSlopeIntersection(lineA, lineB);
    if (p) {
      const lines = [lineA, lineB];
      const useOrigin = [useOriginA, useOriginB];
      if (arguments.length === 2) {
        lines.forEach((line, i) => {
          useOrigin[i] = closest(p, [line.origin, line.end]) === line.origin;
        });
      }
      const setPoint = (line, useOrigin2) => {
        const setP = useOrigin2 ? line.origin : line.end;
        setP[0] = p[0];
        setP[1] = p[1];
      };
      lines.forEach((line, i) => {
        setPoint(line, useOrigin[i]);
      });
    }
    return p;
  }
  const alterMap = {};
  alterMap[pathType.Arc] = (arc, pathLength2, distance, useOrigin) => {
    const span = ofArcSpan(arc);
    const delta = (pathLength2 + distance) * span / pathLength2 - span;
    if (useOrigin) {
      arc.startAngle -= delta;
    } else {
      arc.endAngle += delta;
    }
  };
  alterMap[pathType.Circle] = (circle, pathLength2, distance, useOrigin) => {
    circle.radius *= (pathLength2 + distance) / pathLength2;
  };
  alterMap[pathType.Line] = (line, pathLength2, distance, useOrigin) => {
    const delta = scale(subtract(line.end, line.origin), distance / pathLength2);
    if (useOrigin) {
      line.origin = subtract(line.origin, delta);
    } else {
      line.end = add(line.end, delta);
    }
  };
  function alterLength(pathToAlter, distance, useOrigin = false) {
    if (!pathToAlter || !distance) return null;
    const fn = alterMap[pathToAlter.type];
    if (fn) {
      const pathLength2 = measure.pathLength(pathToAlter);
      if (!pathLength2 || -distance >= pathLength2) return null;
      fn(pathToAlter, pathLength2, distance, useOrigin);
      return pathToAlter;
    }
    return null;
  }
  function toPoints(pathContext, numberOfPoints) {
    if (numberOfPoints == 1) {
      return [middle(pathContext)];
    }
    const points = [];
    let base2 = numberOfPoints;
    if (pathContext.type != pathType.Circle) base2--;
    for (let i = 0; i < numberOfPoints; i++) {
      points.push(middle(pathContext, i / base2));
    }
    return points;
  }
  const numberOfKeyPointsMap = {};
  numberOfKeyPointsMap[pathType.Line] = (line) => 2;
  numberOfKeyPointsMap[pathType.Circle] = (circle, maxPointDistance) => {
    const len = measure.pathLength(circle);
    if (!len) return 0;
    maxPointDistance = maxPointDistance || len;
    return Math.max(8, Math.ceil(len / (maxPointDistance || len)));
  };
  numberOfKeyPointsMap[pathType.Arc] = (arc, maxPointDistance) => {
    const len = measure.pathLength(arc);
    if (!len) return 0;
    const minPoints = Math.ceil(ofArcSpan(arc) / 45) + 1;
    return Math.max(minPoints, Math.ceil(len / (maxPointDistance || len)));
  };
  function toKeyPoints(pathContext, maxArcFacet) {
    if (pathContext.type == pathType.BezierSeed) {
      const curve = new models.BezierCurve(pathContext);
      let curveKeyPoints;
      findChains(curve, (chains, loose, layer2) => {
        if (chains.length == 1) {
          const c = chains[0];
          switch (c.links[0].walkedPath.pathId) {
            case "arc_0":
            case "line_0":
              break;
            default:
              chain.reverse(c);
          }
          curveKeyPoints = chain.toKeyPoints(c);
        } else if (loose.length === 1) {
          curveKeyPoints = toKeyPoints(loose[0].pathContext);
        }
      });
      return curveKeyPoints;
    } else {
      const fn = numberOfKeyPointsMap[pathContext.type];
      if (fn) {
        const numberOfKeyPoints = fn(pathContext, maxArcFacet);
        if (numberOfKeyPoints) {
          return toPoints(pathContext, numberOfKeyPoints);
        }
      }
    }
    return [];
  }
  function center(pathToCenter) {
    const m = measure.pathExtents(pathToCenter);
    const c = average(m.high, m.low);
    const o = subtract(pathToCenter.origin || [0, 0], c);
    move(pathToCenter, o);
    return pathToCenter;
  }
  function zero$1(pathToZero) {
    const m = measure.pathExtents(pathToZero);
    const z = subtract(pathToZero.origin || [0, 0], m.low);
    move(pathToZero, z);
    return pathToZero;
  }
  const _path = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    addTo,
    alterLength,
    center,
    clone: clone$1,
    converge,
    copyProps,
    distort: distort$1,
    layer,
    mirror: mirror$1,
    move,
    moveRelative,
    moveTemporary,
    rotate: rotate$1,
    scale: scale$1,
    toKeyPoints,
    toPoints,
    zero: zero$1
  }, Symbol.toStringTag, { value: "Module" }));
  const map = {};
  map[pathType.Arc] = {};
  map[pathType.Circle] = {};
  map[pathType.Line] = {};
  map[pathType.Arc][pathType.Arc] = (arc1, arc2, options, swapOffsets) => {
    let result = null;
    moveTemp([arc1, arc2], options, swapOffsets, () => {
      const angles = circleToCircle(arc1, arc2, options);
      if (angles) {
        const arc1Angles = getAnglesWithinArc(angles[0], arc1, options);
        const arc2Angles = getAnglesWithinArc(angles[1], arc2, options);
        if (arc1Angles && arc2Angles) {
          if (arc1Angles.length === 1 || arc2Angles.length === 1) {
            for (let i1 = 0; i1 < arc1Angles.length; i1++) {
              for (let i2 = 0; i2 < arc2Angles.length; i2++) {
                const p1 = fromAngleOnCircle(arc1Angles[i1], arc1);
                const p2 = fromAngleOnCircle(arc2Angles[i2], arc2);
                if (isPointEqual(p1, p2, 1e-4)) {
                  result = {
                    intersectionPoints: [p1],
                    path1Angles: [arc1Angles[i1]],
                    path2Angles: [arc2Angles[i2]]
                  };
                  return;
                }
              }
            }
          } else {
            result = {
              intersectionPoints: pointsFromAnglesOnCircle(arc1Angles, arc1),
              path1Angles: arc1Angles,
              path2Angles: arc2Angles
            };
          }
        }
      } else {
        if (options.out_AreOverlapped) {
          options.out_AreOverlapped = isArcOverlapping(arc1, arc2, options.excludeTangents);
        }
      }
    });
    return result;
  };
  map[pathType.Arc][pathType.Circle] = (arc, circle, options, swapOffsets) => {
    let result = null;
    moveTemp([arc, circle], options, swapOffsets, () => {
      const angles = circleToCircle(arc, circle, options);
      if (angles) {
        const arcAngles = getAnglesWithinArc(angles[0], arc, options);
        if (arcAngles) {
          let circleAngles;
          if (arcAngles.length == 2) {
            circleAngles = angles[1];
          } else {
            const index = findCorrespondingAngleIndex(angles[0], arcAngles[0]);
            circleAngles = [angles[1][index]];
          }
          result = {
            intersectionPoints: pointsFromAnglesOnCircle(arcAngles, arc),
            path1Angles: arcAngles,
            path2Angles: circleAngles
          };
        }
      }
    });
    return result;
  };
  map[pathType.Arc][pathType.Line] = (arc, line, options, swapOffsets) => {
    let result = null;
    moveTemp([arc, line], options, swapOffsets, () => {
      const angles = lineToCircle(line, arc, options);
      if (angles) {
        const arcAngles = getAnglesWithinArc(angles, arc, options);
        if (arcAngles) {
          result = {
            intersectionPoints: pointsFromAnglesOnCircle(arcAngles, arc),
            path1Angles: arcAngles
          };
        }
      }
    });
    return result;
  };
  map[pathType.Circle][pathType.Arc] = (circle, arc, options) => {
    const result = map[pathType.Arc][pathType.Circle](arc, circle, options, true);
    if (result) {
      return swapAngles(result);
    }
    return null;
  };
  map[pathType.Circle][pathType.Circle] = (circle1, circle2, options, swapOffsets) => {
    let result = null;
    moveTemp([circle1, circle2], options, swapOffsets, () => {
      const angles = circleToCircle(circle1, circle2, options);
      if (angles) {
        result = {
          intersectionPoints: pointsFromAnglesOnCircle(angles[0], circle1),
          path1Angles: angles[0],
          path2Angles: angles[1]
        };
      }
    });
    return result;
  };
  map[pathType.Circle][pathType.Line] = (circle, line, options, swapOffsets) => {
    let result = null;
    moveTemp([circle, line], options, swapOffsets, () => {
      const angles = lineToCircle(line, circle, options);
      if (angles) {
        result = {
          intersectionPoints: pointsFromAnglesOnCircle(angles, circle),
          path1Angles: angles
        };
      }
    });
    return result;
  };
  map[pathType.Line][pathType.Arc] = (line, arc, options) => {
    const result = map[pathType.Arc][pathType.Line](arc, line, options, true);
    if (result) {
      return swapAngles(result);
    }
    return null;
  };
  map[pathType.Line][pathType.Circle] = (line, circle, options) => {
    const result = map[pathType.Circle][pathType.Line](circle, line, options, true);
    if (result) {
      return swapAngles(result);
    }
    return null;
  };
  map[pathType.Line][pathType.Line] = (line1, line2, options, swapOffsets) => {
    let result = null;
    moveTemp([line1, line2], options, swapOffsets, () => {
      const intersectionPoint = fromSlopeIntersection(line1, line2, options);
      if (intersectionPoint) {
        if (isBetweenPoints$1(intersectionPoint, line1, options.excludeTangents) && isBetweenPoints$1(intersectionPoint, line2, options.excludeTangents)) {
          result = {
            intersectionPoints: [intersectionPoint]
          };
        }
      }
    });
    return result;
  };
  function moveTemp(pathsToOffset, options, swapOffsets, task) {
    const offsets = swapOffsets ? [options.path2Offset, options.path1Offset] : [options.path1Offset, options.path2Offset];
    moveTemporary(pathsToOffset, offsets, task);
  }
  function swapAngles(result) {
    const temp = result.path1Angles;
    if (result.path2Angles) {
      result.path1Angles = result.path2Angles;
    } else {
      delete result.path1Angles;
    }
    if (temp) {
      result.path2Angles = temp;
    }
    return result;
  }
  function intersection(path1, path2, options = {}) {
    if (path1 && path2) {
      const fn = map[path1.type][path2.type];
      if (fn) {
        return fn(path1, path2, options);
      }
    }
    return null;
  }
  function findCorrespondingAngleIndex(circleAngles, arcAngle) {
    for (let i = 2; i--; ) {
      if (circleAngles[i] === arcAngle) return i;
    }
    return -1;
  }
  function pointsFromAnglesOnCircle(anglesInDegrees, circle) {
    const result = [];
    for (let i = 0; i < anglesInDegrees.length; i++) {
      result.push(fromAngleOnCircle(anglesInDegrees[i], circle));
    }
    return result;
  }
  function getAnglesWithinArc(angles, arc, options) {
    if (!angles) return null;
    const anglesWithinArc = [];
    for (let i = 0; i < angles.length; i++) {
      if (isBetweenArcAngles(angles[i], arc, options.excludeTangents)) {
        anglesWithinArc.push(angles[i]);
      }
    }
    if (anglesWithinArc.length == 0) return null;
    return anglesWithinArc;
  }
  function lineToCircle(line, circle, options) {
    const radius = round(circle.radius);
    if (circle.radius <= 0) {
      return null;
    }
    const clonedLine = new Line(subtract(line.origin, circle.origin), subtract(line.end, circle.origin));
    const lineAngleNormal = ofLineInDegrees(line);
    const lineAngle = lineAngleNormal >= 180 ? lineAngleNormal - 360 : lineAngleNormal;
    rotate$1(clonedLine, -lineAngle, zero());
    const unRotate = (resultAngle) => {
      const unrotated = resultAngle + lineAngle;
      return round(noRevolutions(unrotated));
    };
    const lineY = round(clonedLine.origin[1]);
    const lineYabs = Math.abs(lineY);
    if (lineYabs > radius) {
      return null;
    }
    const anglesOfIntersection = [];
    if (lineYabs == radius) {
      if (options.excludeTangents) {
        return null;
      }
      anglesOfIntersection.push(unRotate(lineY > 0 ? 90 : 270));
    } else {
      const intersectionBetweenEndpoints = (x, angleOfX) => {
        if (isBetween$1(round(x), round(clonedLine.origin[0]), round(clonedLine.end[0]), options.excludeTangents)) {
          anglesOfIntersection.push(unRotate(angleOfX));
        }
      };
      const intersectRadians = Math.asin(lineY / radius);
      const intersectDegrees = toDegrees(intersectRadians);
      const intersectX = Math.cos(intersectRadians) * radius;
      intersectionBetweenEndpoints(-intersectX, 180 - intersectDegrees);
      intersectionBetweenEndpoints(intersectX, intersectDegrees);
    }
    if (anglesOfIntersection.length > 0) {
      return anglesOfIntersection;
    }
    return null;
  }
  function circleToCircle(circle1, circle2, options) {
    if (circle1.radius <= 0 || circle2.radius <= 0) {
      return null;
    }
    if (circle1.radius == circle2.radius && isPointEqual(circle1.origin, circle2.origin, 1e-4)) {
      options.out_AreOverlapped = true;
      return null;
    }
    const c1 = new Circle(zero(), circle1.radius);
    const c2 = new Circle(subtract(circle2.origin, circle1.origin), circle2.radius);
    const c2Angle = ofPointInDegrees(zero(), c2.origin);
    rotate$1(c2, -c2Angle, zero());
    const unRotate = (resultAngle) => {
      const unrotated = resultAngle + c2Angle;
      return noRevolutions(unrotated);
    };
    const x = c2.origin[0];
    if (round(c2.radius - x - c1.radius) == 0) {
      if (options.excludeTangents) {
        return null;
      }
      return [[unRotate(180)], [unRotate(180)]];
    }
    if (round(c2.radius + x - c1.radius) == 0) {
      if (options.excludeTangents) {
        return null;
      }
      return [[unRotate(0)], [unRotate(0)]];
    }
    if (round(x - c2.radius - c1.radius) == 0) {
      if (options.excludeTangents) {
        return null;
      }
      return [[unRotate(0)], [unRotate(180)]];
    }
    if (round(x - c2.radius) > c1.radius) {
      return null;
    }
    if (round(x + c2.radius) < c1.radius) {
      return null;
    }
    if (round(x - c2.radius) < -c1.radius) {
      return null;
    }
    const bothAngles = (oneAngle) => {
      return [unRotate(oneAngle), unRotate(mirror$3(oneAngle, false, true))];
    };
    const c1IntersectionAngle = solveTriangleSSS(c2.radius, c1.radius, x);
    const c2IntersectionAngle = solveTriangleSSS(c1.radius, x, c2.radius);
    return [bothAngles(c1IntersectionAngle), bothAngles(180 - c2IntersectionAngle)];
  }
  const intersect = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    intersection
  }, Symbol.toStringTag, { value: "Module" }));
  const equilateral = Math.sqrt(3) / 2;
  function equilateralAltitude(sideLength) {
    return sideLength * equilateral;
  }
  function equilateralSide(altitude) {
    return altitude / equilateral;
  }
  function solveTriangleSSS(lengthA, lengthB, lengthC) {
    return toDegrees(Math.acos((lengthB * lengthB + lengthC * lengthC - lengthA * lengthA) / (2 * lengthB * lengthC)));
  }
  function circleTangentAngles(a, b, inner = false) {
    const connect = new Line(a.origin, b.origin);
    const distance = pointDistance(a.origin, b.origin);
    if (a.radius >= distance + b.radius || b.radius >= distance + a.radius) return null;
    if (inner && a.radius + b.radius >= distance) return null;
    let tangentAngles;
    if (!inner && round(a.radius - b.radius) == 0) {
      tangentAngles = [90, 270];
    } else {
      const d2 = distance / 2;
      const between = new Circle([d2, 0], d2);
      const diff = new Circle(a.radius > b.radius ? [0, 0] : [distance, 0], inner ? a.radius + b.radius : Math.abs(a.radius - b.radius));
      const int = intersection(diff, between);
      if (!int || !int.path1Angles) return null;
      tangentAngles = int.path1Angles;
    }
    const connectAngle = ofLineInDegrees(connect);
    return tangentAngles.map((a2) => noRevolutions(a2 + connectAngle));
  }
  const GrahamScan = grahamScanModule.default ?? grahamScanModule;
  function increase(baseMeasure, addMeasure, augmentBaseMeasure) {
    function getExtreme(basePoint, newPoint, fn) {
      if (!newPoint) return;
      for (var i = 2; i--; ) {
        if (newPoint[i] == null) continue;
        if (basePoint[i] == null) {
          basePoint[i] = newPoint[i];
        } else {
          basePoint[i] = fn(basePoint[i], newPoint[i]);
        }
      }
    }
    if (addMeasure) {
      getExtreme(baseMeasure.low, addMeasure.low, Math.min);
      getExtreme(baseMeasure.high, addMeasure.high, Math.max);
    }
    if (augmentBaseMeasure) {
      augment(baseMeasure);
    }
    return baseMeasure;
  }
  function isArcConcaveTowardsPoint(arc, towardsPoint) {
    if (pointDistance(arc.origin, towardsPoint) <= arc.radius) {
      return true;
    }
    var midPointToNearPoint = new Line(middle(arc), towardsPoint);
    var options = {};
    const intersectionPoint = intersection(midPointToNearPoint, new Chord(arc), options);
    if (intersectionPoint || options.out_AreOverlapped) {
      return true;
    }
    return false;
  }
  function isArcOverlapping(arcA, arcB, excludeTangents) {
    return isArcSpanOverlapping(arcA, arcB, excludeTangents);
  }
  function isArcSpanOverlapping(arcA, arcB, excludeTangents) {
    function checkAngles(a, b) {
      function checkAngle(n) {
        return isBetweenArcAngles(n, a, excludeTangents);
      }
      return checkAngle(b.startAngle) || checkAngle(b.endAngle);
    }
    return checkAngles(arcA, arcB) || checkAngles(arcB, arcA) || arcA.startAngle == arcB.startAngle && arcA.endAngle == arcB.endAngle;
  }
  function isBetween$1(valueInQuestion, limitA, limitB, exclusive) {
    if (exclusive) {
      return Math.min(limitA, limitB) < valueInQuestion && valueInQuestion < Math.max(limitA, limitB);
    } else {
      return Math.min(limitA, limitB) <= valueInQuestion && valueInQuestion <= Math.max(limitA, limitB);
    }
  }
  function isBetweenArcAngles(angleInQuestion, arc, exclusive) {
    var startAngle = noRevolutions(arc.startAngle);
    var span = ofArcSpan(arc);
    var endAngle = startAngle + span;
    angleInQuestion = noRevolutions(angleInQuestion);
    return isBetween$1(angleInQuestion, startAngle, endAngle, exclusive) || isBetween$1(angleInQuestion, startAngle + 360, endAngle + 360, exclusive) || isBetween$1(angleInQuestion, startAngle - 360, endAngle - 360, exclusive);
  }
  function isBetweenPoints$1(pointInQuestion, line, exclusive) {
    var oneDimension = false;
    for (var i = 2; i--; ) {
      if (round(line.origin[i] - line.end[i], 1e-6) == 0) {
        if (oneDimension) return false;
        oneDimension = true;
        continue;
      }
      var origin_value = round(line.origin[i]);
      var end_value = round(line.end[i]);
      if (!isBetween$1(round(pointInQuestion[i]), origin_value, end_value, exclusive)) return false;
    }
    return true;
  }
  function isBezierSeedLinear(seed, exclusive) {
    var slope = lineSlope(seed);
    for (var i = 0; i < seed.controls.length; i++) {
      if (!isPointOnSlope(seed.controls[i], slope)) {
        if (!exclusive) return false;
        if (isBetweenPoints$1(seed.controls[i], seed, false)) return false;
      }
    }
    return true;
  }
  function serializePoint(p) {
    return p.join(",");
  }
  function isChainClockwise(chainContext, out_result) {
    if (!chainContext.endless || chainContext.links.length === 1) {
      return null;
    }
    var keyPoints = toKeyPoints$1(chainContext);
    return isPointArrayClockwise(keyPoints, out_result);
  }
  function isPointArrayClockwise(points, out_result) {
    const convexHull = new GrahamScan();
    var pointsInOrder = [];
    function add2(endPoint) {
      convexHull.addPoint(endPoint[0], endPoint[1]);
      pointsInOrder.push(serializePoint(endPoint));
    }
    points.forEach(add2);
    var hull = convexHull.getHull();
    var hullPoints = hull.slice(0, 3).map((p) => serializePoint([p.x, p.y]));
    var ordered = [];
    pointsInOrder.forEach((p) => {
      if (~hullPoints.indexOf(p)) ordered.push(p);
    });
    switch (ordered.indexOf(hullPoints[1])) {
      case 0:
        ordered.unshift(ordered.pop());
        break;
      case 2:
        ordered.push(ordered.shift());
        break;
    }
    if (out_result) {
      out_result.hullPoints = hull.map((p) => [p.x, p.y]);
      out_result.keyPoints = points;
    }
    return hullPoints[0] != ordered[0];
  }
  function isLineOverlapping(lineA, lineB, excludeTangents) {
    function checkPoints(index, a, b) {
      function checkPoint(p) {
        return isBetweenPoints$1(p, a, excludeTangents);
      }
      return checkPoint(b.origin) || checkPoint(b.end);
    }
    return checkPoints(0, lineA, lineB) || checkPoints(1, lineB, lineA);
  }
  function isMeasurementOverlapping(measureA, measureB) {
    for (var i = 2; i--; ) {
      if (!(round(measureA.low[i] - measureB.high[i]) <= 0 && round(measureA.high[i] - measureB.low[i]) >= 0)) return false;
    }
    return true;
  }
  function lineSlope(line) {
    var dx = line.end[0] - line.origin[0];
    if (round(dx, 1e-6) == 0) {
      return {
        line,
        hasSlope: false
      };
    }
    var dy = line.end[1] - line.origin[1];
    var slope = dy / dx;
    var yIntercept = line.origin[1] - slope * line.origin[0];
    return {
      line,
      hasSlope: true,
      slope,
      yIntercept
    };
  }
  function pointDistance(a, b) {
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  function getExtremePoint(a, b, fn) {
    return [
      fn(a[0], b[0]),
      fn(a[1], b[1])
    ];
  }
  var pathExtentsMap = {};
  pathExtentsMap[pathType.Line] = function(line) {
    return {
      low: getExtremePoint(line.origin, line.end, Math.min),
      high: getExtremePoint(line.origin, line.end, Math.max)
    };
  };
  pathExtentsMap[pathType.Circle] = function(circle) {
    var r = circle.radius;
    return {
      low: add(circle.origin, [-r, -r]),
      high: add(circle.origin, [r, r])
    };
  };
  pathExtentsMap[pathType.Arc] = function(arc) {
    var r = arc.radius;
    var arcPoints = fromArc(arc);
    function extremeAngle(xyAngle, value2, fn) {
      var extremePoint = getExtremePoint(arcPoints[0], arcPoints[1], fn);
      for (var i = 2; i--; ) {
        if (isBetweenArcAngles(xyAngle[i], arc, false)) {
          extremePoint[i] = value2 + arc.origin[i];
        }
      }
      return extremePoint;
    }
    return {
      low: extremeAngle([180, 270], -r, Math.min),
      high: extremeAngle([360, 90], r, Math.max)
    };
  };
  function pathExtents(pathToMeasure, addOffset) {
    if (pathToMeasure) {
      var fn = pathExtentsMap[pathToMeasure.type];
      if (fn) {
        var m = fn(pathToMeasure);
        if (addOffset) {
          m.high = add(m.high, addOffset);
          m.low = add(m.low, addOffset);
        }
        return m;
      }
    }
    return { low: null, high: null };
  }
  var pathLengthMap = {};
  pathLengthMap[pathType.Line] = function(line) {
    return pointDistance(line.origin, line.end);
  };
  pathLengthMap[pathType.Circle] = function(circle) {
    return 2 * Math.PI * circle.radius;
  };
  pathLengthMap[pathType.Arc] = function(arc) {
    var value2 = pathLengthMap[pathType.Circle](arc);
    var pct = ofArcSpan(arc) / 360;
    value2 *= pct;
    return value2;
  };
  pathLengthMap[pathType.BezierSeed] = function(seed) {
    if (BezierCurve?.computeLength) {
      return BezierCurve.computeLength(seed);
    }
    return 0;
  };
  function pathLength(pathToMeasure) {
    if (pathToMeasure) {
      var fn = pathLengthMap[pathToMeasure.type];
      if (fn) {
        return fn(pathToMeasure);
      }
    }
    return 0;
  }
  function modelPathLength(modelToMeasure) {
    var total = 0;
    walk(modelToMeasure, {
      onPath: function(walkedPath) {
        total += pathLength(walkedPath.pathContext);
      }
    });
    return total;
  }
  function cloneMeasure(measureToclone) {
    return {
      high: clone(measureToclone.high),
      low: clone(measureToclone.low)
    };
  }
  function modelExtents(modelToMeasure, atlas) {
    function increaseParentModel(childRoute, childMeasurement) {
      if (!childMeasurement) return;
      var parentRoute = childRoute.slice(0, -2);
      var parentRouteKey = createRouteKey(parentRoute);
      if (!(parentRouteKey in atlas.modelMap)) {
        atlas.modelMap[parentRouteKey] = cloneMeasure(childMeasurement);
      } else {
        increase(atlas.modelMap[parentRouteKey], childMeasurement);
      }
    }
    if (!atlas) atlas = new Atlas(modelToMeasure);
    var walkOptions = {
      onPath: function(walkedPath) {
        if (!(walkedPath.routeKey in atlas.pathMap)) {
          atlas.pathMap[walkedPath.routeKey] = pathExtents(walkedPath.pathContext, walkedPath.offset);
        }
        increaseParentModel(walkedPath.route, atlas.pathMap[walkedPath.routeKey]);
      },
      afterChildWalk: function(walkedModel) {
        increaseParentModel(walkedModel.route, atlas.modelMap[walkedModel.routeKey]);
      }
    };
    walk(modelToMeasure, walkOptions);
    atlas.modelsMeasured = true;
    var m = atlas.modelMap[""];
    if (m) {
      return augment(m);
    }
    return null;
  }
  function augment(measureToAugment) {
    var m = measureToAugment;
    m.center = average(m.high, m.low);
    m.width = m.high[0] - m.low[0];
    m.height = m.high[1] - m.low[1];
    return m;
  }
  class Atlas {
    /**
     * Constructor.
     * @param modelContext The model to measure.
     */
    constructor(modelContext) {
      this.modelContext = modelContext;
      this.modelsMeasured = false;
      this.modelMap = {};
      this.pathMap = {};
    }
    measureModels() {
      if (!this.modelsMeasured) {
        modelExtents(this.modelContext, this);
      }
    }
  }
  function loopIndex(base2, i) {
    if (i >= base2) return i - base2;
    if (i < 0) return i + base2;
    return i;
  }
  function yAtX(slope, x) {
    return slope.slope * x + slope.yIntercept;
  }
  function pointOnSlopeAtX(line, x) {
    var slope = lineSlope(line);
    return [x, yAtX(slope, x)];
  }
  function isCircular(bounds) {
    for (var i = 1; i < 3; i++) {
      if (!isPointEqual(bounds[0].center, bounds[i].center, 1e-6) || !(round(bounds[0].width - bounds[i].width) === 0)) {
        return false;
      }
    }
    return true;
  }
  function getAngledBounds(index, modelToMeasure, rotateModel, rotatePaths) {
    rotate$2(modelToMeasure, rotateModel);
    var m = modelExtents(modelToMeasure);
    var result = {
      index,
      rotation: rotatePaths,
      center: rotate(m.center, rotatePaths),
      //model is sideways, so width is based on Y, height is based on X
      width: m.height,
      height: m.width,
      bottom: new Line(m.low, [m.high[0], m.low[1]]),
      middle: new Line([m.low[0], m.center[1]], [m.high[0], m.center[1]]),
      top: new Line(m.high, [m.low[0], m.high[1]])
    };
    [result.top, result.middle, result.bottom].forEach((line) => rotate$1(line, rotatePaths));
    return result;
  }
  function hexSolution(lines, bounds) {
    var tip = lines[1].origin;
    var tipX = tip[0];
    var left = lines[3].origin[0];
    var right = lines[0].origin[0];
    var altRight = tipX - right;
    if (right - left > 2 * altRight) return null;
    var altLeft = (tipX - left) / 3;
    if (altRight < altLeft) return null;
    var altitudeViaSide = Math.min(altLeft, altRight);
    var radiusViaSide = equilateralSide(altitudeViaSide);
    var peakPoints = [fromSlopeIntersection(lines[1], lines[2]), fromSlopeIntersection(lines[4], lines[5])];
    var peakRadii = peakPoints.map((p) => Math.abs(p[1] - tip[1]));
    var peakNum = peakRadii[0] > peakRadii[1] ? 0 : 1;
    var radiusViaPeak = peakRadii[peakNum];
    if (radiusViaPeak > radiusViaSide) {
      var altitudeViaPeak = equilateralAltitude(radiusViaPeak);
      var peakX = tipX - 2 * altitudeViaPeak;
      if (right > peakX + altitudeViaPeak) return null;
      if (left < peakX - altitudeViaPeak) return null;
      var leftGap = left - peakX + altitudeViaPeak;
      var peakGap = 2 * altitudeViaPeak - bounds[peakNum + 1].width;
      var minHalfGap = Math.min(leftGap, peakGap) / 2;
      return {
        origin: pointOnSlopeAtX(bounds[2 - peakNum].middle, peakX + minHalfGap),
        radius: radiusViaPeak,
        type: "peak " + peakNum
      };
    } else {
      return {
        origin: [tipX - 2 * altitudeViaSide, tip[1]],
        radius: radiusViaSide,
        type: "side"
      };
    }
  }
  function boundingHexagon(modelToMeasure) {
    var clone2 = cloneObject(modelToMeasure);
    originate(clone2);
    var originalMeasure = modelExtents(clone2);
    var bounds = [];
    var scratch = { paths: {} };
    center$1(clone2);
    function result(radius, origin, notes) {
      return {
        radius,
        paths: new Polygon(6, radius, 30).paths,
        origin: add(origin, originalMeasure.center),
        //models: { scratch: scratch },
        notes
      };
    }
    var boundRotations = [[90, -90], [-60, -30], [-60, 30]];
    while (boundRotations.length) {
      var rotation = boundRotations.shift();
      var bound = getAngledBounds(bounds.length, clone2, rotation[0], rotation[1]);
      var side = equilateralSide(bound.width / 2);
      if (side >= bound.height) {
        return result(side, bound.center, "solved by bound " + bounds.length);
      }
      bounds.push(bound);
    }
    if (isCircular(bounds)) {
      return result(equilateralSide(bounds[0].width / 2), bounds[0].center, "solved as circular");
    }
    var perimeters = bounds.map((b) => b.top).concat(bounds.map((b) => b.bottom));
    perimeters.forEach((p2, i2) => {
      scratch.paths[i2] = p2;
      converge(perimeters[loopIndex(6, i2 + 2)], p2, true);
    });
    bounds.forEach((b, i2) => {
      scratch.paths["m" + i2] = b.middle;
    });
    var boundCopy = bounds.slice();
    var solution;
    for (var i = 0; i < 6; i++) {
      if (i > 0) {
        perimeters.push(perimeters.shift());
        boundCopy.push(boundCopy.shift());
        rotate$2(scratch, -60);
      }
      var s = hexSolution(perimeters, boundCopy);
      if (s) {
        if (!solution || s.radius < solution.radius) {
          solution = s;
          solution.index = i;
        }
      }
    }
    var p = rotate(solution.origin, solution.index * 60);
    return result(solution.radius, p, "solved by " + solution.index + " as " + solution.type);
  }
  function addUniquePoints(pointArray, pointsToAdd) {
    var added = 0;
    pointsToAdd.forEach((p) => {
      if (!isPointDistinct(p, pointArray, 1e-8)) return;
      pointArray.push(p);
      added++;
    });
    return added;
  }
  function getFarPoint(modelContext, farPoint, measureAtlas) {
    if (farPoint) return farPoint;
    var high = modelExtents(modelContext).high;
    if (high) {
      return add(high, [1, 1]);
    }
    return [7654321, 1234567];
  }
  function isPointInsideModel(pointToCheck, modelContext, options = {}) {
    if (!options.farPoint) {
      options.farPoint = getFarPoint(modelContext, options.farPoint, options.measureAtlas);
    }
    options.out_intersectionPoints = [];
    var isInside;
    var lineToFarPoint = new Line(pointToCheck, options.farPoint);
    var measureFarPoint = pathExtents(lineToFarPoint);
    var walkOptions = {
      onPath: function(walkedPath) {
        if (options.measureAtlas && !isMeasurementOverlapping(measureFarPoint, options.measureAtlas.pathMap[walkedPath.routeKey])) {
          return;
        }
        var intersectOptions = { path2Offset: walkedPath.offset };
        const farInt = intersection(lineToFarPoint, walkedPath.pathContext, intersectOptions);
        if (farInt) {
          var added = addUniquePoints(options.out_intersectionPoints, farInt.intersectionPoints);
          if (added % 2 == 1) {
            isInside = !!!isInside;
          }
        }
      },
      beforeChildWalk: function(innerWalkedModel) {
        if (!options.measureAtlas) {
          return true;
        }
        var innerModelMeasurement = options.measureAtlas.modelMap[innerWalkedModel.routeKey];
        return innerModelMeasurement && isMeasurementOverlapping(measureFarPoint, innerModelMeasurement);
      }
    };
    walk(modelContext, walkOptions);
    return !!isInside;
  }
  const measure$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Atlas,
    augment,
    boundingHexagon,
    increase,
    isArcConcaveTowardsPoint,
    isArcOverlapping,
    isArcSpanOverlapping,
    isBetween: isBetween$1,
    isBetweenArcAngles,
    isBetweenPoints: isBetweenPoints$1,
    isBezierSeedLinear,
    isChainClockwise,
    isLineOverlapping,
    isMeasurementOverlapping,
    isPointArrayClockwise,
    isPointDistinct,
    isPointEqual,
    isPointInsideModel,
    isPointOnSlope,
    lineSlope,
    modelExtents,
    modelPathLength,
    pathExtents,
    pathLength,
    pointDistance
  }, Symbol.toStringTag, { value: "Module" }));
  function add(a, b, subtract2) {
    const newPoint = clone(a);
    if (!b) return newPoint;
    for (let i = 2; i--; ) {
      if (subtract2) {
        newPoint[i] -= b[i];
      } else {
        newPoint[i] += b[i];
      }
    }
    return newPoint;
  }
  function average(a, b) {
    const avg = (i) => (a[i] + b[i]) / 2;
    return [avg(0), avg(1)];
  }
  function clone(pointToClone) {
    if (!pointToClone) return zero();
    return [pointToClone[0], pointToClone[1]];
  }
  function closest(referencePoint, pointOptions) {
    const smallest = { index: 0, distance: -1 };
    for (let i = 0; i < pointOptions.length; i++) {
      const distance = pointDistance(referencePoint, pointOptions[i]);
      if (smallest.distance == -1 || distance < smallest.distance) {
        smallest.distance = distance;
        smallest.index = i;
      }
    }
    return pointOptions[smallest.index];
  }
  const zero_cos = {};
  zero_cos[Math.PI / 2] = true;
  zero_cos[3 * Math.PI / 2] = true;
  const zero_sin = {};
  zero_sin[Math.PI] = true;
  zero_sin[2 * Math.PI] = true;
  function fromPolar(angleInRadians, radius) {
    return [
      angleInRadians in zero_cos ? 0 : round(radius * Math.cos(angleInRadians)),
      angleInRadians in zero_sin ? 0 : round(radius * Math.sin(angleInRadians))
    ];
  }
  function fromAngleOnCircle(angleInDegrees, circle) {
    return add(circle.origin, fromPolar(toRadians(angleInDegrees), circle.radius));
  }
  function fromArc(arc) {
    return [fromAngleOnCircle(arc.startAngle, arc), fromAngleOnCircle(arc.endAngle, arc)];
  }
  const pathEndsMap = {};
  pathEndsMap[pathType.Arc] = (arc) => fromArc(arc);
  pathEndsMap[pathType.Line] = (line) => [line.origin, line.end];
  pathEndsMap[pathType.BezierSeed] = pathEndsMap[pathType.Line];
  function fromPathEnds(pathContext, pathOffset) {
    let result = null;
    const fn = pathEndsMap[pathContext.type];
    if (fn) {
      result = fn(pathContext);
      if (pathOffset) {
        result = result.map((p) => add(p, pathOffset));
      }
    }
    return result;
  }
  function verticalIntersectionPoint(verticalLine, nonVerticalSlope) {
    const x = verticalLine.origin[0];
    const y = nonVerticalSlope.slope * x + nonVerticalSlope.yIntercept;
    return [x, y];
  }
  function fromSlopeIntersection(lineA, lineB, options = {}) {
    const slopeA = lineSlope(lineA);
    const slopeB = lineSlope(lineB);
    if (isSlopeParallel(slopeA, slopeB)) {
      if (isSlopeEqual(slopeA, slopeB)) {
        options.out_AreOverlapped = isLineOverlapping(lineA, lineB, options.excludeTangents);
      }
      return null;
    }
    let pointOfIntersection;
    if (!slopeA.hasSlope) {
      pointOfIntersection = verticalIntersectionPoint(lineA, slopeB);
    } else if (!slopeB.hasSlope) {
      pointOfIntersection = verticalIntersectionPoint(lineB, slopeA);
    } else {
      const x = (slopeB.yIntercept - slopeA.yIntercept) / (slopeA.slope - slopeB.slope);
      const y = slopeA.slope * x + slopeA.yIntercept;
      pointOfIntersection = [x, y];
    }
    return pointOfIntersection;
  }
  function midCircle(circle, midAngle) {
    return add(circle.origin, fromPolar(toRadians(midAngle), circle.radius));
  }
  const middleMap = {};
  middleMap[pathType.Arc] = (arc, ratio) => {
    const midAngle = ofArcMiddle(arc, ratio);
    return midCircle(arc, midAngle);
  };
  middleMap[pathType.Circle] = (circle, ratio) => midCircle(circle, 360 * ratio);
  middleMap[pathType.Line] = (line, ratio) => {
    const ration = (a, b) => a + (b - a) * ratio;
    return [ration(line.origin[0], line.end[0]), ration(line.origin[1], line.end[1])];
  };
  middleMap[pathType.BezierSeed] = (seed, ratio) => models.BezierCurve.computePoint(seed, ratio);
  function middle(pathContext, ratio = 0.5) {
    let midPoint = null;
    const fn = middleMap[pathContext.type];
    if (fn) {
      midPoint = fn(pathContext, ratio);
    }
    return midPoint;
  }
  function mirror(pointToMirror, mirrorX, mirrorY) {
    const p = clone(pointToMirror);
    if (mirrorX) p[0] = -p[0];
    if (mirrorY) p[1] = -p[1];
    return p;
  }
  function rounded(pointContext, accuracy) {
    return [round(pointContext[0], accuracy), round(pointContext[1], accuracy)];
  }
  function rotate(pointToRotate, angleInDegrees, rotationOrigin = [0, 0]) {
    const pointAngleInRadians = ofPointInRadians(rotationOrigin, pointToRotate);
    const d = pointDistance(rotationOrigin, pointToRotate);
    const rotatedPoint = fromPolar(pointAngleInRadians + toRadians(angleInDegrees), d);
    return add(rotationOrigin, rotatedPoint);
  }
  function scale(pointToScale, scaleValue) {
    const p = clone(pointToScale);
    for (let i = 2; i--; ) {
      p[i] *= scaleValue;
    }
    return p;
  }
  function distort(pointToDistort, scaleX, scaleY) {
    return [pointToDistort[0] * scaleX, pointToDistort[1] * scaleY];
  }
  function subtract(a, b) {
    return add(a, b, true);
  }
  function zero() {
    return [0, 0];
  }
  const _point = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    add,
    average,
    clone,
    closest,
    distort,
    fromAngleOnCircle,
    fromArc,
    fromPathEnds,
    fromPolar,
    fromSlopeIntersection,
    isPoint,
    middle,
    mirror,
    rotate,
    rounded,
    scale,
    subtract,
    zero
  }, Symbol.toStringTag, { value: "Module" }));
  const distance2D = (a, b) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy);
  };
  class Arc {
    constructor(...args) {
      function getSpan(origin) {
        var startAngle = ofPointInDegrees(origin, args[clockwise ? 1 : 0]);
        var endAngle = ofPointInDegrees(origin, args[clockwise ? 0 : 1]);
        if (endAngle < startAngle) {
          endAngle += 360;
        }
        return {
          origin,
          startAngle,
          endAngle,
          size: endAngle - startAngle
        };
      }
      switch (args.length) {
        case 5:
          var pointA = args[0];
          var pointB = args[1];
          this.radius = args[2];
          var largeArc = args[3];
          var clockwise = args[4];
          var span;
          var smallestRadius = distance2D(pointA, pointB) / 2;
          if (round(this.radius - smallestRadius) <= 0) {
            this.radius = smallestRadius;
            span = getSpan(average(pointA, pointB));
          } else {
            let intersectionPoints = intersection(
              new Circle(pointA, this.radius),
              new Circle(pointB, this.radius)
            )?.intersectionPoints ?? [pointA, pointB];
            var spans = [];
            for (var i = intersectionPoints.length; i--; ) {
              span = getSpan(intersectionPoints[i]);
              if (spans.length == 0 || span.size > spans[0].size) {
                spans.push(span);
              } else {
                spans.unshift(span);
              }
            }
            var index = largeArc ? 1 : 0;
            span = spans[index];
          }
          this.origin = span.origin;
          this.startAngle = span.startAngle;
          this.endAngle = span.endAngle;
          break;
        case 4:
          this.origin = args[0];
          this.radius = args[1];
          this.startAngle = args[2];
          this.endAngle = args[3];
          break;
        case 3:
          if (isPoint(args[2])) {
            Circle.apply(this, args);
            var angles = [];
            for (let i2 = 0; i2 < 3; i2++) {
              angles.push(ofPointInDegrees(this.origin, args[i2]));
            }
            this.startAngle = angles[0];
            this.endAngle = angles[2];
            if (!isBetweenArcAngles(angles[1], this, false)) {
              this.startAngle = angles[2];
              this.endAngle = angles[0];
            }
            break;
          }
        //fall through to below if 2 points
        case 2:
          var clockwise = args[2];
          Circle.call(this, args[0], args[1]);
          this.startAngle = ofPointInDegrees(this.origin, args[clockwise ? 1 : 0]);
          this.endAngle = ofPointInDegrees(this.origin, args[clockwise ? 0 : 1]);
          break;
      }
      this.type = pathType.Arc;
    }
  }
  class Circle {
    constructor(...args) {
      this.type = pathType.Circle;
      switch (args.length) {
        case 1:
          this.origin = [0, 0];
          this.radius = args[0];
          break;
        case 2:
          if (isNumber(args[1])) {
            this.origin = args[0];
            this.radius = args[1];
          } else {
            this.origin = average(args[0], args[1]);
            this.radius = distance2D(this.origin, args[0]);
          }
          break;
        default:
          var lines = [
            new Line(args[0], args[1]),
            new Line(args[1], args[2])
          ];
          var perpendiculars = [];
          for (var i = 2; i--; ) {
            var midpoint = middle(lines[i]);
            perpendiculars.push(rotate$1(lines[i], 90, midpoint));
          }
          var origin = fromSlopeIntersection(perpendiculars[0], perpendiculars[1]);
          if (origin) {
            this.origin = origin;
            this.radius = pointDistance(this.origin, args[0]);
          } else {
            throw "invalid parameters - attempted to construct a circle from 3 points on a line: " + JSON.stringify(args);
          }
          break;
      }
    }
  }
  class Line {
    constructor(...args) {
      this.type = pathType.Line;
      switch (args.length) {
        case 1:
          var points = args[0];
          this.origin = points[0];
          this.end = points[1];
          break;
        case 2:
          this.origin = args[0];
          this.end = args[1];
          break;
      }
    }
  }
  class Chord {
    constructor(arc) {
      var arcPoints = fromArc(arc);
      this.type = pathType.Line;
      this.origin = arcPoints[0];
      this.end = arcPoints[1];
    }
  }
  class Parallel {
    constructor(toLine, distance, nearPoint) {
      this.type = pathType.Line;
      this.origin = clone(toLine.origin);
      this.end = clone(toLine.end);
      var angleOfLine = ofLineInDegrees(this);
      function getNewOrigin(offsetAngle) {
        var origin = add(toLine.origin, fromPolar(toRadians(angleOfLine + offsetAngle), distance));
        return {
          origin,
          nearness: distance2D(origin, nearPoint)
        };
      }
      var newOrigins = [getNewOrigin(-90), getNewOrigin(90)];
      var newOrigin = newOrigins[0].nearness < newOrigins[1].nearness ? newOrigins[0].origin : newOrigins[1].origin;
      move(this, newOrigin);
    }
  }
  const paths$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Arc,
    Chord,
    Circle,
    Line,
    Parallel
  }, Symbol.toStringTag, { value: "Module" }));
  function getPoints(arg) {
    let coords;
    if (Array.isArray(arg)) {
      if (isPoint(arg[0])) {
        return arg;
      }
      coords = arg;
    } else {
      coords = importer.parseNumericList(arg);
    }
    const points = [];
    for (let i = 0; i < coords.length; i += 2) {
      points.push([coords[i], coords[i + 1]]);
    }
    return points;
  }
  class ConnectTheDots {
    constructor(...args) {
      this.paths = {};
      let isClosed;
      let points;
      switch (args.length) {
        case 1:
          isClosed = true;
          points = getPoints(args[0]);
          break;
        case 2:
          isClosed = args[0];
          points = getPoints(args[1]);
          break;
      }
      let lineIndex = 0;
      const connect = (a, b, skipZeroDistance = false) => {
        if (skipZeroDistance && pointDistance$1(points[a], points[b]) == 0) return;
        this.paths["ShapeLine" + lineIndex] = new Line(points[a], points[b]);
        lineIndex++;
      };
      for (let i = 1; i < points.length; i++) {
        connect(i - 1, i);
      }
      if (isClosed && points.length > 2) {
        connect(points.length - 1, 0, true);
      }
    }
  }
  ConnectTheDots.metaParameters = [
    { title: "closed", type: "bool", value: true },
    {
      title: "points",
      type: "select",
      value: [
        [[0, 0], [40, 40], [60, 20], [100, 100], [60, 60], [40, 80]],
        [[0, 0], [100, 0], [50, 87]],
        [-10, 0, 10, 0, 0, 20],
        "-10 0 10 0 0 20"
      ]
    }
  ];
  class Holes {
    /** Create an array of circles of the same radius from an array of center points. */
    constructor(holeRadius, points, ids) {
      this.paths = {};
      for (let i = 0; i < points.length; i++) {
        const id = ids ? ids[i] : i.toString();
        this.paths[id] = new Circle(points[i], holeRadius);
      }
    }
  }
  Holes.metaParameters = [
    { title: "holeRadius", type: "range", min: 0.1, max: 10, step: 0.1, value: 1 },
    {
      title: "points",
      type: "select",
      value: [
        [[0, 0], [10, 10], [20, 20], [30, 30], [40, 40], [50, 50], [60, 60], [70, 70], [80, 80]],
        [[0, 0], [0, 25], [0, 50], [0, 75], [0, 100], [25, 50], [50, 50], [75, 50], [100, 100], [100, 75], [100, 50], [100, 25], [100, 0]]
      ]
    }
  ];
  class Rectangle {
    constructor(...args) {
      this.paths = {};
      let width;
      let height;
      if (args.length === 2 && !isObject(args[0])) {
        width = args[0];
        height = args[1];
      } else {
        let margin = 0;
        let m;
        if (isModel(args[0])) {
          m = modelExtents$1(args[0]);
          if (args.length === 2) {
            margin = args[1];
          }
        } else {
          m = args[0];
        }
        this.origin = subtract(m.low, [margin, margin]);
        width = m.high[0] - m.low[0] + 2 * margin;
        height = m.high[1] - m.low[1] + 2 * margin;
      }
      this.paths = new ConnectTheDots(true, [[0, 0], [width, 0], [width, height], [0, height]]).paths;
    }
  }
  Rectangle.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 }
  ];
  class Square {
    constructor(side) {
      this.paths = {};
      this.paths = new Rectangle(side, side).paths;
    }
  }
  Square.metaParameters = [
    { title: "side", type: "range", min: 1, max: 100, value: 100 }
  ];
  class Polygon {
    constructor(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed) {
      this.paths = {};
      this.paths = new ConnectTheDots(true, Polygon.getPoints(numberOfSides, radius, firstCornerAngleInDegrees, circumscribed)).paths;
    }
    static circumscribedRadius(radius, angleInRadians) {
      return radius / Math.cos(angleInRadians / 2);
    }
    static getPoints(numberOfSides, radius, firstCornerAngleInDegrees = 0, circumscribed = false) {
      const points = [];
      const a1 = toRadians(firstCornerAngleInDegrees);
      const a = 2 * Math.PI / numberOfSides;
      if (circumscribed) {
        radius = Polygon.circumscribedRadius(radius, a);
      }
      for (let i = 0; i < numberOfSides; i++) {
        points.push(fromPolar(a * i + a1, radius));
      }
      return points;
    }
  }
  Polygon.metaParameters = [
    { title: "number of sides", type: "range", min: 3, max: 24, value: 6 },
    { title: "radius", type: "range", min: 1, max: 100, value: 50 },
    { title: "offset angle", type: "range", min: 0, max: 180, value: 0 },
    { title: "radius on flats (vs radius on vertexes)", type: "bool", value: false }
  ];
  class Ring {
    constructor(outerRadius, innerRadius) {
      this.paths = {};
      const radii = {
        "Ring_outer": outerRadius,
        "Ring_inner": innerRadius
      };
      for (const id in radii) {
        const r = radii[id];
        if (r === void 0 || r <= 0) continue;
        this.paths[id] = new Circle(zero(), r);
      }
    }
  }
  Ring.metaParameters = [
    { title: "outer radius", type: "range", min: 0, max: 100, step: 1, value: 50 },
    { title: "inner radius", type: "range", min: 0, max: 100, step: 1, value: 20 }
  ];
  class Star {
    constructor(numberOfPoints, outerRadius, innerRadius, skipPoints = 2) {
      this.paths = {};
      if (!innerRadius) {
        innerRadius = outerRadius * Star.InnerRadiusRatio(numberOfPoints, skipPoints);
      }
      const outerPoints = Polygon.getPoints(numberOfPoints, outerRadius);
      const innerPoints = Polygon.getPoints(numberOfPoints, innerRadius, 180 / numberOfPoints);
      const allPoints = [];
      for (let i = 0; i < numberOfPoints; i++) {
        allPoints.push(outerPoints[i]);
        allPoints.push(innerPoints[i]);
      }
      const model2 = new ConnectTheDots(true, allPoints);
      this.paths = model2.paths;
      delete model2.paths;
    }
    static InnerRadiusRatio(numberOfPoints, skipPoints) {
      if (numberOfPoints > 0 && skipPoints > 1 && skipPoints < numberOfPoints / 2) {
        return Math.cos(Math.PI * skipPoints / numberOfPoints) / Math.cos(Math.PI * (skipPoints - 1) / numberOfPoints);
      }
      return 0;
    }
  }
  Star.metaParameters = [
    { title: "number of sides", type: "range", min: 3, max: 24, value: 8 },
    { title: "outer radius", type: "range", min: 1, max: 100, value: 50 },
    { title: "inner radius", type: "range", min: 0, max: 100, value: 15 },
    { title: "skip points (when inner radius is zero)", type: "range", min: 0, max: 12, value: 2 }
  ];
  class Dome {
    constructor(width, height, radius, bottomless) {
      this.paths = {};
      const w2 = width / 2;
      if (radius < 0) radius = 0;
      if (radius === void 0) radius = w2;
      radius = Math.min(radius, w2);
      radius = Math.min(radius, height);
      const wt = Math.max(w2 - radius, 0);
      const hr = Math.max(height - radius, 0);
      if (!bottomless) {
        this.paths["Bottom"] = new Line([-w2, 0], [w2, 0]);
      }
      if (hr) {
        this.paths["Left"] = new Line([-w2, 0], [-w2, hr]);
        this.paths["Right"] = new Line([w2, 0], [w2, hr]);
      }
      if (radius > 0) {
        this.paths["TopLeft"] = new Arc([-wt, hr], radius, 90, 180);
        this.paths["TopRight"] = new Arc([wt, hr], radius, 0, 90);
      }
      if (wt) {
        this.paths["Top"] = new Line([-wt, height], [wt, height]);
      }
    }
  }
  Dome.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 },
    { title: "radius", type: "range", min: 0, max: 50, value: 25 },
    { title: "bottomless", type: "bool", value: false }
  ];
  class BoltCircle {
    constructor(boltRadius, holeRadius, boltCount, firstBoltAngleInDegrees = 0) {
      this.paths = {};
      const points = Polygon.getPoints(boltCount, boltRadius, firstBoltAngleInDegrees);
      const ids = points.map((p, i) => "bolt " + i);
      this.paths = new Holes(holeRadius, points, ids).paths;
    }
  }
  BoltCircle.metaParameters = [
    { title: "bolt circle radius", type: "range", min: 1, max: 100, value: 50 },
    { title: "hole radius", type: "range", min: 1, max: 50, value: 5 },
    { title: "bolt count", type: "range", min: 3, max: 24, value: 12 },
    { title: "offset angle", type: "range", min: 0, max: 180, value: 0 }
  ];
  class BoltRectangle {
    constructor(width, height, holeRadius) {
      this.paths = {};
      const points = [[0, 0], [width, 0], [width, height], [0, height]];
      const ids = ["BottomLeft_bolt", "BottomRight_bolt", "TopRight_bolt", "TopLeft_bolt"];
      this.paths = new Holes(holeRadius, points, ids).paths;
    }
  }
  BoltRectangle.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 100 },
    { title: "height", type: "range", min: 1, max: 100, value: 50 },
    { title: "hole radius", type: "range", min: 1, max: 50, value: 5 }
  ];
  class RoundRectangle {
    constructor(...args) {
      this.paths = {};
      let width;
      let height;
      let radius = 0;
      switch (args.length) {
        case 3:
          width = args[0];
          height = args[1];
          radius = args[2];
          break;
        case 2:
          radius = args[1];
        // fall through to 1
        case 1:
          const m = modelExtents$1(args[0]);
          this.origin = subtract(m.low, [radius, radius]);
          width = m.high[0] - m.low[0] + 2 * radius;
          height = m.high[1] - m.low[1] + 2 * radius;
          break;
      }
      const maxRadius = Math.min(height, width) / 2;
      radius = Math.min(radius, maxRadius);
      const wr = width - radius;
      const hr = height - radius;
      if (radius > 0) {
        this.paths["BottomLeft"] = new Arc([radius, radius], radius, 180, 270);
        this.paths["BottomRight"] = new Arc([wr, radius], radius, 270, 0);
        this.paths["TopRight"] = new Arc([wr, hr], radius, 0, 90);
        this.paths["TopLeft"] = new Arc([radius, hr], radius, 90, 180);
      }
      if (wr - radius > 0) {
        this.paths["Bottom"] = new Line([radius, 0], [wr, 0]);
        this.paths["Top"] = new Line([wr, height], [radius, height]);
      }
      if (hr - radius > 0) {
        this.paths["Right"] = new Line([width, radius], [width, hr]);
        this.paths["Left"] = new Line([0, hr], [0, radius]);
      }
    }
  }
  RoundRectangle.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 },
    { title: "radius", type: "range", min: 0, max: 50, value: 11 }
  ];
  class Oval {
    constructor(width, height) {
      this.paths = {};
      this.paths = new RoundRectangle(width, height, Math.min(height / 2, width / 2)).paths;
    }
  }
  Oval.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 }
  ];
  class Slot {
    constructor(origin, endPoint, radius, isolateCaps = false) {
      this.paths = {};
      let capRoot;
      if (isolateCaps) {
        capRoot = { models: {} };
        this.models = { "Caps": capRoot };
      }
      const addCap = (id, capPath) => {
        let capModel;
        if (isolateCaps) {
          capModel = { paths: {} };
          capRoot.models[id] = capModel;
        } else {
          capModel = this;
        }
        capModel.paths[id] = capPath;
      };
      const a = ofPointInDegrees(origin, endPoint);
      const len = pointDistance$1(origin, endPoint);
      this.paths["Top"] = new Line([0, radius], [len, radius]);
      this.paths["Bottom"] = new Line([0, -radius], [len, -radius]);
      addCap("StartCap", new Arc([0, 0], radius, 90, 270));
      addCap("EndCap", new Arc([len, 0], radius, 270, 90));
      model.rotate(this, a, [0, 0]);
      this.origin = origin;
    }
  }
  Slot.metaParameters = [
    {
      title: "origin",
      type: "select",
      value: [
        [0, 0],
        [10, 0],
        [10, 10]
      ]
    },
    {
      title: "end",
      type: "select",
      value: [
        [80, 0],
        [0, 30],
        [10, 30]
      ]
    },
    { title: "radius", type: "range", min: 1, max: 50, value: 10 }
  ];
  class SCurve {
    constructor(width, height) {
      this.paths = {};
      const findRadius = (x, y) => {
        return x + (y * y - x * x) / (2 * x);
      };
      const h2 = height / 2;
      const w2 = width / 2;
      let radius;
      let startAngle;
      let endAngle;
      let arcOrigin;
      if (width > height) {
        radius = findRadius(h2, w2);
        startAngle = 270;
        endAngle = 360 - toDegrees(Math.acos(w2 / radius));
        arcOrigin = [0, radius];
      } else {
        radius = findRadius(w2, h2);
        startAngle = 180 - toDegrees(Math.asin(h2 / radius));
        endAngle = 180;
        arcOrigin = [radius, 0];
      }
      const curve = new Arc(arcOrigin, radius, startAngle, endAngle);
      this.paths["curve_start"] = curve;
      this.paths["curve_end"] = moveRelative(mirror$1(curve, true, true), [width, height]);
    }
  }
  SCurve.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 }
  ];
  class Dogbone {
    /** Create a dogbone from width, height, corner radius, style, and bottomless flag. */
    constructor(width, height, radius, style = 0, bottomless = false) {
      this.paths = {};
      const maxSide = Math.min(height, width) / 2;
      let maxRadius;
      switch (style) {
        case -1:
        // horizontal
        case 1:
          maxRadius = maxSide / 2;
          break;
        case 0:
        // equal
        default:
          maxRadius = maxSide * Math.SQRT2 / 2;
          break;
      }
      radius = Math.min(radius, maxRadius);
      let ax;
      let ay;
      let lx;
      let ly;
      let apexes;
      switch (style) {
        case -1:
          ax = 0;
          ay = radius;
          lx = 0;
          ly = radius * 2;
          apexes = [180, 0, 0, 180];
          break;
        case 1:
          ax = radius;
          ay = 0;
          lx = radius * 2;
          ly = 0;
          apexes = [270, 270, 90, 90];
          break;
        case 0:
        default:
          ax = ay = radius / Math.SQRT2;
          lx = ly = ax * 2;
          apexes = [225, 315, 45, 135];
          break;
      }
      if (bottomless) {
        this.paths["Left"] = new Line([0, 0], [0, height - ly]);
        this.paths["Right"] = new Line([width, 0], [width, height - ly]);
      } else {
        this.paths["Left"] = new Line([0, ly], [0, height - ly]);
        this.paths["Right"] = new Line([width, ly], [width, height - ly]);
        this.paths["Bottom"] = new Line([lx, 0], [width - lx, 0]);
        this.paths["BottomLeft"] = new Arc([ax, ay], radius, apexes[0] - 90, apexes[0] + 90);
        this.paths["BottomRight"] = new Arc([width - ax, ay], radius, apexes[1] - 90, apexes[1] + 90);
      }
      this.paths["TopRight"] = new Arc([width - ax, height - ay], radius, apexes[2] - 90, apexes[2] + 90);
      this.paths["TopLeft"] = new Arc([ax, height - ay], radius, apexes[3] - 90, apexes[3] + 90);
      this.paths["Top"] = new Line([lx, height], [width - lx, height]);
    }
  }
  Dogbone.metaParameters = [
    { title: "width", type: "range", min: 1, max: 100, value: 50 },
    { title: "height", type: "range", min: 1, max: 100, value: 100 },
    { title: "radius", type: "range", min: 0, max: 50, value: 5 },
    { title: "style", type: "select", value: [0, 1, -1] },
    { title: "bottomless", type: "bool", value: false }
  ];
  class Belt {
    constructor(leftRadius, distance, rightRadius) {
      this.paths = {};
      const left = new Arc([0, 0], leftRadius, 0, 360);
      const right = new Arc([distance, 0], rightRadius, 0, 360);
      const angles = circleTangentAngles(left, right);
      if (!angles) {
        this.paths["Belt"] = new Circle(Math.max(leftRadius, rightRadius));
      } else {
        angles.sort((a, b) => a - b);
        left.startAngle = angles[0];
        left.endAngle = angles[1];
        right.startAngle = angles[1];
        right.endAngle = angles[0];
        this.paths["Left"] = left;
        this.paths["Right"] = right;
        this.paths["Top"] = new Line(fromAngleOnCircle(angles[0], left), fromAngleOnCircle(angles[0], right));
        this.paths["Bottom"] = new Line(fromAngleOnCircle(angles[1], left), fromAngleOnCircle(angles[1], right));
      }
    }
  }
  Belt.metaParameters = [
    { title: "left radius", type: "range", min: 0, max: 100, value: 30 },
    { title: "distance between centers", type: "range", min: 0, max: 100, value: 50 },
    { title: "right radius", type: "range", min: 0, max: 100, value: 15 }
  ];
  class OvalArc {
    constructor(startAngle, endAngle, sweepRadius, slotRadius, selfIntersect = false, isolateCaps = false) {
      this.paths = {};
      let capRoot;
      if (isolateCaps) {
        capRoot = { models: {} };
        this.models = { "Caps": capRoot };
      }
      if (slotRadius <= 0 || sweepRadius <= 0) return;
      startAngle = noRevolutions(startAngle);
      endAngle = noRevolutions(endAngle);
      if (round(startAngle - endAngle) == 0) return;
      if (endAngle < startAngle) endAngle += 360;
      const addCap = (id, tiltAngle, offsetStartAngle, offsetEndAngle) => {
        let capModel;
        if (isolateCaps) {
          capModel = { paths: {} };
          capRoot.models[id] = capModel;
        } else {
          capModel = this;
        }
        return capModel.paths[id] = new Arc(
          fromPolar(toRadians(tiltAngle), sweepRadius),
          slotRadius,
          tiltAngle + offsetStartAngle,
          tiltAngle + offsetEndAngle
        );
      };
      const addSweep = (id, offsetRadius) => {
        return this.paths[id] = new Arc(
          [0, 0],
          sweepRadius + offsetRadius,
          startAngle,
          endAngle
        );
      };
      addSweep("Outer", slotRadius);
      const hasInner = sweepRadius - slotRadius > 0;
      if (hasInner) {
        addSweep("Inner", -slotRadius);
      }
      const caps = [];
      caps.push(addCap("StartCap", startAngle, 180, 0));
      caps.push(addCap("EndCap", endAngle, 0, 180));
      const d = pointDistance$1(caps[0].origin, caps[1].origin);
      if (d / 2 < slotRadius) {
        const int = intersection(caps[0], caps[1]);
        if (int) {
          if (!hasInner || !selfIntersect) {
            caps[0].startAngle = int.path1Angles[0];
            caps[1].endAngle = int.path2Angles[0];
          }
          if (!selfIntersect && hasInner && int.intersectionPoints.length == 2) {
            addCap("StartCap2", startAngle, 180, 0).endAngle = int.path1Angles[1];
            addCap("EndCap2", endAngle, 0, 180).startAngle = int.path2Angles[1] + 360;
          }
        }
      }
    }
  }
  OvalArc.metaParameters = [
    { title: "start angle", type: "range", min: -360, max: 360, step: 1, value: 180 },
    { title: "end angle", type: "range", min: -360, max: 360, step: 1, value: 0 },
    { title: "sweep", type: "range", min: 0, max: 100, step: 1, value: 50 },
    { title: "radius", type: "range", min: 0, max: 100, step: 1, value: 15 },
    { title: "self intersect", type: "bool", value: false }
  ];
  const maxBezierArcspan = 45;
  function controlYForCircularCubic(arcSpanInRadians) {
    return 4 * (Math.tan(arcSpanInRadians / 4) / 3);
  }
  function controlPointsForCircularCubic(arc) {
    const arcSpan = ofArcSpan(arc);
    const y = controlYForCircularCubic(toRadians(arcSpan));
    const c1 = [arc.radius, arc.radius * y];
    const c2 = rotate(mirror(c1, false, true), arcSpan, [0, 0]);
    return [c1, c2].map(function(p) {
      return add(arc.origin, rotate(p, arc.startAngle, [0, 0]));
    });
  }
  function bezierSeedFromArc(arc) {
    const span = ofArcSpan(arc);
    if (span <= 90) {
      const endPoints = fromPathEnds(arc);
      const controls = controlPointsForCircularCubic(arc);
      return {
        type: pathType.BezierSeed,
        origin: endPoints[0],
        controls,
        end: endPoints[1]
      };
    }
    return null;
  }
  class Ellipse {
    constructor(...args) {
      this.models = {};
      const n = 360 / maxBezierArcspan;
      let accuracy;
      const isPointArgs0 = isPoint(args[0]);
      const realArgs = (numArgs) => {
        switch (numArgs) {
          case 2:
            if (isPointArgs0) {
              this.origin = args[0];
            }
            break;
          case 3:
            this.origin = args[0];
            break;
          case 4:
            this.origin = [args[0], args[1]];
            break;
        }
        const a = 360 / n;
        const arc = new Arc([0, 0], 1, 0, a);
        for (let i = 0; i < n; i++) {
          let seed = bezierSeedFromArc(arc);
          switch (numArgs) {
            case 1:
              seed = scale$1(seed, args[0]);
              break;
            case 2:
              if (isPointArgs0) {
                seed = scale$1(seed, args[1]);
              } else {
                seed = distort$1(seed, args[0], args[1]);
              }
              break;
            case 3:
              seed = distort$1(seed, args[1], args[2]);
              break;
            case 4:
              seed = distort$1(seed, args[2], args[3]);
              break;
          }
          this.models["Curve_" + (1 + i)] = new BezierCurve(seed, accuracy);
          arc.startAngle += a;
          arc.endAngle += a;
        }
      };
      switch (args.length) {
        case 2:
          realArgs(2);
          break;
        case 3:
          if (isPointArgs0) {
            realArgs(3);
          } else {
            accuracy = args[2];
            realArgs(2);
          }
          break;
        case 4:
          if (isPointArgs0) {
            accuracy = args[3];
            realArgs(3);
          } else {
            realArgs(4);
          }
          break;
        case 5:
          accuracy = args[4];
          realArgs(4);
          break;
      }
    }
  }
  Ellipse.metaParameters = [
    { title: "radiusX", type: "range", min: 1, max: 50, value: 50 },
    { title: "radiusY", type: "range", min: 1, max: 50, value: 25 }
  ];
  class EllipticArc {
    constructor(...args) {
      this.models = {};
      let arc;
      let accuracy;
      let distortX;
      let distortY;
      if (isPathArc(args[0])) {
        arc = args[0];
        distortX = args[1];
        distortY = args[2];
        accuracy = args[3];
      } else {
        arc = new Arc([0, 0], 1, args[0], args[1]);
        distortX = args[2];
        distortY = args[3];
        accuracy = args[4];
      }
      const span = ofArcSpan(arc);
      const count = Math.ceil(span / maxBezierArcspan);
      const subSpan = span / count;
      const subArc = clone$1(arc);
      for (let i = 0; i < count; i++) {
        subArc.startAngle = arc.startAngle + i * subSpan;
        subArc.endAngle = subArc.startAngle + subSpan;
        let seed = bezierSeedFromArc(subArc);
        seed = distort$1(seed, distortX, distortY);
        this.models["Curve_" + (1 + i)] = new BezierCurve(seed, accuracy);
      }
    }
  }
  EllipticArc.metaParameters = [
    { title: "startAngle", type: "range", min: 0, max: 90, value: 0 },
    { title: "endAngle", type: "range", min: 90, max: 360, value: 180 },
    { title: "radiusX", type: "range", min: 1, max: 50, value: 50 },
    { title: "radiusY", type: "range", min: 1, max: 50, value: 25 }
  ];
  function isBetween(valueInQuestion, limitA, limitB, exclusive) {
    {
      return Math.min(limitA, limitB) < valueInQuestion && valueInQuestion < Math.max(limitA, limitB);
    }
  }
  function isBetweenPoints(pointInQuestion, line, exclusive) {
    let oneDimension = false;
    for (let i = 2; i--; ) {
      if (Math.abs(line.origin[i] - line.end[i]) < 1e-6) {
        oneDimension = true;
      } else {
        const originValue = Math.round(line.origin[i] * 1e6) / 1e6;
        const endValue = Math.round(line.end[i] * 1e6) / 1e6;
        const pointValue = Math.round(pointInQuestion[i] * 1e6) / 1e6;
        {
          if (!isBetween(pointValue, originValue, endValue)) {
            return false;
          }
        }
      }
    }
    return oneDimension;
  }
  const breakPathFunctionMap = {};
  breakPathFunctionMap[pathType.Arc] = (arc, pointOfBreak) => {
    const angleAtBreakPoint = ofPointInDegrees(arc.origin, pointOfBreak);
    if (isAngleEqual(angleAtBreakPoint, arc.startAngle) || isAngleEqual(angleAtBreakPoint, arc.endAngle)) {
      return null;
    }
    const getAngleStrictlyBetweenArcAngles = () => {
      const startAngle = noRevolutions(arc.startAngle);
      const endAngle = startAngle + ofArcEnd(arc) - arc.startAngle;
      const tries = [0, 1, -1];
      for (let i = 0; i < tries.length; i++) {
        const add2 = 360 * tries[i];
        if (isBetween(angleAtBreakPoint + add2, startAngle, endAngle)) {
          return arc.startAngle + angleAtBreakPoint + add2 - startAngle;
        }
      }
      return null;
    };
    const angleAtBreakPointBetween = getAngleStrictlyBetweenArcAngles();
    if (angleAtBreakPointBetween == null) {
      return null;
    }
    const savedEndAngle = arc.endAngle;
    arc.endAngle = angleAtBreakPointBetween;
    const copy = cloneObject(arc);
    copy.startAngle = angleAtBreakPointBetween;
    copy.endAngle = savedEndAngle;
    return copy;
  };
  breakPathFunctionMap[pathType.Circle] = (circle, pointOfBreak) => {
    circle.type = pathType.Arc;
    const arc = circle;
    const angleAtBreakPoint = ofPointInDegrees(circle.origin, pointOfBreak);
    arc.startAngle = angleAtBreakPoint;
    arc.endAngle = angleAtBreakPoint + 360;
    return null;
  };
  breakPathFunctionMap[pathType.Line] = (line, pointOfBreak) => {
    if (!isBetweenPoints(pointOfBreak, line)) {
      return null;
    }
    const savedEndPoint = line.end;
    line.end = pointOfBreak;
    const copy = cloneObject(line);
    copy.origin = pointOfBreak;
    copy.end = savedEndPoint;
    return copy;
  };
  function breakAtPoint(pathToBreak, pointOfBreak) {
    if (pathToBreak && pointOfBreak) {
      const fn = breakPathFunctionMap[pathToBreak.type];
      if (fn) {
        const result = fn(pathToBreak, pointOfBreak);
        if (result && "layer" in pathToBreak) {
          result.layer = pathToBreak.layer;
        }
        return result;
      }
    }
    return null;
  }
  const DEFAULT_POINT_MATCHING_DISTANCE = 5e-3;
  function isZeroLength(pathContext, tolerance = DEFAULT_POINT_MATCHING_DISTANCE / 5) {
    return Math.abs(pathLength$1(pathContext)) < tolerance;
  }
  const pathInternal = _path;
  function getNonZeroSegments(pathToSegment, breakPoint) {
    const segment1 = cloneObject(pathToSegment);
    if (!segment1) {
      return null;
    }
    const segment2 = breakAtPoint(segment1, breakPoint);
    if (segment2) {
      const segments = [segment1, segment2];
      for (let i = 0; i < segments.length; i += 1) {
        if (isZeroLength(segments[i], DEFAULT_POINT_MATCHING_DISTANCE / 5)) {
          return null;
        }
      }
      return segments;
    }
    if (pathToSegment.type === pathType.Circle) {
      return [segment1];
    }
    return null;
  }
  function getPointsOnPath(points, onPath, popOptions) {
    const endpointsOnPath = [];
    points.forEach((p) => {
      if (isPointOnPath(p, onPath, 1e-5, void 0, popOptions)) {
        endpointsOnPath.push(p);
      }
    });
    return endpointsOnPath;
  }
  function breakAlongForeignPath(crossedPath, overlappedSegments, foreignWalkedPath) {
    const foreignPath = foreignWalkedPath.pathContext;
    const segments = crossedPath.segments;
    if (isPathEqual(segments[0].absolutePath, foreignPath, 1e-4, void 0, foreignWalkedPath.offset)) {
      segments[0].overlapped = true;
      segments[0].duplicate = true;
      overlappedSegments.push(segments[0]);
      return;
    }
    const popOptions = {};
    const options = { path1Offset: crossedPath.offset, path2Offset: foreignWalkedPath.offset };
    const foreignIntersection = pathInternal.intersection?.(crossedPath.pathContext, foreignPath, options);
    const intersectionPoints = foreignIntersection ? foreignIntersection.intersectionPoints : null;
    const foreignPathEndPoints = fromPathEnds(foreignPath, foreignWalkedPath.offset) || [];
    for (let i = 0; i < segments.length; i += 1) {
      const pointsOfInterest = intersectionPoints ? foreignPathEndPoints.concat(intersectionPoints) : foreignPathEndPoints;
      const pointsToCheck = getPointsOnPath(pointsOfInterest, segments[i].absolutePath, popOptions);
      if (options.out_AreOverlapped) {
        segments[i].overlapped = true;
        overlappedSegments.push(segments[i]);
      }
      if (pointsToCheck.length > 0) {
        let subSegments = null;
        let pointer = 0;
        while (!subSegments && pointer < pointsToCheck.length) {
          subSegments = getNonZeroSegments(segments[i].absolutePath, pointsToCheck[pointer]);
          pointer += 1;
        }
        if (subSegments) {
          crossedPath.broken = true;
          segments[i].absolutePath = subSegments[0];
          if (subSegments[1]) {
            const newSegment = {
              absolutePath: subSegments[1],
              pathId: segments[0].pathId,
              overlapped: segments[i].overlapped,
              uniqueForeignIntersectionPoints: []
            };
            if (segments[i].overlapped) {
              overlappedSegments.push(newSegment);
            }
            segments.push(newSegment);
          }
          i -= 1;
        }
      }
    }
  }
  function breakAllPathsAtIntersections(modelToBreak, modelToIntersect, checkIsInside, modelToBreakAtlas, modelToIntersectAtlas, farPoint) {
    const crossedPaths = [];
    const overlappedSegments = [];
    const walkModelToBreakOptions = {
      onPath(outerWalkedPath) {
        const segment = {
          absolutePath: clone$1(outerWalkedPath.pathContext, outerWalkedPath.offset),
          pathId: outerWalkedPath.pathId,
          overlapped: false,
          uniqueForeignIntersectionPoints: []
        };
        const thisPath = outerWalkedPath;
        thisPath.broken = false;
        thisPath.segments = [segment];
        const walkModelToIntersectOptions = {
          onPath(innerWalkedPath) {
            if (outerWalkedPath.pathContext !== innerWalkedPath.pathContext && measure.isMeasurementOverlapping(
              modelToBreakAtlas.pathMap[outerWalkedPath.routeKey],
              modelToIntersectAtlas.pathMap[innerWalkedPath.routeKey]
            )) {
              breakAlongForeignPath(thisPath, overlappedSegments, innerWalkedPath);
            }
          },
          beforeChildWalk(innerWalkedModel) {
            const innerModelMeasurement = modelToIntersectAtlas.modelMap[innerWalkedModel.routeKey];
            return innerModelMeasurement && measure.isMeasurementOverlapping(modelToBreakAtlas.pathMap[outerWalkedPath.routeKey], innerModelMeasurement);
          }
        };
        walk(modelToIntersect, walkModelToIntersectOptions);
        {
          for (let i = 0; i < thisPath.segments.length; i += 1) {
            const midpoint = middle(thisPath.segments[i].absolutePath);
            const pointInsideOptions = { farPoint };
            pointInsideOptions.measureAtlas = modelToIntersectAtlas;
            thisPath.segments[i].isInside = measure.isPointInsideModel(midpoint, modelToIntersect, pointInsideOptions);
            thisPath.segments[i].uniqueForeignIntersectionPoints = pointInsideOptions.out_intersectionPoints;
          }
        }
        crossedPaths.push(thisPath);
      }
    };
    walk(modelToBreak, walkModelToBreakOptions);
    return { crossedPaths, overlappedSegments };
  }
  function checkForEqualOverlaps(crossedPathsA, crossedPathsB, pointMatchingDistance) {
    const compareSegments = (segment1, segment2) => {
      if (isPathEqual(segment1.absolutePath, segment2.absolutePath, pointMatchingDistance)) {
        segment1.duplicate = true;
        segment2.duplicate = true;
      }
    };
    const compareAll = (segment) => {
      crossedPathsB.forEach((other) => compareSegments(other, segment));
    };
    crossedPathsA.forEach(compareAll);
  }
  function addOrDeleteSegments(crossedPath, includeInside, includeOutside, keepDuplicates, atlas, trackDeleted) {
    const addSegment = (modelContext, pathIdBase, segment) => {
      const id = getSimilarPathId(modelContext, pathIdBase);
      const newRouteKey = id === pathIdBase ? crossedPath.routeKey : createRouteKey(crossedPath.route.slice(0, -1).concat([id]));
      segment.addedPath = cloneObject(crossedPath.pathContext);
      segment.addedPath.type = segment.absolutePath.type;
      copyProps(segment.absolutePath, segment.addedPath);
      moveRelative(segment.addedPath, crossedPath.offset, true);
      modelContext.paths = modelContext.paths || {};
      modelContext.paths[id] = segment.addedPath;
      if (crossedPath.broken) {
        const measurement = measure.pathExtents(segment.absolutePath);
        atlas.pathMap[newRouteKey] = measurement;
        atlas.modelsMeasured = false;
      } else {
        atlas.pathMap[newRouteKey] = savedMeasurement;
      }
    };
    const checkAddSegment = (modelContext, pathIdBase, segment) => {
      if (segment.isInside && includeInside || !segment.isInside && includeOutside) {
        addSegment(modelContext, pathIdBase, segment);
      } else {
        atlas.modelsMeasured = false;
        trackDeleted(
          segment.absolutePath,
          crossedPath.routeKey,
          `segment is ${segment.isInside ? "inside" : "outside"} intersectionPoints=${JSON.stringify(segment.uniqueForeignIntersectionPoints)}`
        );
      }
    };
    const savedMeasurement = atlas.pathMap[crossedPath.routeKey];
    delete crossedPath.modelContext.paths[crossedPath.pathId];
    delete atlas.pathMap[crossedPath.routeKey];
    crossedPath.segments.forEach((segment) => {
      if (segment.duplicate) {
        if (keepDuplicates) {
          addSegment(crossedPath.modelContext, crossedPath.pathId, segment);
        } else {
          trackDeleted(segment.absolutePath, crossedPath.routeKey, "segment is duplicate");
        }
      } else {
        checkAddSegment(crossedPath.modelContext, crossedPath.pathId, segment);
      }
    });
  }
  function combine(modelA, modelB, includeAInsideB = false, includeAOutsideB = true, includeBInsideA = false, includeBOutsideA = true, options) {
    const opts = {
      trimDeadEnds: true,
      pointMatchingDistance: DEFAULT_POINT_MATCHING_DISTANCE,
      out_deleted: [{ paths: {} }, { paths: {} }]
    };
    extendObject(opts, options);
    opts.measureA = opts.measureA || new measure.Atlas(modelA);
    opts.measureB = opts.measureB || new measure.Atlas(modelB);
    opts.measureA.measureModels();
    opts.measureB.measureModels();
    if (!opts.farPoint) {
      const measureBoth = measure.increase(
        measure.increase({ high: [null, null], low: [null, null] }, opts.measureA.modelMap[""]),
        opts.measureB.modelMap[""]
      );
      opts.farPoint = add(measureBoth.high, [1, 1]);
    }
    const pathsA = breakAllPathsAtIntersections(modelA, modelB, true, opts.measureA, opts.measureB, opts.farPoint);
    const pathsB = breakAllPathsAtIntersections(modelB, modelA, true, opts.measureB, opts.measureA, opts.farPoint);
    checkForEqualOverlaps(pathsA.overlappedSegments, pathsB.overlappedSegments, opts.pointMatchingDistance || DEFAULT_POINT_MATCHING_DISTANCE);
    const trackDeleted = (which, deletedPath, routeKey, reason) => {
      addPath(opts.out_deleted[which], deletedPath, "deleted");
      const removed = deletedPath;
      removed.reason = reason;
      removed.routeKey = routeKey;
    };
    pathsA.crossedPaths.forEach((crossedPath) => {
      addOrDeleteSegments(crossedPath, includeAInsideB, includeAOutsideB, true, opts.measureA, (p, id, reason) => trackDeleted(0, p, id, reason));
    });
    pathsB.crossedPaths.forEach((crossedPath) => {
      addOrDeleteSegments(crossedPath, includeBInsideA, includeBOutsideA, false, opts.measureB, (p, id, reason) => trackDeleted(1, p, id, reason));
    });
    const result = { models: { a: modelA, b: modelB } };
    if (opts.trimDeadEnds) {
      let shouldKeep;
      if (!includeAInsideB && !includeBInsideA) {
        shouldKeep = (walkedPath) => {
          return !pathsA.overlappedSegments.some((segment) => segment.duplicate && walkedPath.pathContext === segment.addedPath);
        };
      }
      removeDeadEnds(result, null, shouldKeep, (wp, reason) => {
        const which = wp.route[1] === "a" ? 0 : 1;
        trackDeleted(which, wp.pathContext, wp.routeKey, reason);
      });
    }
    extendObject(options, opts);
    return result;
  }
  class Text {
    /**
     * Renders text in a given font to a model.
     * @param font OpenType.Font object.
     * @param text String of text to render.
     * @param fontSize Font size.
     * @param combine Flag (default false) to perform a combineUnion upon each character with characters to the left and right.
     * @param centerCharacterOrigin Flag (default false) to move the x origin of each character to the center. Useful for rotating text characters.
     * @param bezierAccuracy Optional accuracy of Bezier curves.
     * @param opentypeOptions Optional opentype.RenderOptions object.
     * @returns Model of the text.
     */
    constructor(font, text, fontSize, combine$1 = false, centerCharacterOrigin = false, bezierAccuracy, opentypeOptions) {
      this.models = {};
      let charIndex = 0;
      let prevDeleted;
      let prevChar;
      const cb = (glyph, x, y, _fontSize, options) => {
        const charModel = Text.glyphToModel(glyph, _fontSize, bezierAccuracy);
        charModel.origin = [x, 0];
        if (centerCharacterOrigin && (charModel.paths || charModel.models)) {
          const m = modelExtents(charModel);
          if (m) {
            const w = m.high[0] - m.low[0];
            originate(charModel, [m.low[0] + w / 2, 0]);
          }
        }
        if (combine$1 && charIndex > 0) {
          const combineOptions = {};
          let prev;
          if (prevDeleted) {
            prev = {
              models: {
                deleted: prevDeleted,
                char: prevChar
              }
            };
          } else {
            prev = prevChar;
          }
          combine(prev, charModel, false, true, false, true, combineOptions);
          prevDeleted = combineOptions.out_deleted[1];
        }
        this.models[charIndex] = charModel;
        charIndex++;
        prevChar = charModel;
      };
      font.forEachGlyph(text, 0, 0, fontSize, opentypeOptions, cb);
    }
    /**
     * Convert an opentype glyph to a model.
     * @param glyph Opentype.Glyph object.
     * @param fontSize Font size.
     * @param bezierAccuracy Optional accuracy of Bezier curves.
     * @returns Model of the glyph.
     */
    static glyphToModel(glyph, fontSize, bezierAccuracy) {
      const charModel = {};
      let firstPoint;
      let currPoint;
      let pathCount = 0;
      function addPath2(p2) {
        if (!charModel.paths) {
          charModel.paths = {};
        }
        charModel.paths["p_" + ++pathCount] = p2;
      }
      function addModel2(m) {
        if (!charModel.models) {
          charModel.models = {};
        }
        charModel.models["p_" + ++pathCount] = m;
      }
      const p = glyph.getPath(0, 0, fontSize);
      p.commands.map((command, i) => {
        const points = [[command.x, command.y], [command.x1, command.y1], [command.x2, command.y2]].map(
          (p2) => {
            if (p2[0] !== void 0) {
              return mirror(p2, false, true);
            }
          }
        );
        switch (command.type) {
          case "M":
            firstPoint = points[0];
            break;
          case "Z":
            points[0] = firstPoint;
          //fall through to line
          case "L":
            if (!isPointEqual(currPoint, points[0])) {
              addPath2(new Line(currPoint, points[0]));
            }
            break;
          case "C":
            addModel2(new BezierCurve(currPoint, points[1], points[2], points[0], bezierAccuracy));
            break;
          case "Q":
            addModel2(new BezierCurve(currPoint, points[1], points[0], bezierAccuracy));
            break;
        }
        currPoint = points[0];
      });
      return charModel;
    }
  }
  Text.metaParameters = [
    { title: "font", type: "font", value: "*" },
    { title: "text", type: "text", value: "Hello" },
    { title: "font size", type: "range", min: 10, max: 200, value: 72 },
    { title: "combine", type: "bool", value: false },
    { title: "center character origin", type: "bool", value: false }
  ];
  function pipe(value2, ...fns) {
    if (fns.length === 0) return value2;
    return fns.reduce((acc, fn) => fn(acc), value2);
  }
  function compose(...fns) {
    return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
  }
  const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null
  }, Symbol.toStringTag, { value: "Module" }));
  function toJson(itemToExport, options = {}) {
    function replacer(key, value2) {
      if (isNumber(value2)) {
        const newValue = round(value2, options.accuracy);
        return newValue;
      }
      if (isPoint(value2)) {
        const newPoint = rounded(value2, options.accuracy);
        return newPoint;
      }
      return value2;
    }
    return JSON.stringify(itemToExport, options.accuracy && replacer, options.indentation);
  }
  function tryGetModelUnits(itemToExport) {
    if (isModel(itemToExport)) {
      return itemToExport.units;
    }
  }
  const colors = {
    black: 0,
    red: 1,
    yellow: 2,
    lime: 3,
    aqua: 4,
    blue: 5,
    fuchsia: 6,
    white: 7,
    gray: 9,
    maroon: 14,
    orange: 30,
    olive: 58,
    green: 94,
    teal: 134,
    navy: 174,
    purple: 214,
    silver: 254
  };
  class XmlTag {
    constructor(name2, attrs) {
      this.name = name2;
      this.attrs = attrs;
      this.innerText = "";
    }
    /** Escapes certain characters within a string so that it can appear in a tag or its attribute. */
    static escapeString(value2) {
      const escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      };
      for (const code in escape) {
        value2 = value2.split(code).join(escape[code]);
      }
      return value2;
    }
    /** Get the opening tag. */
    getOpeningTag(selfClose) {
      let attrs = "";
      const outputAttr = (attrName, attrValue) => {
        if (attrValue == null || typeof attrValue === "undefined") return;
        if (Array.isArray(attrValue) || typeof attrValue === "object") {
          attrValue = JSON.stringify(attrValue);
        }
        if (typeof attrValue === "string") {
          attrValue = XmlTag.escapeString(attrValue);
        }
        attrs += " " + attrName + '="' + attrValue + '"';
      };
      for (const name2 in this.attrs) {
        outputAttr(name2, this.attrs[name2]);
      }
      return "<" + this.name + attrs + (selfClose ? "/" : "") + ">";
    }
    /** Get the inner text. */
    getInnerText() {
      if (this.innerTextEscaped) {
        return this.innerText;
      } else {
        return XmlTag.escapeString(this.innerText);
      }
    }
    /** Get the closing tag. */
    getClosingTag() {
      return "</" + this.name + ">";
    }
    /** Output the entire tag as a string. */
    toString() {
      const selfClose = !this.innerText;
      if (selfClose && !this.closingTags) {
        return this.getOpeningTag(true);
      } else {
        return this.getOpeningTag(false) + this.getInnerText() + this.getClosingTag();
      }
    }
  }
  function svgCoords(p) {
    return mirror(p, false, true);
  }
  function correctArc(arc) {
    const arcSpan = ofArcSpan(arc);
    arc.startAngle = noRevolutions(arc.startAngle);
    arc.endAngle = arc.startAngle + arcSpan;
  }
  function startSvgPathData(start, d, accuracy) {
    return ["M", round(start[0], accuracy), round(start[1], accuracy)].concat(d);
  }
  function svgArcData(d, radius, endPoint, accuracy, largeArc, increasing) {
    const r = round(radius, accuracy);
    const end = endPoint;
    d.push(r, r);
    d.push(0);
    d.push(largeArc ? 1 : 0);
    d.push(increasing ? 0 : 1);
    d.push(round(end[0], accuracy), round(end[1], accuracy));
  }
  function svgCircleData(radius, accuracy, clockwiseCircle) {
    const r = round(radius, accuracy);
    const d = ["m", -r, 0];
    function halfCircle(sign) {
      d.push("a");
      svgArcData(d, r, [2 * r * sign, 0], accuracy, false, !clockwiseCircle);
    }
    halfCircle(1);
    halfCircle(-1);
    d.push("z");
    return d;
  }
  function svgBezierData(d, seed, accuracy, reversed) {
    if (seed.controls.length === 1) {
      d.push("Q", round(seed.controls[0][0], accuracy), round(seed.controls[0][1], accuracy));
    } else {
      const controls = reversed ? [seed.controls[1], seed.controls[0]] : seed.controls;
      d.push(
        "C",
        round(controls[0][0], accuracy),
        round(controls[0][1], accuracy),
        round(controls[1][0], accuracy),
        round(controls[1][1], accuracy)
      );
    }
    const final = reversed ? seed.origin : seed.end;
    d.push(round(final[0], accuracy), round(final[1], accuracy));
  }
  const svgPathDataMap = {};
  svgPathDataMap[pathType.Line] = function(line, accuracy) {
    const e = rounded(line.end, accuracy);
    const d = ["L", e[0], e[1]];
    return startSvgPathData(line.origin, d, accuracy);
  };
  svgPathDataMap[pathType.Circle] = function(circle, accuracy, clockwiseCircle) {
    return startSvgPathData(circle.origin, svgCircleData(circle.radius, accuracy, clockwiseCircle), accuracy);
  };
  svgPathDataMap[pathType.Arc] = function(arc, accuracy) {
    correctArc(arc);
    const arcPoints = fromArc(arc);
    if (isPointEqual(arcPoints[0], arcPoints[1])) {
      return svgPathDataMap[pathType.Circle](arc, accuracy);
    } else {
      const d = ["A"];
      svgArcData(
        d,
        arc.radius,
        arcPoints[1],
        accuracy,
        ofArcSpan(arc) > 180,
        arc.startAngle > arc.endAngle
      );
      return startSvgPathData(arcPoints[0], d, accuracy);
    }
  };
  svgPathDataMap[pathType.BezierSeed] = function(seed, accuracy) {
    const d = [];
    svgBezierData(d, seed, accuracy);
    return startSvgPathData(seed.origin, d, accuracy);
  };
  function pathToSVGPathData(pathToExport, pathOffset, exportOffset, accuracy = 1e-3, clockwiseCircle) {
    const fn = svgPathDataMap[pathToExport.type];
    if (!fn) return "";
    let fixedPath = clone$1(pathToExport);
    fixedPath = moveRelative(fixedPath, pathOffset);
    fixedPath = mirror$1(fixedPath, false, true);
    moveRelative(fixedPath, exportOffset);
    const d = fn(fixedPath, accuracy, clockwiseCircle);
    return d.join(" ");
  }
  const chainLinkToPathDataMap = {};
  chainLinkToPathDataMap[pathType.Arc] = function(arc, endPoint, reversed, d, accuracy) {
    d.push("A");
    svgArcData(
      d,
      arc.radius,
      endPoint,
      accuracy,
      ofArcSpan(arc) > 180,
      reversed ? arc.startAngle > arc.endAngle : arc.startAngle < arc.endAngle
    );
  };
  chainLinkToPathDataMap[pathType.Line] = function(_line, endPoint, _reversed, d, accuracy) {
    d.push("L", round(endPoint[0], accuracy), round(endPoint[1], accuracy));
  };
  chainLinkToPathDataMap[pathType.BezierSeed] = function(seed, _endPoint, reversed, d, accuracy) {
    svgBezierData(d, seed, accuracy, reversed);
  };
  function chainToSVGPathData(chain2, offset, accuracy = 1e-3) {
    const offsetPoint = (p) => add(p, offset);
    const first = chain2.links[0];
    const firstPoint = offsetPoint(svgCoords(first.endPoints[first.reversed ? 1 : 0]));
    const d = ["M", round(firstPoint[0], accuracy), round(firstPoint[1], accuracy)];
    for (let i = 0; i < chain2.links.length; i++) {
      const link = chain2.links[i];
      const pathContext = link.walkedPath.pathContext;
      const fn = chainLinkToPathDataMap[pathContext.type];
      if (!fn) continue;
      let fixedPath = clone$1(pathContext);
      fixedPath = moveRelative(fixedPath, link.walkedPath.offset);
      fixedPath = mirror$1(fixedPath, false, true);
      moveRelative(fixedPath, offset);
      fn(
        fixedPath,
        offsetPoint(svgCoords(link.endPoints[link.reversed ? 0 : 1])),
        link.reversed,
        d,
        accuracy
      );
    }
    if (chain2.endless) {
      d.push("Z");
    }
    return d.join(" ");
  }
  function parseNumericList(s) {
    var result = [];
    var re = /-?(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var matches;
    while ((matches = re.exec(s)) !== null) {
      if (matches.index === re.lastIndex) {
        re.lastIndex++;
      }
      if (matches[0] !== "") result.push(parseFloat(matches[0]));
    }
    return result;
  }
  const importer$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    parseNumericList
  }, Symbol.toStringTag, { value: "Module" }));
  const models$1 = typeof Photon !== "undefined" && Photon.models ? Photon.models : {};
  function fromSVGPathData(pathData, options = {}) {
    const result = {};
    let pathCount = 0;
    const addPath2 = (p) => {
      if (!result.paths) result.paths = {};
      result.paths["p_" + ++pathCount] = p;
    };
    const addModel2 = (m) => {
      if (!result.models) result.models = {};
      result.models["p_" + ++pathCount] = m;
    };
    const getPoint = (cmd, offset = 0, from = cmd.from) => {
      if (offset < 0) offset = offset + cmd.data.length;
      const p = mirror([cmd.data[0 + offset], cmd.data[1 + offset]], false, true);
      return cmd.absolute ? p : add(p, from);
    };
    const lineTo = (cmd, end) => {
      if (!isPointEqual(cmd.from, end)) {
        addPath2(new Line(cmd.from, end));
      }
      return end;
    };
    const map2 = {};
    let firstPoint = [0, 0];
    map2["M"] = (cmd) => {
      firstPoint = getPoint(cmd);
      if (cmd.data.length > 2) {
        cmd.from = firstPoint;
        for (let a = 2; a < cmd.data.length; a += 2) {
          cmd.from = lineTo(cmd, getPoint(cmd, a));
        }
        return cmd.from;
      }
      return firstPoint;
    };
    map2["Z"] = (cmd) => lineTo(cmd, firstPoint);
    map2["H"] = (cmd) => {
      const end = clone(cmd.from);
      if (cmd.absolute) {
        end[0] = cmd.data[0];
      } else {
        end[0] += cmd.data[0];
      }
      return lineTo(cmd, end);
    };
    map2["V"] = (cmd) => {
      const end = clone(cmd.from);
      if (cmd.absolute) {
        end[1] = -cmd.data[0];
      } else {
        end[1] -= cmd.data[0];
      }
      return lineTo(cmd, end);
    };
    map2["L"] = (cmd) => {
      let end = cmd.from;
      for (let a = 0; a < cmd.data.length; a += 2) {
        end = getPoint(cmd, a);
        cmd.from = lineTo(cmd, end);
      }
      return cmd.from;
    };
    map2["A"] = (cmd) => {
      let rx, ry, rotation, large, decreasing;
      let end = cmd.from;
      let elliptic;
      let xAxis;
      let arc;
      let scaleUp;
      let e;
      for (let a = 0; a < cmd.data.length; a += 7) {
        rx = cmd.data[0 + a];
        ry = cmd.data[1 + a];
        rotation = cmd.data[2 + a];
        large = cmd.data[3 + a] === 1;
        decreasing = cmd.data[4 + a] === 1;
        end = getPoint(cmd, 5 + a);
        elliptic = rx !== ry;
        xAxis = new Line(cmd.from, rotate(end, rotation, cmd.from));
        if (elliptic) {
          xAxis = distort$1(xAxis, 1, rx / ry);
        }
        arc = new Arc(xAxis.origin, xAxis.end, rx, large, decreasing);
        if (elliptic) {
          if (rx < arc.radius) {
            scaleUp = arc.radius / rx;
            rx *= scaleUp;
            ry *= scaleUp;
          }
          e = new models$1.EllipticArc(arc, 1, ry / rx, options.bezierAccuracy);
          rotate$2(e, -rotation, cmd.from);
          addModel2(e);
        } else {
          rotate$1(arc, -rotation, cmd.from);
          addPath2(arc);
        }
        cmd.from = end;
      }
      return end;
    };
    map2["C"] = (cmd) => {
      let control1, control2;
      let start = cmd.from;
      let end = start;
      for (let a = 0; a < cmd.data.length; a += 6) {
        cmd.from = start;
        control1 = getPoint(cmd, 0 + a, start);
        control2 = getPoint(cmd, 2 + a, start);
        end = getPoint(cmd, 4 + a, start);
        addModel2(new models$1.BezierCurve(start, control1, control2, end, options.bezierAccuracy));
        start = end;
      }
      return end;
    };
    map2["S"] = (cmd) => {
      let control1, prevControl2, control2;
      let start = cmd.from;
      let end = start;
      if (cmd.prev && (cmd.prev.command === "C" || cmd.prev.command === "S")) {
        prevControl2 = getPoint(cmd.prev, -4);
      } else {
        prevControl2 = cmd.from;
      }
      for (let a = 0; a < cmd.data.length; a += 4) {
        cmd.from = start;
        control1 = rotate(prevControl2, 180, start);
        control2 = getPoint(cmd, 0 + a);
        end = getPoint(cmd, 2 + a);
        addModel2(new models$1.BezierCurve(start, control1, control2, end, options.bezierAccuracy));
        start = end;
        prevControl2 = control2;
      }
      return end;
    };
    map2["Q"] = (cmd) => {
      let control;
      let start = cmd.from;
      let end = start;
      for (let a = 0; a < cmd.data.length; a += 4) {
        cmd.from = start;
        control = getPoint(cmd, 0 + a);
        end = getPoint(cmd, 2 + a);
        addModel2(new models$1.BezierCurve(start, control, end, options.bezierAccuracy));
        start = end;
      }
      return end;
    };
    map2["T"] = (cmd) => {
      let control;
      let prevControl;
      let end = cmd.from;
      if (cmd.prev && cmd.prev.command === "Q") {
        prevControl = getPoint(cmd.prev, -4);
        control = rotate(prevControl, 180, cmd.from);
      } else if (cmd.prev && cmd.prev.command === "T") {
        cmd.prev.absolute = true;
        control = getPoint(cmd.prev, -2);
      } else {
        control = cmd.from;
      }
      for (let a = 0; a < cmd.data.length; a += 2) {
        end = getPoint(cmd, 0 + a);
        addModel2(new models$1.BezierCurve(cmd.from, control, end, options.bezierAccuracy));
        cmd.from = end;
        control = rotate(control, 180, cmd.from);
      }
      const p = mirror(control, false, true);
      cmd.data.push(p[0], p[1]);
      return end;
    };
    let currPoint = [0, 0];
    let prevCommand;
    const regexpCommands = /([achlmqstvz])([0-9e\.,\+-\s]*)/ig;
    let commandMatches;
    while ((commandMatches = regexpCommands.exec(pathData)) !== null) {
      if (commandMatches.index === regexpCommands.lastIndex) {
        regexpCommands.lastIndex++;
      }
      const command = commandMatches[1];
      const dataString = commandMatches[2];
      const currCmd = {
        command: command.toUpperCase(),
        data: [],
        from: currPoint,
        prev: prevCommand
      };
      if (command === currCmd.command) currCmd.absolute = true;
      currCmd.data = parseNumericList(dataString);
      const fn = map2[currCmd.command];
      if (fn) currPoint = fn(currCmd);
      prevCommand = currCmd;
    }
    return result;
  }
  function getPathDataByLayer(modelToExport, offset, options, accuracy = 1e-3) {
    const pathDataByLayer = {};
    options.unifyBeziers = true;
    findChains$1(
      modelToExport,
      function(chains, loose, layer2) {
        function single(walkedPath, clockwise) {
          const pathData = pathToSVGPathData(walkedPath.pathContext, walkedPath.offset, offset, accuracy, clockwise);
          pathDataByLayer[layer2].push(pathData);
        }
        pathDataByLayer[layer2] = [];
        function doChains(cs, clockwise) {
          cs.forEach(function(c) {
            if (c.links.length > 1) {
              const pathData = chainToSVGPathData(c, offset, accuracy);
              pathDataByLayer[layer2].push(pathData);
            } else {
              single(c.links[0].walkedPath, clockwise);
            }
            if (c.contains) {
              doChains(c.contains, !clockwise);
            }
          });
        }
        doChains(chains, true);
        loose.forEach((wp) => single(wp));
      },
      options
    );
    return pathDataByLayer;
  }
  function toSVGPathData(modelToExport, ...args) {
    const options = {
      fillRule: "evenodd"
    };
    if (typeof args[0] === "boolean") {
      options.byLayers = args[0];
      options.origin = args[1];
      options.accuracy = args[2];
    } else if (isObject(args[0])) {
      extendObject(options, args[0]);
    }
    const findChainsOptions = {
      byLayers: options.byLayers,
      contain: false
    };
    if (options.fillRule === "nonzero") {
      findChainsOptions.contain = {
        alternateDirection: true
      };
    }
    const size = modelExtents(modelToExport);
    if (!options.origin) {
      options.origin = [-size.low[0], size.high[1]];
    }
    const pathDataArrayByLayer = getPathDataByLayer(modelToExport, options.origin, findChainsOptions, options.accuracy);
    const pathDataStringByLayer = {};
    for (const layer2 in pathDataArrayByLayer) {
      pathDataStringByLayer[layer2] = pathDataArrayByLayer[layer2].join(" ");
    }
    return findChainsOptions.byLayers ? pathDataStringByLayer : pathDataStringByLayer[""];
  }
  const svgUnit = {
    [unitType.Inch]: { svgUnitType: "in", scaleConversion: 1 },
    [unitType.Millimeter]: { svgUnitType: "mm", scaleConversion: 1 },
    [unitType.Centimeter]: { svgUnitType: "cm", scaleConversion: 1 },
    [unitType.Foot]: { svgUnitType: "in", scaleConversion: 12 },
    [unitType.Meter]: { svgUnitType: "cm", scaleConversion: 100 }
  };
  function cssStyle(elOpts) {
    const a = [];
    const push = (name2, val) => {
      if (val === void 0) return;
      a.push(name2 + ":" + val);
    };
    push("stroke", elOpts.stroke);
    push("stroke-width", elOpts.strokeWidth);
    push("fill", elOpts.fill);
    return a.join(";");
  }
  function addSvgAttrs(attrs, elOpts) {
    if (!elOpts) return;
    extendObject(attrs, {
      stroke: elOpts.stroke,
      "stroke-width": elOpts.strokeWidth,
      fill: elOpts.fill,
      style: elOpts.cssStyle || cssStyle(elOpts),
      class: elOpts.className
    });
  }
  function colorLayerOptions(layer2, layerOptions) {
    if (layerOptions && layerOptions[layer2]) return layerOptions[layer2];
    if (layer2 in colors) {
      return { stroke: layer2 };
    }
  }
  function toSVG(itemToExport, options = {}) {
    const opts = {
      accuracy: 1e-3,
      annotate: false,
      origin: null,
      scale: 1,
      stroke: "#000",
      strokeWidth: "0.25mm",
      fill: "none",
      fillRule: "evenodd",
      fontSize: "9pt",
      useSvgPathOnly: true,
      viewBox: true,
      scalingStroke: false,
      ...options
    };
    let modelToExport;
    const itemIsModel = isModel(itemToExport);
    if (itemIsModel) {
      modelToExport = itemToExport;
    } else if (Array.isArray(itemToExport)) {
      const pathMap = {};
      itemToExport.forEach((p, i) => {
        pathMap[String(i)] = p;
      });
      modelToExport = { paths: pathMap };
    } else if (isPath(itemToExport)) {
      modelToExport = { paths: { modelToMeasure: itemToExport } };
    } else {
      return "";
    }
    if (!opts.units) {
      const unitSystem = tryGetModelUnits(itemToExport);
      if (unitSystem) opts.units = unitSystem;
    }
    const useSvgUnit = opts.units ? svgUnit[opts.units] : void 0;
    const size = modelExtents(modelToExport);
    if (!opts.origin) {
      if (size) {
        const scale2 = opts.scale ?? 1;
        const left = -size.low[0] * scale2;
        opts.origin = [left, size.high[1] * scale2];
      } else {
        opts.origin = [0, 0];
      }
    }
    const captionsForSizing = getAllCaptionsOffset(modelToExport);
    if (captionsForSizing && captionsForSizing.length && size) {
      captionsForSizing.forEach((c) => {
        increase(size, pathExtents(c.anchor), true);
      });
    }
    const elements = [];
    let svgAttrs = {};
    if (size && opts.viewBox) {
      let scaleFactor = opts.scale ?? 1;
      if (useSvgUnit && opts.viewBox) {
        scaleFactor *= useSvgUnit.scaleConversion;
      }
      const width = round(size.width * scaleFactor, opts.accuracy);
      const height = round(size.height * scaleFactor, opts.accuracy);
      const viewBox = [0, 0, width, height];
      const unit = useSvgUnit ? useSvgUnit.svgUnitType : "";
      svgAttrs = {
        width: String(width) + unit,
        height: String(height) + unit,
        viewBox: viewBox.join(" ")
      };
    }
    svgAttrs["xmlns"] = "http://www.w3.org/2000/svg";
    const svgTag = new XmlTag("svg", extendObject(svgAttrs, opts.svgAttrs));
    elements.push(svgTag.getOpeningTag(false));
    const groupAttrs = {
      id: "svgGroup",
      "stroke-linecap": "round",
      "fill-rule": opts.fillRule,
      "font-size": opts.fontSize
    };
    addSvgAttrs(groupAttrs, opts);
    const svgGroup = new XmlTag("g", groupAttrs);
    elements.push(svgGroup.getOpeningTag(false));
    const captions = getAllCaptionsOffset(modelToExport);
    if (opts.useSvgPathOnly) {
      const findChainsOptions = { byLayers: true };
      if (opts.fillRule === "nonzero") {
        findChainsOptions.contain = { alternateDirection: true };
      }
      const pathDataByLayer = getPathDataByLayer(modelToExport, opts.origin, findChainsOptions, opts.accuracy);
      for (const layerId in pathDataByLayer) {
        const pathData = pathDataByLayer[layerId].join(" ");
        const attrs = { d: pathData };
        if (layerId.length > 0) {
          attrs.id = layerId;
        }
        addSvgAttrs(attrs, colorLayerOptions(layerId, opts.layerOptions));
        const pathTag = new XmlTag("path", attrs);
        elements.push(pathTag.toString());
      }
    } else {
      const layers = {};
      const append = (value2, layer2, forcePush = false) => {
        if (!forcePush && typeof layer2 === "string" && layer2.length > 0) {
          if (!(layer2 in layers)) layers[layer2] = [];
          layers[layer2].push(value2);
        } else {
          elements.push(value2);
        }
      };
      const addSvgAttrsLocal = (attrs, layer2) => {
        addSvgAttrs(attrs, colorLayerOptions(layer2, opts.layerOptions));
        if (!opts.scalingStroke) {
          attrs["vector-effect"] = "non-scaling-stroke";
        }
      };
      const createElementLocal = (tagname, attrs, layer2, innerText = null, forcePush = false) => {
        if (tagname !== "text") {
          addSvgAttrsLocal(attrs, layer2);
        }
        const tag = new XmlTag(tagname, attrs);
        if (innerText) tag.innerText = innerText;
        append(tag.toString(), layer2, forcePush);
      };
      const fixPoint = (p) => {
        const mirrored = mirror(p, false, true);
        return scale(mirrored, opts.scale ?? 1);
      };
      const fixPath = (p, origin) => {
        const mirrorY = mirror$1(p, false, true);
        const scaled = scale$1(mirrorY, opts.scale ?? 1);
        return moveRelative(scaled, origin);
      };
      const svgArcData2 = (d, radius, endPoint, accuracy = 1e-3, largeArc, increasing) => {
        const r = round(radius, accuracy);
        d.push(r, r);
        d.push(0);
        d.push(largeArc ? 1 : 0);
        d.push(increasing ? 0 : 1);
        d.push(round(endPoint[0], accuracy), round(endPoint[1], accuracy));
      };
      const svgBezierData2 = (d, seed, accuracy = 1e-3, reversed) => {
        if (seed.controls.length === 1) {
          d.push("Q", round(seed.controls[0][0], accuracy), round(seed.controls[0][1], accuracy));
        } else {
          const controls = seed.controls;
          d.push(
            "C",
            round(controls[0][0], accuracy),
            round(controls[0][1], accuracy),
            round(controls[1][0], accuracy),
            round(controls[1][1], accuracy)
          );
        }
        const final = seed.end;
        d.push(round(final[0], accuracy), round(final[1], accuracy));
      };
      const drawText = (id, textPoint, layer2) => {
        createElementLocal("text", {
          id: id + "_text",
          x: round(textPoint[0], opts.accuracy),
          y: round(textPoint[1], opts.accuracy)
        }, layer2, id);
      };
      const drawPath = (id, x, y, d, layer2, route, textPoint, annotate) => {
        const attrs = {
          id,
          d: ["M", round(x, opts.accuracy), round(y, opts.accuracy)].concat(d).join(" ")
        };
        if (route) attrs["data-route"] = route;
        createElementLocal("path", attrs, layer2);
        if (annotate) drawText(id, textPoint, layer2);
      };
      const addFlowMarks = (flow, layer2, origin, end, endAngle) => {
        if (!flow) return;
        const className = "flow";
        createElementLocal("circle", {
          r: flow.size / 2,
          cx: round(origin[0], opts.accuracy),
          cy: round(origin[1], opts.accuracy),
          class: className
        }, layer2);
        const arrowEnd = [-1 * flow.size, flow.size / 2];
        const p1 = add(rotate(arrowEnd, endAngle), end);
        const p2 = mirror(arrowEnd, false, true);
        const p2r = add(rotate(p2, endAngle), end);
        createElementLocal("line", {
          x1: round(p1[0], opts.accuracy),
          y1: round(p1[1], opts.accuracy),
          x2: round(end[0], opts.accuracy),
          y2: round(end[1], opts.accuracy),
          class: className
        }, layer2);
        createElementLocal("line", {
          x1: round(p2r[0], opts.accuracy),
          y1: round(p2r[1], opts.accuracy),
          x2: round(end[0], opts.accuracy),
          y2: round(end[1], opts.accuracy),
          class: className
        }, layer2);
      };
      const map2 = {};
      map2[pathType.Line] = (id, line, layer2, className, route, annotate) => {
        const start = line.origin;
        const end = line.end;
        const attrs = {
          id,
          x1: round(start[0], opts.accuracy),
          y1: round(start[1], opts.accuracy),
          x2: round(end[0], opts.accuracy),
          y2: round(end[1], opts.accuracy)
        };
        if (className) attrs.class = className;
        if (route) attrs["data-route"] = route;
        createElementLocal("line", attrs, layer2);
        if (annotate) drawText(id, middle(line), layer2);
        if (opts.flow) addFlowMarks(opts.flow, layer2, line.origin, line.end, ofLineInDegrees(line));
      };
      map2[pathType.Circle] = (id, circle, layer2, className, route, annotate) => {
        const center2 = circle.origin;
        const attrs = {
          id,
          r: circle.radius,
          cx: round(center2[0], opts.accuracy),
          cy: round(center2[1], opts.accuracy)
        };
        if (className) attrs.class = className;
        if (route) attrs["data-route"] = route;
        createElementLocal("circle", attrs, layer2);
        if (annotate) drawText(id, center2, layer2);
      };
      map2[pathType.Arc] = (id, arc, layer2, className, route, annotate) => {
        const arcSpan = ofArcSpan(arc);
        arc.startAngle = noRevolutions(arc.startAngle);
        arc.endAngle = arc.startAngle + arcSpan;
        const arcPoints = fromArc(arc);
        if (isPointEqual(arcPoints[0], arcPoints[1])) {
          map2[pathType.Circle](id, { origin: arc.origin, radius: arc.radius }, layer2, className, route, annotate);
        } else {
          const d = ["A"];
          svgArcData2(d, arc.radius, arcPoints[1], opts.accuracy, ofArcSpan(arc) > 180, arc.startAngle > arc.endAngle);
          drawPath(id, arcPoints[0][0], arcPoints[0][1], d, layer2, route, middle(arc), annotate);
          addFlowMarks(opts.flow, layer2, arcPoints[1], arcPoints[0], noRevolutions(arc.startAngle - 90));
        }
      };
      map2[pathType.BezierSeed] = (id, seed, layer2, className, route, annotate) => {
        const d = [];
        svgBezierData2(d, seed, opts.accuracy);
        drawPath(id, seed.origin[0], seed.origin[1], d, layer2, route, middle(seed), annotate);
      };
      const modelGroup = new XmlTag("g");
      const beginModel = (id, modelContext) => {
        modelGroup.attrs = { id };
        append(modelGroup.getOpeningTag(false), modelContext.layer);
      };
      const endModel = (modelContext) => {
        append(modelGroup.getClosingTag(), modelContext.layer);
      };
      beginModel("0", modelToExport);
      const walkOptions = {
        beforeChildWalk: (walkedModel) => {
          beginModel(walkedModel.childId, walkedModel.childModel);
          return true;
        },
        onPath: (walkedPath) => {
          const pctx = walkedPath.pathContext;
          const layer2 = walkedPath.layer;
          const offset = add(fixPoint(walkedPath.offset), opts.origin);
          const fixed = fixPath(pctx, offset);
          switch (pctx.type) {
            case pathType.Line:
              map2[pathType.Line](walkedPath.pathId, fixed, layer2, null, walkedPath.route, opts.annotate);
              break;
            case pathType.Circle:
              map2[pathType.Circle](walkedPath.pathId, fixed, layer2, null, walkedPath.route, opts.annotate);
              break;
            case pathType.Arc:
              map2[pathType.Arc](walkedPath.pathId, fixed, layer2, null, walkedPath.route, opts.annotate);
              break;
            case pathType.BezierSeed:
              map2[pathType.BezierSeed](walkedPath.pathId, fixed, layer2, null, walkedPath.route, opts.annotate);
              break;
            default:
              const d = pathToSVGPathData(pctx, walkedPath.offset, opts.origin, opts.accuracy);
              const attrs = { id: walkedPath.pathId, d };
              createElementLocal("path", attrs, layer2);
              break;
          }
        },
        afterChildWalk: (walkedModel) => {
          endModel(walkedModel.childModel);
        }
      };
      walk(modelToExport, walkOptions);
      for (const layerId in layers) {
        const layerGroup = new XmlTag("g", { id: layerId });
        addSvgAttrs(layerGroup.attrs, colorLayerOptions(layerId, opts.layerOptions));
        layerGroup.innerText = layers[layerId].join("");
        layerGroup.innerTextEscaped = true;
        elements.push(layerGroup.toString());
      }
      endModel(modelToExport);
      if (captions && captions.length) {
        const captionTags = captions.map((caption) => {
          const anchor = fixPath(caption.anchor, opts.origin);
          const center2 = rounded(middle(anchor), opts.accuracy);
          const tag = new XmlTag("text", {
            "alignment-baseline": "middle",
            "text-anchor": "middle",
            transform: `rotate(${ofLineInDegrees(anchor)},${center2[0]},${center2[1]})`,
            x: center2[0],
            y: center2[1]
          });
          addSvgAttrs(tag.attrs, colorLayerOptions(caption.layer, opts.layerOptions));
          tag.innerText = caption.text;
          return tag.toString();
        });
        if (captionTags.length) {
          const captionGroup = new XmlTag("g", { id: "captions" });
          addSvgAttrs(captionGroup.attrs, colorLayerOptions("captions", opts.layerOptions));
          captionGroup.innerText = captionTags.join("");
          captionGroup.innerTextEscaped = true;
          elements.push(captionGroup.toString());
        }
      }
    }
    elements.push(svgGroup.getClosingTag());
    elements.push(svgTag.getClosingTag());
    return elements.join("");
  }
  const svgEsm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    fromSVGPathData,
    svgUnit,
    toSVG,
    toSVGPathData
  }, Symbol.toStringTag, { value: "Module" }));
  const exporterIndex = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    colors,
    toJson,
    toSVG,
    toSVGPathData,
    tryGetModelUnits
  }, Symbol.toStringTag, { value: "Module" }));
  const propertyNamesMap = {};
  propertyNamesMap[pathType.Arc] = (_arc) => ["startAngle", "endAngle"];
  propertyNamesMap[pathType.Line] = (_line) => ["origin", "end"];
  function getPointProperties(pathToInspect) {
    const points = fromPathEnds(pathToInspect);
    if (!points) return null;
    const propertyNames = propertyNamesMap[pathToInspect.type]?.(pathToInspect);
    if (!propertyNames) return null;
    const pointProperty = (index) => ({
      point: points[index],
      propertyName: propertyNames[index]
    });
    return [pointProperty(0), pointProperty(1)];
  }
  function getMatchingPointProperties(pathA, pathB, _options) {
    const pathAProps = getPointProperties(pathA);
    const pathBProps = getPointProperties(pathB);
    if (!pathAProps || !pathBProps) return null;
    const makeMatch = (pathContext, props, index) => ({
      path: pathContext,
      isStart: index === 0,
      propertyName: props[index].propertyName,
      point: props[index].point,
      oppositePoint: props[1 - index].point
    });
    const check = (iA, iB) => {
      if (isPointEqual(pathAProps[iA].point, pathBProps[iB].point, 1e-4)) {
        return [makeMatch(pathA, pathAProps, iA), makeMatch(pathB, pathBProps, iB)];
      }
      return null;
    };
    return check(0, 0) || check(0, 1) || check(1, 0) || check(1, 1);
  }
  function populateShardPointsFromReferenceCircle(filletRadius, center2, properties, _options) {
    const referenceCircle = new Circle(center2, filletRadius);
    for (let i = 0; i < 2; i++) {
      const circleIntersection = intersection(referenceCircle, properties[i].path);
      if (!circleIntersection) return false;
      properties[i].shardPoint = circleIntersection.intersectionPoints[0];
      if (isPointEqual(properties[i].point, circleIntersection.intersectionPoints[0], 1e-4)) {
        if (circleIntersection.intersectionPoints.length > 1) {
          properties[i].shardPoint = circleIntersection.intersectionPoints[1];
        } else {
          return false;
        }
      }
    }
    return true;
  }
  function cloneAndBreakPath(pathToShard, shardPoint) {
    const shardStart = clone$1(pathToShard);
    const shardEnd = breakAtPoint(shardStart, shardPoint);
    return [shardStart, shardEnd];
  }
  const guidePathMap = {};
  guidePathMap[pathType.Arc] = (arc, filletRadius, nearPoint, shardPoint, isStart) => {
    let guideRadius = arc.radius;
    const guideArcShard = cloneAndBreakPath(arc, shardPoint)[isStart ? 0 : 1];
    if (!guideArcShard) return null;
    if (isArcConcaveTowardsPoint(guideArcShard, nearPoint)) {
      guideRadius -= filletRadius;
    } else {
      guideRadius += filletRadius;
    }
    if (round(guideRadius) <= 0) return null;
    return new Arc(arc.origin, guideRadius, arc.startAngle, arc.endAngle);
  };
  guidePathMap[pathType.Line] = (line, filletRadius, nearPoint) => new Parallel(line, filletRadius, nearPoint);
  function getGuidePath(context, filletRadius, nearPoint) {
    const fn = guidePathMap[context.path.type];
    return fn ? fn(context.path, filletRadius, nearPoint, context.shardPoint, context.isStart) : null;
  }
  const filletResultMap = {};
  filletResultMap[pathType.Arc] = (arc, propertyName, _filletRadius, filletCenter) => {
    const guideLine = new Line(arc.origin, filletCenter);
    const guideLineAngle = ofLineInDegrees(guideLine);
    let filletAngle = guideLineAngle;
    if (!isArcConcaveTowardsPoint(arc, filletCenter)) {
      filletAngle += 180;
    }
    return {
      filletAngle: noRevolutions(filletAngle),
      clipPath: () => {
        arc[propertyName] = guideLineAngle;
      }
    };
  };
  filletResultMap[pathType.Line] = (line, propertyName, _filletRadius, filletCenter) => {
    const guideLine = new Line([0, 0], [0, 1]);
    const lineAngle = ofLineInDegrees(line);
    rotate$1(guideLine, lineAngle, [0, 0]);
    moveRelative(guideLine, filletCenter);
    const intersectionPoint = fromSlopeIntersection(line, guideLine);
    if (!intersectionPoint) return null;
    return {
      filletAngle: ofPointInDegrees(filletCenter, intersectionPoint),
      clipPath: () => {
        line[propertyName] = intersectionPoint;
      }
    };
  };
  function getFilletResult(context, filletRadius, filletCenter) {
    const fn = filletResultMap[context.path.type];
    const result = fn ? fn(context.path, context.propertyName, filletRadius, filletCenter) : null;
    return testFilletResult(context, result) ? result : null;
  }
  function getDogboneResult(context, filletCenter) {
    const result = {
      filletAngle: ofPointInDegrees(filletCenter, context.shardPoint),
      clipPath: () => {
        context.path[context.propertyName] = context.shardPoint;
      }
    };
    return testFilletResult(context, result) ? result : null;
  }
  function testFilletResult(context, result) {
    if (!result) return false;
    const originalValue = context.path[context.propertyName];
    result.clipPath();
    const ok = pathLength(context.path) > 0;
    context.path[context.propertyName] = originalValue;
    return ok;
  }
  function getLineRatio(lines) {
    let totalLength = 0;
    const lengths = [];
    for (let i = 0; i < lines.length; i++) {
      const length = pathLength(lines[i]);
      lengths.push(length);
      totalLength += length;
    }
    return lengths[0] / totalLength;
  }
  function pathDogbone(lineA, lineB, filletRadius, options) {
    if (!isPathLine(lineA) || !isPathLine(lineB) || !filletRadius || filletRadius <= 0) return null;
    const opts = { pointMatchingDistance: 5e-3 };
    extendObject(opts, options);
    const commonProperty = getMatchingPointProperties(lineA, lineB);
    if (!commonProperty) return null;
    const ratio = getLineRatio([lineA, lineB]);
    const span = new Line(commonProperty[0].oppositePoint, commonProperty[1].oppositePoint);
    const midRatioPoint = middle(span, ratio);
    const bisectionAngle = ofPointInDegrees(commonProperty[0].point, midRatioPoint);
    const center2 = add(commonProperty[0].point, fromPolar(toRadians(bisectionAngle), filletRadius));
    if (!populateShardPointsFromReferenceCircle(filletRadius, center2, commonProperty)) return null;
    const results = [];
    for (let i = 0; i < 2; i++) {
      const result = getDogboneResult(commonProperty[i], center2);
      if (!result) return null;
      results.push(result);
    }
    const filletArc = new Arc(center2, filletRadius, results[0].filletAngle, results[1].filletAngle);
    if (round(noRevolutions(ofArcMiddle(filletArc))) === round(bisectionAngle)) {
      filletArc.startAngle = results[1].filletAngle;
      filletArc.endAngle = results[0].filletAngle;
    }
    results[0].clipPath();
    results[1].clipPath();
    return filletArc;
  }
  function pathFillet(pathA, pathB, filletRadius, options) {
    if (!pathA || !pathB || !filletRadius || filletRadius <= 0) return null;
    const opts = { pointMatchingDistance: 5e-3 };
    extendObject(opts, options);
    const commonProperty = getMatchingPointProperties(pathA, pathB);
    if (!commonProperty) return null;
    if (!populateShardPointsFromReferenceCircle(filletRadius, commonProperty[0].point, commonProperty)) return null;
    const guidePaths = [];
    for (let i = 0; i < 2; i++) {
      const otherPathShardPoint = commonProperty[1 - i].shardPoint;
      if (!otherPathShardPoint) return null;
      const guidePath = getGuidePath(commonProperty[i], filletRadius, otherPathShardPoint);
      guidePaths.push(guidePath);
    }
    const intersectionPoint = intersection(guidePaths[0], guidePaths[1]);
    if (!intersectionPoint) return null;
    let center2;
    if (intersectionPoint.intersectionPoints.length === 1) {
      center2 = intersectionPoint.intersectionPoints[0];
    } else {
      center2 = closest(commonProperty[0].point, intersectionPoint.intersectionPoints);
    }
    const results = [];
    for (let i = 0; i < 2; i++) {
      const result = getFilletResult(commonProperty[i], filletRadius, center2);
      if (!result) return null;
      results.push(result);
    }
    if (round(results[0].filletAngle - results[1].filletAngle) === 0) return null;
    const filletArc = new Arc(center2, filletRadius, results[0].filletAngle, results[1].filletAngle);
    const filletSpan = ofArcSpan(filletArc);
    if (filletSpan === 180) return null;
    if (filletSpan > 180) {
      filletArc.startAngle = results[1].filletAngle;
      filletArc.endAngle = results[0].filletAngle;
    }
    results[0].clipPath();
    results[1].clipPath();
    return filletArc;
  }
  const filletPath = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    pathDogbone,
    pathFillet
  }, Symbol.toStringTag, { value: "Module" }));
  function chainDogbone(chainToFillet, filletSpec) {
    return chainFilletInternal(false, chainToFillet, filletSpec);
  }
  function chainFillet(chainToFillet, filletSpec) {
    return chainFilletInternal(true, chainToFillet, filletSpec);
  }
  function chainFilletInternal(traditional, chainToFillet, filletSpec) {
    const result = { paths: {} };
    let added = 0;
    const links = chainToFillet.links;
    const add2 = (i1, i2) => {
      const p1 = links[i1].walkedPath;
      const p2 = links[i2].walkedPath;
      moveTemporary([p1.pathContext, p2.pathContext], [p1.offset, p2.offset], () => {
        let filletRadius;
        if (isObject(filletSpec)) {
          const a = ofChainLinkJoint(links[i1], links[i2]);
          if (a == null || round(a) === 0) return;
          const spec = filletSpec;
          filletRadius = a > 0 ? spec.left : spec.right;
          if (typeof filletRadius !== "number") return;
        } else {
          filletRadius = filletSpec;
        }
        if (!filletRadius || filletRadius < 0) return;
        let filletArc;
        if (traditional) {
          filletArc = pathFillet(p1.pathContext, p2.pathContext, filletRadius);
        } else {
          filletArc = pathDogbone(p1.pathContext, p2.pathContext, filletRadius);
        }
        if (filletArc) {
          if (!result.paths) result.paths = {};
          result.paths["fillet" + added] = filletArc;
          added++;
        }
      });
    };
    for (let i = 1; i < links.length; i++) {
      add2(i - 1, i);
    }
    if (chainToFillet.endless && links.length > 1) {
      add2(links.length - 1, 0);
    }
    if (!added) return null;
    return result;
  }
  const filletChain = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    chainDogbone,
    chainFillet
  }, Symbol.toStringTag, { value: "Module" }));
  class DeadEndFinder {
    constructor(modelContext, options) {
      this.modelContext = modelContext;
      this.options = options;
      this.pointMap = new PointGraph();
      this.list = [];
      this.removed = [];
      this.ordinals = {};
      this.load();
    }
    load() {
      const walkOptions = {
        onPath: (walkedPath) => {
          const endPoints = fromPathEnds(walkedPath.pathContext, walkedPath.offset);
          if (!endPoints) return;
          const pathRef = walkedPath;
          pathRef.endPoints = endPoints;
          const valueId = this.pointMap.insertValue(pathRef);
          for (let i = 2; i--; ) {
            this.pointMap.insertValueIdAtPoint(valueId, endPoints[i]);
          }
        }
      };
      walk(this.modelContext, walkOptions);
      if (this.options.pointMatchingDistance) {
        this.pointMap.mergePoints(this.options.pointMatchingDistance);
      }
    }
    findDeadEnds() {
      let i = 0;
      this.pointMap.forEachPoint((p, values, pointId, el) => {
        this.ordinals[pointId] = i++;
        this.list.push(el);
      });
      i = 0;
      while (i < this.list.length) {
        const el = this.list[i];
        if (el.valueIds.length === 1) {
          this.removePath(el, el.valueIds[0], i);
        } else if (this.options.keep && el.valueIds.length % 2) {
          el.valueIds.forEach((valueId) => {
            const value2 = this.pointMap.values[valueId];
            if (!this.options.keep(value2)) {
              this.removePath(el, valueId, i);
            }
          });
        }
        i++;
      }
      return this.removed;
    }
    removePath(el, valueId, current) {
      const value2 = this.pointMap.values[valueId];
      const otherPointId = this.getOtherPointId(value2.endPoints, el.pointId);
      const otherElement = this.pointMap.index[otherPointId];
      this.removed.push(value2);
      this.removeValue(el, valueId);
      this.removeValue(otherElement, valueId);
      if (otherElement.valueIds.length > 0) {
        this.appendQueue(otherElement, current);
      }
    }
    removeValue(el, valueId) {
      const pos = el.valueIds.indexOf(valueId);
      if (pos >= 0) {
        el.valueIds.splice(pos, 1);
      }
    }
    appendQueue(el, current) {
      const otherOrdinal = this.ordinals[el.pointId];
      if (otherOrdinal < current) {
        this.list[otherOrdinal] = null;
        this.list.push(el);
        this.ordinals[el.pointId] = this.list.length;
      }
    }
    getOtherPointId(endPoints, pointId) {
      for (let i = 0; i < endPoints.length; i++) {
        const id = this.pointMap.getIdOfPoint(endPoints[i]);
        if (pointId !== id) {
          return id;
        }
      }
      return -1;
    }
  }
  function removeDeadEnds$1(modelContext, pointMatchingDistance, keep, trackDeleted) {
    const options = {
      pointMatchingDistance: pointMatchingDistance || 5e-3,
      keep
    };
    const deadEndFinder = new DeadEndFinder(modelContext, options);
    const removed = deadEndFinder.findDeadEnds();
    if (removed.length < deadEndFinder.pointMap.values.length) {
      removed.forEach((wp) => {
        trackDeleted && trackDeleted(wp, "dead end");
        delete wp.modelContext.paths[wp.pathId];
      });
    }
    return modelContext;
  }
  const deadend = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    removeDeadEnds: removeDeadEnds$1
  }, Symbol.toStringTag, { value: "Module" }));
  function toDXF(itemToExport, options = {}) {
    var opts = {
      fontSize: 9
    };
    var layerIds = [];
    const doc = {
      entities: [],
      header: {},
      tables: {}
    };
    extendObject(opts, options);
    if (isModel(itemToExport)) {
      var modelToExport = itemToExport;
      if (modelToExport.exporterOptions) {
        extendObject(opts, modelToExport.exporterOptions["toDXF"]);
      }
    }
    function colorLayerOptions2(layer2) {
      if (opts.layerOptions && opts.layerOptions[layer2]) return opts.layerOptions[layer2];
      if (layer2 in colors) {
        return {
          color: colors[layer2]
        };
      }
    }
    function defaultLayer(pathContext, parentLayer) {
      var layerId = pathContext && pathContext.layer || parentLayer || "0";
      if (layerIds.indexOf(layerId) < 0) {
        layerIds.push(layerId);
      }
      return layerId;
    }
    var map2 = {};
    map2[pathType.Line] = function(line, offset, layer2) {
      const lineEntity = {
        type: "LINE",
        layer: defaultLayer(line, layer2),
        vertices: [
          {
            x: round(line.origin[0] + offset[0], opts.accuracy),
            y: round(line.origin[1] + offset[1], opts.accuracy)
          },
          {
            x: round(line.end[0] + offset[0], opts.accuracy),
            y: round(line.end[1] + offset[1], opts.accuracy)
          }
        ]
      };
      return lineEntity;
    };
    map2[pathType.Circle] = function(circle, offset, layer2) {
      const circleEntity = {
        type: "CIRCLE",
        layer: defaultLayer(circle, layer2),
        center: {
          x: round(circle.origin[0] + offset[0], opts.accuracy),
          y: round(circle.origin[1] + offset[1], opts.accuracy)
        },
        radius: round(circle.radius, opts.accuracy)
      };
      return circleEntity;
    };
    map2[pathType.Arc] = function(arc, offset, layer2) {
      const arcEntity = {
        type: "ARC",
        layer: defaultLayer(arc, layer2),
        center: {
          x: round(arc.origin[0] + offset[0], opts.accuracy),
          y: round(arc.origin[1] + offset[1], opts.accuracy)
        },
        radius: round(arc.radius, opts.accuracy),
        startAngle: round(arc.startAngle, opts.accuracy),
        endAngle: round(arc.endAngle, opts.accuracy)
      };
      return arcEntity;
    };
    function appendVertex(v, layer2, bulge) {
      const vertex = {
        type: "VERTEX",
        layer: defaultLayer(null, layer2),
        x: round(v[0], opts.accuracy),
        y: round(v[1], opts.accuracy),
        bulge
      };
      return vertex;
    }
    function polyline(c) {
      const polylineEntity = {
        type: "POLYLINE",
        layer: defaultLayer(null, c.layer),
        shape: c.chain.endless,
        vertices: []
      };
      c.chain.links.forEach((link, i) => {
        let bulge;
        if (link.walkedPath.pathContext.type === pathType.Arc) {
          const arc = link.walkedPath.pathContext;
          bulge = round(Math.tan(toRadians(ofArcSpan(arc)) / 4), opts.accuracy);
          if (link.reversed) {
            bulge *= -1;
          }
        }
        const vertex = link.endPoints[link.reversed ? 1 : 0];
        polylineEntity.vertices.push(appendVertex(vertex, c.layer, bulge));
      });
      if (!c.chain.endless) {
        const lastLink = c.chain.links[c.chain.links.length - 1];
        const endPoint = lastLink.endPoints[lastLink.reversed ? 0 : 1];
        polylineEntity.vertices.push(appendVertex(endPoint, c.layer));
      }
      return polylineEntity;
    }
    function text(caption) {
      const layerId = defaultLayer(null, caption.layer);
      const layerOptions = colorLayerOptions2(layerId);
      const center2 = middle(caption.anchor);
      const textEntity = {
        type: "TEXT",
        startPoint: appendVertex(center2, null),
        endPoint: appendVertex(center2, null),
        layer: layerId,
        textHeight: layerOptions && layerOptions.fontSize || opts.fontSize,
        text: caption.text,
        halign: 4,
        // Middle
        valign: 0,
        // Baseline
        rotation: ofPointInDegrees(caption.anchor.origin, caption.anchor.end)
      };
      return textEntity;
    }
    function layerOut(layerId, layerColor) {
      const layerEntity = {
        name: layerId,
        color: layerColor
      };
      return layerEntity;
    }
    function lineTypesOut() {
      const lineStyleTable = {
        lineTypes: {
          "CONTINUOUS": {
            name: "CONTINUOUS",
            description: "______",
            patternLength: 0
          }
        }
      };
      const tableName = "lineType";
      doc.tables[tableName] = lineStyleTable;
    }
    function layersOut() {
      const layerTable = {
        layers: {}
      };
      layerIds.forEach((layerId) => {
        var layerOptions = colorLayerOptions2(layerId);
        if (layerOptions) {
          layerTable.layers[layerId] = layerOut(layerId, layerOptions.color);
        }
      });
      const tableName = "layer";
      doc.tables[tableName] = layerTable;
    }
    function header() {
      if (opts.units) {
        var units22 = dxfUnit[opts.units];
        doc.header["$INSUNITS"] = units22;
      }
    }
    function entities(walkedPaths2, chains, captions) {
      const entityArray = doc.entities;
      entityArray.push.apply(entityArray, chains.map(polyline));
      walkedPaths2.forEach((walkedPath) => {
        var fn = map2[walkedPath.pathContext.type];
        if (fn) {
          const entity = fn(walkedPath.pathContext, walkedPath.offset, walkedPath.layer);
          entityArray.push(entity);
        }
      });
      entityArray.push.apply(entityArray, captions.map(text));
    }
    if (!opts.units) {
      var units2 = tryGetModelUnits(itemToExport);
      if (units2) {
        opts.units = units2;
      }
    }
    extendObject(options, opts);
    const chainsOnLayers = [];
    const walkedPaths = [];
    if (opts.usePOLYLINE) {
      const cb = function(chains, loose, layer2) {
        chains.forEach((c) => {
          if (c.endless && c.links.length === 1 && c.links[0].walkedPath.pathContext.type === pathType.Circle) {
            walkedPaths.push(c.links[0].walkedPath);
            return;
          }
          const chainOnLayer = { chain: c, layer: layer2 };
          chainsOnLayers.push(chainOnLayer);
        });
        walkedPaths.push.apply(walkedPaths, loose);
      };
      findChains(modelToExport, cb, { byLayers: true, pointMatchingDistance: opts.pointMatchingDistance });
    } else {
      var walkOptions = {
        onPath: (walkedPath) => {
          walkedPaths.push(walkedPath);
        }
      };
      walk(modelToExport, walkOptions);
    }
    entities(walkedPaths, chainsOnLayers, getAllCaptionsOffset(modelToExport));
    header();
    lineTypesOut();
    layersOut();
    return outputDocument(doc);
  }
  function outputDocument(doc) {
    const dxf2 = [];
    function append(...values) {
      dxf2.push.apply(dxf2, values);
    }
    var map2 = {};
    map2["LINE"] = function(line) {
      append(
        "0",
        "LINE",
        "8",
        line.layer,
        "10",
        line.vertices[0].x,
        "20",
        line.vertices[0].y,
        "11",
        line.vertices[1].x,
        "21",
        line.vertices[1].y
      );
    };
    map2["CIRCLE"] = function(circle) {
      append(
        "0",
        "CIRCLE",
        "8",
        circle.layer,
        "10",
        circle.center.x,
        "20",
        circle.center.y,
        "40",
        circle.radius
      );
    };
    map2["ARC"] = function(arc) {
      append(
        "0",
        "ARC",
        "8",
        arc.layer,
        "10",
        arc.center.x,
        "20",
        arc.center.y,
        "40",
        arc.radius,
        "50",
        arc.startAngle,
        "51",
        arc.endAngle
      );
    };
    map2["VERTEX"] = function(vertex) {
      append(
        "0",
        "VERTEX",
        "8",
        vertex.layer,
        "10",
        vertex.x,
        "20",
        vertex.y
      );
      if (vertex.bulge !== void 0) {
        append("42", vertex.bulge);
      }
    };
    map2["POLYLINE"] = function(polyline) {
      append(
        "0",
        "POLYLINE",
        "8",
        polyline.layer,
        "66",
        1,
        "70",
        polyline.shape ? 1 : 0
      );
      polyline.vertices.forEach((vertex) => map2["VERTEX"](vertex));
      append("0", "SEQEND");
    };
    map2["TEXT"] = function(text) {
      append(
        "0",
        "TEXT",
        "10",
        text.startPoint.x,
        "20",
        text.startPoint.y,
        "11",
        text.endPoint.x,
        "21",
        text.endPoint.y,
        "40",
        text.textHeight,
        "1",
        text.text,
        "50",
        text.rotation,
        "8",
        text.layer,
        "72",
        text.halign,
        "73",
        text.valign
      );
    };
    function section(sectionFn) {
      append("0", "SECTION");
      sectionFn();
      append("0", "ENDSEC");
    }
    function table2(fn) {
      append("0", "TABLE");
      fn();
      append("0", "ENDTAB");
    }
    function tables() {
      append("2", "TABLES");
      table2(lineTypesOut);
      table2(layersOut);
    }
    function layerOut(layer2) {
      append(
        "0",
        "LAYER",
        "2",
        layer2.name,
        "70",
        "0",
        "62",
        layer2.color,
        "6",
        "CONTINUOUS"
      );
    }
    function lineTypeOut(lineType) {
      append(
        "0",
        "LTYPE",
        "72",
        //72 Alignment code; value is always 65, the ASCII code for A
        "65",
        "70",
        "64",
        "2",
        lineType.name,
        "3",
        lineType.description,
        "73",
        "0",
        "40",
        lineType.patternLength
      );
    }
    function lineTypesOut() {
      const lineTypeTableName = "lineType";
      const lineTypeTable = doc.tables[lineTypeTableName];
      append("2", "LTYPE");
      for (let lineTypeId in lineTypeTable.lineTypes) {
        let lineType = lineTypeTable.lineTypes[lineTypeId];
        lineTypeOut(lineType);
      }
    }
    function layersOut() {
      const layerTableName = "layer";
      const layerTable = doc.tables[layerTableName];
      append("2", "LAYER");
      for (let layerId in layerTable.layers) {
        let layer2 = layerTable.layers[layerId];
        layerOut(layer2);
      }
    }
    function header() {
      append("2", "HEADER");
      for (let key in doc.header) {
        let value2 = doc.header[key];
        append("9", key, "70", value2);
      }
    }
    function entities(entityArray) {
      append("2", "ENTITIES");
      entityArray.forEach((entity) => {
        const fn = map2[entity.type];
        if (fn) {
          fn(entity);
        }
      });
    }
    section(header);
    section(tables);
    section(() => entities(doc.entities));
    append("0", "EOF");
    return dxf2.join("\n");
  }
  var dxfUnit = {};
  dxfUnit[""] = 0;
  dxfUnit[unitType.Inch] = 1;
  dxfUnit[unitType.Foot] = 2;
  dxfUnit[unitType.Millimeter] = 4;
  dxfUnit[unitType.Centimeter] = 5;
  dxfUnit[unitType.Meter] = 6;
  const dxf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    toDXF
  }, Symbol.toStringTag, { value: "Module" }));
  function toPDF(doc, modelToExport, options) {
    if (!modelToExport) return;
    const opts = {
      fontName: "Courier",
      fontSize: 9,
      origin: [0, 0],
      stroke: "#000",
      ...options
    };
    let scale2 = 1;
    const exportUnits = opts.units || modelToExport.units;
    if (exportUnits) {
      scale2 = conversionScale(exportUnits, unitType.Inch);
    } else {
      scale2 = 1 / 100;
    }
    scale2 *= 72;
    const scaledModel = scale$2(cloneObject(modelToExport), scale2);
    const size = modelExtents(scaledModel);
    if (!size) return;
    const left = -size.low[0];
    let offset = [left, size.high[1]];
    offset = add(offset, opts.origin);
    findChains$1(
      scaledModel,
      function(chains, loose, layer2) {
        function single(walkedPath) {
          const pathData = pathToSVGPathData(walkedPath.pathContext, walkedPath.offset, offset);
          doc.path(pathData).stroke(opts.stroke);
        }
        chains.map(function(chain2) {
          if (chain2.links.length > 1) {
            const pathData = chainToSVGPathData(chain2, offset);
            doc.path(pathData).stroke(opts.stroke);
          } else {
            const walkedPath = chain2.links[0].walkedPath;
            if (walkedPath.pathContext.type === pathType.Circle) {
              let fixedPath = walkedPath.pathContext;
              moveTemporary([walkedPath.pathContext], [walkedPath.offset], function() {
                fixedPath = mirror$1(walkedPath.pathContext, false, true);
              });
              moveRelative(fixedPath, offset);
              doc.circle(fixedPath.origin[0], fixedPath.origin[1], walkedPath.pathContext.radius).stroke(opts.stroke);
            } else {
              single(walkedPath);
            }
          }
        });
        loose.map(single);
      },
      { byLayers: false }
    );
    doc.font(opts.fontName).fontSize(opts.fontSize);
    getAllCaptionsOffset(scaledModel).forEach((caption) => {
      const a = ofLineInDegrees(caption.anchor);
      const anchor = mirror$1(caption.anchor, false, true);
      moveRelative(anchor, offset);
      const text = caption.text;
      const textCenter = [doc.widthOfString(text) / 2, doc.heightOfString(text) / 2];
      const center2 = middle(anchor);
      const textOffset = subtract(center2, textCenter);
      doc.rotate(-a, { origin: center2 });
      doc.text(text, textOffset[0], textOffset[1]);
      doc.rotate(a, { origin: center2 });
    });
  }
  const pdfEsm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    toPDF
  }, Symbol.toStringTag, { value: "Module" }));
  function wrap(prefix, content, condition) {
    if (!prefix) return content;
    if (condition) {
      return prefix + "(" + content + ")";
    }
    return prefix + content;
  }
  function facetSizeToResolution(arcOrCircle, facetSize) {
    if (!facetSize) return void 0;
    const circle = new Circle([0, 0], arcOrCircle.radius);
    const length = pathLength(circle);
    if (!length) return void 0;
    return Math.ceil(length / facetSize);
  }
  function chainToJscadScript(chainContext, facetSize, accuracy) {
    let head = "";
    let tail = "";
    let first = true;
    let exit = false;
    let reverseTail = false;
    const beginMap = {};
    beginMap[pathType.Circle] = function(circlePath, link) {
      const circle = circlePath;
      const circleOptions = {
        center: rounded(add(circle.origin, link.walkedPath.offset), accuracy),
        radius: round(circle.radius, accuracy),
        resolution: facetSizeToResolution(circle, facetSize)
      };
      head = wrap("CAG.circle", JSON.stringify(circleOptions), true);
      exit = true;
    };
    beginMap[pathType.Line] = function(linePath, link) {
      let points = link.endPoints.map((p) => rounded(p, accuracy));
      if (link.reversed) {
        points.reverse();
      }
      head = wrap("new CSG.Path2D", JSON.stringify(points), true);
    };
    beginMap[pathType.Arc] = function(arcPath, link) {
      const arc = arcPath;
      const endAngle = ofArcEnd(arc);
      if (link.reversed) {
        reverseTail = true;
      }
      const arcOptions = {
        center: rounded(add(arc.origin, link.walkedPath.offset), accuracy),
        radius: round(arc.radius, accuracy),
        startangle: round(arc.startAngle, accuracy),
        endangle: round(endAngle, accuracy),
        resolution: facetSizeToResolution(arc, facetSize)
      };
      head = wrap("new CSG.Path2D.arc", JSON.stringify(arcOptions), true);
    };
    const appendMap = {};
    appendMap[pathType.Line] = function(_linePath, link) {
      const reverse2 = reverseTail != link.reversed;
      const endPoint = rounded(link.endPoints[reverse2 ? 0 : 1], accuracy);
      append(wrap(".appendPoint", JSON.stringify(endPoint), true));
    };
    appendMap[pathType.Arc] = function(arcPath, link) {
      const arc = arcPath;
      const reverse2 = reverseTail != link.reversed;
      const endAngle = ofArcEnd(arc);
      const arcOptions = {
        radius: round(arc.radius, accuracy),
        clockwise: reverse2,
        large: Math.abs(endAngle - arc.startAngle) > 180,
        resolution: facetSizeToResolution(arc, facetSize)
      };
      const endPoint = rounded(link.endPoints[reverse2 ? 0 : 1], accuracy);
      append(wrap(".appendArc", JSON.stringify(endPoint) + "," + JSON.stringify(arcOptions), true));
    };
    function append(s) {
      if (reverseTail) {
        tail = s + tail;
      } else {
        tail += s;
      }
    }
    for (let i = 0; i < chainContext.links.length; i++) {
      const link = chainContext.links[i];
      const pathContext = link.walkedPath.pathContext;
      const fn = first ? beginMap[pathContext.type] : appendMap[pathContext.type];
      if (fn) {
        fn(pathContext, link);
      }
      if (exit) {
        return head;
      }
      first = false;
    }
    return head + tail + ".close().innerToCAG()";
  }
  function makePhasedCallback(originalCb, phaseStart, phaseSpan) {
    if (!originalCb) return void 0;
    return function statusCallback(status) {
      originalCb({ progress: phaseStart + status.progress * phaseSpan / 100 });
    };
  }
  function convertChainsTo2D(convertToT, union, subtraction, modelToExport, jsCadCagOptions = {}) {
    const adds = {};
    const status = { total: 0, complete: 0 };
    function unionize(phaseStart, phaseSpan, arr) {
      let result = arr[0];
      for (let i = 1; i < arr.length; i += 1) {
        result = union(result, arr[i]);
      }
      status.complete++;
      jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: phaseStart + phaseSpan * status.complete / status.total });
      return result;
    }
    function subtractChains(layerId, cs) {
      const subtracts = [];
      cs.forEach((c) => {
        if (!c.endless) return;
        if (c.contains) {
          addChains(layerId, c.contains);
        }
        status.total++;
        subtracts.unshift(convertToT(c, jsCadCagOptions.maxArcFacet));
      });
      return subtracts;
    }
    function addChains(layerId, cs) {
      cs.forEach((c) => {
        if (!c.endless) return;
        const add2 = { cag: convertToT(c, jsCadCagOptions.maxArcFacet), subtracts: [] };
        if (c.contains) {
          const subtracts = subtractChains(layerId, c.contains);
          if (subtracts.length > 0) {
            add2.subtracts.push(subtracts);
          }
        }
        status.total++;
        if (!(layerId in adds)) {
          adds[layerId] = [];
        }
        adds[layerId].unshift(add2);
      });
    }
    const options = {
      pointMatchingDistance: jsCadCagOptions.pointMatchingDistance,
      byLayers: jsCadCagOptions.byLayers,
      contain: true
    };
    jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 25 });
    const chainsResult = findChains$1(modelToExport, options);
    if (!chainsResult) {
      jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });
      throw new Error("No closed geometries found.");
    }
    if (Array.isArray(chainsResult)) {
      addChains("", chainsResult);
    } else {
      const chainsByLayer = chainsResult;
      Object.keys(chainsByLayer).forEach((layerId) => {
        addChains(layerId, chainsByLayer[layerId] ?? []);
      });
    }
    jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 50 });
    let closedCount = 0;
    for (const layerId in adds) {
      closedCount += adds[layerId].length;
    }
    if (closedCount === 0) {
      jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });
      throw new Error("No closed geometries found.");
    }
    const resultMap = {};
    for (const layerId in adds) {
      const flatAdds = adds[layerId].map((add2) => {
        let result = add2.cag;
        add2.subtracts.forEach((subtract2) => {
          const union2 = unionize(50, 50, subtract2);
          result = subtraction(result, union2);
        });
        return result;
      });
      resultMap[layerId] = unionize(50, 50, flatAdds);
    }
    jsCadCagOptions.statusCallback && jsCadCagOptions.statusCallback({ progress: 100 });
    return options.byLayers ? resultMap : resultMap[""];
  }
  function toJscadCAG(jscadCAG, modelToExport, jsCadCagOptions) {
    function chainToJscadCag(c, maxArcFacet) {
      const keyPoints = toKeyPoints$1(c, maxArcFacet).map((pt) => [pt[0], pt[1]]);
      if (keyPoints.length > 0) {
        keyPoints.push([keyPoints[0][0], keyPoints[0][1]]);
      }
      return jscadCAG.fromPoints(keyPoints);
    }
    function jscadCagUnion(augend, addend) {
      return augend.union(addend);
    }
    function jscadCagSubtraction(minuend, subtrahend) {
      return minuend.subtract(subtrahend);
    }
    return convertChainsTo2D(chainToJscadCag, jscadCagUnion, jscadCagSubtraction, modelToExport, jsCadCagOptions);
  }
  function convert2Dto3D(to2D, to3D, union3D, modelToExport, options = {}) {
    const originalCb = options.statusCallback;
    function getDefinedNumber(a, b) {
      if (isNumber(a)) return a;
      return b;
    }
    if (modelToExport.exporterOptions) {
      extendObject(options, modelToExport.exporterOptions["toJscadCSG"]);
    }
    options.byLayers = options.byLayers || options.layerOptions && true;
    options.statusCallback = makePhasedCallback(originalCb, 0, 50);
    const result2D = to2D(options);
    const csgs = [];
    if (options.byLayers) {
      const map2 = result2D;
      for (const layerId in map2) {
        if (!Object.prototype.hasOwnProperty.call(map2, layerId)) continue;
        const layerOptions = options.layerOptions && options.layerOptions[layerId] || {};
        const csg = to3D(map2[layerId], layerOptions.extrude ?? options.extrude, getDefinedNumber(layerOptions.z, options.z));
        csgs.push(csg);
      }
    } else {
      const csg = to3D(result2D, options.extrude, options.z);
      csgs.push(csg);
    }
    options.statusCallback = makePhasedCallback(originalCb, 50, 100);
    if (csgs.length === 0) {
      throw new Error("No extrusions generated.");
    }
    const status = { total: Math.max(csgs.length - 1, 1), complete: 0 };
    let result = csgs[0];
    for (let i = 1; i < csgs.length; i += 1) {
      result = union3D(result, csgs[i]);
      status.complete++;
      options.statusCallback && options.statusCallback({ progress: status.complete / status.total });
    }
    return result;
  }
  function toJscadCSG(jscadCAG, modelToExport, options) {
    function to2D(opts) {
      return toJscadCAG(jscadCAG, modelToExport, opts);
    }
    function to3D(cag, extrude, z) {
      let csg = cag.extrude({ offset: [0, 0, extrude] });
      if (z) {
        csg = csg.translate([0, 0, z]);
      }
      return csg;
    }
    function union3D(augend, addend) {
      return augend.union(addend);
    }
    return convert2Dto3D(to2D, to3D, union3D, modelToExport, options);
  }
  function toJscadScript(modelToExport, options = {}) {
    function _chainToJscadScript(c, maxArcFacet) {
      return wrap("", chainToJscadScript(c, maxArcFacet, options.accuracy));
    }
    function scriptUnion(augend, addend) {
      return augend + `.union(${addend})`;
    }
    function scriptSubtraction(minuend, subtrahend) {
      return minuend + `.subtract(${subtrahend})`;
    }
    function to2D(opts) {
      return convertChainsTo2D(_chainToJscadScript, scriptUnion, scriptSubtraction, modelToExport, options);
    }
    function to3D(cag, extrude, z) {
      let csg = cag + `.extrude({ offset: [0, 0, ${extrude}] })`;
      if (z) {
        csg = csg + `.translate([0, 0, ${z}])`;
      }
      return csg;
    }
    function wrapScript(s) {
      return `${nl}${indent}${s}${nl}`;
    }
    const indent = new Array((options.indent || 0) + 1).join(" ");
    const nl = options.indent ? "\n" : "";
    const result = convert2Dto3D(to2D, to3D, scriptUnion, modelToExport, options).trim();
    return `function ${options.functionName || "main"}(){${wrapScript(`return ${result};`)}}${nl}`;
  }
  function toJscadSTL(CAG, stlSerializer, modelToExport, options = {}) {
    const originalCb = options.statusCallback;
    options.statusCallback = makePhasedCallback(originalCb, 0, 50);
    const csg = toJscadCSG(CAG, modelToExport, options);
    return stlSerializer.serialize(csg, { binary: false, statusCallback: makePhasedCallback(originalCb, 50, 50) });
  }
  const openjscadEsm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    toJscadCAG,
    toJscadCSG,
    toJscadSTL,
    toJscadScript
  }, Symbol.toStringTag, { value: "Module" }));
  function getChildPlacement(parentModel, baseline) {
    const atlas = new Atlas(parentModel);
    const measureParent = modelExtents(parentModel, atlas);
    const parentTop = measureParent.high[1];
    const cpa = [];
    const xMap = {};
    const walkOptions = {
      beforeChildWalk: function(context) {
        const child = context.childModel;
        const m = atlas.modelMap[context.routeKey];
        if (!m) return;
        const childMeasure = augment(m);
        originate(child, [childMeasure.center[0], parentTop * baseline]);
        const x = child.origin[0] - measureParent.low[0];
        xMap[context.childId] = x;
        const xRatio = x / measureParent.width;
        cpa.push({ childId: context.childId, xRatio });
        return false;
      }
    };
    walk(parentModel, walkOptions);
    cpa.sort((a, b) => a.xRatio - b.xRatio);
    const first = cpa[0];
    const last = cpa[cpa.length - 1];
    if (cpa.length > 1) {
      const min = first.xRatio;
      const max = last.xRatio;
      const span = max - min;
      cpa.forEach((cp) => cp.xRatio = (cp.xRatio - min) / span);
    }
    return {
      cpa,
      firstX: xMap[first.childId],
      lastX: measureParent.width - xMap[last.childId]
    };
  }
  function moveAndRotate(parentModel, cpa, rotate2) {
    cpa.forEach((cp) => {
      const child = parentModel.models[cp.childId];
      child.origin = cp.origin;
      if (rotate2) rotate$2(child, cp.angle, cp.origin);
    });
  }
  const onPathMap = {};
  onPathMap[pathType.Arc] = function(arc, reversed, cpa) {
    const arcSpan = ofArcSpan(arc);
    cpa.forEach((p) => p.angle = reversed ? arc.endAngle - p.xRatio * arcSpan - 90 : arc.startAngle + p.xRatio * arcSpan + 90);
  };
  onPathMap[pathType.Line] = function(line, reversed, cpa) {
    const lineAngle = ofLineInDegrees(line);
    cpa.forEach((p) => p.angle = lineAngle);
  };
  function childrenOnPath(parentModel, onPath, baseline = 0, reversed = false, contain = false, rotate2 = true) {
    const result = getChildPlacement(parentModel, baseline);
    const cpa = result.cpa;
    let chosenPath = onPath;
    if (contain && cpa.length > 1) {
      const onPathLength = pathLength(onPath);
      if (result.firstX + result.lastX < onPathLength) {
        chosenPath = clone$1(onPath);
        alterLength(chosenPath, -result.firstX, true);
        alterLength(chosenPath, -result.lastX);
      }
    }
    cpa.forEach((p) => p.origin = middle(chosenPath, reversed ? 1 - p.xRatio : p.xRatio));
    const fn = onPathMap[chosenPath.type];
    if (fn) {
      fn(chosenPath, reversed, cpa);
    }
    moveAndRotate(parentModel, cpa, rotate2);
    return parentModel;
  }
  function miterAngles(points, offsetAngle) {
    const arc = new Arc([0, 0], 0, 0, 0);
    return points.map((p, i) => {
      let a;
      if (i === 0) {
        a = ofPointInDegrees(p, points[i + 1]) + 90;
      } else if (i === points.length - 1) {
        a = ofPointInDegrees(points[i - 1], p) + 90;
      } else {
        arc.origin = p;
        arc.startAngle = ofPointInDegrees(p, points[i + 1]);
        arc.endAngle = ofPointInDegrees(p, points[i - 1]);
        a = ofArcMiddle(arc);
      }
      return a + offsetAngle;
    });
  }
  function childrenOnChain(parentModel, onChain, baseline = 0, reversed = false, contain = false, rotated = true) {
    const result = getChildPlacement(parentModel, baseline);
    const cpa = result.cpa;
    let chainLength = onChain.pathLength;
    let points;
    if (cpa.length > 1) {
      if (contain) chainLength -= result.firstX + result.lastX;
      let absolutes = cpa.map((cp) => (reversed ? 1 - cp.xRatio : cp.xRatio) * chainLength);
      let relatives;
      if (reversed) absolutes.reverse();
      relatives = absolutes.map((ab, i) => Math.abs(ab - (i == 0 ? 0 : absolutes[i - 1])));
      if (contain) {
        relatives[0] += reversed ? result.lastX : result.firstX;
      } else {
        relatives.shift();
      }
      points = toPoints$1(onChain, relatives);
      if (points.length < cpa.length) {
        const endLink = onChain.links[onChain.links.length - 1];
        points.push(endLink.endPoints[endLink.reversed ? 0 : 1]);
      }
      if (contain) points.shift();
    } else {
      points = toPoints$1(onChain, 0.5 * chainLength);
      points.length = 2;
      points.push(onChain.links[onChain.links.length - 1].endPoints[onChain.links[onChain.links.length - 1].reversed ? 0 : 1]);
    }
    if (reversed) points.reverse();
    const angles = miterAngles(points, -90);
    if (cpa.length > 1) {
      cpa.forEach((cp, i) => {
        cp.angle = angles[i];
        cp.origin = points[i];
      });
    } else {
      cpa[0].angle = angles[1];
      cpa[0].origin = points[1];
    }
    moveAndRotate(parentModel, cpa, rotated);
    return parentModel;
  }
  function cloneToRadial(itemToClone, count, angleInDegrees, rotationOrigin) {
    const result = {};
    let add2;
    let rotateFn;
    if (isModel(itemToClone)) {
      add2 = result.models = {};
      rotateFn = rotate$2;
    } else {
      add2 = result.paths = {};
      rotateFn = rotate$1;
    }
    for (let i = 0; i < count; i++) {
      add2[i] = rotateFn(cloneObject(itemToClone), i * angleInDegrees, rotationOrigin);
    }
    return result;
  }
  function cloneTo(dimension, itemToClone, count, margin) {
    const result = {};
    let add2;
    let measureFn;
    let moveFn;
    if (isModel(itemToClone)) {
      measureFn = modelExtents;
      add2 = result.models = {};
      moveFn = move$1;
    } else {
      measureFn = pathExtents;
      add2 = result.paths = {};
      moveFn = move;
    }
    const m = measureFn(itemToClone);
    const size = m.high[dimension] - m.low[dimension];
    for (let i = 0; i < count; i++) {
      const origin = [0, 0];
      origin[dimension] = i * (size + margin);
      add2[i] = moveFn(cloneObject(itemToClone), origin);
    }
    return result;
  }
  function cloneToColumn(itemToClone, count, margin = 0) {
    return cloneTo(1, itemToClone, count, margin);
  }
  function cloneToRow(itemToClone, count, margin = 0) {
    return cloneTo(0, itemToClone, count, margin);
  }
  function cloneToGrid(itemToClone, xCount, yCount, margin) {
    const margins = getMargins(margin);
    return cloneToColumn(cloneToRow(itemToClone, xCount, margins[0]), yCount, margins[1]);
  }
  function getMargins(margin) {
    if (Array.isArray(margin)) {
      return margin;
    } else {
      return [margin, margin];
    }
  }
  function cloneToAlternatingRows(itemToClone, xCount, yCount, spacingFn) {
    let modelToMeasure;
    if (isModel(itemToClone)) {
      modelToMeasure = itemToClone;
    } else {
      modelToMeasure = { paths: { "0": itemToClone } };
    }
    const spacing = spacingFn(modelToMeasure);
    const result = { models: {} };
    for (let i = 0; i < yCount; i++) {
      const i2 = i % 2;
      result.models[i] = move$1(cloneToRow(itemToClone, xCount + i2, spacing.xMargin), [i2 * spacing.x, i * spacing.y]);
    }
    return result;
  }
  function cloneToBrick(itemToClone, xCount, yCount, margin) {
    const margins = getMargins(margin);
    function spacing(modelToMeasure) {
      const m = modelExtents(modelToMeasure);
      const xMargin = margins[0] || 0;
      const yMargin = margins[1] || 0;
      return { x: (m.width + xMargin) / -2, y: m.height + yMargin, xMargin };
    }
    return cloneToAlternatingRows(itemToClone, xCount, yCount, spacing);
  }
  function cloneToHoneycomb(itemToClone, xCount, yCount, margin = 0) {
    function spacing(modelToMeasure) {
      const hex = boundingHexagon(modelToMeasure);
      const width = 2 * equilateralAltitude(hex.radius);
      const s = width + margin;
      return { x: s / -2, y: equilateralAltitude(s), xMargin: margin };
    }
    return cloneToAlternatingRows(itemToClone, xCount, yCount, spacing);
  }
  const layout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    childrenOnChain,
    childrenOnPath,
    cloneToBrick,
    cloneToColumn,
    cloneToGrid,
    cloneToHoneycomb,
    cloneToRadial,
    cloneToRow
  }, Symbol.toStringTag, { value: "Module" }));
  registerCascadeModules(_model, _path, _point);
  exports.$ = $;
  exports.Belt = Belt;
  exports.BezierCurve = BezierCurve;
  exports.BezierSeed = BezierSeed;
  exports.BoltCircle = BoltCircle;
  exports.BoltRectangle = BoltRectangle;
  exports.ConnectTheDots = ConnectTheDots;
  exports.Dogbone = Dogbone;
  exports.Dome = Dome;
  exports.Ellipse = Ellipse;
  exports.EllipticArc = EllipticArc;
  exports.Holes = Holes;
  exports.Oval = Oval;
  exports.OvalArc = OvalArc;
  exports.Polygon = Polygon;
  exports.Rectangle = Rectangle;
  exports.Ring = Ring;
  exports.RoundRectangle = RoundRectangle;
  exports.SCurve = SCurve;
  exports.Slot = Slot;
  exports.Square = Square;
  exports.Star = Star;
  exports.Text = Text;
  exports.XmlTag = XmlTag;
  exports.angle = angle;
  exports.chain = chain$1;
  exports.collect = collect;
  exports.compose = compose;
  exports.core = core;
  exports.deadend = deadend;
  exports.dxf = dxf;
  exports.equal = equal;
  exports.exporter = exporterIndex;
  exports.fillet = filletPath;
  exports.filletChain = filletChain;
  exports.importer = importer$1;
  exports.intersect = intersect;
  exports.layout = layout;
  exports.measure = measure$1;
  exports.model = _model;
  exports.models = models$2;
  exports.openjscad = openjscadEsm;
  exports.path = _path;
  exports.paths = paths$1;
  exports.pdf = pdfEsm;
  exports.pipe = pipe;
  exports.point = _point;
  exports.round = round;
  exports.schema = schema;
  exports.svg = svgEsm;
  exports.units = units;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
})({}, KDBush, Bezier, GrahamScan);
//# sourceMappingURL=photon.iife.js.map
