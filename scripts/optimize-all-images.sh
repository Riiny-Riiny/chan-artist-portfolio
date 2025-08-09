#!/bin/bash

# Complete image optimization script for Chan Riiny portfolio
# Processes ALL images from each category and optimizes for web

echo "🎨 Starting complete image optimization for Chan Riiny portfolio..."

# Function to optimize and resize images
optimize_image() {
    local input="$1"
    local output="$2"
    local max_width="$3"
    
    if [[ ! -f "$input" ]]; then
        echo "⚠️  Warning: $input not found"
        return 1
    fi
    
    echo "📸 Processing: $(basename "$input")"
    
    # Create output directory if it doesn't exist
    mkdir -p "$(dirname "$output")"
    
    # Use ImageMagick to optimize
    magick "$input" \
        -resize "${max_width}x${max_width}>" \
        -quality 85 \
        -strip \
        -colorspace sRGB \
        "$output"
}

# Process ALL mural images
echo "🖼️  Processing ALL murals (24 images)..."
find public/images/murals/ -name "*.jpg" -o -name "*.JPG" -o -name "*.HEIC" | while read -r image; do
    filename=$(basename "$image")
    optimize_image "$image" "public/images/web-optimized/murals/$filename" 1200
done

# Process ALL shoe images
echo "👟 Processing ALL shoes (108 images)..."
find public/images/shoes/ -name "*.jpg" -o -name "*.JPG" -o -name "*.HEIC" | while read -r image; do
    filename=$(basename "$image")
    optimize_image "$image" "public/images/web-optimized/shoes/$filename" 800
done

# Process ALL sketches
echo "✏️  Processing ALL sketches..."
find public/images/sketches/ -name "*.jpg" -o -name "*.JPG" -o -name "*.HEIC" | while read -r image; do
    filename=$(basename "$image")
    optimize_image "$image" "public/images/web-optimized/sketches/$filename" 800
done

# Process ALL thesis works
echo "🎓 Processing ALL thesis works..."
find public/images/thesis/ -name "*.jpg" -o -name "*.JPG" -o -name "*.HEIC" | while read -r image; do
    filename=$(basename "$image")
    optimize_image "$image" "public/images/web-optimized/thesis/$filename" 1000
done

# Process ALL process shots
echo "🔧 Processing ALL process shots (13 images)..."
find public/images/process/ -name "*.jpg" -o -name "*.JPG" -o -name "*.HEIC" | while read -r image; do
    filename=$(basename "$image")
    optimize_image "$image" "public/images/web-optimized/process/$filename" 800
done

echo "✅ Complete image optimization finished!"
echo "📊 Checking optimized folder size..."
du -sh public/images/web-optimized/

echo "📋 Counting optimized images by category:"
echo "Murals: $(find public/images/web-optimized/murals/ -name "*.jpg" -o -name "*.JPG" | wc -l)"
echo "Shoes: $(find public/images/web-optimized/shoes/ -name "*.jpg" -o -name "*.JPG" | wc -l)"
echo "Sketches: $(find public/images/web-optimized/sketches/ -name "*.jpg" -o -name "*.JPG" | wc -l)"
echo "Thesis: $(find public/images/web-optimized/thesis/ -name "*.jpg" -o -name "*.JPG" | wc -l)"
echo "Process: $(find public/images/web-optimized/process/ -name "*.jpg" -o -name "*.JPG" | wc -l)"

total_optimized=$(find public/images/web-optimized/ -name "*.jpg" -o -name "*.JPG" | wc -l)
echo "🎯 Total optimized images: $total_optimized"
