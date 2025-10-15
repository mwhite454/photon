# NPM Publishing Checklist: photon/core

**Date**: 2025-10-15  
**Package**: photon/core  
**Purpose**: Prepare and publish photon/core to npm to unblock documentation validation

---

## Phase 1: Pre-Publish Verification

### 1.1 Package Configuration
- [ ] Verify `package.json` is complete and correct
  - [ ] Package name: `photon/core` (or scoped: `@photon/core`)
  - [ ] Version follows semver (suggest: `1.0.0` for first major release)
  - [ ] Description is clear and concise
  - [ ] Main entry point correct (`main`, `module`, `types` fields)
  - [ ] Keywords are relevant for npm search
  - [ ] Repository URL points to correct GitHub repo
  - [ ] License specified (MIT, Apache-2.0, etc.)
  - [ ] Author information complete
  - [ ] Files array specifies what to publish (exclude tests, specs, etc.)
  
### 1.2 Essential Files Present
- [ ] `README.md` exists with:
  - [ ] Installation instructions
  - [ ] Quick start example
  - [ ] API overview
  - [ ] Link to full documentation
  - [ ] License information
- [ ] `LICENSE` file exists
- [ ] `CHANGELOG.md` exists (or create for v1.0.0)
- [ ] `.npmignore` configured (or use `files` in package.json)

### 1.3 Build Verification
```bash
# Verify package builds successfully
npm run build  # or your build command

# Check build output
ls -la dist/  # or your output directory

# Verify all necessary files are built
# - ES modules (.mjs or .js with "type": "module")
# - CommonJS (.cjs or .js)
# - Type definitions (.d.ts)
# - Source maps (.map)
```

### 1.4 TypeScript Configuration (if applicable)
- [ ] TypeScript builds successfully
- [ ] Type definitions generated
- [ ] `tsconfig.json` includes declaration: true
- [ ] Types field in package.json points to correct .d.ts file

---

## Phase 2: Local Testing with npm link

### 2.1 Create Local Link
```bash
# In photon/core directory
cd /path/to/photon/core
npm link

# Verify link created
npm ls -g --depth=0 | grep photon
```

### 2.2 Test in Documentation Project
```bash
# In photon documentation directory
cd /path/to/photon
npm link photon/core  # or @photon/core

# Verify link works
npm ls | grep photon
node -e "const photon = require('photon/core'); console.log(photon)"
```

### 2.3 Manual Testing Checklist

#### Test Basic Imports
```bash
# Create test file
cat > test-imports.js << 'EOF'
// Test CommonJS
const photon = require('photon/core');
console.log('CommonJS import:', Object.keys(photon));

// Test named imports
const { models, paths, exporter } = require('photon/core');
console.log('Named imports:', { models, paths, exporter });
EOF

node test-imports.js
```

#### Test ES Module Imports
```bash
cat > test-imports.mjs << 'EOF'
// Test ES module import
import { models, paths, exporter, cloneObject } from 'photon/core';

console.log('ES Module imports:', { models, paths, exporter, cloneObject });

// Test creating a simple model
const rect = new models.Rectangle(100, 50);
console.log('Rectangle created:', rect);
EOF

node test-imports.mjs
```

#### Test Documentation Examples
- [ ] Test getting-started-browser.md example
- [ ] Test getting-started-node.md example
- [ ] Test at least 5 code examples from different sections:
  - [ ] Basic shapes (Rectangle, Circle)
  - [ ] Path operations (combining, breaking)
  - [ ] Model operations (cloning, expanding)
  - [ ] Export operations (SVG, DXF)
  - [ ] Advanced features (fillets, dogbones)

#### Verification Commands
```bash
# Run example validator (if photon/core is linked)
python3 scripts/migration/validation/example_validator.py \
  docs-new/docs/getting-started \
  --verbose

# Check for errors
echo $?  # Should be 0 for success
```

---

## Phase 3: Dev Server Testing

### 3.1 Start Development Environment
```bash
# Terminal 1: Start MkDocs dev server
cd docs-new
mkdocs serve

# Terminal 2: Watch for console errors
# (Open browser console at http://localhost:8000)
```

### 3.2 Manual Inspection Checklist

#### Visual Inspection
- [ ] Homepage loads without errors
- [ ] Code examples render correctly with syntax highlighting
- [ ] No broken images or assets
- [ ] Navigation works properly
- [ ] Search functionality works

#### Code Example Testing (Browser Console)
For pages with interactive examples:
- [ ] Copy code example from getting-started page
- [ ] Open browser console
- [ ] Paste and run code
- [ ] Verify no errors
- [ ] Verify expected output

#### Documentation Accuracy
- [ ] Import statements are correct
- [ ] API methods exist and work as documented
- [ ] Method signatures match documentation
- [ ] Examples produce expected results
- [ ] No references to old maker.js API remain

---

## Phase 4: Pre-Publish Package Testing

### 4.1 Create Test Package
```bash
# In photon/core directory
npm pack

# This creates photon-core-1.0.0.tgz (or similar)
ls -lh *.tgz
```

### 4.2 Inspect Package Contents
```bash
# Extract and inspect
tar -tzf photon-core-1.0.0.tgz

# Verify contents:
# - Only necessary files included
# - No test files, specs, or .git directory
# - Build artifacts present
# - package.json, README.md, LICENSE included
```

### 4.3 Test Installation from Tarball
```bash
# Create test directory
mkdir /tmp/test-photon-install
cd /tmp/test-photon-install

# Initialize test project
npm init -y

# Install from tarball
npm install /path/to/photon-core-1.0.0.tgz

# Test import
node -e "const photon = require('photon/core'); console.log(photon)"
```

---

## Phase 5: NPM Account & Publishing Setup

### 5.1 NPM Account Verification
```bash
# Login to npm (will prompt for 2FA)
npm login

# Verify logged in
npm whoami

# Check account settings
npm profile get
```

### 5.2 Check Package Name Availability
```bash
# Check if name is available
npm search photon/core

# Or try to view package (should 404 if available)
npm view photon/core
```

### 5.3 Organization Setup (if using scoped package)
If using `@photon/core`:
- [ ] Create npm organization: https://www.npmjs.com/org/create
- [ ] Verify membership in organization
- [ ] Set package access (public vs. restricted)

---

## Phase 6: Publishing Process

### 6.1 Dry Run
```bash
# Test publish without actually publishing
npm publish --dry-run

# Review output - what files would be published
```

### 6.2 Version Check
```bash
# Verify version is correct
npm version  # shows current version

# If version needs update:
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### 6.3 Publish to NPM
```bash
# For public package
npm publish --access public

# For scoped package
npm publish --access public  # or --access restricted

# Enter 2FA code when prompted
```

### 6.4 Verify Publication
```bash
# Check package page
npm view photon/core

# Verify version published
npm view photon/core version

# Check package contents
npm view photon/core dist.tarball
```

---

## Phase 7: Post-Publish Validation

### 7.1 Install from NPM
```bash
# Create fresh test directory
mkdir /tmp/test-npm-install
cd /tmp/test-npm-install
npm init -y

# Install published package
npm install photon/core

# Verify installation
npm ls photon/core
```

### 7.2 Test Published Package
```bash
# Test basic import
node -e "const photon = require('photon/core'); console.log(Object.keys(photon))"

# Test named imports
node -e "const { models } = require('photon/core'); console.log(new models.Rectangle(10, 10))"

# Test ES module
node -e "import('photon/core').then(p => console.log(Object.keys(p)))"
```

### 7.3 Update Documentation Project
```bash
# In photon documentation directory
cd /path/to/photon

# Remove npm link
npm unlink photon/core

# Install from npm
npm install photon/core --save-dev

# Verify installation
npm ls photon/core
```

### 7.4 Run Full Documentation Validation
```bash
# Run example validator on all documentation
python3 scripts/migration/validation/example_validator.py \
  docs-new/docs \
  --output validation-examples.json

# Check results
cat validation-examples.json | jq '.summary'

# Expected output:
# {
#   "total": <number>,
#   "passed": <number>,
#   "failed": 0,
#   "pass_rate": "100%"
# }
```

### 7.5 Run Playwright Tests
```bash
# Start MkDocs server
cd docs-new
mkdocs serve &

# Run tests
cd ..
npx playwright test

# Verify all tests pass
# Expected: 15/15 tests passing
```

---

## Phase 8: Complete Migration Checklist Items

### 8.1 Execute Pending Tasks
Now that photon/core is published, complete these tasks:

- [ ] **T077**: Run example_validator.py on all code examples
  ```bash
  python3 scripts/migration/validation/example_validator.py docs-new/docs
  ```

- [ ] **T078**: Fix any failing examples
  ```bash
  # Review validation-examples.json
  # Fix failing examples
  # Re-run validator until 100% pass rate
  ```

- [ ] **T079**: Manual review of refactored content
  ```bash
  # Review 10% of pages (7 pages minimum)
  # Verify visual output matches expectations
  # Check comments are accurate
  ```

- [ ] **T080**: Test refactored examples in playground
  ```bash
  # Open playground
  # Test representative examples
  # Verify they execute and render correctly
  ```

### 8.2 Update Checklist Status
- [ ] Mark all [⏳] items as [X] in `content-refactoring.md`
- [ ] Update `modernization-summary.md` with final statistics
- [ ] Document any issues found and fixed

### 8.3 Generate TypeDoc (if applicable)
If photon/core has TypeScript definitions:
```bash
# In photon/core directory
npm install -D typedoc
npx typedoc src/index.ts --out docs

# Copy to documentation
cp -r docs /path/to/photon/docs-new/docs/api/

# Update navigation in mkdocs.yml
```

---

## Phase 9: Proceed to Phase 10

Once all validation is complete:
- [ ] All checklist items complete
- [ ] All Playwright tests passing
- [ ] Example validator at 100%
- [ ] Manual review complete
- [ ] Ready to proceed to Phase 10: Cleanup & Deprecation

---

## Troubleshooting

### Issue: npm publish fails with authentication error
**Solution**: Ensure you're logged in and 2FA is working
```bash
npm logout
npm login
npm whoami
```

### Issue: Package name already taken
**Solution**: Use scoped package or different name
```bash
# Try scoped package
@your-username/photon-core
# Or different name
photon-drawing-core
```

### Issue: Files missing from published package
**Solution**: Check .npmignore and package.json files field
```bash
# Review what will be published
npm pack --dry-run
```

### Issue: Import errors after publishing
**Solution**: Verify main/module/types fields in package.json
```bash
npm view photon/core
# Check main, module, types fields
```

### Issue: Example validator fails
**Solution**: Check Node.js version and dependencies
```bash
node --version  # Should be 18+
npm install  # Ensure all deps installed
```

---

## Quick Reference Commands

```bash
# Pre-publish
npm run build
npm pack
npm publish --dry-run

# Publish
npm login
npm publish --access public

# Verify
npm view photon/core
npm install photon/core

# Test
node -e "const p = require('photon/core'); console.log(p)"
python3 scripts/migration/validation/example_validator.py docs-new/docs

# Complete migration
# Mark tasks T077-T080 as complete
# Update checklists
# Proceed to Phase 10
```

---

## Notes

- Keep the tarball from `npm pack` as backup
- Document the published version in CHANGELOG.md
- Tag the git commit with the version number
- Consider setting up automated publishing via GitHub Actions
- Monitor npm download stats after publishing

**Once photon/core is published and validated, the documentation migration can proceed to Phase 10: Cleanup & Deprecation.**
