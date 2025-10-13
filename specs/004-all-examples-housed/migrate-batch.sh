#!/bin/bash
# Batch migration script for remaining example files

# This script performs the standard transformations on each file:
# 1. require() -> import
# 2. makerjs -> photon  
# 3. var -> const (simple cases)
# 4. module.exports -> export default

FILES=(
  "packages/photon/examples/dependExample_forNode.js"
  "packages/photon/examples/fillets.js"
  "packages/photon/examples/filletstar.js"
  "packages/photon/examples/logo.js"
  "packages/photon/examples/m.js"
  "packages/photon/examples/polygonstackbox.js"
  "packages/photon/examples/skatedeck.js"
  "packages/photon/examples/starbox.js"
  "packages/photon/examples/testpanel.js"
  "packages/photon/examples/textOnChain.js"
  "packages/photon/examples/textOnPath.js"
  "packages/photon/examples/tubeclamp.js"
  "packages/photon/examples/ventgrid.js"
  "packages/photon/examples/ventgridcircle.js"
)

echo "Starting batch migration of ${#FILES[@]} files..."

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Migrating: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    
    # 1. Replace require with import
    sed -i '' "s/var makerjs = require.*$/import * as photon from 'photon';/" "$file"
    
    # 2. Replace all makerjs. with photon.
    sed -i '' 's/makerjs\./photon./g' "$file"
    
    # 3. Replace module.exports with export default
    sed -i '' 's/module\.exports = /export default /' "$file"
    
    # 4. Simple var replacements (at start of line or after whitespace)
    # Note: This handles simple cases; complex cases may need manual review
    sed -i '' 's/^var /const /g' "$file"
    sed -i '' 's/[[:space:]]var /const /g' "$file"
    
    echo "  ✓ Completed: $file"
  else
    echo "  ✗ File not found: $file"
  fi
done

echo ""
echo "Batch migration complete!"
echo "Running verification..."
./specs/004-all-examples-housed/verification/verify-all.sh
