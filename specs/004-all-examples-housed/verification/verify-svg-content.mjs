// Verify actual SVG content in playground
import { chromium } from 'playwright';

async function verifySVGContent() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Collect all console messages
  const allMessages = [];
  page.on('console', msg => {
    allMessages.push({ type: msg.type(), text: msg.text() });
  });
  
  try {
    console.log('🔍 Verifying SVG Content in Playground\n');
    
    // Navigate
    await page.goto('http://localhost:3000/playground/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Select Simple Square
    console.log('📍 Loading Simple Square model...');
    const dropdown = await page.locator('select#models-dropdown');
    await dropdown.selectOption({ label: 'Simple Square' });
    await page.waitForTimeout(1000);
    
    // Click Run
    console.log('📍 Clicking Run...');
    const runButton = await page.locator('button:has-text("► Run")');
    await runButton.click();
    await page.waitForTimeout(3000);
    
    // Check SVG content in detail
    console.log('\n📊 Analyzing SVG Content:\n');
    
    // Check the view-svg-container specifically
    const viewContainer = await page.locator('#view-svg-container');
    const containerHTML = await viewContainer.innerHTML();
    console.log(`View Container (#view-svg-container):`);
    console.log(`  Content length: ${containerHTML.length} bytes`);
    if (containerHTML.length > 0) {
      console.log(`  Content: ${containerHTML.substring(0, 500)}...`);
    } else {
      console.log(`  ❌ EMPTY - No rendered output!`);
    }
    console.log('');
    
    const svgElements = await page.locator('svg').all();
    console.log(`Found ${svgElements.length} total SVG elements\n`);
    
    for (let i = 0; i < svgElements.length; i++) {
      const svg = svgElements[i];
      const innerHTML = await svg.innerHTML();
      const id = await svg.getAttribute('id');
      const className = await svg.getAttribute('class');
      
      console.log(`SVG ${i}:`);
      console.log(`  ID: ${id || 'none'}`);
      console.log(`  Class: ${className || 'none'}`);
      console.log(`  Content length: ${innerHTML.length} bytes`);
      
      // Count actual shape elements
      const pathCount = (innerHTML.match(/<path/g) || []).length;
      const rectCount = (innerHTML.match(/<rect/g) || []).length;
      const circleCount = (innerHTML.match(/<circle/g) || []).length;
      const lineCount = (innerHTML.match(/<line/g) || []).length;
      
      console.log(`  Shapes: ${pathCount} paths, ${rectCount} rects, ${circleCount} circles, ${lineCount} lines`);
      
      if (innerHTML.length > 100) {
        console.log(`  First 200 chars: ${innerHTML.substring(0, 200)}...`);
      }
      console.log('');
    }
    
    // Check for error messages
    console.log('\n📝 Console Messages:');
    const errors = allMessages.filter(m => m.type === 'error');
    if (errors.length > 0) {
      console.log('❌ Errors found:');
      errors.forEach(e => console.log(`  - ${e.text}`));
    } else {
      console.log('✅ No errors');
    }
    
    // Show all messages
    console.log('\nAll messages:');
    allMessages.forEach(m => {
      if (!m.text.includes('DevTools')) {
        console.log(`  [${m.type}] ${m.text}`);
      }
    });
    
    console.log('\n⏸️  Browser will stay open for 30 seconds for manual inspection...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

verifySVGContent();
