'use client';

import { CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || 'The message could not be sent.');
      form.reset();
      setStatus('success');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The message could not be sent. Try again.');
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-[var(--chart-2)] bg-accent p-6 text-accent-foreground" role="status">
        <CheckCircle2 aria-hidden="true" className="size-7" />
        <h2 className="mt-5 text-2xl font-medium tracking-[-0.03em]">Message received.</h2>
        <p className="mt-2 text-sm leading-6">The organizing team will reply using the email you provided.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-5 min-h-10 rounded-sm text-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} aria-busy={status === 'loading'} className="space-y-5">
      {error && <div role="alert" className="rounded-md border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <input className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" required maxLength={120} autoComplete="name" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" required type="email" maxLength={240} autoComplete="email" spellCheck={false} placeholder="you@example.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Input id="subject" name="subject" required maxLength={160} placeholder="Mentoring, participation, media…" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" name="message" required maxLength={4000} rows={7} placeholder="How can the organizing team help?" />
      </div>
      <Button type="submit" size="lg" disabled={status === 'loading'} className="min-h-12 px-5">
        {status === 'loading' ? <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" /> : <Send aria-hidden="true" className="size-4" />}
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
