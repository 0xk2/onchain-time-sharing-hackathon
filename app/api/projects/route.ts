import { env } from 'cloudflare:workers';

import { ensureDatabase } from '@/db/ensure';

export async function GET() {
  try {
    await ensureDatabase();
    const result = await env.DB.prepare(`
      SELECT
        id,
        project_name AS projectName,
        team_name AS teamName,
        target_user AS targetUser,
        problem,
        product,
        iteration,
        demo_url AS demoUrl,
        repo_url AS repoUrl,
        created_at AS createdAt
      FROM submissions
      WHERE public_consent = 1
      ORDER BY created_at DESC
      LIMIT 50
    `).all();

    return Response.json({ projects: result.results ?? [] });
  } catch (error) {
    console.error('Project listing failed', error);
    return Response.json(
      { error: 'The project gallery is temporarily unavailable.' },
      { status: 500 },
    );
  }
}
