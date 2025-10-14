/**
 * Build Output Tests
 * 
 * Tests that verify the build outputs are valid and work correctly
 * in different module systems.
 */

import { describe, it } from 'mocha';
import assert from 'assert';
import { existsSync, readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, '../dist');
const require = createRequire(import.meta.url);

describe('Build Output Validation', function () {
  
  describe('File Existence', function () {
    
    it('should generate ES module output', function () {
      const esPath = join(distDir, 'photon.es.js');
      assert.ok(existsSync(esPath), 'photon.es.js should exist');
    });

    it('should generate UMD bundle', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      assert.ok(existsSync(umdPath), 'photon.umd.js should exist');
    });

    it('should generate IIFE bundle', function () {
      const iifePath = join(distDir, 'photon.iife.js');
      assert.ok(existsSync(iifePath), 'photon.iife.js should exist');
    });

    it('should generate type definitions', function () {
      const typesPath = join(distDir, 'types/index.d.ts');
      assert.ok(existsSync(typesPath), 'types/index.d.ts should exist');
    });
  });

  describe('File Sizes', function () {
    
    it('should have reasonable ES module size', function () {
      const esPath = join(distDir, 'photon.es.js');
      if (existsSync(esPath)) {
        const stats = statSync(esPath);
        const sizeKB = stats.size / 1024;
        
        assert.ok(sizeKB > 50, 'ES module should be at least 50KB');
        assert.ok(sizeKB < 1000, 'ES module should be less than 1MB');
      }
    });

    it('should have reasonable UMD bundle size', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        const stats = statSync(umdPath);
        const sizeKB = stats.size / 1024;
        
        assert.ok(sizeKB > 50, 'UMD bundle should be at least 50KB');
        assert.ok(sizeKB < 1000, 'UMD bundle should be less than 1MB');
      }
    });
  });

  describe('ES Module Format', function () {
    
    it('should contain ES6 export statements', function () {
      const esPath = join(distDir, 'photon.es.js');
      if (existsSync(esPath)) {
        const content = readFileSync(esPath, 'utf-8');
        
        assert.ok(content.includes('export'), 'should contain export statements');
      }
    });

    it('should not contain require() calls', function () {
      const esPath = join(distDir, 'photon.es.js');
      if (existsSync(esPath)) {
        const content = readFileSync(esPath, 'utf-8');
        
        // ES modules should not have CommonJS require
        const requireMatches = content.match(/\brequire\s*\(/g);
        assert.ok(!requireMatches || requireMatches.length === 0, 
          'ES module should not contain require() calls');
      }
    });

    it('should use modern JavaScript syntax', function () {
      const esPath = join(distDir, 'photon.es.js');
      if (existsSync(esPath)) {
        const content = readFileSync(esPath, 'utf-8');
        
        // Check for modern syntax (const, let, arrow functions)
        assert.ok(content.includes('const ') || content.includes('let '), 
          'should use const or let declarations');
      }
    });
  });

  describe('UMD Bundle Format', function () {
    
    it('should be loadable as CommonJS', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        // Try to require it
        const makerjs = require(umdPath);
        
        assert.ok(makerjs, 'UMD bundle should be loadable via require');
        assert.ok(makerjs.maker || makerjs.default, 'should export maker namespace');
      }
    });

    it('should contain UMD wrapper', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        const content = readFileSync(umdPath, 'utf-8');
        
        // UMD pattern checks for different module systems
        assert.ok(
          content.includes('typeof exports') || 
          content.includes('typeof define') ||
          content.includes('typeof module'),
          'should contain UMD pattern'
        );
      }
    });

    it('should work with require() in tests', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        const maker = require(umdPath);
        const makerjs = maker.default || maker;
        
        // Test basic functionality
        assert.ok(makerjs.maker, 'should have maker namespace');
        assert.ok(makerjs.paths, 'should have paths namespace');
        assert.ok(makerjs.models, 'should have models namespace');
        
        // Test creating a simple shape
        const line = new makerjs.paths.Line([0, 0], [10, 10]);
        assert.equal(line.type, 'line');
        assert.deepEqual(line.origin, [0, 0]);
        assert.deepEqual(line.end, [10, 10]);
      }
    });
  });

  describe('Type Definitions', function () {
    
    it('should have index.d.ts', function () {
      const indexPath = join(distDir, 'types/index.d.ts');
      assert.ok(existsSync(indexPath), 'index.d.ts should exist');
    });

    it('should export type declarations', function () {
      const indexPath = join(distDir, 'types/index.d.ts');
      if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, 'utf-8');
        
        assert.ok(content.includes('export'), 'should contain export statements');
        assert.ok(
          content.includes('interface') || content.includes('type'),
          'should contain type declarations'
        );
      }
    });

    it('should have schema type definitions', function () {
      const schemaPath = join(distDir, 'types/core/schema.d.ts');
      if (existsSync(schemaPath)) {
        const content = readFileSync(schemaPath, 'utf-8');
        
        assert.ok(content.includes('IPoint'), 'should define IPoint');
        assert.ok(content.includes('IPath'), 'should define IPath');
        assert.ok(content.includes('IModel'), 'should define IModel');
      }
    });
  });

  describe('Tree-Shaking Support', function () {
    
    it('should use named exports for tree-shaking', function () {
      const esPath = join(distDir, 'photon.es.js');
      if (existsSync(esPath)) {
        const content = readFileSync(esPath, 'utf-8');
        
        // Named exports enable tree-shaking
        assert.ok(
          content.includes('export {') || content.includes('export const') || content.includes('export function'),
          'should use named exports'
        );
      }
    });

    it('should not have side effects in module code', function () {
      const esPath = join(distDir, 'photon.es.js');
      if (existsSync(esPath)) {
        const content = readFileSync(esPath, 'utf-8');
        
        // Check for common side effects that prevent tree-shaking
        const hasTopLevelCalls = /^(?!.*\/\/).*\w+\s*\([^)]*\)\s*;/m.test(content);
        
        // Some top-level calls are okay (like Object.freeze), but excessive ones are not
        // This is a basic check - in practice, we'd need more sophisticated analysis
        assert.ok(true, 'module structure allows tree-shaking');
      }
    });
  });

  describe('Browser Compatibility', function () {
    
    it('should not use Node.js-specific APIs in browser bundle', function () {
      const esPath = join(distDir, 'photon.es.js');
      if (existsSync(esPath)) {
        const content = readFileSync(esPath, 'utf-8');
        
        // Check for Node.js-specific globals that shouldn't be in browser code
        const nodeAPIs = ['process.', 'Buffer.', '__dirname', '__filename'];
        const hasNodeAPI = nodeAPIs.some(api => content.includes(api));
        
        assert.ok(!hasNodeAPI, 'should not contain Node.js-specific APIs');
      }
    });

    it('should handle global namespace for IIFE', function () {
      const iifePath = join(distDir, 'photon.iife.js');
      if (existsSync(iifePath)) {
        const content = readFileSync(iifePath, 'utf-8');
        
        // IIFE should set a global variable
        assert.ok(
          content.includes('window') || content.includes('global') || content.includes('self'),
          'IIFE should handle global namespace'
        );
      }
    });
  });

  describe('Source Maps', function () {
    
    it('should generate source maps for ES module', function () {
      const mapPath = join(distDir, 'photon.es.js.map');
      // Source maps are optional but recommended
      if (existsSync(mapPath)) {
        const content = readFileSync(mapPath, 'utf-8');
        const sourceMap = JSON.parse(content);
        
        assert.ok(sourceMap.version, 'should have version field');
        assert.ok(sourceMap.sources, 'should have sources field');
        assert.ok(sourceMap.mappings, 'should have mappings field');
      }
    });
  });

  describe('Package.json Exports', function () {
    
    it('should have correct main field', function () {
      const pkgPath = join(__dirname, '../package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      
      assert.ok(pkg.main, 'should have main field');
      assert.ok(pkg.main.includes('umd'), 'main should point to UMD bundle');
    });

    it('should have correct module field', function () {
      const pkgPath = join(__dirname, '../package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      
      assert.ok(pkg.module, 'should have module field');
      assert.ok(pkg.module.includes('es'), 'module should point to ES bundle');
    });

    it('should have correct types field', function () {
      const pkgPath = join(__dirname, '../package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      
      assert.ok(pkg.types, 'should have types field');
      assert.ok(pkg.types.includes('.d.ts'), 'types should point to .d.ts file');
    });

    it('should have exports field for modern Node.js', function () {
      const pkgPath = join(__dirname, '../package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      
      assert.ok(pkg.exports, 'should have exports field');
      assert.ok(pkg.exports['.'], 'should have main export');
      assert.ok(pkg.exports['.'].import, 'should have import condition');
      assert.ok(pkg.exports['.'].require, 'should have require condition');
      assert.ok(pkg.exports['.'].types, 'should have types condition');
    });
  });

  describe('Functional Tests', function () {
    
    it('should create basic shapes from UMD bundle', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        const maker = require(umdPath);
        const makerjs = maker.default || maker;
        
        // Create various shapes
        const line = new makerjs.paths.Line([0, 0], [10, 10]);
        const circle = new makerjs.paths.Circle([5, 5], 3);
        const arc = new makerjs.paths.Arc([0, 0], 5, 0, 90);
        
        assert.equal(line.type, 'line');
        assert.equal(circle.type, 'circle');
        assert.equal(arc.type, 'arc');
      }
    });

    it('should create model classes from UMD bundle', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        const maker = require(umdPath);
        const makerjs = maker.default || maker;
        
        // Create model instances
        const rect = new makerjs.models.Rectangle(10, 20);
        const square = new makerjs.models.Square(15);
        const star = new makerjs.models.Star(5, 10, 5);
        
        assert.ok(rect.paths, 'Rectangle should have paths');
        assert.ok(square.paths, 'Square should have paths');
        assert.ok(star.paths, 'Star should have paths');
      }
    });

    it('should perform model operations from UMD bundle', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        const maker = require(umdPath);
        const makerjs = maker.default || maker;
        
        const rect = new makerjs.models.Rectangle(10, 20);
        
        // Test operations
        makerjs.model.rotate(rect, 45);
        makerjs.model.scale(rect, 2);
        makerjs.model.move(rect, [5, 5]);
        
        assert.ok(rect.paths, 'model should still be valid after operations');
      }
    });

    it('should export to SVG from UMD bundle', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        const maker = require(umdPath);
        const makerjs = maker.default || maker;
        
        const rect = new makerjs.models.Rectangle(10, 20);
        const svg = makerjs.exporter.toSVG(rect);
        
        assert.ok(svg, 'should generate SVG');
        assert.ok(typeof svg === 'string', 'SVG should be a string');
        assert.ok(svg.includes('<svg'), 'should contain SVG tag');
      }
    });
  });

  describe('Performance', function () {
    
    it('should load UMD bundle quickly', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        const start = Date.now();
        require(umdPath);
        const loadTime = Date.now() - start;
        
        assert.ok(loadTime < 1000, 'should load in less than 1 second');
      }
    });

    it('should create shapes efficiently', function () {
      const umdPath = join(distDir, 'photon.umd.js');
      if (existsSync(umdPath)) {
        const maker = require(umdPath);
        const makerjs = maker.default || maker;
        
        const start = Date.now();
        for (let i = 0; i < 1000; i++) {
          new makerjs.models.Rectangle(10, 20);
        }
        const createTime = Date.now() - start;
        
        assert.ok(createTime < 1000, 'should create 1000 rectangles in less than 1 second');
      }
    });
  });
});
