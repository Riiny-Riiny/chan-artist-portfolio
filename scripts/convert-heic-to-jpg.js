#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Converting all HEIC files to JPG format...\n');

// Function to find all HEIC files
function findHeicFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.next')) {
      findHeicFiles(fullPath, results);
    } else if (/\.(heic|HEIC)$/i.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Find all HEIC files
const heicFiles = findHeicFiles('.');
console.log(`📊 Found ${heicFiles.length} HEIC files:`);

if (heicFiles.length === 0) {
  console.log('🎉 No HEIC files found to convert!');
  process.exit(0);
}

heicFiles.forEach((file, index) => {
  console.log(`  ${index + 1}. ${file}`);
});

console.log('\n🔧 Converting files...');

let converted = 0;
let errors = 0;
const conversions = [];

for (const heicFile of heicFiles) {
  const jpgFile = heicFile.replace(/\.(heic|HEIC)$/i, '.jpg');
  const fileName = path.basename(heicFile);
  
  try {
    console.log(`  🔄 Converting: ${fileName}`);
    
    // Try using sips first (macOS built-in, faster)
    try {
      execSync(`sips -s format jpeg "${heicFile}" --out "${jpgFile}"`, { stdio: 'pipe' });
      console.log(`    ✅ Converted using sips: ${path.basename(jpgFile)}`);
    } catch (sipsError) {
      // Fall back to ImageMagick
      console.log(`    ⚠️  sips failed, trying ImageMagick...`);
      execSync(`magick "${heicFile}" "${jpgFile}"`, { stdio: 'pipe' });
      console.log(`    ✅ Converted using ImageMagick: ${path.basename(jpgFile)}`);
    }
    
    // Verify the JPG was created
    if (fs.existsSync(jpgFile)) {
      // Remove the original HEIC file
      fs.unlinkSync(heicFile);
      console.log(`    🗑️  Removed original: ${fileName}`);
      
      conversions.push({
        original: heicFile,
        converted: jpgFile
      });
      converted++;
    } else {
      console.log(`    ❌ Failed to create: ${path.basename(jpgFile)}`);
      errors++;
    }
    
  } catch (error) {
    console.log(`    ❌ Error converting ${fileName}: ${error.message}`);
    errors++;
  }
}

console.log(`\n📊 Conversion Summary:`);
console.log(`  ✅ Converted: ${converted} files`);
console.log(`  ❌ Errors: ${errors} files`);

// Update manifest if any files in web-optimized were converted
const webOptimizedConversions = conversions.filter(c => c.original.includes('web-optimized'));

if (webOptimizedConversions.length > 0) {
  console.log(`\n📝 Updating manifest for ${webOptimizedConversions.length} web-optimized files...`);
  
  try {
    const manifestPath = 'public/images/manifest.json';
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    let manifestUpdated = false;
    
    webOptimizedConversions.forEach(conversion => {
      const oldPath = conversion.original.replace('public', '');
      const newPath = conversion.converted.replace('public', '');
      
      // Find and update manifest entries
      manifest.forEach(item => {
        if (item.src === oldPath) {
          item.src = newPath;
          manifestUpdated = true;
          console.log(`    📝 Updated manifest: ${oldPath} → ${newPath}`);
        }
      });
    });
    
    if (manifestUpdated) {
      // Create backup
      const backupPath = `public/images/manifest-backup-${Date.now()}.json`;
      fs.writeFileSync(backupPath, fs.readFileSync(manifestPath));
      
      // Save updated manifest
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log(`    💾 Manifest updated and backup created: ${backupPath}`);
    }
    
  } catch (error) {
    console.log(`    ❌ Error updating manifest: ${error.message}`);
  }
}

console.log('\n✅ HEIC to JPG conversion complete!');
if (converted > 0) {
  console.log('🚀 Next steps:');
  console.log('  1. Test locally: npm run dev');
  console.log('  2. Commit changes: git add . && git commit -m "Convert HEIC files to JPG"');
  console.log('  3. Push to deploy: git push origin main');
}
