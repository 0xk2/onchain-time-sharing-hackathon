import type { Metadata } from 'next';
import { GeistMono, GeistSans } from 'geist/font';
import './globals.css';

const metadataBase = new URL(
  process.env.SITE_URL || process.env.URL || 'http://localhost:3000',
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'Onchain Time Builder Sprint',
    template: '%s · Onchain Time Builder Sprint',
  },
  description:
    'A two-week online learning program and focused Da Nang build weekend for teams creating the next generation of onchain time products.',
  openGraph: {
    title: 'Onchain Time Builder Sprint',
    description:
      'Learn online. Build together. Iterate toward Colosseum.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Onchain Time Builder Sprint — Da Nang, 18–20 September 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onchain Time Builder Sprint',
    description:
      'Learn online. Build together. Iterate toward Colosseum.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
