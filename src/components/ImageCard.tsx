'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { ImageItem } from '@/types';

interface ImageCardProps {
  image: ImageItem;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    console.error('Failed to load image:', image.src);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  return (
    <div className="group relative aspect-square overflow-hidden bg-white/5">
      <button
        onClick={onClick}
        className="w-full h-full focus-ring"
        aria-label={`View ${image.alt}`}
      >
        {/* Show loading state */}
        {imageLoading && !imageError && (
          <div className="w-full h-full flex items-center justify-center text-white/40 animate-pulse">
            <p className="text-sm">Loading...</p>
          </div>
        )}

        {/* Show error state */}
        {imageError && (
          <div className="w-full h-full flex items-center justify-center text-red-400 bg-red-900/20">
            <div className="text-center">
              <p className="text-sm">Image failed to load</p>
              <p className="text-xs text-white/60 mt-1">{image.src}</p>
            </div>
          </div>
        )}

        {/* Placeholder for when image is not available */}
        {image.src.includes('placeholder') ? (
          <div className="w-full h-full flex items-center justify-center text-white/40">
            <p className="text-sm">[placeholder image]</p>
          </div>
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            unoptimized={true} // Disable optimization to fix blank boxes
          />
        )}
        
        {/* Overlay with info */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-sm">
              {image.year && <span className="block">{image.year}</span>}
              {image.medium && <span className="block text-white/70">{image.medium}</span>}
              {image.location && <span className="block text-white/70">{image.location}</span>}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ImageCard;