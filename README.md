# Chan Riiny - Artist Portfolio

A production-ready artist portfolio for Chan Riiny, South Sudanese mural and shoe design artist. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Elegant Gallery Design**: Black background with white serif typography
- **Responsive Image Gallery**: Masonry layout with lightbox functionality
- **Artist Statement Page**: Long-form typography for artist statement
- **Thesis Page**: Hero image with full essay text and detail shots
- **Contact Form**: Accessible form with validation and API integration
- **SEO Optimized**: Metadata, sitemap, and structured data
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **Performance**: Optimized images and lazy loading

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Playfair Display (serif), Inter (sans-serif)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chan-riiny-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

### Adding Images

1. **Organize Images**: Place images in the appropriate folders under `/public/images/`:
   - `/public/images/murals/` - Mural artwork
   - `/public/images/shoes/` - Shoe designs
   - `/public/images/sketches/` - Sketch work
   - `/public/images/thesis/` - Thesis work
   - `/public/images/process/` - Process shots

2. **Update Manifest**: Edit `/content/images/manifest.json` to add image entries:
```json
{
  "id": "unique-image-id",
  "src": "/images/murals/your-image.jpg",
  "alt": "Descriptive alt text for accessibility",
  "category": "murals",
  "year": "2024",
  "medium": "Acrylic on canvas",
  "location": "Location name",
  "featured": true
}
```

3. **Image Requirements**:
   - Use high-quality images (minimum 1200px width)
   - Optimize for web (JPEG for photos, PNG for graphics)
   - Include meaningful alt text for accessibility
   - Maintain consistent aspect ratios when possible

### Adding Content

1. **Artist Statement**: Replace placeholder text in `/src/app/artist-statement/page.tsx`
2. **Thesis Essay**: Replace placeholder text in `/src/app/thesis/page.tsx`
3. **Contact Info**: Update email and social links in `/src/app/contact/page.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push to main branch

### Environment Variables

Create a `.env.local` file for local development:
```env
# Add any environment variables here
```

For production, add environment variables in your hosting platform.

## Contact Form Setup

The contact form is currently stubbed but production-ready. To enable email forwarding:

### Option 1: SendGrid (Recommended)

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Add environment variable:
```env
SENDGRID_API_KEY=your_api_key
```

3. Update `/src/app/api/contact/route.ts`:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// In the POST handler:
await sgMail.send({
  to: 'hello@chanriiny.com',
  from: 'noreply@chanriiny.com',
  subject: 'New Contact Form Submission',
  text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
});
```

### Option 2: Resend

1. Install Resend:
```bash
npm install resend
```

2. Add environment variable:
```env
RESEND_API_KEY=your_api_key
```

3. Update the API route similarly to SendGrid example.

## Customization

### Changing Fonts

1. Update font imports in `/src/app/globals.css`
2. Modify font variables in `/tailwind.config.js`
3. Update font classes in components

### Color Scheme

Modify colors in `/tailwind.config.js`:
```javascript
colors: {
  background: '#000000',
  foreground: '#ffffff',
  muted: '#666666',
}
```

### Layout Adjustments

- **Grid Layout**: Modify `.gallery-grid` class in `/src/app/globals.css`
- **Spacing**: Adjust padding/margin in component files
- **Typography**: Update prose classes in `/src/components/Prose.tsx`

## Performance Optimization

### Image Optimization

- Use Next.js Image component for automatic optimization
- Provide appropriate `sizes` attribute for responsive images
- Use `placeholder="blur"` for better loading experience

### Bundle Optimization

- Components are code-split automatically
- Images are optimized and served in modern formats
- Fonts are preloaded and optimized

## Accessibility

The site is built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support for lightbox and forms
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Visible focus indicators and proper tab order

## SEO

The site includes:

- **Metadata**: Dynamic metadata for each page
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Proper crawling instructions
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for artist information

## Lighthouse Targets

- **Performance**: ≥ 90
- **Accessibility**: ≥ 100
- **Best Practices**: ≥ 95
- **SEO**: ≥ 95

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

### Code Quality

- ESLint configured for Next.js and TypeScript
- Prettier for consistent code formatting
- TypeScript for type safety

## Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths in manifest.json
2. **Contact form not working**: Verify API route is properly configured
3. **Build errors**: Ensure all dependencies are installed
4. **Font not loading**: Check font imports in globals.css

### Performance Issues

1. **Large bundle size**: Check for unused dependencies
2. **Slow image loading**: Optimize image sizes and formats
3. **Font loading**: Ensure fonts are properly preloaded

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review Next.js and Tailwind CSS documentation
3. Open an issue in the repository

## License

This project is for Chan Riiny's portfolio use only. 