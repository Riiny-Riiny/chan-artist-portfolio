#!/bin/bash

# Image optimization script for Chan Riiny portfolio
# Selects best images from each category and optimizes for web

echo "🎨 Optimizing Chan Riiny portfolio images for web deployment..."

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
    
    # Use ImageMagick to optimize
    magick "$input" \
        -resize "${max_width}x${max_width}>" \
        -quality 85 \
        -strip \
        -colorspace sRGB \
        "$output"
}

# Select and optimize key mural images (limit to best 8-10)
echo "🖼️  Processing murals..."
murals=(
    "mural-1.jpg"
    "mural-2.jpg" 
    "mural-3.jpg"
    "mural-4.jpg"
    "IMG_3486.JPG"
    "IMG_3487.JPG"
    "IMG_2092.JPG"
    "IMG_6048.jpg"
)

for mural in "${murals[@]}"; do
    if [[ -f "public/images/murals/$mural" ]]; then
        optimize_image "public/images/murals/$mural" "public/images/web-optimized/murals/$mural" 1200
    fi
done

# Select and optimize key shoe designs (limit to best 15-20)
echo "👟 Processing shoes..."
shoes=(
    "IMG_3233.jpg"
    "IMG_3832.jpg"
    "IMG_3239.jpg"
    "IMG_3240.jpg"
    "IMG_3825.jpg"
    "IMG_3826.jpg"
    "IMG_3827.jpg"
    "IMG_4340.jpg"
    "IMG_4341.jpg"
    "IMG_4346.jpg"
    "IMG_4349.jpg"
    "IMG_4350.jpg"
    "IMG_1666.jpg"
    "IMG_1667.jpg"
    "IMG_1668.jpg"
    "IMG_2147.jpg"
    "IMG_2148.jpg"
    "IMG_2149.jpg"
    "IMG_2937.jpg"
    "IMG_2938.jpg"
)

for shoe in "${shoes[@]}"; do
    if [[ -f "public/images/shoes/$shoe" ]]; then
        optimize_image "public/images/shoes/$shoe" "public/images/web-optimized/shoes/$shoe" 800
    fi
done

# Process key sketches (limit to best 5-6)
echo "✏️  Processing sketches..."
sketches=(
    "IMG_3237.jpg"
    "IMG_6050.jpg"
    "IMG_6051.jpg"
    "IMG_6052.jpg"
    "IMG_9775.jpg"
)

for sketch in "${sketches[@]}"; do
    if [[ -f "public/images/sketches/$sketch" ]]; then
        optimize_image "public/images/sketches/$sketch" "public/images/web-optimized/sketches/$sketch" 800
    fi
done

# Process thesis works
echo "🎓 Processing thesis..."
thesis=(
    "IMG_4688.jpg"
    "thesis-detail-1.jpg"
    "thesis-detail-2.jpg"
    "thesis-detail-3.jpg"
)

for work in "${thesis[@]}"; do
    if [[ -f "public/images/thesis/$work" ]]; then
        optimize_image "public/images/thesis/$work" "public/images/web-optimized/thesis/$work" 1000
    fi
done

# Process key process shots (limit to best 6-8)
echo "🔧 Processing process shots..."
process=(
    "IMG_1197.jpg"
    "IMG_1687.jpg"
    "IMG_3855.jpg"
    "IMG_6852.JPG"
    "IMG_6853.JPG"
    "IMG_6860.JPG"
    "IMG_6862.JPG"
    "IMG_6865.JPG"
)

for proc in "${process[@]}"; do
    if [[ -f "public/images/process/$proc" ]]; then
        optimize_image "public/images/process/$proc" "public/images/web-optimized/process/$proc" 800
    fi
done

echo "✅ Image optimization complete!"
echo "📊 Checking optimized folder size..."
du -sh public/images/web-optimized/
