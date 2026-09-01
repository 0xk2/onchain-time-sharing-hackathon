import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const metadataBase = new URL(
  process.env.SITE_URL || 'http://localhost:3001',
);

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
