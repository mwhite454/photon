#!/bin/bash
# Verify all files use ES6 imports (no require() statements)

EXAMPLES_DIR="packages/photon/examples"
PLAYGROUND_DIR="packages/playground/models"
FAILED=0
TOTAL=0
PASSED=0

echo "=== Verifying ES6 Imports ==="
echo ""

# Check examples directory
for file in $EXAMPLES_DIR/*.js $EXAMPLES_DIR/*.ts; do
  if [ -f "$file" ]; then
    TOTAL=$((TOTAL + 1))
    # Check for require( but exclude comments
    if grep -v "^[[:space:]]*\/\/" "$file" | grep -v "^[[:space:]]*\*" | grep -q "require(" 2>/dev/null; then
      echo "✗ $file - Found require() statement"
      FAILED=1
    else
      echo "✓ $file - ES6 imports only"
      PASSED=$((PASSED + 1))
    fi
  fi
done

# Check playground directory
for file in $PLAYGROUND_DIR/*.js; do
  if [ -f "$file" ]; then
    TOTAL=$((TOTAL + 1))
    if grep -v "^[[:space:]]*\/\/" "$file" | grep -v "^[[:space:]]*\*" | grep -q "require(" 2>/dev/null; then
      echo "✗ $file - Found require() statement"
      FAILED=1
    else
      echo "✓ $file - ES6 imports only"
      PASSED=$((PASSED + 1))
    fi
  fi
done

echo ""
echo "Summary: $PASSED/$TOTAL files passed"

if [ $FAILED -eq 1 ]; then
  echo "FAILED: Files still using require()"
  exit 1
else
  echo "PASSED: All files use ES6 imports"
  exit 0
fi
