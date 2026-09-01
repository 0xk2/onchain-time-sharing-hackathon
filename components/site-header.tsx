'use client';

import Link from 'next/link';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navigation = [
  ['Learn', '/learn'],
  ['Event', '/event'],
  ['Projects', '/projects'],
  ['Contact', '/contact'],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="relative z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-5 md:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-h-10 items-center gap-3 rounded-md font-mono text-xs font-medium uppercase tracking-[0.14em] focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">OT</span>
          <span className="hidden sm:inline">Onchain Time</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              className="rounded-sm py-3 transition-colors duration-100 ease-out hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>

        <a
          href="https://t.me/+QS74md56VtkxOGQ1"
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-transform duration-100 ease-out hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px md:ml-0 md:px-4"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          Join this chat
        </a>

        <button
          type="button"
          className="grid size-10 shrink-0 place-items-center rounded-md border border-border bg-card transition-colors duration-100 ease-out hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="absolute inset-x-0 top-16 border-b border-border bg-background p-5 shadow-xl shadow-black/30 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-md px-3 text-base transition-colors duration-100 ease-out hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
