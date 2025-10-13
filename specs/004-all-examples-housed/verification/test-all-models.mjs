// Test all playground models
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const models = [
  { name: 'Basic Shapes', task: 'T095' },
  { name: 'Gear Wheel', task: 'T096' },
  { name: 'Rpi Case', task: 'T097' },
  { name: 'Smiley Face', task: 'T098' }
];

async function testModel(page, modelName, taskId) {
  console.log(`\n📍 ${taskId}: Testing "${modelName}" model...`);
  
  try {
    // Select model from dropdown
    const dropdown = await page.locator('select#models-dropdown');
    await dropdown.selectOption({ label: modelName });
    await page.waitForTimeout(500);
    
    // Click Run button
    const runButton = await page.locator('button:has-text("► Run")');
    await runButton.click();
    await page.waitForTimeout(2000);
    
    // Check for SVG content
    const svgElement = await page.locator('svg').first();
    const svgExists = await svgElement.count() > 0;
    
    if (!svgExists) {
      console.log(`   ❌ SVG not found for ${modelName}`);
      return false;
    }
    
    const svgContent = await svgElement.innerHTML();
    const hasContent = svgContent.length > 100;
    
    if (!hasContent) {
      console.log(`   ❌ SVG is empty for ${modelName}`);
      console.log(`   SVG content length: ${svgContent.length} bytes`);
      return false;
    }
    
    // Take screenshot
    const screenshotPath = join(__dirname, `playground-${modelName.toLowerCase().replace(/\s+/g, '-')}-rendering.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    console.log(`   ✅ ${modelName} rendered successfully`);
    console.log(`   SVG content length: ${svgContent.length} bytes`);
    console.log(`   Screenshot: ${screenshotPath}`);
    
    return true;
    
  } catch (error) {
    console.log(`   ❌ Error testing ${modelName}: ${error.message}`);
    return false;
  }
}

async function testAllModels() {
  console.log('🚀 Testing All Playground Models\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Collect console errors
  const errorMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errorMessages.push(msg.text());
    }
  });
  
  try {
    // Navigate to playground
    console.log('📍 Navigating to playground...');
    await page.goto('http://localhost:3000/playground/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    console.log('   ✅ Playground loaded');
    
    // Test each model
    const results = {};
    for (const model of models) {
      results[model.name] = await testModel(page, model.name, model.task);
    }
    
    // Summary
    console.log('\n📊 Test Summary:');
    console.log('═'.repeat(50));
    
    let allPassed = true;
    for (const model of models) {
      const status = results[model.name] ? '✅ PASSED' : '❌ FAILED';
      console.log(`   ${model.task}: ${model.name.padEnd(20)} ${status}`);
      if (!results[model.name]) allPassed = false;
    }
    
    console.log('═'.repeat(50));
    
    // Check for console errors
    const importErrors = errorMessages.filter(msg => 
      msg.includes('Cannot use import statement') || 
      msg.includes('is not a function') ||
      msg.includes('is not defined')
    );
    
    if (importErrors.length > 0) {
      console.log('\n⚠️  Console Errors:');
      importErrors.forEach(err => console.log(`   - ${err}`));
      allPassed = false;
    } else {
      console.log('\n✅ No import or namespace errors detected');
    }
    
    console.log(`\n${allPassed ? '✅' : '❌'} Overall Result: ${allPassed ? 'ALL MODELS PASSED' : 'SOME MODELS FAILED'}`);
    
    return allPassed;
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Run the tests
testAllModels()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
