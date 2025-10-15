#!/bin/bash
# Test script for automatic documentation publication
# Verifies that docs-deploy workflow triggers on docs changes

set -e

echo "🧪 Testing Automatic Documentation Publication"
echo "=============================================="
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if docs-deploy.yml exists
WORKFLOW_FILE=".github/workflows/docs-deploy.yml"
if [ ! -f "$WORKFLOW_FILE" ]; then
    echo "❌ Error: Workflow file not found: $WORKFLOW_FILE"
    exit 1
fi

echo "✅ Git repository detected"
echo "✅ Workflow file exists: $WORKFLOW_FILE"
echo ""

# Verify workflow configuration
echo "📋 Verifying workflow configuration..."

# Check for push trigger on main branch
if grep -q "push:" "$WORKFLOW_FILE" && grep -q "main" "$WORKFLOW_FILE"; then
    echo "✅ Push trigger on 'main' branch configured"
else
    echo "❌ Push trigger on 'main' branch NOT configured"
    exit 1
fi

# Check for docs/** path filter
if grep -q "docs/" "$WORKFLOW_FILE"; then
    echo "✅ Path filter for 'docs/**' configured"
else
    echo "❌ Path filter for 'docs/**' NOT configured"
    exit 1
fi

# Check for correct permissions
if grep -q "pages: write" "$WORKFLOW_FILE" && grep -q "id-token: write" "$WORKFLOW_FILE"; then
    echo "✅ GitHub Pages permissions configured"
else
    echo "❌ GitHub Pages permissions NOT configured"
    exit 1
fi

# Check for deploy-pages action
if grep -q "actions/deploy-pages@v4" "$WORKFLOW_FILE"; then
    echo "✅ Deploy action configured (actions/deploy-pages@v4)"
else
    echo "❌ Deploy action NOT configured"
    exit 1
fi

echo ""
echo "✅ All workflow configuration checks passed!"
echo ""
echo "📝 To test automatic publication:"
echo "   1. Make a change to any file in docs/"
echo "   2. Commit and push to main branch"
echo "   3. Check GitHub Actions tab for workflow run"
echo "   4. Verify site updates at https://mwhite454.github.io/photon/"
echo ""
echo "🎯 Test complete!"
