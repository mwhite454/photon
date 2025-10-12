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
