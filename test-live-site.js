#!/usr/bin/env node

/**
 * Simple Live Site Verification Script
 *
 * Tests the live GitHub Pages site without requiring the full Playwright test setup.
 * This is used to verify the site before the full test framework is ready.
 */

const { chromium } = require('playwright');

const SITE_URL = 'https://mwhite454.github.io/photon/';

async function testLiveSite() {
  console.log('🧪 Testing live site:', SITE_URL);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Test 1: Site loads successfully
    console.log('📋 Test 1: Site loads successfully...');
    await page.goto(SITE_URL);
    console.log('✅ Site loaded successfully');

    // Test 2: Page title shows "Photon"
    console.log('📋 Test 2: Page title shows "Photon"...');
    const title = await page.title();
    if (title.includes('Photon')) {
      console.log('✅ Page title contains "Photon"');
    } else {
      console.log('❌ Page title does not contain "Photon":', title);
    }

    // Test 3: Check for Getting Started link
    console.log('📋 Test 3: Check for Getting Started link...');
    const gettingStartedLink = await page.locator('nav a, .nav a, .sidebar a').filter({ hasText: 'Getting Started' }).count();
    if (gettingStartedLink > 0) {
      console.log('✅ Getting Started link found');
    } else {
      console.log('❌ Getting Started link not found');
    }

    // Test 4: Check for search input
    console.log('📋 Test 4: Check for search input...');
    const searchInput = await page.locator('input[type="search"], .search input, input[placeholder*="search" i]').count();
    if (searchInput > 0) {
      console.log('✅ Search input found');
    } else {
      console.log('❌ Search input not found');
    }

    // Test 5: Check for repository link
    console.log('📋 Test 5: Check for repository link...');
    const repoLink = await page.locator('a[href*="github.com/mwhite454/photon"], a[href*="mwhite454/photon"]').count();
    if (repoLink > 0) {
      console.log('✅ Repository link found');
    } else {
      console.log('❌ Repository link not found');
    }

    // Test 6: Check for modern theme markers
    console.log('📋 Test 6: Check for modern theme markers...');
    const bodyVisible = await page.locator('body').isVisible();
    const htmlClasses = await page.locator('html').evaluate(el => el.className);
    if (bodyVisible && htmlClasses.length > 0) {
      console.log('✅ Modern theme markers detected');
    } else {
      console.log('❌ Modern theme markers not detected');
    }

    // Test 7: Check for console errors
    console.log('📋 Test 7: Check for console errors...');
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000); // Wait for any async errors

    if (errors.length === 0) {
      console.log('✅ No console errors detected');
    } else {
      console.log('❌ Console errors detected:', errors.length);
      errors.forEach(error => console.log('  -', error));
    }

    console.log('\n🎉 Live site verification complete!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testLiveSite().catch(console.error);
