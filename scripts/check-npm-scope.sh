#!/bin/bash
# Check if @photon npm scope is available

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Checking @photon NPM scope availability...${NC}"
echo ""

PACKAGES=("@photon/core" "@photon/playground" "@photon/fonts" "@photon/docs")

for package in "${PACKAGES[@]}"; do
  echo -n "Checking ${package}... "
  
  if npm view $package &> /dev/null; then
    echo -e "${RED}❌ TAKEN${NC}"
    echo "  Owner: $(npm view $package maintainers --json | grep name | head -1)"
    echo "  Version: $(npm view $package version)"
    echo "  Published: $(npm view $package time.created)"
  else
    echo -e "${GREEN}✅ AVAILABLE${NC}"
  fi
done

echo ""
echo "Checking if you have access to @photon scope..."
NPM_USER=$(npm whoami 2>/dev/null || echo "not-logged-in")

if [ "$NPM_USER" == "not-logged-in" ]; then
  echo -e "${YELLOW}⚠️  Not logged in to npm${NC}"
  echo "Run: npm login"
else
  echo -e "${GREEN}✅ Logged in as: ${NPM_USER}${NC}"
  
  # Check if user can publish to @photon scope
  echo ""
  echo "To claim the @photon scope:"
  echo "  1. Go to: https://www.npmjs.com/org/create"
  echo "  2. Create organization: photon"
  echo "  3. Or request scope from npm support if taken but inactive"
fi

echo ""
echo "Alternative scopes if @photon is taken:"
echo "  - @photonjs/core"
echo "  - @photon-lib/core"
echo "  - @photon-cad/core"
