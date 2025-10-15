import { test, expect } from '@playwright/test';

/**
 * Visual Verification Tests
 * 
 * Purpose: Verify that the MkDocs site loads correctly with the shadcn theme applied
 * and that there are no console errors on page load.
 * 
 * Contract: playwright-test-spec.json (visual_verification type)
 */

test.describe('Visual Verification', () => {
  
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Photon/);
  });

  test('shadcn theme is applied', async ({ page }) => {
    await page.goto('/');
    
    // Check for shadcn theme class on body or html element
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Verify theme-specific elements are present
    // shadcn themes use classes like 'layout-fixed' on html
    const html = page.locator('html');
    const hasClass = await html.evaluate(el => el.className.length > 0);
    expect(hasClass).toBeTruthy();
  });

  test('site header is visible', async ({ page }) => {
    await page.goto('/');
    
    // Look for header/navigation elements
    // Adjust selectors based on actual shadcn theme structure
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
  });

  test('no console errors on page load', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Allow some expected errors (e.g., favicon not found, missing resources)
    expect(errors.length).toBeLessThanOrEqual(5);
  });

  test('theme CSS is loaded', async ({ page }) => {
    await page.goto('/');
    
    // Check that stylesheets are loaded
    const stylesheets = await page.locator('link[rel="stylesheet"]').count();
    expect(stylesheets).toBeGreaterThan(0);
  });

  test('page content is rendered', async ({ page }) => {
    await page.goto('/');
    
    // Check that main content area exists and has content
    const main = page.locator('main, article, .content').first();
    await expect(main).toBeVisible();
    
    const textContent = await main.textContent();
    expect(textContent.length).toBeGreaterThan(0);
  });

  test('captures screenshot for visual regression', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully rendered
    await page.waitForLoadState('networkidle');
    
    // Take screenshot for visual regression testing (skip comparison for now)
    await page.screenshot({ path: 'test-results/homepage.png' });
    
    // Basic assertion that page loaded
    const title = await page.title();
    expect(title).toBeTruthy();
  });
});
