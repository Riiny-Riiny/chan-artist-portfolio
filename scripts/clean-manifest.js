#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧽 Cleaning manifest - removing entries for non-existent files...\n');

// Read the manifest
const manifestPath = 'public/images/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log(`📊 Current manifest: ${manifest.length} entries`);

// Check which entries have missing files
const validEntries = [];
const invalidEntries = [];

manifest.forEach(item => {
  const filePath = 'public' + item.src;
  if (fs.existsSync(filePath)) {
    validEntries.push(item);
  } else {
    invalidEntries.push(item);
  }
});

console.log(`✅ Valid entries: ${validEntries.length}`);
console.log(`❌ Invalid entries: ${invalidEntries.length}`);

if (invalidEntries.length > 0) {
  console.log('\n🚨 Removing these invalid entries:');
  invalidEntries.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item.id}: ${item.src} (${item.category})`);
  });

  // Create backup
  const backupPath = `public/images/manifest-backup-${Date.now()}.json`;
  fs.writeFileSync(backupPath, JSON.stringify(manifest, null, 2));
  console.log(`\n💾 Backup created: ${backupPath}`);

  // Save cleaned manifest
  fs.writeFileSync(manifestPath, JSON.stringify(validEntries, null, 2));
  console.log(`\n✅ Cleaned manifest saved: ${manifest.length} → ${validEntries.length} entries`);
} else {
  console.log('\n🎉 Manifest is already clean - no invalid entries found!');
}

console.log('\n📋 Final summary by category:');
const byCategory = {};
validEntries.forEach(item => {
  if (!byCategory[item.category]) byCategory[item.category] = 0;
  byCategory[item.category]++;
});

Object.keys(byCategory).forEach(category => {
  console.log(`  ${category}: ${byCategory[category]} images`);
});

console.log(`\n🎯 Total valid images: ${validEntries.length}`);
