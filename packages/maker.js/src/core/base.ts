// Minimal ES module utilities extracted from Maker.js to bootstrap ESM migration.

export const version = 'debug';

export const environmentTypes = {
  BrowserUI: 'browser',
  NodeJs: 'node',
  WebWorker: 'worker',
  Unknown: 'unknown',
} as const;

const EPSILON = Number.EPSILON || Math.pow(2, -52);

function tryEval(name: string) {
  try {
    // eslint-disable-next-line no-eval
    const value = eval(name);
    return value;
  } catch {
    return undefined;
  }
}

function detectEnvironment() {
  if (tryEval('WorkerGlobalScope') && tryEval('self')) return environmentTypes.WebWorker;
  if (tryEval('window') && tryEval('document')) return environmentTypes.BrowserUI;
  if (tryEval('global') && tryEval('process')) return environmentTypes.NodeJs;
  return environmentTypes.Unknown;
}

export const environment = detectEnvironment();

export const unitType = {
  Centimeter: 'cm',
  Foot: 'foot',
  Inch: 'inch',
  Meter: 'm',
  Millimeter: 'mm',
} as const;

// String-based enumeration of all path types
export const pathType = {
  Line: 'line',
  Circle: 'circle',
  Arc: 'arc',
  BezierSeed: 'bezier-seed',
} as const;

function splitStringOnce(s: string, char: string) {
  const p = s.indexOf(char);
  if (p < 0) return [s];
  if (p > 0) return [s.substring(0, p), s.substring(p + 1)];
  return ['', s];
}

export function splitDecimal(n: number) {
  let s = n.toString();
  if (s.indexOf('e') > 0) {
    // Max digits is 20
    const m = n.toFixed(20).match(/.*[^ (0+$)]/);
    s = m ? m[0] : s;
  }
  return splitStringOnce(s, '.');
}

export function round(n: number, accuracy = 0.0000001): number {
  if (n % 1 === 0) return n;
  const temp = 1 / accuracy;
  return Math.round((n + EPSILON) * temp) / temp;
}

export function createRouteKey(route: string[]) {
  const converted: string[] = [];
  for (let i = 0; i < route.length; i++) {
    const el = route[i];
    const part = i % 2 === 0 ? (i > 0 ? '.' : '') + el : JSON.stringify([el]);
    converted.push(part);
  }
  return converted.join('');
}

export function cloneObject<T>(objectToClone: T): T {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const clone = require('clone');
  return clone(objectToClone);
}

export function extendObject(target: Record<string, any>, other: Record<string, any>) {
  if (target && other) {
    for (const key in other) {
      if (Object.prototype.hasOwnProperty.call(other, key) && typeof other[key] !== 'undefined') {
        target[key] = other[key];
      }
    }
  }
  return target;
}

export const isFunction = (value: any): value is Function => typeof value === 'function';
export const isNumber = (value: any): value is number => typeof value === 'number';
export const isObject = (value: any): value is object => typeof value === 'object' && value !== null;
export const isPoint = (item: any): item is [number, number] => Array.isArray(item) && item.length === 2 && isNumber(item[0]) && isNumber(item[1]);
