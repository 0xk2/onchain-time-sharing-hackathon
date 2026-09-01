'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && <p className="text-xs leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function SubmissionForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formData.get('demoUrl') && !formData.get('repoUrl')) {
      setError('Add a demo link, a repository link, or both.');
      form.querySelector<HTMLInputElement>('#demoUrl')?.focus();
      return;
    }

    setError('');
    setStatus('loading');

    const payload = Object.fromEntries(formData.entries()) as Record<string, unknown>;
    payload.publicConsent = formData.get('publicConsent') === 'on';
    payload.conductConsent = formData.get('conductConsent') === 'on';

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { id?: string; error?: string };
      if (!response.ok) throw new Error(result.error || 'The project could not be saved.');
      setConfirmation(result.id || 'Received');
      setStatus('success');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The project could not be saved. Try again.');
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-[var(--chart-2)] bg-accent p-6 text-accent-foreground sm:p-8" role="status">
        <CheckCircle2 aria-hidden="true" className="size-8" />
        <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em]">Project received.</h2>
        <p className="mt-3 text-sm leading-6">
          Your confirmation is <strong className="font-mono">{confirmation}</strong>. Keep it for event check-in and any follow-up from the organizing team.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link className="inline-flex min-h-11 items-center gap-2 rounded-md bg-background px-4 text-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring" href="/projects">
            View projects <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link className="inline-flex min-h-11 items-center rounded-md px-4 text-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring" href="/learn">
            Return to learning
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} aria-busy={status === 'loading'} className="space-y-10">
      {error && (
        <div role="alert" className="rounded-md border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <input className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" />

      <fieldset className="space-y-5">
        <legend className="mb-5 text-xl font-medium tracking-[-0.025em]">Team and contact</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="projectName" label="Project name *">
            <Input id="projectName" name="projectName" required maxLength={120} placeholder="Minute Market" />
          </Field>
          <Field id="teamName" label="Team name *">
            <Input id="teamName" name="teamName" required maxLength={120} placeholder="Team name" />
          </Field>
          <Field id="contactName" label="Primary contact *">
            <Input id="contactName" name="contactName" required maxLength={120} autoComplete="name" placeholder="Full name" />
          </Field>
          <Field id="contactEmail" label="Contact email *">
            <Input id="contactEmail" name="contactEmail" required type="email" maxLength={240} autoComplete="email" spellCheck={false} placeholder="you@example.com" />
          </Field>
        </div>
        <Field id="members" label="Team members *" hint="List each member’s name and role. One person per line works well.">
          <Textarea id="members" name="members" required maxLength={1000} rows={4} placeholder={'Anh — product\nMinh — engineering'} />
        </Field>
      </fieldset>

      <fieldset className="space-y-5 border-t border-border pt-8">
        <legend className="mb-5 text-xl font-medium tracking-[-0.025em]">Product</legend>
        <Field id="targetUser" label="Target user *" hint="Name a specific community or role—not “everyone.”">
          <Textarea id="targetUser" name="targetUser" required maxLength={1000} rows={3} placeholder="Independent language tutors in Da Nang who sell short speaking-practice sessions." />
        </Field>
        <Field id="problem" label="Problem evidence *" hint="Explain the moment, current workaround, and any user evidence you collected.">
          <Textarea id="problem" name="problem" required maxLength={3000} rows={5} placeholder="What is difficult today, and how do you know?" />
        </Field>
        <Field id="product" label="What you built *" hint="Describe the essential user journey that currently works.">
          <Textarea id="product" name="product" required maxLength={3000} rows={5} placeholder="A user can publish availability, another user can…" />
        </Field>
        <Field id="iteration" label="What changed through iteration? *" hint="Describe the most important feedback and the product decision it caused.">
          <Textarea id="iteration" name="iteration" required maxLength={3000} rows={5} placeholder="After testing with three users, we changed…" />
        </Field>
      </fieldset>

      <fieldset className="space-y-5 border-t border-border pt-8">
        <legend className="mb-5 text-xl font-medium tracking-[-0.025em]">Evidence and links</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="demoUrl" label="Demo link" hint="Required if you do not provide a repository.">
            <Input id="demoUrl" name="demoUrl" type="url" inputMode="url" maxLength={500} spellCheck={false} placeholder="https://your-demo.example" />
          </Field>
          <Field id="repoUrl" label="Repository link" hint="Required if you do not provide a demo.">
            <Input id="repoUrl" name="repoUrl" type="url" inputMode="url" maxLength={500} spellCheck={false} placeholder="https://github.com/team/project" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t border-border pt-8">
        <legend className="mb-5 text-xl font-medium tracking-[-0.025em]">Publication and declaration</legend>
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-4">
          <input className="mt-1 size-4 accent-[var(--primary)]" type="checkbox" name="publicConsent" />
          <span className="text-sm leading-6">
            Publish this project in the public gallery after organizer review.
            <span className="block text-xs text-muted-foreground">Contact details and private team information will not be shown.</span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-4">
          <input className="mt-1 size-4 accent-[var(--primary)]" type="checkbox" name="conductConsent" required />
          <span className="text-sm leading-6">
            I confirm the team owns or may use the submitted work and will follow the event’s respectful-participation expectations. *
          </span>
        </label>
      </fieldset>

      <Button type="submit" size="lg" disabled={status === 'loading'} className="min-h-12 w-full px-5 sm:w-auto">
        {status === 'loading' && <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />}
        {status === 'loading' ? 'Submitting project…' : 'Submit project'}
        {status !== 'loading' && <ArrowRight aria-hidden="true" className="size-4" />}
      </Button>
    </form>
  );
}
