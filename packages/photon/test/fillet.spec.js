const assert = require('assert');

// Load UMD build produced by Vite
const umd = require('../dist/maker.umd.js');
const maker = umd && (umd.default || umd);

describe('Fillet (UMD smoke)', function () {
  it('pathFillet should create an arc between 2 lines and clip them', function () {
    const l1 = new maker.paths.Line([0, 0], [10, 0]);
    const l2 = new maker.paths.Line([0, 0], [0, 10]);

    const arc = maker.fillet.pathFillet(l1, l2, 2);

    assert.ok(arc, 'fillet arc should be created');
    assert.equal(arc.type, maker.maker.pathType.Arc);
    assert.equal(arc.radius, 2);

    // endpoints should have been clipped away from origin
    assert.notDeepEqual(l1.end, [0, 0]);
    assert.notDeepEqual(l2.origin, [0, 0]);
  });

  it('pathDogbone should create an external arc for 2 lines', function () {
    const l1 = new maker.paths.Line([0, 0], [10, 0]);
    const l2 = new maker.paths.Line([0, 0], [0, 10]);

    const arc = maker.fillet.pathDogbone(l1, l2, 2);

    assert.ok(arc, 'dogbone arc should be created');
    assert.equal(arc.type, maker.maker.pathType.Arc);
    assert.equal(arc.radius, 2);
  });

  it('filletChain.chainFillet should return a model with fillet arc', function () {
    const l1 = new maker.paths.Line([0, 0], [10, 0]);
    const l2 = new maker.paths.Line([0, 0], [0, 10]);
    const m = { paths: { l1, l2 } };

    const chains = maker.chain.findChains(m);
    const chain = Array.isArray(chains) ? chains[0] : chains[''][0];
    const res = maker.filletChain.chainFillet(chain, 2);

    assert.ok(res, 'resulting model should be returned');
    assert.ok(res.paths && Object.keys(res.paths).length >= 1, 'model should contain at least 1 fillet path');
  });
});
