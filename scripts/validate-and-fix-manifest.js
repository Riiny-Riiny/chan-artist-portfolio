#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating and fixing manifest based on actual files...');

// Function to get all files in a directory
function getImageFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(file => /\.(jpg|jpeg|png|JPG|JPEG|PNG|HEIC)$/i.test(file))
      .sort();
  } catch (error) {
    console.log(`Warning: ${dir} not found`);
    return [];
  }
}

// Image categories and their configurations
const categories = {
  murals: {
    path: 'public/images/web-optimized/murals',
    medium: 'Acrylic on wall',
    altPrefix: 'Mural artwork',
    featured: true
  },
  shoes: {
    path: 'public/images/web-optimized/shoes',
    medium: 'Acrylic on leather',
    altPrefix: 'Hand-painted shoe design',
    featured: true
  },
  sketches: {
    path: 'public/images/web-optimized/sketches',
    medium: 'Pencil on paper',
    altPrefix: 'Conceptual sketch',
    featured: true
  },
  thesis: {
    path: 'public/images/web-optimized/thesis',
    medium: 'Oil on canvas',
    altPrefix: 'Senior thesis artwork',
    featured: true
  },
  process: {
    path: 'public/images/web-optimized/process',
    medium: 'Process documentation',
    altPrefix: 'Behind-the-scenes creation process',
    featured: true
  }
};

const manifest = [];
let idCounter = 1;

// Generate manifest entries for each category based on actual files
Object.entries(categories).forEach(([category, config]) => {
  const files = getImageFiles(config.path);
  console.log(`📁 ${category}: ${files.length} actual files found`);
  
  files.forEach((filename, index) => {
    const id = `${category}-${String(idCounter).padStart(3, '0')}`;
    
    // Verify file actually exists
    const fullPath = path.join(config.path, filename);
    if (fs.existsSync(fullPath)) {
      manifest.push({
        id,
        src: `/images/web-optimized/${category}/${filename}`,
        alt: `${config.altPrefix} by Chan Riiny`,
        category,
        year: "2024",
        medium: config.medium,
        featured: config.featured
      });
      
      idCounter++;
    } else {
      console.log(`❌ File not found: ${fullPath}`);
    }
  });
});

// Write the manifest file
const manifestPath = 'public/images/manifest.json';
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`✅ Generated validated manifest with ${manifest.length} images`);
console.log(`📝 Saved to: ${manifestPath}`);

// Summary by category
console.log('\n📊 Final Manifest Summary:');
Object.keys(categories).forEach(category => {
  const count = manifest.filter(item => item.category === category).length;
  console.log(`  ${category}: ${count} images`);
});

console.log(`\n🎯 Total valid images in manifest: ${manifest.length}`);

// Validate all paths exist
console.log('\n🔍 Validating all manifest paths...');
let validCount = 0;
let invalidCount = 0;

manifest.forEach(item => {
  const filePath = `public${item.src}`;
  if (fs.existsSync(filePath)) {
    validCount++;
  } else {
    console.log(`❌ Missing: ${item.src}`);
    invalidCount++;
  }
});

console.log(`✅ Valid paths: ${validCount}`);
console.log(`❌ Invalid paths: ${invalidCount}`);

if (invalidCount === 0) {
  console.log('\n🎉 All manifest paths are valid!');
} else {
  console.log('\n⚠️  Some manifest paths are invalid and need fixing.');
}
