import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Chan Riiny for commissions, collaborations, or inquiries.',
  openGraph: {
    title: 'Contact | Chan Riiny',
    description: 'Get in touch with Chan Riiny for commissions, collaborations, or inquiries.',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium">
            Contact
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Copy & Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-medium mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Interested in commissioning a mural, collaborating on a shoe design, or just want to say hello? 
                I'd love to hear from you.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <a 
                  href="mailto:chanmadisto@gmail.com" 
                  className="text-white/70 hover:text-white transition-colors duration-200 focus-ring"
                >
                  chanmadisto@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Follow</h3>
                <a 
                  href="https://www.instagram.com/customsbychan?igsh=azU5eHhrdnh2bXRy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200 focus-ring"
                >
                  @customsbychan on Instagram
                </a>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/50">
                I typically respond to inquiries within 24-48 hours.
              </p>
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
} 