'use client';

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  ExternalLink,
  Lightbulb,
  Repeat2,
  Users,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Slide = {
  section: string;
  title: string;
  accent: string;
  lede: string;
  points: string[];
  resource?: { label: string; href: string };
  visual: 'thesis' | 'gap' | 'niches' | 'loop' | 'agents' | 'weekend';
};

const slides: Slide[] = [
  {
    section: 'The prompt',
    title: 'Time became a market.',
    accent: 'What did it become for the user?',
    lede: 'time.fun explored a sharp idea: creators could publish access, communities could discover it, and time could become an exchangeable product.',
    points: [
      'The mechanism made a scarce human resource visible.',
      'Trading created attention, but attention alone did not prove repeatable user value.',
      'Your job is to keep the useful insight and redesign the product around one real community.',
    ],
    resource: { label: 'Explore Solana developer resources', href: 'https://solana.com/developers' },
    visual: 'thesis',
  },
  {
    section: 'The product gap',
    title: 'A market is not yet',
    accent: 'a complete product.',
    lede: 'A token can express demand. The product still needs to make the promised interaction clear, useful, and reliably delivered.',
    points: [
      'Who is the creator, and what kind of time are they actually offering?',
      'Why does the buyer need this interaction more than a message, booking link, or community membership?',
      'What happens after the trade so both sides trust the experience enough to repeat it?',
    ],
    resource: { label: 'Review Solana core concepts', href: 'https://solana.com/docs/core' },
    visual: 'gap',
  },
  {
    section: 'Choose a niche',
    title: 'Narrow users create',
    accent: 'stronger products.',
    lede: 'Do not begin with “everyone who has time.” Begin with a group that already exchanges expertise, attention, access, or collaboration.',
    points: [
      'Name the user narrowly enough that you could interview five of them this week.',
      'Identify the exact moment when time changes hands and what outcome follows.',
      'Only use an onchain mechanism when it improves discovery, coordination, ownership, or trust.',
    ],
    visual: 'niches',
  },
  {
    section: 'Build the loop',
    title: 'Design the exchange',
    accent: 'end to end.',
    lede: 'A working prototype should let one person move through the essential journey without the team explaining every step.',
    points: [
      'Publish: make the offer, rules, and availability legible.',
      'Exchange: show what the participant commits and what they receive.',
      'Deliver: complete the interaction, record evidence, and make the next action obvious.',
    ],
    resource: { label: 'Learn Solana development', href: 'https://solana.com/developers/courses' },
    visual: 'loop',
  },
  {
    section: 'Build with agents',
    title: 'Use AI to shorten',
    accent: 'the feedback loop.',
    lede: 'Agents are most useful when the team gives them a precise problem, checks the output, and returns with real evidence—not when they replace product judgment.',
    points: [
      'Write a one-page product spec before generating the first interface.',
      'Ask the agent to implement one testable journey, then run and inspect it.',
      'Put the prototype in front of a user, record friction, and revise the spec before the next build.',
    ],
    visual: 'agents',
  },
  {
    section: 'The sprint',
    title: 'Three checkpoints.',
    accent: 'One continuation path.',
    lede: 'The in-person weekend accelerates work already started online. It is a feedback checkpoint—not a local prize competition.',
    points: [
      'Friday night: lock the user, problem, and smallest credible build.',
      'Saturday: implement, test, collect evidence, and publish the next version.',
      'Sunday morning: demonstrate, submit directly on this site, and plan the next Colosseum iteration.',
    ],
    resource: { label: 'Visit the Colosseum hackathon', href: 'https://colosseum.com/hackathon' },
    visual: 'weekend',
  },
];

function SlideVisual({ type }: { type: Slide['visual'] }) {
  if (type === 'gap') {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border-t-2 border-primary pt-4">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">Market layer</p>
          <p className="mt-8 text-3xl font-medium tracking-[-0.04em]">Discover · price · exchange</p>
        </div>
        <div className="border-t-2 border-[var(--chart-2)] pt-4">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--chart-2)]">Product layer</p>
          <p className="mt-8 text-3xl font-medium tracking-[-0.04em]">Promise · deliver · repeat</p>
        </div>
      </div>
    );
  }

  if (type === 'niches') {
    return (
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">
        {['Mentors', 'Coaches', 'Local experts', 'Creative collaborators'].map((label) => (
          <div key={label} className="min-h-24 bg-card p-4">
            <Users aria-hidden="true" className="size-4 text-primary" />
            <p className="mt-5 text-sm">{label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'loop') {
    return (
      <div className="space-y-2">
        {['Publish', 'Discover', 'Exchange', 'Deliver', 'Repeat'].map((label, index) => (
          <div key={label} className="flex items-center gap-3 border-b border-border py-3">
            <span className="font-mono text-xs text-primary">0{index + 1}</span>
            <span className="text-base">{label}</span>
            {index < 4 && <ArrowRight aria-hidden="true" className="ml-auto size-4 text-muted-foreground" />}
            {index === 4 && <Repeat2 aria-hidden="true" className="ml-auto size-4 text-[var(--chart-2)]" />}
          </div>
        ))}
      </div>
    );
  }

  if (type === 'agents') {
    return (
      <div className="grid gap-3">
        {[
          ['01', 'Specify', Lightbulb],
          ['02', 'Build', Bot],
          ['03', 'Test and revise', Repeat2],
        ].map(([number, label, Icon]) => (
          <div key={String(number)} className="flex items-center gap-4 rounded-md border border-border bg-secondary/50 p-4">
            <span className="font-mono text-xs text-primary">{String(number)}</span>
            <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
            <span className="text-base">{String(label)}</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'weekend') {
    return (
      <div className="space-y-3">
        {[
          ['FRI 18', 'Scope'],
          ['SAT 19', 'Build + test'],
          ['SUN 20', 'Demo + submit'],
          ['SEP 28', 'Continue in Colosseum'],
        ].map(([date, label], index) => (
          <div key={date} className="grid grid-cols-[78px_1fr] items-center gap-4">
            <span className="font-mono text-xs text-primary">{date}</span>
            <span className={`border-l px-4 py-3 text-sm ${index === 3 ? 'border-[var(--chart-2)] text-[var(--chart-2)]' : 'border-border'}`}>{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {['Creator publishes access', 'Community discovers demand', 'Time becomes an exchange'].map((label, index) => (
        <div key={label} className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded bg-secondary font-mono text-xs text-primary">0{index + 1}</span>
          <span className="h-px flex-1 bg-border" />
          <span className="w-44 text-sm text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function LearningDeck() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [reveal, setReveal] = useState(0);
  const slide = slides[slideIndex];
  const atStart = slideIndex === 0 && reveal === 0;
  const atEnd = slideIndex === slides.length - 1 && reveal === slide.points.length - 1;

  const syncUrl = useCallback((index: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('slide', String(index + 1));
    window.history.replaceState(null, '', url);
  }, []);

  useEffect(() => {
    const raw = Number(new URL(window.location.href).searchParams.get('slide'));
    if (Number.isFinite(raw) && raw >= 1 && raw <= slides.length) setSlideIndex(raw - 1);
  }, []);

  const next = useCallback(() => {
    if (reveal < slide.points.length - 1) {
      setReveal((value) => value + 1);
      return;
    }
    if (slideIndex < slides.length - 1) {
      const index = slideIndex + 1;
      setSlideIndex(index);
      setReveal(0);
      syncUrl(index);
    }
  }, [reveal, slide.points.length, slideIndex, syncUrl]);

  const previous = useCallback(() => {
    if (reveal > 0) {
      setReveal((value) => value - 1);
      return;
    }
    if (slideIndex > 0) {
      const index = slideIndex - 1;
      setSlideIndex(index);
      setReveal(slides[index].points.length - 1);
      syncUrl(index);
    }
  }, [reveal, slideIndex, syncUrl]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (target.closest('a,button,input,textarea,select')) return;
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        next();
      }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        previous();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [next, previous]);

  const progress = useMemo(() => {
    const withinSlide = (reveal + 1) / slide.points.length;
    return (slideIndex + withinSlide) / slides.length;
  }, [reveal, slide.points.length, slideIndex]);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col px-5 py-6 md:px-8 md:py-8">
      <div className="flex items-center border-b border-border pb-4 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        <span className="text-primary">{String(slideIndex + 1).padStart(2, '0')}</span>
        <span className="mx-3 h-4 w-px bg-border" />
        <span>{slide.section}</span>
        <span className="ml-auto">{String(slideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
      </div>

      <div className="h-0.5 bg-border" aria-hidden="true">
        <div
          className="h-full origin-left bg-primary transition-transform duration-300 ease-in-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div key={slideIndex} className="grid flex-1 gap-10 py-10 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <h1 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            {slide.title}
            <span className="block font-[family-name:var(--font-editorial)] font-normal italic text-primary">{slide.accent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{slide.lede}</p>
          <div className="mt-8 space-y-3" aria-live="polite">
            {slide.points.slice(0, reveal + 1).map((point, index) => (
              <div key={point} className="flex gap-3 border-l-2 border-primary bg-primary/5 px-4 py-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <p className="text-sm leading-6">{point}</p>
              </div>
            ))}
          </div>
          {slide.resource && (
            <a
              href={slide.resource.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-sm text-sm text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              {slide.resource.label}
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-5 sm:p-7">
          <p className="mb-7 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Working model</p>
          <SlideVisual type={slide.visual} />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <button
          type="button"
          onClick={previous}
          disabled={atStart}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm transition-colors duration-100 ease-out hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back
        </button>
        <span className="hidden text-xs text-muted-foreground sm:inline">Use arrow keys or Space to move through the deck.</span>
        <button
          type="button"
          onClick={next}
          disabled={atEnd}
          className="ml-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-transform duration-100 ease-out hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
        >
          {reveal < slide.points.length - 1 ? 'Reveal' : slideIndex < slides.length - 1 ? 'Next slide' : 'Complete'}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </section>
  );
}
