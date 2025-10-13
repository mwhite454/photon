#!/bin/bash
# Verify all files use photon namespace (no makerjs references in code)

EXAMPLES_DIR="packages/photon/examples"
PLAYGROUND_DIR="packages/playground/models"
FAILED=0
TOTAL=0
PASSED=0

echo "=== Verifying Photon Namespace ==="
echo ""

# Check examples directory
for file in $EXAMPLES_DIR/*.js $EXAMPLES_DIR/*.ts $EXAMPLES_DIR/*.html; do
  if [ -f "$file" ]; then
    TOTAL=$((TOTAL + 1))
    # Check for makerjs but exclude comments (allow in comments for historical context)
    if grep -v "^[[:space:]]*\/\/" "$file" | grep -v "^[[:space:]]*\*" | grep -v "^[[:space:]]*<!--" | grep -q "makerjs" 2>/dev/null; then
      echo "✗ $file - Found makerjs reference in code"
      FAILED=1
    else
      echo "✓ $file - photon namespace only"
      PASSED=$((PASSED + 1))
    fi
  fi
done

# Check playground directory
for file in $PLAYGROUND_DIR/*.js; do
  if [ -f "$file" ]; then
    TOTAL=$((TOTAL + 1))
    if grep -v "^[[:space:]]*\/\/" "$file" | grep -v "^[[:space:]]*\*" | grep -q "makerjs" 2>/dev/null; then
      echo "✗ $file - Found makerjs reference in code"
      FAILED=1
    else
      echo "✓ $file - photon namespace only"
      PASSED=$((PASSED + 1))
    fi
  fi
done

echo ""
echo "Summary: $PASSED/$TOTAL files passed"

if [ $FAILED -eq 1 ]; then
  echo "FAILED: Files still referencing 'makerjs'"
  exit 1
else
  echo "PASSED: All files use photon namespace"
  exit 0
fi
