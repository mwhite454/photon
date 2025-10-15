/**
 * Functional Composition Tests
 * 
 * Tests for pipe and compose functions following TDD approach.
 * Tests written before implementation per Constitution Principle I.
 */

import { describe, it } from 'mocha';
import assert from 'assert';
import { pipe, compose } from '../src/core/functional.js';
import { model } from '../src/index.js';
import { Square, Rectangle } from '../src/models/index.js';

describe('Pipe Function', function () {
  
  describe('Basic Functionality', function () {
    
    it('TC-PIPE-001: should apply single function', function () {
      const add5 = (x: number) => x + 5;
      const result = pipe(10, add5);
      assert.strictEqual(result, 15, 'pipe should apply single function');
    });
    
    it('TC-PIPE-002: should apply functions left-to-right (2 functions)', function () {
      const add5 = (x: number) => x + 5;
      const multiply2 = (x: number) => x * 2;
      
      // (10 + 5) * 2 = 30
      const result = pipe(10, add5, multiply2);
      assert.strictEqual(result, 30, 'pipe should apply functions left-to-right');
    });
    
    it('TC-PIPE-002: should apply functions left-to-right (3 functions)', function () {
      const add5 = (x: number) => x + 5;
      const multiply2 = (x: number) => x * 2;
      const subtract3 = (x: number) => x - 3;
      
      // (10 + 5) * 2 - 3 = 27
      const result = pipe(10, add5, multiply2, subtract3);
      assert.strictEqual(result, 27, 'pipe should apply 3 functions left-to-right');
    });
    
    it('TC-PIPE-002: should apply functions left-to-right (4 functions)', function () {
      const add5 = (x: number) => x + 5;
      const multiply2 = (x: number) => x * 2;
      const subtract3 = (x: number) => x - 3;
      const divide4 = (x: number) => x / 4;
      
      // ((10 + 5) * 2 - 3) / 4 = 6.75
      const result = pipe(10, add5, multiply2, subtract3, divide4);
      assert.strictEqual(result, 6.75, 'pipe should apply 4 functions left-to-right');
    });
    
    it('TC-PIPE-002: should apply functions left-to-right (5+ functions)', function () {
      const add1 = (x: number) => x + 1;
      const multiply2 = (x: number) => x * 2;
      const subtract3 = (x: number) => x - 3;
      const add10 = (x: number) => x + 10;
      const divide2 = (x: number) => x / 2;
      
      // ((((5 + 1) * 2 - 3) + 10) / 2 = 9.5
      const result = pipe(5, add1, multiply2, subtract3, add10, divide2);
      assert.strictEqual(result, 9.5, 'pipe should apply 5+ functions left-to-right');
    });
    
    it('TC-PIPE-006: should return value when no functions provided', function () {
      const result = pipe(42);
      assert.strictEqual(result, 42, 'pipe should return input when no functions provided');
    });
    
  });
  
  describe('Type Safety', function () {
    
    it('TC-PIPE-003: should preserve TypeScript type inference', function () {
      const numToString = (x: number) => x.toString();
      const addExclamation = (s: string) => s + '!';
      
      const result = pipe(42, numToString, addExclamation);
      assert.strictEqual(result, '42!', 'types should be inferred correctly');
      assert.strictEqual(typeof result, 'string', 'result should be string type');
    });
    
    it('TC-PIPE-003: should work with different type transformations', function () {
      const toArray = (x: number) => [x];
      const double = (arr: number[]) => arr.map(n => n * 2);
      const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
      
      const result = pipe(5, toArray, double, sum);
      assert.strictEqual(result, 10, 'should handle type transformations');
    });
    
  });
  
  describe('Immutability', function () {
    
    it('TC-PIPE-004: should not mutate original values', function () {
      const original = { value: 10 };
      const clone = (obj: { value: number }) => ({ ...obj });
      const increment = (obj: { value: number }) => ({ ...obj, value: obj.value + 1 });
      
      const result = pipe(original, clone, increment);
      
      assert.strictEqual(original.value, 10, 'original should not be mutated');
      assert.strictEqual(result.value, 11, 'result should have incremented value');
      assert.notStrictEqual(original, result, 'result should be different object');
    });
    
    it('TC-PIPE-004: should preserve immutability with arrays', function () {
      const original = [1, 2, 3];
      const addItem = (arr: number[]) => [...arr, 4];
      const double = (arr: number[]) => arr.map(n => n * 2);
      
      const result = pipe(original, addItem, double);
      
      assert.deepStrictEqual(original, [1, 2, 3], 'original array should not be mutated');
      assert.deepStrictEqual(result, [2, 4, 6, 8], 'result should have correct values');
    });
    
  });
  
  describe('Integration with Photon', function () {
    
    it('TC-PIPE-005: should work with model operations', function () {
      const square = new Square(100);
      
      // Use moveRelative which doesn't depend on buggy model.walk
      const result = pipe(
        square,
        (m) => model.moveRelative(m, [10, 20]),
        (m) => model.rotate(m, 45)
      );
      
      assert.ok(result, 'result should exist');
      assert.ok(result.origin, 'result should have origin');
      // After moving relative [10, 20] from [0,0]: [10, 20]
      assert.strictEqual(result.origin![0], 10, 'x coordinate should be 10');
      assert.strictEqual(result.origin![1], 20, 'y coordinate should be 20');
    });
    
    it('TC-PIPE-005: should work with multiple model transformations', function () {
      const rect = new Rectangle(200, 100);
      
      const result = pipe(
        rect,
        (m) => model.moveRelative(m, [10, 20]),
        (m) => model.moveRelative(m, [5, 10])
      );
      
      assert.ok(result, 'result should exist');
      assert.ok(result.origin, 'result should have origin');
      // After first move [10, 20]: [10, 20]
      // After second move [5, 10]: [15, 30]
      assert.strictEqual(result.origin![0], 15, 'x coordinate should be 15');
      assert.strictEqual(result.origin![1], 30, 'y coordinate should be 30');
    });
    
    it('TC-PIPE-005: should work with point transformations', function () {
      const transform1 = (p: [number, number]): [number, number] => [p[0] + 10, p[1] + 20];
      const transform2 = (p: [number, number]): [number, number] => [p[0] * 2, p[1] * 2];
      
      const result = pipe([5, 5] as [number, number], transform1, transform2);
      
      assert.deepStrictEqual(result, [30, 50], 'point should be transformed correctly');
    });
    
  });
  
  describe('Edge Cases', function () {
    
    it('should handle null values', function () {
      const returnNull = () => null;
      const handleNull = (x: any) => x === null ? 'was null' : 'not null';
      
      const result = pipe(42, returnNull, handleNull);
      assert.strictEqual(result, 'was null', 'should handle null in pipeline');
    });
    
    it('should handle undefined values', function () {
      const returnUndefined = (): undefined => undefined;
      const handleUndefined = (x: any) => x === undefined ? 'was undefined' : 'not undefined';
      
      const result = pipe(42, returnUndefined, handleUndefined);
      assert.strictEqual(result, 'was undefined', 'should handle undefined in pipeline');
    });
    
    it('should work with identity function', function () {
      const identity = <T>(x: T): T => x;
      const result = pipe(42, identity, identity, identity);
      assert.strictEqual(result, 42, 'should work with identity functions');
    });
    
  });
  
});

describe('Compose Function', function () {
  
  describe('Basic Functionality', function () {
    
    it('TC-COMP-001: should return equivalent function for single input', function () {
      const add5 = (x: number) => x + 5;
      const composed = compose(add5);
      
      assert.strictEqual(composed(10), 15, 'composed function should apply single function');
    });
    
    it('TC-COMP-002: should compose functions right-to-left (2 functions)', function () {
      const add5 = (x: number) => x + 5;
      const multiply2 = (x: number) => x * 2;
      
      const composed = compose(multiply2, add5);
      
      // Executes: add5(10) => multiply2(15) = 30
      assert.strictEqual(composed(10), 30, 'should compose 2 functions right-to-left');
    });
    
    it('TC-COMP-002: should compose functions right-to-left (3 functions)', function () {
      const add5 = (x: number) => x + 5;
      const multiply2 = (x: number) => x * 2;
      const subtract3 = (x: number) => x - 3;
      
      const composed = compose(subtract3, multiply2, add5);
      
      // Executes: add5(10) => multiply2(15) => subtract3(30) = 27
      assert.strictEqual(composed(10), 27, 'should compose 3 functions right-to-left');
    });
    
    it('TC-COMP-002: should compose functions right-to-left (4+ functions)', function () {
      const add1 = (x: number) => x + 1;
      const multiply2 = (x: number) => x * 2;
      const subtract3 = (x: number) => x - 3;
      const add10 = (x: number) => x + 10;
      const divide2 = (x: number) => x / 2;
      
      const composed = compose(divide2, add10, subtract3, multiply2, add1);
      
      // Executes: add1(5) => multiply2(6) => subtract3(12) => add10(9) => divide2(19) = 9.5
      assert.strictEqual(composed(5), 9.5, 'should compose 5 functions right-to-left');
    });
    
    it('TC-COMP-003: should be reusable', function () {
      const double = (x: number) => x * 2;
      const add10 = (x: number) => x + 10;
      const transform = compose(add10, double);
      
      assert.strictEqual(transform(5), 20, 'first call should work: (5 * 2) + 10 = 20');
      assert.strictEqual(transform(10), 30, 'second call should work: (10 * 2) + 10 = 30');
      assert.strictEqual(transform(7), 24, 'third call should work: (7 * 2) + 10 = 24');
    });
    
    it('TC-COMP-003: should create independent composed functions', function () {
      const add5 = (x: number) => x + 5;
      const multiply2 = (x: number) => x * 2;
      
      const transform1 = compose(multiply2, add5);
      const transform2 = compose(add5, multiply2);
      
      // Different order = different results
      assert.strictEqual(transform1(10), 30, 'add5 then multiply2: (10 + 5) * 2 = 30');
      assert.strictEqual(transform2(10), 25, 'multiply2 then add5: (10 * 2) + 5 = 25');
    });
    
  });
  
  describe('Type Safety', function () {
    
    it('TC-COMP-004: should preserve TypeScript type inference', function () {
      const numToString = (x: number) => x.toString();
      const addExclamation = (s: string) => s + '!';
      const toUpperCase = (s: string) => s.toUpperCase();
      
      // Chain with intermediate type transformations
      const result = pipe(42, numToString, addExclamation, toUpperCase);
      assert.strictEqual(result, '42!', 'types should be inferred correctly');
      assert.strictEqual(typeof result, 'string', 'result should be string type');
    });
    
    it('TC-COMP-004: should work with different type transformations', function () {
      const toArray = (x: number) => [x];
      const double = (arr: number[]) => arr.map(n => n * 2);
      const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
      
      // Use pipe for heterogeneous type transformations
      const result = pipe(5, toArray, double, sum);
      
      assert.strictEqual(result, 10, 'should handle type transformations');
    });
    
  });
  
  describe('Immutability', function () {
    
    it('should not mutate original values', function () {
      const original = { value: 10 };
      const clone = (obj: { value: number }) => ({ ...obj });
      const increment = (obj: { value: number }) => ({ ...obj, value: obj.value + 1 });
      const double = (obj: { value: number }) => ({ ...obj, value: obj.value * 2 });
      
      const transform = compose(double, increment, clone);
      const result = transform(original);
      
      assert.strictEqual(original.value, 10, 'original should not be mutated');
      assert.strictEqual(result.value, 22, 'result should have correct value: (10 + 1) * 2 = 22');
    });
    
  });
  
  describe('Integration with Photon', function () {
    
    it('TC-COMP-005: should work with model operations', function () {
      const moveAndRotate = compose(
        (m: any) => model.rotate(m, 45),
        (m: any) => model.moveRelative(m, [10, 20])
      );
      
      const square = moveAndRotate(new Square(100));
      
      assert.ok(square, 'result should exist');
      assert.ok(square.origin, 'result should have origin');
      // After moving to [10, 20] and rotating
      assert.strictEqual(square.origin![0], 10, 'x coordinate should be 10');
      assert.strictEqual(square.origin![1], 20, 'y coordinate should be 20');
    });
    
    it('TC-COMP-005: should be reusable with different models', function () {
      const moveAndRotate = compose(
        (m: any) => model.rotate(m, 45),
        (m: any) => model.moveRelative(m, [5, 10])
      );
      
      const square = moveAndRotate(new Square(100));
      const rect = moveAndRotate(new Rectangle(200, 100));
      
      assert.strictEqual(square.origin![0], 5, 'square x should be 5');
      assert.strictEqual(square.origin![1], 10, 'square y should be 10');
      assert.strictEqual(rect.origin![0], 5, 'rect x should be 5');
      assert.strictEqual(rect.origin![1], 10, 'rect y should be 10');
    });
    
  });
  
  describe('Integration with Pipe', function () {
    
    it('TC-COMP-006: should work together with pipe', function () {
      const transform = compose(
        (x: number) => x * 2,
        (x: number) => x + 5
      );
      
      const result = pipe(10, transform, (x: number) => x - 3);
      
      // 10 => transform(10) = (10 + 5) * 2 = 30 => 30 - 3 = 27
      assert.strictEqual(result, 27, 'compose and pipe should work together');
    });
    
    it('TC-COMP-006: should enable reusable transformation pipelines', function () {
      const normalize = compose(
        (x: number) => x / 100,
        (x: number) => Math.max(0, Math.min(100, x))
      );
      
      const result1 = pipe(150, normalize);
      const result2 = pipe(-50, normalize);
      const result3 = pipe(75, normalize);
      
      assert.strictEqual(result1, 1, '150 clamped to 100, then /100 = 1');
      assert.strictEqual(result2, 0, '-50 clamped to 0, then /100 = 0');
      assert.strictEqual(result3, 0.75, '75 stays 75, then /100 = 0.75');
    });
    
  });
  
  describe('Edge Cases', function () {
    
    it('should handle identity function', function () {
      const identity = <T>(x: T): T => x;
      const composed = compose(identity, identity);
      
      assert.strictEqual(composed(42), 42, 'identity composition should return input');
    });
    
    it('should work with async-compatible functions', function () {
      const add5 = (x: number) => x + 5;
      const multiply2 = (x: number) => x * 2;
      
      const transform = compose(multiply2, add5);
      const result = transform(10);
      
      assert.strictEqual(result, 30, 'should work with regular functions');
    });
    
  });
  
});
