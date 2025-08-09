import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Thesis',
  description: 'Senior thesis work by Chan Riiny, exploring artistic process and conceptual development.',
  openGraph: {
    title: 'Thesis | Chan Riiny',
    description: 'Senior thesis work by Chan Riiny, exploring artistic process and conceptual development.',
  },
};

export default function ThesisPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium">
            Thesis
          </h1>
        </div>
        
        {/* Hero Image */}
        <div className="mb-16">
          <div className="relative aspect-[9/19] md:aspect-[3/7] bg-white/5 overflow-hidden">
            <Image
              src="/images/thesis/IMG_4688.jpg"
              alt="Thesis work by Chan Riiny"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>
        
        {/* Thesis Essay */}
        <div className="max-w-4xl">
          <Prose>
            <p>
              For my senior thesis, I created a large painting that tells the story of South Sudan. The central
              image is of a young girl, symbolizing the beauty of my country's culture, but also the hardships
              many people, especially women, face. The girl in the painting is a symbol of both the richness
              and the struggles that come with South Sudan's traditions.
            </p>
            
            <p>
              In South Sudan, one of the biggest challenges for women is the tradition of early arranged
              marriages. Many girls are married off at a young age, sometimes to men who are much older.
              The bride price, which is often paid in cattle, can be very high, sometimes as many as 400 cows.
              This practice reduces girls to being seen as property to bring wealth to their families, rather than
              individuals with their own potential. The girl in my painting represents this struggle, as her
              future is limited by these traditions. Around the girl, I've included images of traditional villages,
              as well as modern cities, to show the contrast in how people live across the country.
            </p>
            
            <p>
              At the bottom of the painting, I've painted symbols of South Sudan's natural resources, like gold, oil,
              and diamonds. These resources could help the country grow, but they are often misused through
              corruption and illegal activities, which hurt local people and prevent the country from
              progressing. I've also painted Dr. John Garang de Mabior, who played a key role in South
              Sudan's fight for independence. His leadership helped bring about the country's freedom from
              Sudan, but he tragically died in a plane crash in 2005.
            </p>
            
            <p>
              On the left side of the painting, I've included the current president and vice president, showing the present leadership. To symbolize
              the ongoing conflict, I've added South Sudanese soldiers, while also depicting the presence of
              United Nations peacekeepers, showing the role of the international community in trying to bring
              peace to the country. Lastly, I included images of South Sudan's wildlife and nature, which are a
              reminder of the country's beauty and the hope for a better future. The wild animals and natural
              landscape represent the potential South Sudan has, if it can find peace and stability.
            </p>
            
            <p>
              Through this painting, I want to show that while South Sudan is rich in culture, beauty, and natural resources,
              it also faces significant challenges. These challenges, such as the treatment of women and the
              effects of corruption, continue to hinder progress. However, there is hope — the resilience of the
              people and the country's natural beauty offer the possibility of a brighter future.
            </p>
          </Prose>
        </div>
        
        {/* Detail Shots */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-medium mb-8">Detail Shots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="aspect-square overflow-hidden">
              <Image
                src="/images/thesis/thesis-detail-1.jpg"
                alt="Thesis detail shot 1"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <Image
                src="/images/thesis/thesis-detail-2.jpg"
                alt="Thesis detail shot 2"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <Image
                src="/images/thesis/thesis-detail-3.jpg"
                alt="Thesis detail shot 3"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 