#!/bin/bash
# Automated NPM publishing script for Photon packages
# Uses stored npm credentials for user: 7syllable

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Photon NPM Publishing Script${NC}"
echo "=================================="

# Check if version is provided
if [ -z "$1" ]; then
  echo -e "${RED}❌ Error: Version number required${NC}"
  echo "Usage: ./scripts/publish-photon.sh <version> [tag]"
  echo "Example: ./scripts/publish-photon.sh 2.0.0 latest"
  exit 1
fi

VERSION=$1
TAG=${2:-latest}

echo -e "${YELLOW}Version: ${VERSION}${NC}"
echo -e "${YELLOW}NPM Tag: ${TAG}${NC}"
echo ""

# Verify npm authentication
echo "Checking npm authentication..."
if ! npm whoami &> /dev/null; then
  echo -e "${RED}❌ Not logged in to npm${NC}"
  echo "Please run: npm login"
  exit 1
fi

NPM_USER=$(npm whoami)
echo -e "${GREEN}✅ Logged in as: ${NPM_USER}${NC}"

if [ "$NPM_USER" != "7syllable" ]; then
  echo -e "${YELLOW}⚠️  Warning: Expected user '7syllable', got '${NPM_USER}'${NC}"
  read -p "Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Run verification scripts
echo ""
echo "Running verification scripts..."
chmod +x specs/001-rebrand-from-maker/verification/*.sh

./specs/001-rebrand-from-maker/verification/verify-package-names.sh || exit 1
./specs/001-rebrand-from-maker/verification/verify-namespaces.sh || exit 1
./specs/001-rebrand-from-maker/verification/verify-docs.sh || exit 1

# Build all packages
echo ""
echo "Building all packages..."
npm run build || exit 1

# Verify distribution files
./specs/001-rebrand-from-maker/verification/verify-dist-files.sh || exit 1

# Update versions
echo ""
echo "Updating package versions to ${VERSION}..."
npm version $VERSION --no-git-tag-version --workspaces
npm version $VERSION --no-git-tag-version

# Confirm before publishing
echo ""
echo -e "${YELLOW}Ready to publish the following packages:${NC}"
echo "  - @photon/core@${VERSION}"
echo "  - @photon/playground@${VERSION}"
echo "  - @photon/fonts@${VERSION}"
echo "  - @photon/docs@${VERSION}"
echo ""
echo -e "${YELLOW}NPM Tag: ${TAG}${NC}"
echo ""
read -p "Proceed with publishing? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Publishing cancelled"
  exit 1
fi

# Publish packages
echo ""
echo "Publishing packages..."

echo "📦 Publishing @photon/core..."
cd packages/photon
npm publish --access public --tag $TAG
cd ../..

echo "📦 Publishing @photon/playground..."
cd packages/playground
npm publish --access public --tag $TAG
cd ../..

echo "📦 Publishing @photon/fonts..."
cd packages/fonts
npm publish --access public --tag $TAG
cd ../..

echo "📦 Publishing @photon/docs..."
cd packages/docs
npm publish --access public --tag $TAG
cd ../..

# Create git tag
echo ""
echo "Creating git tag v${VERSION}..."
git tag -a "v${VERSION}" -m "Release v${VERSION}"

echo ""
echo -e "${GREEN}✅ Successfully published Photon v${VERSION}!${NC}"
echo ""
echo "Next steps:"
echo "  1. Push git tag: git push origin v${VERSION}"
echo "  2. Create GitHub release"
echo "  3. Announce on social media"
echo ""
echo "Verify installation:"
echo "  npm install @photon/core@${VERSION}"
