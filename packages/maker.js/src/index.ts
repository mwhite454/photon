// ES module entry point during migration.
export * from './core/schema.js';
export * from './core/base.js';

// TODO: progressively export concrete modules, e.g. angle, point, path, measure, etc.
// export * as angle from './core/angle.js';
// export * as point from './core/point.js';
// export * as path from './core/path.js';
// export * as measure from './core/measure.js';
