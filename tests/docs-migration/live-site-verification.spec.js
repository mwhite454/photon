import { test, expect } from '@playwright/test';

/**
 * Live Site Verification Tests
 *
 * Purpose: Verify that the live GitHub Pages site loads correctly and displays
 * the expected content and modern theme as specified in the requirements.
 *
 * Tests the live site at: https://mwhite454.github.io/photon/
 *
 * Contract: FR-005, FR-008 - Automated verification of published site
 */

test.describe('Live Site Verification - GitHub Pages', () => {

  test('homepage loads successfully', async ({ page }) => {
    // Navigate to the live GitHub Pages site
    await page.goto('https://mwhite454.github.io/photon/');

    // Verify the page loads without errors
    await expect(page).toHaveURL('https://mwhite454.github.io/photon/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('page title shows "Photon" in header', async ({ page }) => {
    await page.goto('https://mwhite454.github.io/photon/');

    // Check for "Photon" in the page title (browser tab title)
    await expect(page).toHaveTitle(/Photon/);

    // Also check for "Photon" in the main site header
    const headerTitle = page.locator('h1').first();
    await expect(headerTitle).toContainText('Photon');
  });

  test('Getting Started link in top navigation', async ({ page }) => {
    await page.goto('https://mwhite454.github.io/photon/');

    // Look for "Getting Started" in navigation menu
    // This could be in nav, header nav, or sidebar navigation
    const gettingStartedLink = page.locator('nav a, .nav a, .sidebar a').filter({ hasText: 'Getting Started' });
    await expect(gettingStartedLink).toBeVisible();
  });

  test('search input is visible', async ({ page }) => {
    await page.goto('https://mwhite454.github.io/photon/');

    // Look for search input field
    // MkDocs typically has search in the header or sidebar
    const searchInput = page.locator('input[type="search"], .search input, input[placeholder*="search" i]');
    await expect(searchInput).toBeVisible();
  });

  test('repository link shows "mwhite454/photon"', async ({ page }) => {
    await page.goto('https://mwhite454.github.io/photon/');

    // Look for repository link - could be in footer, header, or sidebar
    // Check for various possible formats of the repo link
    const repoLink = page.locator('a[href*="github.com/mwhite454/photon"], a[href*="mwhite454/photon"]').first();
    await expect(repoLink).toBeVisible();

    // Verify the link text or href contains the repo reference
    const linkText = await repoLink.textContent();
    const linkHref = await repoLink.getAttribute('href');

    expect(linkText?.includes('mwhite454/photon') || linkHref?.includes('mwhite454/photon')).toBeTruthy();
  });

  test('modern theme visual markers are present', async ({ page }) => {
    await page.goto('https://mwhite454.github.io/photon/');

    // Check for modern shadcn theme indicators
    // Look for theme-specific CSS classes or structure
    const html = page.locator('html');
    const body = page.locator('body');

    // Verify the page has styling (not completely unstyled)
    const hasClasses = await html.evaluate(el => el.className.length > 0);
    expect(hasClasses).toBeTruthy();

    // Check that body is visible and has content
    await expect(body).toBeVisible();

    // Verify there's a main content area (typical MkDocs structure)
    const mainContent = page.locator('main, .main, article, .content').first();
    await expect(mainContent).toBeVisible();
  });

  test('no console errors on live site', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('https://mwhite454.github.io/photon/');
    await page.waitForLoadState('networkidle');

    // Allow some time for any async errors to appear
    await page.waitForTimeout(2000);

    expect(errors).toHaveLength(0);
  });
});
