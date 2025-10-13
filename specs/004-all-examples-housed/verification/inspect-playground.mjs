// Inspect playground structure
import { chromium } from 'playwright';

async function inspectPlayground() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to playground...');
    await page.goto('http://localhost:3000/playground/', { waitUntil: 'networkidle' });
    
    console.log('\nWaiting for page to load...');
    await page.waitForTimeout(2000);
    
    // Take a screenshot to see what's there
    await page.screenshot({ path: 'specs/004-all-examples-housed/verification/playground-loaded.png', fullPage: true });
    console.log('Screenshot saved: playground-loaded.png');
    
    // Get all select elements
    const selects = await page.locator('select').all();
    console.log(`\nFound ${selects.length} select elements`);
    
    for (let i = 0; i < selects.length; i++) {
      const id = await selects[i].getAttribute('id');
      const name = await selects[i].getAttribute('name');
      console.log(`  Select ${i}: id="${id}", name="${name}"`);
    }
    
    // Get page title
    const title = await page.title();
    console.log(`\nPage title: ${title}`);
    
    // Get all buttons
    const buttons = await page.locator('button').all();
    console.log(`\nFound ${buttons.length} buttons`);
    for (let i = 0; i < Math.min(buttons.length, 5); i++) {
      const text = await buttons[i].textContent();
      console.log(`  Button ${i}: "${text}"`);
    }
    
    console.log('\nKeeping browser open for 10 seconds for manual inspection...');
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

inspectPlayground();
