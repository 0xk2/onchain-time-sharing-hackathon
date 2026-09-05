import { getStore } from '@netlify/blobs';

type PublicProject = {
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

export async function GET() {
  try {
    const store = getStore({ name: 'onchain-time-submissions', consistency: 'strong' });
    const { blobs } = await store.list({ prefix: 'public/' });
    const keys = blobs
      .map(({ key }) => key)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 50);
    const projects = (
      await Promise.all(keys.map((key) => store.get(key, { type: 'json' })))
    ).filter((project): project is PublicProject => project !== null);

    return Response.json({ projects });
  } catch (error) {
    console.error('Project listing failed', error);
    return Response.json(
      { error: 'The project gallery is temporarily unavailable.' },
      { status: 500 },
    );
  }
}
