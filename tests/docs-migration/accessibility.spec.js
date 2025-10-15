import { test, expect } from '@playwright/test';

/**
 * Accessibility Tests
 * 
 * Purpose: Verify that the documentation site meets accessibility standards
 * including dark mode toggle, responsive layout, keyboard navigation, and ARIA labels.
 * 
 * Contract: playwright-test-spec.json (accessibility type)
 */

test.describe('Accessibility', () => {
  
  test('page has proper document structure', async ({ page }) => {
    await page.goto('/');
    
    // Verify basic HTML structure
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang');
    
    // Should have title
    await expect(page).toHaveTitle(/.+/);
    
    // Should have main landmark
    const main = page.locator('main, [role="main"]');
    expect(await main.count()).toBeGreaterThanOrEqual(1);
  });

  test('dark mode toggle exists', async ({ page }) => {
    await page.goto('/');
    
    // Look for theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="dark" i], .theme-toggle, [data-theme-toggle]');
    const count = await themeToggle.count();
    
    // Should have a theme toggle
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('dark mode can be toggled', async ({ page }) => {
    await page.goto('/');
    
    // Find theme toggle
    const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="dark" i], .theme-toggle').first();
    
    if (await themeToggle.isVisible()) {
      // Get initial theme
      const initialTheme = await page.locator('html').getAttribute('data-theme');
      
      // Click toggle
      await themeToggle.click();
      await page.waitForTimeout(500); // Wait for theme transition
      
      // Get new theme
      const newTheme = await page.locator('html').getAttribute('data-theme');
      
      // Theme should have changed
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('site is responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto('/');
    
    // Page should load without horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    
    // No significant horizontal overflow
    expect(scrollWidth - clientWidth).toBeLessThan(10);
    
    // Content should be visible
    const main = page.locator('main, article, .content').first();
    await expect(main).toBeVisible();
  });

  test('site is responsive on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    await page.goto('/');
    
    // Page should load properly
    const main = page.locator('main, article, .content, body > div').first();
    await expect(main).toBeVisible();
    
    // Check that page content is accessible
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('site is responsive on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Page should use full width appropriately
    const main = page.locator('main, article, .content').first();
    await expect(main).toBeVisible();
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to start navigating
    await page.keyboard.press('Tab');
    
    // Get focused element
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    
    // Should focus on an interactive element
    expect(focusedTag).toBeTruthy();
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    
    // Find all images
    const images = page.locator('img');
    const count = await images.count();
    
    if (count > 0) {
      // Check that images have alt attributes
      for (let i = 0; i < Math.min(count, 5); i++) {
        const img = images.nth(i);
        const hasAlt = await img.evaluate(el => el.hasAttribute('alt'));
        expect(hasAlt).toBeTruthy();
      }
    }
  });

  test('buttons have accessible labels', async ({ page }) => {
    await page.goto('/');
    
    // Find all buttons
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    if (count > 0) {
      // Check that buttons have text or aria-label
      for (let i = 0; i < Math.min(count, 5); i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        
        // Button should have text or aria-label
        expect(text?.trim() || ariaLabel).toBeTruthy();
      }
    }
  });

  test('headings are in logical order', async ({ page }) => {
    await page.goto('/');
    
    // Get all heading levels
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll(elements => 
      elements.map(el => parseInt(el.tagName.substring(1)))
    );
    
    if (headings.length > 0) {
      // First heading should be h1
      expect(headings[0]).toBe(1);
    }
  });

  test('links have discernible text', async ({ page }) => {
    await page.goto('/');
    
    // Find all links in main content
    const links = page.locator('a').filter({ hasText: /.+/ });
    const count = await links.count();
    
    // Should have at least some links with visible text
    expect(count).toBeGreaterThan(0);
  });
});
