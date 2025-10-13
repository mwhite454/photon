import * as photon from 'photon';

// Smiley face model
this.paths = {
    head: new photon.paths.Circle([0, 0], 90),
    leftEye: new photon.paths.Circle([-25, 25], 10),
    rightEye: new photon.paths.Circle([25, 25], 10),
    mouth: new photon.paths.Arc([0, 0], 50, 225, 315)
};

this.notes = '# Smiley Face\nA cheerful smiley face with eyes and a curved mouth.';
