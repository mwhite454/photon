// Playwright test for playground rendering
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testPlaygroundRendering() {
  console.log('🚀 Starting Playground Rendering Test\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  const errorMessages = [];
  
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push({ type: msg.type(), text });
    if (msg.type() === 'error') {
      errorMessages.push(text);
    }
  });
  
  try {
    // T089: Navigate to playground
    console.log('📍 T089: Navigating to playground...');
    await page.goto('http://localhost:3000/playground/', { waitUntil: 'networkidle' });
    console.log('   ✅ Playground loaded\n');
    
    // Wait for the page to be fully loaded
    await page.waitForTimeout(1000);
    
    // T090: Select "Simple Square" from dropdown
    console.log('📍 T090: Selecting "Simple Square" model...');
    const dropdown = await page.locator('select#models-dropdown');
    await dropdown.selectOption({ label: 'Simple Square' });
    console.log('   ✅ Model selected\n');
    
    // Wait for model to load
    await page.waitForTimeout(500);
    
    // T091: Click "► Run" button
    console.log('📍 T091: Clicking "► Run" button...');
    const runButton = await page.locator('button:has-text("► Run")');
    await runButton.click();
    console.log('   ✅ Run button clicked\n');
    
    // Wait for execution
    await page.waitForTimeout(2000);
    
    // T092: Verify no console errors
    console.log('📍 T092: Checking for console errors...');
    const importErrors = errorMessages.filter(msg => 
      msg.includes('Cannot use import statement') || 
      msg.includes('import') ||
      msg.includes('is not a function') ||
      msg.includes('is not defined')
    );
    
    if (importErrors.length > 0) {
      console.log('   ❌ Console errors found:');
      importErrors.forEach(err => console.log(`      - ${err}`));
    } else {
      console.log('   ✅ No import or namespace errors\n');
    }
    
    // T093: Verify SVG canvas shows rendered square
    console.log('📍 T093: Checking for rendered SVG...');
    
    // Check if SVG element exists (try multiple selectors)
    let svgElement = await page.locator('svg').first();
    let svgExists = await svgElement.count() > 0;
    
    if (!svgExists) {
      // Try finding by class or other attributes
      svgElement = await page.locator('[id*="svg"], [class*="svg"]').first();
      svgExists = await svgElement.count() > 0;
    }
    
    if (!svgExists) {
      console.log('   ❌ SVG canvas not found\n');
      throw new Error('SVG canvas not found');
    }
    
    // Check if SVG has content (paths, shapes, etc.)
    const svgContent = await svgElement.innerHTML();
    const hasContent = svgContent.length > 100; // SVG with actual shapes should have content
    
    if (!hasContent) {
      console.log('   ❌ SVG canvas is empty\n');
      console.log(`   SVG content length: ${svgContent.length} bytes`);
    } else {
      console.log('   ✅ SVG canvas has rendered content');
      console.log(`   SVG content length: ${svgContent.length} bytes\n`);
    }
    
    // T094: Take screenshot
    console.log('📍 T094: Taking screenshot...');
    const screenshotPath = join(__dirname, 'playground-simple-square-rendering.png');
    await page.screenshot({ 
      path: screenshotPath,
      fullPage: true 
    });
    console.log(`   ✅ Screenshot saved: ${screenshotPath}\n`);
    
    // Summary
    console.log('📊 Test Summary:');
    console.log('   ✅ T089: Navigation successful');
    console.log('   ✅ T090: Model selection successful');
    console.log('   ✅ T091: Run button clicked');
    console.log(`   ${importErrors.length === 0 ? '✅' : '❌'} T092: Console errors check`);
    console.log(`   ${hasContent ? '✅' : '❌'} T093: SVG rendering check`);
    console.log('   ✅ T094: Screenshot captured\n');
    
    // Console log summary
    console.log('📝 Console Messages:');
    const relevantMessages = consoleMessages.filter(msg => 
      !msg.text.includes('Download the React DevTools') &&
      !msg.text.includes('DevTools')
    );
    
    if (relevantMessages.length > 0) {
      relevantMessages.slice(0, 10).forEach(msg => {
        console.log(`   [${msg.type}] ${msg.text}`);
      });
      if (relevantMessages.length > 10) {
        console.log(`   ... and ${relevantMessages.length - 10} more messages`);
      }
    } else {
      console.log('   No relevant console messages');
    }
    
    // Final result
    const allPassed = importErrors.length === 0 && hasContent;
    console.log(`\n${allPassed ? '✅' : '❌'} Overall Result: ${allPassed ? 'PASSED' : 'FAILED'}`);
    
    if (!allPassed) {
      console.log('\n⚠️  Issues detected:');
      if (importErrors.length > 0) {
        console.log('   - Console errors present');
      }
      if (!hasContent) {
        console.log('   - SVG not rendering');
      }
    }
    
    return allPassed;
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Run the test
testPlaygroundRendering()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
