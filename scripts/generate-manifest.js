#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎨 Generating comprehensive manifest for all optimized images...');

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

// Generate manifest entries for each category
Object.entries(categories).forEach(([category, config]) => {
  const files = getImageFiles(config.path);
  console.log(`📁 ${category}: ${files.length} images`);
  
  files.forEach((filename, index) => {
    const id = `${category}-${String(idCounter).padStart(3, '0')}`;
    
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
  });
});

// Write the manifest file
const manifestPath = 'public/images/manifest.json';
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`✅ Generated manifest with ${manifest.length} images`);
console.log(`📝 Saved to: ${manifestPath}`);

// Summary by category
console.log('\n📊 Manifest Summary:');
Object.keys(categories).forEach(category => {
  const count = manifest.filter(item => item.category === category).length;
  console.log(`  ${category}: ${count} images`);
});

console.log(`\n🎯 Total images in manifest: ${manifest.length}`);
