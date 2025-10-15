#!/usr/bin/env node

/**
 * Global teardown for Playwright tests
 * This runs after all test suites complete
 */

const fs = require('fs');
const path = require('path');

module.exports = async (config) => {
  console.log('🧹 Starting Playwright global teardown...');

  try {
    // Clean up any temporary files or directories created during tests
    const testResultsPath = path.join(process.cwd(), 'test-results');
    if (fs.existsSync(testResultsPath)) {
      console.log('🗑️  Cleaning up test results...');
      fs.rmSync(testResultsPath, { recursive: true, force: true });
    }

    // Clean up Playwright report files if they exist
    const playwrightReportPath = path.join(process.cwd(), 'playwright-report');
    if (fs.existsSync(playwrightReportPath)) {
      console.log('🗑️  Cleaning up Playwright reports...');
      fs.rmSync(playwrightReportPath, { recursive: true, force: true });
    }

    console.log('✅ Global teardown completed successfully');

  } catch (error) {
    console.error('⚠️  Teardown warning:', error.message);
    // Don't exit with error code for cleanup issues
  }
};
