import * as photon from 'photon';

function combine(angle, add) {

    const star1 = new photon.models.Oval(50, 100);

    photon.model.walkPaths(star1, function (modelContext, pathId, path) {
        delete modelContext.paths[pathId];
        modelContext.paths['star1' + pathId] = path;
    });

    //delete star1.paths.ShapeLine2;
    //delete star1.paths.ShapeLine3;
    //delete star1.paths.ShapeLine4;
    //delete star1.paths.ShapeLine5;
    //delete star1.paths.ShapeLine6;
    //delete star1.paths.ShapeLine7;
    //delete star1.paths.ShapeLine8;
    //delete star1.paths.ShapeLine9;

    //star1.paths.c = new photon.paths.Line(star1.paths.ShapeLine10.origin, star1.paths.ShapeLine1.end);

    const star2 = new photon.models.Oval(50, 100);

    star1.origin = [-25, -25];
    star2.origin = [-25, -25];

    photon.model.rotate(star2, angle);

    this.models = {
        star1: star1,
        star2: star2
    };

    photon.model.combine(star1, star2, false, true, !add, add, add);
}

combine.metaParameters = [
    { title: "angle", type: "range", min: -180, max: 180, step: 1, value: 40 },
    { title: "add", type: "bool", value: true }
];


export default combine;