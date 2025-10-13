// Export models (all 17 converted classes)
export * from './models/index.js';

// Export commonly used utility functions at top level for convenience
export { round } from './core/maker.js';

// Export utilities
export * as schema from './core/schema.js';
export * as maker from './core/maker.js';
export * as angle from './core/angle.js';
export * as point from './core/point.js';
export * as path from './core/path.js';
export * as paths from './core/paths.js';
export * as units from './core/units.js';
export * as equal from './core/equal.js';
export * as collect from './core/collect.js';
export * as model from './core/model.js';
export * as measure from './core/measure.js';
export * as exporter from './core/exporter-index.js';
export * as importer from './core/importer.js';
export * as intersect from './core/intersect.js';

// Chain finding and manipulation
export * as chain from './core/chain.js';

// Fillet operations (ES module migration)
export * as fillet from './core/fillet-path.js';
export * as filletChain from './core/fillet-chain.js';

// Dead-end utilities (ES module migration)
export * as deadend from './core/deadend.js';

// XML utilities
export { XmlTag, type IXmlTagAttrs } from './core/xml.js';

// Serializers (ES module migration in progress)
export * as dxf from './core/dxf.js';
export * as svg from './core/svg-esm.js';
export * as pdf from './core/pdf-esm.js';
export * as openjscad from './core/openjscad-esm.js';

// Model classes converted to ES modules
export * as models from './models/index.js';

// Layout utilities (ES module migration)
export * as layout from './core/layout.js';

// TODO: progressively export remaining modules
// export * as break from './core/break.js';
// export * as cascades from './core/cascades.js'; // Generated file - needs build script update
