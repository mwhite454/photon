#!/bin/bash
# Script to update package name from 'photon/core' to '@7syllable/photon-core' in documentation

echo "Updating package name in documentation..."

# Find and replace in all .md files, excluding node_modules
find docs-new/docs -type f -name "*.md" ! -path "*/node_modules/*" -exec sed -i '' \
  -e "s/'photon\/core'/'@7syllable\/photon-core'/g" \
  -e 's/"photon\/core"/"@7syllable\/photon-core"/g' \
  -e "s/from 'photon'/from '@7syllable\/photon-core'/g" \
  -e 's/from "photon"/from "@7syllable\/photon-core"/g' \
  {} +

echo "Package name updated in documentation files!"
echo ""
echo "Summary:"
grep -r "@7syllable/photon-core" docs-new/docs --include="*.md" ! -path "*/node_modules/*" | wc -l
echo "occurrences of '@7syllable/photon-core' found in documentation"
