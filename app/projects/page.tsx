import type { Metadata } from 'next';

import { PageIntro } from '@/components/page-intro';
import { ProjectsGallery } from '@/components/projects-gallery';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore public projects submitted to the Onchain Time Builder Sprint.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <PageIntro
        eyebrow="Public project gallery"
        title={<>Products in <span className="font-[family-name:var(--font-editorial)] font-normal italic text-primary">motion.</span></>}
        description="A public record of teams turning the onchain-time prompt into specific products, testing assumptions, and documenting what changed."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <ProjectsGallery />
      </section>
      <SiteFooter />
    </main>
  );
}
