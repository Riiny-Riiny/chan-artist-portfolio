import React from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Chan Riiny - Artist Portfolio',
    template: '%s | Chan Riiny',
  },
  description: 'South Sudanese mural and shoe design artist. Explore the work of Chan Riiny through murals, shoe designs, and artistic process.',
  keywords: ['Chan Riiny', 'South Sudanese artist', 'mural artist', 'shoe design', 'contemporary art'],
  authors: [{ name: 'Chan Riiny' }],
  creator: 'Chan Riiny',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chanriiny.com',
    title: 'Chan Riiny - Artist Portfolio',
    description: 'South Sudanese mural and shoe design artist. Explore the work of Chan Riiny through murals, shoe designs, and artistic process.',
    siteName: 'Chan Riiny',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chan Riiny - Artist Portfolio',
    description: 'South Sudanese mural and shoe design artist. Explore the work of Chan Riiny through murals, shoe designs, and artistic process.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-serif">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:border focus:border-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 