# Photon Playground Models

This folder contains model files that can be loaded into the Photon playground. The server automatically watches this directory and makes all `.js` files available in the "Load Model" dropdown in the playground interface.

## Modern ES6+ Syntax

All models in this directory use modern JavaScript (ES6+) syntax:
- **ES6 imports** instead of `require()`
- **const/let** instead of `var`
- **photon** namespace instead of `makerjs`

## How to Add Models

1. Create a new `.js` file in this directory
2. Follow the modern Photon model format:
   ```javascript
   import * as photon from 'photon';
   
   // Define your paths, models, etc.
   this.paths = {
       // your paths here
   };
   
   // Optional: Add notes that will appear in the playground
   this.notes = '# Your Model Name\nDescription of your model.';
   ```
3. The file will automatically appear in the dropdown (server restart not required)

## Included Models

- **simple-square.js** - A basic 100x100 square
- **smiley-face.js** - A cheerful smiley face with eyes and mouth
- **gear-wheel.js** - A gear wheel with 12 teeth and center hole

## Features

- **Hot Reload**: Files are automatically detected when added, modified, or removed
- **Auto-Run**: Selected models are automatically executed when loaded
- **Clean Names**: Filenames are converted to readable names (e.g., "gear-wheel" becomes "Gear Wheel")
