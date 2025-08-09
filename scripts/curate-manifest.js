#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎨 Chan Riiny Portfolio - Manifest Curation Tool\n');

// Read the manifest
const manifestPath = 'public/images/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Group by category
const byCategory = {};
manifest.forEach((item, index) => {
  if (!byCategory[item.category]) byCategory[item.category] = [];
  byCategory[item.category].push({...item, originalIndex: index});
});

console.log('📊 Current manifest summary:');
Object.keys(byCategory).forEach(category => {
  console.log(`  ${category}: ${byCategory[category].length} images`);
});

console.log('\n📋 Detailed breakdown by category:\n');

Object.keys(byCategory).forEach(category => {
  console.log(`📁 ${category.toUpperCase()} (${byCategory[category].length} images):`);
  byCategory[category].forEach((item, index) => {
    const fileName = path.basename(item.src);
    const fileExists = fs.existsSync('public' + item.src) ? '✅' : '❌';
    console.log(`  ${String(index + 1).padStart(3)}: ${fileExists} ${fileName} (${item.id})`);
  });
  console.log('');
});

console.log(`\n🎯 Total images in manifest: ${manifest.length}`);
console.log('\n💡 To remove specific images, you can:');
console.log('1. Delete the actual image files from public/images/web-optimized/');
console.log('2. Run the regenerate manifest script');
console.log('3. Or manually edit the manifest.json file');

// Create a backup
const backupPath = `public/images/manifest-backup-${Date.now()}.json`;
fs.writeFileSync(backupPath, JSON.stringify(manifest, null, 2));
console.log(`\n💾 Backup created: ${backupPath}`);
