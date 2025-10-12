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
