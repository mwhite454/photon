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
REQUIRED_FILES=("photon.es.js" "photon.umd.js" "types/index.d.ts")
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
