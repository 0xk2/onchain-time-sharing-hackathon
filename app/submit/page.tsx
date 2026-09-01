import type { Metadata } from 'next';

import { PageIntro } from '@/components/page-intro';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SubmissionForm } from '@/components/submission-form';

export const metadata: Metadata = {
  title: 'Submit project',
  description: 'Submit your Onchain Time Builder Sprint project directly through the program website.',
};

export default function SubmitPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <PageIntro
        eyebrow="Direct website submission"
        title={<>Show the product. <span className="font-[family-name:var(--font-editorial)] font-normal italic text-primary">Show the iteration.</span></>}
        description="Submit the version your team can demonstrate now, the evidence behind it, and the decision you will test next."
        aside={<p>Sunday deadline<br /><strong className="font-mono font-medium text-foreground">20 SEP · 09:15</strong></p>}
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[280px_1fr] lg:gap-20">
        <aside className="space-y-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Before submitting</p>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
              <li><span className="mr-3 font-mono text-primary">01</span>Test the essential journey.</li>
              <li><span className="mr-3 font-mono text-primary">02</span>Prepare a public demo or repository.</li>
              <li><span className="mr-3 font-mono text-primary">03</span>Record the feedback that changed the product.</li>
              <li><span className="mr-3 font-mono text-primary">04</span>Choose whether the project may appear publicly.</li>
            </ol>
          </div>
          <div className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
            <p className="text-foreground">No account required.</p>
            <p className="mt-2">The form creates a timestamped program submission. It does not replace any separate Colosseum or subtrack eligibility requirement.</p>
          </div>
        </aside>
        <div className="rounded-lg border border-border bg-card p-5 sm:p-8 lg:p-10">
          <SubmissionForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
