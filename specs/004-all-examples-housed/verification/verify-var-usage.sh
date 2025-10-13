#!/bin/bash
# Verify all files use const/let (no var declarations)

EXAMPLES_DIR="packages/photon/examples"
PLAYGROUND_DIR="packages/playground/models"
FAILED=0
TOTAL=0
PASSED=0

echo "=== Verifying const/let Usage ==="
echo ""

# Check examples directory
for file in $EXAMPLES_DIR/*.js $EXAMPLES_DIR/*.ts; do
  if [ -f "$file" ]; then
    TOTAL=$((TOTAL + 1))
    # Check for var declarations but exclude comments
    if grep -v "^[[:space:]]*\/\/" "$file" | grep -v "^[[:space:]]*\*" | grep -E "^var |[[:space:]]var " 2>/dev/null | grep -q "var "; then
      echo "✗ $file - Found var declaration"
      FAILED=1
    else
      echo "✓ $file - const/let only"
      PASSED=$((PASSED + 1))
    fi
  fi
done

# Check playground directory
for file in $PLAYGROUND_DIR/*.js; do
  if [ -f "$file" ]; then
    TOTAL=$((TOTAL + 1))
    if grep -v "^[[:space:]]*\/\/" "$file" | grep -v "^[[:space:]]*\*" | grep -E "^var |[[:space:]]var " 2>/dev/null | grep -q "var "; then
      echo "✗ $file - Found var declaration"
      FAILED=1
    else
      echo "✓ $file - const/let only"
      PASSED=$((PASSED + 1))
    fi
  fi
done

echo ""
echo "Summary: $PASSED/$TOTAL files passed"

if [ $FAILED -eq 1 ]; then
  echo "FAILED: Files still using var declarations"
  exit 1
else
  echo "PASSED: All files use const/let"
  exit 0
fi
