// Final comprehensive test
import { chromium } from 'playwright';

async function finalTest() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newContext().then(c => c.newPage());
  
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  try {
    console.log('🎯 Final Playground Rendering Test\n');
    
    await page.goto('http://localhost:3000/playground/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Select Simple Square
    console.log('📍 Testing Simple Square...');
    const dropdown = await page.locator('select#models-dropdown');
    await dropdown.selectOption({ label: 'Simple Square' });
    await page.waitForTimeout(1000);
    
    // Click Run
    const runButton = await page.locator('button:has-text("► Run")');
    await runButton.click();
    await page.waitForTimeout(3000);
    
    // Check output
    const viewHTML = await page.locator('#view-svg-container').innerHTML();
    
    // Check for square elements
    const hasSquareGroup = viewHTML.includes('id="square"');
    const hasLines = (viewHTML.match(/<line/g) || []).length >= 4; // Rectangle has 4 lines
    const hasContent = viewHTML.length > 1000;
    
    console.log(`  Content length: ${viewHTML.length} bytes`);
    console.log(`  Has square group: ${hasSquareGroup}`);
    console.log(`  Has 4+ lines: ${hasLines}`);
    console.log(`  Errors: ${errors.length}`);
    
    if (hasSquareGroup && hasLines && hasContent && errors.length === 0) {
      console.log('  ✅ PASSED\n');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'specs/004-all-examples-housed/verification/simple-square-success.png',
        fullPage: true 
      });
      console.log('  📸 Screenshot saved\n');
      
      return true;
    } else {
      console.log('  ❌ FAILED\n');
      if (errors.length > 0) {
        console.log('  Errors:', errors);
      }
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Test all models
async function testAllModels() {
  const models = [
    'Simple Square',
    'Basic Shapes', 
    'Gear Wheel',
    'Rpi Case',
    'Smiley Face'
  ];
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newContext().then(c => c.newPage());
  
  const results = {};
  
  try {
    await page.goto('http://localhost:3000/playground/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    for (const modelName of models) {
      console.log(`\n📍 Testing: ${modelName}`);
      
      const dropdown = await page.locator('select#models-dropdown');
      await dropdown.selectOption({ label: modelName });
      await page.waitForTimeout(1000);
      
      const runButton = await page.locator('button:has-text("► Run")');
      await runButton.click();
      await page.waitForTimeout(3000);
      
      const viewHTML = await page.locator('#view-svg-container').innerHTML();
      const hasContent = viewHTML.length > 1000;
      const hasSVG = viewHTML.includes('<svg');
      
      results[modelName] = hasContent && hasSVG;
      
      console.log(`  Content: ${viewHTML.length} bytes`);
      console.log(`  Result: ${results[modelName] ? '✅ PASSED' : '❌ FAILED'}`);
      
      // Take screenshot
      const filename = modelName.toLowerCase().replace(/\s+/g, '-');
      await page.screenshot({ 
        path: `specs/004-all-examples-housed/verification/${filename}-final.png`,
        fullPage: true 
      });
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 FINAL RESULTS');
    console.log('='.repeat(50));
    
    let allPassed = true;
    for (const [model, passed] of Object.entries(results)) {
      console.log(`  ${passed ? '✅' : '❌'} ${model}`);
      if (!passed) allPassed = false;
    }
    
    console.log('='.repeat(50));
    console.log(`\n${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}\n`);
    
    return allPassed;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Run tests
console.log('🚀 Starting Final Verification\n');
console.log('='.repeat(50));

finalTest().then(simpleSquarePassed => {
  if (simpleSquarePassed) {
    console.log('✅ Simple Square test passed, testing all models...\n');
    return testAllModels();
  } else {
    console.log('❌ Simple Square test failed, skipping other tests');
    process.exit(1);
  }
}).then(allPassed => {
  process.exit(allPassed ? 0 : 1);
});
