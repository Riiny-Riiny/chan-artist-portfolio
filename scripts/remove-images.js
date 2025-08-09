#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Image Removal Tool\n');

// Get command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage examples:');
  console.log('  node scripts/remove-images.js IMG_1234.jpg IMG_5678.jpg    # Remove specific files');
  console.log('  node scripts/remove-images.js --category shoes            # Remove entire category');
  console.log('  node scripts/remove-images.js --range shoes 50-108        # Remove range from category');
  console.log('  node scripts/remove-images.js --ids shoes-050,shoes-051   # Remove by manifest IDs');
  process.exit(1);
}

// Read the manifest
const manifestPath = 'public/images/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let toRemove = [];

if (args[0] === '--category') {
  // Remove entire category
  const category = args[1];
  toRemove = manifest.filter(item => item.category === category);
  console.log(`🗂️ Removing entire category: ${category} (${toRemove.length} images)`);
  
} else if (args[0] === '--range') {
  // Remove range from category
  const category = args[1];
  const range = args[2].split('-').map(n => parseInt(n));
  const categoryItems = manifest.filter(item => item.category === category);
  toRemove = categoryItems.slice(range[0] - 1, range[1]);
  console.log(`📊 Removing range ${range[0]}-${range[1]} from ${category} (${toRemove.length} images)`);
  
} else if (args[0] === '--ids') {
  // Remove by manifest IDs
  const ids = args[1].split(',');
  toRemove = manifest.filter(item => ids.includes(item.id));
  console.log(`🎯 Removing by IDs: ${ids.join(', ')} (${toRemove.length} images)`);
  
} else {
  // Remove specific filenames
  const filenames = args;
  toRemove = manifest.filter(item => {
    const filename = path.basename(item.src);
    return filenames.includes(filename);
  });
  console.log(`📁 Removing specific files: ${filenames.join(', ')} (${toRemove.length} images)`);
}

if (toRemove.length === 0) {
  console.log('❌ No images found to remove.');
  process.exit(1);
}

console.log('\n🚨 Images to be removed:');
toRemove.forEach((item, index) => {
  console.log(`  ${index + 1}. ${item.id}: ${path.basename(item.src)} (${item.category})`);
});

// Perform removal
console.log('\n🔥 Removing files and updating manifest...');

let removed = 0;
let errors = 0;

toRemove.forEach(item => {
  const filePath = 'public' + item.src;
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      removed++;
      console.log(`  ✅ Deleted: ${path.basename(item.src)}`);
    } else {
      console.log(`  ⚠️ File not found: ${path.basename(item.src)}`);
    }
  } catch (error) {
    console.log(`  ❌ Error removing ${path.basename(item.src)}: ${error.message}`);
    errors++;
  }
});

// Update manifest
const newManifest = manifest.filter(item => !toRemove.find(r => r.id === item.id));

// Create backup
const backupPath = `public/images/manifest-backup-${Date.now()}.json`;
fs.writeFileSync(backupPath, JSON.stringify(manifest, null, 2));

// Save new manifest
fs.writeFileSync(manifestPath, JSON.stringify(newManifest, null, 2));

console.log(`\n📊 Summary:`);
console.log(`  Files removed: ${removed}`);
console.log(`  Errors: ${errors}`);
console.log(`  Manifest entries: ${manifest.length} → ${newManifest.length}`);
console.log(`  Backup created: ${backupPath}`);
console.log('\n✅ Done! Run "npm run dev" to see changes locally.');
