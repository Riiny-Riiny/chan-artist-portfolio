'use client';

import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import Lightbox from './Lightbox';
import type { ImageItem } from '@/types';

const GalleryGrid = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/images/manifest-web.json');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error loading images:', error);
        // Fallback to placeholder data
        setImages([
          {
            id: 'placeholder-1',
            src: '/images/placeholder.jpg',
            alt: '[placeholder alt pending]',
            category: 'murals',
            year: '[placeholder]',
            medium: '[placeholder]',
            featured: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="gallery-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="gallery-grid">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {isLightboxOpen && selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={handleCloseLightbox}
          onNavigate={(direction) => {
            const currentIndex = images.findIndex(img => img.id === selectedImage.id);
            let newIndex;
            
            if (direction === 'next') {
              newIndex = (currentIndex + 1) % images.length;
            } else {
              newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
            }
            
            setSelectedImage(images[newIndex]);
          }}
          hasNext={images.length > 1}
          hasPrev={images.length > 1}
        />
      )}
    </>
  );
};

export default GalleryGrid; 