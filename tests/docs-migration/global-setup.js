#!/usr/bin/env node

/**
 * Global setup for Playwright tests
 * This runs before all test suites
 */

const { execSync } = require('child_process');
const path = require('path');

module.exports = async (config) => {
  console.log('🚀 Starting Playwright global setup...');

  try {
    // Verify MkDocs is available
    console.log('📋 Checking MkDocs installation...');
    execSync('mkdocs --version', { stdio: 'pipe' });

    // Verify we're in the right directory
    const docsNewPath = path.join(process.cwd(), 'docs-new');
    process.chdir(docsNewPath);

    // Build the MkDocs site for testing
    console.log('🔨 Building MkDocs site for testing...');
    execSync('mkdocs build', { stdio: 'inherit' });

    console.log('✅ MkDocs site built successfully');
    console.log('🎭 Playwright tests ready to run');

  } catch (error) {
    console.error('❌ Global setup failed:', error.message);
    process.exit(1);
  }
};
