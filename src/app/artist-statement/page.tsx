import React from 'react';
import type { Metadata } from 'next';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Artist Statement',
  description: 'Artist statement by Chan Riiny, South Sudanese mural and show design artist.',
  openGraph: {
    title: 'Artist Statement | Chan Riiny',
    description: 'Artist statement by Chan Riiny, South Sudanese mural and show design artist.',
  },
};

export default function ArtistStatementPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium">
            Artist Statement
          </h1>
        </div>
        
        <Prose>
          <p>
            I am Chan Riiny, born in South Sudan, a land scarred by the ravages of war, where the chaos of
            conflict often leaves little room for dreams, let alone art. Growing up, I had few examples of
            what it meant to be an artist. The only artists I knew were my mother, my cousin, and my
            brother, whose hands crafted beauty out of the simplest materials, finding ways to bring color
            and form to a world that seemed devoid of it.
          </p>
          
          <p>
            My mother's art was born from necessity—a skill passed down from generations, a form of expression that existed in the small acts of daily
            survival. My mothers art that she created was used to our advantage: she made things so we
            could have extra money on the side for bills. For instance, she made blankets with beautiful and
            creative designs that are hand sewn. My cousin, with his sketches and drawings, showed me that
            even in the midst of hardship, there was room for creation. My cousin sketched a lot of nature,
            animals, and even women in our tribe in a traditional wear. I watched them, not knowing then
            that I, too, would one day carry that torch.
          </p>
          
          <p>
            In a country where war has taken more than it has given, art became a way for me to reclaim something personal, something that the conflict could
            not take away from me. Through my work, I explore the resilience of the human spirit, the
            beauty of survival, and the complexities of identity forged in the fire of hardship. My art is a
            conversation with my past, a way to give voice to the silenced stories of my people, to honor the
            traditions that have sustained us through generations, and to create new narratives for a future
            that is yet unwritten.
          </p>
          
          <p>
            Art has always been my form of resistance, my way of asserting my
            humanity in a place where it was often questioned; how can an individual who is an artist have a
            successful life. But I am changing the way art is seen. For example, my art work is a language I
            use to speak when words fail, a medium to express pain, joy, and hope in ways that cannot be
            silenced. My work is not just a reflection of who I am, but a testament to where I come from—a
            story of survival, of struggle, and of dreams that refuse to die.
          </p>
          
          <p>
            In other words I would consider myself to more of a public artist I would not have just one type of audience since my artwork can
            speak many different languages and gives off different meanings. My goal as an artist is to get
            my artwork more out in the world. I would like to making a living selling my artwork.
          </p>
        </Prose>
      </div>
    </div>
  );
} 