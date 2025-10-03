const express = require('express');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const app = express();
const PORT = 8020;

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
app.use(express.static('docs'));

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
    console.log(`Maker.js Playground server running on http://localhost:${PORT}`);
    console.log(`Watching models directory: ${modelsPath}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    watcher.close();
    process.exit(0);
});
