const express = require('express');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const app = express();
const PORT = 3000;

// Store available models
let availableModels = [];

// Watch the models folder
const modelsPath = path.join(__dirname, 'packages/playground/models');
const watcher = chokidar.watch(modelsPath, {
    ignored: /^\./, 
    persistent: true
});

// Function to scan models directory
function scanModels() {
    try {
        if (!fs.existsSync(modelsPath)) {
            fs.mkdirSync(modelsPath, { recursive: true });
        }
        
        const files = fs.readdirSync(modelsPath);
        availableModels = files
            .filter(file => file.endsWith('.js'))
            .map(file => ({
                name: file.replace('.js', ''),
                filename: file,
                path: `/api/models/${file}`
            }));
        
        console.log(`Found ${availableModels.length} model files:`, availableModels.map(m => m.name));
    } catch (error) {
        console.error('Error scanning models directory:', error);
        availableModels = [];
    }
}

// Initial scan
scanModels();

// Watch for changes
watcher
    .on('add', path => {
        console.log(`Model file added: ${path}`);
        scanModels();
    })
    .on('change', path => {
        console.log(`Model file changed: ${path}`);
        scanModels();
    })
    .on('unlink', path => {
        console.log(`Model file removed: ${path}`);
        scanModels();
    });

// Middleware
app.use(express.json());

// Serve the NEW MkDocs site (built static files)
app.use('/docs', express.static('docs-new/site'));

// Serve playground at root
app.use('/playground', express.static('docs/playground'));

// Serve external dependencies for playground
app.use('/external', express.static('docs/external'));

// Serve fonts for playground
app.use('/fonts', express.static('docs/fonts'));

// Serve packages directory for accessing built files
app.use('/packages', express.static('packages'));

// Root redirect to new docs
app.get('/', (req, res) => {
    res.redirect('/docs/');
});

// API endpoint to list available models
app.get('/api/models', (req, res) => {
    res.json({
        success: true,
        models: availableModels
    });
});

// API endpoint to get a specific model file content
app.get('/api/models/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(modelsPath, filename);
    
    try {
        if (fs.existsSync(filePath) && filename.endsWith('.js')) {
            const content = fs.readFileSync(filePath, 'utf8');
            res.json({
                success: true,
                filename: filename,
                content: content
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'Model file not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error reading model file'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('\n========================================');
    console.log('Photon Development Server Started');
    console.log('========================================');
    console.log(`📚 Documentation:  http://localhost:${PORT}/docs/`);
    console.log(`🎮 Playground:     http://localhost:${PORT}/playground/`);
    console.log(`📦 Packages:       http://localhost:${PORT}/packages/`);
    console.log(`🔧 Models API:     http://localhost:${PORT}/api/models`);
    console.log('========================================');
    console.log(`👀 Watching models: ${modelsPath}`);
    console.log('========================================\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    watcher.close();
    process.exit(0);
});
