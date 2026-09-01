import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Play,
  Sparkles,
} from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const facts = [
  ['04 SEP', 'Learning opens'],
  ['18–20 SEP', 'Da Nang build weekend'],
  ['70', 'Selected builders'],
  ['11–12', 'Product teams'],
];

const program = [
  {
    number: '01',
    title: 'Learn online',
    copy: 'Explore the original time.fun thesis, the product gaps it exposed, Solana fundamentals, and practical resources from 4 September.',
  },
  {
    number: '02',
    title: 'Build together',
    copy: 'Use one evening, one full day, and one focused morning to narrow the user, ship the essential journey, test, and revise.',
  },
  {
    number: '03',
    title: 'Continue',
    copy: 'Leave with a working product, evidence from iteration, and a clear path into the Superteam Vietnam Colosseum subtrack.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-primary">
            <span className="inline-flex items-center gap-2">
              <Sparkles aria-hidden="true" className="size-4" />
              Superteam Vietnam · Colosseum
            </span>
            <span className="text-border" aria-hidden="true">/</span>
            <span className="text-muted-foreground">Da Nang · 2026</span>
          </div>

          <h1 className="max-w-4xl text-6xl font-medium leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-[6.3rem]">
            Onchain Time
            <span className="block font-[family-name:var(--font-editorial)] font-normal italic tracking-[-0.045em] text-primary">
              Builder Sprint.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            Learn online. Build together. Turn the time.fun thesis into focused, working products for real communities—then carry them into Colosseum.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform duration-100 ease-out hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px"
            >
              Start learning
              <Play aria-hidden="true" className="size-4 fill-current" />
            </Link>
            <Link
              href="/event"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border bg-card/60 px-5 text-sm font-medium transition-colors duration-100 ease-out hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <CalendarDays aria-hidden="true" className="size-4 text-primary" />
              See the build weekend
            </Link>
          </div>
        </div>

        <div className="relative lg:pl-4" aria-label="Preview of the interactive learning experience">
          <div className="absolute -left-7 top-12 hidden h-px w-20 bg-primary lg:block" />
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/30">
            <div className="flex h-12 items-center border-b border-border px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <span className="text-primary">01</span>
              <span className="mx-3 h-4 w-px bg-border" />
              Interactive lesson
              <span className="ml-auto">01 / 06</span>
            </div>
            <div className="min-h-[370px] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">The original thesis</p>
              <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
                What if time could become an
                <span className="font-[family-name:var(--font-editorial)] font-normal italic text-primary"> open market?</span>
              </h2>
              <div className="mt-10 space-y-3" aria-hidden="true">
                {['Creator publishes availability', 'Community discovers access', 'Time becomes a product'].map((label, index) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded bg-secondary font-mono text-xs text-primary">0{index + 1}</span>
                    <span className="h-px flex-1 bg-border" />
                    <span className="w-44 text-sm text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-14 items-center gap-3 border-t border-border px-4">
              <span className="font-mono text-xs text-muted-foreground">Reveal 1 of 3</span>
              <div className="ml-auto flex gap-1.5" aria-hidden="true">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="size-1.5 rounded-full bg-border" />
                <span className="size-1.5 rounded-full bg-border" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {facts.map(([value, label], index) => (
            <div
              key={label}
              className={`px-5 py-6 md:px-8 ${index > 0 ? 'border-l border-border' : ''} ${index === 2 ? 'border-l-0 border-t md:border-l md:border-t-0' : ''} ${index === 3 ? 'border-t md:border-t-0' : ''}`}
            >
              <p className="font-mono text-xl font-medium text-primary md:text-2xl">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">The prompt</p>
          <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
            A strong idea.<br />An unfinished product question.
          </h2>
        </div>
        <div className="space-y-8">
          <p className="text-2xl leading-9 tracking-[-0.025em] text-muted-foreground sm:text-3xl sm:leading-10">
            time.fun made creator time tradable. The mechanism was interesting; the audience, repeatable value, and delivery experience were still unresolved.
          </p>
          <div className="border-l-2 border-primary bg-primary/5 px-5 py-4 text-base leading-7">
            This sprint is not a request to clone time.fun. It asks teams to find a narrow community where a time-based exchange creates real, repeatable value.
          </div>
          <ul className="grid gap-4 sm:grid-cols-2" aria-label="Builder principles">
            {['Choose one credible user niche', 'Ship the essential product journey', 'Collect evidence, not opinions', 'Revise the product after feedback'].map((item) => (
              <li key={item} className="flex items-start gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--chart-2)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-card/70">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">How it works</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Two weeks online. One focused weekend.</h2>
            </div>
            <Link className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-primary focus-visible:ring-2 focus-visible:ring-ring" href="/event">
              Full schedule <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid border-y border-border lg:grid-cols-3">
            {program.map((item, index) => (
              <article key={item.number} className={`py-8 lg:px-8 ${index > 0 ? 'border-t border-border lg:border-l lg:border-t-0' : ''} ${index === 0 ? 'lg:pl-0' : ''}`}>
                <p className="font-mono text-sm text-primary">{item.number}</p>
                <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 border-b border-border pb-16 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--chart-2)]">No local prize</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
              The point is progress,
              <span className="font-[family-name:var(--font-editorial)] font-normal italic text-primary"> not a podium.</span>
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-muted-foreground">
              Teams are recognized for building and iterating. Eligible projects can continue toward the Superteam Vietnam Colosseum subtrack, whose external prize pool is US$10,000.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Final eligibility, judging, and prize terms remain governed by the applicable Superteam Vietnam and Colosseum rules.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Begin with the material</p>
            <p className="mt-2 text-2xl font-medium tracking-[-0.03em]">Understand the prompt before choosing the product.</p>
          </div>
          <Link
            href="/learn"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform duration-100 ease-out hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px"
          >
            Open the learning deck
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
