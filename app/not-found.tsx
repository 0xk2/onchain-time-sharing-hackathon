import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { SiteHeader } from '@/components/site-header';

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-5 py-16 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">404 · Page not found</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-7xl">
          This path is not part of
          <span className="block font-[family-name:var(--font-editorial)] font-normal italic text-primary">the current build.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Return to the program homepage or open the learning deck.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring">
            <ArrowLeft aria-hidden="true" className="size-4" /> Return home
          </Link>
          <Link href="/learn" className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm focus-visible:ring-2 focus-visible:ring-ring">Open learning deck</Link>
        </div>
      </section>
    </main>
  );
}
