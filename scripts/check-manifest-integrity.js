#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking manifest integrity...\n');

// Read the manifest
const manifestPath = 'public/images/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let missing = [];
let found = 0;

// Check each manifest entry
manifest.forEach((item, index) => {
  const filePath = 'public' + item.src;
  if (!fs.existsSync(filePath)) {
    missing.push({
      index: index,
      id: item.id,
      src: item.src,
      category: item.category
    });
  } else {
    found++;
  }
});

console.log(`✅ Found: ${found} images`);
console.log(`❌ Missing: ${missing.length} images`);

if (missing.length > 0) {
  console.log('\n🚨 Missing files by category:');
  
  // Group by category
  const byCategory = {};
  missing.forEach(m => {
    if (!byCategory[m.category]) byCategory[m.category] = [];
    byCategory[m.category].push(m);
  });
  
  Object.keys(byCategory).forEach(category => {
    console.log(`\n📁 ${category}:`);
    byCategory[category].forEach(m => {
      console.log(`  ${m.index}: ${m.id} -> ${m.src}`);
    });
  });
  
  console.log(`\n🧹 Total entries to remove: ${missing.length}`);
} else {
  console.log('\n🎉 All manifest entries have corresponding files!');
}
