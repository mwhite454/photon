import * as photon from 'photon';

// Parametric Raspberry Pi 4 Case with 10.1" Touchscreen
// Demonstrates: Basic rectangle with corner holes, RPi mounting, screen cutout

// Parametric dimensions (easily adjustable)
const params = {
    // Basic case dimensions (mm)
    caseWidth: 200,
    caseHeight: 150,
    
    // Corner hole specifications
    cornerHoleDiameter: 3,
    cornerHoleOffset: 2.5,
    
    // Raspberry Pi 4 dimensions
    rpiWidth: 85,
    rpiHeight: 56,
    rpiMountHoleDiameter: 2.75,
    
    // 10.1" touchscreen dimensions (typical)
    screenWidth: 228,
    screenHeight: 149,
    screenCutoutWidth: 218,
    screenCutoutHeight: 139
};

// Create basic rectangle with corner mounting holes
function createBasicCase(width, height, holeDiameter, holeOffset) {
    const model = {
        paths: {},
        models: {}
    };
    
    // Main rectangle outline
    model.models.outline = new photon.models.Rectangle(width, height);
    
    // Corner mounting holes (3mm diameter, 2.5mm from corners)
    const holes = [
        [holeOffset, holeOffset],                    // Bottom-left
        [width - holeOffset, holeOffset],            // Bottom-right  
        [width - holeOffset, height - holeOffset],   // Top-right
        [holeOffset, height - holeOffset]            // Top-left
    ];
    
    for (let i = 0; i < holes.length; i++) {
        model.paths['cornerHole' + (i + 1)] = new photon.paths.Circle(holes[i], holeDiameter / 2);
    }
    
    return model;
}

// Add Raspberry Pi mounting holes
function addRaspberryPiMounting(model, rpiX, rpiY) {
    // Standard RPi mounting hole positions (relative to bottom-left of board)
    const rpiHoles = [
        [3.5, 3.5],
        [61.5, 3.5], 
        [3.5, 52.5],
        [61.5, 52.5]
    ];
    
    for (let i = 0; i < rpiHoles.length; i++) {
        const center = [rpiX + rpiHoles[i][0], rpiY + rpiHoles[i][1]];
        model.paths['rpiHole' + (i + 1)] = new photon.paths.Circle(center, params.rpiMountHoleDiameter / 2);
    }
    
    // Add RPi outline for reference
    model.models.rpiOutline = new photon.models.Rectangle(
        params.rpiWidth, 
        params.rpiHeight
    );
    model.models.rpiOutline.origin = [rpiX, rpiY];
    
    return model;
}

// Add touchscreen cutout
function addScreenCutout(model, screenX, screenY) {
    // Screen cutout rectangle
    model.models.screenCutout = new photon.models.Rectangle(
        params.screenCutoutWidth,
        params.screenCutoutHeight
    );
    model.models.screenCutout.origin = [screenX, screenY];
    
    // Screen outline for reference
    model.models.screenOutline = new photon.models.Rectangle(
        params.screenWidth,
        params.screenHeight
    );
    model.models.screenOutline.origin = [
        screenX - (params.screenWidth - params.screenCutoutWidth) / 2, 
        screenY - (params.screenHeight - params.screenCutoutHeight) / 2
    ];
    
    return model;
}

// Build the complete case
const basicCase = createBasicCase(
    params.caseWidth, 
    params.caseHeight, 
    params.cornerHoleDiameter, 
    params.cornerHoleOffset
);

// Position RPi in the case (centered horizontally, 20mm from bottom)
const rpiX = (params.caseWidth - params.rpiWidth) / 2;
const rpiY = 20;
const caseWithRpi = addRaspberryPiMounting(basicCase, rpiX, rpiY);

// Position screen cutout (centered horizontally, 15mm from top)
const screenX = (params.caseWidth - params.screenCutoutWidth) / 2;
const screenY = params.caseHeight - params.screenCutoutHeight - 15;
const completeCase = addScreenCutout(caseWithRpi, screenX, screenY);

// Export the complete model
this.paths = completeCase.paths;
this.models = completeCase.models;

// Add documentation
this.notes = '# Parametric Raspberry Pi 4 Case\n\n' +
    '**Dimensions:** ' + params.caseWidth + 'mm × ' + params.caseHeight + 'mm\n\n' +
    '**Features:**\n' +
    '- Corner mounting holes: 4× ⌀' + params.cornerHoleDiameter + 'mm (2.5mm from corners)\n' +
    '- Raspberry Pi mounting: 4× ⌀' + params.rpiMountHoleDiameter + 'mm holes\n' +
    '- 10.1" touchscreen cutout: ' + params.screenCutoutWidth + '×' + params.screenCutoutHeight + 'mm\n\n' +
    '**To modify:** Edit the `params` object at the top of the code.\n\n' +
    '**Manufacturing:** Ready for laser cutting, 3D printing, or CNC milling.';
