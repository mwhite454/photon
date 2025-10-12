const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadUmd(distFile) {
  const code = fs.readFileSync(distFile, 'utf8');
  const sandbox = { console };
  sandbox.globalThis = sandbox;
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.require = require; // allow CommonJS deps
  vm.runInNewContext(code, sandbox, { filename: distFile });
  return sandbox.MakerJs;
}

describe('SVG Path Data (ESM) parity basics', function () {
  const distDir = path.resolve(__dirname, '../dist');
  const umdPath = path.join(distDir, 'maker.umd.js');

  it('toSVGPathData(byLayers) partitions by layer and returns strings', function () {
    const MakerJs = loadUmd(umdPath);

    const model = {};
    MakerJs.$(new MakerJs.models.Square(20)).layer('outer').addTo(model, 'o');
    MakerJs.$(new MakerJs.models.Square(10)).layer('inner').addTo(model, 'i');

    const byLayers = MakerJs.svg.toSVGPathData(model, { byLayers: true });
    assert.ok(byLayers && typeof byLayers === 'object');
    assert.ok(typeof byLayers.outer === 'string');
    assert.ok(typeof byLayers.inner === 'string');
    assert.ok(byLayers.outer.includes('M'));
    assert.ok(byLayers.inner.includes('M'));
  });

  it('toSVGPathData(model) returns a single path data string', function () {
    const MakerJs = loadUmd(umdPath);
    const model = {};
    MakerJs.$(new MakerJs.models.Square(12)).addTo(model, 's');
    const d = MakerJs.svg.toSVGPathData(model);
    assert.ok(typeof d === 'string' && d.length > 0);
    assert.ok(d.includes('M'));
    assert.ok(d.includes('L'));
  });

  it('toSVGPathData(line path) includes L', function () {
    const MakerJs = loadUmd(umdPath);
    const line = new MakerJs.paths.Line([0, 0], [10, 0]);
    const d = MakerJs.svg.toSVGPathData([line]);
    assert.ok(d.includes('M') && d.includes('L'));
  });

  it('toSVGPathData(arc path) includes A (circular arc)', function () {
    const MakerJs = loadUmd(umdPath);
    const arc = new MakerJs.paths.Arc([0, 0], 10, 0, 90);
    const d = MakerJs.svg.toSVGPathData([arc]);
    assert.ok(d.includes('A'));
  });
});

describe('SVG importer round-trip (non-elliptic, no beziers)', function () {
  const distDir = path.resolve(__dirname, '../dist');
  const umdPath = path.join(distDir, 'maker.umd.js');

  it('round-trips simple polygon with Z close', function () {
    const MakerJs = loadUmd(umdPath);
    const pathData = 'M 0 0 L 10 0 L 10 10 L 0 10 Z';
    const m = MakerJs.svg.fromSVGPathData(pathData);
    const d = MakerJs.svg.toSVGPathData(m);
    assert.ok(typeof d === 'string' && d.length > 0);
    assert.ok(d.includes('M'));
    assert.ok(d.includes('L'));
    assert.ok(d.includes('Z'));
  });

  it('round-trips H and V commands as lines', function () {
    const MakerJs = loadUmd(umdPath);
    const pathData = 'M 0 0 H 10 V 10 Z';
    const m = MakerJs.svg.fromSVGPathData(pathData);
    const d = MakerJs.svg.toSVGPathData(m);
    assert.ok(d.includes('M'));
    assert.ok(d.includes('L'));
  });

  it('round-trips circular arc A commands without elliptic conversion', function () {
    const MakerJs = loadUmd(umdPath);
    // rx == ry implies circular
    const pathData = 'M 0 0 A 10 10 0 0 1 10 10';
    const m = MakerJs.svg.fromSVGPathData(pathData);
    const d = MakerJs.svg.toSVGPathData(m);
    assert.ok(d.includes('A'));
  });
});
