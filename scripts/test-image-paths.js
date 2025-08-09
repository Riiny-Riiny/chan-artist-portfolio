#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing all image paths in manifest...');

// Read the manifest
const manifestPath = 'public/images/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log(`📋 Loaded manifest with ${manifest.length} images`);

let validCount = 0;
let invalidCount = 0;
const missingFiles = [];

manifest.forEach((item, index) => {
  const filePath = `public${item.src}`;
  const exists = fs.existsSync(filePath);
  
  if (exists) {
    validCount++;
    if (index < 5) {
      const stats = fs.statSync(filePath);
      console.log(`✅ ${item.id}: ${item.src} (${Math.round(stats.size/1024)}KB)`);
    }
  } else {
    invalidCount++;
    missingFiles.push({
      id: item.id,
      src: item.src,
      category: item.category
    });
    console.log(`❌ ${item.id}: ${item.src} - FILE NOT FOUND`);
  }
});

console.log(`\n📊 Results:`);
console.log(`✅ Valid images: ${validCount}`);
console.log(`❌ Missing images: ${invalidCount}`);

if (missingFiles.length > 0) {
  console.log(`\n❌ Missing files by category:`);
  const byCategory = {};
  missingFiles.forEach(file => {
    if (!byCategory[file.category]) byCategory[file.category] = [];
    byCategory[file.category].push(file.src);
  });
  
  Object.entries(byCategory).forEach(([category, files]) => {
    console.log(`  ${category}: ${files.length} missing`);
    files.forEach(file => console.log(`    - ${file}`));
  });
} else {
  console.log(`\n🎉 All image paths are valid!`);
}

// Test a few key images for the main pages
console.log(`\n🔑 Testing key page images:`);
const keyImages = [
  '/images/web-optimized/murals/mural-1.jpg', // Landing page
  '/images/web-optimized/thesis/IMG_4688.jpg', // Thesis page
  '/images/web-optimized/thesis/thesis-detail-1.jpg',
  '/images/web-optimized/thesis/thesis-detail-2.jpg',
  '/images/web-optimized/thesis/thesis-detail-3.jpg'
];

keyImages.forEach(imgPath => {
  const fullPath = `public${imgPath}`;
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`✅ ${imgPath} (${Math.round(stats.size/1024)}KB)`);
  } else {
    console.log(`❌ ${imgPath} - MISSING`);
  }
});
