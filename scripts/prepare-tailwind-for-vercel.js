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
  // Add safelist to ensure dynamic classes are not purged  safelist: [
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
    'rounded-lg',
    'rounded-md',
    'shadow-sm',
    'shadow-md',
    'shadow-lg',
    'transition-all',
    'duration-200',
    'duration-300',
    'hover:shadow-md',
    'hover:shadow-lg',
    'hover:bg-gray-50',
    'hover:bg-gray-100',
    'hover:border-gray-300',
    
    // Background gradients
    'bg-gradient-to-br',
    'bg-gradient-to-r',
    'from-white',
    'to-gray-50',
    'from-gray-50',
    'to-white',
    
    // Dashboard specific classes
    'dashboard-container',
    'dashboard-header',
    'dashboard-metric',
    'metric-icon',
    'metric-text-primary',
    'metric-text-secondary',
    'metric-text-small',
    'dashboard-card',
    'dashboard-card-highlight',
    'dashboard-card-gradient',
    'dashboard-card-colored',
    'card-header',
    'card-content',
    'card-title',
    'card-icon',
    'activity-item',
    'activity-item-highlight',
    'status-indicator',
    'dashboard-button',
    'dashboard-button-icon',
    'dashboard-tabs',
    'dashboard-tab',
    'dashboard-badge',
    'badge-primary',
    'badge-success',
    'badge-warning',
    'badge-danger',
    'progress-bar',
    'progress-bar-fill',
    
    // State variants
    'data-[state=active]:bg-white',
    'data-[state=active]:shadow-sm',
    'data-[state=active]:text-gray-900',
  ],`
);

// Write to a temporary build file
const prodConfigPath = path.join(process.cwd(), 'tailwind.config.prod.js');
fs.writeFileSync(prodConfigPath, prodConfigContent.replace('.ts', '.js'));

console.log('✅ Production Tailwind config created with safelist for Vercel deployment');
