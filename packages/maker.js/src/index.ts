// ES module entry point during migration.
export * from './core/schema.js';
export * from './core/maker.js';

// Core modules converted to ES modules
export * as angle from './core/angle.js';
export * as point from './core/point.js';
export * as path from './core/path.js';
export * as paths from './core/paths.js';
export * as units from './core/units.js';
export * as solvers from './core/solvers.js';
export * as kit from './core/kit.js';

// Partial measure module (equal.ts) - comparison functions
export * as equal from './core/equal.js';

// Measure module (minimal version with essential functions)
export * as measure from './core/measure-minimal.js';

// Model manipulation and traversal
export * as model from './core/model.js';

// XML utilities
export { XmlTag, type IXmlTagAttrs } from './core/xml.js';

// Model classes converted to ES modules
export * as models from './models/index.js';

// TODO: progressively export remaining modules
// export * as chain from './core/chain.js';
