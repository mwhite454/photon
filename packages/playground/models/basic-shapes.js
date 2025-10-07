var makerjs = require('makerjs');

// Basic shapes demonstration
this.paths = {
    // Circle
    circle: new makerjs.paths.Circle([0, 50], 20),
    
    // Line
    line: new makerjs.paths.Line([0, 0], [50, 0]),
    
    // Arc (quarter circle)
    arc: new makerjs.paths.Arc([0, 0], 30, 0, 90)
};

this.notes = '# Basic Shapes\nDemonstration of basic path types: Circle, Line, and Arc.';
