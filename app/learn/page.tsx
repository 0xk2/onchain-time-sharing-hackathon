import type { Metadata } from 'next';

import { LearningDeck } from '@/components/learning-deck';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Explore the interactive learning deck for the Onchain Time Builder Sprint.',
};

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <LearningDeck />
    </main>
  );
}
