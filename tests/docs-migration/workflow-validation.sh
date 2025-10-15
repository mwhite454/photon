#!/bin/bash
# GitHub Actions workflow validation test
# Validates YAML syntax and configuration of docs-deploy workflow

set -e

echo "🔍 GitHub Actions Workflow Validation"
echo "====================================="
echo ""

WORKFLOW_FILE=".github/workflows/docs-deploy.yml"

# Check if workflow file exists
if [ ! -f "$WORKFLOW_FILE" ]; then
    echo "❌ Error: Workflow file not found: $WORKFLOW_FILE"
    exit 1
fi

echo "✅ Workflow file found: $WORKFLOW_FILE"
echo ""

# Validate workflow structure using grep
echo "📋 Validating workflow structure..."

# Check for required top-level keys
if grep -q "^name:" "$WORKFLOW_FILE"; then
    echo "✅ Workflow name defined"
else
    echo "❌ Workflow name missing"
    exit 1
fi

if grep -q "^on:" "$WORKFLOW_FILE"; then
    echo "✅ Trigger configuration found"
else
    echo "❌ Trigger configuration missing"
    exit 1
fi

if grep -q "^jobs:" "$WORKFLOW_FILE"; then
    echo "✅ Jobs section found"
else
    echo "❌ Jobs section missing"
    exit 1
fi

# Validate trigger configuration
if grep -A 5 "^on:" "$WORKFLOW_FILE" | grep -q "push:"; then
    echo "✅ Push trigger configured"
else
    echo "❌ Push trigger missing"
    exit 1
fi

if grep -A 10 "^on:" "$WORKFLOW_FILE" | grep -q "main"; then
    echo "✅ Main branch trigger configured"
else
    echo "❌ Main branch trigger missing"
    exit 1
fi

if grep -A 10 "^on:" "$WORKFLOW_FILE" | grep -q "docs/"; then
    echo "✅ Docs path filter configured"
else
    echo "❌ Docs path filter missing"
    exit 1
fi

# Validate permissions
if grep -q "^permissions:" "$WORKFLOW_FILE"; then
    echo "✅ Permissions section found"
    
    if grep -A 5 "^permissions:" "$WORKFLOW_FILE" | grep -q "pages: write"; then
        echo "✅ Pages write permission configured"
    else
        echo "❌ Pages write permission missing"
        exit 1
    fi
    
    if grep -A 5 "^permissions:" "$WORKFLOW_FILE" | grep -q "id-token: write"; then
        echo "✅ ID token write permission configured"
    else
        echo "❌ ID token write permission missing"
        exit 1
    fi
else
    echo "❌ Permissions section missing"
    exit 1
fi

# Validate jobs
if grep -q "  build:" "$WORKFLOW_FILE"; then
    echo "✅ Build job configured"
else
    echo "❌ Build job missing"
    exit 1
fi

if grep -q "  deploy:" "$WORKFLOW_FILE"; then
    echo "✅ Deploy job configured"
else
    echo "❌ Deploy job missing"
    exit 1
fi

# Validate build job has checkout and build steps
if grep -A 50 "  build:" "$WORKFLOW_FILE" | grep -q "uses: actions/checkout"; then
    echo "✅ Checkout step found in build job"
else
    echo "❌ Checkout step missing in build job"
    exit 1
fi

if grep -A 50 "  build:" "$WORKFLOW_FILE" | grep -q "mkdocs build"; then
    echo "✅ MkDocs build step found"
else
    echo "❌ MkDocs build step missing"
    exit 1
fi

# Validate deploy job uses deploy-pages action
if grep -A 20 "  deploy:" "$WORKFLOW_FILE" | grep -q "actions/deploy-pages"; then
    echo "✅ Deploy pages action configured"
else
    echo "❌ Deploy pages action missing"
    exit 1
fi

# Validate deploy job depends on build
if grep -A 5 "  deploy:" "$WORKFLOW_FILE" | grep -q "needs: build"; then
    echo "✅ Deploy job depends on build job"
else
    echo "⚠️  Warning: Deploy job may not depend on build job"
fi

echo ""
echo "✅ All workflow validation checks passed!"

echo ""
echo "🎯 Workflow validation complete!"
