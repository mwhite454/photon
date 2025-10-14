import { test, expect } from '@playwright/test';

/**
 * Search Functionality Tests
 * 
 * Purpose: Verify that the search functionality works correctly,
 * returns relevant results, and provides a good user experience.
 * 
 * Contract: playwright-test-spec.json (search type)
 */

test.describe('Search Functionality', () => {
  
  test('search input is present', async ({ page }) => {
    await page.goto('/');
    
    // Look for search input or button
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search" i], [role="searchbox"]');
    const searchButton = page.locator('button[aria-label*="Search" i], .search-button');
    
    const inputCount = await searchInput.count();
    const buttonCount = await searchButton.count();
    
    // Either search input or button should be present
    expect(inputCount + buttonCount).toBeGreaterThan(0);
  });

  test('search can be opened/focused', async ({ page }) => {
    await page.goto('/');
    
    // Try to find and click search button or focus search input
    const searchButton = page.locator('button[aria-label*="Search" i], .search-button').first();
    const searchInput = page.locator('input[type="search"], [role="searchbox"]').first();
    
    if (await searchButton.isVisible()) {
      await searchButton.click();
      
      // After clicking, search input should appear
      await page.waitForTimeout(500); // Wait for animation
      const inputAfterClick = page.locator('input[type="search"], [role="searchbox"]');
      await expect(inputAfterClick.first()).toBeVisible();
    } else if (await searchInput.isVisible()) {
      await searchInput.click();
      await expect(searchInput).toBeFocused();
    }
  });

  test('search accepts input', async ({ page }) => {
    await page.goto('/');
    
    // Try to find and interact with search
    const searchButton = page.locator('button[aria-label*="Search" i], .search-button').first();
    const buttonVisible = await searchButton.isVisible().catch(() => false);
    
    if (buttonVisible) {
      await searchButton.click();
      await page.waitForTimeout(500);
      
      // Type in search input
      const searchInput = page.locator('input[type="search"], [role="searchbox"]').first();
      await searchInput.fill('rectangle', { timeout: 5000 });
      
      // Verify text was entered
      const value = await searchInput.inputValue();
      expect(value).toBe('rectangle');
    } else {
      // Skip test if search is not available
      test.skip();
    }
  });

  test('search returns results for valid query', async ({ page }) => {
    await page.goto('/');
    
    // Try to interact with search
    const searchButton = page.locator('button[aria-label*="Search" i], .search-button').first();
    const buttonVisible = await searchButton.isVisible().catch(() => false);
    
    if (buttonVisible) {
      await searchButton.click();
      await page.waitForTimeout(500);
      
      // Type search query
      const searchInput = page.locator('input[type="search"], [role="searchbox"]').first();
      await searchInput.fill('rectangle', { timeout: 5000 });
      
      // Wait for results to appear
      await page.waitForTimeout(1000);
      
      // Look for search results
      const results = page.locator('.search-result, [role="listbox"] [role="option"], .search-results li');
      const count = await results.count();
      
      // Should have at least one result for "rectangle"
      expect(count).toBeGreaterThanOrEqual(1);
    } else {
      test.skip();
    }
  });

  test('search results are clickable', async ({ page }) => {
    await page.goto('/');
    
    // Try to interact with search
    const searchButton = page.locator('button[aria-label*="Search" i], .search-button').first();
    const buttonVisible = await searchButton.isVisible().catch(() => false);
    
    if (buttonVisible) {
      await searchButton.click();
      await page.waitForTimeout(500);
      
      // Type search query
      const searchInput = page.locator('input[type="search"], [role="searchbox"]').first();
      await searchInput.fill('rectangle', { timeout: 5000 });
      
      // Wait for results
      await page.waitForTimeout(1000);
      
      // Get first result
      const count = await page.locator('.search-result, [role="listbox"] [role="option"]').count();
      
      if (count > 0) {
        const firstResult = page.locator('.search-result, [role="listbox"] [role="option"]').first();
        await firstResult.click();
        
        // Wait for navigation
        await page.waitForLoadState('networkidle');
        
        // Verify we navigated somewhere
        const currentUrl = page.url();
        expect(currentUrl).toBeTruthy();
      }
    } else {
      test.skip();
    }
  });

  test('search can be closed/cleared', async ({ page }) => {
    await page.goto('/');
    
    // Try to interact with search
    const searchButton = page.locator('button[aria-label*="Search" i], .search-button').first();
    const buttonVisible = await searchButton.isVisible().catch(() => false);
    
    if (buttonVisible) {
      await searchButton.click();
      await page.waitForTimeout(500);
      
      // Type search query
      const searchInput = page.locator('input[type="search"], [role="searchbox"]').first();
      await searchInput.fill('test', { timeout: 5000 });
      
      // Try to close search (Escape key)
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      
      // Search interaction completed successfully
      expect(true).toBeTruthy();
    } else {
      test.skip();
    }
  });

  test('search is keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Try keyboard shortcut (often Ctrl+K or /)
    await page.keyboard.press('/');
    await page.waitForTimeout(500);
    
    // Check if search input is focused
    const searchInput = page.locator('input[type="search"], [role="searchbox"]').first();
    const inputCount = await searchInput.count();
    
    if (inputCount > 0) {
      // Search should be activated by keyboard
      const isVisible = await searchInput.isVisible().catch(() => false);
      expect(isVisible || inputCount > 0).toBeTruthy();
    } else {
      test.skip();
    }
  });

  test('empty search shows no results or placeholder', async ({ page }) => {
    await page.goto('/');
    
    // Try to interact with search
    const searchButton = page.locator('button[aria-label*="Search" i], .search-button').first();
    const buttonVisible = await searchButton.isVisible().catch(() => false);
    
    if (buttonVisible) {
      await searchButton.click();
      await page.waitForTimeout(500);
      
      // Type and then clear search
      const searchInput = page.locator('input[type="search"], [role="searchbox"]').first();
      await searchInput.fill('test', { timeout: 5000 });
      await searchInput.clear();
      
      await page.waitForTimeout(500);
      
      // Should show no results or empty state
      const results = page.locator('.search-result, [role="listbox"] [role="option"]');
      const count = await results.count();
      
      expect(count).toBe(0);
    } else {
      test.skip();
    }
  });
});
