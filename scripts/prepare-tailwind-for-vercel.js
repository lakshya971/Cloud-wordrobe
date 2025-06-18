#!/usr/bin/env node

/**
 * This script is used to ensure Tailwind CSS purging works correctly 
 * in production builds with dynamic content.
 */
const fs = require('fs');
const path = require('path');

// Original Tailwind config
const configPath = path.join(process.cwd(), 'tailwind.config.ts');
const configContent = fs.readFileSync(configPath, 'utf8');

// Create a production-specific config by injecting safelist
const prodConfigContent = configContent.replace(
  'const config: Config = {',
  `const config: Config = {
  // Add safelist to ensure dynamic classes are not purged
  safelist: [
    // Common color variants
    'bg-white',
    'text-gray-500',
    'text-gray-600',
    'text-gray-700',
    'text-gray-800',
    'text-gray-900',
    'border-gray-200',
    'border-gray-300',
    'bg-gray-100',
    'bg-gray-50',
    
    // Dashboard specific classes
    'dashboard-container',
    'dashboard-header',
    'dashboard-metric',
    'metric-icon',
    'metric-text-primary',
    'metric-text-secondary',
    'metric-text-small',
    'dashboard-card',
    'card-header',
    'card-title',
    'card-icon',
    'activity-item',
    'status-indicator',
    'dashboard-button',
    'dashboard-button-icon',
    'dashboard-tabs',
    'dashboard-tab',
  ],`
);

// Write to a temporary build file
const prodConfigPath = path.join(process.cwd(), 'tailwind.config.prod.js');
fs.writeFileSync(prodConfigPath, prodConfigContent.replace('.ts', '.js'));

console.log('✅ Production Tailwind config created with safelist for Vercel deployment');
