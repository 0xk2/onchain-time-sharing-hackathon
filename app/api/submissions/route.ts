import { env } from 'cloudflare:workers';

import { ensureDatabase } from '@/db/ensure';

type SubmissionPayload = Record<string, unknown>;

function value(payload: SubmissionPayload, key: string, limit = 5000) {
  return typeof payload[key] === 'string'
    ? payload[key].trim().slice(0, limit)
    : '';
}

function validUrl(candidate: string) {
  if (!candidate) return true;
  try {
    const url = new URL(candidate);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SubmissionPayload;

    if (value(payload, 'website', 200)) {
      return Response.json({ ok: true, id: 'received' });
    }

    const projectName = value(payload, 'projectName', 120);
    const teamName = value(payload, 'teamName', 120);
    const contactName = value(payload, 'contactName', 120);
    const contactEmail = value(payload, 'contactEmail', 240);
    const members = value(payload, 'members', 1000);
    const targetUser = value(payload, 'targetUser', 1000);
    const problem = value(payload, 'problem', 3000);
    const product = value(payload, 'product', 3000);
    const iteration = value(payload, 'iteration', 3000);
    const demoUrl = value(payload, 'demoUrl', 500);
    const repoUrl = value(payload, 'repoUrl', 500);
    const publicConsent = payload.publicConsent === true;
    const conductConsent = payload.conductConsent === true;

    if (
      !projectName ||
      !teamName ||
      !contactName ||
      !contactEmail ||
      !members ||
      !targetUser ||
      !problem ||
      !product ||
      !iteration
    ) {
      return Response.json(
        { error: 'Complete every required field before submitting.' },
        { status: 400 },
      );
    }

    if (!contactEmail.includes('@')) {
      return Response.json(
        { error: 'Enter a valid contact email.' },
        { status: 400 },
      );
    }

    if (!demoUrl && !repoUrl) {
      return Response.json(
        { error: 'Add a demo link, a repository link, or both.' },
        { status: 400 },
      );
    }

    if (!validUrl(demoUrl) || !validUrl(repoUrl)) {
      return Response.json(
        { error: 'Demo and repository links must begin with http:// or https://.' },
        { status: 400 },
      );
    }

    if (!conductConsent) {
      return Response.json(
        { error: 'Confirm the participant and project declaration.' },
        { status: 400 },
      );
    }

    await ensureDatabase();
    const id = `OT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    await env.DB.prepare(`
      INSERT INTO submissions (
        id, created_at, project_name, team_name, contact_name, contact_email,
        members, target_user, problem, product, iteration, demo_url, repo_url,
        public_consent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        id,
        Date.now(),
        projectName,
        teamName,
        contactName,
        contactEmail,
        members,
        targetUser,
        problem,
        product,
        iteration,
        demoUrl || null,
        repoUrl || null,
        publicConsent ? 1 : 0,
      )
      .run();

    return Response.json({ ok: true, id });
  } catch (error) {
    console.error('Submission failed', error);
    return Response.json(
      { error: 'We could not save the project. Try again in a moment.' },
      { status: 500 },
    );
  }
}
