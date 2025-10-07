var makerjs = require('makerjs');

// Smiley face model
this.paths = {
    head: new makerjs.paths.Circle([0, 0], 90),
    leftEye: new makerjs.paths.Circle([-25, 25], 10),
    rightEye: new makerjs.paths.Circle([25, 25], 10),
    mouth: new makerjs.paths.Arc([0, 0], 50, 225, 315)
};

this.notes = '# Smiley Face\nA cheerful smiley face with eyes and a curved mouth.';
