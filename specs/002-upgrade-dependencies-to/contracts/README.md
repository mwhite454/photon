# API Contracts

**Feature**: Critical Dependency Modernization  
**Status**: N/A

## Not Applicable

This feature involves upgrading internal dependencies only. There are no API contracts, endpoints, or external interfaces being added or modified.

## Public API Guarantee

The Photon public API remains **100% backward compatible**. All changes are internal to the library:

- No new public methods
- No changed method signatures
- No removed functionality
- No breaking changes

## Internal Changes Only

The dependency upgrades affect only internal implementation details:

1. **graham_scan**: Used internally in `core/measure.ts` for convex hull calculations
2. **bezier-js**: Used internally in `models/BezierCurve-esm.ts` for curve operations
3. **kdbush**: Used internally in `core/collect.ts` for spatial indexing

Users of the Photon library will see no API changes and require no code modifications.

## Relevant Documentation

For implementation details, see:
- [research.md](../research.md) - Internal migration patterns
- [quickstart.md](../quickstart.md) - Internal upgrade procedures
