#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking for orphan image files...\n');

// Read the manifest
const manifestPath = 'public/images/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Get all manifest file paths
const manifestPaths = new Set(manifest.map(item => item.src));

// Function to recursively find all image files
function findImageFiles(dir, baseDir = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(baseDir, item);
    
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...findImageFiles(fullPath, relativePath));
    } else if (/\.(jpg|jpeg|png|gif|webp|heic)$/i.test(item)) {
      files.push('/' + relativePath.replace(/\\/g, '/'));
    }
  }
  
  return files;
}

// Find all image files in the optimized directory
const imageDir = 'public/images/web-optimized';
const allImageFiles = findImageFiles(imageDir, 'images/web-optimized');

// Find orphans (files not in manifest)
const orphans = allImageFiles.filter(filePath => !manifestPaths.has(filePath));

console.log(`📊 Total image files found: ${allImageFiles.length}`);
console.log(`📋 Files in manifest: ${manifestPaths.size}`);
console.log(`🏃‍♂️ Orphan files (not in manifest): ${orphans.length}`);

if (orphans.length > 0) {
  console.log('\n🚨 Orphan files by category:');
  
  // Group by category
  const byCategory = {};
  orphans.forEach(filePath => {
    const parts = filePath.split('/');
    const category = parts[3] || 'unknown'; // /images/web-optimized/category/file.jpg
    if (!byCategory[category]) byCategory[category] = [];
    byCategory[category].push(filePath);
  });
  
  Object.keys(byCategory).forEach(category => {
    console.log(`\n📁 ${category} (${byCategory[category].length} files):`);
    byCategory[category].forEach(filePath => {
      console.log(`  ${filePath}`);
    });
  });
} else {
  console.log('\n🎉 No orphan files found!');
}
