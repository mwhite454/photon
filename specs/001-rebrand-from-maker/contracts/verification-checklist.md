# Rebrand Verification Checklist

**Feature**: Rebrand to Photon  
**Purpose**: Automated and manual verification that rebrand is complete and correct  
**Date**: 2025-10-10

## Automated Verification Scripts

### Script 1: Package Name Verification

```bash
#!/bin/bash
# verify-package-names.sh
# Verifies all package.json files use "photon" naming

echo "Checking package names..."
ERRORS=0

# Check each package.json
for pkg in package.json packages/*/package.json; do
  if grep -q '"name".*makerjs' "$pkg"; then
    echo "❌ FAIL: $pkg still contains 'makerjs' in name field"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ PASS: $pkg"
  fi
done

# Check for photon naming
PHOTON_COUNT=$(grep -r '"name".*photon' package.json packages/*/package.json | wc -l)
if [ "$PHOTON_COUNT" -lt 4 ]; then
  echo "❌ FAIL: Expected at least 4 packages with 'photon' in name, found $PHOTON_COUNT"
  ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -eq 0 ]; then
  echo "✅ All package names verified"
  exit 0
else
  echo "❌ $ERRORS errors found"
  exit 1
fi
```

### Script 2: Namespace Verification

```bash
#!/bin/bash
# verify-namespaces.sh
# Verifies no MakerJs namespaces remain in TypeScript

echo "Checking TypeScript namespaces..."
ERRORS=0

# Check for old namespace
if grep -r "namespace MakerJs" packages/*/src --include="*.ts"; then
  echo "❌ FAIL: Found 'namespace MakerJs' in source files"
  ERRORS=$((ERRORS + 1))
fi

# Check for Photon namespace exists
if ! grep -r "namespace Photon" packages/photon/src --include="*.ts" > /dev/null; then
  echo "❌ FAIL: 'namespace Photon' not found in core library"
  ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -eq 0 ]; then
  echo "✅ All namespaces verified"
  exit 0
else
  echo "❌ $ERRORS errors found"
  exit 1
fi
```

### Script 3: Distribution File Verification

```bash
#!/bin/bash
# verify-dist-files.sh
# Verifies distribution files have correct names

echo "Checking distribution files..."
ERRORS=0

DIST_DIR="packages/photon/dist"

# Check for old file names
if ls $DIST_DIR/*maker* 2>/dev/null; then
  echo "❌ FAIL: Found files with 'maker' in name in $DIST_DIR"
  ERRORS=$((ERRORS + 1))
fi

# Check for new file names
REQUIRED_FILES=("photon.es.js" "photon.umd.js" "photon.d.ts")
for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$DIST_DIR/$file" ]; then
    echo "❌ FAIL: Missing required file: $DIST_DIR/$file"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ PASS: Found $file"
  fi
done

if [ $ERRORS -eq 0 ]; then
  echo "✅ All distribution files verified"
  exit 0
else
  echo "❌ $ERRORS errors found"
  exit 1
fi
```

### Script 4: Documentation Reference Verification

```bash
#!/bin/bash
# verify-docs.sh
# Verifies documentation uses Photon branding

echo "Checking documentation..."
ERRORS=0

# Check README
if grep -i "maker\.js" README.md | grep -v "fork of" | grep -v "originally" | grep -v "Origins"; then
  echo "⚠️  WARNING: README contains 'Maker.js' outside attribution section"
fi

# Check for Photon branding
if ! grep -q "# Photon" README.md; then
  echo "❌ FAIL: README doesn't have '# Photon' header"
  ERRORS=$((ERRORS + 1))
fi

# Check NOTICE file exists
if [ ! -f "NOTICE" ]; then
  echo "❌ FAIL: NOTICE file missing"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ PASS: NOTICE file exists"
fi

# Check ROADMAP exists
if [ ! -f "ROADMAP.md" ]; then
  echo "❌ FAIL: ROADMAP.md missing"
  ERRORS=$((ERRORS + 1))
else
  echo "✅ PASS: ROADMAP.md exists"
fi

if [ $ERRORS -eq 0 ]; then
  echo "✅ Documentation verified"
  exit 0
else
  echo "❌ $ERRORS errors found"
  exit 1
fi
```

### Script 5: Build Verification

```bash
#!/bin/bash
# verify-build.sh
# Verifies project builds successfully

echo "Running build..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful"
  exit 0
else
  echo "❌ Build failed"
  exit 1
fi
```

## Manual Verification Checklist

### Core Identity (P1)

- [ ] **Package Names**
  - [ ] Run `./verify-package-names.sh`
  - [ ] All 5 package.json files use "photon" naming
  - [ ] No "makerjs" in package name fields

- [ ] **TypeScript Namespaces**
  - [ ] Run `./verify-namespaces.sh`
  - [ ] No `namespace MakerJs` in source code
  - [ ] `namespace Photon` exists in core library
  - [ ] `namespace PhotonPlayground` exists in playground

- [ ] **Distribution Files**
  - [ ] Run `./verify-dist-files.sh`
  - [ ] Files named photon.es.js, photon.umd.js, photon.d.ts exist
  - [ ] No files with "maker" in dist/ directories

- [ ] **Legal Attribution**
  - [ ] LICENSE file has dual copyright (Microsoft + new maintainer)
  - [ ] NOTICE file exists with fork attribution
  - [ ] NOTICE mentions Apache 2.0 license
  - [ ] NOTICE links to original Maker.js repository

- [ ] **README**
  - [ ] Header is "# Photon"
  - [ ] Has "Origins" or similar section explaining Maker.js fork
  - [ ] Includes brief migration notes (package name mapping)
  - [ ] Installation instructions use @photon/core

### Documentation & Web Presence (P2)

- [ ] **Documentation Files**
  - [ ] Run `./verify-docs.sh`
  - [ ] API documentation regenerated with Photon branding
  - [ ] Tutorial/guide pages updated
  - [ ] Code examples use `require('@photon/core')` or `import photon`

- [ ] **Playground**
  - [ ] Open http://localhost:8020
  - [ ] Title shows "Photon Playground"
  - [ ] Interface displays Photon branding
  - [ ] Example models load correctly
  - [ ] Code execution works
  - [ ] Monaco Editor functions properly

- [ ] **Example Models**
  - [ ] At least 10 examples tested and working
  - [ ] Examples use Photon package names
  - [ ] No console errors when running examples

- [ ] **Links**
  - [ ] Run link checker on documentation
  - [ ] No broken internal links
  - [ ] External links updated where needed

### Future Roadmap (P2)

- [ ] **ROADMAP.md**
  - [ ] File exists in root directory
  - [ ] Contains near-term (3-6 months) goals
  - [ ] Contains mid-term (6-12 months) goals
  - [ ] Contains long-term (1-2 years) vision
  - [ ] Explains how to contribute
  - [ ] Articulates what makes Photon different from Maker.js

- [ ] **CONTRIBUTING.md**
  - [ ] Microsoft CLA references removed
  - [ ] New contribution guidelines established
  - [ ] Links to ROADMAP.md
  - [ ] Clear process for submitting PRs

### Repository Metadata

- [ ] **GitHub Repository**
  - [ ] Description updated to mention Photon
  - [ ] Topics include "photon", "laser-cutting", "cnc"
  - [ ] Topics include "makerjs" for discoverability (temporary)
  - [ ] README displays correctly on GitHub

- [ ] **Constitution**
  - [ ] `.specify/memory/constitution.md` updated
  - [ ] References "Photon" instead of "Maker.js"
  - [ ] Principles still accurate

### Build & Deployment

- [ ] **Build Process**
  - [ ] Run `./verify-build.sh`
  - [ ] `npm run build` completes successfully
  - [ ] All packages build without errors
  - [ ] Build time < 2 minutes

- [ ] **Package Installation**
  - [ ] Test `npm install @photon/core` (after publishing)
  - [ ] Test in Node.js project
  - [ ] Test in browser with CDN
  - [ ] TypeScript definitions work

## Success Criteria Verification

Map to spec success criteria (SC-001 through SC-010):

- [ ] **SC-001**: 100% package names use photon → Run verify-package-names.sh
- [ ] **SC-002**: 100% documentation branding → Manual review + verify-docs.sh
- [ ] **SC-003**: Zero broken links → Link checker tool
- [ ] **SC-004**: README migration section → Manual review
- [ ] **SC-005**: Build outputs correct → verify-dist-files.sh + verify-build.sh
- [ ] **SC-006**: Playground functions → Manual testing at localhost:8020
- [ ] **SC-007**: 10+ examples work → Manual testing
- [ ] **SC-008**: LICENSE/NOTICE compliance → Manual review
- [ ] **SC-009**: README clarity → Manual review (30-second test)
- [ ] **SC-010**: Roadmap goals → Manual review

## Execution Instructions

### Pre-Implementation
1. Review this checklist
2. Understand verification scripts
3. Set up local testing environment

### During Implementation
1. Run verification scripts after each major change
2. Fix issues immediately before proceeding
3. Keep checklist updated

### Post-Implementation
1. Run all automated scripts
2. Complete manual checklist
3. Test playground thoroughly
4. Review all documentation
5. Get peer review if possible

### Before Release
1. All checklist items must be checked
2. All automated scripts must pass
3. Build must be successful
4. Playground must be functional
5. Documentation must be complete

## Notes

- Verification scripts should be executable: `chmod +x verify-*.sh`
- Scripts assume execution from repository root
- Manual checks require human judgment (branding quality, clarity, etc.)
- Some checks can only be performed after npm publication
