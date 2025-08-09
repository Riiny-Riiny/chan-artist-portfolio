'use client';

import React, { useState } from 'react';
import type { ContactFormData } from '@/types';

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-medium">Send a Message</h2>
      
      {status === 'success' && (
        <div className="p-4 bg-green-900/20 border border-green-500/30 text-green-300 rounded">
          Thank you for your message. I'll get back to you soon.
        </div>
      )}
      
      {status === 'error' && (
        <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-300 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white focus:outline-none focus-ring transition-colors duration-200"
              placeholder="Your first name"
              disabled={status === 'loading'}
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white focus:outline-none focus-ring transition-colors duration-200"
              placeholder="Your last name"
              disabled={status === 'loading'}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white focus:outline-none focus-ring transition-colors duration-200"
            placeholder="your.email@example.com"
            disabled={status === 'loading'}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white focus:outline-none focus-ring transition-colors duration-200 resize-none"
            placeholder="Tell me about your project, commission request, or just say hello..."
            disabled={status === 'loading'}
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm; 