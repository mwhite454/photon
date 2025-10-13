#!/bin/bash
# Run all verification checks

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FAILED=0

echo "========================================"
echo "Photon Examples Modernization Verification"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================"
echo ""

# Run imports verification
echo "[1/3] Verifying ES6 imports..."
"$SCRIPT_DIR/verify-imports.sh"
if [ $? -ne 0 ]; then
  FAILED=1
fi
echo ""

# Run variable declarations verification
echo "[2/3] Verifying const/let usage..."
"$SCRIPT_DIR/verify-var-usage.sh"
if [ $? -ne 0 ]; then
  FAILED=1
fi
echo ""

# Run namespace verification
echo "[3/3] Verifying photon namespace..."
"$SCRIPT_DIR/verify-namespace.sh"
if [ $? -ne 0 ]; then
  FAILED=1
fi
echo ""

# Final summary
echo "========================================"
if [ $FAILED -eq 0 ]; then
  echo "✓ ALL CHECKS PASSED"
  echo "========================================"
  echo ""
  echo "All files have been successfully modernized:"
  echo "  ✓ ES6 imports only"
  echo "  ✓ const/let declarations"
  echo "  ✓ photon namespace"
  echo ""
  echo "Ready for commit and PR."
else
  echo "✗ VERIFICATION FAILED"
  echo "========================================"
  echo ""
  echo "Some files still need migration."
  echo "Run individual scripts for details:"
  echo "  ./verify-imports.sh"
  echo "  ./verify-var-usage.sh"
  echo "  ./verify-namespace.sh"
fi
echo ""

exit $FAILED
