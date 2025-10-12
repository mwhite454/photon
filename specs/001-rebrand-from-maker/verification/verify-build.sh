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
