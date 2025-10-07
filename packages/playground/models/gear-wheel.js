var makerjs = require('makerjs');

// Simple gear wheel using the built-in Star model
this.models = {
    gear: new makerjs.models.Star(8, 50, 30)
};

// Add center hole
this.paths = {
    centerHole: new makerjs.paths.Circle([0, 0], 10)
};

this.notes = '# Gear Wheel\nA simple gear wheel using the Star model with a center hole.';
