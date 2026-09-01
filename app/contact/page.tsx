import type { Metadata } from 'next';
import { Compass, ExternalLink, Settings2 } from 'lucide-react';

import { ContactForm } from '@/components/contact-form';
import { PageIntro } from '@/components/page-intro';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Meet the organizing team and contact the Onchain Time Builder Sprint.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <PageIntro
        eyebrow="Contact + organizers"
        title={<>Built locally. <span className="font-[family-name:var(--font-editorial)] font-normal italic text-primary">Connected globally.</span></>}
        description="Talk to the organizing team about participation, mentoring, community collaboration, media, or the program’s Colosseum continuation path."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Organizing team</p>
          <div className="mt-6 border-y border-border">
            <article className="grid grid-cols-[44px_1fr] gap-4 py-6">
              <span className="grid size-10 place-items-center rounded-md bg-secondary text-primary"><Compass aria-hidden="true" className="size-5" /></span>
              <div>
                <h2 className="text-xl font-medium">Hieu</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-primary">Program lead</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Program design, learning direction, ecosystem coordination, and partner relationships.</p>
              </div>
            </article>
            <article className="grid grid-cols-[44px_1fr] gap-4 border-t border-border py-6">
              <span className="grid size-10 place-items-center rounded-md bg-secondary text-primary"><Settings2 aria-hidden="true" className="size-5" /></span>
              <div>
                <h2 className="text-xl font-medium">Danh</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-primary">Operations lead</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Event readiness, suppliers, crew, venue operations, participant service, and live escalation.</p>
              </div>
            </article>
          </div>

          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Ecosystem context</p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              The program is designed as part of Superteam Vietnam’s Colosseum subtrack effort. Public wording, eligibility, and prize terms remain subject to final ecosystem confirmation.
            </p>
            <a href="https://colosseum.com/hackathon" target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-sm text-sm text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring">
              Colosseum hackathon <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 sm:p-8 lg:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Send a message</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em]">How can we help?</h2>
          <p className="mb-8 mt-3 text-sm leading-6 text-muted-foreground">Complete the form to compose an email to the organizing team in your own email app.</p>
          <ContactForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
