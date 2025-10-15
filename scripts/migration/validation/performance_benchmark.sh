#!/bin/bash

# Performance Benchmarking for MkDocs Migration
# Tests: Build time, hot-reload readiness, basic performance metrics

set -e

DOCS_DIR="${1:-docs-new}"
RESULTS_FILE="${2:-reports/migration/performance-benchmark.json}"

echo "🔬 MkDocs Performance Benchmarking"
echo "==================================="
echo "Docs directory: $DOCS_DIR"
echo ""

cd "$DOCS_DIR" || exit 1

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: MkDocs Build Time (target <10s)
echo "📦 Test 1: MkDocs Build Time (target <10s)"
echo "-------------------------------------------"

# Clean previous build
rm -rf site/

# Measure build time
START_TIME=$(date +%s.%N)
mkdocs build --strict 2>&1
BUILD_EXIT_CODE=$?
END_TIME=$(date +%s.%N)
BUILD_TIME=$(echo "$END_TIME - $START_TIME" | bc)

echo ""
if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo -e "Build completed in: ${GREEN}${BUILD_TIME}s${NC}"
    if (( $(echo "$BUILD_TIME < 10" | bc -l) )); then
        echo -e "Status: ${GREEN}✓ PASS${NC} (< 10s target)"
        BUILD_STATUS="pass"
    else
        echo -e "Status: ${YELLOW}⚠ WARN${NC} (>= 10s, target is <10s)"
        BUILD_STATUS="warning"
    fi
else
    echo -e "Status: ${RED}✗ FAIL${NC} (build failed)"
    BUILD_STATUS="fail"
fi

# Test 2: Site size and page count
echo ""
echo "📊 Test 2: Site Metrics"
echo "-------------------------------------------"

if [ -d "site" ]; then
    SITE_SIZE=$(du -sh site | cut -f1)
    PAGE_COUNT=$(find site -name "*.html" | wc -l | tr -d ' ')
    echo "Site size: $SITE_SIZE"
    echo "HTML pages: $PAGE_COUNT"
else
    SITE_SIZE="N/A"
    PAGE_COUNT=0
    echo "Site directory not found (build may have failed)"
fi

# Test 3: Dev server startup time
echo ""
echo "🚀 Test 3: Dev Server Startup"
echo "-------------------------------------------"
echo "Starting MkDocs dev server..."

# Start dev server in background and capture startup time
START_TIME=$(date +%s.%N)
mkdocs serve --dev-addr=127.0.0.1:8001 > /tmp/mkdocs-server.log 2>&1 &
SERVER_PID=$!

# Wait for server to be ready (check for "Serving on" message)
TIMEOUT=30
ELAPSED=0
SERVER_READY=false

while [ $ELAPSED -lt $TIMEOUT ]; do
    if grep -q "Serving on" /tmp/mkdocs-server.log 2>/dev/null; then
        END_TIME=$(date +%s.%N)
        STARTUP_TIME=$(echo "$END_TIME - $START_TIME" | bc)
        SERVER_READY=true
        break
    fi
    sleep 0.5
    ELAPSED=$((ELAPSED + 1))
done

if [ "$SERVER_READY" = true ]; then
    echo -e "Server started in: ${GREEN}${STARTUP_TIME}s${NC}"
    if (( $(echo "$STARTUP_TIME < 2" | bc -l) )); then
        echo -e "Status: ${GREEN}✓ PASS${NC} (< 2s target)"
        STARTUP_STATUS="pass"
    else
        echo -e "Status: ${YELLOW}⚠ WARN${NC} (>= 2s, target is <2s)"
        STARTUP_STATUS="warning"
    fi
else
    echo -e "Status: ${RED}✗ FAIL${NC} (server startup timeout)"
    STARTUP_TIME="timeout"
    STARTUP_STATUS="fail"
fi

# Cleanup: Stop the dev server
if [ -n "$SERVER_PID" ]; then
    kill $SERVER_PID 2>/dev/null || true
    wait $SERVER_PID 2>/dev/null || true
fi

# Test 4: Search index size
echo ""
echo "🔍 Test 4: Search Index"
echo "-------------------------------------------"

if [ -f "site/search/search_index.json" ]; then
    SEARCH_SIZE=$(du -h site/search/search_index.json | cut -f1)
    SEARCH_ENTRIES=$(grep -o '"location":' site/search/search_index.json | wc -l | tr -d ' ')
    echo "Search index size: $SEARCH_SIZE"
    echo "Search entries: $SEARCH_ENTRIES"
    SEARCH_STATUS="available"
else
    echo "Search index not found"
    SEARCH_SIZE="N/A"
    SEARCH_ENTRIES=0
    SEARCH_STATUS="missing"
fi

# Generate JSON report
echo ""
echo "💾 Generating JSON report..."

# Ensure output directory exists at repo root
mkdir -p "../../../$(dirname "$RESULTS_FILE")"

cat > "../../../$RESULTS_FILE" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "docs_directory": "$DOCS_DIR",
  "build": {
    "time_seconds": $BUILD_TIME,
    "target_seconds": 10,
    "status": "$BUILD_STATUS",
    "exit_code": $BUILD_EXIT_CODE
  },
  "site": {
    "size": "$SITE_SIZE",
    "page_count": $PAGE_COUNT
  },
  "server": {
    "startup_time_seconds": "$STARTUP_TIME",
    "target_seconds": 2,
    "status": "$STARTUP_STATUS"
  },
  "search": {
    "index_size": "$SEARCH_SIZE",
    "entries": $SEARCH_ENTRIES,
    "status": "$SEARCH_STATUS"
  },
  "overall_status": "$([ "$BUILD_STATUS" = "pass" ] && [ "$STARTUP_STATUS" = "pass" ] && echo "pass" || echo "needs_review")"
}
EOF

echo "✓ Report saved to: $RESULTS_FILE"

# Print summary
echo ""
echo "==================================="
echo "📋 PERFORMANCE SUMMARY"
echo "==================================="
echo "Build time:      ${BUILD_TIME}s (target: <10s)"
echo "Server startup:  ${STARTUP_TIME}s (target: <2s)"
echo "Site size:       $SITE_SIZE"
echo "Pages:           $PAGE_COUNT"
echo "Search entries:  $SEARCH_ENTRIES"
echo "==================================="

# Exit with appropriate code
if [ "$BUILD_STATUS" = "fail" ] || [ "$STARTUP_STATUS" = "fail" ]; then
    exit 1
else
    exit 0
fi
