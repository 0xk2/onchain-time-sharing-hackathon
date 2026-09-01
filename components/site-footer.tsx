import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-[1fr_auto] md:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Onchain Time Builder Sprint</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            A two-week online learning program and focused Da Nang build weekend for teams preparing to continue into Colosseum.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Footer navigation">
          <Link className="rounded-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring" href="/learn">Learn</Link>
          <Link className="rounded-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring" href="/event">Event</Link>
          <Link className="rounded-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring" href="/projects">Projects</Link>
          <Link className="rounded-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring" href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span>Program direction: Hieu · Operations: Danh</span>
          <span>Da Nang · September 2026</span>
        </div>
      </div>
    </footer>
  );
}
