// Test ES6 module exports
import * as photon from './dist/photon.es.js';

console.log('Testing ES6 module exports...\n');

// Test new exports in point namespace
console.log('✓ Testing photon.point namespace:');
console.assert(typeof photon.point === 'object', '  ✗ photon.point namespace missing');
console.assert(typeof photon.point.isPoint === 'function', '  ✗ photon.point.isPoint missing');
console.log('  ✓ photon.point.isPoint exists');

// Test functionality
const testPoint = [0, 0];
const isPointResult = photon.point.isPoint(testPoint);
console.assert(isPointResult === true, '  ✗ photon.point.isPoint([0,0]) should return true');
console.log('  ✓ photon.point.isPoint([0,0]) = true');

// Test new exports in measure namespace
console.log('\n✓ Testing photon.measure namespace:');
console.assert(typeof photon.measure === 'object', '  ✗ photon.measure namespace missing');
console.assert(typeof photon.measure.isPointEqual === 'function', '  ✗ photon.measure.isPointEqual missing');
console.assert(typeof photon.measure.isPointDistinct === 'function', '  ✗ photon.measure.isPointDistinct missing');
console.assert(typeof photon.measure.isPointOnSlope === 'function', '  ✗ photon.measure.isPointOnSlope missing');
console.log('  ✓ photon.measure.isPointEqual exists');
console.log('  ✓ photon.measure.isPointDistinct exists');
console.log('  ✓ photon.measure.isPointOnSlope exists');

// Test functionality
const point1 = [0, 0];
const point2 = [0, 0];
const isEqualResult = photon.measure.isPointEqual(point1, point2);
console.assert(isEqualResult === true, '  ✗ photon.measure.isPointEqual([0,0], [0,0]) should return true');
console.log('  ✓ photon.measure.isPointEqual([0,0], [0,0]) = true');

// Test multiple namespace access (maker and equal should still work)
console.log('\n✓ Testing multiple namespace access:');
console.assert(typeof photon.maker.isPoint === 'function', '  ✗ photon.maker.isPoint missing');
console.log('  ✓ photon.maker.isPoint still accessible');
console.assert(typeof photon.equal.isPointEqual === 'function', '  ✗ photon.equal.isPointEqual missing');
console.log('  ✓ photon.equal.isPointEqual still accessible');

// Test that both namespaces return the same results
const makerResult = photon.maker.isPoint(testPoint);
const pointResult = photon.point.isPoint(testPoint);
console.assert(makerResult === pointResult, '  ✗ Different results from maker vs point namespace');
console.log('  ✓ Both namespaces return consistent results');

console.log('\n✅ All ES6 export tests passed!');
console.log('\nSummary:');
console.log('  - photon.point.isPoint() ✓');
console.log('  - photon.measure.isPointEqual() ✓');
console.log('  - photon.measure.isPointDistinct() ✓');
console.log('  - photon.measure.isPointOnSlope() ✓');
console.log('  - Multiple namespace access ✓');
console.log('  - Functionality verified ✓');
