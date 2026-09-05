'use client';

import { Mail, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  const [draftOpened, setDraftOpened] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const body = [
      `Name: ${name}`,
      `Reply email: ${email}`,
      '',
      message,
    ].join('\n');
    const mailto = `mailto:trunghieubui88@gmail.com?subject=${encodeURIComponent(`[Onchain Time] ${subject}`)}&body=${encodeURIComponent(body)}`;

    setDraftOpened(true);
    window.location.href = mailto;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="flex gap-3 rounded-md border border-border bg-secondary/60 px-4 py-3 text-sm leading-6 text-muted-foreground">
        <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>This opens a draft in your email app. Nothing is uploaded or stored by this website.</p>
      </div>
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
      {draftOpened && (
        <p role="status" className="text-sm leading-6 text-[var(--chart-2)]">
          Email draft opened. Review it and press Send in your email app.
        </p>
      )}
      <Button type="submit" size="lg" className="min-h-12 px-5">
        <Send aria-hidden="true" className="size-4" />
        Send message
      </Button>
    </form>
  );
}
