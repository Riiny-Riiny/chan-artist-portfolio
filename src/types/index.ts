export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  category: 'murals' | 'shoes' | 'sketches' | 'thesis' | 'process';
  year?: string;
  medium?: string;
  location?: string;
  featured?: boolean;
  width?: number;
  height?: number;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
} 