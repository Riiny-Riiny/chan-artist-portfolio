import React from 'react';
import type { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore the work of Chan Riiny through murals, shoe designs, and artistic process.',
  openGraph: {
    title: 'Work | Chan Riiny',
    description: 'Explore the work of Chan Riiny through murals, shoe designs, and artistic process.',
  },
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium">
            Work
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl">
            A collection of murals, shoe designs, and artistic process from South Sudanese artist Chan Riiny.
          </p>
        </div>
        
        <GalleryGrid />
      </div>
    </div>
  );
} 