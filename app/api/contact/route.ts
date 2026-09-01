import { env } from 'cloudflare:workers';

import { ensureDatabase } from '@/db/ensure';

type ContactPayload = Record<string, unknown>;

function value(payload: ContactPayload, key: string, limit: number) {
  return typeof payload[key] === 'string'
    ? payload[key].trim().slice(0, limit)
    : '';
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    if (value(payload, 'website', 200)) return Response.json({ ok: true });

    const name = value(payload, 'name', 120);
    const email = value(payload, 'email', 240);
    const subject = value(payload, 'subject', 160);
    const message = value(payload, 'message', 4000);

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Complete every field before sending.' },
        { status: 400 },
      );
    }
    if (!email.includes('@')) {
      return Response.json(
        { error: 'Enter a valid email address.' },
        { status: 400 },
      );
    }

    await ensureDatabase();
    await env.DB.prepare(`
      INSERT INTO contacts (id, created_at, name, email, subject, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
      .bind(crypto.randomUUID(), Date.now(), name, email, subject, message)
      .run();

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact message failed', error);
    return Response.json(
      { error: 'We could not send the message. Try again in a moment.' },
      { status: 500 },
    );
  }
}
