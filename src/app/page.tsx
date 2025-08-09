import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chan Riiny - Artist Portfolio',
  description: 'South Sudanese mural and shoe design artist. Explore the work of Chan Riiny through murals, shoe designs, and artistic process.',
  openGraph: {
    title: 'Chan Riiny - Artist Portfolio',
    description: 'South Sudanese mural and shoe design artist. Explore the work of Chan Riiny through murals, shoe designs, and artistic process.',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6">
              Chan Riiny
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
              South Sudanese Mural & Shoe Design Artist
            </p>
            
            <p className="text-lg text-white/60 mb-12 max-w-lg leading-relaxed">
              Through art, I explore the resilience of the human spirit, the beauty of survival, 
              and the complexities of identity forged in the fire of hardship.
            </p>
            
            <Link
              href="/work"
              className="btn-primary text-lg px-8 py-4"
            >
              Enter Portfolio
            </Link>
          </div>
          
          {/* Right Side - Hero Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[3/4] bg-white/5 overflow-hidden">
              <Image
                src="/images/web-optimized/murals/mural-1.jpg"
                alt="Featured artwork by Chan Riiny"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              
              {/* Subtle overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Image caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm text-white/80 font-medium">
                  Mural Work
                </p>
                <p className="text-xs text-white/60 mt-1">
                  Acrylic on wall
                </p>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Bottom navigation hint */}
        <div className="text-center mt-16 lg:mt-20">
          <p className="text-sm text-white/40 mb-4">
            Explore the work
          </p>
          <div className="flex justify-center space-x-8">
            <Link href="/work" className="text-sm text-white/60 hover:text-white transition-colors">
              Gallery
            </Link>
            <Link href="/artist-statement" className="text-sm text-white/60 hover:text-white transition-colors">
              Artist Statement
            </Link>
            <Link href="/thesis" className="text-sm text-white/60 hover:text-white transition-colors">
              Thesis
            </Link>
            <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 