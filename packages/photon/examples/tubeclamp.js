import * as photon from 'photon';

function tubeClamp(tubediameter, thickness, distance, open, wing, lid, lidclearance) {

    this.paths = {};
    this.models = {};

   const line = photon.paths.Line;
   const arc = photon.paths.Arc;
   const point = photon.point;

   const radius = tubediameter / 2;
   const d2 = distance / 2;
   const t2 = thickness / 2;
   const cy = distance + radius;
   const outer = radius + wing;
   const mtop = distance + tubediameter - open;
   const drop = 0;//radius / 4;

   const z = Math.max(thickness + .125 - radius, 0);
   const bottom = Math.max(radius, thickness * 1.2);

    //this.paths.push(new photon.paths.Circle('tube', [0, cy], radius));

   const thicknessAngle = 360 - photon.angle.toDegrees(Math.acos(t2 / radius));
   const arc1 = new arc([0, cy], radius, thicknessAngle, 0);
   const arc1Points = point.fromArc(arc1);

   const halfBody = {
        models: {
            scurve: photon.model.move(new photon.models.SCurve(wing - (bottom - radius), cy - drop), [bottom, 0])
        },
        paths: {
            bottom: new line([0, 0], [bottom, 0]),
            //new line('longslope', [radius, 0], [outer, cy - drop]),
            crux: new line([outer, cy - drop], [outer, mtop]),
            flat: new line([outer, mtop], [radius, mtop]),
            wall: new line([radius, mtop], [radius, cy]),
            arc: arc1,
            boxside: new line(arc1Points[0], [t2, d2]),
            boxottom: new line([0, d2], [t2, d2])
        }
    };

    halfBody.paths.dogbone = photon.path.dogbone(halfBody.paths.boxottom, halfBody.paths.boxside, .03);

   const lidAngle = photon.angle.toDegrees(Math.acos((radius - lidclearance) / radius));
   const arc2 = new arc([0, -radius], radius, lidAngle, 90);
   const arc2Points = point.fromArc(arc2);

   const halfLid = new photon.models.ConnectTheDots(false, [arc2Points[0], [arc2Points[0][0], 0], [outer, 0], [outer, lid], [0, lid]]);
    halfLid.paths['lid'] = arc2;

   const lid = {
        id: 'lid',
        //                origin: [ 0, cy + radius - arc2Points[0].y - open ],
        origin: [0, cy + radius],
        models: {
            halflid: halfLid, 
            halfLidMirror: photon.model.mirror(halfLid, true, false)
        }
    };

   const body = {
        models: {'halfBody': halfBody, 'mirror': photon.model.mirror(halfBody, true, false)}
    };

    this.models.body = body;
    this.models.lid = lid;

    this.units = photon.unitType.Inch;
    this.origin = [0, -cy];
};

tubeClamp.metaParameters = [
    { title: "tubediameter", type: "range", min: .5, max: 3, step: .0625, value: 0.875 },
    { title: "thickness", type: "range", min: .125, max: 1, step: .0625, value: .5 },
    { title: "distance", type: "range", min: .25, max: 2, step: .125, value: 1 },
    { title: "open", type: "range", min: 0, max: .25, step: .0625, value: .0625 },
    { title: "wing", type: "range", min: .25, max: 1.5, step: .0625, value: .5 },
    { title: "lid", type: "range", min: .125, max: .75, step: .0625, value: .25 },
    { title: "lidclearance", type: "range", min: 0, max: .13, step: .01, value: .01 }
];

export default tubeClamp;
