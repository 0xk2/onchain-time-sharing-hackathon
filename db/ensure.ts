import { env } from 'cloudflare:workers';

let ready: Promise<void> | null = null;

export function ensureDatabase() {
  if (!ready) {
    ready = (async () => {
      if (!env.DB) throw new Error('Database binding is unavailable.');
      await env.DB.batch([
        env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS submissions (
            id TEXT PRIMARY KEY,
            created_at INTEGER NOT NULL,
            project_name TEXT NOT NULL,
            team_name TEXT NOT NULL,
            contact_name TEXT NOT NULL,
            contact_email TEXT NOT NULL,
            members TEXT NOT NULL,
            target_user TEXT NOT NULL,
            problem TEXT NOT NULL,
            product TEXT NOT NULL,
            iteration TEXT NOT NULL,
            demo_url TEXT,
            repo_url TEXT,
            public_consent INTEGER NOT NULL DEFAULT 0
          )
        `),
        env.DB.prepare(`
          CREATE INDEX IF NOT EXISTS idx_submissions_public_created
          ON submissions(public_consent, created_at)
        `),
        env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS contacts (
            id TEXT PRIMARY KEY,
            created_at INTEGER NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL
          )
        `),
        env.DB.prepare(`
          CREATE INDEX IF NOT EXISTS idx_contacts_created
          ON contacts(created_at)
        `),
      ]);
      await env.DB.prepare('PRAGMA optimize').run();
    })().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}
