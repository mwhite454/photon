# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Upgraded Lerna from v6.0.3 to v8.2.4 for improved security, performance, and compatibility
- Upgraded TypeDoc from v0.26.0 to v0.28.14 for enhanced documentation generation
- Migrated from deprecated `lerna bootstrap` to npm workspaces for package management
- Updated @types/node from v10.5.7 to v20.0.0 in demos and fonts packages for TypeScript 5.6.3 compatibility

### Fixed
- Fixed TypeDoc documentation generation by configuring proper entry points in tsconfig
- Fixed TypeScript compilation errors in demos package (Buffer interface compatibility)
- Fixed TypeScript compilation errors in fonts package (Buffer interface compatibility)
- Fixed encoding parameter casing in demos/demoify.ts to comply with stricter type checking

### Security
- Eliminated 13 npm audit vulnerabilities (reduced to 0 high/critical vulnerabilities)
- Updated dependencies to latest stable versions with security patches

### Technical Details
- Added `workspaces` field to root package.json for npm workspaces support
- Updated bootstrap script to use `npm install` instead of deprecated `lerna bootstrap`
- Removed `postinstall` script that called deprecated bootstrap command
- Updated TypeDoc configuration to properly reference all source entry points
- Applied Lerna v8 migration via `lerna repair` command

### Documentation
- Generated complete API documentation successfully (previously failing)
- All build processes now complete with exit code 0 (except pre-existing playground issues)
- Created comprehensive upgrade documentation in specs/003-upgrade-lerna-typedoc/

### Known Issues
- @photon/playground package has pre-existing TypeScript errors (16 errors) that existed before this upgrade
  - Missing property declarations: paramValues, fontsLoaded, baseUrl, opentypeLib
  - Missing property on Manager class: down
  - These errors do not affect core library functionality and should be addressed in a separate PR

## [1.0.0] - Previous Release

Initial release with Lerna v6.0.3 and TypeDoc v0.26.0.
