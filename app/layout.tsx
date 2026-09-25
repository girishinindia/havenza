import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap',
});
const sans = Jost({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-sans', display: 'swap' });

// TODO: set to the live domain once it is connected in Vercel
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://havenza.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Havenza — Create Your Beautiful Space | Home, Hotel & Office Décor, Gifts & More',
  description:
    'Havenza crafts candles, fragrance, floral, resin art, wall art and bespoke décor for homes, hotels, restaurants, offices and events — with custom, private-label and bulk manufacturing for businesses.',
  openGraph: {
    title: 'Havenza — Create Your Beautiful Space',
    description: 'Home Décor · Hotel Décor · Office Décor · Gifts & More',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#F6ECE3', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${display.variable} ${sans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
