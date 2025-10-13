# Feature Specification: Modernize Examples and Playground Models

**Feature Branch**: `004-all-examples-housed`  
**Created**: 2025-10-12  
**Status**: Draft  
**Input**: User description: "All examples housed in packages/photon/examples still reference maker.js old library and use require rather than modern import/exports. Please draft a user story to update all Examples as well as packages/playground/models (same issue, reference require('makerjs') and use outdated 'var'"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Update Photon Examples to Modern JavaScript (Priority: P1)

As a developer learning to use the photon library, I need all example files to use current JavaScript standards (ES6+ imports, const/let) and reference the correct library name (photon instead of makerjs), so that I can copy and adapt example code directly into my modern projects without syntax errors or deprecated patterns.

**Why this priority**: This is the highest priority because examples are the primary learning resource for new users. Outdated examples create immediate confusion about the library's name and modern usage patterns, leading to a poor first impression and increased support burden.

**Independent Test**: Can be fully tested by running any example file in a modern Node.js environment and verifying it executes without errors, uses ES6 imports, and references photon (not makerjs).

**Acceptance Scenarios**:

1. **Given** a developer views the smile.js example file, **When** they examine the import statement, **Then** they see `import * as photon from 'photon'` instead of `var makerjs = require('./../target/js/node.maker.js')`
2. **Given** a developer copies code from any example file, **When** they paste it into their modern JavaScript project, **Then** the code uses const/let declarations and ES6 imports without requiring modifications
3. **Given** all 23 example files in packages/photon/examples, **When** each file is reviewed, **Then** zero files contain `var` declarations, `require()` statements, or references to `makerjs`
4. **Given** an example file uses the photon library, **When** the code references library functionality, **Then** it uses the `photon` namespace consistently throughout

---

### User Story 2 - Update Playground Models to Modern JavaScript (Priority: P2)

As a user exploring the photon playground, I need all model files to use modern JavaScript syntax and correct library references, so that the playground demonstrates current best practices and I can learn from accurate, up-to-date code examples.

**Why this priority**: This is second priority because playground models serve as interactive learning tools. While less critical than the main examples, outdated playground code still creates confusion and teaches deprecated patterns to users experimenting with the library.

**Independent Test**: Can be fully tested by loading each playground model in the playground interface and verifying it renders correctly while using modern syntax in the source code.

**Acceptance Scenarios**:

1. **Given** a user views the basic-shapes.js model in the playground, **When** they examine the source code, **Then** they see `import * as photon from 'photon'` instead of `var makerjs = require('makerjs')`
2. **Given** all 5 model files in packages/playground/models, **When** each file is reviewed, **Then** zero files contain `var` declarations, `require()` statements, or references to `makerjs`
3. **Given** a playground model file, **When** the code declares variables, **Then** it uses const for immutable values and let for mutable values
4. **Given** a user loads any playground model, **When** the model executes, **Then** it functions identically to its previous behavior despite the syntax modernization

---

### Edge Cases

- What happens when example files have complex nested require statements or conditional imports?
- How does the system handle example files that export functions using module.exports vs ES6 export syntax?
- What happens to example files that reference internal build artifacts (e.g., `./../target/js/node.maker.js`)?
- How are TypeScript example files (ventgrid.ts, ventgridcircle.ts) handled differently from JavaScript files?
- What happens to HTML example files (dependExample.html) that may reference the old library name?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All JavaScript example files in packages/photon/examples MUST use ES6 import statements instead of CommonJS require()
- **FR-002**: All JavaScript model files in packages/playground/models MUST use ES6 import statements instead of CommonJS require()
- **FR-003**: All example and model files MUST reference the library as "photon" instead of "makerjs"
- **FR-004**: All example and model files MUST use const or let declarations instead of var
- **FR-005**: All example files MUST use ES6 export syntax (export default or named exports) instead of module.exports
- **FR-006**: All updated files MUST maintain their original functionality and produce identical output
- **FR-007**: TypeScript example files MUST be updated to use ES6 import syntax and photon namespace
- **FR-008**: HTML example files MUST be updated to reference photon instead of makerjs in any script tags or documentation
- **FR-009**: All internal path references (e.g., `./../target/js/node.maker.js`) MUST be updated to use the correct photon package import
- **FR-010**: Example files with metaParameters MUST preserve their parameter definitions and structure

### Key Entities

- **Example File**: A JavaScript, TypeScript, or HTML file in packages/photon/examples that demonstrates library functionality. Contains code samples, import statements, variable declarations, and export statements.
- **Playground Model**: A JavaScript file in packages/playground/models that provides an interactive demonstration in the playground interface. Contains model definitions, library imports, and descriptive notes.
- **Import Statement**: The mechanism for including the photon library, transitioning from `require('makerjs')` to `import * as photon from 'photon'`
- **Variable Declaration**: The syntax for declaring variables, transitioning from `var` to `const` and `let` based on mutability

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of JavaScript and TypeScript files in packages/photon/examples (23 files) use ES6 import syntax with zero require() statements remaining
- **SC-002**: 100% of JavaScript files in packages/playground/models (5 files) use ES6 import syntax with zero require() statements remaining
- **SC-003**: Zero occurrences of the string "makerjs" exist in any example or playground model file (excluding comments explaining the migration)
- **SC-004**: Zero occurrences of `var` declarations exist in any example or playground model file
- **SC-005**: All updated example files execute successfully in a modern Node.js environment without syntax errors
- **SC-006**: All playground models render correctly in the playground interface after updates
- **SC-007**: Code review confirms that all const/let usage follows best practices (const for immutable, let for mutable values)
