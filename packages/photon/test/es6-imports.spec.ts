/**
 * ES6 Import/Export Tests
 * 
 * Tests that all ES6 modules can be imported correctly and
 * that named exports are accessible.
 */

import { describe, it } from 'mocha';
import assert from 'assert';

describe('ES6 Module Imports', function () {
  
  describe('Core Modules', function () {
    
    it('should import angle module', async function () {
      const angle = await import('../src/core/angle.js');
      assert.ok(angle, 'angle module should be imported');
      assert.ok(typeof angle.ofArcEnd === 'function', 'ofArcEnd should be a function');
      assert.ok(typeof angle.ofPointInRadians === 'function', 'ofPointInRadians should be a function');
    });

    it('should import base module', async function () {
      const base = await import('../src/core/base.js');
      assert.ok(base, 'base module should be imported');
      assert.ok(typeof base.round === 'function', 'round should be a function');
      assert.ok(typeof base.isNumber === 'function', 'isNumber should be a function');
    });

    it('should import chain module', async function () {
      const chain = await import('../src/core/chain.js');
      assert.ok(chain, 'chain module should be imported');
      assert.ok(typeof chain.findChains === 'function', 'findChains should be a function');
    });

    it('should import combine module', async function () {
      const combine = await import('../src/core/combine.js');
      assert.ok(combine, 'combine module should be imported');
      assert.ok(typeof combine.combineUnion === 'function', 'combineUnion should be a function');
    });

    it('should import expand module', async function () {
      const expand = await import('../src/core/expand.js');
      assert.ok(expand, 'expand module should be imported');
      assert.ok(typeof expand.expandPaths === 'function', 'expandPaths should be a function');
    });

    it('should import exporter module', async function () {
      const exporter = await import('../src/core/exporter.js');
      assert.ok(exporter, 'exporter module should be imported');
      assert.ok(typeof exporter.toJson === 'function', 'toJson should be a function');
    });

    it('should import fillet modules', async function () {
      const filletCore = await import('../src/core/fillet-core.js');
      const filletPath = await import('../src/core/fillet-path.js');
      const filletChain = await import('../src/core/fillet-chain.js');
      
      assert.ok(filletCore, 'fillet-core module should be imported');
      assert.ok(filletPath, 'fillet-path module should be imported');
      assert.ok(filletChain, 'fillet-chain module should be imported');
      
      assert.ok(typeof filletPath.pathFillet === 'function', 'pathFillet should be a function');
      assert.ok(typeof filletChain.chainFillet === 'function', 'chainFillet should be a function');
    });

    it('should import importer module', async function () {
      const importer = await import('../src/core/importer.js');
      assert.ok(importer, 'importer module should be imported');
      assert.ok(typeof importer.parseNumericList === 'function', 'parseNumericList should be a function');
    });

    it('should import intersect module', async function () {
      const intersect = await import('../src/core/intersect.js');
      assert.ok(intersect, 'intersect module should be imported');
      assert.ok(typeof intersect.intersection === 'function', 'intersection should be a function');
    });

    it('should import layout module', async function () {
      const layout = await import('../src/core/layout.js');
      assert.ok(layout, 'layout module should be imported');
      assert.ok(typeof layout.cloneToRow === 'function', 'cloneToRow should be a function');
    });

    it('should import measure module', async function () {
      const measure = await import('../src/core/measure.js');
      assert.ok(measure, 'measure module should be imported');
      assert.ok(typeof measure.modelExtents === 'function', 'modelExtents should be a function');
    });

    it('should import model module', async function () {
      const model = await import('../src/core/model.js');
      assert.ok(model, 'model module should be imported');
      assert.ok(typeof model.walk === 'function', 'walk should be a function');
      assert.ok(typeof model.originate === 'function', 'originate should be a function');
    });

    it('should import path module', async function () {
      const path = await import('../src/core/path.js');
      assert.ok(path, 'path module should be imported');
      assert.ok(typeof path.distort === 'function', 'distort should be a function');
    });

    it('should import paths module', async function () {
      const paths = await import('../src/core/paths.js');
      assert.ok(paths, 'paths module should be imported');
      assert.ok(typeof paths.Line === 'function', 'Line should be a constructor');
      assert.ok(typeof paths.Circle === 'function', 'Circle should be a constructor');
      assert.ok(typeof paths.Arc === 'function', 'Arc should be a constructor');
    });

    it('should import point module', async function () {
      const point = await import('../src/core/point.js');
      assert.ok(point, 'point module should be imported');
      assert.ok(typeof point.add === 'function', 'add should be a function');
      assert.ok(typeof point.subtract === 'function', 'subtract should be a function');
    });

    it('should import simplify module', async function () {
      const simplify = await import('../src/core/simplify.js');
      assert.ok(simplify, 'simplify module should be imported');
      assert.ok(typeof simplify.simplify === 'function', 'simplify should be a function');
    });

    it('should import solvers module', async function () {
      const solvers = await import('../src/core/solvers.js');
      assert.ok(solvers, 'solvers module should be imported');
      assert.ok(typeof solvers.solveTriangleSSS === 'function', 'solveTriangleSSS should be a function');
    });

    it('should import units module', async function () {
      const units = await import('../src/core/units.js');
      assert.ok(units, 'units module should be imported');
      assert.ok(typeof units.conversionScale === 'function', 'conversionScale should be a function');
    });

    it('should import svg-esm module', async function () {
      const svg = await import('../src/core/svg-esm.js');
      assert.ok(svg, 'svg-esm module should be imported');
      assert.ok(typeof svg.toSVG === 'function', 'toSVG should be a function');
    });

    it('should import dxf module', async function () {
      const dxf = await import('../src/core/dxf.js');
      assert.ok(dxf, 'dxf module should be imported');
      assert.ok(typeof dxf.toDXF === 'function', 'toDXF should be a function');
    });
  });

  describe('Model Classes', function () {
    
    it('should import Belt model', async function () {
      const { Belt } = await import('../src/models/Belt.js');
      assert.ok(Belt, 'Belt should be imported');
      assert.ok(typeof Belt === 'function', 'Belt should be a constructor');
    });

    it('should import BoltCircle model', async function () {
      const { BoltCircle } = await import('../src/models/BoltCircle.js');
      assert.ok(BoltCircle, 'BoltCircle should be imported');
      assert.ok(typeof BoltCircle === 'function', 'BoltCircle should be a constructor');
    });

    it('should import BoltRectangle model', async function () {
      const { BoltRectangle } = await import('../src/models/BoltRectangle.js');
      assert.ok(BoltRectangle, 'BoltRectangle should be imported');
      assert.ok(typeof BoltRectangle === 'function', 'BoltRectangle should be a constructor');
    });

    it('should import ConnectTheDots model', async function () {
      const { ConnectTheDots } = await import('../src/models/ConnectTheDots.js');
      assert.ok(ConnectTheDots, 'ConnectTheDots should be imported');
      assert.ok(typeof ConnectTheDots === 'function', 'ConnectTheDots should be a constructor');
    });

    it('should import Dogbone model', async function () {
      const { Dogbone } = await import('../src/models/Dogbone.js');
      assert.ok(Dogbone, 'Dogbone should be imported');
      assert.ok(typeof Dogbone === 'function', 'Dogbone should be a constructor');
    });

    it('should import Dome model', async function () {
      const { Dome } = await import('../src/models/Dome.js');
      assert.ok(Dome, 'Dome should be imported');
      assert.ok(typeof Dome === 'function', 'Dome should be a constructor');
    });

    it('should import Holes model', async function () {
      const { Holes } = await import('../src/models/Holes.js');
      assert.ok(Holes, 'Holes should be imported');
      assert.ok(typeof Holes === 'function', 'Holes should be a constructor');
    });

    it('should import Oval model', async function () {
      const { Oval } = await import('../src/models/Oval.js');
      assert.ok(Oval, 'Oval should be imported');
      assert.ok(typeof Oval === 'function', 'Oval should be a constructor');
    });

    it('should import OvalArc model', async function () {
      const { OvalArc } = await import('../src/models/OvalArc.js');
      assert.ok(OvalArc, 'OvalArc should be imported');
      assert.ok(typeof OvalArc === 'function', 'OvalArc should be a constructor');
    });

    it('should import Polygon model', async function () {
      const { Polygon } = await import('../src/models/Polygon.js');
      assert.ok(Polygon, 'Polygon should be imported');
      assert.ok(typeof Polygon === 'function', 'Polygon should be a constructor');
    });

    it('should import Rectangle model', async function () {
      const { Rectangle } = await import('../src/models/Rectangle.js');
      assert.ok(Rectangle, 'Rectangle should be imported');
      assert.ok(typeof Rectangle === 'function', 'Rectangle should be a constructor');
    });

    it('should import Ring model', async function () {
      const { Ring } = await import('../src/models/Ring.js');
      assert.ok(Ring, 'Ring should be imported');
      assert.ok(typeof Ring === 'function', 'Ring should be a constructor');
    });

    it('should import RoundRectangle model', async function () {
      const { RoundRectangle } = await import('../src/models/RoundRectangle.js');
      assert.ok(RoundRectangle, 'RoundRectangle should be imported');
      assert.ok(typeof RoundRectangle === 'function', 'RoundRectangle should be a constructor');
    });

    it('should import SCurve model', async function () {
      const { SCurve } = await import('../src/models/SCurve.js');
      assert.ok(SCurve, 'SCurve should be imported');
      assert.ok(typeof SCurve === 'function', 'SCurve should be a constructor');
    });

    it('should import Slot model', async function () {
      const { Slot } = await import('../src/models/Slot.js');
      assert.ok(Slot, 'Slot should be imported');
      assert.ok(typeof Slot === 'function', 'Slot should be a constructor');
    });

    it('should import Square model', async function () {
      const { Square } = await import('../src/models/Square.js');
      assert.ok(Square, 'Square should be imported');
      assert.ok(typeof Square === 'function', 'Square should be a constructor');
    });

    it('should import Star model', async function () {
      const { Star } = await import('../src/models/Star.js');
      assert.ok(Star, 'Star should be imported');
      assert.ok(typeof Star === 'function', 'Star should be a constructor');
    });

    it('should import BezierCurve model', async function () {
      const { BezierCurve } = await import('../src/models/BezierCurve-esm.js');
      assert.ok(BezierCurve, 'BezierCurve should be imported');
      assert.ok(typeof BezierCurve === 'function', 'BezierCurve should be a constructor');
    });

    it('should import Ellipse model', async function () {
      const { Ellipse } = await import('../src/models/Ellipse.js');
      assert.ok(Ellipse, 'Ellipse should be imported');
      assert.ok(typeof Ellipse === 'function', 'Ellipse should be a constructor');
    });

    it('should import Text model', async function () {
      const { Text } = await import('../src/models/Text.js');
      assert.ok(Text, 'Text should be imported');
      assert.ok(typeof Text === 'function', 'Text should be a constructor');
    });
  });

  describe('Main Index Export', function () {
    
    it('should import main index module', async function () {
      const makerjs = await import('../src/index.js');
      assert.ok(makerjs, 'main index should be imported');
      assert.ok(makerjs.core, 'core namespace should exist');
      assert.ok(makerjs.angle, 'angle module should be exported');
      assert.ok(makerjs.chain, 'chain module should be exported');
      assert.ok(makerjs.model, 'model module should be exported');
      assert.ok(makerjs.path, 'path module should be exported');
      assert.ok(makerjs.paths, 'paths module should be exported');
      assert.ok(makerjs.point, 'point module should be exported');
    });

    it('should have all model classes in models namespace', async function () {
      const makerjs = await import('../src/index.js');
      assert.ok(makerjs.models, 'models namespace should exist');
      assert.ok(makerjs.models.Belt, 'Belt should be in models');
      assert.ok(makerjs.models.Rectangle, 'Rectangle should be in models');
      assert.ok(makerjs.models.Square, 'Square should be in models');
      assert.ok(makerjs.models.Star, 'Star should be in models');
    });
  });

  describe('Modern JavaScript Syntax Support', function () {
    
    it('should support const and let declarations', async function () {
      const { Line } = await import('../src/core/paths.js');
      const line = new Line([0, 0], [10, 10]);
      let origin = line.origin;
      
      assert.ok(line, 'const declaration should work');
      assert.ok(origin, 'let declaration should work');
    });

    it('should support arrow functions', async function () {
      const { Line } = await import('../src/core/paths.js');
      const lines = [[0, 0], [10, 10], [20, 20]].map(p => new Line([0, 0], p));
      
      assert.equal(lines.length, 3, 'arrow function in map should work');
      assert.ok(lines[0] instanceof Line, 'mapped items should be Line instances');
    });

    it('should support destructuring', async function () {
      const { Line, Circle, Arc } = await import('../src/core/paths.js');
      
      assert.ok(Line, 'destructured Line should exist');
      assert.ok(Circle, 'destructured Circle should exist');
      assert.ok(Arc, 'destructured Arc should exist');
    });

    it('should support template literals', async function () {
      const { Line } = await import('../src/core/paths.js');
      const line = new Line([0, 0], [10, 10]);
      const description = `Line from ${line.origin} to ${line.end}`;
      
      assert.ok(description.includes('Line from'), 'template literal should work');
    });

    it('should support spread operator', async function () {
      const point1 = [0, 0];
      const point2 = [...point1];
      
      assert.deepEqual(point1, point2, 'spread operator should work');
      assert.notStrictEqual(point1, point2, 'spread should create new array');
    });

    it('should support async/await', async function () {
      const loadModule = async () => {
        return await import('../src/core/paths.js');
      };
      
      const paths = await loadModule();
      assert.ok(paths, 'async/await should work');
    });
  });
});
