/**
 * Type Safety Tests
 * 
 * Tests that TypeScript types are properly exported and that
 * type inference works correctly.
 */

import { describe, it } from 'mocha';
import assert from 'assert';
import type {
  IPoint,
  IPath,
  IPathLine,
  IPathCircle,
  IPathArc,
  IModel,
  IPathMap,
  IModelMap
} from '../src/core/schema.js';

describe('TypeScript Type Safety', function () {
  
  describe('Type Imports', function () {
    
    it('should import IPoint type', function () {
      const point: IPoint = [0, 0];
      assert.equal(point[0], 0, 'IPoint should have x coordinate');
      assert.equal(point[1], 0, 'IPoint should have y coordinate');
    });

    it('should import IPath type', function () {
      const path: IPath = {
        type: 'line',
        origin: [0, 0]
      };
      assert.ok(path.type, 'IPath should have type property');
      assert.ok(path.origin, 'IPath should have origin property');
    });

    it('should import IPathLine type', function () {
      const line: IPathLine = {
        type: 'line',
        origin: [0, 0],
        end: [10, 10]
      };
      assert.equal(line.type, 'line', 'IPathLine should have type "line"');
      assert.ok(line.end, 'IPathLine should have end property');
    });

    it('should import IPathCircle type', function () {
      const circle: IPathCircle = {
        type: 'circle',
        origin: [0, 0],
        radius: 5
      };
      assert.equal(circle.type, 'circle', 'IPathCircle should have type "circle"');
      assert.equal(circle.radius, 5, 'IPathCircle should have radius property');
    });

    it('should import IPathArc type', function () {
      const arc: IPathArc = {
        type: 'arc',
        origin: [0, 0],
        radius: 5,
        startAngle: 0,
        endAngle: 90
      };
      assert.equal(arc.type, 'arc', 'IPathArc should have type "arc"');
      assert.ok(arc.startAngle !== undefined, 'IPathArc should have startAngle property');
      assert.ok(arc.endAngle !== undefined, 'IPathArc should have endAngle property');
    });

    it('should import IModel type', function () {
      const model: IModel = {
        paths: {}
      };
      assert.ok(model.paths !== undefined, 'IModel should have paths property');
    });
  });

  describe('Type Inference', function () {
    
    it('should infer path types correctly', async function () {
      const { Line, Circle, Arc } = await import('../src/core/paths.js');
      
      const line = new Line([0, 0], [10, 10]);
      const circle = new Circle([0, 0], 5);
      const arc = new Arc([0, 0], 5, 0, 90);
      
      // TypeScript should infer these as the correct path types
      assert.equal(line.type, 'line');
      assert.equal(circle.type, 'circle');
      assert.equal(arc.type, 'arc');
    });

    it('should infer point operations return types', async function () {
      const { add, subtract, scale } = await import('../src/core/point.js');
      
      const p1: IPoint = [0, 0];
      const p2: IPoint = [10, 10];
      
      const sum = add(p1, p2);
      const diff = subtract(p2, p1);
      const scaled = scale(p1, 2);
      
      // These should all be inferred as IPoint
      assert.ok(Array.isArray(sum), 'sum should be an array');
      assert.ok(Array.isArray(diff), 'diff should be an array');
      assert.ok(Array.isArray(scaled), 'scaled should be an array');
    });

    it('should infer model operations return types', async function () {
      const { originate, rotate, scale } = await import('../src/core/model.js');
      const { Rectangle } = await import('../src/models/Rectangle.js');
      
      const rect = new Rectangle(10, 20);
      
      // These operations should return IModel or void
      originate(rect, [5, 5]);
      rotate(rect, 45);
      scale(rect, 2);
      
      assert.ok(rect.paths, 'model should still have paths after operations');
    });
  });

  describe('Generic Type Parameters', function () {
    
    it('should handle IPathMap generic correctly', async function () {
      const { Line } = await import('../src/core/paths.js');
      
      const paths: IPathMap = {
        line1: new Line([0, 0], [10, 10]),
        line2: new Line([0, 0], [20, 20])
      };
      
      assert.ok(paths.line1, 'IPathMap should allow string keys');
      assert.ok(paths.line2, 'IPathMap should allow multiple paths');
    });

    it('should handle IModelMap generic correctly', async function () {
      const { Rectangle } = await import('../src/models/Rectangle.js');
      
      const models: IModelMap = {
        rect1: new Rectangle(10, 20),
        rect2: new Rectangle(30, 40)
      };
      
      assert.ok(models.rect1, 'IModelMap should allow string keys');
      assert.ok(models.rect2, 'IModelMap should allow multiple models');
    });
  });

  describe('Type Guards', function () {
    
    it('should use isNumber type guard', async function () {
      const { isNumber } = await import('../src/core/base.js');
      
      const value: any = 42;
      
      if (isNumber(value)) {
        // TypeScript should narrow type to number here
        const doubled: number = value * 2;
        assert.equal(doubled, 84);
      }
    });

    it('should use isPoint type guard', async function () {
      const { isPoint } = await import('../src/core/base.js');
      
      const value: any = [10, 20];
      
      if (isPoint(value)) {
        // TypeScript should narrow type to IPoint here
        const x: number = value[0];
        const y: number = value[1];
        assert.equal(x, 10);
        assert.equal(y, 20);
      }
    });

    it('should use isPoint type guard', async function () {
      const { isPoint } = await import('../src/core/base.js');
      
      const value: any = [10, 20];
      
      if (isPoint(value)) {
        // TypeScript should narrow type to IPoint here
        const x: number = value[0];
        const y: number = value[1];
        assert.equal(x, 10);
        assert.equal(y, 20);
      }
    });

    it('should use isNumber type guard', async function () {
      const { isNumber } = await import('../src/core/base.js');
      
      const value: any = 42;
      
      if (isNumber(value)) {
        // TypeScript should narrow type to number here
        const doubled: number = value * 2;
        assert.equal(doubled, 84);
      }
    });
  });

  describe('Interface Exports', function () {
    
    it('should export all schema interfaces', async function () {
      const schema = await import('../src/core/schema.js');
      
      // Check that key interfaces are exported
      assert.ok('IPoint' in schema === false, 'Types should not be in runtime exports');
      
      // But we can use them in TypeScript
      const point: IPoint = [0, 0];
      const path: IPath = { type: 'line', origin: [0, 0] };
      const model: IModel = { paths: {} };
      
      assert.ok(point);
      assert.ok(path);
      assert.ok(model);
    });
  });

  describe('Const and Enum Types', function () {
    
    it('should use pathType constants with correct types', async function () {
      const { core } = await import('../src/index.js');
      
      // pathType should be a constant object with string values
      assert.equal(typeof core.pathType.Line, 'string');
      assert.equal(typeof core.pathType.Circle, 'string');
      assert.equal(typeof core.pathType.Arc, 'string');
      assert.equal(typeof core.pathType.BezierSeed, 'string');
    });

    it('should use unitType constants with correct types', async function () {
      const { core } = await import('../src/index.js');
      
      // unitType should be a constant object with string values
      assert.equal(typeof core.unitType.Centimeter, 'string');
      assert.equal(typeof core.unitType.Inch, 'string');
      assert.equal(typeof core.unitType.Millimeter, 'string');
    });
  });

  describe('Optional Properties', function () {
    
    it('should handle optional model properties', async function () {
      const { Rectangle } = await import('../src/models/Rectangle.js');
      
      const model: IModel = new Rectangle(10, 20);
      
      // These properties are optional in IModel
      assert.ok(model.paths !== undefined || model.models !== undefined, 'at least one should be defined');
      
      // Optional properties should be accessible
      const units = model.units; // Should be string | undefined
      const layer = model.layer; // Should be string | undefined
      
      // TypeScript should allow these to be undefined
      assert.ok(units === undefined || typeof units === 'string');
      assert.ok(layer === undefined || typeof layer === 'string');
    });
  });

  describe('Function Overloads', function () {
    
    it('should handle function overloads correctly', async function () {
      const { rotate } = await import('../src/core/model.js');
      const { Rectangle } = await import('../src/models/Rectangle.js');
      
      const model = new Rectangle(10, 20);
      
      // rotate can take different parameter combinations
      rotate(model, 45); // angle only
      rotate(model, 45, [5, 5]); // angle and origin
      
      assert.ok(model.paths, 'model should still be valid after rotations');
    });
  });

  describe('Type Compatibility', function () {
    
    it('should allow IPath to be assigned to specific path types', async function () {
      const { Line } = await import('../src/core/paths.js');
      
      const line: IPathLine = new Line([0, 0], [10, 10]);
      const path: IPath = line; // Should be compatible
      
      assert.equal(path.type, 'line');
    });

    it('should allow IModel to contain nested models', async function () {
      const { Rectangle } = await import('../src/models/Rectangle.js');
      
      const parent: IModel = {
        models: {
          child1: new Rectangle(10, 20),
          child2: new Rectangle(30, 40)
        }
      };
      
      assert.ok(parent.models);
      assert.ok(parent.models.child1);
      assert.ok(parent.models.child2);
    });
  });

  describe('Return Type Validation', function () {
    
    it('should validate measure functions return correct types', async function () {
      const { modelExtents, pathLength } = await import('../src/core/measure.js');
      const { Rectangle } = await import('../src/models/Rectangle.js');
      const { Line } = await import('../src/core/paths.js');
      
      const model = new Rectangle(10, 20);
      const line = new Line([0, 0], [10, 0]);
      
      const extents = modelExtents(model);
      const length = pathLength(line);
      
      // extents should have specific structure
      assert.ok(extents);
      assert.ok(extents.low);
      assert.ok(extents.high);
      
      // length should be a number
      assert.equal(typeof length, 'number');
    });

    it('should validate chain functions return correct types', async function () {
      const { findChains } = await import('../src/core/chain.js');
      const { Rectangle } = await import('../src/models/Rectangle.js');
      
      const model = new Rectangle(10, 20);
      const chains = findChains(model);
      
      // chains should be an array or object
      assert.ok(chains);
      assert.ok(typeof chains === 'object');
    });
  });
});
