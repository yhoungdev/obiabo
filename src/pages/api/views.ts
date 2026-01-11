import type { APIRoute } from 'astro';
import { db, views, eq, and } from 'astro:db';


function getSessionId(request: Request): string {
  const cookies = request.headers.get('cookie') || '';
  const sessionMatch = cookies.match(/session_id=([^;]+)/);
  if (sessionMatch) {
    return sessionMatch[1];
  }
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');

    if (!postId) {
      return new Response(JSON.stringify({ error: 'Post ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    
    const postViews = await db.select().from(views).where(eq(views.postId, postId));
    
    return new Response(JSON.stringify({ 
      views: postViews.length 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch views', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return new Response(JSON.stringify({ error: 'Post ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sessionId = getSessionId(request);

    
    const existingViews = await db.select().from(views)
      .where(and(eq(views.postId, postId), eq(views.sessionId, sessionId)));

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentView = existingViews.find(v => new Date(v.createdAt) > oneDayAgo);

    if (!recentView) {
      
      const viewId = `view_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      await db.insert(views).values({
        id: viewId,
        postId,
        sessionId,
        createdAt: new Date(),
      });
    }

    
    const postViews = await db.select().from(views).where(eq(views.postId, postId));

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    
    if (!request.headers.get('cookie')?.includes('session_id=')) {
      headers.append('Set-Cookie', `session_id=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      views: postViews.length 
    }), {
      status: 200,
      headers
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: 'Failed to record view', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
