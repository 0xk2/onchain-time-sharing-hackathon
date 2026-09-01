import type { ReactNode } from 'react';

export function PageIntro({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-background/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_280px] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
        </div>
        {aside && <div className="border-l border-border pl-5 text-sm leading-6 text-muted-foreground">{aside}</div>}
      </div>
    </section>
  );
}
