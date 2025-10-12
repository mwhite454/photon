const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadUmd(distFile) {
  const code = fs.readFileSync(distFile, 'utf8');
  const sandbox = { console: console };
  sandbox.globalThis = sandbox;
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  // Provide CommonJS require in sandbox for UMD external deps (e.g., 'clone')
  sandbox.require = require;
  vm.runInNewContext(code, sandbox, { filename: distFile });
  return sandbox.MakerJs;
}

describe('UMD bundle surface: svg/exporter toSVG', function () {
  const distDir = path.resolve(__dirname, '../dist');
  const umdPath = path.join(distDir, 'maker.umd.js');

  it('should expose MakerJs.svg.toSVG and MakerJs.exporter.toSVG', function () {
    assert.ok(fs.existsSync(umdPath), 'maker.umd.js not found. Run `npm run build:lib` in packages/maker.js');
    const MakerJs = loadUmd(umdPath);
    assert.ok(MakerJs && MakerJs.svg && typeof MakerJs.svg.toSVG === 'function', 'MakerJs.svg.toSVG is missing');
    assert.ok(MakerJs && MakerJs.exporter && typeof MakerJs.exporter.toSVG === 'function', 'MakerJs.exporter.toSVG is missing');
  });

  it('should render a simple model via both namespaces', function () {
    const MakerJs = loadUmd(umdPath);
    const square = new MakerJs.models.Square(50);

    const svg1 = MakerJs.svg.toSVG(square);
    const svg2 = MakerJs.exporter.toSVG(square);

    assert.ok(typeof svg1 === 'string' && svg1.includes('<svg'), 'svg.toSVG did not return SVG');
    assert.ok(typeof svg2 === 'string' && svg2.includes('<svg'), 'exporter.toSVG did not return SVG');
  });
});
