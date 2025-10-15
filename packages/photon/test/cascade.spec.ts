/**
 * Cascade API Tests
 * 
 * Tests for the legacy cascade ($) function with Model/Path/Point operations.
 * Tests follow TDD approach and verify ES6+ modernization.
 */

import { describe, it } from 'mocha';
import assert from 'assert';
import { $, model, path, point, paths } from '../src/index.js';
import { Square, Rectangle } from '../src/models/index.js';
import type { IModel, IPath, IPoint } from '../src/core/schema.js';

describe('Cascade API', function () {
  
  describe('Model Cascade', function () {
    
    it('TC-CASCADE-M-001: should chain model operations', function () {
      const square = new Square(100);
      const result = $(square)
        .center()
        .rotate(45)
        .$result as IModel;
      
      assert.ok(result, 'result should exist');
      assert.ok(result.origin, 'result should have origin property');
      assert.strictEqual(result.origin[0], -50, 'origin x should be -50 after centering');
      assert.strictEqual(result.origin[1], -50, 'origin y should be -50 after centering');
    });
    
    it('TC-CASCADE-M-002: should preserve $initial', function () {
      const square = new Square(100);
      const container = $(square);
      
      const originalOrigin = square.origin ? [...square.origin] : [0, 0];
      
      container.center().rotate(45);
      
      assert.deepStrictEqual(
        (container.$initial as IModel).origin,
        originalOrigin,
        '$initial should preserve original origin'
      );
      assert.notStrictEqual(
        container.$initial,
        container.$result,
        '$initial and $result should be different objects'
      );
    });
    
    it('TC-CASCADE-M-003: should reset to initial state', function () {
      const square = new Square(100);
      const container = $(square);
      
      const initialState = JSON.stringify(container.$initial);
      
      container.center().rotate(45);
      const transformed = JSON.stringify(container.$result);
      
      assert.notStrictEqual(transformed, initialState, 'result should be different after transformations');
      
      container.$reset();
      
      const resetState = JSON.stringify(container.$result);
      assert.strictEqual(resetState, initialState, '$result should equal $initial after reset');
    });
    
    it('TC-CASCADE-M-004: should handle multiple operations', function () {
      const result = $(new Square(100))
        .center()
        .rotate(45)
        .scale(2)
        .moveRelative([10, 20])
        .mirror(true, false)
        .$result;
      
      assert.ok(result, 'result should be defined after multiple operations');
    });
    
    it('TC-CASCADE-M-005: should pass multiple arguments', function () {
      const result = $(new Rectangle(100, 50))
        .moveRelative([25, 10])
        .$result as IModel;
      
      assert.ok(result.origin, 'result should have origin property');
      assert.strictEqual(result.origin[0], 25, 'origin x should be 25');
      assert.strictEqual(result.origin[1], 10, 'origin y should be 10');
    });
  });
  
  describe('Path Cascade', function () {
    
    it('TC-CASCADE-P-001: should chain path operations', function () {
      const arc = new paths.Arc([0, 0], 50, 0, 90);
      const result = $(arc)
        .move([10, 10])
        .rotate(45)
        .$result as IPath;
      
      assert.ok(result, 'result should exist');
      assert.ok(result.origin, 'result should have origin property');
      assert.strictEqual(result.origin[0], 10, 'origin x should be 10');
      assert.strictEqual(result.origin[1], 10, 'origin y should be 10');
    });
    
    it('TC-CASCADE-P-002: should support addTo chaining', function () {
      const parent: any = {};
      
      $(new paths.Arc([5, 5], 5, 180, 270))
        .addTo(parent, 'arc1')
        .mirror(true, false)
        .addTo(parent, 'arc2');
      
      assert.ok(parent.paths, 'parent should have paths property');
      assert.ok(parent.paths.arc1, 'parent should have paths.arc1');
      assert.ok(parent.paths.arc2, 'parent should have paths.arc2');
    });
    
    it('TC-CASCADE-P-003: should reset path to initial', function () {
      const line = new paths.Line([0, 0], [100, 0]);
      const container = $(line);
      
      container.move([50, 50]);
      const movedOrigin = (container.$result as IPath).origin;
      assert.strictEqual(movedOrigin[0], 50, 'moved origin x should be 50');
      assert.strictEqual(movedOrigin[1], 50, 'moved origin y should be 50');
      
      container.$reset();
      const resetOrigin = (container.$result as IPath).origin;
      assert.strictEqual(resetOrigin[0], 0, 'reset origin x should be 0');
      assert.strictEqual(resetOrigin[1], 0, 'reset origin y should be 0');
    });
  });
  
  describe('Point Cascade', function () {
    
    it('TC-CASCADE-PT-001: should chain point operations', function () {
      const pt: IPoint = [10, 20];
      const result = $(pt)
        .add([5, 5])
        .rotate(90, [0, 0])
        .$result as IPoint;
      
      assert.ok(result, 'result should exist');
      assert.ok(Array.isArray(result), 'result should be an array');
      assert.strictEqual(result.length, 2, 'result should have 2 elements');
    });
    
    it('TC-CASCADE-PT-002: should not mutate original point', function () {
      const original: IPoint = [10, 20];
      const container = $(original);
      
      container.add([5, 5]);
      
      assert.strictEqual(original[0], 10, 'original x should remain 10');
      assert.strictEqual(original[1], 20, 'original y should remain 20');
      
      const result = container.$result as IPoint;
      assert.notDeepStrictEqual(result, original, 'result should not equal original');
    });
  });
  
  describe('Type Detection', function () {
    
    it('TC-CASCADE-T-001: should detect model type', function () {
      const m = new Square(100);
      const container = $(m);
      
      assert.ok(container.$initial, 'container should have $initial');
      assert.ok(container.$result, 'container should have $result');
      assert.ok(typeof container.$reset === 'function', 'container should have $reset method');
    });
    
    it('TC-CASCADE-T-002: should detect path type', function () {
      const p = new paths.Line([0, 0], [100, 0]);
      const container = $(p);
      
      assert.ok(container.$initial, 'container should have $initial');
      assert.ok(container.$result, 'container should have $result');
      assert.ok(typeof container.$reset === 'function', 'container should have $reset method');
    });
    
    it('TC-CASCADE-T-003: should detect point type', function () {
      const pt: IPoint = [10, 20];
      const container = $(pt);
      
      assert.ok(container.$initial, 'container should have $initial');
      assert.ok(container.$result, 'container should have $result');
      assert.ok(typeof container.$reset === 'function', 'container should have $reset method');
    });
    
    it('TC-CASCADE-T-004: should throw error for invalid type', function () {
      const invalidObject = { foo: 'bar' };
      
      assert.throws(
        () => $(invalidObject as any),
        /Invalid context/,
        'should throw error for invalid object'
      );
      
      assert.throws(
        () => $(null as any),
        'should throw error for null'
      );
      
      assert.throws(
        () => $(undefined as any),
        'should throw error for undefined'
      );
    });
  });
  
  describe('ES6+ Modernization Verification', function () {
    
    it('TC-MOD-001: implementation uses const/let, not var', async function () {
      const fs = await import('fs');
      const cascadeSource = fs.readFileSync('src/core/core.ts', 'utf8');
      
      // Extract Cascade class code
      const cascadeMatch = cascadeSource.match(/class Cascade[\s\S]*?^\s{4}\}/m);
      
      if (cascadeMatch) {
        const cascadeClassCode = cascadeMatch[0];
        
        // Check for var keyword usage
        const hasVar = /\bvar\b/.test(cascadeClassCode);
        
        assert.strictEqual(
          hasVar,
          false,
          'Cascade class should not use var declarations'
        );
      } else {
        assert.fail('Could not find Cascade class in core.ts');
      }
    });
    
    it('TC-MOD-002: implementation uses arrow functions', async function () {
      const fs = await import('fs');
      const cascadeSource = fs.readFileSync('src/core/core.ts', 'utf8');
      
      // Extract _shadow method
      const shadowMatch = cascadeSource.match(/_shadow[\s\S]*?\n\s{8}\}/);
      
      if (shadowMatch) {
        const shadowMethod = shadowMatch[0];
        
        const hasArrowFunction = /=>/.test(shadowMethod);
        const hasFunctionKeyword = /this\[\w+\]\s*=\s*function\s*\(/.test(shadowMethod);
        
        assert.strictEqual(
          hasArrowFunction,
          true,
          '_shadow method should use arrow functions'
        );
        
        assert.strictEqual(
          hasFunctionKeyword,
          false,
          '_shadow method should not use function keyword for assigned functions'
        );
      }
    });
    
    it('TC-MOD-003: implementation uses rest parameters', async function () {
      const fs = await import('fs');
      const cascadeSource = fs.readFileSync('src/core/core.ts', 'utf8');
      
      // Extract _apply method
      const applyMatch = cascadeSource.match(/_apply[\s\S]*?\n\s{8}\}/);
      
      if (applyMatch) {
        const applyMethod = applyMatch[0];
        
        const hasRestParams = /\.\.\.[\w]+/.test(applyMethod);
        const hasArguments = /\barguments\b/.test(applyMethod);
        
        assert.strictEqual(
          hasRestParams || !hasArguments,
          true,
          '_apply method should use rest parameters or not use arguments object'
        );
      }
    });
  });
});
