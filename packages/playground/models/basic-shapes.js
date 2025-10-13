import * as photon from 'photon';

// Basic shapes demonstration
this.paths = {
    // Circle
    circle: new photon.paths.Circle([0, 50], 20),
    
    // Line
    line: new photon.paths.Line([0, 0], [50, 0]),
    
    // Arc (quarter circle)
    arc: new photon.paths.Arc([0, 0], 30, 0, 90)
};

this.notes = '# Basic Shapes\nDemonstration of basic path types: Circle, Line, and Arc.';
