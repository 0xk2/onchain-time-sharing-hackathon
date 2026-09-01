'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, FolderOpen, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type Project = {
  id: string;
  projectName: string;
  teamName: string;
  targetUser: string;
  problem: string;
  product: string;
  iteration: string;
  demoUrl?: string | null;
  repoUrl?: string | null;
  createdAt: number;
};

export function ProjectsGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/projects');
      const result = (await response.json()) as { projects?: Project[] };
      if (!response.ok) throw new Error('Unable to load projects.');
      setProjects(result.projects ?? []);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (status === 'loading') {
    return (
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2" aria-label="Loading projects">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="min-h-72 animate-pulse bg-card p-6 motion-reduce:animate-none">
            <div className="h-3 w-24 rounded bg-secondary" />
            <div className="mt-8 h-8 w-3/4 rounded bg-secondary" />
            <div className="mt-4 h-3 w-full rounded bg-secondary" />
            <div className="mt-2 h-3 w-5/6 rounded bg-secondary" />
          </div>
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-72 flex-col items-start justify-center rounded-lg border border-destructive bg-destructive/10 p-8">
        <h2 className="text-2xl font-medium tracking-[-0.03em]">Couldn’t load the project gallery.</h2>
        <p className="mt-2 text-sm text-muted-foreground">This is usually a temporary connection problem.</p>
        <button type="button" onClick={load} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 text-sm focus-visible:ring-2 focus-visible:ring-ring">
          <RefreshCw aria-hidden="true" className="size-4" /> Try again
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
        <FolderOpen aria-hidden="true" className="size-9 text-primary" />
        <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em]">The first projects are still being built.</h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          Public projects will appear here after teams submit and approve publication. The learning material opens first.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/learn" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring">
            Start learning <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <button
            type="button"
            disabled
            aria-label="Project submissions are not open yet"
            className="inline-flex min-h-11 cursor-not-allowed items-center rounded-md border border-border bg-secondary px-4 text-sm text-muted-foreground opacity-55"
          >
            Submit a project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
      {projects.map((project) => (
        <article key={project.id} className="flex min-h-80 flex-col bg-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
            <span>{project.teamName}</span>
            <span>{new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short' }).format(project.createdAt)}</span>
          </div>
          <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em]">{project.projectName}</h2>
          <p className="mt-2 text-sm text-primary">For {project.targetUser}</p>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">{project.product}</p>
          <p className="mt-5 border-l border-[var(--chart-2)] pl-4 text-sm leading-6 text-muted-foreground">
            <span className="block font-mono text-xs uppercase tracking-[0.1em] text-[var(--chart-2)]">Latest iteration</span>
            <span className="mt-2 line-clamp-2 block">{project.iteration}</span>
          </p>
          <div className="mt-auto flex flex-wrap gap-4 pt-7 text-sm">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-sm text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring">
                Open demo <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-sm text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring">
                Repository <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
