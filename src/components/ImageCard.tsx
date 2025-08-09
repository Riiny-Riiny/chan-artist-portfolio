'use client';

import React from 'react';
import Image from 'next/image';
import type { ImageItem } from '@/types';

interface ImageCardProps {
  image: ImageItem;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className="group relative aspect-square overflow-hidden bg-white/5">
      <button
        onClick={onClick}
        className="w-full h-full focus-ring"
        aria-label={`View ${image.alt}`}
      >
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
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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