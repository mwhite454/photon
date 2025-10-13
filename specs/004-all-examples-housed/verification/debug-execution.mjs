// Debug code execution in playground
import { chromium } from 'playwright';

async function debugExecution() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newContext().then(c => c.newPage());
  
  // Collect ALL console messages
  const allMessages = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    allMessages.push({ type, text });
    console.log(`[CONSOLE ${type}] ${text}`);
  });
  
  // Collect page errors
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });
  
  try {
    console.log('🔍 Debugging Playground Execution\n');
    
    // Navigate
    await page.goto('http://localhost:3000/playground/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Get the code from Monaco Editor
    console.log('\n📝 Getting code from Monaco Editor...');
    const editorCode = await page.evaluate(() => {
      if (window.monaco && window.editor) {
        return window.editor.getValue();
      }
      return 'Editor not available';
    });
    console.log('Editor code length:', editorCode.length);
    console.log('First 500 chars:', editorCode.substring(0, 500));
    
    // Select Simple Square
    console.log('\n📍 Selecting Simple Square...');
    const dropdown = await page.locator('select#models-dropdown');
    await dropdown.selectOption({ label: 'Simple Square' });
    await page.waitForTimeout(1000);
    
    // Get code after selection
    const codeAfterSelection = await page.evaluate(() => {
      if (window.monaco && window.editor) {
        return window.editor.getValue();
      }
      return 'Editor not available';
    });
    console.log('\nCode after selection length:', codeAfterSelection.length);
    console.log('First 500 chars:', codeAfterSelection.substring(0, 500));
    
    // Check if photon is available globally
    console.log('\n🔍 Checking global photon object...');
    const photonCheck = await page.evaluate(() => {
      return {
        photonExists: typeof window.photon !== 'undefined',
        photonPoint: typeof window.photon?.point !== 'undefined',
        photonPointIsPoint: typeof window.photon?.point?.isPoint !== 'undefined',
        photonMeasure: typeof window.photon?.measure !== 'undefined',
        photonMeasureIsPointEqual: typeof window.photon?.measure?.isPointEqual !== 'undefined'
      };
    });
    console.log('Photon availability:', JSON.stringify(photonCheck, null, 2));
    
    // Click Run and monitor
    console.log('\n📍 Clicking Run button...');
    const runButton = await page.locator('button:has-text("► Run")');
    await runButton.click();
    
    console.log('\n⏳ Waiting 5 seconds for execution...');
    await page.waitForTimeout(5000);
    
    // Check view container
    const viewHTML = await page.locator('#view-svg-container').innerHTML();
    console.log('\n📊 View container content length:', viewHTML.length);
    if (viewHTML.length > 0) {
      console.log('Content:', viewHTML.substring(0, 500));
    } else {
      console.log('❌ Still empty!');
    }
    
    // Check if there's a render function being called
    console.log('\n🔍 Checking for render activity...');
    const renderInfo = await page.evaluate(() => {
      return {
        viewContainer: document.getElementById('view-svg-container')?.innerHTML?.length || 0,
        allSVGs: document.querySelectorAll('svg').length,
        photonAvailable: typeof window.photon !== 'undefined'
      };
    });
    console.log('Render info:', JSON.stringify(renderInfo, null, 2));
    
    console.log('\n📝 All console messages:', allMessages.length);
    
    console.log('\n⏸️  Browser staying open for 60 seconds for manual inspection...');
    await page.waitForTimeout(60000);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

debugExecution();
