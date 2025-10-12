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
