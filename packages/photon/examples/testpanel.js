import * as photon from 'photon';

function testPanel(count, height, width, radius, angle) {

    function myModelFactory() {
        this.paths = {};
        this.models = {};

       const circle = new photon.paths.Circle([0, 0], Math.min(height, width) / 2 - .5);

        if (radius < 0.5) {
            this.models['boltrect'] = photon.model.move(new photon.models.BoltRectangle(width - .4, height - .4, .07), [.2, .2]);
        }

        this.paths['c1'] = photon.path.moveRelative(circle, [width / 2, height / 2]);

        this.models['panel'] = new photon.models.RoundRectangle(width, height, radius);

        this.models['boltcircle'] = photon.model.move(new photon.models.BoltCircle(circle.radius + 0.25, .05, 6), [width / 2, height / 2]);

        photon.model.rotate(this, angle, photon.point.zero());
    }

    //modeling
    this.units = photon.unitType.Inch;
    this.models = {'0': new myModelFactory()};

   const m = photon.measure.modelExtents(this.models['0']);
   const x = m.high[0] - m.low[0] + .025;

    for (var i = 1; i < count; i++) {
        this.models[i + ''] = photon.model.move(new myModelFactory(), [x * i, 0]);
    }

}

testPanel.metaParameters =[
    { title: "count", type: "range", min: 1, max: 10, step: 1, value: 1 },
    { title: "height", type: "range", min: 1, max: 7, step: .1, value: 3 },
    { title: "width", type: "range", min: 1, max: 7, step: .1, value: 4 },
    { title: "radius", type: "range", min: 0, max: 2, step: .1, value: .25 },
    { title: "angle", type: "range", min: -90, max: 90, step: 2.5, value: 0 }
];

export default testPanel;