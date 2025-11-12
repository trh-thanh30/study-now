#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Get the current working directory
const cwd = process.cwd();
const rootDir = path.resolve(__dirname, '..');

// Check if we're in the root directory
const isRoot = cwd === rootDir;

if (!isRoot) {
  console.log('⏭️  Skipping Prisma generation (running from workspace)');
  process.exit(0);
}

// We're in the root, run prisma generation
const { execSync } = require('child_process');

try {
  console.log('📦 Generating Prisma Client...');
  execSync('npm run prisma:generate', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Prisma generation failed:', error.message);
  // Don't fail the install, just warn
}
