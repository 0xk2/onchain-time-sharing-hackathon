import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Clock3,
  Coffee,
  Laptop2,
  MapPin,
  Moon,
  ShieldCheck,
  Users,
} from 'lucide-react';

import { PageIntro } from '@/components/page-intro';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Event',
  description: 'Schedule and participant information for the 18–20 September 2026 build weekend in Da Nang.',
};

const days = [
  {
    date: 'FRI 18 SEP',
    title: 'Kickoff night',
    time: '17:30–21:00',
    note: 'Arrive with the learning material reviewed and a starting product direction.',
    sessions: [
      ['17:30', 'Registration + light dinner'],
      ['18:15', 'Welcome and program purpose'],
      ['18:35', 'Build prompt and submission briefing'],
      ['19:00', 'Team plan review + mentor office hours'],
      ['20:30', 'Starting checkpoint'],
      ['21:00', 'Close · no overnight program'],
    ],
  },
  {
    date: 'SAT 19 SEP',
    title: 'Build and iterate',
    time: '09:00–17:00',
    note: 'Protect deep work. Use mentor reviews and user evidence to decide what changes next.',
    sessions: [
      ['09:00', 'Stand-up + technical readiness'],
      ['09:20', 'Focused build block'],
      ['11:45', 'Checkpoint review'],
      ['12:00', 'Lunch'],
      ['13:00', 'Build, testing + mentor rotations'],
      ['15:15', 'Tea break'],
      ['15:35', 'Final build block'],
      ['17:00', 'Close · no Saturday dinner'],
    ],
  },
  {
    date: 'SUN 20 SEP',
    title: 'Demonstrate and continue',
    time: '08:30–11:30',
    note: 'Show a working product, capture feedback, submit on the site, and define the next Colosseum test.',
    sessions: [
      ['08:30', 'Coffee, breakfast + final fixes'],
      ['09:15', 'Website submission deadline'],
      ['09:25', 'Parallel product demos'],
      ['10:55', 'Feedback capture'],
      ['11:05', 'Colosseum continuation plan'],
      ['11:30', 'Close · no Sunday lunch'],
    ],
  },
];

const principles = [
  { icon: Laptop2, title: 'Build before you present', copy: 'The majority of venue time remains unprogrammed so teams can implement and test.' },
  { icon: Users, title: 'Feedback over judging', copy: 'Sunday demos create useful next actions. There is no local ranking or prize ceremony.' },
  { icon: Moon, title: 'No overnight pressure', copy: 'The program closes each day. Rest is part of making better product decisions.' },
  { icon: ShieldCheck, title: 'A respectful room', copy: 'Participants follow a clear code of conduct and respect consent, privacy, and project ownership.' },
];

export default function EventPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <PageIntro
        eyebrow="Build weekend · Da Nang"
        title={<>One night. Two days. <span className="font-[family-name:var(--font-editorial)] font-normal italic text-primary">Three iterations.</span></>}
        description="The in-person program accelerates work already started online. Come prepared to build, test, revise, and leave with a credible continuation plan."
        aside={
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-foreground"><Clock3 aria-hidden="true" className="size-4 text-primary" /> 18–20 September 2026</p>
            <p className="flex items-center gap-2"><MapPin aria-hidden="true" className="size-4 text-primary" /> Da Nang · venue to be announced</p>
            <p className="flex items-center gap-2"><Users aria-hidden="true" className="size-4 text-primary" /> Up to 70 selected builders</p>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
          {days.map((day) => (
            <article key={day.date} className="bg-card p-5 sm:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-xs text-primary">{day.date}</p>
                <p className="font-mono text-xs text-muted-foreground">{day.time}</p>
              </div>
              <h2 className="mt-5 text-3xl font-medium tracking-[-0.04em]">{day.title}</h2>
              <p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{day.note}</p>
              <div className="mt-7 border-t border-border">
                {day.sessions.map(([time, session]) => (
                  <div key={`${day.date}-${time}`} className="grid grid-cols-[52px_1fr] gap-3 border-b border-border py-3 text-sm">
                    <span className="font-mono text-xs text-primary">{time}</span>
                    <span>{session}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/70">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">What the format protects</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Enough structure to move. Enough room to build.</h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="border-t border-border pt-5">
                <Icon aria-hidden="true" className="size-5 text-primary" />
                <h3 className="mt-8 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Before Friday</p>
          <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em]">Arrive ready to make decisions.</h2>
          <ul className="mt-8 space-y-4 text-sm leading-6 text-muted-foreground">
            <li className="border-l border-primary pl-4">Complete the interactive learning deck.</li>
            <li className="border-l border-primary pl-4">Bring a laptop, charger, and any development credentials you need.</li>
            <li className="border-l border-primary pl-4">Identify a target user and the smallest journey your team can demonstrate.</li>
            <li className="border-l border-primary pl-4">Prepare demo and repository links for the final website submission.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <Coffee aria-hidden="true" className="size-5 text-[var(--chart-2)]" />
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--chart-2)]">Participant essentials</p>
          </div>
          <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">Catering and operations are covered.</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Friday light dinner, Saturday lunch and tea, Sunday light breakfast, water, and continuous coffee are planned. Dietary and accessibility needs will be collected with participant confirmation.
          </p>
          <p className="mt-6 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
            Venue access details, arrival instructions, and the event contact will be published once confirmed.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] opacity-70">Start online</p>
            <p className="mt-2 text-2xl font-medium tracking-[-0.03em]">Review the prompt before the room opens.</p>
          </div>
          <Link href="/learn" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-background px-5 text-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
            Open learning deck <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
