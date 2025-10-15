# Photon Development Server Guide

## Updated npm Commands

### Option 1: Unified Server (Recommended)
Serves both new docs and playground on one server:

```bash
npm start
```

**What it does:**
1. Builds MkDocs documentation
2. Starts Express server on port 3000
3. Serves new docs at `/docs/`
4. Serves playground at `/playground/`

**Available URLs:**
- 📚 **New Documentation**: http://localhost:3000/docs/
- 🎮 **Playground**: http://localhost:3000/playground/
- 📦 **Packages**: http://localhost:3000/packages/
- 🔧 **Models API**: http://localhost:3000/api/models

### Option 2: MkDocs Dev Server (Hot Reload)
For documentation development with live reload:

```bash
npm run dev
# OR
npm run docs:serve
```

**What it does:**
- Starts MkDocs dev server with hot reload
- Watches for file changes and auto-refreshes browser
- Serves at http://localhost:8000

**Use this when:**
- Editing documentation markdown files
- Testing MkDocs configuration changes
- You want instant preview of doc changes

### Option 3: Build Docs Only

```bash
npm run docs:build
```

**What it does:**
- Builds static MkDocs site to `docs-new/site/`
- No server started

**Use this when:**
- Preparing for deployment
- Testing build process
- Before running `npm start`

---

## Server Structure Changes

### Old Setup (Jekyll)
```
npm start → serves docs/ (Jekyll site)
            at http://localhost:3000
```

### New Setup (MkDocs)
```
npm start → builds docs-new/
         → serves docs-new/site/ at /docs/
         → serves docs/playground/ at /playground/
         → root redirects to /docs/
```

---

## Development Workflows

### Workflow 1: Documentation Testing
```bash
# Build docs and start unified server
npm start

# Open browser to:
# http://localhost:3000/docs/
```

### Workflow 2: Documentation Development
```bash
# Terminal 1: MkDocs with hot reload
npm run dev

# Terminal 2: Playground server (if needed)
npm start

# Edit files in docs-new/docs/
# Browser auto-refreshes at http://localhost:8000
```

### Workflow 3: Full Development
```bash
# Build photon package
npm run build

# Link @photon/core
cd packages/photon
npm link
cd ../..
npm link @photon/core

# Start servers
npm start

# Test at http://localhost:3000/docs/
# and http://localhost:3000/playground/
```

---

## Quick Testing Checklist

After running `npm start`, verify:

- [ ] http://localhost:3000 redirects to /docs/
- [ ] http://localhost:3000/docs/ shows new MkDocs site
- [ ] http://localhost:3000/playground/ shows playground
- [ ] Code examples in docs render with syntax highlighting
- [ ] Navigation works in docs
- [ ] Search works in docs
- [ ] No 404 errors in browser console
- [ ] Assets (images, fonts) load correctly

---

## Prerequisites

Before running the dev server, ensure Python virtual environment is set up:

```bash
# Create venv if it doesn't exist
python3 -m venv venv

# Activate venv
source venv/bin/activate

# Install MkDocs and dependencies
pip3 install -r requirements.txt

# Verify installation
mkdocs --version
```

**Note**: The npm scripts automatically activate the venv when running MkDocs commands.

---

## Troubleshooting

### Issue: "Site not building" or "mkdocs: command not found"
```bash
# Ensure venv exists and has MkDocs installed
source venv/bin/activate
mkdocs --version

# If not installed
pip3 install -r requirements.txt
```

### Issue: "Old docs still showing"
```bash
# Clear browser cache
# Rebuild docs
npm run docs:build

# Restart server
npm start
```

### Issue: "Playground not loading"
```bash
# Verify playground files exist
ls docs/playground/

# Check server logs for errors
```

### Issue: "@photon/core not found in examples"
```bash
# Link the package
cd packages/photon
npm link
cd ../..
npm link @photon/core

# Verify link
npm ls @photon/core
```

---

## Next Steps

1. **Run the server**: `npm start`
2. **Open documentation**: http://localhost:3000/docs/
3. **Test code examples**: Copy/paste into browser console
4. **Check playground**: http://localhost:3000/playground/
5. **Verify everything works** before publishing to npm

Once testing is complete, proceed with npm publishing checklist.
