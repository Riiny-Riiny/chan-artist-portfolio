'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { ImageItem } from '@/types';

interface LightboxProps {
  image: ImageItem;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({
  image,
  onClose,
  onNavigate,
  hasNext,
  hasPrev,
}) => {
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (hasNext) onNavigate('next');
          break;
        case 'ArrowLeft':
          if (hasPrev) onNavigate('prev');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNavigate, hasNext, hasPrev]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200 focus-ring p-2"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Buttons */}
      {hasPrev && (
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 focus-ring p-2"
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          onClick={() => onNavigate('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 focus-ring p-2"
          aria-label="Next image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div className="relative max-w-7xl max-h-full">
        {image.src.includes('placeholder') ? (
          <div className="w-full h-96 flex items-center justify-center text-white/40">
            <p className="text-lg">[placeholder image]</p>
          </div>
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain"
            priority
          />
        )}

        {/* Image Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-medium mb-2">{image.alt}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              {image.year && <span>{image.year}</span>}
              {image.medium && <span>{image.medium}</span>}
              {image.location && <span>{image.location}</span>}
            </div>
            
            {/* Request Commission CTA */}
            <div className="mt-4">
              <a
                href="/contact"
                className="btn-primary"
              >
                Request a Commission
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox; 