# Quickstart: Local Development Site Preview & Defect Inventory

**Feature**: 005-as-a-photon  
**Purpose**: Enable proper local documentation preview and automated defect discovery

## Important: Development vs Production

**This guide is for local development only.** The production site (maker.js.org) is deployed via GitHub Pages, which automatically handles Jekyll processing. No deployment changes are needed.

**What's broken**: Local Express server serves raw Jekyll templates instead of built HTML  
**What's fixed**: Local server now builds Jekyll site and serves the processed output  
**Production**: Already works correctly - no changes needed

## Prerequisites

### 1. Ruby & Jekyll

Jekyll is required to build the documentation site from templates.

**macOS**:
```bash
# Ruby comes pre-installed on macOS
gem install jekyll bundler
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt-get update
sudo apt-get install ruby-full build-essential zlib1g-dev
gem install jekyll bundler
```

**Windows**:
1. Download and install [RubyInstaller with DevKit](https://rubyinstaller.org/)
2. Run `ridk install` and select option 3 (MSYS2 and MINGW development toolchain)
3. Open new command prompt and run:
```bash
gem install jekyll bundler
```

**Verify Installation**:
```bash
jekyll --version
# Should output: jekyll 4.x.x or higher
```

### 2. Node.js & Dependencies

```bash
# Install project dependencies (if not already done)
npm install

# Install Playwright browsers (if not already done)
npx playwright install
```

### 3. Verify MCP Playwright Server

The mcp-playwright server should be available in your development environment. Verify by checking your IDE's MCP server configuration.

## Starting the Development Server

### Option 1: Quick Start (Recommended)

```bash
# From repository root
npm start
```

This will:
1. Build the Jekyll documentation site
2. Start the Express server on http://localhost:3000
3. Watch for changes and rebuild automatically

### Option 2: Manual Jekyll Build

```bash
# Build Jekyll site manually
cd docs
jekyll build

# Start server (from repository root)
node playground-server.js
```

## Verifying the Setup

### 1. Check Server Status

Open http://localhost:3000 in your browser. You should see:
- ✅ Homepage loads with proper styling
- ✅ Navigation links work
- ✅ Documentation pages show rendered content (not raw templates)

### 2. Check Documentation Pages

Navigate to http://localhost:3000/docs/getting-started/

**Expected**: Full documentation with code examples and explanatory text

**Not Expected**: Raw YAML front matter like `snippet_titles: [...]`

### 3. Check Console for Errors

Open browser DevTools (F12) and check the Console tab:
- ✅ No 404 errors for CSS files
- ✅ No JavaScript errors
- ✅ All resources load successfully

## Running Defect Discovery

### Automated Site Crawl

```bash
# Run the defect crawler
node scripts/defect-crawler.js

# Output will be saved to:
# specs/005-as-a-photon/defect-inventory.json
# specs/005-as-a-photon/defect-inventory.md
```

### Compare with Production

```bash
# Compare local site with maker.js.org
node scripts/compare-sites.js

# This will:
# 1. Crawl both local and production sites
# 2. Generate comparison report
# 3. Highlight differences in styling and content
```

## Understanding the Defect Report

The defect inventory report (`defect-inventory.md`) contains:

### Summary Section
- Total pages discovered
- Pages with defects
- Defects by severity (Critical, High, Medium, Low)
- Defects by type (Missing Styles, Broken Links, Console Errors, etc.)

### Defect Details
Each defect includes:
- **ID**: Unique identifier (DEF-###)
- **Page**: Where the defect was found
- **Type**: Category of defect
- **Severity**: Impact level
- **Description**: What's wrong
- **Expected vs Actual**: What should happen vs what does happen
- **Reproduction Steps**: How to reproduce the issue
- **Screenshot**: Visual evidence (if applicable)
- **Console Errors**: Related error messages

### Priority Order

Fix defects in this order:
1. **Critical**: Blocks core functionality (e.g., pages don't load, content missing)
2. **High**: Significant UX impact (e.g., styling broken, navigation broken)
3. **Medium**: Noticeable but has workarounds (e.g., some styles missing)
4. **Low**: Minor cosmetic issues (e.g., minor formatting problems)

## Common Issues & Solutions

### Issue: "Jekyll command not found"

**Solution**: Install Jekyll following the prerequisites section above.

### Issue: "Permission denied" when installing gems

**Solution**: 
```bash
# Don't use sudo with gem install
# Instead, configure gem to install to user directory
echo 'export GEM_HOME="$HOME/.gem"' >> ~/.bashrc
echo 'export PATH="$HOME/.gem/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
gem install jekyll bundler
```

### Issue: Documentation pages still show raw templates

**Possible Causes**:
1. Jekyll build didn't run
2. Jekyll build failed silently
3. Server is serving wrong directory

**Solution**:
```bash
# Check if _site directory exists
ls -la docs/_site

# If missing, manually build
cd docs
jekyll build --verbose

# Check for errors in output
```

### Issue: CSS files return 404

**Possible Causes**:
1. Jekyll didn't copy static assets
2. CSS paths are incorrect in templates

**Solution**:
```bash
# Check if stylesheets exist in _site
ls -la docs/_site/stylesheets

# If missing, check Jekyll config
cat docs/_config.yml

# Ensure 'exclude' doesn't block stylesheets
```

### Issue: Playwright timeout errors

**Solution**:
```bash
# Increase timeout in crawler script
# Edit scripts/defect-crawler.js
# Change: timeout: 30000 to timeout: 60000

# Or run with headful mode to debug
# Edit script to set headless: false
```

## Development Workflow

### Making Documentation Changes

1. Edit documentation files in `docs/docs/`
2. Jekyll will automatically rebuild (if server is running with watch mode)
3. Refresh browser to see changes
4. Run defect crawler to verify no new issues

### Testing Changes

```bash
# Run tests
npm test

# Run only defect discovery tests
npm test -- tests/defect-discovery/
```

### Generating Updated Inventory

```bash
# After fixing defects, regenerate inventory
node scripts/defect-crawler.js

# Compare before/after
diff specs/005-as-a-photon/defect-inventory-old.md \
     specs/005-as-a-photon/defect-inventory.md
```

## File Locations

### Source Files
- **Jekyll Templates**: `docs/docs/` (HTML with YAML front matter)
- **Jekyll Layouts**: `docs/_layouts/`
- **Jekyll Snippets**: `docs/_snippets/`
- **Jekyll Config**: `docs/_config.yml`
- **Server Script**: `playground-server.js`

### Generated Files
- **Built Site**: `docs/_site/` (gitignored)
- **Defect Reports**: `specs/005-as-a-photon/defect-inventory.*`
- **Screenshots**: `specs/005-as-a-photon/screenshots/`

### Automation Scripts
- **Jekyll Build**: `scripts/jekyll-build.js`
- **Defect Crawler**: `scripts/defect-crawler.js`
- **Site Comparison**: `scripts/compare-sites.js`

## Next Steps

1. ✅ Verify Jekyll is installed and working
2. ✅ Start the development server
3. ✅ Confirm documentation renders properly
4. ✅ Run defect discovery
5. ✅ Review defect inventory report
6. 🔄 Fix defects by priority
7. 🔄 Re-run crawler to verify fixes
8. 🔄 Repeat until all critical/high defects resolved

## Support

If you encounter issues not covered here:
1. Check the defect inventory for similar issues
2. Review Jekyll build output for errors
3. Check browser console for JavaScript errors
4. Verify all prerequisites are installed correctly
5. Consult the full implementation plan in `specs/005-as-a-photon/plan.md`
