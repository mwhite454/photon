// Test Simple Square specifically
import { chromium } from 'playwright';

async function testSimpleSquare() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newContext().then(c => c.newPage());
  
  const allMessages = [];
  page.on('console', msg => {
    allMessages.push({ type: msg.type(), text: msg.text() });
  });
  
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });
  
  try {
    console.log('🔍 Testing Simple Square Model\n');
    
    await page.goto('http://localhost:3000/playground/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Select Simple Square
    console.log('📍 Selecting Simple Square...');
    const dropdown = await page.locator('select#models-dropdown');
    await dropdown.selectOption({ label: 'Simple Square' });
    await page.waitForTimeout(1000);
    
    // Get the loaded code
    const loadedCode = await page.evaluate(() => {
      if (window.monaco && window.editor) {
        return window.editor.getValue();
      }
      return null;
    });
    
    console.log('\n📝 Loaded Code:');
    console.log(loadedCode);
    console.log('');
    
    // Click Run
    console.log('📍 Clicking Run...');
    const runButton = await page.locator('button:has-text("► Run")');
    await runButton.click();
    await page.waitForTimeout(3000);
    
    // Check output
    const viewHTML = await page.locator('#view-svg-container').innerHTML();
    console.log('\n📊 Output:');
    console.log(`  Content length: ${viewHTML.length} bytes`);
    
    if (viewHTML.length > 0) {
      // Check what shapes are in the SVG
      const hasRect = viewHTML.includes('<rect') || viewHTML.includes('Rectangle');
      const hasCircle = viewHTML.includes('<circle');
      const hasPath = viewHTML.includes('<path');
      
      console.log(`  Contains rect: ${hasRect}`);
      console.log(`  Contains circle: ${hasCircle}`);
      console.log(`  Contains path: ${hasPath}`);
      
      if (hasRect) {
        console.log('\n✅ SUCCESS: Square is rendering!');
      } else if (hasCircle) {
        console.log('\n❌ WRONG MODEL: Circle detected (not a square)');
      } else {
        console.log('\n⚠️  UNKNOWN: Output exists but shape unclear');
      }
      
      console.log('\nFirst 500 chars of output:');
      console.log(viewHTML.substring(0, 500));
    } else {
      console.log('  ❌ Empty output');
    }
    
    // Check for errors
    const errors = allMessages.filter(m => m.type === 'error');
    if (errors.length > 0) {
      console.log('\n❌ Console Errors:');
      errors.forEach(e => console.log(`  - ${e.text}`));
    }
    
    console.log('\n⏸️  Browser staying open for 30 seconds...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

testSimpleSquare();
